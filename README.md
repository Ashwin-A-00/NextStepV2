# NextStep Career Guidance

> **Precision-Driven Career Development Platform**

An intelligent, user-centric career guidance application powered by AI. NextStep combines elegant design with cutting-edge AI technology to help you discover your ideal career path, identify skill gaps, and achieve your professional goals.

---

## ✨ Key Features

- **Intelligent Career Assessment** – AI-powered analysis of your skills, interests, and goals
- **Personalized Skill Gap Analysis** – Identify the exact skills you need to reach your target role
- **Interactive Dashboard** – Visualize your progress and career roadmap with intuitive charts
- **Mentorship Integration** – Connect with experienced professionals in your field
- **Onboarding Workflow** – Guided setup process to understand your career aspirations and background
- **Project Planning** – Plan and track meaningful projects aligned with your career goals
- **Responsive Design** – Seamlessly works across all devices with smooth, modern animations

## 💻 Technology Stack

- **Frontend Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with advanced animations
- **UI Components:** Radix UI primitives
- **Animation:** Framer Motion
- **AI Engine:** Google Gemini API
- **Backend:** Express.js
- **Smooth Scrolling:** Custom Lenis integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory and add your API key:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Get your API key from [Google AI Studio](https://aistudio.google.com/)

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Type-check with TypeScript |
| `npm run clean` | Remove build artifacts |

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── dashboard/      # Dashboard pages and layouts
│   ├── onboarding/     # Onboarding flow components
│   ├── ui/             # Core UI components and animations
│   ├── Hero.tsx        # Landing page hero section
│   └── ...
├── lib/
│   ├── ai.ts          # Gemini API integration
│   └── utils.ts       # Utility functions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎯 Usage

Navigate to the dashboard after onboarding to:
- View your personalized career analysis
- Explore skill recommendations
- Track your development with interactive charts
- Connect with mentors in your industry
- Build and monitor your career roadmap

## 🌟 Design Philosophy

NextStep is built with a minimalist, high-end aesthetic that prioritizes clarity and user engagement. Every interaction is intentional, and the interface adapts to create a seamless experience for career explorers at every stage of their journey.

## 🔐 Security

- API keys are stored in environment variables (never committed to version control)
- Sensitive data is handled securely with encrypted connections

## 📝 License

This project is part of the AI Studio ecosystem. For licensing details, refer to the project settings in AI Studio.

## 🤝 Support & Feedback

For issues, feature requests, or feedback, please open an issue in the repository or contact the development team.

---

**Ready to discover your next career step?** Get started today by following the installation guide above.
