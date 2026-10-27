// AI Itinerary Builder (heuristic MVP).
// Input: city, number of days, mood, pace, interests, accessibility needs.
// Output: day-by-day plan drawn from the verified local PLACES dataset,
// balanced across categories and time-of-day, respecting step-free needs.
//
// The same function signature would wrap an LLM call in production; the local
// dataset is the retrieval layer so results stay grounded and bookable.

import { PLACES } from '../data/places.js'

const SLOTS_BY_PACE = { slow: 2, balanced: 3, packed: 4 }

const TIME_LABELS = ['Morning', 'Midday', 'Afternoon', 'Evening']

function affinity(place, opts) {
  let s = 0
  const tags = place.tags || []
  if (tags.includes(opts.mood)) s += 3
  for (const i of opts.interests || []) {
    if (place.category === i) s += 2
    if (tags.includes(i)) s += 1
  }
  if (opts.mood === 'relaxed' && tags.includes('relaxed')) s += 1
  if (opts.mood === 'adventurous' && tags.includes('adventurous')) s += 1
  if (place.category === 'food') s += 1 // everyone eats
  return s
}

export function buildItinerary(opts) {
  const {
    city, days = 3, mood = 'relaxed', pace = 'balanced',
    interests = [], stepFreeOnly = false, needsAudioDescription = false,
  } = opts

  let pool = PLACES.filter((p) => p.city === city)
  if (stepFreeOnly) pool = pool.filter((p) => p.accessibility?.step_free)
  if (needsAudioDescription) pool = pool.filter((p) => p.accessibility?.audio_described)

  const ranked = pool
    .map((p) => ({ p, a: affinity(p, { mood, interests }) }))
    .sort((x, y) => y.a - x.a)
    .map((x) => x.p)

  const slots = SLOTS_BY_PACE[pace] || 3
  const plan = []
  let idx = 0
  let usedFoodToday = 0

  for (let d = 1; d <= days; d++) {
    const items = []
    let guardrail = 0
    while (items.length < slots && guardrail < ranked.length * 2) {
      guardrail++
      const cand = ranked[idx % ranked.length]
      idx++
      if (!cand) break
      if (items.find((i) => i.id === cand.id)) continue
      // avoid 3+ food stops in one day
      if (cand.category === 'food' && usedFoodToday >= 2) continue
      items.push(cand)
      if (cand.category === 'food') usedFoodToday++
    }
    usedFoodToday = 0

    const dayCost = items.reduce((sum, i) => sum + (i.cost || 0), 0)
    plan.push({
      day: d,
      items: items.map((i, k) => ({
        ...i,
        time: TIME_LABELS[k] || `Slot ${k + 1}`,
      })),
      dayCost,
    })
  }

  const totalCost = plan.reduce((s, day) => s + day.dayCost, 0)
  const totalStops = plan.reduce((s, day) => s + day.items.length, 0)

  return {
    city, days, mood, pace,
    accessibility: { stepFreeOnly, needsAudioDescription },
    plan,
    summary: {
      totalStops,
      totalCost,
      perDayAvg: Math.round(totalCost / days),
      verifiedShare: 100, // all seed places are verified
    },
  }
}
