import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export default function PitCrewChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [steerAngle, setSteerAngle] = useState(0);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "🏁 **Race Control online.** I'm an AI pit-crew assistant — ask me anything about HACKGP: tracks, schedule, prizes, teams, or how to enter. Replies are AI-generated and stream live.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setSteerAngle((a) => a + 360);

    const userMsg: Msg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!resp.ok || !resp.body) {
        if (resp.status === 429) throw new Error("Race control is overloaded. Try again in a moment.");
        if (resp.status === 402) throw new Error("Out of fuel — please add credits to your workspace.");
        throw new Error("Race control failed to respond.");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";
      let started = false;

      const upsert = (chunk: string) => {
        acc += chunk;
        setMessages((prev) => {
          if (!started) {
            started = true;
            return [...prev, { role: "assistant", content: acc }];
          }
          const copy = prev.slice();
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      };

      let done = false;
      while (!done) {
        const { value, done: d } = await reader.read();
        if (d) break;
        buf += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, nl);
          buf = buf.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const j = line.slice(6).trim();
          if (j === "[DONE]") {
            done = true;
            break;
          }
          try {
            const p = JSON.parse(j);
            const c = p.choices?.[0]?.delta?.content;
            if (c) upsert(c);
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `🚨 ${err instanceof Error ? err.message : "Something went wrong."}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Race Control chat"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[60] h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.6)] border border-gold/40 items-center justify-center font-display text-lg ${open ? "hidden sm:flex" : "flex"}`}
      >
        {open ? "✕" : <HelmetIcon />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed z-50 bg-card border border-primary/30 shadow-[0_20px_60px_-10px_hsl(var(--primary)/0.4)] flex flex-col overflow-hidden inset-0 sm:inset-auto sm:bottom-24 sm:left-6 sm:w-[min(92vw,380px)] sm:h-[min(78vh,560px)] sm:rounded-lg"
            role="dialog"
            aria-label="Race Control AI chat"
          >
            {/* Header */}
            <div className="relative px-4 py-3 border-b border-primary/20 bg-gradient-to-r from-background via-card to-background">
              <div className="absolute top-0 left-0 right-0 h-0.5 racing-stripe" />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-ui text-[10px] text-gold tracking-widest">RACE CONTROL · AI</div>
                  <div className="font-display text-base">PIT <span className="text-racing-red">CREW</span></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-ui text-[10px] text-silver">LIVE AI</span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close chat"
                    className="h-8 w-8 rounded-full border border-primary/40 text-foreground hover:bg-primary/10 grid place-items-center font-display text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm font-body"
                        : "max-w-[90%] rounded-md bg-secondary text-foreground px-3 py-2 text-sm font-body border border-primary/15 prose prose-sm prose-invert prose-p:my-1 prose-strong:text-gold prose-a:text-racing-red"
                    }
                  >
                    {m.role === "assistant" ? (
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    ) : (
                      m.content
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && <CarLoader />}
            </div>

            {/* Input bar with steering wheel */}
            <form onSubmit={send} className="border-t border-primary/20 p-3 flex items-center gap-2 bg-background/60">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Radio in to race control…"
                disabled={loading}
                className="flex-1 bg-secondary border border-primary/20 rounded-md px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-50"
                aria-label="Message"
              />
              <motion.button
                type="submit"
                disabled={loading || !input.trim()}
                animate={{ rotate: steerAngle }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                aria-label="Send message"
                className="shrink-0 h-11 w-11 rounded-full bg-gradient-to-br from-primary to-racing-red border-2 border-gold/60 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_hsl(var(--primary)/0.5)] grid place-items-center"
              >
                <SteeringWheel />
              </motion.button>
            </form>

            <div className="px-3 pb-2 text-center font-ui text-[9px] text-muted-foreground tracking-wider">
              POWERED BY LOVABLE AI · RESPONSES ARE AI-GENERATED
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SteeringWheel() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" stroke="hsl(var(--gold))" />
      <circle cx="12" cy="12" r="2.5" fill="hsl(var(--gold))" stroke="none" />
      <path d="M12 5v4M5 14h4M19 14h-4M9 19l1.5-3M15 19l-1.5-3" stroke="hsl(var(--gold))" strokeLinecap="round" />
    </svg>
  );
}

function CarLoader() {
  return (
    <div className="flex items-center gap-2 pl-1" aria-label="AI is thinking">
      <div className="relative h-10 w-28">
        {/* Exhaust smoke */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute left-1 top-3 h-3 w-3 rounded-full bg-silver/50"
            initial={{ x: 0, y: 0, opacity: 0.6, scale: 0.6 }}
            animate={{ x: -28, y: -6, opacity: 0, scale: 1.6 }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4, ease: "easeOut" }}
          />
        ))}
        {/* Car */}
        <motion.div
          className="absolute top-0 left-2"
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        >
          <RaceCar />
        </motion.div>
        {/* Ground line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>
      <span className="font-ui text-[10px] text-gold tracking-widest">REVVING…</span>
    </div>
  );
}

function RaceCar() {
  return (
    <svg viewBox="0 0 80 32" className="h-8 w-24">
      <defs>
        <linearGradient id="body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="hsl(var(--primary))" />
          <stop offset="1" stopColor="hsl(0 80% 30%)" />
        </linearGradient>
      </defs>
      {/* main body */}
      <path
        d="M5 22 L12 14 L28 12 L46 8 L62 10 L72 14 L75 22 Z"
        fill="url(#body)"
        stroke="hsl(var(--gold))"
        strokeWidth="0.6"
      />
      {/* cockpit */}
      <path d="M34 12 L48 10 L52 14 L36 16 Z" fill="hsl(0 0% 10%)" stroke="hsl(var(--gold))" strokeWidth="0.4" />
      {/* front wing */}
      <rect x="68" y="20" width="10" height="2" fill="hsl(var(--foreground))" />
      {/* rear wing */}
      <rect x="2" y="12" width="3" height="10" fill="hsl(var(--foreground))" />
      {/* wheels */}
      <circle cx="18" cy="24" r="5" fill="hsl(0 0% 8%)" stroke="hsl(var(--silver))" strokeWidth="1" />
      <circle cx="62" cy="24" r="5" fill="hsl(0 0% 8%)" stroke="hsl(var(--silver))" strokeWidth="1" />
    </svg>
  );
}
