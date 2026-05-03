import { motion } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#schedule", label: "Schedule" },
  { href: "#prizes", label: "Prizes" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
      style={{ background: "hsl(0 0% 4% / 0.7)", borderBottom: "1px solid hsl(var(--primary) / 0.2)" }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 relative">
            <div className="absolute inset-0 bg-racing rounded-sm rotate-45" />
            <div className="absolute inset-1 bg-background rounded-sm rotate-45 flex items-center justify-center">
              <span className="font-display text-[10px] text-gold -rotate-45">GP</span>
            </div>
          </div>
          <span className="font-display text-lg tracking-wider">
            HACK<span className="text-racing-red">GP</span>
          </span>
          <span className="font-ui text-[10px] text-silver hidden sm:inline border-l border-racing/40 pl-2 ml-1">
            2026
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-ui text-xs text-silver hover:text-foreground transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-racing transition-all group-hover:w-full" />
            </a>
          ))}
          <a href="#register" className="btn-primary-f1 !py-2 !px-5">Register</a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden font-ui text-xs text-foreground">
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-racing/20 px-5 py-4 flex flex-col gap-3 bg-background">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-ui text-sm text-silver">
              {l.label}
            </a>
          ))}
          <a href="#register" onClick={() => setOpen(false)} className="btn-primary-f1 w-fit">Register</a>
        </div>
      )}
    </motion.nav>
  );
}
