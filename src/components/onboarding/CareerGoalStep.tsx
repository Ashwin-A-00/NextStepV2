import { useState } from "react";
import { motion } from "motion/react";

type CareerGoalStepProps = {
  careerGoal: string;
  onChange: (careerGoal: string) => void;
  onBack: () => void;
  onBuildRoadmap: () => void;
};

const CAREER_OPTIONS = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Full Stack Developer",
  "Business Analyst",
  "Cloud Architect",
  "Cybersecurity Analyst",
];

type Mode = "know" | "explore";

export const CareerGoalStep = ({
  careerGoal,
  onChange,
  onBack,
  onBuildRoadmap,
}: CareerGoalStepProps) => {
  const [mode, setMode] = useState<Mode>("know");
  const [customRole, setCustomRole] = useState("");

  const handleBuild = () => {
    const finalGoal = careerGoal || customRole || "Exploring Options";
    onChange(finalGoal);
    onBuildRoadmap();
  };

  const canContinue = (mode === "know" && !!careerGoal) || !!customRole;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-b from-black via-black to-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl"
      >
        <button
          className="mb-6 inline-flex items-center px-3 py-1.5 text-xs text-white/60 border border-white/15 rounded-full bg-white/5 backdrop-blur-md hover:bg-red-500 hover:text-white hover:border-red-400 transition-colors"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/40">
          <span>Onboarding</span>
          <div className="flex items-center gap-2">
            <span className="text-white/70">Step 4 of 4</span>
            <div className="flex gap-1">
              <span className="w-6 h-[2px] bg-accent/40" />
              <span className="w-6 h-[2px] bg-accent/40" />
              <span className="w-6 h-[2px] bg-accent/40" />
              <span className="w-6 h-[2px] bg-accent" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6 md:px-8 md:py-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2">
              What&apos;s your dream career?
            </h1>
            <p className="text-sm text-white/60">
              We&apos;ll create a personalized roadmap just for you.
            </p>
          </div>

          <div className="mb-4 inline-flex text-xs border border-white/20 bg-black/40 rounded-full overflow-hidden">
            <button
              type="button"
              onClick={() => setMode("know")}
              className={`px-4 py-2 uppercase tracking-[0.18em] ${
                mode === "know"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              I know what I want
            </button>
            <button
              type="button"
              onClick={() => setMode("explore")}
              className={`px-4 py-2 uppercase tracking-[0.18em] ${
                mode === "explore"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              I&apos;m exploring
            </button>
          </div>

          {mode === "know" && (
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                Choose your role
              </label>
              <div className="relative rounded-full border border-white/15 bg-black/50 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.8)] overflow-hidden">
                <select
                  className="w-full bg-transparent px-4 py-2 text-sm rounded-full outline-none appearance-none transition-colors text-white/80 focus:bg-white/5/10 focus:text-white"
                  value={careerGoal}
                  onChange={(e) => onChange(e.target.value)}
                >
                  <option value="">Select a role</option>
                  {CAREER_OPTIONS.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white/60 bg-white/10 rounded-full px-2 py-0.5 border border-white/20">
                  ▼
                </span>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
              Or enter your own
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-black/40 border border-white/15 px-3 py-2 text-sm rounded-none outline-none focus:border-accent/80 transition-colors placeholder:text-white/30"
                placeholder="Blockchain Developer"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
              />
              <button
                type="button"
                className="px-4 py-2 text-xs uppercase tracking-[0.18em] border border-white/20 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-red-500 hover:border-red-400 hover:text-white transition-colors"
                onClick={handleBuild}
              >
                Add
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              disabled={!canContinue}
              onClick={handleBuild}
              className={`px-6 py-2 text-xs md:text-sm tracking-[0.2em] uppercase border border-white/20 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-red-500 hover:border-red-400 hover:text-white transition-colors ${
                !canContinue ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              Build My Roadmap
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

