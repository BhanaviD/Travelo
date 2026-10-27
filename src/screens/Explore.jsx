import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { PLACES } from '../data/places.js'
import { GUIDES, trustScore } from '../data/guides.js'
import { speak } from '../lib/tts.js'

const FILTERS = ['all', 'food', 'outdoor', 'culture', 'viewpoint']

export default function Explore() {
  const { profile, a11y } = useApp()
  const [tab, setTab] = useState('places')
  const [filter, setFilter] = useState('all')

  const places = useMemo(
    () => PLACES.filter((p) => p.city === profile.city)
      .filter((p) => filter === 'all' || p.category === filter)
      .filter((p) => !a11y.stepFreeOnly || p.accessibility?.step_free),
    [profile.city, filter, a11y.stepFreeOnly],
  )

  const guides = useMemo(
    () => GUIDES.filter((g) => g.city === profile.city)
      .filter((g) => !profile.femaleOnly || g.femaleGuide)
      .map((g) => ({ ...g, trust: trustScore(g), _trust: g.trust }))
      .sort((a, b) => b.trust - a.trust),
    [profile.city, profile.femaleOnly],
  )

  return (
    <div className="pad">
      <h1>Explore {profile.city}</h1>
      <p className="muted">Verified hidden-gem spots and licensed local guides — not the top-10 list.</p>

      <div className="segmented">
        <button className={tab === 'places' ? 'on' : ''} onClick={() => setTab('places')}>Hidden gems</button>
        <button className={tab === 'guides' ? 'on' : ''} onClick={() => setTab('guides')}>Local guides</button>
      </div>

      {tab === 'places' && (
        <>
          <div className="chip-wrap tight">
            {FILTERS.map((f) => (
              <button key={f} className={'chip' + (filter === f ? ' on' : '')} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <ul className="card-list">
            {places.map((p) => (
              <li key={p.id} className="place-card" onClick={() => a11y.blindMode && speak(`${p.name}. ${p.blurb}. Local tip: ${p.localTip}`)}>
                <div className="place-top">
                  <strong>{p.name}</strong>
                  {p.verified && <span className="badge verified">✔ {p.source}</span>}
                </div>
                <p>{p.blurb}</p>
                <p className="tip">💡 {p.localTip}</p>
                <div className="row small muted">
                  <span>⏱ {p.duration} min</span>
                  <span>{p.cost === 0 ? 'Free' : `~$${p.cost}`}</span>
                  <span>{p.accessibility?.step_free ? '♿ step-free' : 'has steps'}</span>
                  {p.accessibility?.audio_described && <span>🎧 audio-described</span>}
                </div>
              </li>
            ))}
            {places.length === 0 && <li className="empty">Nothing matches that filter here.</li>}
          </ul>
        </>
      )}

      {tab === 'guides' && (
        <ul className="card-list">
          {guides.map((g) => (
            <li key={g.id} className="guide-card">
              <div className="guide-top">
                <strong>{g.name}</strong>
                <span className={'trust-pill t' + Math.round(g.trust / 25)}>Trust {g.trust}</span>
              </div>
              <p className="muted small">{g.bio}</p>
              <div className="row small">
                {g._trust.idVerified && <span className="badge verified">ID verified</span>}
                {g._trust.license && <span className="badge verified">Licence {g._trust.license}</span>}
                {g._trust.boardPartner && <span className="badge soft">Tourism-board partner</span>}
                {g.femaleGuide && <span className="badge soft">Female guide</span>}
              </div>
              <div className="row small muted">
                <span>★ {g.rating} ({g.reviews})</span>
                <span>{g.langs.join(' / ')}</span>
                <span>{g.rate} / {g.ratePer}</span>
              </div>
              <div className="row small">
                {g.accessibility.map((a) => <span key={a} className="badge soft">{a}</span>)}
              </div>
              <button className="btn small">Request {g.focus[0]} tour</button>
            </li>
          ))}
          {guides.length === 0 && <li className="empty">No guides match your filters in {profile.city}.</li>}
        </ul>
      )}
    </div>
  )
}
