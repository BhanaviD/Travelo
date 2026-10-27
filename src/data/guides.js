// Local guides. Trust model (see docs/DATA-AND-GUIDES.md):
//  - id-verified: government ID checked via KYC provider
//  - license: tourism-authority guide licence number on file
//  - board-partner: introduced by a city tourism board / DMO
//  - reviews: count of completed, verified trips
//  - female-guide: opted into the women-travellers safety filter

export const GUIDES = [
  {
    id: 'g-rui', name: 'Rui M.', city: 'Lisbon', langs: ['pt', 'en', 'es'],
    focus: ['food', 'Fado', 'Bairro Alto history'], rate: 22, ratePer: 'hour',
    rating: 4.9, reviews: 214, femaleGuide: false,
    trust: { idVerified: true, license: 'RNAAT-4471', boardPartner: true },
    bio: '12 years leading tasca crawls. Grew up in Mouraria. Deaf-friendly: writes everything, knows LGP basics.',
    accessibility: ['deaf-friendly', 'slow-pace-available'],
  },
  {
    id: 'g-marta', name: 'Marta S.', city: 'Lisbon', langs: ['pt', 'en', 'fr'],
    focus: ['kayaking', 'coast', 'sunrise trips'], rate: 40, ratePer: 'trip',
    rating: 4.95, reviews: 88, femaleGuide: true,
    trust: { idVerified: true, license: 'FPCanoagem-221', boardPartner: false },
    bio: 'Certified canoe instructor and lifeguard. Runs the small-group Tagus paddles.',
    accessibility: ['adaptive-equipment-on-request'],
  },
  {
    id: 'g-aiko', name: 'Aiko T.', city: 'Kyoto', langs: ['ja', 'en'],
    focus: ['market food', 'tea', 'craft workshops'], rate: 3000, ratePer: 'hour (JPY)',
    rating: 4.88, reviews: 176, femaleGuide: true,
    trust: { idVerified: true, license: 'KYOTO-GID-0912', boardPartner: true },
    bio: 'Licensed national guide-interpreter. Specialises in Nishiki and Nishijin textile studios.',
    accessibility: ['blind-friendly', 'audio-description', 'slow-pace-available'],
  },
  {
    id: 'g-diego', name: 'Diego R.', city: 'Mexico City', langs: ['es', 'en'],
    focus: ['markets', 'street food', 'Roma / Condesa'], rate: 18, ratePer: 'hour',
    rating: 4.82, reviews: 141, femaleGuide: false,
    trust: { idVerified: true, license: null, boardPartner: true },
    bio: 'Food writer. Cash-only market crawls with allergy-aware routing.',
    accessibility: ['slow-pace-available'],
  },
  {
    id: 'g-ana', name: 'Ana L.', city: 'Mexico City', langs: ['es', 'en', 'de'],
    focus: ['Xochimilco', 'ecology', 'chinampa farming'], rate: 35, ratePer: 'trip',
    rating: 4.97, reviews: 63, femaleGuide: true,
    trust: { idVerified: true, license: 'SECTUR-CDMX-338', boardPartner: true },
    bio: 'Biologist working with the axolotl refuge. Morning farm tours, not the party boats.',
    accessibility: ['audio-description'],
  },
  {
    id: 'g-kavya', name: 'Kavya N.', city: 'Bengaluru', langs: ['kn', 'en', 'hi', 'ta'],
    focus: ['South Indian food', 'Basavanagudi', 'temple towns'], rate: 900, ratePer: 'hour (INR)',
    rating: 4.9, reviews: 97, femaleGuide: true,
    trust: { idVerified: true, license: 'KTDC-GID-2210', boardPartner: true },
    bio: 'Karnataka-licensed guide. Runs the darshini (standing eatery) breakfast trail.',
    accessibility: ['deaf-friendly', 'slow-pace-available'],
  },
]

export function trustScore(g) {
  const t = g.trust
  let s = 0
  if (t.idVerified) s += 40
  if (t.license) s += 30
  if (t.boardPartner) s += 15
  s += Math.min(15, Math.round(g.reviews / 15))
  return Math.min(100, s)
}
