import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vivid - Premium Photo Gallery",
  description: "A beautiful, responsive photo gallery adapted for Cloudflare edge deployment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
