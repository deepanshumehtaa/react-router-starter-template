import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Portfolio",
  description: "A modern portfolio built with Next.js and Cloudflare.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
