import { SectionTitle, BlurText } from "./UI";

export const Mission = () => {
  return (
    <section id="ourmission" className="p-6 md:p-10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="py-20">
          <BlurText>
            <h2 className="text-4xl md:text-6xl font-light leading-tight mb-20 max-w-4xl">
              How It Works <br />
              <span className="text-white/40 text-2xl md:text-4xl">Three simple steps to redefine your professional trajectory.</span>
            </h2>
          </BlurText>
        </div>

        <SectionTitle 
          number="01"
          title="Skill Assessment"
          description="Take our comprehensive AI-driven assessment to identify your core strengths and hidden talents."
        />

        <SectionTitle 
          number="02"
          title="Path Discovery"
          description="Explore curated career paths that align with your profile, market demand, and future growth."
        />

        <SectionTitle 
          number="03"
          title="Growth Roadmap"
          description="Get a step-by-step roadmap to bridge skill gaps and land your dream role in record time."
        />
      </div>
    </section>
  );
};
