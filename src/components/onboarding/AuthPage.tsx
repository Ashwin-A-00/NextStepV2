import React, { useState } from "react";
import { motion } from "motion/react";
import { BlurText } from "../UI";

type AuthPageProps = {
  onContinue: (name: string, email: string) => void;
  onBack: () => void;
};

type TabId = "login" | "signup";

export const AuthPage = ({ onContinue, onBack }: AuthPageProps) => {
  const [activeTab, setActiveTab] = useState<TabId>("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit =
    email.trim().length > 0 && password.trim().length > 0 && (activeTab === "login" || name.trim().length > 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const resolvedName = activeTab === "signup" ? name || "Explorer" : name || "Explorer";
    onContinue(resolvedName, email);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-b from-black via-black to-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <button
          className="mb-6 inline-flex items-center px-3 py-1.5 text-xs text-white/60 border border-white/15 rounded-full bg-white/5 backdrop-blur-md hover:bg-red-500 hover:text-white hover:border-red-400 transition-colors"
          onClick={onBack}
        >
          ← Back to landing
        </button>

        <BlurText>
          <div className="flex flex-col items-center mb-6">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-xs font-semibold tracking-wide">
                NS
              </div>
              <span className="text-sm font-light tracking-[0.35em] uppercase text-white/60">
                NextStep
              </span>
            </div>
            <p className="text-xs text-white/50 tracking-widest uppercase">
              Start your journey now
            </p>
          </div>
        </BlurText>

        <div className="relative bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/60 px-6 py-6 md:px-8 md:py-8">
          <div className="absolute inset-x-10 -top-0.5 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-60" />

          <div className="flex gap-4 mb-6 border-b border-white/10">
            <button
            className={`pb-3 text-sm font-light tracking-wide relative ${
                activeTab === "login"
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
              {activeTab === "login" && (
                <span className="absolute left-0 bottom-0 h-[2px] w-full bg-accent" />
              )}
            </button>
            <button
              className={`pb-3 text-sm font-light tracking-wide relative ${
                activeTab === "signup"
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              Signup
              {activeTab === "signup" && (
                <span className="absolute left-0 bottom-0 h-[2px] w-full bg-accent" />
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "signup" && (
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full bg-black/40 border border-white/15 px-3 py-2 text-sm rounded-none outline-none focus:border-accent/80 transition-colors placeholder:text-white/30"
                  placeholder="Ada Lovelace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-black/40 border border-white/15 px-3 py-2 text-sm rounded-none outline-none focus:border-accent/80 transition-colors placeholder:text-white/30"
                placeholder="you@nextstep.studio"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-black/40 border border-white/15 px-3 py-2 text-sm rounded-none outline-none focus:border-accent/80 transition-colors placeholder:text-white/30"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <motion.button
              whileHover={canSubmit ? { scale: 0.99 } : undefined}
              whileTap={canSubmit ? { scale: 0.96 } : undefined}
              type="submit"
              disabled={!canSubmit}
              className={`mt-4 w-full py-2.5 text-sm tracking-[0.18em] uppercase border border-white/20 bg-white/10 text-white rounded-full backdrop-blur-md hover:bg-red-500 hover:border-red-400 hover:text-white transition-colors ${
                !canSubmit ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              {activeTab === "login" ? "Login" : "Sign Up"}
            </motion.button>

            <p className="mt-3 text-[10px] text-white/40 leading-relaxed">
              No real account is created. Anything you type is accepted so you can
              experience the full NextStep onboarding and dashboard.
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

