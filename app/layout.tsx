import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stellar Escape - Play Free Space Platformer Game",
  description: "Escape the hostile sector in Stellar Escape, a thrilling 10-level space platformer game built with Phaser 3. Play directly in your browser!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
