import { Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { useApp } from './context/AppContext.jsx'
import Onboarding from './screens/Onboarding.jsx'
import Matches from './screens/Matches.jsx'
import Explore from './screens/Explore.jsx'
import ItineraryBuilder from './screens/ItineraryBuilder.jsx'
import Safety from './screens/Safety.jsx'
import Profile from './screens/Profile.jsx'
import SOSButton from './components/SOSButton.jsx'
import AccessibilityBar from './components/AccessibilityBar.jsx'

const TABS = [
  { to: '/matches', label: 'Matches', icon: '👥' },
  { to: '/explore', label: 'Explore', icon: '📍' },
  { to: '/itinerary', label: 'Itinerary', icon: '🗺️' },
  { to: '/safety', label: 'Safety', icon: '🛟' },
  { to: '/profile', label: 'Profile', icon: '🙂' },
]

export default function App() {
  const { onboarded, a11y } = useApp()
  const location = useLocation()

  const shellClass = [
    'phone',
    a11y.highContrast && 'contrast',
    a11y.largeText && 'large-text',
    a11y.blindMode && 'blind-mode',
  ].filter(Boolean).join(' ')

  const showChrome = onboarded && location.pathname !== '/onboarding'

  return (
    <div className="stage">
      <div className={shellClass}>
        <header className="statusbar">
          <span className="brand">Travelo</span>
          {showChrome && <AccessibilityBar />}
        </header>

        <main className="screen">
          <Routes>
            <Route path="/" element={<Navigate to={onboarded ? '/matches' : '/onboarding'} replace />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/matches" element={<Guard ok={onboarded}><Matches /></Guard>} />
            <Route path="/explore" element={<Guard ok={onboarded}><Explore /></Guard>} />
            <Route path="/itinerary" element={<Guard ok={onboarded}><ItineraryBuilder /></Guard>} />
            <Route path="/safety" element={<Guard ok={onboarded}><Safety /></Guard>} />
            <Route path="/profile" element={<Guard ok={onboarded}><Profile /></Guard>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {showChrome && (
          <>
            <SOSButton />
            <nav className="tabbar">
              {TABS.map((t) => (
                <NavLink key={t.to} to={t.to} className="tab">
                  <span className="tab-icon" aria-hidden>{t.icon}</span>
                  <span className="tab-label">{t.label}</span>
                </NavLink>
              ))}
            </nav>
          </>
        )}
      </div>
      <p className="stage-note">Travelo MVP · prototype build · mock data</p>
    </div>
  )
}

function Guard({ ok, children }) {
  if (!ok) return <Navigate to="/onboarding" replace />
  return children
}
