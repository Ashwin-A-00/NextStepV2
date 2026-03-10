import { motion } from "motion/react";
import type { UserProfile } from "../../App";

type AnalysisPageProps = {
  profile: UserProfile;
  onBack: () => void;
};

const CATEGORY_CONFIG = [
  { id: "Programming", key: "programming" },
  { id: "Frameworks", key: "frameworks" },
  { id: "Tools", key: "tools" },
  { id: "Concepts", key: "concepts" },
  { id: "Soft Skills", key: "soft" },
] as const;

const computeRadarScores = (profile: UserProfile) => {
  const topicCount = profile.topics.length;
  return {
    Programming: Math.min(40 + topicCount * 4, 86),
    Frameworks: Math.min(20 + topicCount * 3, 78),
    Tools: 35,
    Concepts: Math.min(30 + topicCount * 2, 80),
    "Soft Skills": 55,
  };
};

const computeCategoryBreakdown = (profile: UserProfile) => {
  const baseRequired = 8;
  const topics = profile.topics.length;
  return {
    Programming: { have: Math.min(topics, baseRequired), required: baseRequired },
    Frameworks: { have: Math.max(1, Math.min(Math.floor(topics / 3), baseRequired)), required: baseRequired },
    Tools: { have: 3, required: baseRequired },
    Concepts: { have: Math.max(2, Math.min(Math.floor(topics / 2), baseRequired)), required: baseRequired },
    "Soft Skills": { have: 4, required: baseRequired },
  };
};

export const AnalysisPage = ({ profile, onBack }: AnalysisPageProps) => {
  const name = profile.name || "Explorer";
  const goal = profile.careerGoal || "Job Ready";
  const readiness = 65;

  const radar = computeRadarScores(profile);
  const breakdown = computeCategoryBreakdown(profile);

  const strengthsSorted = Object.entries(radar).sort(
    (a, b) => (b[1] as number) - (a[1] as number)
  );
  const strongestArea = strengthsSorted[0][0];

  const today = new Date();
  const addWeeks = (w: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + w * 7);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  const marketDemand = [
    { name: "Programming", value: 90 },
    { name: "Frameworks", value: 85 },
    { name: "Tools", value: 78 },
    { name: "Concepts", value: 88 },
    { name: "Soft Skills", value: 80 },
  ];

  const userStrength = CATEGORY_CONFIG.map(({ id }) => ({
    name: id,
    value: (radar as any)[id] as number,
  }));

  return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <button
          className="mb-6 inline-flex items-center px-3 py-1.5 text-xs text-white/60 border border-white/15 rounded-full bg-white/5 backdrop-blur-md hover:bg-red-500 hover:text-white hover:border-red-400 transition-colors"
          onClick={onBack}
        >
          ← Back to dashboard
        </button>

        <div className="mb-8 bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6 md:px-8 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">
                Overall Analysis
              </p>
              <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-1">
                {name}&apos;s readiness for {goal}
              </h1>
              <p className="text-xs text-white/60">
                A snapshot of where you stand today and how your skills align with
                current market expectations.
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
                {readiness}
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
            <p className="text-2xl font-light">12</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
              Skills Missing
            </p>
            <p className="text-2xl font-light">18</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
              Estimated Weeks to Ready
            </p>
            <p className="text-2xl font-light">16–24</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
              Strength Area
            </p>
            <p className="text-2xl font-light">{strongestArea}</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.7fr)] mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
              Strengths across dimensions
            </p>
            <div className="relative h-56 flex items-center justify-center">
              <div className="absolute inset-6 border border-white/10 rounded-full" />
              <div className="absolute inset-10 border border-white/5 rounded-full" />
              <div className="absolute inset-14 border border-white/5 rounded-full" />
              <div className="absolute inset-20 border border-white/5 rounded-full" />
              <div className="absolute inset-24 border border-white/5 rounded-full" />

              <div className="relative w-40 h-40">
                {CATEGORY_CONFIG.map((cat, index) => {
                  const angle = (index / CATEGORY_CONFIG.length) * Math.PI * 2 - Math.PI / 2;
                  const r = 80;
                  const x = 50 + (r * Math.cos(angle)) / 100;
                  const y = 50 + (r * Math.sin(angle)) / 100;
                  const value = (radar as any)[cat.id] as number;
                  const rv = 35 + (value / 100) * 40;
                  const vx = 50 + (rv * Math.cos(angle)) / 100;
                  const vy = 50 + (rv * Math.sin(angle)) / 100;

                  return (
                    <div key={cat.id}>
                      <div
                        className="absolute text-[9px] text-white/60"
                        style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                      >
                        {cat.id}
                      </div>
                      <div
                        className="absolute w-1 h-1 bg-accent rounded-full"
                        style={{ left: `${vx}%`, top: `${vy}%`, transform: "translate(-50%, -50%)" }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
              Category breakdown
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {Object.entries(breakdown).map(([label, value]) => {
                const v = value as { have: number; required: number };
                const pct = Math.round((v.have / v.required) * 100);
                return (
                  <div key={label} className="border border-white/15 bg-black/40 px-3 py-3 text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="text-white/80">{label}</span>
                      <span className="text-white/60">
                        {v.have}/{v.required}
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/10 mb-1">
                      <div
                        className="h-full bg-accent"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-white/50">{pct}% complete</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6 mb-8"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
            Learning Path Timeline
          </p>
          <div className="relative">
            <div className="h-px bg-gradient-to-r from-white/20 via-white/40 to-white/20 mb-4" />
            <div className="flex justify-between text-xs text-white/70">
              <div className="flex flex-col items-start gap-1">
                <span className="px-2 py-0.5 border border-white/20 text-[10px]">
                  Start
                </span>
                <span className="text-white/50">
                  {addWeeks(0)}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="px-2 py-0.5 border border-white/20 text-[10px]">
                  Foundation Complete
                </span>
                <span className="text-white/50">
                  {addWeeks(6)}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="px-2 py-0.5 border border-white/20 text-[10px]">
                  Advanced Complete
                </span>
                <span className="text-white/50">
                  {addWeeks(14)}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="px-2 py-0.5 border border-accent text-[10px] text-accent">
                  Job Ready
                </span>
                <span className="text-white/50">
                  {addWeeks(22)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">
                Your strengths vs market demand
              </p>
              <div className="space-y-3">
                {marketDemand.map((m) => {
                  const userVal =
                    userStrength.find((u) => u.name === m.name)?.value ?? 0;
                  return (
                    <div key={m.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/80">{m.name}</span>
                      </div>
                      <div className="h-3 bg-white/5 relative">
                        <div
                          className="absolute inset-y-0 left-0 bg-accent/30"
                          style={{ width: `${m.value}%` }}
                        />
                        <div
                          className="absolute inset-y-0 left-0 bg-accent"
                          style={{ width: `${userVal}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-white/50 mt-1">
                        <span>Market: {m.value}%</span>
                        <span>You: {userVal}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 text-xs uppercase tracking-[0.18em] border border-white/20 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-red-500 hover:border-red-400 hover:text-white transition-colors"
            onClick={() => {
              // Simple client-side "download" placeholder
              const blob = new Blob(
                [
                  `NextStep Report for ${name}\nGoal: ${goal}\nReadiness: ${readiness}/100`,
                ],
                { type: "text/plain" }
              );
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "nextstep-report.txt";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Download Report
          </button>
        </div>
      </div>
    </section>
  );
};

