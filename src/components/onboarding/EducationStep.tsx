import { motion } from "motion/react";

type EducationStepProps = {
  value: { degree: string; major: string };
  onChange: (degree: string, major: string) => void;
  onContinue: () => void;
  onBack: () => void;
};

const DEGREE_OPTIONS = ["High School", "Bachelor's", "Master's", "PhD"];

const MAJOR_OPTIONS = [
  "Computer Science",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Business",
  "Design",
  "Mathematics",
];

export const EducationStep = ({
  value,
  onChange,
  onContinue,
  onBack,
}: EducationStepProps) => {
  const canContinue = value.degree !== "" && value.major !== "";

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-b from-black via-black to-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl"
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
            <span className="text-white/70">Step 1 of 4</span>
            <div className="flex gap-1">
              <span className="w-6 h-[2px] bg-accent" />
              <span className="w-6 h-[2px] bg-white/20" />
              <span className="w-6 h-[2px] bg-white/20" />
              <span className="w-6 h-[2px] bg-white/20" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6 md:px-8 md:py-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2">
              Let&apos;s start with your education
            </h1>
            <p className="text-sm text-white/60">
              Tell us about your current academic background.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                Current Degree
              </label>
              <div className="relative rounded-full border border-white/15 bg-black/50 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.8)] overflow-hidden">
                <select
                  className="w-full bg-transparent px-4 py-2 text-sm rounded-full outline-none appearance-none transition-colors text-white/80 focus:bg-white/5/10 focus:text-white"
                  value={value.degree}
                  onChange={(e) => onChange(e.target.value, value.major)}
                >
                  <option value="">Select your degree</option>
                  {DEGREE_OPTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-xs">
                  ▼
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                Branch / Major
              </label>
              <div className="relative rounded-full border border-white/15 bg-black/50 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.8)] overflow-hidden">
                <select
                  className="w-full bg-transparent px-4 py-2 text-sm rounded-full outline-none appearance-none transition-colors text-white/80 focus:bg-white/5/10 focus:text-white"
                  value={value.major}
                  onChange={(e) => onChange(value.degree, e.target.value)}
                >
                  <option value="">Select your major</option>
                  {MAJOR_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white/60 bg-white/10 rounded-full px-2 py-0.5 border border-white/20">
                  ▼
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              disabled={!canContinue}
              onClick={onContinue}
              className={`px-6 py-2 text-xs md:text-sm tracking-[0.2em] uppercase border border-white/20 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-red-500 hover:border-red-400 hover:text-white transition-colors ${
                !canContinue ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

