# Travelo — pitch notes

Covers tweaks #6–#14.

## The one feature (#7)
**Transparent, safety-gated companion matching.** Other apps either match you with
strangers and hope, or they're pure trip planners. Travelo shows you *why* a
person is a 82% match (shared interests, overlapping dates, same pace), and you
physically cannot message anyone until you've passed ID verification — and neither
can they. Trust is the product.

## Selling points (#6)
- **One app, whole trip**: companion + real local spots + itinerary + safety net.
  Today that's Bumble BFF *and* a guidebook *and* Google Maps *and* a safety app.
- **Hidden gems, not the top-10**: every place is board-verified or guide-submitted
  with a local tip. Off-peak by design.
- **Accessibility is native, not a toggle buried in settings**: voice mode, deaf
  mode, step-free itineraries, audio-described places — from onboarding.
- **Safety floor**: mandatory KYC, hold-to-fire SOS, live location, proximity
  alerts, women-travellers filter, licensed female guides.

## Competition (#10) — famous apps, and where they stop
| App | What it does | Gap Travelo fills |
|---|---|---|
| **Bumble BFF / Meetup** | meet people | no travel context, no itinerary, no safety-for-travel, weak verification |
| **Couchsurfing / Backpackr / Tourlina** | traveller social | thin local-experience data, matching is opaque, accessibility absent |
| **TripAdvisor / Google Maps** | reviews, POIs | mainstream attractions, no companion layer, no personalization by mood |
| **GetYourGuide / Airbnb Experiences** | book activities | supplier-led, not local-hidden-gem, no companion, no accessibility focus |
| **Wanderlog / TripIt** | itinerary planning | no people, no local guide network, no safety |
| **Be My Eyes / BlindSquare** | accessibility | single-purpose, not a travel product |

Travelo's defensible position is the **intersection**: verified companions +
verified local data + accessibility + safety, none of which any single incumbent
does together.

## Market approach (#11) — local first, then global
**Why local first:** the moat (hidden-gem data + trusted guides) is built city by
city. A shallow global launch has nothing an incumbent doesn't.

**Beachhead:** one city with (a) high solo-travel inflow, (b) an active tourism
board open to a partnership, (c) a walkable core. *Lisbon* fits — huge solo /
digital-nomad inflow, Turismo de Lisboa runs dispersal programs, compact.

**Playbook per city (repeatable):**
1. Sign the tourism-board MOU → seed 150–300 verified places (Layers 1–2).
2. Recruit 20–40 licensed guides from the local register.
3. Launch to inbound solo travellers via hostels, nomad Slack/Discord groups,
   r/solotravel, and the board's own channels.
4. Hit ~500 verified places + 1,000 monthly matched trips before opening city #2.
5. Expand along travel corridors (Lisbon → Porto → Seville → Barcelona).

**Global** = the same loop run in parallel once the per-city CAC/LTV is proven and
the moderation pipeline is mostly automated.

## Getting crowd feedback while pitching (#8, #9, #14)
- **Live demo, 3 taps**: onboard → see a scored match with reasons → generate an
  itinerary. This prototype does exactly that.
- **In-room instant poll**: one slide with a QR to a 5-question form —
  *would you use this over your current setup? which feature made you say yes?
  what's missing? would you trust the verification? price you'd pay?*
- **Wizard-of-Oz waitlist**: QR to a landing page; measure signup conversion and
  which feature bullet they clicked. Real demand signal, not opinions.
- **Fake-door test**: put "Book this guide" in the demo; count taps even though
  it's inert. Tells you booking intent.
- **5 one-on-one interviews** with solo travellers post-pitch, 10 min each.
- Track: signup conversion %, feature-that-converted, willingness-to-pay range,
  trust objection rate.

## How we know it can run (#9)
- **Leading indicators**: waitlist conversion > 25%, "one feature" answers cluster
  on matching/safety, > 60% say they'd trust KYC.
- **Pilot metric**: in beachhead city, ≥ 30% of matched pairs actually meet, and
  itinerary "save" rate > 40%.
- **Kill criteria**: if verified places can't be sourced under target cost, or
  guide supply can't be verified fast enough, the moat doesn't exist — pivot to
  pure planner + safety.

## Roadmap (#12)
| Phase | Time | Ship |
|---|---|---|
| **0 — Prototype** | done | This build: matching, explore, itinerary, accessibility, SOS (mock data). |
| **1 — Beachhead MVP** | 0–3 mo | Real auth + KYC (Persona), Postgres backend, 1 city of verified data via board MOU, real guide onboarding, in-app chat, live location + SOS wired to SMS. Web + React Native shell. |
| **2 — Trust & retention** | 3–6 mo | Reviews & disputes, reputation-weighted community edits, proximity alerts from real crime feeds, translation (DeepL), payments + guide payouts, city #2–#3. |
| **3 — Intelligence** | 6–9 mo | LLM itinerary behind the current interface (grounded in the dataset), learned match ranking, mood detection via questionnaire, offline itinerary. |
| **4 — Scale** | 9–15 mo | Corridor expansion, automated moderation, insurance partner, AR previews, memory capsule. Global signup opens once per-city CAC/LTV is proven. |

## How it grows (#14)
Solo traveller → gets a good matched trip → invites the companion they met and
brings their next-trip plans back → guides bring their regulars → tourism boards
promote it → corridor cities compound the dataset. The verified-place and
verified-guide graph is the asset; every trip makes it denser.
