import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amar-295.me"),
  title: "Amarnath Sharma | Software Developer",
  description:
    "Software developer building modern web applications, APIs, and database-backed products with React, Next.js, Node.js, and TypeScript.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Amarnath Sharma - Software Developer",
    description:
      "React interfaces, REST APIs, database-backed products, and AI-integrated tools.",
    url: "/",
    siteName: "Amarnath Sharma",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Amarnath Sharma - Software Developer",
    description:
      "React interfaces, REST APIs, database-backed products, and AI-integrated tools.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon", sizes: "any" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
