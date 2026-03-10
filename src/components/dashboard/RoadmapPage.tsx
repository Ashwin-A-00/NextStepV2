import { useState } from "react";
import { motion } from "motion/react";
import type { UserProfile } from "../../App";

type RoadmapPageProps = {
  profile: UserProfile;
  onBack: () => void;
};

type NodeState = "completed" | "current" | "locked";

type RoadmapNode = {
  id: string;
  title: string;
  known: boolean;
};

const buildNodes = (profile: UserProfile): RoadmapNode[] => {
  const topics = profile.topics.map((t) => t.toLowerCase());
  const isKnown = (keyword: string) =>
    topics.some((t) => t.includes(keyword.toLowerCase()));

  const nodes: RoadmapNode[] = [
    { id: "prog", title: "Programming Basics", known: isKnown("program") },
    { id: "html", title: "HTML & CSS", known: isKnown("html") || isKnown("css") },
    { id: "js", title: "JavaScript", known: isKnown("javascript") || isKnown("js") },
    { id: "git", title: "Git & GitHub", known: isKnown("git") },
    { id: "react", title: "React Framework", known: isKnown("react") },
    { id: "api", title: "API Integration", known: isKnown("api") },
    { id: "fullstack", title: "Full Stack Development", known: isKnown("full") },
  ];

  return nodes;
};

const describeNode = (node: RoadmapNode, goal: string) => {
  if (node.id === "boss") {
    return `A capstone simulation that mirrors a real ${goal || "industry"} hiring process with tasks, feedback, and reflection.`;
  }
  return `Core topic on your path to becoming a strong ${goal || "professional"}. Mastering this unlocks higher level skills and confidence.`;
};

export const RoadmapPage = ({ profile, onBack }: RoadmapPageProps) => {
  const baseNodes = buildNodes(profile);
  const firstUnknownIndex = baseNodes.findIndex((n) => !n.known);

  const nodesWithState = baseNodes.map((node, index) => {
    let state: NodeState = "locked";
    if (node.known) state = "completed";
    if (!node.known && index === firstUnknownIndex) state = "current";
    if (firstUnknownIndex === -1 && index === 0) {
      state = "current";
    }
    return { ...node, state };
  });

  const [activeId, setActiveId] = useState<string | null>(null);
  const activeNode = nodesWithState.find((n) => n.id === activeId);

  const handleMarkComplete = () => {
    if (!activeNode || activeNode.state !== "current") return;
    // In a real app we'd persist this; here we just close the modal.
    setActiveId(null);
  };

  const goal = profile.careerGoal || "career";

  const layout: Record<
    string,
    {
      x: number;
      y: number;
    }
  > = {
    prog: { x: 50, y: 18 },
    html: { x: 25, y: 38 },
    js: { x: 75, y: 38 },
    git: { x: 15, y: 62 },
    react: { x: 50, y: 58 },
    api: { x: 85, y: 62 },
    fullstack: { x: 50, y: 82 },
  };

  const edges: Array<[string, string]> = [
    ["prog", "html"],
    ["prog", "js"],
    ["html", "git"],
    ["html", "react"],
    ["js", "react"],
    ["js", "api"],
    ["react", "fullstack"],
    ["git", "fullstack"],
    ["api", "fullstack"],
  ];

  return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <button
          className="mb-6 inline-flex items-center px-3 py-1.5 text-xs text-white/60 border border-white/15 rounded-full bg-white/5 backdrop-blur-md hover:bg-red-500 hover:text-white hover:border-red-400 transition-colors"
          onClick={onBack}
        >
          ← Back to dashboard
        </button>

        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Skill Map
            </p>
            <h1 className="text-2xl md:text-3xl font-light tracking-tight mt-1">
              Path to become a {goal}
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-3 text-xs">
            <span className="px-2 py-1 border border-white/20 text-white/60 rounded-full bg-white/5 backdrop-blur-md">
              XP Level 03
            </span>
            <div className="min-w-[140px]">
              <div className="flex justify-between text-[10px] text-white/50 mb-1">
                <span>XP Progress</span>
                <span>1,240 / 2,000</span>
              </div>
              <div className="h-1.5 bg-white/10">
                <div className="h-full bg-accent" style={{ width: "62%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 h-[420px] md:h-[520px] bg-black/40 border border-white/10 rounded-2xl overflow-hidden">
          {/* Edges */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {edges.map(([from, to]) => {
              const a = layout[from];
              const b = layout[to];
              if (!a || !b) return null;
              return (
                <line
                  key={`${from}-${to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="rgba(148, 163, 184, 0.5)"
                  strokeWidth="0.4"
                  strokeDasharray="2 2"
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodesWithState.map((node) => {
            const pos = layout[node.id];
            if (!pos) return null;
            const state = node.state;
            const isCurrent = state === "current";
            const isCompleted = state === "completed";

            return (
              <button
                key={node.id}
                type="button"
                onClick={() =>
                  (state === "current" || state === "completed") &&
                  setActiveId(node.id)
                }
                className={`absolute flex flex-col items-center justify-center px-4 py-3 text-xs md:text-sm border rounded-2xl backdrop-blur-md transition-all ${
                  isCurrent
                    ? "bg-red-500/15 border-red-400 text-white shadow-[0_0_40px_rgba(248,113,113,0.5)]"
                    : isCompleted
                    ? "bg-emerald-500/10 border-emerald-400 text-white"
                    : "bg-black/40 border-white/15 text-white/40"
                }`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                  minWidth: "130px",
                }}
              >
                <span className="mb-1 text-[11px] uppercase tracking-[0.16em] text-white/50">
                  {isCompleted ? "Completed" : isCurrent ? "Available" : "Locked"}
                </span>
                <span className="truncate">{node.title}</span>
              </button>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 text-[11px] text-white/60 bg-black/50 border border-white/15 rounded-2xl px-3 py-2 backdrop-blur-md">
            <p className="uppercase tracking-[0.18em] mb-2 text-white/50">
              Legend
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/25" />
                <span>Locked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeNode && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center px-4 z-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-zinc-950 border border-white/20 px-6 py-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">
                  Skill Node
                </p>
                <h3 className="text-lg font-light text-white/90">
                  {activeNode.title}
                </h3>
              </div>
              <button
                className="text-xs text-white/60 border border-white/20 rounded-full px-2 py-0.5 bg-white/5 backdrop-blur-md hover:bg-red-500 hover:text-white hover:border-red-400"
                onClick={() => setActiveId(null)}
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-white/65 mb-3">
              {describeNode(activeNode, goal)}
            </p>
            <p className="text-xs text-white/50 mb-3">
              Market demand:{" "}
              <span className="text-accent">
                {activeNode.id === "boss" ? "98%" : "84%"}
              </span>
            </p>
            <div className="mb-4">
              <p className="text-[11px] text-white/50 mb-1">
                Recommended resource
              </p>
              <a
                href="#"
                className="text-xs text-accent hover:underline"
                onClick={(e) => e.preventDefault()}
              >
                Curated learning path on this topic (placeholder)
              </a>
            </div>
            <div className="flex justify-between items-center">
              <button
                className="px-3 py-1 text-xs text-white/70 border border-white/20 rounded-full bg-white/5 backdrop-blur-md hover:bg-red-500 hover:text-white hover:border-red-400"
                onClick={() => setActiveId(null)}
              >
                Close
              </button>
              {activeNode.state === "current" && (
                <button
                  className="px-4 py-2 text-xs uppercase tracking-[0.18em] border border-white/20 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-red-500 hover:border-red-400 hover:text-white transition-colors"
                  onClick={handleMarkComplete}
                >
                  Mark as Complete
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

