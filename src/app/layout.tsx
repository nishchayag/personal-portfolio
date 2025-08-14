import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Nishchay Agarwal | Full-Stack Developer & Freelancer",
    template: "%s | Nishchay Agarwal",
  },
  description:
    "Experienced full-stack developer specializing in Next.js, React, and Node.js. Creating innovative web solutions and digital experiences. Available for freelance projects.",
  keywords: [
    "full-stack developer",
    "freelancer",
    "Next.js",
    "React",
    "Node.js",
    "web development",
    "Nishchay Agarwal",
  ],
  authors: [{ name: "Nishchay Agarwal" }],
  creator: "Nishchay Agarwal",
  publisher: "Nishchay Agarwal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nishchayag.live"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nishchay Agarwal | Full-Stack Developer & Freelancer",
    description:
      "Experienced full-stack developer specializing in Next.js, React, and Node.js. Creating innovative web solutions and digital experiences.",
    url: "https://nishchayag.live",
    siteName: "Nishchay Agarwal&apos;s Portfolio",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/next.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nishchay Agarwal | Full-Stack Developer & Freelancer",
    description:
      "Experienced full-stack developer specializing in Next.js, React, and Node.js. Creating innovative web solutions and digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased overflow-x-hidden bg-black text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nishchay Agarwal",
              jobTitle: "Full-Stack Developer",
              description:
                "Experienced full-stack developer specializing in Next.js, React, and Node.js",
              url: "https://nishchay-portfolio.vercel.app",
              sameAs: [
                "https://github.com/nishchay-agarwal",
                "https://linkedin.com/in/nishchay-agarwal",
              ],
              knowsAbout: [
                "Next.js",
                "React",
                "Node.js",
                "TypeScript",
                "Full-Stack Development",
                "Web Development",
              ],
            }),
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
