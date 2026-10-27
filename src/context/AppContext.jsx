import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { setTTSEnabled, speak } from '../lib/tts.js'

const KEY = 'travelo:v1'

const DEFAULT_STATE = {
  onboarded: false,
  profile: {
    id: 'me',
    name: '',
    age: 26,
    gender: 'unspecified',
    city: 'Lisbon',
    dates: ['2026-10-05', '2026-10-12'],
    interests: [],
    mood: 'relaxed',
    pace: 'balanced',
    budget: 'mid',
    langs: ['en'],
    femaleOnly: false,
    bio: '',
    kycVerified: false,
  },
  a11y: {
    blindMode: false, // TTS on tap, big touch targets
    deafMode: false, // captions on calls, visual alerts
    highContrast: false,
    largeText: false,
    hapticsCues: true,
    stepFreeOnly: false,
    needsAudioDescription: false,
  },
  connections: [], // ids of companions you've connected with
  savedItinerary: null,
  safety: {
    contacts: [
      { name: 'Mom', phone: '+1 555 0101' },
    ],
    sharingLocation: false,
    lastSOS: null,
  },
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULT_STATE,
      ...parsed,
      profile: { ...DEFAULT_STATE.profile, ...parsed.profile },
      a11y: { ...DEFAULT_STATE.a11y, ...parsed.a11y },
      safety: { ...DEFAULT_STATE.safety, ...parsed.safety },
    }
  } catch {
    return DEFAULT_STATE
  }
}

const Ctx = createContext(null)

export function AppProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* private mode / quota — non-fatal */
    }
  }, [state])

  useEffect(() => {
    setTTSEnabled(state.a11y.blindMode)
  }, [state.a11y.blindMode])

  const api = useMemo(() => {
    const setProfile = (patch) =>
      setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }))

    const setA11y = (patch) =>
      setState((s) => ({ ...s, a11y: { ...s.a11y, ...patch } }))

    const completeOnboarding = () =>
      setState((s) => ({ ...s, onboarded: true }))

    const resetAll = () => {
      setState(DEFAULT_STATE)
      try { localStorage.removeItem(KEY) } catch {}
    }

    const toggleConnection = (id) =>
      setState((s) => ({
        ...s,
        connections: s.connections.includes(id)
          ? s.connections.filter((x) => x !== id)
          : [...s.connections, id],
      }))

    const saveItinerary = (it) =>
      setState((s) => ({ ...s, savedItinerary: it }))

    const addContact = (c) =>
      setState((s) => ({
        ...s,
        safety: { ...s.safety, contacts: [...s.safety.contacts, c] },
      }))

    const removeContact = (i) =>
      setState((s) => ({
        ...s,
        safety: { ...s.safety, contacts: s.safety.contacts.filter((_, k) => k !== i) },
      }))

    const setSharingLocation = (v) =>
      setState((s) => ({ ...s, safety: { ...s.safety, sharingLocation: v } }))

    const triggerSOS = () => {
      const stamp = new Date().toISOString()
      setState((s) => ({ ...s, safety: { ...s.safety, lastSOS: stamp } }))
      return stamp
    }

    return {
      setProfile, setA11y, completeOnboarding, resetAll, toggleConnection,
      saveItinerary, addContact, removeContact, setSharingLocation, triggerSOS,
      speakIfBlind: (t) => speak(t),
    }
  }, [])

  return <Ctx.Provider value={{ ...state, ...api }}>{children}</Ctx.Provider>
}

export function useApp() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useApp must be used within AppProvider')
  return v
}
