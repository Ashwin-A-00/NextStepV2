import { useState, useEffect } from "react";
import { BarChart2, Circle, CheckCircle2, Lock, Upload, Sparkles, Check, AlertCircle } from "lucide-react";
import type { UserProfile } from "../../App";
import { generateProjectsTemplate, verifyProjectSolution, type APIProject } from "../../lib/ai";

type ProjectChartPageProps = {
    profile: UserProfile;
    onBack: () => void;
};



export const ProjectChartPage = ({ profile, onBack }: ProjectChartPageProps) => {
    const [projects, setProjects] = useState<APIProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeProject, setActiveProject] = useState(1);

    // Track solution state per question ID
    const [solutions, setSolutions] = useState<Record<string, string>>({});
    // Track verification status per question ID
    const [verifiedQuestions, setVerifiedQuestions] = useState<Record<string, boolean>>({});
    // Track feedback messages
    const [feedback, setFeedback] = useState<Record<string, { success: boolean; message: string }>>({});
    // Track which question is currently being verified to show loading
    const [verifyingId, setVerifyingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            const data = await generateProjectsTemplate(profile, profile.careerGoal || "Software Engineer");
            setProjects(data);
            setLoading(false);
        };
        fetchProjects();
    }, [profile]);

    const currentProject = projects.find(p => p.id === activeProject) || projects[0];

    const handleVerify = async (questionId: string, questionTitle: string) => {
        const sol = solutions[questionId];
        if (!sol?.trim()) {
            alert("Please write a solution before verifying.");
            return;
        }

        setVerifyingId(questionId);

        try {
            const result = await verifyProjectSolution(questionTitle, sol, profile.careerGoal || "Software Engineer");

            setFeedback(prev => ({ ...prev, [questionId]: { success: result.success, message: result.feedback } }));

            if (result.success) {
                setVerifiedQuestions(prev => ({ ...prev, [questionId]: true }));
            }
        } catch (error) {
            console.error("Verification failed", error);
            setFeedback(prev => ({ ...prev, [questionId]: { success: false, message: "AI verification service is currently unavailable. Please try again later." } }));
        } finally {
            setVerifyingId(null);
        }
    };

    const isQuestionUnlocked = (level: "Easy" | "Intermediate" | "Hard", projectQuestions: APIProject["questions"]) => {
        if (level === "Easy") return true;

        const easyQ = projectQuestions.find(q => q.level === "Easy");
        if (level === "Intermediate") {
            return easyQ ? !!verifiedQuestions[easyQ.id] : true;
        }

        if (level === "Hard") {
            const intermediateQ = projectQuestions.find(q => q.level === "Intermediate");
            return (easyQ ? !!verifiedQuestions[easyQ.id] : true) &&
                (intermediateQ ? !!verifiedQuestions[intermediateQ.id] : true);
        }

        return false;
    };

    const LEVEL_COLORS = {
        "Easy": "text-emerald-400 border-emerald-400/30 bg-emerald-500/10",
        "Intermediate": "text-amber-400 border-amber-400/30 bg-amber-500/10",
        "Hard": "text-red-400 border-red-400/30 bg-red-500/10"
    };

    return (
        <section className="relative min-h-screen bg-black text-white">
            {/* Top Header */}
            <div className="flex items-start gap-4 px-6 md:px-10 pt-8 pb-6 border-b border-white/10 w-full max-w-6xl mx-auto">
                <div className="p-3 border border-white/10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <BarChart2 size={24} className="text-white/80" />
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-xl md:text-2xl font-light tracking-tight">Project Charts</h1>
                    </div>
                    <p className="text-sm text-white/60">
                        {profile.careerGoal || "Software Engineer"} • Project {activeProject} of {projects.length}
                    </p>
                </div>
            </div>

            <div className="px-6 md:px-10 py-10 w-full max-w-6xl mx-auto">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-12 h-12 border-2 border-white/10 border-t-accent rounded-full animate-spin mb-6"></div>
                        <h2 className="text-xl font-light tracking-tight text-white mb-2">Generating your custom project charts...</h2>
                        <p className="text-sm text-white/50">Tailoring challenges to your profile and goals</p>
                    </div>
                ) : (
                    <>
                        {/* Tabs */}
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            {projects.map((project) => {
                                const isActive = activeProject === project.id;
                                const isLocked = project.status === "locked";

                                return (
                                    <button
                                        key={project.id}
                                        onClick={() => !isLocked && setActiveProject(project.id)}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm transition-all ${isActive
                                            ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10"
                                            : isLocked
                                                ? "border-white/10 text-white/30 cursor-not-allowed bg-white/5"
                                                : "border-white/20 text-white/70 hover:bg-white/10"
                                            }`}
                                        disabled={isLocked}
                                    >
                                        {isActive ? (
                                            <Circle size={14} className="text-emerald-400" />
                                        ) : isLocked ? (
                                            <Circle size={14} />
                                        ) : (
                                            <CheckCircle2 size={14} />
                                        )}
                                        <span>Project {project.id}</span>
                                        {isLocked && <Lock size={12} className="ml-1 opacity-50" />}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active Project Content */}
                        <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl p-6 md:p-8">
                            <h2 className="text-xl md:text-2xl font-light text-white mb-2">
                                {currentProject.title}
                            </h2>
                            <p className="text-sm text-white/70 font-medium mb-8">
                                {currentProject.description}
                            </p>

                            <div className="space-y-6">
                                {currentProject.questions.map((q, idx) => {
                                    const unlocked = isQuestionUnlocked(q.level, currentProject.questions);
                                    const verified = verifiedQuestions[q.id];
                                    const isVerifying = verifyingId === q.id;

                                    return (
                                        <div
                                            key={q.id}
                                            className={`border rounded-xl p-5 md:p-6 transition-all duration-500 ${unlocked
                                                ? "border-white/10 bg-black/40 shadow-inner"
                                                : "border-white/5 bg-black/20 opacity-50 grayscale select-none"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-sm font-semibold text-white/90">
                                                    Phase 0{idx + 1}
                                                </h3>
                                                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold">
                                                    {!unlocked && <Lock size={12} className="text-white/40" />}
                                                    <span className={`px-2 py-0.5 rounded-full border ${LEVEL_COLORS[q.level]} ${!unlocked ? 'opacity-50' : ''}`}>
                                                        {q.level}
                                                    </span>
                                                    {verified && (
                                                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                                                            <Check size={10} /> Verified
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <p className={`text-[15px] font-medium leading-relaxed mb-4 ${unlocked ? 'text-white' : 'text-white/40'}`}>
                                                {q.title}
                                            </p>

                                            {q.hint && (
                                                <div className={`flex items-start gap-1.5 mb-6 text-sm ${unlocked ? 'opacity-100' : 'opacity-40'}`}>
                                                    <span className="text-amber-400/90 shrink-0">💡</span>
                                                    <p className="text-white/50 italic">Hint: {q.hint}</p>
                                                </div>
                                            )}

                                            {unlocked && (
                                                <>
                                                    <div className="mb-6">
                                                        <label className="block text-xs font-medium text-white/70 mb-2">
                                                            Your Solution:
                                                        </label>
                                                        <textarea
                                                            value={solutions[q.id] || ""}
                                                            onChange={(e) => setSolutions(prev => ({ ...prev, [q.id]: e.target.value }))}
                                                            placeholder="Write your solution here..."
                                                            disabled={verified || isVerifying}
                                                            className={`w-full bg-[#0a101f] border border-white/10 rounded-lg p-4 text-sm text-white/90 placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 min-h-[120px] resize-y transition-shadow ${verified ? 'opacity-70 cursor-not-allowed' : ''}`}
                                                        />
                                                    </div>

                                                    <div className="mb-8">
                                                        <label className="block text-xs font-medium text-white/70 mb-2">
                                                            Attach Your Work:
                                                        </label>
                                                        <button
                                                            disabled={verified || isVerifying}
                                                            className={`flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-xs font-medium transition-colors ${verified ? 'opacity-50 cursor-not-allowed text-white/40' : 'hover:bg-white/10 text-white/80'}`}
                                                        >
                                                            <Upload size={14} />
                                                            <span>Upload Files</span>
                                                        </button>
                                                    </div>

                                                    {feedback[q.id] && (
                                                        <div className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${feedback[q.id].success ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                                                            <div className="mt-0.5 w-4 h-4 shrink-0 flex items-center justify-center">
                                                                {feedback[q.id].success ? <Check size={16} /> : <AlertCircle size={16} />}
                                                            </div>
                                                            <div className="flex-1 text-sm leading-relaxed">
                                                                {feedback[q.id].message}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex flex-col sm:flex-row items-center justify-between pt-5 border-t border-white/10 gap-4">
                                                        <span className="text-xs font-medium text-white/50">
                                                            {verified ? "Verification successful" : "Pending verification"}
                                                        </span>
                                                        {!verified && (
                                                            <button
                                                                onClick={() => handleVerify(q.id, q.title)}
                                                                disabled={isVerifying}
                                                                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-sm font-medium text-white/90 transition-all ${isVerifying ? 'opacity-70 cursor-wait' : 'hover:border-white/40'}`}
                                                            >
                                                                {isVerifying ? (
                                                                    <>
                                                                        <div className="w-4 h-4 border-2 border-white/20 border-t-indigo-400 rounded-full animate-spin" />
                                                                        <span>Verifying...</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span>Verify with AI</span>
                                                                        <Sparkles size={14} className="text-indigo-400" />
                                                                    </>
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                </>
                                            )}

                                            {!unlocked && (
                                                <div className="p-4 rounded-lg bg-black/40 border border-white/5 text-center">
                                                    <p className="text-xs text-white/40">
                                                        Verify the {q.level === "Intermediate" ? "Easy" : "Intermediate"} phase to unlock this challenge.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};
