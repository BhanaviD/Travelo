import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { speak, buzz } from '../lib/tts.js'

// Always-visible accessibility quick toggles. This is the "accessibility-first"
// promise made concrete: one tap, from any screen.
export default function AccessibilityBar() {
  const { a11y, setA11y } = useApp()
  const [open, setOpen] = useState(false)

  const toggle = (key, label) => {
    const next = !a11y[key]
    setA11y({ [key]: next })
    if (key === 'blindMode' && next) speak('Screen reading enabled')
    if (a11y.hapticsCues) buzz(20)
  }

  const items = [
    ['blindMode', 'Voice / TTS'],
    ['deafMode', 'Captions & alerts'],
    ['highContrast', 'High contrast'],
    ['largeText', 'Large text'],
  ]

  return (
    <div className="a11y-bar">
      <button className="a11y-trigger" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        ♿ Access {open ? '▲' : '▼'}
      </button>
      {open && (
        <div className="a11y-panel" role="group" aria-label="Accessibility options">
          {items.map(([key, label]) => (
            <button
              key={key}
              className={'a11y-chip' + (a11y[key] ? ' on' : '')}
              aria-pressed={a11y[key]}
              onClick={() => toggle(key, label)}
            >
              {a11y[key] ? '✓ ' : ''}{label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
