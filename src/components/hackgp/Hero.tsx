import { motion } from "framer-motion";
import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-24 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-ui text-[10px] sm:text-xs text-gold flex items-center gap-2 sm:gap-3 mb-6 text-center"
      >
        <span className="w-6 sm:w-8 h-px bg-gold shrink-0" />
        <span>Round 09 · Monaco · Sept 12–14, 2026</span>
        <span className="w-6 sm:w-8 h-px bg-gold shrink-0" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-[18vw] sm:text-[16vw] md:text-[12vw] lg:text-[10rem] leading-[0.85] text-center"
      >
        <span className="text-foreground">VELOCITY</span>
        <span className="text-racing-red">X</span>
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="racing-stripe h-px w-full max-w-3xl my-6 origin-left"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="font-ui-reg text-base sm:text-lg text-silver max-w-xl text-center mb-10"
      >
        48 hours. 1000 engineers. One Grand Prix of code. Build the future of motorsport, mobility & speed.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="w-full mb-12"
      >
        <Countdown />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <a href="#register" className="btn-primary-f1">Enter the race →</a>
        <a href="#tracks" className="btn-ghost-f1">View tracks</a>
      </motion.div>

      {/* Stats strip */}
      <div className="md:absolute md:bottom-6 inset-x-0 flex justify-center px-5 mt-12 md:mt-0">
        <div className="flex flex-wrap gap-x-6 sm:gap-x-10 gap-y-2 justify-center font-ui text-[10px] text-muted-foreground">
          <span>$250K · prize pool</span>
          <span className="text-racing-red">●</span>
          <span>1,000 · hackers</span>
          <span className="text-racing-red">●</span>
          <span>48 · hours</span>
          <span className="text-racing-red">●</span>
          <span>27 · countries</span>
        </div>
      </div>
    </section>
  );
}
