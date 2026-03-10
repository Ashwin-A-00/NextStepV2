import { useState, useEffect } from "react";
import Lenis from "lenis";
import type { AIGeneratedData, AICareerSuggestion } from "./lib/ai";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { HowItWorksBackground } from "./components/HowItWorksBackground";
import { Mission } from "./components/Mission";
import { TrendingPaths } from "./components/Catalog";
import { TrustedBy } from "./components/TrustedBy";
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
import { AnalysisPage } from "./components/dashboard/AnalysisPage";

export type ViewId =
  | "landing"
  | "auth"
  | "onboard-education"
  | "onboard-syllabus"
  | "onboard-interests"
  | "onboard-career"
  | "career-selection"
  | "dashboard"
  | "profile"
  | "careers"
  | "roadmap"
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

  useEffect(() => {
    if (view === "landing") {
      const lenis = new Lenis();
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      return () => {
        lenis.destroy();
      };
    }
  }, [view]);

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    degree: "",
    major: "",
    topics: [],
    interests: [],
    careerGoal: "",
  });
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
  const [selectedCareerData, setSelectedCareerData] = useState<AICareerSuggestion | null>(null);
  const [aiData, setAiData] = useState<AIGeneratedData | null>(null);

  const navigate = (next: ViewId) => setView(next);

  return (
    <main className="relative bg-black min-h-screen selection:bg-accent selection:text-white">
      <div className="noise-overlay" />

      <div className="relative">
        {view === "landing" && (
          <>
            <Navbar />
            <Hero onStartJourney={() => navigate("auth")} />
            <HowItWorksBackground />
            <Mission />
            <TrendingPaths />
            <TrustedBy />
            <Team />
            <CTA onStartJourney={() => navigate("auth")} />
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
            onContinue={() => navigate("career-selection")}
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
            onBuildRoadmap={() => navigate("career-selection")}
          />
        )}

        {view === "career-selection" && (
          <CareersPage
            profile={profile}
            selectedCareerId={selectedCareerId}
            aiData={aiData}
            onAIGenerated={setAiData}
            onSelectCareer={(id, careerData) => {
              setSelectedCareerId(id);
              if (careerData) setSelectedCareerData(careerData);
              navigate("dashboard");
            }}
            onBack={() => navigate("onboard-interests")}
            onOpenRoadmap={() => navigate("dashboard")}
          />
        )}

        {view === "dashboard" && (
          <Dashboard
            profile={profile}
            selectedCareerId={selectedCareerId}
            selectedCareerData={selectedCareerData}
            onOpenProfile={() => navigate("profile")}
            onOpenCareers={() => navigate("careers")}
            onOpenRoadmap={() => navigate("roadmap")}
            onOpenAnalysis={() => navigate("analysis")}
          />
        )}

        {view === "profile" && (
          <ProfilePage profile={profile} onBack={() => navigate("dashboard")} />
        )}

        {view === "careers" && (
          <CareersPage
            profile={profile}
            selectedCareerId={selectedCareerId}
            aiData={aiData}
            onAIGenerated={setAiData}
            onSelectCareer={(id) => {
              setSelectedCareerId(id);
            }}
            onBack={() => navigate("dashboard")}
            onOpenRoadmap={() => navigate("roadmap")}
          />
        )}

        {view === "roadmap" && (
          <RoadmapPage
            profile={profile}
            selectedCareerId={selectedCareerId}
            aiData={aiData}
            onBack={() => navigate("dashboard")}
          />
        )}

        {view === "analysis" && (
          <AnalysisPage
            profile={profile}
            selectedCareerId={selectedCareerId}
            onBack={() => navigate("dashboard")}
          />
        )}
      </div>
    </main>
  );
}
