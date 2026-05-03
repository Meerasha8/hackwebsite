import { MotionConfig } from "framer-motion";
import AnimatedBackground from "@/components/hackgp/AnimatedBackground";
import Nav from "@/components/hackgp/Nav";
import Hero from "@/components/hackgp/Hero";
import { About, Tracks, Schedule, Prizes, Sponsors, FAQ, Register, Footer } from "@/components/hackgp/Sections";

const Index = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <AnimatedBackground />
        <div className="relative z-10">
          <Nav />
          <main>
            <Hero />
            <About />
            <Tracks />
            <Schedule />
            <Prizes />
            <Sponsors />
            <FAQ />
            <Register />
          </main>
          <Footer />
        </div>
      </div>
    </MotionConfig>
  );
};

export default Index;
