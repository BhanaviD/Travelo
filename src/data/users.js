// Candidate travel companions (mock). The signup flow in Onboarding builds the
// current user's profile in the same shape and feeds matching.js.

export const INTEREST_OPTIONS = [
  'food', 'hiking', 'museums', 'nightlife', 'photography', 'history',
  'beaches', 'markets', 'live-music', 'architecture', 'wildlife', 'wellness',
]

export const MOODS = [
  { key: 'adventurous', label: 'Adventurous', hint: 'early starts, active days, say-yes energy' },
  { key: 'relaxed', label: 'Relaxed', hint: 'slow mornings, cafes, one thing a day' },
  { key: 'cultural', label: 'Cultural', hint: 'museums, history, local arts' },
  { key: 'social', label: 'Social', hint: 'meet people, group dinners, nightlife' },
]

export const PACE = ['slow', 'balanced', 'packed']

export const CANDIDATES = [
  {
    id: 'u-101', name: 'Priya', age: 27, city: 'Lisbon', dates: ['2026-10-04', '2026-10-11'],
    interests: ['food', 'photography', 'architecture', 'markets'],
    mood: 'relaxed', pace: 'balanced', budget: 'mid',
    langs: ['en', 'hi'], femaleOnly: true, verified: true,
    bio: 'Product designer on a slow week in Lisbon. Will walk a long way for good bread.',
  },
  {
    id: 'u-102', name: 'Marco', age: 31, city: 'Lisbon', dates: ['2026-10-06', '2026-10-13'],
    interests: ['hiking', 'photography', 'history', 'live-music'],
    mood: 'adventurous', pace: 'packed', budget: 'low',
    langs: ['en', 'it', 'pt'], femaleOnly: false, verified: true,
    bio: 'Up at 6, kayak by 7. Looking for someone to split a day-trip to Sintra.',
  },
  {
    id: 'u-103', name: 'Sena', age: 24, city: 'Kyoto', dates: ['2026-11-02', '2026-11-09'],
    interests: ['museums', 'food', 'photography', 'wellness'],
    mood: 'cultural', pace: 'slow', budget: 'mid',
    langs: ['en', 'ja', 'ko'], femaleOnly: false, verified: true,
    bio: 'Ceramics student. Temple gardens on weekday mornings, tea in the afternoon.',
  },
  {
    id: 'u-104', name: 'Hannah', age: 29, city: 'Kyoto', dates: ['2026-11-03', '2026-11-10'],
    interests: ['food', 'markets', 'nightlife', 'live-music'],
    mood: 'social', pace: 'balanced', budget: 'mid',
    langs: ['en', 'de'], femaleOnly: true, verified: true,
    bio: 'Solo but hate eating dinner alone. Would love a Nishiki crawl + izakaya buddy.',
  },
  {
    id: 'u-105', name: 'Diego', age: 34, city: 'Mexico City', dates: ['2026-10-18', '2026-10-25'],
    interests: ['history', 'museums', 'food', 'architecture'],
    mood: 'cultural', pace: 'balanced', budget: 'mid',
    langs: ['es', 'en'], femaleOnly: false, verified: true,
    bio: 'Local-ish (moved from Guadalajara). Happy to show the Centro to a first-timer.',
  },
  {
    id: 'u-106', name: 'Aisha', age: 26, city: 'Mexico City', dates: ['2026-10-19', '2026-10-26'],
    interests: ['food', 'markets', 'photography', 'wildlife'],
    mood: 'relaxed', pace: 'slow', budget: 'low',
    langs: ['en', 'ar', 'es'], femaleOnly: true, verified: true,
    bio: 'Xochimilco at sunrise is the plan. Vegetarian, cash-only market person.',
  },
  {
    id: 'u-107', name: 'Rahul', age: 28, city: 'Bengaluru', dates: ['2026-09-20', '2026-09-27'],
    interests: ['food', 'live-music', 'nightlife', 'history'],
    mood: 'social', pace: 'packed', budget: 'mid',
    langs: ['en', 'hi', 'kn'], femaleOnly: false, verified: true,
    bio: 'Church Street microbreweries, filter coffee recovery the next morning.',
  },
  {
    id: 'u-108', name: 'Meera', age: 30, city: 'Bengaluru', dates: ['2026-09-21', '2026-09-28'],
    interests: ['wellness', 'wildlife', 'museums', 'photography'],
    mood: 'relaxed', pace: 'balanced', budget: 'mid',
    langs: ['en', 'kn', 'ta'], femaleOnly: true, verified: false,
    bio: 'Lalbagh mornings, weekend trip to a Western Ghats homestay if anyone\'s keen.',
  },
]
