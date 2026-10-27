import { useApp } from '../context/AppContext.jsx'
import { CITIES } from '../data/places.js'
import { INTEREST_OPTIONS, MOODS, PACE } from '../data/users.js'

export default function Profile() {
  const { profile, setProfile, a11y, setA11y, resetAll, connections } = useApp()

  const toggleInterest = (i) => {
    const has = profile.interests.includes(i)
    setProfile({ interests: has ? profile.interests.filter((x) => x !== i) : [...profile.interests, i] })
  }

  return (
    <div className="pad">
      <h1>{profile.name || 'Your profile'}</h1>
      <p className="row small">
        {profile.kycVerified
          ? <span className="badge verified">✔ ID verified</span>
          : <span className="badge soft">unverified</span>}
        <span className="badge soft">{connections.length} connections</span>
      </p>

      <label className="field">
        <span>Destination city</span>
        <select value={profile.city} onChange={(e) => setProfile({ city: e.target.value })}>
          {CITIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>

      <div className="row">
        <label className="field grow">
          <span>Arrive</span>
          <input type="date" value={profile.dates[0]} onChange={(e) => setProfile({ dates: [e.target.value, profile.dates[1]] })} />
        </label>
        <label className="field grow">
          <span>Leave</span>
          <input type="date" value={profile.dates[1]} onChange={(e) => setProfile({ dates: [profile.dates[0], e.target.value] })} />
        </label>
      </div>

      <span className="field-label">Interests</span>
      <div className="chip-wrap tight">
        {INTEREST_OPTIONS.map((i) => (
          <button key={i} className={'chip' + (profile.interests.includes(i) ? ' on' : '')} onClick={() => toggleInterest(i)}>{i}</button>
        ))}
      </div>

      <span className="field-label">Mood</span>
      <div className="chip-wrap tight">
        {MOODS.map((m) => (
          <button key={m.key} className={'chip' + (profile.mood === m.key ? ' on' : '')} onClick={() => setProfile({ mood: m.key })}>{m.label}</button>
        ))}
      </div>

      <span className="field-label">Pace</span>
      <div className="chip-wrap tight">
        {PACE.map((p) => (
          <button key={p} className={'chip' + (profile.pace === p ? ' on' : '')} onClick={() => setProfile({ pace: p })}>{p}</button>
        ))}
      </div>

      <label className="switch-row">
        <input type="checkbox" checked={profile.femaleOnly} onChange={(e) => setProfile({ femaleOnly: e.target.checked })} />
        <span>Women-travellers filter</span>
      </label>

      <h2>Accessibility</h2>
      {[
        ['blindMode', 'Voice / screen-reader mode (TTS on tap)'],
        ['deafMode', 'Captions & visual alerts'],
        ['highContrast', 'High contrast theme'],
        ['largeText', 'Large text'],
        ['hapticsCues', 'Haptic navigation cues'],
        ['stepFreeOnly', 'Only show step-free places'],
        ['needsAudioDescription', 'Only show audio-described places'],
      ].map(([k, label]) => (
        <label key={k} className="switch-row">
          <input type="checkbox" checked={a11y[k]} onChange={(e) => setA11y({ [k]: e.target.checked })} />
          <span>{label}</span>
        </label>
      ))}

      <button className="btn ghost danger" onClick={resetAll}>Reset app & sign out</button>
    </div>
  )
}
