# Travelo — MVP

AI-powered travel companion + localized experiences + accessibility & safety, in one app.

This repo is a **runnable prototype** of the four core feature areas:

| Area | Screen | What works |
|---|---|---|
| Companion matching | `Matches` | Transparent compatibility scoring (interests · mood · dates · pace · budget) with per-match "why you matched" reasons, women-travellers filter, KYC-gated chat. |
| Localized experiences | `Explore` | Verified hidden-gem places per city + licensed local guides ranked by a trust score. |
| AI itinerary builder | `Itinerary` | Day-by-day plan generated from the verified local dataset, respects mood/pace + accessibility filters. |
| Accessibility & safety | Everywhere | Voice/TTS mode, deaf mode, high-contrast, large text, haptics, step-free filtering, floating hold-to-fire SOS, live location sharing, emergency contacts, proximity alerts. |

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run build && npm run preview   # production build
```

No backend — state persists to `localStorage`. Reset from **Profile → Reset app**.

## Stack

- **React 18 + Vite** — fast, deployable as a static site (Netlify/Vercel/GitHub Pages).
- **react-router-dom** (hash routing) — works on any static host.
- **Web Speech API** — real text-to-speech for the blind-friendly mode, no key needed.
- **Web Vibration API** — haptic navigation cues.
- No paid APIs in the prototype. Production integration points are marked in code
  comments (KYC provider, maps, translation, LLM for itinerary).

## Where the "AI" is

`src/lib/matching.js` and `src/lib/itinerary.js` are **readable heuristics** today.
Both are written behind a stable interface so a learned model / LLM call slots in
without touching the screens. The itinerary builder already uses the verified
local dataset as its retrieval layer, so swapping in an LLM keeps results grounded
and bookable.

## Project layout

```
src/
  data/        places.js · guides.js · users.js   (mock datasets)
  lib/         matching.js · itinerary.js · tts.js (core logic)
  context/     AppContext.jsx                      (profile, a11y, safety state)
  components/   AccessibilityBar · SOSButton
  screens/     Onboarding · Matches · Explore · ItineraryBuilder · Safety · Profile
docs/
  DATA-AND-GUIDES.md   how localized place data + trusted guides are sourced
  PITCH.md             competition, market approach, roadmap, feedback plan
```
