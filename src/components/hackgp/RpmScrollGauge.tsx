import { useEffect, useState } from "react";

/**
 * RPM-style scroll progress gauge.
 * Needle sweeps from min to max as the user scrolls the page.
 * Arc colored: green (safe) → yellow (caution) → red (redline).
 */
export default function RpmScrollGauge() {
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Geometry — arc spans 240° from -210° (bottom-left) to +30° (bottom-right)
  const SIZE = 110;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const R = 44;
  const START = -210; // degrees
  const END = 30;
  const SWEEP = END - START; // 240
  const angle = START + progress * SWEEP;

  const polar = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
  };

  const arcPath = (from: number, to: number, r: number) => {
    const a = polar(from, r);
    const b = polar(to, r);
    const large = to - from > 180 ? 1 : 0;
    return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
  };

  // Zones: 0–60% green, 60–85% yellow, 85–100% red
  const greenEnd = START + 0.6 * SWEEP;
  const yellowEnd = START + 0.85 * SWEEP;

  // Tick marks
  const ticks = Array.from({ length: 13 }, (_, i) => {
    const t = i / 12;
    const a = START + t * SWEEP;
    const inner = polar(a, R - 4);
    const outer = polar(a, R + 1);
    const major = i % 2 === 0;
    return { a, inner, outer, major };
  });

  const needleTip = polar(angle, R - 6);
  const pct = Math.round(progress * 100);

  return (
    <div
      aria-hidden="true"
      className="fixed bottom-5 right-5 z-40 pointer-events-none hidden sm:block"
      style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.6))" }}
    >
      <div
        className="rounded-full p-1.5"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, hsl(0 0% 22%), hsl(0 0% 6%) 70%)",
          border: "1px solid hsl(var(--primary) / 0.35)",
        }}
      >
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <defs>
            <radialGradient id="dial" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="hsl(0 0% 12%)" />
              <stop offset="100%" stopColor="hsl(0 0% 3%)" />
            </radialGradient>
          </defs>
          <circle cx={CX} cy={CY} r={R + 6} fill="url(#dial)" />

          {/* Zone arcs */}
          <path
            d={arcPath(START, greenEnd, R)}
            stroke="hsl(140 70% 45%)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="butt"
          />
          <path
            d={arcPath(greenEnd, yellowEnd, R)}
            stroke="hsl(48 100% 55%)"
            strokeWidth="3"
            fill="none"
          />
          <path
            d={arcPath(yellowEnd, END, R)}
            stroke="hsl(0 90% 55%)"
            strokeWidth="3"
            fill="none"
          />

          {/* Ticks */}
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.inner.x}
              y1={t.inner.y}
              x2={t.outer.x}
              y2={t.outer.y}
              stroke={t.major ? "hsl(0 0% 90%)" : "hsl(0 0% 50%)"}
              strokeWidth={t.major ? 1.4 : 0.8}
            />
          ))}

          {/* Needle */}
          <line
            x1={CX}
            y1={CY}
            x2={needleTip.x}
            y2={needleTip.y}
            stroke="hsl(0 90% 55%)"
            strokeWidth="2.2"
            strokeLinecap="round"
            style={{ transition: "all 0.15s ease-out" }}
          />
          <circle cx={CX} cy={CY} r="5" fill="hsl(0 0% 18%)" stroke="hsl(0 0% 35%)" />

          {/* Readout */}
          <text
            x={CX}
            y={CY + 22}
            textAnchor="middle"
            fontSize="9"
            fontFamily="Orbitron, sans-serif"
            fontWeight="700"
            fill="hsl(var(--gold))"
          >
            {pct}%
          </text>
          <text
            x={CX}
            y={CY + 32}
            textAnchor="middle"
            fontSize="5"
            fontFamily="Rajdhani, sans-serif"
            letterSpacing="2"
            fill="hsl(0 0% 65%)"
          >
            LAP
          </text>
        </svg>
      </div>
    </div>
  );
}
