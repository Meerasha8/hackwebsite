import { motion } from "framer-motion";

const F1Car = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* body */}
    <path d="M10 40 L30 30 L60 28 L80 18 L130 18 L150 28 L185 30 L190 40 Z" fill="currentColor" opacity="0.9" />
    {/* cockpit */}
    <path d="M85 18 L100 8 L120 8 L130 18 Z" fill="currentColor" opacity="0.6" />
    {/* front wing */}
    <rect x="0" y="38" width="20" height="6" fill="currentColor" opacity="0.7" />
    {/* rear wing */}
    <rect x="180" y="14" width="14" height="22" fill="currentColor" opacity="0.7" />
    <rect x="178" y="12" width="18" height="3" fill="currentColor" />
    {/* wheels */}
    <circle cx="40" cy="44" r="10" fill="#000" stroke="currentColor" strokeWidth="2" />
    <circle cx="160" cy="44" r="10" fill="#000" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const cars = [
  { top: "12%", duration: 14, delay: 0, color: "text-racing-red", scale: 1 },
  { top: "28%", duration: 22, delay: 3, color: "text-silver", scale: 0.8 },
  { top: "44%", duration: 18, delay: 6, color: "text-gold", scale: 0.9 },
  { top: "60%", duration: 26, delay: 1, color: "text-racing-red", scale: 0.7 },
  { top: "75%", duration: 16, delay: 9, color: "text-silver", scale: 1 },
  { top: "88%", duration: 20, delay: 4, color: "text-gold", scale: 0.75 },
];

export default function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(0 0% 8%) 0%, hsl(0 0% 4%) 70%)" }}
    >
      {/* grid lines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* F1 cars */}
      {cars.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.color}`}
          style={{ top: c.top, left: "-120px", width: 80 * c.scale, opacity: 0.18 }}
          animate={{ x: ["0vw", "120vw"] }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <F1Car />
        </motion.div>
      ))}

      {/* speed streaks */}
      {Array.from({ length: 14 }).map((_, i) => {
        const top = (i * 7 + 3) % 100;
        const dur = 1.2 + ((i * 13) % 20) / 10;
        const delay = (i * 0.4) % 5;
        const w = 80 + (i * 37) % 200;
        return (
          <motion.div
            key={`s-${i}`}
            className="absolute h-px"
            style={{
              top: `${top}%`,
              left: "-200px",
              width: w,
              background:
                "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.6), transparent)",
            }}
            animate={{ x: ["0vw", "120vw"] }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
          />
        );
      })}

      {/* vignette */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 40%, hsl(0 0% 0% / 0.7) 100%)"
      }} />
    </div>
  );
}
