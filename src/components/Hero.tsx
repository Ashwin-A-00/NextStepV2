import { motion } from "motion/react";
import { BlurText } from "./UI";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end p-6 md:p-10 overflow-hidden">
      {/* Background Image with Parallax-like effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
          alt="Career Guidance"
          className="w-full h-full object-cover opacity-40 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="relative z-10 max-w-7xl">
        <BlurText>
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-light leading-[0.85] tracking-tighter mb-12">
            NextStep <br />
            <span className="font-normal italic text-accent">Career</span> Guidance
          </h1>
        </BlurText>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-6">
            <BlurText delay={0.2}>
              <p className="text-sm md:text-base max-w-md text-white/80 leading-relaxed">
                We create career paths that easily fit into your life and give a feeling of purpose — without a reason, expectations, or unnecessary words.
              </p>
            </BlurText>
          </div>
          
          <div className="md:col-span-6 flex justify-end">
            <motion.div
              whileHover={{ scale: 0.95 }}
              className="w-32 h-32 md:w-48 md:h-48 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer group"
            >
              <a href="#start-journey" className="text-2xl md:text-3xl font-light group-hover:text-accent transition-colors">
                Catalog
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
