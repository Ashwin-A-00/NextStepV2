import type { UserProfile } from "../../App";

type ProfilePageProps = {
  profile: UserProfile;
  onBack: () => void;
};

export const ProfilePage = ({ profile, onBack }: ProfilePageProps) => {
  return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          className="mb-6 inline-flex items-center px-3 py-1.5 text-xs text-white/60 border border-white/15 rounded-full bg-white/5 backdrop-blur-md hover:bg-accent hover:text-black hover:border-accent transition-colors"
          onClick={onBack}
        >
          ← Back to dashboard
        </button>

        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            Profile
          </p>
          <h1 className="text-2xl md:text-3xl font-light tracking-tight mt-1">
            Your NextStep identity
          </h1>
          <p className="text-xs text-white/60 mt-2 max-w-xl">
            Review the information we use to personalize your roadmap. You can
            adjust these details anytime to explore different paths.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-2">
              Name
            </p>
            <p className="text-sm text-white/90">
              {profile.name || "Not set"}
            </p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-2">
              Email
            </p>
            <p className="text-sm text-white/90">
              {profile.email || "Not set"}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-2">
              Degree
            </p>
            <p className="text-sm text-white/90">
              {profile.degree || "Not set"}
            </p>
          </div>
          <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-2">
              Major
            </p>
            <p className="text-sm text-white/90">
              {profile.major || "Not set"}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-4 mb-4">
          <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-2">
            Interests
          </p>
          {profile.interests.length === 0 ? (
            <p className="text-sm text-white/60">No interests selected yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-[11px] border border-white/20 text-white/80"
                >
                  {i}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-4 mb-4">
          <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-2">
            Syllabus Topics
          </p>
          {profile.topics.length === 0 ? (
            <p className="text-sm text-white/60">
              No topics added yet. Your roadmap will get sharper as you add
              them.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.topics.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 text-[11px] border border-white/20 text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-4">
          <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-2">
            Career Goal
          </p>
          <p className="text-sm text-white/90">
            {profile.careerGoal || "Exploring options"}
          </p>
        </div>
      </div>
    </section>
  );
};

