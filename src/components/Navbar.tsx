import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LinkSlide } from "./UI";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!scrolled && (
          <motion.nav 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 left-0 w-full z-[1000] p-6 md:p-10 flex justify-between items-start pointer-events-none"
          >
            <div className="pointer-events-auto flex items-start gap-1">
              <a href="/" className="text-3xl font-medium tracking-tighter">N/s</a>
              <span className="text-[10px] mt-1">®</span>
            </div>
            
            <div className="hidden md:flex flex-col items-end gap-2 pointer-events-auto text-[13px]">
              <LinkSlide href="#ourmission">Our mission</LinkSlide>
              <LinkSlide href="#trending">Trending Paths</LinkSlide>
              <LinkSlide href="#team">Team</LinkSlide>
              <LinkSlide href="#contacts">Contacts</LinkSlide>
            </div>

            <div className="flex flex-col items-end gap-2 pointer-events-auto text-[13px] md:absolute md:left-1/2 md:-translate-x-1/2">
              <LinkSlide href="#">Li</LinkSlide>
              <LinkSlide href="#">Tw</LinkSlide>
            </div>

            <div className="md:hidden pointer-events-auto">
              <LinkSlide href="#trending">Menu</LinkSlide>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scrolled && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[1000] w-[calc(100%-2rem)] max-w-4xl pointer-events-none"
          >
            <div className="pointer-events-auto bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex justify-between items-center shadow-2xl">
              <a href="/" className="text-xl font-medium tracking-tighter">N/s</a>
              
              <div className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-widest">
                <LinkSlide href="#ourmission">Mission</LinkSlide>
                <LinkSlide href="#trending">Trending Paths</LinkSlide>
                <LinkSlide href="#team">Team</LinkSlide>
                <LinkSlide href="#contacts">Contacts</LinkSlide>
              </div>

              <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest">
                <LinkSlide href="#">Li</LinkSlide>
                <LinkSlide href="#">Tw</LinkSlide>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
