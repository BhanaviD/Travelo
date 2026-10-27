import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { CANDIDATES } from '../data/users.js'
import { rankCompanions } from '../lib/matching.js'
import { speak } from '../lib/tts.js'

export default function Matches() {
  const { profile, connections, toggleConnection, a11y } = useApp()
  const [openId, setOpenId] = useState(null)

  const ranked = useMemo(
    () => rankCompanions(profile, CANDIDATES),
    [profile],
  )

  return (
    <div className="pad">
      <h1>Companion matches</h1>
      <p className="muted">
        In <strong>{profile.city}</strong>, {profile.dates[0]} → {profile.dates[1]}.
        Scored on shared interests, mood, overlapping dates, pace & budget.
      </p>

      {ranked.length === 0 && (
        <p className="empty">No companions in {profile.city} yet. Try another city in your Profile.</p>
      )}

      <ul className="card-list">
        {ranked.map((m) => {
          const connected = connections.includes(m.id)
          const open = openId === m.id
          return (
            <li key={m.id} className="match-card">
              <button
                className="match-head"
                onClick={() => {
                  setOpenId(open ? null : m.id)
                  if (a11y.blindMode && !open) {
                    speak(`${m.name}, ${m.age}. ${m.score} percent match. ${m.reasons[0]}.`)
                  }
                }}
                aria-expanded={open}
              >
                <div className={'score-ring s' + Math.round(m.score / 20)}>
                  <span>{m.score}</span>
                </div>
                <div className="match-id">
                  <strong>{m.name}, {m.age}</strong>
                  {m.verified && <span className="badge verified">✔ ID verified</span>}
                  {m.femaleOnly && <span className="badge soft">women-only</span>}
                  <p className="muted small">{m.bio}</p>
                </div>
              </button>

              {open && (
                <div className="match-body">
                  <h3>Why you matched</h3>
                  <ul className="reasons">
                    {m.reasons.map((r, i) => (
                      <li key={i} className={r.startsWith('No ') || r.includes('mismatch') || r.includes('do not') || r.includes('Different') ? 'neg' : 'pos'}>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="row">
                    <span className="badge soft">{m.mood}</span>
                    <span className="badge soft">{m.pace} pace</span>
                    <span className="badge soft">{m.budget} budget</span>
                    <span className="badge soft">{m.langs.join(' / ')}</span>
                  </div>
                  <button
                    className={'btn' + (connected ? ' ghost' : '')}
                    disabled={!profile.kycVerified}
                    onClick={() => toggleConnection(m.id)}
                  >
                    {connected ? 'Connected ✓ — open chat' : profile.kycVerified ? 'Connect & message' : 'Verify ID to message'}
                  </button>
                  {connected && (
                    <div className="chat-mock">
                      <div className="bubble them">Hey! Saw we overlap in {m.city}. Want to do {m.interests[0]}?</div>
                      <div className="bubble me">Yes — {m.dates[0]}? I'll bring the itinerary.</div>
                      <div className="chat-input"><input placeholder="Message…" /><button className="btn small">Send</button></div>
                    </div>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
