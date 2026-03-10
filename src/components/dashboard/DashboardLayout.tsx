import { useState, ReactNode } from "react";
import { LayoutDashboard, Map, Briefcase, User, BarChart2, UserPlus, PieChart, LogOut, ChevronRight, ChevronLeft } from "lucide-react";
import type { ViewId, UserProfile } from "../../App";

type DashboardLayoutProps = {
    currentView: ViewId;
    onNavigate: (view: ViewId) => void;
    children: ReactNode;
    profile?: UserProfile;
};

export const DashboardLayout = ({ currentView, onNavigate, children, profile }: DashboardLayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const NavItem = ({ viewId, icon, label, disabled = false, badge = "" }: any) => {
        const isActive = currentView === viewId;
        return (
            <button
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm transition-all duration-300 ${disabled ? "text-white/40 cursor-not-allowed" :
                    isActive ? "bg-white text-black font-medium shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "text-white/70 hover:bg-accent/20 hover:text-accent hover:translate-x-1"
                    }`}
                onClick={() => !disabled && onNavigate(viewId)}
            >
                {icon}
                {!collapsed && (
                    <>
                        <span className="tracking-tight">{label}</span>
                        {badge && (
                            <span className="ml-auto text-[10px] uppercase tracking-[0.18em] border border-current px-2 py-0.5 rounded-full">
                                {badge}
                            </span>
                        )}
                    </>
                )}
            </button>
        );
    };

    return (
        <section className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside
                className={`hidden md:flex flex-col border-r border-white/10 bg-black/80 backdrop-blur-xl transition-[width] duration-300 ${collapsed ? "w-16" : "w-60"
                    }`}
            >
                <div className="px-4 py-6 border-b border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("dashboard")}>
                        <div className="h-9 w-9 rounded-sm bg-white text-black flex items-center justify-center text-xs font-semibold tracking-wide flex-shrink-0">
                            NS
                        </div>
                        {!collapsed && (
                            <div className="flex-shrink-0 overflow-hidden">
                                <p className="text-sm font-light tracking-tight whitespace-nowrap">NextStep</p>
                                <p className="text-[11px] text-white/50 tracking-wide uppercase whitespace-nowrap">
                                    Job-ready pipeline
                                </p>
                            </div>
                        )}
                    </div>
                    <button
                        className="hidden md:inline-flex items-center justify-center h-7 w-7 rounded-sm border border-white/15 text-white/60 hover:bg-white/10 flex-shrink-0"
                        onClick={() => setCollapsed((v) => !v)}
                    >
                        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    </button>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1 text-sm overflow-hidden hover:overflow-y-auto custom-scrollbar">
                    <NavItem viewId="dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
                    <NavItem viewId="roadmap" icon={<Map size={18} />} label="Roadmap" />
                    <NavItem viewId="careers" icon={<Briefcase size={18} />} label="Careers" />
                    <NavItem viewId="project-chart" icon={<BarChart2 size={18} />} label="Project Chart" />
                    <NavItem viewId="mentor-support" icon={<UserPlus size={18} />} label="Mentor Support" />
                    <NavItem viewId="analysis" icon={<PieChart size={18} />} label="Analysis" />
                </nav>

                <div className="px-4 pb-4 space-y-3">
                    {!collapsed && profile && (
                        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 flex items-center gap-3 hover:bg-white/10 transition-colors cursor-pointer" onClick={() => onNavigate("profile")}>
                            <div className="h-10 w-10 shrink-0 rounded-full bg-accent/20 border border-accent/50 text-accent flex items-center justify-center font-semibold text-lg overflow-hidden">
                                {profile.name ? profile.name.charAt(0).toUpperCase() : <User size={18} />}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-white/90 truncate">{profile.name || "Student"}</p>
                                <p className="text-[10px] text-white/50 uppercase tracking-wider truncate">{profile.careerGoal || profile.major || "Pathfinder"}</p>
                            </div>
                        </div>
                    )}
                    <button
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-full border border-white/20 text-xs text-white/80 hover:bg-accent hover:text-black transition-colors"
                        onClick={() => onNavigate("landing")}
                    >
                        <LogOut size={14} />
                        {!collapsed && <span>Log out</span>}
                    </button>
                </div>
            </aside>

            {/* Main content area */}
            <main className="flex-1 h-screen overflow-y-auto bg-black relative">
                {children}
            </main>
        </section>
    );
};
