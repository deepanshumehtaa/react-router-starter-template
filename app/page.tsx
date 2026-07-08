export default function Home() {
  return (
    <div className="min-h-screen bg-[#d7eadf] text-slate-900">
      <main className="mx-auto flex min-h-screen max-w-[1400px] flex-col overflow-hidden rounded-[28px] bg-[#e6f0eb] shadow-xl shadow-slate-900/5 md:h-[calc(100vh-2rem)] md:flex-row">
        <aside className="flex h-full w-full flex-col border-r border-slate-200 bg-white md:w-[400px]">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-[#075e54] px-5 py-4 text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-200/85">WhatsApp</p>
              <h1 className="text-2xl font-semibold">Chats</h1>
            </div>
            <div className="flex items-center gap-3 text-[18px]">
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25">⚙️</button>
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25">✉️</button>
            </div>
          </div>

          <div className="p-4">
            <label className="sr-only" htmlFor="search">Search chats</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">🔍</span>
              <input
                id="search"
                type="search"
                placeholder="Search or start new chat"
                className="w-full rounded-full border border-slate-200 bg-slate-100/90 px-12 py-3 text-sm text-slate-900 outline-none transition focus:border-[#25d366] focus:ring-2 focus:ring-[#25d366]/20"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6">
            {[
              {
                name: "Tina",
                message: "See you in 10 minutes!",
                time: "12:43",
                status: "online",
              },
              {
                name: "Family Group",
                message: "Dinner is ready. Come soon!",
                time: "11:56",
                status: "3 new",
              },
              {
                name: "Work Bot",
                message: "Your report is due tomorrow.",
                time: "09:20",
                status: "offline",
              },
            ].map((chat) => (
              <article
                key={chat.name}
                className="group mb-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-slate-100"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-200 text-lg text-slate-700">
                      {chat.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-base font-semibold text-slate-900">{chat.name}</h2>
                      <p className="mt-1 text-sm text-slate-600">{chat.message}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">{chat.time}</p>
                    <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${chat.status === 'online' ? 'bg-emerald-100 text-emerald-800' : chat.status === 'offline' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800'}`}>
                      {chat.status}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>

        <section className="flex min-h-[640px] flex-1 flex-col bg-[radial-gradient(circle_at_top,_rgba(37,211,102,0.2),transparent_30%),#fbfcfa]">
          <header className="flex items-center justify-between border-b border-slate-200 bg-[#075e54] px-6 py-4 text-white">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-slate-100/20" />
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-200/75">Chat</p>
                <h2 className="text-xl font-semibold">Tina</h2>
              </div>
            </div>
            <div className="flex items-center gap-3 text-lg text-white/85">
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">📞</button>
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">📹</button>
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">⋮</button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 pb-28">
            <div className="space-y-4">
              <div className="flex items-end gap-3">
                <div className="max-w-[68%] rounded-[28px] rounded-br-none bg-white px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm">
                  Sure! I’m on my way now.
                </div>
                <span className="text-xs text-slate-500">12:45</span>
              </div>

              <div className="flex justify-end gap-3">
                <span className="hidden text-xs text-slate-500 md:block">12:46</span>
                <div className="max-w-[68%] rounded-[28px] rounded-bl-none bg-[#dcf8c6] px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm">
                  Perfect, I’ll bring the drinks.
                </div>
              </div>

              <div className="flex items-end gap-3">
                <div className="max-w-[68%] rounded-[28px] rounded-br-none bg-white px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm">
                  Do you want me to pick up something else?
                </div>
                <span className="text-xs text-slate-500">12:47</span>
              </div>

              <div className="flex justify-end gap-3">
                <span className="hidden text-xs text-slate-500 md:block">12:48</span>
                <div className="max-w-[68%] rounded-[28px] rounded-bl-none bg-[#dcf8c6] px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm">
                  Maybe chips and salsa. Thanks!
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 border-t border-slate-200 bg-[#f8f9f5] px-5 py-4">
            <div className="mx-auto flex max-w-[1100px] items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <button className="h-11 w-11 rounded-full text-xl text-[#25d366] transition hover:bg-slate-100">😊</button>
              <input
                className="flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                placeholder="Type a message"
              />
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25d366] text-white transition hover:bg-[#1ebc5b]">
                ➤
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
