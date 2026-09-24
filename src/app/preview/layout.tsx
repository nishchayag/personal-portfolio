import type { Metadata } from "next";

// Redesign variants under review — keep them out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
