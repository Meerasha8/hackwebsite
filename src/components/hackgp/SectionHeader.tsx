import { motion } from "framer-motion";

export function SectionHeader({ num, kicker, title }: { num: string; kicker: string; title: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-3">
        <span className="font-display text-5xl text-racing-red opacity-90">{num}</span>
        <div className="flex-1 h-px bg-racing/30" />
        <span className="font-ui text-[10px] text-gold">{kicker}</span>
      </div>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="font-display text-3xl sm:text-5xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
