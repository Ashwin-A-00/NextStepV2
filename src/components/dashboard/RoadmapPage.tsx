import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import type { UserProfile } from "../../App";
import { getCareerById, getTopCareerMatch, type AIGeneratedData, generateNodeResources, generateRoadmapForCareer } from "../../lib/ai";

type RoadmapPageProps = {
  profile: UserProfile;
  selectedCareerId: string | null;
  aiData: AIGeneratedData | null;
  onBack: () => void;
};

type NodeState = "completed" | "current" | "locked";

type RoadmapNode = {
  id: string;
  title: string;
  known: boolean;
  description?: string;
  resources?: {
    label: string;
    url: string;
    type: string;
    duration: string;
  }[];
};

type NodeResource = {
  label: string;
  url: string;
  type: "course" | "doc" | "video" | "project";
  duration: string;
};

const buildNodes = (profile: UserProfile, careerId: string): RoadmapNode[] => {
  const topics = profile.topics.map((t) => t.toLowerCase());
  const isKnown = (keyword: string) =>
    topics.some((t) => t.includes(keyword.toLowerCase()));

  if (careerId === "data-scientist") {
    return [
      { id: "math", title: "Math & Statistics Basics", known: isKnown("math") || isKnown("stats") },
      { id: "python", title: "Python Programming", known: isKnown("python") },
      { id: "sql", title: "Data Analysis & SQL", known: isKnown("sql") || isKnown("data") },
      { id: "ml", title: "Machine Learning Foundations", known: isKnown("ml") || isKnown("machine learning") },
      { id: "exp", title: "Experimentation & A/B Testing", known: isKnown("experiment") },
      { id: "mlops", title: "Model Deployment & MLOps", known: isKnown("mlops") || isKnown("deployment") },
      { id: "projects", title: "Domain Projects Portfolio", known: isKnown("project") },
    ];
  }

  if (careerId === "product-manager") {
    return [
      { id: "foundations", title: "Product Foundations", known: isKnown("product") },
      { id: "research", title: "User & Market Research", known: isKnown("research") },
      { id: "roadmap", title: "Roadmapping & Prioritization", known: isKnown("roadmap") },
      { id: "delivery", title: "Delivery & Execution", known: isKnown("agile") || isKnown("scrum") },
      { id: "metrics", title: "Product Analytics & KPIs", known: isKnown("analytics") || isKnown("metrics") },
      { id: "storytelling", title: "Storytelling & Stakeholders", known: isKnown("stakeholder") },
      { id: "portfolio", title: "Case Studies & Portfolio", known: isKnown("case study") || isKnown("portfolio") },
    ];
  }

  if (careerId === "ux-designer") {
    return [
      { id: "ux", title: "UX Foundations", known: isKnown("ux") || isKnown("ui") },
      { id: "research", title: "User Research", known: isKnown("research") },
      { id: "wireframes", title: "Wireframes & Flows", known: isKnown("wireframe") },
      { id: "visual", title: "Visual Design & Systems", known: isKnown("figma") || isKnown("design system") },
      { id: "prototyping", title: "Interactive Prototyping", known: isKnown("prototype") },
      { id: "testing", title: "Usability Testing", known: isKnown("testing") },
      { id: "portfolio", title: "Case Studies & Portfolio", known: isKnown("portfolio") },
    ];
  }

  if (careerId === "devops-engineer") {
    return [
      { id: "linux", title: "Linux & Shell Basics", known: isKnown("linux") || isKnown("bash") },
      { id: "git", title: "Git & CI/CD", known: isKnown("git") || isKnown("ci") || isKnown("cd") },
      { id: "cloud", title: "Cloud Fundamentals", known: isKnown("aws") || isKnown("azure") || isKnown("gcp") },
      { id: "containers", title: "Containers & Docker", known: isKnown("docker") },
      { id: "k8s", title: "Kubernetes & Orchestration", known: isKnown("kubernetes") || isKnown("k8s") },
      { id: "observability", title: "Monitoring & Observability", known: isKnown("monitor") || isKnown("logs") },
      { id: "reliability", title: "Reliability & SRE Mindset", known: isKnown("sre") || isKnown("reliability") },
    ];
  }

  if (careerId === "business-analyst") {
    return [
      { id: "basics", title: "Business & Domain Basics", known: isKnown("business") },
      { id: "sql", title: "SQL & Data Extraction", known: isKnown("sql") },
      { id: "dashboards", title: "Dashboards & BI Tools", known: isKnown("excel") || isKnown("power bi") || isKnown("tableau") },
      { id: "requirements", title: "Requirements & Documentation", known: isKnown("requirements") || isKnown("doc") },
      { id: "ops", title: "Operations & Process Mapping", known: isKnown("operations") || isKnown("process") },
      { id: "experiments", title: "Experiments & Insights", known: isKnown("experiment") },
      { id: "stakeholders", title: "Stakeholder Communication", known: isKnown("stakeholder") },
    ];
  }

  // Default: software engineer / full‑stack developer
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

const describeNode = (node: RoadmapNode, careerTitle: string) => {
  if (node.id === "boss") {
    return `A capstone simulation that mirrors a real ${careerTitle || "industry"} hiring process with tasks, feedback, and reflection.`;
  }
  return `Core topic on your path to becoming a strong ${careerTitle || "professional"}. Mastering this unlocks higher level skills and confidence.`;
};

const getNodeResources = (
  careerId: string,
  nodeId: string
): NodeResource[] => {
  // These are curated, AI-inspired study recommendations per node.
  // In a real app you could fetch this from Gemini using GEMINI_API_KEY.
  if (careerId === "devops-engineer") {
    switch (nodeId) {
      case "linux":
        return [
          {
            label: "Linux Journey – Beginner Track",
            url: "https://linuxjourney.com/",
            type: "course",
            duration: "6–10 hrs",
          },
          {
            label: "The Linux Command Line, 2nd Edition (free PDF)",
            url: "https://linuxcommand.org/tlcl.php",
            type: "doc",
            duration: "Book • 20+ hrs",
          },
        ];
      case "git":
        return [
          {
            label: "Atlassian Git Tutorials: Branching, Merging, Workflows",
            url: "https://www.atlassian.com/git/tutorials",
            type: "doc",
            duration: "4–6 hrs",
          },
          {
            label: "CI/CD with GitHub Actions – FreeCodeCamp",
            url: "https://www.youtube.com/watch?v=R8_veQiYBjI",
            type: "video",
            duration: "2 hrs",
          },
        ];
      case "cloud":
        return [
          {
            label: "AWS Cloud Practitioner Essentials (Free Digital Training)",
            url: "https://www.aws.training/Details/eLearning?id=60697",
            type: "course",
            duration: "10–12 hrs",
          },
          {
            label: "Google Cloud Skills Boost – Cloud Essentials",
            url: "https://www.cloudskillsboost.google/paths/11",
            type: "course",
            duration: "8–10 hrs",
          },
        ];
      case "containers":
        return [
          {
            label: "Docker for Beginners – Play With Docker",
            url: "https://training.play-with-docker.com/",
            type: "course",
            duration: "4–6 hrs",
          },
          {
            label: "Docker Documentation – Get Started",
            url: "https://docs.docker.com/get-started/",
            type: "doc",
            duration: "3–5 hrs",
          },
        ];
      case "k8s":
        return [
          {
            label: "Kubernetes Basics – Interactive Tutorials",
            url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
            type: "course",
            duration: "3–5 hrs",
          },
          {
            label: "Certified Kubernetes Application Developer (CKAD) Prep",
            url: "https://www.cncf.io/certification/ckad/",
            type: "doc",
            duration: "Long‑term path",
          },
        ];
      case "observability":
        return [
          {
            label: "Prometheus & Grafana: Monitoring 101",
            url: "https://prometheus.io/docs/introduction/overview/",
            type: "doc",
            duration: "3–4 hrs",
          },
          {
            label: "Google SRE Book – Monitoring Distributed Systems",
            url: "https://sre.google/sre-book/monitoring-distributed-systems/",
            type: "doc",
            duration: "2–3 hrs",
          },
        ];
      case "reliability":
        return [
          {
            label: "Google SRE Book – Introduction to SRE",
            url: "https://sre.google/sre-book/introduction/",
            type: "doc",
            duration: "2–3 hrs",
          },
          {
            label: "Site Reliability Engineering Course – Udacity (Free)",
            url: "https://www.udacity.com/course/site-reliability-engineering--ud123",
            type: "course",
            duration: "10–15 hrs",
          },
        ];
      default:
        break;
    }
  }

  // Fallback generic resources for other careers / nodes.
  return [
    {
      label: `Official docs for ${nodeId}`,
      url: "https://developer.mozilla.org/",
      type: "doc",
      duration: "1–2 hrs",
    },
    {
      label: `Intro course on ${nodeId} – search on Coursera / edX`,
      url: "https://www.coursera.org/",
      type: "course",
      duration: "8–12 hrs",
    },
  ];
};

export const RoadmapPage = ({ profile, selectedCareerId, aiData, onBack }: RoadmapPageProps) => {
  const selectedCareer = getCareerById(profile, selectedCareerId) || aiData?.career;
  const topMatch = selectedCareer || getTopCareerMatch(profile);
  const inferredCareerId = topMatch?.id ?? "software-engineer";
  const inferredCareerTitle = topMatch?.title || profile.careerGoal || "career professional";

  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dynamicNodes, setDynamicNodes] = useState<RoadmapNode[] | null>(null);
  const [buildingRoadmap, setBuildingRoadmap] = useState(false);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    // Only fetch if AI data doesn't already have a roadmap for this career
    if (aiData?.roadmap && aiData.roadmap.length > 0) return;
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const fetchRoadmap = async () => {
      setBuildingRoadmap(true);
      try {
        const nodes = await generateRoadmapForCareer(profile, inferredCareerTitle);
        if (nodes && nodes.length > 0) setDynamicNodes(nodes);
      } catch (e) {
        console.warn("Dynamic roadmap generation failed:", e);
      } finally {
        setBuildingRoadmap(false);
      }
    };
    fetchRoadmap();
  }, [inferredCareerTitle]);

  const [aiStudyMaterials, setAiStudyMaterials] = useState<Record<string, NodeResource[]>>({});
  const [loadingMaterials, setLoadingMaterials] = useState<string | null>(null);

  const fetchDynamicMaterials = async (node: RoadmapNode, careerGoal: string) => {
    // Skip if already fetched or already has robust predefined resources
    if (aiStudyMaterials[node.id]) return;
    if (node.resources && node.resources.length > 0) return;

    setLoadingMaterials(node.id);
    try {
      const resources = await generateNodeResources(profile, node.title, careerGoal);
      if (resources && resources.length > 0) {
        setAiStudyMaterials(prev => ({ ...prev, [node.id]: resources }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMaterials(null);
    }
  };

  const baseNodes: RoadmapNode[] = dynamicNodes ?? aiData?.roadmap ?? buildNodes(profile, inferredCareerId);
  const evaluatedNodes = baseNodes.map(node => ({
    ...node,
    known: node.known || completedNodes.includes(node.id)
  }));
  const firstUnknownIndex = evaluatedNodes.findIndex((n) => !n.known);

  const nodesWithState = evaluatedNodes.map((node, index) => {
    let state: NodeState = "locked";
    if (node.known) state = "completed";
    else if (!node.known && index === firstUnknownIndex) state = "current";
    else if (firstUnknownIndex === -1 && index === 0) {
      state = "current";
    }
    return { ...node, state };
  });

  const activeNode = nodesWithState.find((n) => n.id === activeId);

  const handleMarkComplete = () => {
    if (!activeNode || activeNode.state === "completed") return;
    setCompletedNodes((prev) => [...prev, activeNode.id]);
    setActiveId(null);
  };

  const goal = inferredCareerTitle;

  if (buildingRoadmap) {
    return (
      <section className="relative min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-white/10 border-t-accent rounded-full animate-spin mx-auto mb-6" />
          <h2 className="text-xl md:text-2xl font-light tracking-tight">Building your AI roadmap…</h2>
          <p className="text-sm text-white/50 mt-2">
            Synthesizing the best learning path for{" "}
            <span className="text-white/80">{goal}</span>
          </p>
        </div>
      </section>
    );
  }

  const layout: Record<string, { x: number; y: number }> = baseNodes.reduce(
    (acc, node, index) => {
      // Specific DAG Layout from user reference
      let x = 50;
      let y = 15;

      if (index === 0) { x = 50; y = 10; } // Core / Programming Basics
      else if (index === 1) { x = 20; y = 35; } // Left wing (HTML/CSS)
      else if (index === 2) { x = 80; y = 35; } // Right wing (JS)
      else if (index === 3) { x = 50; y = 50; } // Center (React Framework)
      else if (index === 4) { x = 10; y = 65; } // Far Left (Git)
      else if (index === 5) { x = 90; y = 65; } // Far Right (API)
      else if (index === 6) { x = 50; y = 85; } // Bottom Center (Full Stack)
      else {
        x = index % 2 === 0 ? 30 : 70;
        y = 20 + Math.min(index * 10, 70);
      }

      acc[node.id] = { x, y };
      return acc;
    },
    {} as Record<string, { x: number; y: number }>
  );

  const edges: Array<[string, string]> = [];
  // Build tree branching edges based on visual DAG structure
  if (baseNodes.length > 1) edges.push([baseNodes[0].id, baseNodes[1].id]);
  if (baseNodes.length > 2) edges.push([baseNodes[0].id, baseNodes[2].id]);
  if (baseNodes.length > 3) {
    edges.push([baseNodes[0].id, baseNodes[3].id]);
    edges.push([baseNodes[1].id, baseNodes[3].id]);
    edges.push([baseNodes[2].id, baseNodes[3].id]);
  }
  if (baseNodes.length > 4) edges.push([baseNodes[1].id, baseNodes[4].id]);
  if (baseNodes.length > 5) edges.push([baseNodes[2].id, baseNodes[5].id]);
  if (baseNodes.length > 6) {
    edges.push([baseNodes[3].id, baseNodes[6].id]);
    edges.push([baseNodes[4].id, baseNodes[6].id]);
    edges.push([baseNodes[5].id, baseNodes[6].id]);
  }
  for (let i = 7; i < baseNodes.length; i++) {
    edges.push([baseNodes[i - 1].id, baseNodes[i].id]);
  }

  return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-8">
      <div className="max-w-5xl mx-auto">


        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              AI Roadmap
            </p>
            <h1 className="text-2xl md:text-3xl font-light tracking-tight mt-1">
              Path to become a {goal}
            </h1>
            <p className="text-xs text-white/60 mt-1 max-w-md">
              This roadmap is generated from your onboarding answers and the AI‑selected
              target role (<span className="text-white/80">{inferredCareerTitle}</span>),
              so the steps you see are specific to that career path.
            </p>
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

        <div className="relative mt-8 h-[600px] md:h-[800px] bg-black/40 border border-white/10 rounded-2xl overflow-hidden py-8">
          {/* Central spine line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

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

              const startX = a.x;
              const startY = a.y;
              const endX = b.x;
              const endY = b.y;

              return (
                <path
                  key={`${from}-${to}`}
                  d={`M ${startX} ${startY} L ${endX} ${endY}`}
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="0.4"
                  fill="none"
                  strokeDasharray="1 1.5"
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
                onClick={() => {
                  if (state !== "locked") {
                    setActiveId(node.id);
                    fetchDynamicMaterials(node, goal);
                  }
                }}
                disabled={state === "locked"}
                className={`absolute flex flex-col items-start justify-center px-5 py-4 text-xs md:text-sm border rounded-2xl backdrop-blur-xl transition-all w-[160px] md:w-[200px] ${isCurrent
                    ? "bg-white/10 border-white text-white shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:bg-white/20 hover:scale-105 cursor-pointer z-10"
                    : isCompleted
                      ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-50 hover:bg-emerald-500/20 hover:scale-105 cursor-pointer z-10"
                      : "bg-black/60 border-white/5 text-white/30 cursor-not-allowed grayscale"
                  }`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: pos.x < 50 ? "translate(0%, -50%)" : "translate(-100%, -50%)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]' : isCurrent ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-white/20'}`} />
                  <span className="text-[10px] uppercase tracking-[0.15em] opacity-70 font-medium">
                    {isCompleted ? "Completed" : isCurrent ? "Available" : "Locked"}
                  </span>
                </div>
                <span className="font-medium text-left leading-snug">{node.title}</span>
              </button>
            );
          })}

          {/* Legend */}
          <div className="absolute top-8 left-8 text-[11px] text-white/80 flex gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="text-white/40">Locked</span>
            </div>
          </div>
        </div>
      </div>

      {activeNode && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4 z-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg bg-zinc-950/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-1">
                  Skill Node
                </p>
                <h3 className="text-xl font-medium text-white/90">
                  {activeNode.title}
                </h3>
              </div>
              <button
                className="text-xs text-white/60 hover:text-white transition-colors p-2"
                onClick={() => setActiveId(null)}
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-white/60 mb-5 leading-relaxed">
              {activeNode.description || describeNode(activeNode, goal)}
            </p>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 mb-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3">
                {loadingMaterials === activeNode.id ? "Synthesizing AI Study Material..." : "AI‑curated study material"}
              </p>

              {loadingMaterials === activeNode.id ? (
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-white/10 border-t-accent rounded-full animate-spin"></div>
                  <span className="text-xs text-white/40">Fetching deep links...</span>
                </div>
              ) : (
                <ul className="space-y-1.5">
                  {((activeNode.resources && activeNode.resources.length > 0)
                    ? activeNode.resources
                    : aiStudyMaterials[activeNode.id] || getNodeResources(inferredCareerId, activeNode.id)
                  ).map(
                    (res) => (
                      <li key={res.url || res.label} className="text-xs text-white/70">
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent hover:underline"
                        >
                          {res.label}
                        </a>
                        <span className="text-white/40 ml-1">
                          • {res.type} • {res.duration}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>

            <div className="flex justify-between items-center mt-2">
              <button
                className="px-5 py-2.5 text-xs font-medium text-white/60 hover:text-white transition-colors"
                onClick={() => setActiveId(null)}
              >
                Close
              </button>
              {activeNode.state !== "completed" && (
                <button
                  className="px-4 py-2 text-xs uppercase tracking-[0.18em] border border-white/20 bg-white text-black font-semibold rounded-full backdrop-blur-md hover:bg-white/80 transition-colors"
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

