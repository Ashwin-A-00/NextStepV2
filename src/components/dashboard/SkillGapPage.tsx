import { motion } from "motion/react";
import type { UserProfile } from "../../App";

type SkillGapPageProps = {
  profile: UserProfile;
  onBack: () => void;
};

const ALL_MISSING_SKILLS = [
  { name: "System Design", demand: 94, why: "Design scalable systems that can handle real-world traffic and complexity." },
  { name: "Cloud Fundamentals", demand: 89, why: "Most modern products run on cloud platforms like AWS, Azure, or GCP." },
  { name: "Testing & QA", demand: 82, why: "Confidence in your code comes from reliable automated tests." },
  { name: "CI/CD Basics", demand: 80, why: "Continuous delivery pipelines keep teams shipping safely and quickly." },
  { name: "Security Foundations", demand: 78, why: "Understanding security best practices protects users and data." },
  { name: "Collaboration & Git", demand: 75, why: "Real-world work happens in teams with version control." },
  { name: "Communication Skills", demand: 73, why: "Clear async communication is critical in modern, distributed teams." },
];

export const SkillGapPage = ({ profile, onBack }: SkillGapPageProps) => {
  const jobReady = 34 + Math.min(profile.topics.length * 3, 20);
  const matched = Math.max(1, Math.round(profile.topics.length * 0.6) || 1);
  const toAcquire = ALL_MISSING_SKILLS.length;

  const hasSkills = profile.topics.length > 0;

  return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <button
          className="mb-6 inline-flex items-center px-3 py-1.5 text-xs text-white/60 border border-white/15 rounded-full bg-white/5 backdrop-blur-md hover:bg-red-500 hover:text-white hover:border-red-400 transition-colors"
          onClick={onBack}
        >
          ← Back to dashboard
        </button>

        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Skill Gap Analysis
            </p>
            <h1 className="text-2xl md:text-3xl font-light tracking-tight mt-1">
              How close are you to job-ready?
            </h1>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45 mb-2">
              Job Ready %
            </p>
            <p className="text-3xl font-light">{jobReady}%</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45 mb-2">
              Skills Matched
            </p>
            <p className="text-3xl font-light">{matched}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/15 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45 mb-2">
              Skills to Acquire
            </p>
            <p className="text-3xl font-light">{toAcquire}</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.7fr)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6"
          >
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45 mb-2">
                Skills you already have
              </p>
              <div className="relative w-32 h-32 mb-4">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    className="text-white/10"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    d="M18 2.5a15.5 15.5 0 1 1 0 31 15.5 15.5 0 0 1 0-31z"
                  />
                  <motion.path
                    className="text-accent"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="97.39"
                    strokeDashoffset="97.39"
                    d="M18 2.5a15.5 15.5 0 1 1 0 31 15.5 15.5 0 0 1 0-31z"
                    style={{ transformOrigin: "50% 50%", transform: "rotate(-90deg)" }}
                    animate={{
                      strokeDashoffset: hasSkills
                        ? (1 - Math.min(profile.topics.length / 8, 1)) * 97.39
                        : 97.39,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs text-white/50 uppercase tracking-[0.16em]">
                      Matched
                    </p>
                    <p className="text-lg font-light">{matched}</p>
                  </div>
                </div>
              </div>

              <ul className="space-y-1 text-xs text-white/70">
                {profile.topics.slice(0, 8).map((topic) => (
                  <li key={topic} className="flex items-center gap-2">
                    <span className="text-accent">✓</span>
                    <span>{topic}</span>
                  </li>
                ))}
                {profile.topics.length === 0 && (
                  <li className="text-white/50">
                    No syllabus topics yet — add them to see matched skills.
                  </li>
                )}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl border border-white/15 px-6 py-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/45 mb-1">
                  Skills to focus on
                </p>
                <p className="text-xs text-white/60">
                  Ranked by current market demand.
                </p>
              </div>
              <div className="relative inline-block rounded-full border border-white/15 bg-black/50 backdrop-blur-xl shadow-[0_0_40px_rgba(15,23,42,0.8)] overflow-hidden">
                <select className="bg-transparent px-4 py-1.5 pr-7 text-[11px] text-white/80 rounded-full outline-none appearance-none transition-colors focus:bg-white/5/10 focus:text-white">
                <option>{profile.careerGoal || "Primary career path"}</option>
                <option>Alternate: Full Stack Developer</option>
                <option>Alternate: Data Scientist</option>
                </select>
                <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] text-white/60 bg-white/10 rounded-full px-1.5 py-0.5 border border-white/20">
                  ▼
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {ALL_MISSING_SKILLS.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/80">{skill.name}</span>
                    <span className="text-white/60">{skill.demand}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${skill.demand}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/45 mb-3">
                Recommended next steps
              </p>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {ALL_MISSING_SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    className="border border-white/15 bg-black/40 px-3 py-3 text-xs"
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-white/85">{skill.name}</span>
                      <span className="px-2 py-0.5 border border-accent/60 text-[10px] text-accent">
                        {skill.demand}% demand
                      </span>
                    </div>
                    <p className="text-white/60 mb-1">{skill.why}</p>
                    <a
                      href="#"
                      className="text-[11px] text-accent hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      Open curated learning resource (placeholder)
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

