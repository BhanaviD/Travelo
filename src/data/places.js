// Localized "hidden gem" places + local cuisine.
// In production this is sourced from: local tourism boards, verified local-guide
// submissions, OpenStreetMap/Overpass, and a community moderation queue.
// `verified` = confirmed by a Travelo local partner or tourism board.

export const CITIES = ['Lisbon', 'Kyoto', 'Mexico City', 'Bengaluru']

export const PLACES = [
  // ---------- Lisbon ----------
  {
    id: 'lx-01', city: 'Lisbon', name: 'Miradouro da Senhora do Monte',
    category: 'viewpoint', tags: ['relaxed', 'sunset', 'free', 'walkable'],
    blurb: 'Quiet hilltop viewpoint locals use for sunset — far less crowded than Portas do Sol.',
    duration: 45, cost: 0, accessibility: { step_free: false, audio_described: true },
    localTip: 'Buy a bica (espresso) and pastel de nata from the kiosk before the 7pm crowd.',
    verified: true, source: 'Lisbon Tourism Board',
  },
  {
    id: 'lx-02', city: 'Lisbon', name: 'Tasca do Chico (Bairro Alto)',
    category: 'food', tags: ['adventurous', 'nightlife', 'music', 'budget'],
    blurb: 'Cramped tasca with live amateur Fado most nights. Order petiscos and vinho verde.',
    duration: 90, cost: 18, accessibility: { step_free: false, audio_described: false },
    localTip: 'Go before 9pm for a seat; clapping between songs only, never during.',
    verified: true, source: 'Local guide: Rui M.',
  },
  {
    id: 'lx-03', city: 'Lisbon', name: 'LX Factory hidden bookstore (Ler Devagar)',
    category: 'culture', tags: ['relaxed', 'indoor', 'photography', 'rainy-day'],
    blurb: 'Former printing press, now a bookshop with a flying-bicycle sculpture and a good cafe.',
    duration: 60, cost: 5, accessibility: { step_free: true, audio_described: false },
    localTip: 'Sunday morning is calmest. The upstairs bar opens at noon.',
    verified: true, source: 'Community',
  },
  {
    id: 'lx-04', city: 'Lisbon', name: 'Cervejaria Ramiro (seafood)',
    category: 'food', tags: ['adventurous', 'seafood', 'splurge', 'iconic-local'],
    blurb: 'Loud, brightly lit temple to garlic prawns and percebes. Finish with a prego roll.',
    duration: 100, cost: 45, accessibility: { step_free: true, audio_described: false },
    localTip: 'Put your name on the list and wait at the bar — it moves fast.',
    verified: true, source: 'Local guide: Rui M.',
  },
  {
    id: 'lx-05', city: 'Lisbon', name: 'Sunrise kayak under the 25 de Abril bridge',
    category: 'outdoor', tags: ['adventurous', 'active', 'water', 'morning'],
    blurb: 'Small-group paddle along the Tagus before the wind picks up. Guides are certified.',
    duration: 150, cost: 40, accessibility: { step_free: false, audio_described: false },
    localTip: 'Book the 6:30am slot in summer; water is glass-flat and the light is gold.',
    verified: true, source: 'Local guide: Marta S.',
  },

  // ---------- Kyoto ----------
  {
    id: 'kt-01', city: 'Kyoto', name: 'Fushimi Inari back trail (after 5pm)',
    category: 'outdoor', tags: ['relaxed', 'active', 'photography', 'free'],
    blurb: 'The upper torii loop empties out in the evening. Bring a light for the descent.',
    duration: 120, cost: 0, accessibility: { step_free: false, audio_described: true },
    localTip: 'Start at the Yotsutsuji intersection for the best city view, then loop left.',
    verified: true, source: 'Kyoto City Tourism',
  },
  {
    id: 'kt-02', city: 'Kyoto', name: 'Nishiki Market standing-lunch crawl',
    category: 'food', tags: ['adventurous', 'walkable', 'budget', 'sampling'],
    blurb: 'Five small bites: dashimaki tamago, hamo tempura, soy-milk donut, tako tamago, matcha warabimochi.',
    duration: 75, cost: 20, accessibility: { step_free: true, audio_described: false },
    localTip: 'Eat where you buy — walking while eating is frowned on. Go 10–11am.',
    verified: true, source: 'Local guide: Aiko T.',
  },
  {
    id: 'kt-03', city: 'Kyoto', name: 'Shisen-do temple garden',
    category: 'culture', tags: ['relaxed', 'quiet', 'garden', 'indoor'],
    blurb: 'A hillside poet-scholar\'s retreat with a shishi-odoshi. Almost always near-empty.',
    duration: 50, cost: 4, accessibility: { step_free: false, audio_described: false },
    localTip: 'Combine with Enko-ji next door; both are a short bus from Ichijoji.',
    verified: true, source: 'Community',
  },
  {
    id: 'kt-04', city: 'Kyoto', name: 'Sake tasting in Fushimi (Gekkeikan Okura)',
    category: 'food', tags: ['relaxed', 'indoor', 'tasting', 'rainy-day'],
    blurb: 'Historic brewery district. Small museum, then a flight of three seasonal sakes.',
    duration: 70, cost: 12, accessibility: { step_free: true, audio_described: true },
    localTip: 'The Fushimi canal walk between breweries is lovely at dusk.',
    verified: true, source: 'Kyoto City Tourism',
  },

  // ---------- Mexico City ----------
  {
    id: 'mx-01', city: 'Mexico City', name: 'Mercado de Medellín (Roma Sur)',
    category: 'food', tags: ['adventurous', 'walkable', 'budget', 'local-life'],
    blurb: 'Pan-Latin market: Cuban, Colombian, Salvadoran stalls. Get a Oaxacan tlayuda at the back.',
    duration: 80, cost: 12, accessibility: { step_free: true, audio_described: false },
    localTip: 'Cash only. Go hungry around 2pm when comida corrida is fresh.',
    verified: true, source: 'Local guide: Diego R.',
  },
  {
    id: 'mx-02', city: 'Mexico City', name: 'Sunday cycle on Reforma + Chapultepec',
    category: 'outdoor', tags: ['relaxed', 'active', 'free', 'morning'],
    blurb: 'Reforma closes to cars every Sunday 8am–2pm. Free bike loans near the Angel.',
    duration: 120, cost: 0, accessibility: { step_free: true, audio_described: false },
    localTip: 'Ride west into Bosque de Chapultepec for the free-entry Sunday museums.',
    verified: true, source: 'CDMX Secretaría de Turismo',
  },
  {
    id: 'mx-03', city: 'Mexico City', name: 'Pulquería Las Duelistas',
    category: 'food', tags: ['adventurous', 'nightlife', 'budget', 'iconic-local'],
    blurb: 'Neon-muraled pulquería near the Centro. Try a curado de avena or guayaba.',
    duration: 60, cost: 8, accessibility: { step_free: false, audio_described: false },
    localTip: 'Afternoons are friendlier for a first visit than late nights.',
    verified: true, source: 'Community',
  },
  {
    id: 'mx-04', city: 'Mexico City', name: 'Xochimilco chinampa farm tour (not the party boats)',
    category: 'outdoor', tags: ['relaxed', 'nature', 'learning', 'morning'],
    blurb: 'A quiet trajinera to a working chinampa farm — axolotl refuge, farm breakfast.',
    duration: 210, cost: 35, accessibility: { step_free: false, audio_described: true },
    localTip: 'Book the Cuemanco embarcadero, 7am. Bring sun cover; no shade on the water.',
    verified: true, source: 'Local guide: Ana L.',
  },

  // ---------- Bengaluru ----------
  {
    id: 'bl-01', city: 'Bengaluru', name: 'Filter-coffee & dosa breakfast at Vidyarthi Bhavan',
    category: 'food', tags: ['relaxed', 'budget', 'iconic-local', 'morning'],
    blurb: 'Since 1943. Crisp masala dosa, benne (butter) dosa, and steel-tumbler filter coffee.',
    duration: 45, cost: 4, accessibility: { step_free: false, audio_described: false },
    localTip: 'Queue forms by 8am on weekends; shared tables are normal, just sit down.',
    verified: true, source: 'Community',
  },
  {
    id: 'bl-02', city: 'Bengaluru', name: 'Lalbagh sunrise walk + glasshouse',
    category: 'outdoor', tags: ['relaxed', 'active', 'nature', 'free'],
    blurb: '240-year-old botanical garden. Enter by the West Gate for the 3,000-million-year-old rock.',
    duration: 90, cost: 1, accessibility: { step_free: true, audio_described: true },
    localTip: 'Gates open 6am. The lake\'s south edge has the fewest joggers.',
    verified: true, source: 'Karnataka Tourism',
  },
  {
    id: 'bl-03', city: 'Bengaluru', name: 'Blossom Book House (Church Street)',
    category: 'culture', tags: ['relaxed', 'indoor', 'rainy-day', 'walkable'],
    blurb: 'Three floors of stacked second-hand books. Easy to lose two hours.',
    duration: 60, cost: 6, accessibility: { step_free: false, audio_described: false },
    localTip: 'Pair with a beer flight at a Church Street microbrewery after.',
    verified: true, source: 'Community',
  },
  {
    id: 'bl-04', city: 'Bengaluru', name: 'Nagarjuna Andhra-style thali lunch',
    category: 'food', tags: ['adventurous', 'spicy', 'budget', 'local-life'],
    blurb: 'Fiery bottomless Andhra meals on a banana leaf. Get the natukodi (country chicken).',
    duration: 60, cost: 5, accessibility: { step_free: true, audio_described: false },
    localTip: 'Residency Road branch, 1pm. Ask for less spice only if you mean it.',
    verified: true, source: 'Local guide: Kavya N.',
  },
]

export const CATEGORY_LABEL = {
  viewpoint: 'Viewpoint', food: 'Food & drink', culture: 'Culture',
  outdoor: 'Outdoors', nightlife: 'Nightlife',
}
