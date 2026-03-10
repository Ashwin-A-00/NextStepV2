import { motion } from "motion/react";

type InterestsStepProps = {
  interests: string[];
  onChange: (interests: string[]) => void;
  onContinue: () => void;
  onBack: () => void;
};

const INTEREST_CARDS = [
  {
    id: "Technology",
    title: "Technology",
    description: "Software, AI, and innovation",
  },
  {
    id: "Design",
    title: "Design",
    description: "UI/UX, graphics, and creativity",
  },
  {
    id: "Data",
    title: "Data",
    description: "Analytics, ML, and insights",
  },
  {
    id: "Business",
    title: "Business",
    description: "Strategy, management, and growth",
  },
  {
    id: "Finance",
    title: "Finance",
    description: "Banking, investments, and economics",
  },
  {
    id: "Marketing",
    title: "Marketing",
    description: "Branding, content, and growth",
  },
  {
    id: "Research",
    title: "Research",
    description: "Academia, R&D, and innovation",
  },
  {
    id: "Healthcare",
    title: "Healthcare",
    description: "Medicine, wellness, and biotech",
  },
  {
    id: "Education",
    title: "Education",
    description: "Teaching and knowledge sharing",
  },
];

export const InterestsStep = ({
  interests,
  onChange,
  onContinue,
  onBack,
}: InterestsStepProps) => {
  const toggleInterest = (id: string) => {
    if (interests.includes(id)) {
      onChange(interests.filter((i) => i !== id));
    } else {
      onChange([...interests, id]);
    }
  };

  const canContinue = interests.length >= 1;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-b from-black via-black to-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl"
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
            <span className="text-white/70">Step 3 of 4</span>
            <div className="flex gap-1">
              <span className="w-6 h-[2px] bg-accent/40" />
              <span className="w-6 h-[2px] bg-accent/40" />
              <span className="w-6 h-[2px] bg-accent" />
              <span className="w-6 h-[2px] bg-white/20" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6 md:px-8 md:py-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2">
              What interests you most?
            </h1>
            <p className="text-sm text-white/60">
              Select all areas that excite you.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {INTEREST_CARDS.map((card) => {
              const selected = interests.includes(card.id);
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => toggleInterest(card.id)}
                  className={`group text-left p-4 border rounded-2xl transition-all bg-white/5 backdrop-blur-md hover:border-red-400 hover:bg-red-500/10 ${
                    selected
                      ? "border-red-400 shadow-[0_0_40px_rgba(248,113,113,0.35)]"
                      : "border-white/15"
                  }`}
                >
                  <div className="mb-2 text-xs uppercase tracking-[0.2em] text-white/40">
                    {selected ? "Selected" : "Interest"}
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-light">{card.title}</h3>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        selected ? "bg-accent" : "bg-white/20"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-white/60">{card.description}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between items-center text-xs text-white/50">
            <span>
              {canContinue
                ? `${interests.length} interest${
                    interests.length === 1 ? "" : "s"
                  } selected`
                : "Select at least one interest to continue."}
            </span>
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

