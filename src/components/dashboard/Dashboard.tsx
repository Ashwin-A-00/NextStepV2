import { useState } from "react";
import { motion } from "motion/react";
import { LayoutDashboard, Map, Briefcase, User, BarChart2, UserPlus, PieChart, LogOut, ChevronRight, ChevronLeft } from "lucide-react";
import type { UserProfile } from "../../App";
import { computeCareerMatches, getTopCareerMatch, type AICareerSuggestion } from "../../lib/ai";

type DashboardProps = {
  profile: UserProfile;
  selectedCareerId: string | null;
  selectedCareerData: AICareerSuggestion | null;
  onOpenProfile: () => void;
  onOpenCareers: () => void;
  onOpenRoadmap: () => void;
  onOpenAnalysis: () => void;
  onOpenProjectChart: () => void;
  onOpenMentorSupport: () => void;
};

const computeJobReadyScore = (profile: UserProfile) => {
  const base = 20;
  const topicBoost = Math.min(profile.topics.length * 4, 40);
  const interestBoost = Math.min(profile.interests.length * 3, 20);
  const degreeBoost = profile.degree ? 8 : 0;
  const goalBoost = profile.careerGoal ? 12 : 0;
  return Math.min(
    base + topicBoost + interestBoost + degreeBoost + goalBoost,
    96
  );
};

