import React from "react";
import { motion } from "motion/react";

interface LinkSlideProps {
  href: string;
  children: string;
  className?: string;
}

export const LinkSlide = ({ href, children, className = "" }: LinkSlideProps) => {
  return (
    <a href={href} className={`link-slide ${className}`}>
      <span className="link-slide-inner">
        <span className="link-slide-text">{children}</span>
        <span className="link-slide-hover">{children}</span>
      </span>
    </a>
  );
};

export const BlurText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export const SectionTitle = ({ number, title, description }: { number: string; title: string; description: string }) => {
  return (
    <div className="py-20 border-t border-white/20 grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-1 text-3xl font-light">{number}</div>
      <div className="md:col-span-5">
        <h2 className="text-3xl md:text-5xl font-light leading-tight mb-6">
          {title}
        </h2>
      </div>
      <div className="md:col-span-6">
        <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-md">
          {description}
        </p>
      </div>
    </div>
  );
};
