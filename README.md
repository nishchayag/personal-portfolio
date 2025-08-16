# Personal Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS, featuring stunning animations and smooth user interactions.

**🌐 Live Demo**: [https://www.nishchayag.live/](https://www.nishchayag.live/)

## 🚀 Features

- **Modern Design**: Clean, minimalist interface with beautiful animations
- **Full-page Beam Animation**: Elegant falling beam effects across the entire viewport
- **Responsive Layout**: Optimized for all device sizes and screen resolutions
- **TypeScript**: Full type safety and enhanced developer experience
- **Performance Optimized**: Server-side rendering, lazy loading, and optimized bundles
- **SEO Ready**: Automatic sitemap generation, robots.txt, and meta tags
- **Smooth Animations**: Powered by Framer Motion for fluid transitions

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
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

1. **Hero Section**: Edit `src/components/HeroSection.tsx` to update your name and title
2. **About Section**: Modify `src/components/About.tsx` to add your story and background
3. **Skills Section**: Update `src/components/SkillsSection.tsx` with your technical skills
4. **Projects Section**: Add your projects in `src/components/Projects.tsx`
5. **Contact**: Configure contact information in `src/components/Contact.tsx`

### Customizing Animations

The portfolio features a unique full-page falling beam animation:

- **Main Component**: `src/components/ui/backgroud-beams-with-collision.tsx`
- **Configuration**: Adjust beam count, speed, and appearance
- **Portal Rendering**: Beams render across the entire viewport using React portals

### Styling

- **Global Styles**: `src/app/globals.css`
- **Tailwind Config**: `tailwind.config.ts`
- **Component Styling**: Individual component files

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── robots.ts         # SEO robots.txt
│   └── sitemap.ts        # SEO sitemap
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── backgroud-beams-with-collision.tsx
│   │   ├── floating-dock.tsx
│   │   ├── link-preview.tsx
│   │   └── type-writer-effect.tsx
│   ├── About.tsx         # About section
│   ├── Contact.tsx       # Contact section
│   ├── Footer.tsx        # Footer component
│   ├── HeroSection.tsx   # Hero/landing section
│   ├── Navbar.tsx        # Navigation component
│   ├── Projects.tsx      # Projects showcase
│   └── SkillsSection.tsx # Skills display
├── lib/                  # Utility libraries
│   └── utils.ts         # Helper functions
└── utils/               # Additional utilities
    ├── lazyComponents.ts # Lazy loading setup
    └── performance.ts   # Performance optimizations
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
