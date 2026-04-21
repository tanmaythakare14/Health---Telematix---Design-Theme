import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

/* ─── Constants ─────────────────────────────────────────────── */
const NAV_W       = 240
const COLLAPSED_W = 60
const SIDEBAR_BG  = '#0F1B2D'
const FF          = 'Inter, system-ui, sans-serif'

/* ─── Nav items ─────────────────────────────────────────────── */
const NAV_TOP = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: 'clinic-management',
    label: 'Clinic Management',
    href: '/clinic-management',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
        <path d="M9 10h.01M15 10h.01M12 10h.01" />
      </svg>
    ),
  },
  {
    id: 'resource-management',
    label: 'Resource Management',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'billing-management',
    label: 'Billing Management',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
        <line x1="6" y1="15" x2="9" y2="15" />
        <line x1="12" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    id: 'messages',
    label: 'Messages',
    href: '/messages',
    badge: 3,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
]

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

function LogoIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect width="26" height="26" rx="7" fill="rgba(79,142,247,0.20)" />
      <path
        d="M3 13h4l2-5.5 2.5 11 2-7.5 1.5 3.5H23"
        stroke="#4F8EF7"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

const PATH_MAP = {
  'dashboard':         '/dashboard',
  'clinic-management': '/clinic-management',
  'messages':          '/messages',
}

/* ─── Tooltip ────────────────────────────────────────────────── */
function Tooltip({ label, badge }) {
  return (
    <div style={{ position: 'absolute', left: 'calc(100% + 10px)', top: '50%', transform: 'translateY(-50%)', background: '#1E293B', color: '#fff', fontSize: 12.5, fontWeight: 500, padding: '6px 12px', borderRadius: 7, whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 200, boxShadow: '0 4px 14px rgba(0,0,0,0.30)', display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'absolute', right: '100%', top: '50%', transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderRight: '5px solid #1E293B' }} />
      {label}
      {badge !== undefined && (
        <span style={{ fontSize: 10, fontWeight: 700, background: '#4F8EF7', padding: '1px 5px', borderRadius: 999, color: '#fff', lineHeight: 1.4 }}>{badge}</span>
      )}
    </div>
  )
}

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [profileOpen, setProfileOpen] = useState(false)
  const [tooltip,     setTooltip]     = useState(null)

  const navW = collapsed ? COLLAPSED_W : NAV_W

  return (
    <aside style={{
      width: navW, minHeight: '100vh',
      background: SIDEBAR_BG,
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, zIndex: 100,
      transition: 'width 0.22s ease', overflow: 'hidden',
    }}>

      {/* ── Logo row ── */}
      <div style={{
        height: 80, display: 'flex', alignItems: 'center',
        padding: collapsed ? '0' : '0 20px',
        justifyContent: collapsed ? 'center' : 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10 }}>
          <LogoIcon />
          {!collapsed && (
            <span style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', whiteSpace: 'nowrap', fontFamily: FF }}>
              Health Telematix
            </span>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          style={{ position: 'fixed', left: navW - 12, top: 40, width: 24, height: 24, borderRadius: '50%', background: SIDEBAR_BG, border: '1.5px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.30)', zIndex: 110, color: 'rgba(255,255,255,0.45)', transition: 'left 0.22s ease' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#4F8EF7'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#4F8EF7' }}
          onMouseLeave={e => { e.currentTarget.style.background = SIDEBAR_BG; e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {!collapsed && (
          <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.10em', padding: '16px 8px 6px', fontFamily: FF }} />
        )}

        {NAV_TOP.map(item => {
          const active = PATH_MAP[item.id] === location.pathname
          return (
            <div key={item.id} style={{ position: 'relative' }}
              onMouseEnter={() => collapsed && setTooltip(item.id)}
              onMouseLeave={() => setTooltip(null)}
            >
              <button
                onClick={() => item.href !== '#' && navigate(item.href)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  gap: collapsed ? 0 : 12,
                  padding: collapsed ? '10px 0' : '10px 12px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: active ? 'rgba(79,142,247,0.15)' : 'transparent',
                  color: active ? '#ffffff' : 'rgba(255,255,255,0.52)',
                  fontSize: 13.5, fontWeight: active ? 600 : 500,
                  fontFamily: FF, transition: 'background 0.15s, color 0.15s',
                  textAlign: 'left', marginBottom: 2,
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.52)' } }}
              >
                <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, color: active ? '#4F8EF7' : 'rgba(255,255,255,0.38)', transition: 'color 0.15s', width: 18, height: 18 }}>
                  {item.icon}
                </span>
                {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
                {!collapsed && item.badge !== undefined && (
                  <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: active ? 'rgba(255,255,255,0.22)' : 'rgba(79,142,247,0.35)', color: '#fff', lineHeight: 1.4 }}>
                    {item.badge}
                  </span>
                )}
              </button>
              {collapsed && tooltip === item.id && (
                <Tooltip label={item.label} badge={item.badge} />
              )}
            </div>
          )
        })}

        <div style={{ flex: 1 }} />

        {/* ── Bottom section ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>

          {/* Settings */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => collapsed && setTooltip('settings')}
            onMouseLeave={() => setTooltip(null)}
          >
            <button
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 12, padding: collapsed ? '10px 0' : '10px 12px', justifyContent: collapsed ? 'center' : 'flex-start', borderRadius: 8, border: 'none', cursor: 'pointer', background: 'transparent', color: 'rgba(255,255,255,0.52)', fontSize: 13.5, fontWeight: 500, fontFamily: FF, marginBottom: 2, transition: 'background 0.15s, color 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.52)' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, color: 'rgba(255,255,255,0.38)', width: 18, height: 18 }}>
                <SettingsIcon />
              </span>
              {!collapsed && 'Settings'}
            </button>
            {collapsed && tooltip === 'settings' && <Tooltip label="Settings" />}
          </div>

          {/* Profile / logout */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setProfileOpen(o => !o)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10, padding: collapsed ? '9px 0' : '9px 12px', justifyContent: collapsed ? 'center' : 'flex-start', borderRadius: 8, border: 'none', cursor: 'pointer', background: profileOpen ? 'rgba(255,255,255,0.06)' : 'transparent', fontFamily: FF, transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              onMouseLeave={e => { if (!profileOpen) e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #2a4f82, #1F3A5F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '0.02em' }}>SM</div>
              {!collapsed && (
                <>
                  <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                    <p style={{ fontSize: 12.5, fontWeight: 600, color: '#ffffff', margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: FF }}>Dr. Sarah Mitchell</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: 0, fontFamily: FF }}>Admin</p>
                  </div>
                  <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.38)', flexShrink: 0, transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.15s' }} />
                </>
              )}
            </button>

            {profileOpen && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => setProfileOpen(false)} />
                <div style={{ position: 'absolute', bottom: 'calc(100% + 6px)', left: 0, right: collapsed ? 'auto' : 0, width: collapsed ? 200 : 'auto', background: '#fff', borderRadius: 10, border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', zIndex: 100, overflow: 'hidden', fontFamily: FF }}>
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid #F1F5F9' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: 0 }}>Dr. Sarah Mitchell</p>
                    <p style={{ fontSize: 11.5, color: '#94A3B8', margin: '2px 0 0' }}>admin@healthtelematix.com</p>
                  </div>
                  <button
                    onClick={() => { setProfileOpen(false); navigate('/') }}
                    style={{ width: '100%', padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, fontWeight: 500, color: '#EF4444', textAlign: 'left', fontFamily: FF }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </aside>
  )
}
