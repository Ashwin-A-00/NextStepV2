/// <reference types="vite/client" />
import type { UserProfile } from "../App";

export type CareerMatch = {
  id: string;
  title: string;
  tagline: string;
  difficulty: string;
  timeline: string;
  focus: string;
  match: number;
  reason: string;
};

export type AICareerSuggestion = {
  id: string;
  title: string;
  tagline: string;
  match: number;
  difficulty: string;
  timeline: string;
  focus: string;
  reason: string;
  isBestMatch?: boolean;
};

export type GeneratedRoadmapNode = {
  id: string;
  title: string;
  description: string;
  known: boolean;
  resources: {
    label: string;
    url: string;
    type: "course" | "doc" | "video" | "project";
    duration: string;
  }[];
};

export type AIGeneratedData = {
  career: CareerMatch;
  roadmap: GeneratedRoadmapNode[];
};

export type AIAnalysisData = {
  readinessScore: number;
  estimatedWeeks: string;
  strongestArea: string;
  matchedSkills: string[];
  missingSkills: { name: string; demand: number }[];
  chartData: { category: string; userScore: number; marketScore: number }[];
};

// ─── Static career definitions for fallback matching ─────────────────────────
const CAREER_DEFINITIONS = [
  {
    id: "software-engineer",
    title: "Software Engineer",
    tagline: "Build products millions use every day.",
    difficulty: "Medium",
    timeline: "6–9 months",
    focus: "Full‑stack, clean code, system design",
    keywords: ["cs", "computer", "software", "programming", "developer", "react", "full stack", "javascript"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    tagline: "Turn messy data into clear decisions.",
    difficulty: "High",
    timeline: "9–12 months",
    focus: "Statistics, ML, experimentation",
    keywords: ["data", "statistics", "ml", "machine learning", "ai", "python"],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    tagline: "Own the roadmap from idea to launch.",
    difficulty: "Medium",
    timeline: "6–9 months",
    focus: "Strategy, storytelling, execution",
    keywords: ["product", "management", "business", "strategy"],
  },
  {
    id: "ux-designer",
    title: "UX Designer",
    tagline: "Design experiences people love to use.",
    difficulty: "Medium",
    timeline: "6–9 months",
    focus: "Research, interaction, visual design",
    keywords: ["design", "ux", "ui", "figma", "research"],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    tagline: "Keep systems fast, reliable, and secure.",
    difficulty: "High",
    timeline: "9–12 months",
    focus: "Cloud, CI/CD, observability",
    keywords: ["cloud", "aws", "devops", "infrastructure", "kubernetes", "docker"],
  },
  {
    id: "business-analyst",
    title: "Business Analyst",
    tagline: "Bridge data, operations, and strategy.",
    difficulty: "Low",
    timeline: "4–6 months",
    focus: "SQL, dashboards, stakeholder alignment",
    keywords: ["business", "analysis", "finance", "operations"],
  },
] as const;

const normalizeProfileText = (profile: UserProfile) => {
  return [profile.degree, profile.major, profile.careerGoal, ...profile.topics, ...profile.interests]
    .join(" ")
    .toLowerCase();
};

export const computeCareerMatches = (profile: UserProfile): CareerMatch[] => {
  const text = normalizeProfileText(profile);

  const matches = CAREER_DEFINITIONS.map((c) => {
    let score = 20;

    c.keywords.forEach((k) => {
      if (text.includes(k)) score += 8;
    });

    if (profile.careerGoal.toLowerCase().includes(c.title.toLowerCase().split(" ")[0])) {
      score += 18;
    }

    score = Math.max(10, Math.min(score, 98));

    const reasonParts: string[] = [];
    if (profile.careerGoal) reasonParts.push(`your goal "${profile.careerGoal}"`);
    if (profile.major) reasonParts.push(`your major in ${profile.major}`);
    if (profile.interests.length) reasonParts.push(`interests in ${profile.interests.slice(0, 3).join(", ")}`);

    const reason = reasonParts.length > 0
      ? `Based on ${reasonParts.join(" and ")}, this path aligns strongly with your current direction.`
      : "This is a broadly applicable path given your current profile.";

    const match: CareerMatch = {
      id: c.id,
      title: c.title,
      tagline: c.tagline,
      difficulty: c.difficulty,
      timeline: c.timeline,
      focus: c.focus,
      match: Math.round(score),
      reason,
    };
    return match;
  }).sort((a, b) => b.match - a.match);

  return matches;
};

export const getTopCareerMatch = (profile: UserProfile): CareerMatch | null => {
  return computeCareerMatches(profile)[0] ?? null;
};

export const getCareerById = (
  profile: UserProfile,
  id: string | null | undefined
): CareerMatch | null => {
  if (!id) return null;
  return computeCareerMatches(profile).find((m) => m.id === id) ?? null;
};

// ─── Gemini helper ────────────────────────────────────────────────────────────
const geminiPost = async (prompt: string): Promise<string | null> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.warn("Gemini API Error:", err.substring(0, 200));
    return null;
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
};

