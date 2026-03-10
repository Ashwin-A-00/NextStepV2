import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Mission } from "./components/Mission";
import { TrendingPaths } from "./components/Catalog";
import { Team } from "./components/Team";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <main className="relative bg-black min-h-screen selection:bg-accent selection:text-white">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      <Navbar />
      
      <div className="relative">
        <Hero />
        <Mission />
        <TrendingPaths />
        <Team />
        <CTA />
        <Footer />
      </div>

      {/* Cart Icon Simulation */}
      <div className="fixed bottom-6 right-6 z-[1000]">
        <button className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-sm shadow-xl hover:bg-accent hover:text-white transition-colors group">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[8px] flex items-center justify-center rounded-full border border-black">
            0
          </span>
        </button>
      </div>
    </main>
  );
}
