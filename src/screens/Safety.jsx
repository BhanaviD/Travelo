import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

export default function Safety() {
  const { safety, addContact, removeContact, setSharingLocation, profile } = useApp()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const add = () => {
    if (!name || !phone) return
    addContact({ name, phone })
    setName('')
    setPhone('')
  }

  return (
    <div className="pad">
      <h1>Safety</h1>
      <p className="muted">The safety net runs whether or not you use a companion.</p>

      <section className="safety-block">
        <div className="row between">
          <div>
            <strong>Live location sharing</strong>
            <p className="muted small">Trusted contacts see your location during a trip or meetup.</p>
          </div>
          <label className="switch">
            <input type="checkbox" checked={safety.sharingLocation} onChange={(e) => setSharingLocation(e.target.checked)} />
            <span className="slider" />
          </label>
        </div>
        {safety.sharingLocation && (
          <div className="live-map">
            <div className="live-dot" />
            <span className="muted small">Sharing to {safety.contacts.length} contact(s) · {profile.city}</span>
          </div>
        )}
      </section>

      <section className="safety-block">
        <strong>Emergency contacts</strong>
        <ul className="contact-list">
          {safety.contacts.map((c, i) => (
            <li key={i}>
              <span>{c.name} · {c.phone}</span>
              <button className="link-btn" onClick={() => removeContact(i)}>remove</button>
            </li>
          ))}
          {safety.contacts.length === 0 && <li className="muted small">No contacts yet — add one below.</li>}
        </ul>
        <div className="row">
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button className="btn small" onClick={add}>Add</button>
        </div>
      </section>

      <section className="safety-block">
        <strong>Proximity alerts</strong>
        <p className="muted small">Travelo warns you before you walk into a flagged high-risk area. (Data: local crime feeds + community reports.)</p>
        <div className="alert-demo">⚠️ Heads up — the area 400m NE has more reported incidents after dark. Suggested safer route added.</div>
      </section>

      <section className="safety-block">
        <strong>Trip check-in</strong>
        <p className="muted small">Set an "I'm back by" time. Miss it and your contacts get your last location automatically.</p>
        <button className="btn ghost small">Set a check-in timer</button>
      </section>

      <p className="muted small">Last SOS: {safety.lastSOS ? new Date(safety.lastSOS).toLocaleString() : 'never'}</p>
    </div>
  )
}
