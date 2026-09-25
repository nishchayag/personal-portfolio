import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import { THEME_SCRIPT } from "@/components/site/theme-script";
import { profile, skills } from "@/content/profile";

// Inter is only the fallback: Apple devices render SF Pro via -apple-system.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const title = `${profile.name} | ${profile.role}`;
const description = profile.tagline;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${profile.name}`,
  },
  description,
  keywords: [profile.name, profile.role, ...Object.values(skills).flat()],
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.nishchayag.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "https://www.nishchayag.com",
    siteName: `${profile.name}’s Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} scroll-smooth motion-reduce:scroll-auto`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              description: profile.tagline,
              url: "https://www.nishchayag.com",
              sameAs: profile.socials.map((s) => s.href),
              knowsAbout: Object.values(skills).flat(),
            }),
          }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
