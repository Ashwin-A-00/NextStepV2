import { useState, useEffect } from "react";
import { Edit2, Save, X } from "lucide-react";
import { motion } from "motion/react";
import type { UserProfile } from "../../App";

type ProfilePageProps = {
  profile: UserProfile;
  onUpdateProfile?: (profile: UserProfile) => void;
};

export const ProfilePage = ({ profile, onUpdateProfile }: ProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile>(profile);
  const [topicsText, setTopicsText] = useState(profile.topics.join(", "));
  const [interestsText, setInterestsText] = useState(profile.interests.join(", "));

  // Update local state if profile prop changes from outside
  useEffect(() => {
    setEditForm(profile);
    setTopicsText(profile.topics.join(", "));
    setInterestsText(profile.interests.join(", "));
  }, [profile]);

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile({
        ...editForm,
        topics: topicsText.split(",").map((s) => s.trim()).filter(Boolean),
        interests: interestsText.split(",").map((s) => s.trim()).filter(Boolean),
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setTopicsText(profile.topics.join(", "));
    setInterestsText(profile.interests.join(", "));
    setIsEditing(false);
  };

  const InputField = ({ label, value, onChange, placeholder = "" }: any) => (
    <div className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-4 focus-within:border-accent/50 transition-colors">
      <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-2">
        {label}
      </p>
      {isEditing ? (
        <input
          type="text"
          className="w-full bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 placeholder:text-white/30"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <p className="text-sm text-white/90">{value || "Not set"}</p>
      )}
    </div>
  );

  return (
    <section className="relative min-h-screen bg-black text-white px-4 md:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
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

          {onUpdateProfile && (
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-xs hover:bg-white/10 transition-colors"
                  >
                    <X size={14} />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-black text-xs font-semibold hover:bg-white transition-colors"
                  >
                    <Save size={14} />
                    <span>Save Changes</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs transition-colors"
                >
                  <Edit2 size={14} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          )}
        </div>

        <motion.div layout className="grid gap-4 md:grid-cols-2 mb-4">
          <InputField
            label="Name"
            value={editForm.name}
            onChange={(val: string) => setEditForm({ ...editForm, name: val })}
            placeholder="John Doe"
          />
          <InputField
            label="Email"
            value={editForm.email}
            onChange={(val: string) => setEditForm({ ...editForm, email: val })}
            placeholder="john@example.com"
          />
        </motion.div>

        <motion.div layout className="grid gap-4 md:grid-cols-2 mb-4">
          <InputField
            label="Degree"
            value={editForm.degree}
            onChange={(val: string) => setEditForm({ ...editForm, degree: val })}
            placeholder="B.Sc. Computer Science"
          />
          <InputField
            label="Major"
            value={editForm.major}
            onChange={(val: string) => setEditForm({ ...editForm, major: val })}
            placeholder="Software Engineering"
          />
        </motion.div>

        <motion.div layout className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-4 mb-4 focus-within:border-accent/50 transition-colors">
          <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-2">
            Interests
          </p>
          {isEditing ? (
            <div>
              <input
                type="text"
                className="w-full bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 placeholder:text-white/30 mb-2"
                value={interestsText}
                onChange={(e) => setInterestsText(e.target.value)}
                placeholder="e.g. AI, Web Development, Cloud (comma separated)"
              />
              <p className="text-[10px] text-white/40">Separate multiple interests with commas</p>
            </div>
          ) : (
            <>
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
            </>
          )}
        </motion.div>

        <motion.div layout className="rounded-xl border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-4 mb-4 focus-within:border-accent/50 transition-colors">
          <p className="text-xs uppercase tracking-[0.18em] text-white/50 mb-2">
            Syllabus Topics
          </p>
          {isEditing ? (
            <div>
              <input
                type="text"
                className="w-full bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 placeholder:text-white/30 mb-2"
                value={topicsText}
                onChange={(e) => setTopicsText(e.target.value)}
                placeholder="e.g. Data Structures, React, Python (comma separated)"
              />
              <p className="text-[10px] text-white/40">Separate multiple topics with commas</p>
            </div>
          ) : (
            <>
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
            </>
          )}
        </motion.div>

        <motion.div layout className="mb-8">
          <InputField
            label="Career Goal"
            value={editForm.careerGoal}
            onChange={(val: string) => setEditForm({ ...editForm, careerGoal: val })}
            placeholder="e.g. Full Stack Developer, Product Manager"
          />
        </motion.div>
      </div>
    </section>
  );
};
