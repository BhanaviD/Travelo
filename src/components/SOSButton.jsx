import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { buzz, speak } from '../lib/tts.js'

// Floating panic button. Press-and-hold 1.2s to avoid pocket triggers.
export default function SOSButton() {
  const { safety, triggerSOS, a11y } = useApp()
  const [progress, setProgress] = useState(0)
  const [fired, setFired] = useState(null)
  let timer = null
  let raf = null

  const start = () => {
    const t0 = performance.now()
    const step = (t) => {
      const p = Math.min(1, (t - t0) / 1200)
      setProgress(p)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    timer = setTimeout(() => {
      const stamp = triggerSOS()
      setFired(stamp)
      buzz([80, 40, 80, 40, 200])
      if (a11y.blindMode) speak('SOS sent. Alerting your emergency contacts with your location.')
    }, 1200)
  }

  const end = () => {
    clearTimeout(timer)
    cancelAnimationFrame(raf)
    setProgress(0)
  }

  return (
    <>
      <button
        className="sos-fab"
        style={{ '--p': progress }}
        onMouseDown={start}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchEnd={end}
        aria-label="Emergency SOS. Press and hold."
      >
        SOS
      </button>

      {fired && (
        <div className="sos-overlay" role="alertdialog" aria-label="SOS activated">
          <div className="sos-card">
            <div className="sos-pulse">🚨</div>
            <h2>SOS activated</h2>
            <p>
              Sharing your live location and a distress alert with{' '}
              <strong>{safety.contacts.length || 0}</strong> emergency contact
              {safety.contacts.length === 1 ? '' : 's'}.
            </p>
            <ul className="sos-steps">
              <li>✓ Live location link sent</li>
              <li>✓ Contacts notified by SMS + push</li>
              <li>✓ Local emergency number surfaced (112 / 911 / 100)</li>
              <li>✓ Loud siren available</li>
            </ul>
            <p className="muted small">Sent {new Date(fired).toLocaleTimeString()}</p>
            <button className="btn" onClick={() => setFired(null)}>I'm safe — dismiss</button>
          </div>
        </div>
      )}
    </>
  )
}
