// Transparent compatibility scoring. This is the "AI matching algorithm" as a
// readable heuristic — every match shows *why* it scored what it did, which is
// the trust feature real companion apps lack. A learned model would slot in
// behind the same interface (score + reasons).

const WEIGHTS = {
  interests: 34, // Jaccard overlap of interest tags
  mood: 22, // exact / adjacent travel mood
  dates: 20, // trip-window overlap
  pace: 12, // slow / balanced / packed proximity
  budget: 12, // low / mid / high proximity
}

const MOOD_ADJACENCY = {
  adventurous: ['social'],
  social: ['adventurous', 'cultural'],
  cultural: ['relaxed', 'social'],
  relaxed: ['cultural'],
}

const ORDER = { slow: 0, balanced: 1, packed: 2, low: 0, mid: 1, high: 2 }

function jaccard(a = [], b = []) {
  const A = new Set(a), B = new Set(b)
  const inter = [...A].filter((x) => B.has(x)).length
  const union = new Set([...A, ...B]).size
  return union === 0 ? 0 : inter / union
}

function dateOverlapDays(a, b) {
  if (!a?.length || !b?.length) return 0
  const start = Math.max(+new Date(a[0]), +new Date(b[0]))
  const end = Math.min(+new Date(a[1]), +new Date(b[1]))
  const ms = end - start
  return ms <= 0 ? 0 : Math.round(ms / 86400000) + 1
}

export function scoreMatch(me, them) {
  const reasons = []
  let score = 0

  // interests
  const j = jaccard(me.interests, them.interests)
  const shared = me.interests.filter((i) => them.interests.includes(i))
  score += j * WEIGHTS.interests
  if (shared.length) reasons.push(`Shares ${shared.length} interest${shared.length > 1 ? 's' : ''}: ${shared.join(', ')}`)
  else reasons.push('No overlapping interests')

  // mood
  if (me.mood === them.mood) {
    score += WEIGHTS.mood
    reasons.push(`Same travel mood (${them.mood})`)
  } else if (MOOD_ADJACENCY[me.mood]?.includes(them.mood)) {
    score += WEIGHTS.mood * 0.5
    reasons.push(`Compatible mood (${me.mood} + ${them.mood})`)
  } else {
    reasons.push(`Different mood (${me.mood} vs ${them.mood})`)
  }

  // dates
  const overlap = dateOverlapDays(me.dates, them.dates)
  if (overlap > 0) {
    score += Math.min(1, overlap / 5) * WEIGHTS.dates
    reasons.push(`${overlap} overlapping day${overlap > 1 ? 's' : ''} in ${them.city}`)
  } else {
    reasons.push('Trip dates do not overlap')
  }

  // pace
  const paceGap = Math.abs(ORDER[me.pace] - ORDER[them.pace])
  score += (1 - paceGap / 2) * WEIGHTS.pace
  if (paceGap === 0) reasons.push(`Same pace (${them.pace})`)
  else if (paceGap === 1) reasons.push(`Close pace (${me.pace}/${them.pace})`)
  else reasons.push(`Pace mismatch (${me.pace} vs ${them.pace})`)

  // budget
  const budgetGap = Math.abs(ORDER[me.budget] - ORDER[them.budget])
  score += (1 - budgetGap / 2) * WEIGHTS.budget
  if (budgetGap === 0) reasons.push(`Same budget band (${them.budget})`)

  return { score: Math.round(Math.max(0, Math.min(100, score))), reasons }
}

// Applies hard filters (women-only, same city) then scores + sorts.
export function rankCompanions(me, candidates) {
  return candidates
    .filter((c) => c.id !== me.id)
    .filter((c) => !me.city || !c.city || c.city === me.city)
    .filter((c) => {
      if (me.femaleOnly && me.gender === 'female') return c.gender === 'female' || c.femaleOnly
      return true
    })
    .map((c) => ({ ...c, ...scoreMatch(me, c) }))
    .sort((a, b) => b.score - a.score)
}
