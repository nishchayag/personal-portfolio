# Personal Portfolio

Nishchay Agarwal's portfolio: an Apple-style single-page site with a scroll-linked hero, a flagship case study, project cards that morph into a detail sheet, and a light/dark theme. Built with Next.js 16, TypeScript, and Tailwind CSS.

**🌐 Live Demo**: [https://www.nishchayag.com/](https://www.nishchayag.com/)

## 🚀 Features

- **Keynote-style hero**: scroll-linked screenshot stack over a Person JSON-LD, OG image and icon generated from the same content
- **Flagship case study**: a pinned, crossfading browser frame paired with scrolling detail copy
- **Morphing project cards**: cards open into a shared-layout detail sheet (bottom sheet on phones)
- **Light/dark theme**: no-flash inline script, `data-theme` on `<html>`, and a toggle that survives reloads
- **Responsive Layout**: Optimized for all device sizes and screen resolutions
- **TypeScript**: Full type safety and enhanced developer experience
- **SEO Ready**: sitemap, robots.txt, and metadata generated from `src/content/profile.ts`
- **Smooth Animations**: Powered by `motion` (Framer Motion) for fluid transitions

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Tabler Icons](https://tabler.io/icons)
- **Deployment**: Optimized for [Vercel](https://vercel.com/)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nishchayag/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## 🎨 Customization

### Adding Your Information

All content — name, role, tagline, projects, experience, skills and services — lives in one place: `src/content/profile.ts`. Edit it and the whole site (hero, flagship case study, cards, about, services, contact) updates.

### Styling

- **Global Styles & theme tokens**: `src/app/globals.css`
- **Component Styling**: Tailwind utility classes in each component under `src/components/site/`

## 🔄 Keeping projects up to date

Project cards, the flagship case study's copy and its stats can update themselves from each project's own GitHub repo, instead of only from hand-edited text in `profile.ts`.

### `portfolio.json`

Any project with a `repo: "owner/name"` field in `profile.ts` (currently signalhq, doxiqo, notesify and feedbacker.io) can have a `portfolio.json` file at the root of its **default branch**. `src/content/projects.ts` fetches it, validates it, and shallow-merges whatever's valid over the local project — so a missing repo, a 404, a timeout, or invalid JSON all silently fall back to the local copy in `profile.ts`.

Allowed fields:

```json
{
  "title": "SignalHQ",
  "summary": "Anonymous feedback for teams.",
  "highlights": ["Multi-tenant orgs, teams and questions", "AI-assisted moderation"],
  "stack": ["Next.js", "TypeScript", "MongoDB"],
  "details": [{ "label": "Multi-tenant by design", "body": "..." }],
  "demoUrl": "https://signal.nishchayag.com",
  "kind": "Product"
}
```

`slug`, `image`, `gallery`, `flagship` and `repo` always come from `profile.ts` — a manifest can't change those. Unknown fields are ignored.

### Daily refresh

The homepage is server-rendered with `export const revalidate = 86400`, and every fetch in `projects.ts` is tagged `"projects"` with a 24h `revalidate`, so Vercel refreshes project content and the flagship's live facts (commit count, first-commit date, test file count) at most once a day.

### On-demand refresh

To pick up a change immediately instead of waiting for the daily revalidation:

1. In the Vercel project, set an environment variable `REVALIDATE_SECRET` to a random string.
2. Call `POST /api/revalidate?secret=<that value>` — it returns `{ "revalidated": true }` and 200 on a match, or 401 on a missing/wrong secret (and always 401 if `REVALIDATE_SECRET` isn't set at all).

```bash
curl -X POST "https://www.nishchayag.com/api/revalidate?secret=$REVALIDATE_SECRET"
```

A project repo can call this automatically on push, e.g. in that repo's own `.github/workflows/notify-portfolio.yml`:

```yaml
- name: Ping portfolio to refresh
  run: curl -fsS -X POST "https://www.nishchayag.com/api/revalidate?secret=${{ secrets.REVALIDATE_SECRET }}"
```

### Weekly screenshots

`.github/workflows/refresh-screenshots.yml` runs every Monday (and on demand from the **Actions** tab → *Refresh project screenshots* → *Run workflow*). It captures each site listed in `src/content/screenshots.json` with Playwright, compares the result against the committed image under `public/work/` with `pixelmatch`, and only overwrites the file when more than 3% of pixels differ — so animated pages don't churn the repo every week. Changed screenshots are committed to `main` (which triggers a Vercel deploy) and then fast-forwarded onto `dev`.

To run it locally:

```bash
npm run capture-screenshots
```

### Adding a new project

1. Add it to `featuredProjects` or `otherProjects` in `src/content/profile.ts` (with a `repo` field if it should pull live content).
2. Add its screenshot entry to `src/content/screenshots.json`.

### `GITHUB_TOKEN` (optional)

Set a `GITHUB_TOKEN` environment variable in Vercel (a classic PAT with no scopes is enough for public repos) to raise the GitHub API rate limit used for the flagship's live facts. Without it, requests are unauthenticated and share GitHub's much lower per-IP limit.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and theme tokens
│   ├── layout.tsx         # Root layout, metadata, theme script
│   ├── icon.tsx           # Generated favicon
│   ├── opengraph-image.tsx# Generated OG image
│   ├── (site)/page.tsx    # Home page
│   ├── preview/           # Earlier redesign variants (v1–v6), kept for comparison
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # SEO sitemap
├── components/
│   ├── site/               # The live site's components (hero, flagship, cards, theme, etc.)
│   └── MotionProvider.tsx  # Site-wide reduced-motion config
└── content/
    └── profile.ts          # Single source of truth for all content
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com/)
   - Import your GitHub repository
   - Deploy with zero configuration

### Other Platforms

The app can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- Digital Ocean

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Bundle Size**: ~82KB optimized build
- **Loading Speed**: Sub-second initial load
- **SEO Score**: 100/100

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Nishchay Agarwal**

- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- GitHub: [@nishchayag](https://github.com/nishchayag)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using Next.js and modern web technologies**
