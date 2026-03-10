import { motion } from "motion/react";
import { BlurText, LinkSlide } from "./UI";

const team = [
  {
    name: "Sophia Laurent",
    role: "The main mentor",
    bio: "Sophia creates paths where each individual reveals their shape, rhythm, and character. She works with minimalism as a precise tool.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"
  },
  {
    name: "Isabella Fox",
    role: "Career-designer",
    bio: "Isabella selects strategies that become a natural extension of your life, rather than just a decoration on top.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
  },
  {
    name: "Marcus Chen",
    role: "Growth Strategist",
    bio: "Marcus identifies hidden opportunities and helps you build a roadmap to reach your full potential with clarity and purpose.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Elena Rodriguez",
    role: "Skill Architect",
    bio: "Elena bridges the gap between your current abilities and your dream role, crafting personalized learning and development plans.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop"
  }
];

export const Team = () => {
  return (
    <section id="team" className="p-6 md:p-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="py-20 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20">
            <div className="md:col-span-6">
              <BlurText>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter">
                  A team <br />
                  <span className="text-white/40 italic">that reveals</span>
                </h2>
              </BlurText>
            </div>
            <div className="md:col-span-6">
              <BlurText delay={0.2}>
                <p className="text-sm md:text-base text-white/60 max-w-md leading-relaxed">
                  We are a company of mentors and aesthetes. People for whom form, silence and attention to detail are more important than loud words.
                </p>
              </BlurText>
            </div>
          </div>

          <div className="space-y-1">
            {team.map((member, index) => (
              <motion.div 
                key={member.name}
                className="group border-b border-white/10 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center cursor-pointer relative overflow-hidden"
                whileHover="hover"
              >
                <motion.div 
                  className="absolute inset-0 bg-white z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                />
                
                <div className="md:col-span-4 relative z-10 transition-colors duration-500 group-hover:text-black px-4">
                  <span className="text-3xl md:text-5xl font-light">{member.name}</span>
                </div>
                
                <div className="md:col-span-3 relative z-10 transition-colors duration-500 group-hover:text-black/60 px-4">
                  <span className="text-sm uppercase tracking-widest">{member.role}</span>
                </div>
                
                <div className="md:col-span-5 relative z-10 transition-colors duration-500 group-hover:text-black/50 px-4">
                  <p className="text-sm max-w-sm">{member.bio}</p>
                </div>

                {/* Floating Image on Hover */}
                <motion.div
                  variants={{
                    hover: { opacity: 1, scale: 1, y: 0 }
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 w-40 h-56 pointer-events-none z-20"
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
