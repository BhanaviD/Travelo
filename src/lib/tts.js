// Thin wrapper over the browser Web Speech API for the blind-friendly mode.
// Falls back silently where unsupported.

let enabled = false

export function setTTSEnabled(v) {
  enabled = v
  if (!v) cancel()
}

export function isTTSEnabled() {
  return enabled
}

export function speak(text, { force = false } = {}) {
  if ((!enabled && !force) || typeof window === 'undefined') return
  const synth = window.speechSynthesis
  if (!synth) return
  synth.cancel()
  const u = new SpeechSynthesisUtterance(String(text))
  u.rate = 1.0
  u.pitch = 1.0
  synth.speak(u)
}

export function cancel() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}

// Haptic feedback for navigation cues (deaf-friendly / blind-friendly).
export function buzz(pattern = 40) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(pattern)
}
