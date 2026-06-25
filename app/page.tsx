import Image from "next/image";

const skills = [
  "React",
  "Next.js",
  "Cloudflare",
  "Tailwind CSS",
  "TypeScript",
  "R2 / Edge UI",
];

const ArrowTrendingUpIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l5 5L21 6" />
  </svg>
);

const SparklesIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
    <path d="M4 12l1.5 4.5L9 18l-4.5 1.5L4 12Zm16 0l1.5 4.5L21 18l-4.5 1.5L20 12Z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const projects = [
  {
    title: "Modern Portfolio UI",
    description: "A polished portfolio experience with animation-led sections.",
    href: "#contact",
  },
  {
    title: "Cloudflare-Ready Deployment",
    description: "Optimized for Cloudflare Workers and R2-backed caching.",
    href: "#contact",
  },
  {
    title: "Fast UX Interactions",
    description: "Smooth animated cards, responsive layout, and accessible design.",
    href: "#contact",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-10 lg:px-10">
        <header className="mb-10 flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.4em] text-slate-400">Portfolio</p>
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">Designing bold digital experiences.</h1>
              <p className="mt-4 max-w-2xl text-slate-300 sm:text-lg">
                I build elegant, responsive portfolio sites with modern interactions optimized for Cloudflare.
              </p>
            </div>
            <div className="hidden rounded-3xl border border-slate-700 bg-slate-900/70 p-4 sm:block">
              <div className="relative h-36 w-36 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-sky-500 to-cyan-400">
                <Image src="/favicon.ico" alt="Portfolio logo" fill className="object-cover" />
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <div className="rounded-3xl bg-slate-950/80 p-6 shadow-xl ring-1 ring-white/5">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Featured</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Next.js + Cloudflare</h2>
              <p className="mt-2 text-slate-300">A modern portfolio built with performance-first styling and edge-ready server rendering.</p>
            </div>
            <div className="grid gap-4 sm:auto-rows-fr sm:grid-cols-2">
              <Card icon={<ArrowTrendingUpIcon />} title="Performance" description="Fast loading pages with fine-grained cache hints." />
              <Card icon={<SparklesIcon />} title="Design" description="Crisp UI with subtle gradients, blur, and depth." />
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_auto]">
          <div className="space-y-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-glow backdrop-blur-xl">
            <article className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.4em] text-slate-400">About</p>
                <h2 className="text-3xl font-semibold text-white">Crafted for modern creators.</h2>
                <p className="text-slate-300 leading-8">
                  This portfolio template is designed to present your story with confidence. Highlight your strengths, feature your best work, and keep the experience fast and memorable.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </article>

            <article className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Selected projects</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                {projects.map((project) => (
                  <a key={project.title} href={project.href} className="group rounded-3xl border border-slate-700 bg-slate-900/80 p-5 transition hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-900">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{project.title}</p>
                    <p className="mt-3 text-slate-300">{project.description}</p>
                  </a>
                ))}
              </div>
            </article>
          </div>

          <aside id="contact" className="rounded-3xl border border-slate-800 bg-slate-950/90 p-8 shadow-xl backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Contact</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Work together?</h2>
            <p className="mt-4 text-slate-300 leading-7">
              Let’s build a portfolio that reflects your personality, brand, and creative vision. Ready for a fast Cloudflare deployment with beautiful UI?
            </p>
            <div className="mt-8 space-y-5">
              <ContactCard icon={<EnvelopeIcon />} title="Say hello" detail="hello@portfolio.com" />
              <ContactCard icon={<SparklesIcon />} title="Book a call" detail="Available for freelance projects" />
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}

function Card({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 text-slate-300 shadow-xl transition hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-900">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">{icon}</div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-slate-400">{description}</p>
    </div>
  );
}

function ContactCard({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 text-slate-300 shadow-xl transition hover:border-slate-600 hover:bg-slate-900">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300">{icon}</div>
      <p className="text-base font-semibold text-white">{title}</p>
      <p className="mt-2 text-slate-400">{detail}</p>
    </div>
  );
}
