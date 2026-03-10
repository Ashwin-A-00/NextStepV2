import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Mission } from "./components/Mission";
import { TrendingPaths } from "./components/Catalog";
import { Team } from "./components/Team";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";
import { AuthPage } from "./components/onboarding/AuthPage";
import { EducationStep } from "./components/onboarding/EducationStep";
import { SyllabusStep } from "./components/onboarding/SyllabusStep";
import { InterestsStep } from "./components/onboarding/InterestsStep";
import { CareerGoalStep } from "./components/onboarding/CareerGoalStep";
import { Dashboard } from "./components/dashboard/Dashboard";
import { ProfilePage } from "./components/dashboard/ProfilePage";
import { CareersPage } from "./components/dashboard/CareersPage";
import { RoadmapPage } from "./components/dashboard/RoadmapPage";
import { SkillGapPage } from "./components/dashboard/SkillGapPage";
import { AnalysisPage } from "./components/dashboard/AnalysisPage";

export type ViewId =
  | "landing"
  | "auth"
  | "onboard-education"
  | "onboard-syllabus"
  | "onboard-interests"
  | "onboard-career"
  | "dashboard"
  | "profile"
  | "careers"
  | "roadmap"
  | "skill-gap"
  | "analysis";

export type UserProfile = {
  name: string;
  email: string;
  degree: string;
  major: string;
  topics: string[];
  interests: string[];
  careerGoal: string;
};

export default function App() {
  const [view, setView] = useState<ViewId>("landing");
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    degree: "",
    major: "",
    topics: [],
    interests: [],
    careerGoal: "",
  });

  const navigate = (next: ViewId) => setView(next);

  return (
    <main className="relative bg-black min-h-screen selection:bg-accent selection:text-white">
      <div className="noise-overlay" />

      <div className="relative">
        {view === "landing" && (
          <>
            <Navbar />
            <Hero onStartJourney={() => navigate("auth")} />
            <Mission />
            <TrendingPaths />
            <Team />
            <CTA />
            <Footer />
          </>
        )}

        {view === "auth" && (
          <AuthPage
            onContinue={(name, email) => {
              setProfile((prev) => ({ ...prev, name, email }));
              navigate("onboard-education");
            }}
            onBack={() => navigate("landing")}
          />
        )}

        {view === "onboard-education" && (
          <EducationStep
            value={{ degree: profile.degree, major: profile.major }}
            onChange={(degree, major) =>
              setProfile((prev) => ({ ...prev, degree, major }))
            }
            onContinue={() => navigate("onboard-syllabus")}
            onBack={() => navigate("auth")}
          />
        )}

        {view === "onboard-syllabus" && (
          <SyllabusStep
            topics={profile.topics}
            onChange={(topics) =>
              setProfile((prev) => ({ ...prev, topics }))
            }
            onContinue={() => navigate("onboard-interests")}
            onBack={() => navigate("onboard-education")}
          />
        )}

        {view === "onboard-interests" && (
          <InterestsStep
            interests={profile.interests}
            onChange={(interests) =>
              setProfile((prev) => ({ ...prev, interests }))
            }
            onContinue={() => navigate("onboard-career")}
            onBack={() => navigate("onboard-syllabus")}
          />
        )}

        {view === "onboard-career" && (
          <CareerGoalStep
            careerGoal={profile.careerGoal}
            onChange={(careerGoal) =>
              setProfile((prev) => ({ ...prev, careerGoal }))
            }
            onBack={() => navigate("onboard-interests")}
            onBuildRoadmap={() => navigate("dashboard")}
          />
        )}

        {view === "dashboard" && (
          <Dashboard
            profile={profile}
            onOpenProfile={() => navigate("profile")}
            onOpenCareers={() => navigate("careers")}
            onOpenRoadmap={() => navigate("roadmap")}
            onOpenSkillGap={() => navigate("skill-gap")}
            onOpenAnalysis={() => navigate("analysis")}
          />
        )}

        {view === "profile" && (
          <ProfilePage profile={profile} onBack={() => navigate("dashboard")} />
        )}

        {view === "careers" && (
          <CareersPage
            profile={profile}
            onBack={() => navigate("dashboard")}
            onOpenRoadmap={() => navigate("roadmap")}
          />
        )}

        {view === "roadmap" && (
          <RoadmapPage
            profile={profile}
            onBack={() => navigate("dashboard")}
          />
        )}

        {view === "skill-gap" && (
          <SkillGapPage
            profile={profile}
            onBack={() => navigate("dashboard")}
          />
        )}

        {view === "analysis" && (
          <AnalysisPage
            profile={profile}
            onBack={() => navigate("dashboard")}
          />
        )}
      </div>
    </main>
  );
}
