#!/usr/bin/env node
// Weekly screenshot refresh: capture each project's live site, compare it
// against what's already committed under public/work/, and only overwrite
// the file when the page has visibly changed (>3% of pixels differ). Keeps
// animated / ever-so-slightly-different pages from churning the repo every
// run.
//
// Usage: node scripts/capture-screenshots.mjs

import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { readFile, writeFile, mkdtemp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const WORK_DIR = path.join(ROOT, "public", "work");
const MANIFEST = path.join(ROOT, "src", "content", "screenshots.json");

const VIEWPORT = { width: 1440, height: 900 };
const DEFAULT_WAIT_MS = 2500;
const SCROLL_STEP = 300;
const DIFF_THRESHOLD = 0.03; // overwrite only if more than 3% of pixels differ
const NAV_TIMEOUT_MS = 30_000;

async function loadManifest() {
  const raw = await readFile(MANIFEST, "utf8");
  return JSON.parse(raw);
}

/** Scrolls the whole page in fixed steps so lazy content loads, then settles at scrollY. */
async function scrollAndSettle(page, scrollY, waitMs) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += SCROLL_STEP) {
    await page.evaluate((offset) => window.scrollTo(0, offset), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate((offset) => window.scrollTo(0, offset), scrollY);
  await page.waitForTimeout(waitMs ?? DEFAULT_WAIT_MS);
}

/** Returns the fraction of pixels that differ, or 1 (fully different) if dimensions don't match. */
function diffFraction(beforeBuf, afterBuf) {
  const before = PNG.sync.read(beforeBuf);
  const after = PNG.sync.read(afterBuf);
  if (before.width !== after.width || before.height !== after.height) return 1;
  const { width, height } = before;
  const diff = new PNG({ width, height });
  const changed = pixelmatch(before.data, after.data, diff.data, width, height, { threshold: 0.1 });
  return changed / (width * height);
}

async function captureOne(browser, entry, tmpDir) {
  const context = await browser.newContext({ viewport: VIEWPORT, colorScheme: "dark" });
  const page = await context.newPage();
  try {
    await page.goto(entry.url, { waitUntil: "load", timeout: NAV_TIMEOUT_MS });
    await scrollAndSettle(page, entry.scrollY ?? 0, entry.waitMs ?? DEFAULT_WAIT_MS);
    const tmpFile = path.join(tmpDir, entry.file);
    await page.screenshot({ path: tmpFile });
    return { ok: true, tmpFile };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  } finally {
    await context.close();
  }
}

async function main() {
  const entries = await loadManifest();
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), "portfolio-screens-"));
  const browser = await chromium.launch();

  const updated = [];
  const unchanged = [];
  const failed = [];

  try {
    for (const entry of entries) {
      const result = await captureOne(browser, entry, tmpDir);
      if (!result.ok) {
        failed.push({ file: entry.file, error: result.error });
        console.warn(`[capture] ${entry.file}: FAILED — ${result.error}`);
        continue;
      }

      const destPath = path.join(WORK_DIR, entry.file);
      const newBuf = await readFile(result.tmpFile);

      if (!existsSync(destPath)) {
        await writeFile(destPath, newBuf);
        updated.push(entry.file);
        console.log(`[capture] ${entry.file}: created (no existing file)`);
        continue;
      }

      const oldBuf = await readFile(destPath);
      let fraction;
      try {
        fraction = diffFraction(oldBuf, newBuf);
      } catch (err) {
        failed.push({ file: entry.file, error: `diff failed: ${err instanceof Error ? err.message : String(err)}` });
        console.warn(`[capture] ${entry.file}: FAILED — diff error`);
        continue;
      }

      if (fraction > DIFF_THRESHOLD) {
        await writeFile(destPath, newBuf);
        updated.push(entry.file);
        console.log(`[capture] ${entry.file}: updated (${(fraction * 100).toFixed(1)}% changed)`);
      } else {
        unchanged.push(entry.file);
        console.log(`[capture] ${entry.file}: unchanged (${(fraction * 100).toFixed(1)}% changed)`);
      }
    }
  } finally {
    await browser.close();
    await rm(tmpDir, { recursive: true, force: true });
  }

  console.log("\n--- Summary ---");
  console.log(`Updated:   ${updated.length ? updated.join(", ") : "none"}`);
  console.log(`Unchanged: ${unchanged.length ? unchanged.join(", ") : "none"}`);
  console.log(`Failed:    ${failed.length ? failed.map((f) => f.file).join(", ") : "none"}`);

  if (failed.length === entries.length && entries.length > 0) {
    console.error("\nEvery capture failed.");
    process.exit(1);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
