## Axiom Pulse Replica

A high-fidelity implementation of the Axiom Trade Pulse token discovery interface. This project replicates the complex UI/UX of a high-frequency trading dashboard using Next.js 14. It focuses on performance optimization for rapid state updates, strict TypeScript compliance, and responsive architectural patterns.

## Live Demo

[View the Demo Video on YouTube](https://youtu.be/gIdR1pnVcG8)

**Technical Architecture**

The application is built on the Next.js 14 App Router. It utilizes a hybrid state management approach to handle high-frequency data updates without compromising UI responsiveness.

## Core Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS with custom configuration for Axiom design system compliance
* **Global State:** Redux Toolkit (UI state, Mobile Tab management)
* **Server State:** TanStack Query (Data fetching and caching)
* **Icons:** Lucide React

## Key Implementation Details

**1. Real-Time Data Simulation**
To mimic the WebSocket behavior of a live trading environment without requiring a dedicated backend for deployment, the application uses a custom hook (`useSimulation.ts`).

* **Mechanism:** The hook establishes a client-side interval (200ms tick rate) that directly manipulates the React Query cache.
* **Optimization:** Rather than invalidating queries which would trigger full refetches, the simulation performs optimistic updates on the existing cache data. This ensures zero network overhead while maintaining the visual fidelity of a live socket connection.

**2. Performance Engineering**
Rendering high-frequency price updates can lead to significant layout thrashing. The following optimizations were implemented:

* **Memoization:** The `TokenCard` component is wrapped in `React.memo` to prevent unnecessary re-renders of the entire list when only specific tokens update.
* **Transient State:** Price flash effects (green/red highlights) are handled via a custom `usePriceHighlight` hook. This manages local component state for CSS transitions independent of the global data store, preventing main-thread blocking.

**3. Adaptive Layout Strategy**
The application implements two distinct layout architectures based on the viewport, rather than simple CSS hiding.

* **Desktop:** Renders a three-column grid (New Pairs, Final Stretch, Migrated) simultaneously.
* **Mobile:** Utilizes a Redux-backed state slice (`pulseSlice.ts`) to conditionally render only the active column. This reduces the DOM node count on mobile devices, improving scrolling performance.


**Getting Started**
**Clone the repository**

Bash
git clone <repository-url>
cd axiom-pulse
Install dependencies

Bash
npm install
Run the development server

Bash
npm run dev
Build for production

Bash
npm run build

### Deployment Configuration
This project is configured for deployment on Vercel.

**Framework Preset:** 
   Next.js

**Environment:**
   The simulation logic is client-side, requiring no separate Node.js server process.

**Linting:**
   The build pipeline enforces ESLint rules. Ensure all unused variables are removed before pushing to production.

## Project Structure
```text
src/
├── app/
│   ├── layout.tsx       # Root layout and Provider wrappers
│   └── page.tsx         # Main Dashboard View
├── components/
│   ├── pulse/           # Domain-specific components (TokenCard, ColumnHeader)
│   └── ui/              # Atomic UI components (Badge)
├── hooks/
│   ├── useMockData.ts   # Initial data generation
│   └── useSimulation.ts # Real-time price simulation logic
├── lib/
│   └── utils.ts         # Formatting and CSS class merging utilities
├── store/
│   ├── pulseSlice.ts    # Redux slice for UI state
│   └── store.ts         # Store configuration
└── types/
    └── index.ts         # TypeScript interfaces
