import { useMemo, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { buildItinerary } from '../lib/itinerary.js'
import { MOODS, PACE } from '../data/users.js'
import { speak } from '../lib/tts.js'

export default function ItineraryBuilder() {
  const { profile, a11y, savedItinerary, saveItinerary } = useApp()
  const [days, setDays] = useState(3)
  const [mood, setMood] = useState(profile.mood)
  const [pace, setPace] = useState(profile.pace)
  const [result, setResult] = useState(savedItinerary)

  const generate = () => {
    const it = buildItinerary({
      city: profile.city,
      days,
      mood,
      pace,
      interests: profile.interests,
      stepFreeOnly: a11y.stepFreeOnly,
      needsAudioDescription: a11y.needsAudioDescription,
    })
    setResult(it)
    if (a11y.blindMode) {
      speak(`Built a ${days} day ${mood} itinerary for ${profile.city}. ${it.summary.totalStops} stops, about ${it.summary.totalCost} dollars total.`)
    }
  }

  return (
    <div className="pad">
      <h1>AI itinerary builder</h1>
      <p className="muted">Grounded in Travelo's verified local dataset — every stop is real and bookable.</p>

      <div className="builder-controls">
        <label className="field">
          <span>Days</span>
          <input type="range" min="1" max="5" value={days} onChange={(e) => setDays(+e.target.value)} />
          <b>{days}</b>
        </label>

        <span className="field-label">Mood</span>
        <div className="chip-wrap tight">
          {MOODS.map((m) => (
            <button key={m.key} className={'chip' + (mood === m.key ? ' on' : '')} onClick={() => setMood(m.key)}>{m.label}</button>
          ))}
        </div>

        <span className="field-label">Pace</span>
        <div className="chip-wrap tight">
          {PACE.map((p) => (
            <button key={p} className={'chip' + (pace === p ? ' on' : '')} onClick={() => setPace(p)}>{p}</button>
          ))}
        </div>

        {(a11y.stepFreeOnly || a11y.needsAudioDescription) && (
          <p className="note small">
            Accessibility filters active:
            {a11y.stepFreeOnly ? ' step-free only' : ''}
            {a11y.needsAudioDescription ? ' · audio-described only' : ''}
          </p>
        )}

        <button className="btn" onClick={generate}>Generate itinerary</button>
      </div>

      {result && (
        <div className="itinerary">
          <div className="itin-summary">
            <span><b>{result.summary.totalStops}</b> stops</span>
            <span><b>${result.summary.totalCost}</b> total</span>
            <span><b>${result.summary.perDayAvg}</b>/day</span>
            <span><b>{result.summary.verifiedShare}%</b> verified</span>
          </div>

          {result.plan.map((day) => (
            <div key={day.day} className="itin-day">
              <h3>Day {day.day} <span className="muted small">· ~${day.dayCost}</span></h3>
              <ol className="itin-stops">
                {day.items.map((it) => (
                  <li key={it.id}>
                    <span className="slot">{it.time}</span>
                    <div>
                      <strong>{it.name}</strong>
                      <p className="muted small">{it.blurb}</p>
                      <p className="tip small">💡 {it.localTip}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <button className="btn ghost" onClick={() => saveItinerary(result)}>
            {savedItinerary === result ? 'Saved ✓' : 'Save to my trip'}
          </button>
        </div>
      )}
    </div>
  )
}
