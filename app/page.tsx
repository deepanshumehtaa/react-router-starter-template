"use client";

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-black">
      <iframe
        src="/game/index.html"
        className="w-full h-full border-none"
        allow="fullscreen; autoplay"
        title="Stellar Escape"
      ></iframe>
    </main>
  );
}