export const Dashboard = ({
  profile,
  selectedCareerId,
  selectedCareerData,
  onOpenProfile,
  onOpenCareers,
  onOpenRoadmap,
  onOpenAnalysis,
  onOpenProjectChart,
  onOpenMentorSupport,
}: DashboardProps) => {
  const score = computeJobReadyScore(profile);
  const matchedSkills = Math.max(
    1,
    Math.round(profile.topics.length * 0.6) || 1
  );
  const missingSkills = Math.max(3, matchedSkills + 4);
  const primaryGoal = profile.careerGoal || "Business Analyst";
  const suggestions = computeCareerMatches(profile);
  const selectedCareer =
    suggestions.find((m) => m.id === selectedCareerId) ?? null;
  const topMatch = selectedCareer || getTopCareerMatch(profile);

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-light">
              Welcome back, {profile.name || "Explorer"}!
            </h1>
            <p className="text-sm text-white/60 mt-1">
              Your journey to becoming a {primaryGoal} continues.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end text-xs text-white/60">
            <p className="mb-1 tracking-[0.18em] uppercase text-white/40">
              Level 4 • 1150 / 5000 XP
            </p>
            <div className="w-40 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-accent" />
            </div>
          </div>
        </div>

        {/* Selected AI Career Banner */}
        {selectedCareerData && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-2xl border border-accent/40 bg-accent/5 backdrop-blur-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-2 py-0.5 bg-accent/10">
                  🤖 Your AI Career Match
                </span>
                <span className="text-[11px] text-white/50">{selectedCareerData.match}% fit</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${selectedCareerData.difficulty === "Low" ? "text-emerald-400 border-emerald-400/30" :
                  selectedCareerData.difficulty === "High" ? "text-red-400 border-red-400/30" :
                    "text-amber-400 border-amber-400/30"
                  }`}>{selectedCareerData.difficulty}</span>
              </div>
              <h2 className="text-lg font-semibold text-white">{selectedCareerData.title}</h2>
              <p className="text-xs text-white/60 mt-0.5">{selectedCareerData.tagline}</p>
              <p className="text-xs text-white/50 mt-1 italic">"{selectedCareerData.reason}"</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                className="px-4 py-2 text-xs rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-colors"
                onClick={onOpenCareers}
              >
                Change Path
              </button>
              <button
                className="px-4 py-2 text-xs rounded-full bg-accent text-black font-semibold hover:bg-white transition-colors"
                onClick={onOpenRoadmap}
              >
                View Roadmap →
              </button>
            </div>
          </motion.div>
        )}

        {/* Top stats row */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/50 mb-1">
                Career Readiness
              </p>
              <p className="text-2xl font-semibold">{score}%</p>
              <p className="text-xs text-white/60 mt-1">Keep going!</p>
            </div>
            <p className="text-[11px] text-white/45 mt-3">
              ↑ +5% this week
            </p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/50 mb-1">
                Skills Completed
              </p>
              <p className="text-2xl font-semibold">
                {matchedSkills}/{matchedSkills + missingSkills}
              </p>
              <p className="text-xs text-white/60 mt-1">
                {missingSkills} remaining
              </p>
            </div>
            <p className="text-[11px] text-white/45 mt-3">
              ↑ +2 this month
            </p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/50 mb-1">
                Certifications
              </p>
              <p className="text-2xl font-semibold">1</p>
              <p className="text-xs text-white/60 mt-1">
                AWS Cloud Practitioner
              </p>
            </div>
            <p className="text-[11px] text-white/45 mt-3">
              Goal: 3 total
            </p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-white/50 mb-1">
                AI Career Match
              </p>
              <p className="text-sm font-semibold">
                {topMatch ? topMatch.title : "We need more info"}
              </p>
              <p className="text-xs text-white/60 mt-1">
                {topMatch
                  ? `Match score: ${topMatch.match}%`
                  : "Complete onboarding to unlock a personalized suggestion."}
              </p>
            </div>
            {topMatch && (
              <button
                className="mt-3 w-full text-[11px] rounded-full border border-white/20 px-3 py-2 text-white/80 hover:bg-accent hover:text-black hover:border-accent transition-colors text-center"
                onClick={onOpenCareers}
              >
                View full AI analysis
              </button>
            )}
          </div>
        </div>

        {/* Middle row: progress + next step */}
        <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)] mb-6">
          {/* Career progress */}
          <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-5 py-4 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.16em] text-white/50 mb-1">
                Career Progress
              </p>
              <p className="text-sm text-white/80 mb-2">{primaryGoal}</p>
              <p className="text-xs text-white/60">
                Stay consistent to unlock the next milestone in your roadmap.
              </p>
            </div>
            <div className="w-28 h-28 relative">
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
                  style={{
                    transformOrigin: "50% 50%",
                    transform: "rotate(-90deg)",
                  }}
                  animate={{ strokeDashoffset: (1 - score / 100) * 97.39 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs text-white/50 uppercase tracking-[0.16em]">
                    Ready
                  </p>
                  <p className="text-lg font-semibold">{score}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Your next step */}
          <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-5 py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/50 mb-1">
                  Your Next Step
                </p>
                <p className="text-sm text-white/80">
                  Recommended action to level up
                </p>
              </div>
              <button
                className="text-xs text-white/70 underline underline-offset-4"
                onClick={onOpenRoadmap}
              >
                View Roadmap
              </button>
            </div>
            <div className="mt-1 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-xs">
                ⚡
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Learn React Fundamentals
                </p>
                <p className="text-xs text-white/60">
                  Master component-based architecture and modern patterns.
                </p>
                <p className="text-[11px] text-white/50 mt-1">
                  8 hours • +100 XP
                </p>
              </div>
              <button className="px-4 py-2 text-xs rounded-full bg-white text-black hover:bg-accent hover:text-black transition-colors">
                Start Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom: quick gap summary */}
        <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-5 py-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.16em] text-white/50">
              Skill Gap Summary
            </p>
            <button
              className="text-xs text-white/70 underline underline-offset-4"
              onClick={onOpenAnalysis}
            >
              Open full view
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-3 text-xs">
            <div className="space-y-1">
              <p className="text-white/70">Skills Matched</p>
              <p className="text-lg font-semibold">{matchedSkills}</p>
            </div>
            <div className="space-y-1">
              <p className="text-white/70">Skills to Learn</p>
              <p className="text-lg font-semibold">{missingSkills}</p>
            </div>
            <div className="space-y-1">
              <p className="text-white/70">Estimated Time</p>
              <p className="text-lg font-semibold">4–6 months</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

