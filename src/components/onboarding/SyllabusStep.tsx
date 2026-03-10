import { useState, KeyboardEvent } from "react";
import { motion } from "motion/react";

type SyllabusStepProps = {
  topics: string[];
  onChange: (topics: string[]) => void;
  onContinue: () => void;
  onBack: () => void;
};

const SUGGESTED_TOPICS = [
  "Data Structures",
  "Algorithms",
  "Database Management",
  "Operating Systems",
  "Computer Networks",
  "Machine Learning",
  "Web Development",
  "Cloud Computing",
  "Cybersecurity",
  "Software Engineering",
  "Object-Oriented Programming",
  "Statistics",
];

export const SyllabusStep = ({
  topics,
  onChange,
  onContinue,
  onBack,
}: SyllabusStepProps) => {
  const [input, setInput] = useState("");

  const handleAdd = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    if (topics.includes(trimmed)) return;
    onChange([...topics, trimmed]);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd(input);
    }
  };

  const handleRemove = (topic: string) => {
    onChange(topics.filter((t) => t !== topic));
  };

  const canContinue = topics.length >= 3;

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
            <span className="text-white/70">Step 2 of 4</span>
            <div className="flex gap-1">
              <span className="w-6 h-[2px] bg-accent/40" />
              <span className="w-6 h-[2px] bg-accent" />
              <span className="w-6 h-[2px] bg-white/20" />
              <span className="w-6 h-[2px] bg-white/20" />
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6 md:px-8 md:py-8">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2">
              What are you studying?
            </h1>
            <p className="text-sm text-white/60">
              Add at least 3 topics from your current syllabus.
            </p>
          </div>

          {topics.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic}
                  className="group flex items-center gap-1 px-3 py-1 text-xs bg-white/10 border border-white/20 text-white/90 hover:border-accent/80 transition-colors"
                  onClick={() => handleRemove(topic)}
                >
                  <span>{topic}</span>
                  <span className="text-white/50 group-hover:text-accent text-[10px]">
                    ×
                  </span>
                </button>
              ))}
            </div>
          )}

          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 bg-black/40 border border-white/15 px-3 py-2 text-sm rounded-none outline-none focus:border-accent/80 transition-colors placeholder:text-white/30"
                placeholder="Type a topic and press Enter"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="px-4 py-2 text-xs uppercase tracking-[0.18em] border border-white/20 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-red-500 hover:border-red-400 hover:text-white transition-colors"
                onClick={() => handleAdd(input)}
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
              Suggested topics
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_TOPICS.map((topic) => {
                const selected = topics.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleAdd(topic)}
                    className={`px-3 py-1 text-xs border rounded-full transition-colors ${
                      selected
                        ? "bg-white text-black border-white"
                        : "bg-white/5 text-white/80 border-white/20 hover:bg-red-500/80 hover:border-red-400 hover:text-white"
                    }`}
                  >
                    {topic}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center text-xs text-white/50">
            <span>
              {topics.length < 3
                ? `Add ${3 - topics.length} more topic${
                    3 - topics.length === 1 ? "" : "s"
                  } to continue`
                : "Looks good — you can continue."}
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

