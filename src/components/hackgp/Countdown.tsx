import { useEffect, useState } from "react";

const TARGET = Date.now() + 30 * 24 * 60 * 60 * 1000;

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

export default function Countdown() {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Days", v: t.d },
    { label: "Hrs", v: t.h },
    { label: "Min", v: t.m },
    { label: "Sec", v: t.s },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-5 max-w-2xl mx-auto">
      {items.map((it) => (
        <div key={it.label} className="f1-card f1-card-hover px-2 py-5 text-center relative">
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-racing animate-pulse" />
          <div className="font-display text-3xl sm:text-5xl text-foreground tabular-nums">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="font-ui text-[10px] sm:text-xs text-silver mt-2">{it.label}</div>
        </div>
      ))}
    </div>
  );
}
