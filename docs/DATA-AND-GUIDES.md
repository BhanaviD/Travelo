# Localized place data & trusted local guides

Answers pitch tweaks #4 and #5.

## 1. How Travelo acquires "localized" place data

A four-layer pipeline, cheapest/broadest first, most trusted last.

### Layer 1 — Open geodata (bulk, free)
- **OpenStreetMap / Overpass API** and **Wikidata** for the base list of POIs,
  categories, coordinates, opening hours, wheelchair tags.
- Gives national coverage on day one without licensing cost.
- Weakness: no "is this actually good / hidden", no local tips.

### Layer 2 — Tourism-board & DMO partnerships (curated, credible)
- Every city has a Destination Marketing Organisation (Turismo de Lisboa, Kyoto
  City Tourism, CDMX Secretaría de Turismo, Karnataka Tourism…) that already
  publishes curated "local favourite" lists and wants off-peak dispersal.
- We sign content-sharing MOUs: they get a distribution channel and analytics,
  we get vetted places + the `verified: "<board>"` badge.
- This is also the wedge for the guide network (below).

### Layer 3 — Local guide & creator submissions (depth, the "hidden gem" moat)
- Verified local guides and vetted local creators submit places through a
  structured form: name, why locals go, the one non-obvious tip, best time,
  cost band, step-free / audio-described flags, a photo.
- Paid per accepted submission + revenue share when their place drives a booking.
- Everything enters a **moderation queue** (see below) before going live.

### Layer 4 — Community contributions (freshness, scale)
- Any KYC-verified user can suggest a place or edit a detail (hours changed,
  now closed, new entry fee).
- Edits are weighted by the contributor's reputation and cross-checked against
  other recent reports before auto-publishing; low-reputation edits wait for review.

### Moderation / quality gate (all layers)
1. De-dupe against existing POIs (name + ge/ fuzzy match).
2. Automated checks: is it a real business (cross-ref OSM/Google Places existence
   only, not content), profanity/spam filter, photo is a place not a person.
3. Human review for Layer 3/4 first-time contributors and anything flagged.
4. Freshness job: anything not re-confirmed in 6 months gets a "verify?" prompt
   pushed to nearby guides/users.

### Cost control
- Layers 1–2 are the launch dataset and are near-zero marginal cost.
- Layers 3–4 costs scale only with cities we've actually launched.
- We launch **city by city** (see PITCH.md), so data spend tracks revenue.

### In this prototype
`src/data/places.js` holds a hand-built sample for Lisbon, Kyoto, Mexico City and
Bengaluru with the exact field shape the pipeline produces (`verified`, `source`,
`localTip`, `accessibility.step_free`, `accessibility.audio_described`).

---

## 2. How Travelo reaches trustworthy local guides

### Sourcing channels
1. **Licensed guide associations** — most countries license tour guides
   (e.g. Portugal RNAAT, Japan's National Guide-Interpreter register, India's
   Ministry of Tourism / state guide licences). We recruit directly from these
   registers; a licence number is a verifiable trust signal.
2. **Tourism-board referrals** — the Layer 2 MOU includes "introduce us to your
   accredited guides." Warm, pre-vetted intros.
3. **Specialist operators** — small kayak schools, cooking-class hosts, food-walk
   companies. They already carry insurance and certifications.
4. **Referral by existing top-rated guides** — a guide vouching for another guide
   stakes their own rating on it.

### Verification (before a guide is listed)
- **KYC**: government ID + liveness check (Onfido / Persona / HyperVerge).
- **Licence check**: guide-licence number validated against the issuing body where
  an API or public register exists; manual check otherwise.
- **Right-to-work / business proof** for operators.
- **Reference trips**: first 3 trips are shadow-rated / mystery-shopped.

### Ongoing trust (after listing) — the `trustScore` in `src/data/guides.js`
```
id-verified            +40
licence on file        +30
tourism-board partner  +15
completed verified trips  up to +15  (reviews / 15, capped)
```
Plus continuous signals not in the prototype: dispute rate, response time,
cancellation rate, re-verification every 12 months. Score drops → fewer
impressions → delisting threshold.

### Safety-specific
- **Women-travellers filter**: guides opt into `femaleGuide`; when a traveller
  enables the filter they only see women guides and women companions.
- Every booking runs on Travelo's safety layer: live location sharing with a
  trusted contact, in-app check-in, SOS.

### Guide economics
- Guides set their own rate; Travelo takes 15–20% commission.
- Verified, board-partnered guides get a lower commission tier as an incentive to
  complete verification.

### In this prototype
`src/data/guides.js` has 6 sample guides with real-looking licence numbers, the
trust-score function, accessibility opt-ins, and the women-guide flag. `Explore →
Local guides` ranks them by trust and respects the women-travellers filter.