const cleanJSON = (raw: string): string =>
  raw.replace(/```json/gi, "").replace(/```/g, "").trim();

// ─── Legacy: Generate career + roadmap in one call ────────────────────────────
export const generatePersonalizedCareerAndRoadmap = async (
  profile: UserProfile
): Promise<AIGeneratedData> => {
  const fallback: AIGeneratedData = {
    career: {
      id: "target-career",
      title: profile.careerGoal || "Tech Professional",
      tagline: "Your personalized generated path.",
      difficulty: "Medium",
      timeline: "6-9 months",
      focus: "Core fundamentals and projects",
      match: 85,
      reason: "Fallback path — AI analysis pending.",
    },
    roadmap: [
      { id: "foundations", title: "Core Foundations", description: "Learn foundational concepts.", known: false, resources: [] },
      { id: "tools", title: "Modern Tooling", description: "Master standard industry tools.", known: false, resources: [] },
      { id: "intermediate", title: "Intermediate Skills", description: "Deepen your knowledge.", known: false, resources: [] },
      { id: "advanced", title: "Advanced Architecture", description: "Understand complex systems.", known: false, resources: [] },
      { id: "capstone", title: "Capstone Project", description: "Build a portfolio project.", known: false, resources: [] },
    ],
  };

  const prompt = `
You are an expert career counselor and curriculum designer.
Analyze the following user profile and return a personalized career match and a learning roadmap.

USER PROFILE:
Name: ${profile.name || "User"}
Degree: ${profile.degree || "Unknown"}
Major: ${profile.major || "Unknown"}
Current Syllabus Topics: ${profile.topics.join(", ") || "None specified"}
General Interests: ${profile.interests.join(", ") || "None specified"}
Career Goal: ${profile.careerGoal || "Exploring"}

Return ONLY raw JSON with this exact structure, no markdown:
{
  "career": {
    "id": "kebab-case-id",
    "title": "Job Title",
    "tagline": "Short punchy tagline",
    "difficulty": "Medium",
    "timeline": "6-9 months",
    "focus": "Core focus area",
    "match": 95,
    "reason": "Why this fits their profile"
  },
  "roadmap": [
    {
      "id": "node-id",
      "title": "Node Title",
      "description": "Why this node is important",
      "known": false,
      "resources": []
    }
  ]
}`;

  const rawText = await geminiPost(prompt);
  if (!rawText) return fallback;

  try {
    return JSON.parse(cleanJSON(rawText)) as AIGeneratedData;
  } catch {
    return fallback;
  }
};

