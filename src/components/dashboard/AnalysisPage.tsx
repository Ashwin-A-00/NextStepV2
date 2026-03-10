import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import type { UserProfile } from "../../App";
import { getCareerById, getTopCareerMatch, generatePersonalizedAnalysis, type AIAnalysisData, type AIGeneratedData } from "../../lib/ai";

type AnalysisPageProps = {
  profile: UserProfile;
  selectedCareerId: string | null;
  aiData?: AIGeneratedData | null;
  onBack: () => void;
};

export const AnalysisPage = ({ profile, selectedCareerId, aiData, onBack }: AnalysisPageProps) => {
  const [analysis, setAnalysis] = useState<AIAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const name = profile.name || "Explorer";
  const selectedCareer = getCareerById(profile, selectedCareerId) || aiData?.career;
  const topMatch = selectedCareer || getTopCareerMatch(profile);
  const goal = topMatch?.title || profile.careerGoal || "Job Ready";

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const data = await generatePersonalizedAnalysis(profile, goal);
        setAnalysis(data);
      } catch (err) {
        console.error(err);
        setError("Failed to generate AI analysis.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [profile, goal]);

  const today = new Date();
  const addWeeks = (w: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + w * 7);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/10 border-t-accent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl md:text-2xl font-light tracking-tight">AI is evaluating your readiness...</h2>
          <p className="text-sm text-white/50 mt-2">Connecting your skills to market demand</p>
        </div>
      </section>
    );
  }

  if (error || !analysis) {
    return (
      <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-8">

        <p className="text-red-400">{error || "Something went wrong."}</p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">


        <div className="mb-8 bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6 md:px-8 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">
                Overall AI Analysis
              </p>
              <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-1">
                {name}&apos;s readiness for {goal}
              </h1>
              <p className="text-xs text-white/60">
                A definitive, data-driven snapshot merging your overall capabilities and specific gap areas.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">
                Readiness Score
              </p>
              <motion.div
                className="text-4xl font-light"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {analysis.readinessScore}
                <span className="text-base text-white/60"> / 100</span>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
              Skills Matched
            </p>
            <p className="text-2xl font-light">{analysis.matchedSkills.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
              Skills Missing
            </p>
            <p className="text-2xl font-light">{analysis.missingSkills.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
              Estimated Weeks
            </p>
            <p className="text-2xl font-light">{analysis.estimatedWeeks}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
              Strength Area
            </p>
            <p className="text-2xl font-light">{analysis.strongestArea || "Needs focus"}</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.7fr)] mb-8">
          {/* Radar Chart Replacement - using CSS grid bars comparing to market */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
              Strengths vs Market Demand
            </p>
            <div className="h-64 mt-4 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analysis.chartData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="category" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} width={80} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: 'rgba(255,255,255,0.8)' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="marketScore" name="Market Demand" fill="rgba(255,255,255,0.2)" radius={[0, 4, 4, 0]} barSize={12} />
                  <Bar dataKey="userScore" name="Your Score" fill="#F87171" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[11px] text-white/40 mt-6 leading-relaxed">
              This graph displays how your current proficiency correlates to real-world market requirements across essential architectural dimensions for {goal}.
            </p>
          </motion.div>

          {/* Missing Skills Gap Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6"
          >
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45 mb-1">
                Immediate Skill Gaps
              </p>
              <p className="text-xs text-white/60">
                The highest leverage skills you are currently missing, ranked by market demand.
              </p>
            </div>

            {analysis.missingSkills.length === 0 ? (
              <p className="text-sm text-white/50 italic py-4">Awesome job! AI indicates you have all the necessary core skills sorted.</p>
            ) : (
              <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
                {analysis.missingSkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="text-accent">{skill.demand}% Demand</span>
                    </div>
                    <div className="h-1.5 bg-white/10 overflow-hidden rounded-full">
                      <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.demand}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Learning Path Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6 mb-8"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
            AI Projected Learning Timeline
          </p>
          <div className="relative pt-2 pb-1">
            <div className="h-px bg-gradient-to-r from-accent/20 via-accent/60 to-accent/20 mb-4" />
            <div className="flex justify-between text-xs text-white/70">
              <div className="flex flex-col items-start gap-1">
                <span className="px-2 py-0.5 border border-white/20 text-[10px] rounded-sm bg-black/40">
                  Start
                </span>
                <span className="text-white/50">
                  {addWeeks(0)}
                </span>
              </div>

              {/* Calculating weeks purely for cosmetic display of progression */}
              <div className="flex flex-col items-center gap-1">
                <span className="px-2 py-0.5 border border-white/20 text-[10px] rounded-sm bg-black/40">
                  Midpoint
                </span>
                <span className="text-white/50">
                  {addWeeks(Math.floor(parseInt(analysis.estimatedWeeks.split("-")[0] || "12") / 2))}
                </span>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="px-2 py-0.5 border border-accent text-[10px] text-accent rounded-sm bg-accent/10">
                  Job Ready
                </span>
                <span className="text-white/50">
                  {addWeeks(parseInt(analysis.estimatedWeeks.split("-")[0] || "12"))}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button
            className="px-6 py-2.5 text-xs font-medium uppercase tracking-[0.18em] border border-white/20 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-white hover:border-white hover:text-black transition-colors"
            onClick={() => {
              const blob = new Blob(
                [
                  `NextStep AI Analysis Report for ${name}\n` +
                  `Goal: ${goal}\n` +
                  `Readiness Score: ${analysis.readinessScore}/100\n` +
                  `\nStrongest Area: ${analysis.strongestArea}` +
                  `\nMissing Skills to acquire: ${analysis.missingSkills.map(m => m.name).join(", ")}`
                ],
                { type: "text/plain" }
              );
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "nextstep-ai-analysis.txt";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Download AI Report
          </button>
        </div>
      </div>
    </section>
  );
};

