import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

// Simple in-memory rate limiter (per server instance / cold start)
// NOTE: In a serverless environment this may reset between invocations; for stronger guarantees use Redis / Upstash.
type RateRecord = { count: number; first: number };
const RATE_LIMIT_WINDOW_MS =
  (Number(process.env.RATE_LIMIT_WINDOW_SECONDS) || 600) * 1000; // default 10 min
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 5; // default 5 messages per window per IP
const rateMap: Map<string, RateRecord> = new Map();

function rateLimit(key: string): boolean {
  const now = Date.now();
  const rec = rateMap.get(key);
  if (!rec) {
    rateMap.set(key, { count: 1, first: now });
    return true;
  }
  if (now - rec.first > RATE_LIMIT_WINDOW_MS) {
    // reset window
    rateMap.set(key, { count: 1, first: now });
    return true;
  }
  if (rec.count >= RATE_LIMIT_MAX) return false;
  rec.count += 1;
  return true;
}

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  website?: string; // honeypot
  company?: string; // honeypot
  hp_field?: string; // honeypot
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * POST /api/contact
 * - Accepts { name, email, message }
 * - Supports two delivery modes:
 *   1) Formspree (if FORMSPREE_FORM_ID is set) - forwards to Formspree
 *   2) SMTP via nodemailer (if EMAIL_USER and EMAIL_PASS / EMAIL_HOST provided)
 *
 * Environment variables (examples in .env.example):
 * - EMAIL_USER, EMAIL_PASS (or EMAIL_HOST/EMAIL_PORT/EMAIL_SECURE)
 * - FORMSPREE_FORM_ID (optional)
 * - MAIL_TO (optional recipient; falls back to EMAIL_USER)
 */
export async function POST(request: NextRequest) {
  try {
    const payload: Payload = await request.json();
    const { name, email, message } = payload;

    // Basic rate limit (per IP)
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many messages. Please try again later." },
        { status: 429 }
      );
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Honeypot spam check — silently accept to avoid tipping off bots
    if (payload.website || payload.company || payload.hp_field) {
      return NextResponse.json(
        { message: "Message received" },
        { status: 200 }
      );
    }

    // Prefer Formspree if configured (no secrets required on server)
    const formspreeId = process.env.FORMSPREE_FORM_ID;
    if (formspreeId) {
      const formspreeUrl = `https://formspree.io/f/${formspreeId}`;
      const res = await fetch(formspreeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Formspree error", res.status, text);
        return NextResponse.json(
          { error: "Failed to send message via Formspree" },
          { status: 502 }
        );
      }

      return NextResponse.json(
        { message: "Message sent via Formspree" },
        { status: 200 }
      );
    }

    // Otherwise, attempt SMTP with nodemailer
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const MAIL_TO = process.env.MAIL_TO || EMAIL_USER;

    if (!EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json(
        {
          error:
            "Email service not configured. Set EMAIL_USER and EMAIL_PASS or FORMSPREE_FORM_ID.",
        },
        { status: 500 }
      );
    }

    // Build transporter options - allow custom host/port/secure via env
    const transporterOptions: nodemailer.TransportOptions &
      SMTPTransport.Options = {} as nodemailer.TransportOptions &
      SMTPTransport.Options;
    if (process.env.EMAIL_HOST) {
      transporterOptions.host = process.env.EMAIL_HOST;
      transporterOptions.port = process.env.EMAIL_PORT
        ? Number(process.env.EMAIL_PORT)
        : 587;
      transporterOptions.secure = process.env.EMAIL_SECURE === "true"; // true for 465, false for other ports
      transporterOptions.auth = { user: EMAIL_USER, pass: EMAIL_PASS };
    } else {
      // default to Gmail SMTP via 'gmail' service (works with app password)
      transporterOptions.service = "gmail";
      transporterOptions.auth = { user: EMAIL_USER, pass: EMAIL_PASS };
    }

    // Use correct nodemailer API
    const transporter = nodemailer.createTransport(transporterOptions);

    const mailOptions = {
      from: EMAIL_USER,
      to: MAIL_TO,
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><em>This message was sent from your portfolio contact form.</em></p>
      `,
      replyTo: email,
    } as const;

    // Send mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (err) {
    // avoid exposing internal error details to clients
    console.error("/api/contact error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