// ─── Generate multiple AI career suggestions ──────────────────────────────────
export const generateCareerSuggestions = async (
  profile: UserProfile
): Promise<AICareerSuggestion[]> => {
  const staticFallback: AICareerSuggestion[] = [
    { id: "software-engineer", title: "Software Engineer", tagline: "Build the backend and frontend of tomorrow.", match: 88, difficulty: "Medium", timeline: "6-9 months", focus: "Algorithms, web, system design", reason: "Strong CS background makes this a natural fit.", isBestMatch: true },
    { id: "data-scientist", title: "Data Scientist", tagline: "Find insight in every dataset.", match: 76, difficulty: "High", timeline: "9-12 months", focus: "ML, statistics, Python", reason: "Your analytical interests align well with data workflows.", isBestMatch: false },
    { id: "product-manager", title: "Product Manager", tagline: "Bridge teams, users and vision.", match: 68, difficulty: "Medium", timeline: "6-8 months", focus: "Research, strategy, execution", reason: "Business interest gives you a product-first mindset.", isBestMatch: false },
  ];

  const prompt = `
You are an expert career counselor.
Analyze this user profile and suggest the top 3-4 best-fit careers for them.

USER PROFILE:
Name: ${profile.name || "User"}
Degree: ${profile.degree || "Unknown"}
Major: ${profile.major || "Unknown"}
Topics: ${profile.topics.join(", ") || "None specified"}
Interests: ${profile.interests.join(", ") || "None specified"}
Career Goal: ${profile.careerGoal || "Exploring"}

Return ONLY a raw JSON array of 3-4 career suggestions. First item should be the best match.
[
  {
    "id": "kebab-case-id",
    "title": "Job Title",
    "tagline": "short punchy tagline",
    "match": 95,
    "difficulty": "Medium",
    "timeline": "6-9 months",
    "focus": "Core focus area",
    "reason": "Why this career fits them",
    "isBestMatch": true
  }
]
Set "isBestMatch": true ONLY for the first item.`;

  const rawText = await geminiPost(prompt);
  if (!rawText) return staticFallback;

  try {
    return JSON.parse(cleanJSON(rawText)) as AICareerSuggestion[];
  } catch {
    console.warn("Failed to parse career suggestions JSON, using fallback");
    return staticFallback;
  }
};

// ─── Generate roadmap for a chosen career ────────────────────────────────────
export const generateRoadmapForCareer = async (
  profile: UserProfile,
  careerTitle: string
): Promise<GeneratedRoadmapNode[]> => {
  const fallbackNodes: GeneratedRoadmapNode[] = [
    { id: "foundations", title: "Core Foundations", description: `Learn the foundational concepts of ${careerTitle}.`, known: false, resources: [] },
    { id: "tools", title: "Modern Tooling", description: `Master the standard tools used in ${careerTitle}.`, known: false, resources: [] },
    { id: "intermediate", title: "Intermediate Concepts", description: `Deepen your ${careerTitle} skills.`, known: false, resources: [] },
    { id: "projects", title: "Real-World Projects", description: "Build projects to demonstrate expertise.", known: false, resources: [] },
    { id: "advanced", title: "Advanced Topics", description: `Explore advanced ${careerTitle} concepts.`, known: false, resources: [] },
    { id: "portfolio", title: "Portfolio Building", description: `Showcase your best ${careerTitle} work.`, known: false, resources: [] },
    { id: "capstone", title: "Capstone Project", description: `Deliver a comprehensive ${careerTitle} project.`, known: false, resources: [] },
  ];

  const prompt = `
You are an expert curriculum designer. Generate a specific learning roadmap for someone aiming to become a "${careerTitle}".

USER PROFILE:
Degree: ${profile.degree || "Unknown"}
Major: ${profile.major || "Unknown"}
Current Topics Known: ${profile.topics.join(", ") || "None specified"}
Interests: ${profile.interests.join(", ") || "None specified"}

Provide exactly 7 sequential learning nodes tailored for "${careerTitle}".
Set "known: true" if the user likely already knows this topic from their profile.

Return ONLY raw JSON array with no markdown:
[
  {
    "id": "node-id",
    "title": "Node Title",
    "description": "Why this is important and what to learn",
    "known": false,
    "resources": [
      {
        "label": "Resource Name",
        "url": "https://real-link.com",
        "type": "course",
        "duration": "3 hrs"
      }
    ]
  }
]`;

  const rawText = await geminiPost(prompt);
  if (!rawText) return fallbackNodes;

  try {
    return JSON.parse(cleanJSON(rawText)) as GeneratedRoadmapNode[];
  } catch {
    console.warn(`Failed to parse roadmap JSON for: ${careerTitle}`);
    return fallbackNodes;
  }
};

