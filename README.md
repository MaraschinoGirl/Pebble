
# Pebble
*A low-commitment, research-backed habit tracker for humans with ADHD, depression, and busy lives.*

[![status: pre-MVP](https://img.shields.io/badge/status-pre--MVP-blue)](#) [![license: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## Quick start

> **Status:** Repo is in setup. You can still clone and bootstrap the app shell once it lands.

```Bash
# clone
git clone https://github.com/MaraschinoGirl/Pebble.git
cd Pebble

# install & run (Node 20+)
npm install
npm run dev
# open http://localhost:3000
````

**Requirements:** Node 20+, npm (or pnpm/yarn), modern browser.

---

## Why Pebble exists

Pebble is a tiny, always-visible habit tracker designed to be **frictionless on hard days** and **unnoticeable on good days**. It’s built for people who struggle with consistency, time-blindness, and executive overload.

This repo documents the journey **from idea → MVP → public release**, with product choices tied to established behavioral science (full notes will live in `DESIGN.md`). The first user is *me*. If it works for one, we’ll cautiously grow.

---

## Product promises (v1)

1. **One-tap check-ins** — no forms, no typing.
2. **Local-first, private by default** — data on your device; export/sync optional.
3. **Always-visible (but gentle)** — PWA you can pin; no dopamine traps.
4. **Forgiving streaks** — grace by design rather than “all-or-nothing.”
5. **Implementation intentions built-in** — *If it’s 9:00 at my desk, then drink water.*
6. **Behavioral activation, not guilt** — micro-actions tied to values.

---

## MVP scope (4–7 days part-time)

**Core UX**

* Create 1–5 micro-habits (e.g., “drink water,” “take meds”).
* Each habit has a **floor** (smallest action) and optional **stretch**.
* **Today view**: minimal grid of circles (“pebbles”). Tap = floor done; long-press = stretch.
* **Gentle streaks**: small line under the pebble. Missed days reduce softly, no hard reset.
* **Tiny feedback**: subtle haptic/animation; no confetti cannons.

**Data**

* Local storage in IndexedDB (via lightweight wrapper).
* Import/export JSON for backup/manual sync.

**Installability**

* PWA: offline, installable desktop/mobile; optional badge for remaining pebbles.

**Accessibility & performance**

* WCAG-minded contrast; reduced-motion option.
* Fast first load (<100KB JS target post-MVP).

**Non-goals (MVP)**

* Accounts, social features, heavy analytics, or naggy notifications.

---

## Design principles (human → interface)

* **Make success tiny and obvious.** 30–60s floors; the next action is visually *near*.
* **Reduce choice at action time.** Today shows only today; editing is elsewhere.
* **Preview the win.** Instant state change → tiny reward without overstimulating.
* **Grace over perfection.** Soft streaks + weekly “grace bank.”
* **If-Then helpers.** Habit editor suggests cue-response phrasing.
* **Values before vanity.** Actions tied to values (e.g., “text a friend → belonging”).

---

## Data model (v0)

```
// pseudocode
User {
  id: string
  settings: { theme: 'auto' | 'light' | 'dark', reduceMotion: boolean }
}

Habit {
  id: string
  name: string
  floor: string
  stretch?: string
  cue?: string
  color?: string
  createdAt: ISODate
  archivedAt?: ISODate
}

Entry {
  id: string
  habitId: string
  date: YYYY-MM-DD
  floorDone: boolean
  stretchDone?: boolean
  note?: string
}

StreakState {
  habitId: string
  softStreak: number
  graceBank: number
  lastComputed: ISODate
}
```

---

## Architecture (MVP)

* **Framework:** Next.js (React + TypeScript)
* **Styling:** Tailwind CSS
* **State:** Zustand or Redux Toolkit
* **Storage:** IndexedDB via Dexie/idb behind `repo/` adapter
* **PWA:** `next-pwa` (offline app shell & install prompt)
* **QA:** Playwright smoke tests

```
pebble/
  apps/web/           # Next.js app
  packages/ui/        # shared components
  packages/data/      # schema + repo adapters
  .github/            # workflows
```

---

## Research-driven features

* **If-Then planning helper** in the habit editor.
* **Graceful streaks** with a small weekly grace bank.
* **Behavioral activation framing** (action verbs + values).
* **Low-friction notifications** (post-MVP): sparing, actionable nudges.
* **Time-visible affordances** (post-MVP): analog ring/“next anchor” chips for time-blindness.

---

## Roadmap

### v0.1 (MVP, local-first)

* [ ] Next.js app scaffolding with PWA & offline
* [ ] IndexedDB storage + repo layer
* [ ] Today view grid (pebbles): tap/long-press
* [ ] Habit editor with If-Then helper
* [ ] Soft streak calculation + grace bank
* [ ] Import/export JSON
* [ ] A11y pass + reduced motion support

### v0.2 (Fit & feel)

* [ ] Haptics / subtle animations
* [ ] Color tokens & high-contrast theme
* [ ] Empty states and first-run guide

### v0.3 (Nudges, still respectful)

* [ ] Optional, quiet notifications
* [ ] Snooze / “done from notification”
* [ ] Simple weekly review (2–3 stats)

### v0.4 (Optional sync)

* [ ] Encrypted export/import presets
* [ ] Opt-in end-to-end sync (design first)

---

## Contributing

This starts as a personal pet project. External PRs welcome if they keep the app small, accessible, and science-grounded—please open an issue first.

See **CONTRIBUTING.md** and **CODE\_OF\_CONDUCT.md**.

Guidelines:

* Keep the JS bundle small.
* Prefer progressive enhancement over new deps.
* Avoid dark patterns; no addictive loops.

---

## License

Code: **MIT**.
Docs & visuals: **CC BY 4.0** (unless stated otherwise).

---

## Maintainer

Lesley-Ann Fenwick ([@MaraschinoGirl](https://github.com/MaraschinoGirl)) — initial user and product owner.

---

## Notes

* Changes will be tracked in `CHANGELOG.md` once code lands.
* `DESIGN.md` will summarize the evidence base and how it maps to features/UI.

```

Want me to also drop in starter files for `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and a minimal `DESIGN.md` you can commit right away?
::contentReference[oaicite:0]{index=0}
```
