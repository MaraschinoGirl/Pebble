🪴 DESIGN.md
# Pebble — DESIGN.md

## 🎯 Purpose
Pebble is a frictionless habit tracker designed for humans with ADHD, depression,
and busy lives. It promotes *grace over perfection* and *activation over guilt*.

## 🧩 Core Principles
| Principle | Description |
|------------|-------------|
| **Tiny Wins** | Each habit has a small “floor” action to lower activation energy. |
| **Graceful Streaks** | Missed days decay softly—no hard resets, no guilt. |
| **Privacy by Default** | Local-first data (IndexedDB), no mandatory accounts. |
| **Accessibility First** | WCAG 2.1 AA, reduced motion, high-contrast mode. |
| **Evidence-Based** | Features mapped to behavioral-science findings. |

---

## 🧠 Research Foundations
Pebble draws on:
- **Behavioral Activation Therapy** — linking small actions to values.  
- **Implementation Intentions (If–Then Planning)** — Gollwitzer 1999.  
- **Grace Theory of Motivation** — compassionate goal recovery.  
- **ADHD-friendly design** — minimizing executive load, visible cues, low decision friction.  

---

## 🪞 Design Language
- **Visual Metaphor:** small “pebbles” = modest, tangible wins.  
- **Color Palette:** calm neutrals + accent hues indicating action state.  
- **Typography:** legible sans-serif, no overstimulation.  
- **Feedback:** subtle haptic or micro-animation, never confetti.  

---

## 🏗 Architecture Snapshot
- Framework: Next.js + TypeScript  
- Styling: Tailwind CSS  
- State: Zustand or Redux Toolkit  
- Storage: IndexedDB via Dexie/idb  
- PWA: next-pwa for offline + install prompt  

---

## 🧭 Ethical Design Commitments
- No dark patterns, addictive loops, or vanity metrics.  
- No social comparison mechanics.  
- Open-source under MIT for transparency.  
- Inclusive by default: language, visuals, and UX copy mindful of neurodiversity.  

---

## 🗺 Roadmap (from README)
**v0.1** MVP – Local-first, Habit Editor, Soft Streaks  
**v0.2** Fit & Feel – Haptics, Theme, Onboarding  
**v0.3** Gentle Nudges – Optional Notifications  
**v0.4** Sync – Encrypted export/import  

---

_Last updated: November 2025 by Lesley-Ann Fenwick (@MaraschinoGirl)._

🧭 CHANGELOG.md (optional but recommended)
# Changelog
All notable changes to this project will be documented here.  
This format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]
- Project initialization  
- Setup 7-day MVP sprint plan  
- Added CONTRIBUTING.md, CODE_OF_CONDUCT.md, DESIGN.md  

## [0.1.0] — 2025-11-10
- First working MVP (local-first habit tracker)
- Habit Editor + Today View + IndexedDB persistence
- Grace bank + soft streaks logic
- Accessibility pass + high-contrast mode
- Docs + ethical design principles complete