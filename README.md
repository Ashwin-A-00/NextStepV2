
# AlertKerala

A comprehensive emergency alert and crisis management system designed to facilitate rapid communication and coordination between authorities and civilians during critical situations and disaster scenarios.

## Overview

AlertKerala is a modern, responsive web application that streamlines emergency response and disaster management. The platform enables civilians to receive real-time alerts, report missing persons, and submit sightings, while providing authorities with powerful dashboards for broadcast management, response coordination, and predictive routing analytics.

## Features

- **Civilian Alert System** - Real-time emergency notifications with detailed incident information
- **Missing Person Reports** - Streamlined reporting interface for reporting missing individuals
- **Authority Dashboard** - Comprehensive control panel for emergency coordinators and responders
- **Emergency Broadcasts** - Animated broadcast system for disseminating critical information
- **Sighting Submissions** - Community-driven information gathering for missing persons
- **Response Management** - Centralized panel for tracking and managing emergency responses
- **Predictive Routing** - AI-assisted route optimization for emergency response teams

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router
- **UI Components**: Radix UI with custom styling
- **Styling**: Tailwind CSS
- **Icons**: Lucide React, Material-UI Icons
- **Animations**: Motion, Canvas Confetti
- **State Management**: React Context & Hooks
- **Date Handling**: date-fns
- **Carousel**: Embla Carousel

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Alertkerala
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Production Build

Build the application for production:
```bash
npm run build
```

The optimized build will be generated in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Landing.tsx              # Home page
│   │   ├── CivilianAlert.tsx        # Civilian alert interface
│   │   ├── ReportMissing.tsx        # Missing person reporting
│   │   ├── AuthorityDashboard.tsx   # Authority control panel
│   │   ├── BroadcastAnimation.tsx   # Emergency broadcast interface
│   │   ├── SubmitSighting.tsx       # Sighting submission form
│   │   ├── ResponsePanel.tsx        # Response management center
│   │   ├── PredictiveRoutes.tsx     # Route optimization
│   │   ├── Root.tsx                 # Root layout component
│   │   └── ui/                      # Reusable UI components
│   ├── routes.ts                    # Route configuration
│   └── App.tsx                      # Main application component
├── styles/                          # Global styles and theme
├── imports/                         # Design tokens and utilities
└── main.tsx                        # Application entry point
```

## Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | Landing | Home page |
| `/alert/:id` | CivilianAlert | View emergency alert details |
| `/report` | ReportMissing | Report a missing person |
| `/dashboard` | AuthorityDashboard | Authority control center |
| `/broadcast/:id` | BroadcastAnimation | Emergency broadcast |
| `/sighting/:id` | SubmitSighting | Submit missing person sighting |
| `/response/:id` | ResponsePanel | Emergency response management |
| `/prediction/:id` | PredictiveRoutes | Predictive route analysis |

## Design System

The project uses a comprehensive design system built with Radix UI and Tailwind CSS. Design specifications and tokens are available in the [design documentation](src/imports/pasted_text/design-tokens.ts).

**Design Preview**: [View on Figma](https://www.figma.com/design/S0rGpOGyuqXgzhKv9DaU6O/AlertKerala)

## Component Library

The `ui/` directory contains a collection of accessible, customizable components built on Radix UI primitives:

- Form controls (input, checkbox, radio, select, etc.)
- Containers (card, dialog, drawer, sidebar, etc.)
- Navigation (tabs, breadcrumb, pagination, etc.)
- Feedback (alert, toast, progress, tooltip, etc.)
- And many more...

All components are fully accessible (WCAG compliant) and responsive.

## Contributing

1. Follow the existing code structure and naming conventions
2. Use TypeScript for type safety
3. Ensure components are responsive and accessible
4. Test changes across different screen sizes
5. Keep component files focused and single-purpose

## License

This project is part of the Hackeuropa initiative. For licensing details, see [ATTRIBUTIONS.md](ATTRIBUTIONS.md).

## Support

For issues, feature requests, or questions, please refer to the project documentation or open an issue in the repository.

---

**Last Updated**: March 2026  
**Repository**: [GitHub - Ashwin-A-00/Hackeuropa](https://github.com/Ashwin-A-00/Hackeuropa)
  