// ─── Generate personalized analysis ──────────────────────────────────────────
export const generatePersonalizedAnalysis = async (
  profile: UserProfile,
  careerGoal: string
): Promise<AIAnalysisData> => {
  const fallback: AIAnalysisData = {
    readinessScore: Math.min(90, 40 + profile.topics.length * 5),
    estimatedWeeks: `${Math.max(8, 24 - profile.topics.length * 2)} weeks`,
    strongestArea: profile.topics[0] || "Technical Foundations",
    matchedSkills: profile.topics.slice(0, 4),
    missingSkills: [
      { name: "System Design", demand: 90 },
      { name: "Cloud Deployment", demand: 85 },
      { name: "API Development", demand: 80 },
    ],
    chartData: [
      { category: "Technical Skills", userScore: Math.min(85, 40 + profile.topics.length * 6), marketScore: 90 },
      { category: "Domain Knowledge", userScore: Math.min(75, 35 + profile.interests.length * 8), marketScore: 85 },
      { category: "Practical Experience", userScore: 40, marketScore: 80 },
      { category: "Tools & Frameworks", userScore: Math.min(65, 30 + profile.topics.length * 4), marketScore: 88 },
    ],
  };

  const prompt = `
You are an expert career readiness analyst.
Analyze this user profile and provide an honest skills gap analysis for their goal of becoming a "${careerGoal}".

USER PROFILE:
Degree: ${profile.degree || "Unknown"}
Major: ${profile.major || "Unknown"}
Current Topics: ${profile.topics.join(", ") || "None"}
Interests: ${profile.interests.join(", ") || "None"}

Return ONLY raw JSON with no markdown:
{
  "readinessScore": 65,
  "estimatedWeeks": "16 weeks",
  "strongestArea": "Programming Fundamentals",
  "matchedSkills": ["Skill A", "Skill B"],
  "missingSkills": [
    { "name": "Missing Skill", "demand": 90 }
  ],
  "chartData": [
    { "category": "Technical Skills", "userScore": 65, "marketScore": 90 }
  ]
}`;

  const rawText = await geminiPost(prompt);
  if (!rawText) return fallback;

  try {
    return JSON.parse(cleanJSON(rawText)) as AIAnalysisData;
  } catch {
    console.warn("Failed to parse analysis JSON, using fallback");
    return fallback;
  }
};

