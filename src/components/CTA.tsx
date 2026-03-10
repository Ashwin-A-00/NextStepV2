import { motion } from "motion/react";
import { BlurText } from "./UI";

export const CTA = () => {
  return (
    <section id="start-journey" className="p-6 md:p-10 bg-black py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <BlurText>
          <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-8">
            Ready to <span className="italic font-normal text-accent">begin?</span>
          </h2>
        </BlurText>
        
        <BlurText delay={0.2}>
          <p className="text-sm md:text-base text-white/60 max-w-lg mb-12 leading-relaxed">
            Take the first step towards redefining your professional trajectory. Let's build a path that aligns with your true potential.
          </p>
        </BlurText>

        <BlurText delay={0.4}>
          <motion.a
            href="#contacts"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-12 py-5 bg-white text-black font-medium tracking-widest uppercase text-xs hover:bg-accent hover:text-white transition-colors duration-300"
          >
            Start your journey now
          </motion.a>
        </BlurText>
      </div>
    </section>
  );
};
