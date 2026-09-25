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
