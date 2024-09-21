import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";

import Header from "@/components/header";
import Footer from "@/components/footer"; // 追加

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://today-i-learned.app'),
  title: "Today I Learned - AI-Powered Learning Assistant",
  description:
    "An AI-powered learning support tool that helps you record daily discoveries, interact with AI, and track your learning progress.",
  keywords: [
    "learning",
    "AI",
    "education",
    "personal growth",
    "knowledge management",
  ],
  authors: [{ name: "Hiroyuki Kuromiya" }],
  creator: "Hiroyuki Kuromiya",
  publisher: "Today I Learned",
  openGraph: {
    title: "Today I Learned - AI-Powered Learning Assistant",
    description:
      "Record your daily discoveries and experience your growth with AI support.",
    images: [{ url: "/images/og-image.jpg" }], // OGP画像のパスを適切に設定してください
  },
  twitter: {
    card: "summary_large_image",
    title: "Today I Learned - AI-Powered Learning Assistant",
    description:
      "Record your daily discoveries and experience your growth with AI support.",
    images: ["/images/og-image.jpg"], // Twitter用画像のパスを適切に設定してください
  },
  applicationName: "Today I Learned",
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer /> {/* 追加 */}
      </body>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
    </html>
  );
}
