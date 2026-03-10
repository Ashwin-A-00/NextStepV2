import { motion } from "motion/react";
import { BlurText, LinkSlide } from "./UI";

const trendingJobs = [
  {
    id: "01",
    title: "AI/ML Engineer",
    category: "Artificial Intelligence",
    salary: "$140k - $220k",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Full Stack Developer",
    category: "Web Engineering",
    salary: "$110k - $180k",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Cloud Architect",
    category: "Infrastructure",
    salary: "$150k - $240k",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Cybersecurity Analyst",
    category: "Security",
    salary: "$120k - $190k",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
  }
];

export const TrendingPaths = () => {
  return (
    <section id="trending" className="p-6 md:p-10 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <BlurText>
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter">
              Trending <span className="italic font-normal text-white/40">Paths</span>
            </h2>
          </BlurText>
          <BlurText delay={0.2}>
            <p className="text-sm md:text-base max-w-xs text-white/60">
              The most sought-after roles in the software industry right now. High demand, rapid growth, and exceptional compensation.
            </p>
          </BlurText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingJobs.map((job, index) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="aspect-[3/4] overflow-hidden bg-white/5 relative">
                <motion.img 
                  src={job.image} 
                  alt={job.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  whileHover={{ scale: 1.05 }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 backdrop-blur-sm group-hover:backdrop-blur-0 transition-all duration-500 pointer-events-none opacity-20 group-hover:opacity-0" />
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-light">{job.title} — <span className="text-white/40">{job.category}</span></h3>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-sm font-light">{job.salary}</span>
                  <LinkSlide href="#start-journey" className="text-[10px] uppercase font-semibold tracking-widest">Explore Path</LinkSlide>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
