import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { INTEREST_OPTIONS, MOODS, PACE } from '../data/users.js'
import { CITIES } from '../data/places.js'

const STEPS = ['You', 'Trip', 'Interests', 'Vibe', 'Verify']

export default function Onboarding() {
  const { profile, setProfile, setA11y, a11y, completeOnboarding } = useApp()
  const [step, setStep] = useState(0)
  const [kycRunning, setKycRunning] = useState(false)
  const nav = useNavigate()

  const next = () => setStep((s) => Math.min(STEPS.length - 1, s + 1))
  const back = () => setStep((s) => Math.max(0, s - 1))

  const toggleInterest = (i) => {
    const has = profile.interests.includes(i)
    setProfile({
      interests: has ? profile.interests.filter((x) => x !== i) : [...profile.interests, i],
    })
  }

  const runKyc = () => {
    setKycRunning(true)
    setTimeout(() => {
      setProfile({ kycVerified: true })
      setKycRunning(false)
    }, 1400)
  }

  const finish = () => {
    completeOnboarding()
    nav('/matches')
  }

  return (
    <div className="pad onboarding">
      <div className="steps">
        {STEPS.map((s, i) => (
          <span key={s} className={'step-dot' + (i <= step ? ' done' : '')}>{s}</span>
        ))}
      </div>

      {step === 0 && (
        <section>
          <h1>Welcome to Travelo</h1>
          <p className="muted">Find a travel companion, real local spots, and a safety net — in one app.</p>
          <label className="field">
            <span>Name</span>
            <input value={profile.name} onChange={(e) => setProfile({ name: e.target.value })} placeholder="Your first name" />
          </label>
          <label className="field">
            <span>Age</span>
            <input type="number" min="18" max="99" value={profile.age} onChange={(e) => setProfile({ age: +e.target.value })} />
          </label>
          <label className="field">
            <span>Gender</span>
            <select value={profile.gender} onChange={(e) => setProfile({ gender: e.target.value })}>
              <option value="unspecified">Prefer not to say</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="nonbinary">Non-binary</option>
            </select>
          </label>
        </section>
      )}

      {step === 1 && (
        <section>
          <h1>Where & when</h1>
          <label className="field">
            <span>Destination city</span>
            <select value={profile.city} onChange={(e) => setProfile({ city: e.target.value })}>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="field">
            <span>Arrive</span>
            <input type="date" value={profile.dates[0]} onChange={(e) => setProfile({ dates: [e.target.value, profile.dates[1]] })} />
          </label>
          <label className="field">
            <span>Leave</span>
            <input type="date" value={profile.dates[1]} onChange={(e) => setProfile({ dates: [profile.dates[0], e.target.value] })} />
          </label>
        </section>
      )}

      {step === 2 && (
        <section>
          <h1>What are you into?</h1>
          <p className="muted">Pick a few — this drives companion matching and your itinerary.</p>
          <div className="chip-wrap">
            {INTEREST_OPTIONS.map((i) => (
              <button key={i} className={'chip' + (profile.interests.includes(i) ? ' on' : '')} onClick={() => toggleInterest(i)}>
                {i}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 3 && (
        <section>
          <h1>Your travel vibe</h1>
          <div className="stack">
            <span className="field-label">Mood</span>
            <div className="chip-wrap">
              {MOODS.map((m) => (
                <button key={m.key} className={'chip' + (profile.mood === m.key ? ' on' : '')} onClick={() => setProfile({ mood: m.key })} title={m.hint}>
                  {m.label}
                </button>
              ))}
            </div>
            <span className="field-label">Pace</span>
            <div className="chip-wrap">
              {PACE.map((p) => (
                <button key={p} className={'chip' + (profile.pace === p ? ' on' : '')} onClick={() => setProfile({ pace: p })}>{p}</button>
              ))}
            </div>
            <span className="field-label">Budget</span>
            <div className="chip-wrap">
              {['low', 'mid', 'high'].map((b) => (
                <button key={b} className={'chip' + (profile.budget === b ? ' on' : '')} onClick={() => setProfile({ budget: b })}>{b}</button>
              ))}
            </div>
            <label className="switch-row">
              <input type="checkbox" checked={profile.femaleOnly} onChange={(e) => setProfile({ femaleOnly: e.target.checked })} />
              <span>Women-travellers filter — only match me with women & women guides</span>
            </label>
          </div>
        </section>
      )}

      {step === 4 && (
        <section>
          <h1>Verify to unlock chat</h1>
          <p className="muted">
            Travelo requires ID verification (KYC) before you can message companions.
            This is the safety floor — no verified badge, no DMs.
          </p>
          <div className={'kyc-box' + (profile.kycVerified ? ' verified' : '')}>
            {profile.kycVerified ? (
              <>
                <div className="kyc-check">✅</div>
                <strong>Identity verified</strong>
                <p className="muted small">Government ID + liveness check passed (mock)</p>
              </>
            ) : (
              <>
                <div className="kyc-check">🪪</div>
                <button className="btn" onClick={runKyc} disabled={kycRunning}>
                  {kycRunning ? 'Verifying…' : 'Scan ID & take selfie (simulated)'}
                </button>
                <p className="muted small">In production: Onfido / Persona liveness + document check</p>
              </>
            )}
          </div>

          <label className="switch-row">
            <input type="checkbox" checked={a11y.blindMode} onChange={(e) => setA11y({ blindMode: e.target.checked })} />
            <span>I use a screen reader — turn on voice mode</span>
          </label>
          <label className="switch-row">
            <input type="checkbox" checked={a11y.deafMode} onChange={(e) => setA11y({ deafMode: e.target.checked })} />
            <span>I'm deaf / hard of hearing — captions & visual alerts</span>
          </label>
        </section>
      )}

      <div className="onboarding-nav">
        {step > 0 && <button className="btn ghost" onClick={back}>Back</button>}
        {step < STEPS.length - 1 && (
          <button className="btn" onClick={next} disabled={step === 0 && !profile.name}>Continue</button>
        )}
        {step === STEPS.length - 1 && (
          <button className="btn" onClick={finish} disabled={!profile.kycVerified}>Enter Travelo</button>
        )}
      </div>
    </div>
  )
}
