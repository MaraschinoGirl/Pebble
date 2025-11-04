🧩 CONTRIBUTING.md
# Contributing to Pebble

👋 Thank you for your interest in contributing!  
Pebble is a low-commitment, research-backed habit tracker built for humans with ADHD, depression, and busy lives.  
Our goal is to design software that’s *gentle, private, and ethical by default.*

---

## 💡 Ground Rules

- **Respect our mission.** Pebble avoids addictive loops, dark patterns, or manipulative nudges.  
- **Keep it lightweight.** Fewer dependencies = faster load and less cognitive load.  
- **Accessibility matters.** Follow WCAG 2.1 AA standards and test reduced-motion preferences.  
- **Privacy first.** No trackers, analytics, or unnecessary telemetry.  
- **Science-backed changes.** Tie behavior-related features to credible research when possible.

---

## 🧠 How to Contribute

1. **Fork** this repository and clone your fork.  
   ```bash
   git clone https://github.com/<your-username>/Pebble.git
   cd Pebble


Create a new branch for your feature or fix.

git checkout -b feat/my-feature


Run locally with Node 20+:

npm install
npm run dev


Open a Pull Request when your change is ready.
Describe what you did, why, and how it fits Pebble’s values.

🧪 Development Notes

Framework: Next.js (React + TypeScript)

Styling: Tailwind CSS

Storage: IndexedDB (Dexie/idb)

State: Zustand or Redux Toolkit

Tests: Playwright smoke tests

🌈 Good First Issues

Improve accessibility (contrast, labels, reduced motion)

Refine streak logic or grace-bank behavior

Add translations or cultural accessibility notes

Update docs (README or DESIGN.md)