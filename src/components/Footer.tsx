import { LinkSlide, BlurText } from "./UI";

export const Footer = () => {
  return (
    <footer id="contacts" className="p-6 md:p-10 bg-black min-h-screen flex flex-col justify-between relative overflow-hidden">
      {/* Background Text Simulation */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none opacity-10 select-none overflow-hidden whitespace-nowrap">
        <h2 className="text-[20vw] font-bold leading-none tracking-tighter uppercase translate-y-1/4">
          NextStep Guidance
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-20">
          <div className="md:col-span-6">
            <BlurText>
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-12">
                Get in <br />
                <span className="italic font-normal text-accent">touch</span>
              </h2>
            </BlurText>
            
            <div className="space-y-8">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-white/40">Email</p>
                <LinkSlide href="mailto:hello@nextstep.com" className="text-2xl md:text-4xl font-light">hello@nextstep.com</LinkSlide>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-white/40">Phone</p>
                <LinkSlide href="tel:+1234567890" className="text-2xl md:text-4xl font-light">+1 (234) 567-890</LinkSlide>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-end items-end text-right space-y-12">
            <div className="space-y-4">
              <p className="text-sm text-white/60 max-w-xs ml-auto">
                We are here when you want quiet beauty for no particular reason. Write to us and we will choose a path that matches your mood.
              </p>
              <div className="flex justify-end gap-4">
                <LinkSlide href="#">Instagram</LinkSlide>
                <LinkSlide href="#">LinkedIn</LinkSlide>
                <LinkSlide href="#">Telegram</LinkSlide>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/40">
        <p>© 2026 NextStep Career Guidance</p>
        <p>Quality Digital Mentorship</p>
        <p>Entertainment + Lifestyle Specialists</p>
      </div>
    </footer>
  );
};
