import type { UserProfile } from "../../App";

type CareersPageProps = {
  profile: UserProfile;
  onBack: () => void;
  onOpenRoadmap: () => void;
};

const CAREERS = [
  {
    title: "Software Engineer",
    tagline: "Build products millions use every day.",
    difficulty: "Medium",
    timeline: "6–9 months",
    focus: "Full‑stack, clean code, system design",
  },
  {
    title: "Data Scientist",
    tagline: "Turn messy data into clear decisions.",
    difficulty: "High",
    timeline: "9–12 months",
    focus: "Statistics, ML, experimentation",
  },
  {
    title: "Product Manager",
    tagline: "Own the roadmap from idea to launch.",
    difficulty: "Medium",
    timeline: "6–9 months",
    focus: "Strategy, storytelling, execution",
  },
  {
    title: "UX Designer",
    tagline: "Design experiences people love to use.",
    difficulty: "Medium",
    timeline: "6–9 months",
    focus: "Research, interaction, visual design",
  },
  {
    title: "DevOps Engineer",
    tagline: "Keep systems fast, reliable, and secure.",
    difficulty: "High",
    timeline: "9–12 months",
    focus: "Cloud, CI/CD, observability",
  },
  {
    title: "Business Analyst",
    tagline: "Bridge data, operations, and strategy.",
    difficulty: "Low",
    timeline: "4–6 months",
    focus: "SQL, dashboards, stakeholder alignment",
  },
];

export const CareersPage = ({
  profile,
  onBack,
  onOpenRoadmap,
}: CareersPageProps) => {
  const primaryGoal = profile.careerGoal || "Exploring options";

  return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <button
          className="mb-6 inline-flex items-center px-3 py-1.5 text-xs text-white/60 border border-white/15 rounded-full bg-white/5 backdrop-blur-md hover:bg-accent hover:text-black hover:border-accent transition-colors"
          onClick={onBack}
        >
          ← Back to dashboard
        </button>

        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Careers
            </p>
            <h1 className="text-2xl md:text-3xl font-light tracking-tight mt-1">
              Paths you can explore next
            </h1>
            <p className="text-xs text-white/60 mt-2 max-w-xl">
              Based on your current background and interest in{" "}
              <span className="text-white/80">{primaryGoal}</span>, here are
              high‑signal roles you can target. Each one comes with a different
              learning curve and reward profile.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {CAREERS.map((career) => (
            <div
              key={career.title}
              className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-4 flex flex-col justify-between hover:border-accent/80 hover:bg-white/10 transition-colors"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-1">
                  Career
                </p>
                <h2 className="text-sm font-medium text-white mb-1">
                  {career.title}
                </h2>
                <p className="text-xs text-white/60 mb-3">{career.tagline}</p>
              </div>
              <div className="mt-2 space-y-1 text-[11px] text-white/60">
                <p>
                  <span className="text-white/40">Difficulty:</span>{" "}
                  <span className="text-white/80">{career.difficulty}</span>
                </p>
                <p>
                  <span className="text-white/40">Typical timeline:</span>{" "}
                  <span className="text-white/80">{career.timeline}</span>
                </p>
                <p>
                  <span className="text-white/40">Core focus:</span>{" "}
                  <span className="text-white/80">{career.focus}</span>
                </p>
              </div>
              <button
                className="mt-3 w-full text-xs rounded-full border border-white/20 px-3 py-2 text-white/80 hover:bg-accent hover:text-black hover:border-accent transition-colors"
                onClick={onOpenRoadmap}
              >
                View roadmap for {career.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

