import { useState, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  timestamp: number;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        if (response.ok) {
          const data: Message[] = await response.json();
          setMessages(data);
        } else {
          console.error('Failed to fetch messages:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newMessage }),
      });

      if (response.ok) {
        const savedMessage: Message = await response.json();
        setMessages((prevMessages) => [...prevMessages, savedMessage]);
        setNewMessage('');
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#d7eadf] text-slate-900">
      <main className="mx-auto flex min-h-screen max-w-[1400px] flex-col overflow-hidden rounded-[28px] bg-[#e6f0eb] shadow-xl shadow-slate-900/5 md:h-[calc(100vh-2rem)] md:flex-row">
        <aside className="flex h-full w-full flex-col border-r border-slate-200 bg-white md:w-[400px]">
          {/* ...existing code... */}

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

          
        </aside>

        <section className="flex min-h-[640px] flex-1 flex-col bg-[radial-gradient(circle_at_top,_rgba(37,211,102,0.2),transparent_30%),#fbfcfa]">
          <header className="flex items-center justify-between border-b border-slate-200 bg-[#075e54] px-6 py-4 text-white">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-slate-100/20" />
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-200/75">Chat</p>
                <h2 className="text-xl font-semibold">Your Messages</h2>
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
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-end gap-3 justify-end">
                  <div className="max-w-[68%] rounded-[28px] rounded-bl-none bg-[#dcf8c6] px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm">
                    {msg.content}
                  </div>
                  <span className="text-xs text-slate-500">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative border-t border-slate-200 bg-white p-6">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full rounded-full border border-slate-200 bg-slate-100/90 px-5 py-3 text-sm text-slate-900 outline-none transition focus:border-[#25d366] focus:ring-2 focus:ring-[#25d366]/20"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button
              onClick={handleSendMessage}
              className="absolute inset-y-0 right-6 my-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25d366] text-white transition hover:bg-[#1DA855]"
            >➡️</button>
          </div>
        </section>
      </main>
    </div>
  );
}


