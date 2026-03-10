import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { UserProfile } from "../../App";
import { generateCareerSuggestions, type AICareerSuggestion, type AIGeneratedData } from "../../lib/ai";

type CareersPageProps = {
  profile: UserProfile;
  selectedCareerId: string | null;
  aiData: AIGeneratedData | null;
  onAIGenerated: (data: AIGeneratedData) => void;
  onSelectCareer: (id: string, careerData?: AICareerSuggestion) => void;
  onBack: () => void;
  onOpenRoadmap: () => void;
};

const DIFF_COLOR: Record<string, string> = {
  Low: "text-emerald-400 border-emerald-400/40 bg-emerald-400/8",
  Medium: "text-amber-400 border-amber-400/40 bg-amber-400/8",
  High: "text-red-400 border-red-400/40 bg-red-400/8",
};

export const CareersPage = ({
  profile,
  selectedCareerId,
  onSelectCareer,
  onBack,
  onOpenRoadmap,
}: CareersPageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [careers, setCareers] = useState<AICareerSuggestion[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const suggestions = await generateCareerSuggestions(profile);
        setCareers(suggestions);
      } catch (err) {
        console.error(err);
        setError("AI couldn't analyze your profile. Using fallback suggestions.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <section className="relative min-h-screen bg-gradient-to-b from-black via-black to-zinc-950 text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 border-4 border-white/10 border-t-accent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-light tracking-tight mb-2">AI is analyzing your profile…</h2>
          <p className="text-sm text-white/50 leading-relaxed">
            Matching your education, topics and interests to the best-fit career paths for you.
          </p>
        </motion.div>
      </section>
    );
  }

  const best = careers.find(c => c.isBestMatch) ?? careers[0];
  const others = careers.filter(c => c.id !== best?.id);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-black to-zinc-950 text-white px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        {/* Back button */}
        <button
          className="mb-6 inline-flex items-center px-3 py-1.5 text-xs text-white/60 border border-white/15 rounded-full bg-white/5 backdrop-blur-md hover:bg-red-500 hover:text-white hover:border-red-400 transition-colors"
          onClick={onBack}
        >
          ← Back
        </button>

        {/* Step indicator */}
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

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2">
            Your AI-matched career paths
          </h1>
          <p className="text-sm text-white/60">
            Based on your degree, topics and interests, the AI has ranked the best roles for you.
            Select the one that excites you most to build your personalized roadmap.
          </p>
          {error && <p className="text-xs text-amber-400 mt-2">{error}</p>}
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-6 md:px-8 md:py-8 rounded-2xl space-y-5">

          {/* Best Match */}
          {best && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-accent/40 bg-accent/5 px-5 py-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full border border-accent text-accent text-[10px] uppercase tracking-[0.16em] font-medium bg-accent/10">
                      🤖 AI Best Match
                    </span>
                    <span className="text-[11px] text-white/50">{best.match}% fit</span>
                  </div>
                  <h2 className="text-xl font-medium text-white mb-1">{best.title}</h2>
                  <p className="text-sm text-white/70 mb-3">{best.tagline}</p>
                  <div className="bg-black/30 border border-white/5 rounded-lg p-3 mb-3">
                    <p className="text-xs text-white/70 italic mb-2">"{best.reason}"</p>
                    <div className="flex flex-wrap gap-4 text-xs border-t border-white/5 pt-2">
                      <div>
                        <p className="text-white/40 uppercase tracking-widest text-[9px] mb-0.5">Difficulty</p>
                        <span className={`px-1.5 py-0.5 rounded-full border text-[11px] ${DIFF_COLOR[best.difficulty] ?? "text-white/60 border-white/20"}`}>
                          {best.difficulty}
                        </span>
                      </div>
                      <div>
                        <p className="text-white/40 uppercase tracking-widest text-[9px] mb-0.5">Timeline</p>
                        <p className="text-white/80">{best.timeline}</p>
                      </div>
                      <div>
                        <p className="text-white/40 uppercase tracking-widest text-[9px] mb-0.5">Focus</p>
                        <p className="text-white/80">{best.focus}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className="flex-shrink-0 px-5 py-2.5 bg-accent text-black font-semibold text-xs rounded-full hover:bg-white transition-colors tracking-wide"
                  onClick={() => {
                    onSelectCareer(best.id, best);
                    onOpenRoadmap();
                  }}
                >
                  Choose This Path →
                </button>
              </div>
            </motion.div>
          )}

          {/* Divider */}
          {others.length > 0 && (
            <p className="text-xs text-white/40 uppercase tracking-[0.14em] pt-1">Other great matches for you</p>
          )}

          {/* Other Paths */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((career, i) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`rounded-xl border px-4 py-4 flex flex-col justify-between transition-all cursor-pointer ${
                  selectedCareerId === career.id
                    ? "border-white/50 bg-white/10"
                    : "border-white/10 bg-black/30 hover:border-white/25 hover:bg-white/5"
                }`}
              >
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-medium text-white">{career.title}</h3>
                    <span className="text-[10px] text-white/50 bg-white/5 border border-white/10 rounded-full px-1.5 py-0.5">
                      {career.match}%
                    </span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">{career.tagline}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${DIFF_COLOR[career.difficulty] ?? "text-white/50 border-white/20"}`}>
                    {career.difficulty}
                  </span>
                  <button
                    className="text-xs px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-colors"
                    onClick={() => {
                      onSelectCareer(career.id, career);
                      onOpenRoadmap();
                    }}
                  >
                    Select →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
};