// ─── Build static nodes as fallback ──────────────────────────────────────────
export const buildNodes = (profile: UserProfile, careerId: string): GeneratedRoadmapNode[] => {
  const topicMap: Record<string, GeneratedRoadmapNode[]> = {
    "software-engineer": [
      { id: "dsa", title: "Data Structures & Algorithms", description: "The backbone of technical interviews and scalable code.", known: profile.topics.some(t => t.toLowerCase().includes("data struct") || t.toLowerCase().includes("algorithm")), resources: [{ label: "NeetCode 150", url: "https://neetcode.io/practice", type: "course", duration: "8–12 hrs" }] },
      { id: "web", title: "Web & API Fundamentals", description: "HTTP, REST APIs, HTML/CSS, JavaScript — the universal language of apps.", known: profile.topics.some(t => t.toLowerCase().includes("web")), resources: [{ label: "The Odin Project", url: "https://www.theodinproject.com/", type: "course", duration: "40–60 hrs" }] },
      { id: "react", title: "React & Modern Frontend", description: "Component-driven UIs that ship fast.", known: false, resources: [{ label: "React Docs", url: "https://react.dev/learn", type: "doc", duration: "6–10 hrs" }] },
      { id: "backend", title: "Backend & Databases", description: "Node.js, SQL/NoSQL—store, query, and serve data reliably.", known: false, resources: [{ label: "Full Stack Open", url: "https://fullstackopen.com/en/", type: "course", duration: "20–30 hrs" }] },
      { id: "system-design", title: "System Design", description: "Design scalable, fault-tolerant systems.", known: false, resources: [{ label: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", type: "doc", duration: "10–15 hrs" }] },
      { id: "devops-basics", title: "Git, CI/CD & Deployment", description: "Ship code like a pro: version control, pipelines, and cloud deploys.", known: false, resources: [{ label: "GitHub Actions Docs", url: "https://docs.github.com/en/actions", type: "doc", duration: "3–5 hrs" }] },
      { id: "portfolio-proj", title: "Portfolio Project", description: "Ship one complete, public, full-stack project.", known: false, resources: [{ label: "Awesome Project Ideas", url: "https://github.com/florinpop17/app-ideas", type: "project", duration: "20–40 hrs" }] },
    ],
    "data-scientist": [
      { id: "python", title: "Python for Data Science", description: "NumPy, Pandas — the bread and butter of every DS pipeline.", known: profile.topics.some(t => t.toLowerCase().includes("python")), resources: [{ label: "Kaggle Python Course", url: "https://www.kaggle.com/learn/python", type: "course", duration: "5 hrs" }] },
      { id: "stats", title: "Statistics & Probability", description: "Inference, distributions, hypothesis testing.", known: profile.topics.some(t => t.toLowerCase().includes("stat")), resources: [{ label: "Khan Academy Stats", url: "https://www.khanacademy.org/math/statistics-probability", type: "course", duration: "10–15 hrs" }] },
      { id: "ml", title: "Machine Learning Fundamentals", description: "Supervised, unsupervised, and evaluation metrics.", known: profile.topics.some(t => t.toLowerCase().includes("machinelearning") || t.toLowerCase().includes("ml")), resources: [{ label: "Andrew Ng ML Course", url: "https://www.coursera.org/learn/machine-learning", type: "course", duration: "30–40 hrs" }] },
      { id: "viz", title: "Data Visualization", description: "Matplotlib, Seaborn, Plotly — communicate findings visually.", known: false, resources: [{ label: "Kaggle Data Viz", url: "https://www.kaggle.com/learn/data-visualization", type: "course", duration: "4 hrs" }] },
      { id: "sql-ds", title: "SQL & Data Pipelines", description: "Query millions of rows. Build reproducible pipelines.", known: false, resources: [{ label: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "course", duration: "5–8 hrs" }] },
      { id: "deep-learning", title: "Deep Learning Basics", description: "Neural networks with PyTorch or TensorFlow.", known: false, resources: [{ label: "Fast.ai Practical DL", url: "https://course.fast.ai/", type: "course", duration: "20–30 hrs" }] },
      { id: "ds-project", title: "End-to-End DS Project", description: "Kaggle competition or real-world dataset analysis.", known: false, resources: [{ label: "Kaggle Competitions", url: "https://www.kaggle.com/competitions", type: "project", duration: "20–40 hrs" }] },
    ],
  };

  return topicMap[careerId] ?? topicMap["software-engineer"];
};

// ─── Generate node resources on-demand ───────────────────────────────────────
export const generateNodeResources = async (
  profile: UserProfile,
  nodeTitle: string,
  careerGoal: string
): Promise<GeneratedRoadmapNode["resources"]> => {
  const prompt = `
You are an expert technical instructor. The user wants to learn "${nodeTitle}" to become a "${careerGoal}".
Provide exactly 3 highly relevant online study resources (mix of courses, official docs, and videos).

Return ONLY raw valid JSON array, no markdown:
[
  {
    "label": "Resource Name",
    "url": "https://actual-link.com",
    "type": "course",
    "duration": "2 hrs"
  }
]`;

  const rawText = await geminiPost(prompt);
  if (!rawText) return [];

  try {
    return JSON.parse(cleanJSON(rawText));
  } catch {
    return [];
  }
};
