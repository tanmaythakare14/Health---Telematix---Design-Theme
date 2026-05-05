import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, Boxes, CreditCard, MessageSquare,
  Settings, LogOut, ChevronDown, ChevronLeft, ChevronRight, Layers,
} from 'lucide-react'

/* ─── Exported layout constants ─────────────────────────────── */
export const NAV_W       = 240
export const COLLAPSED_W = 60

const FF = 'Inter, system-ui, sans-serif'
const GRADIENT = 'linear-gradient(135deg, #1F3A5F 0%, #0D9488 100%)'

/* ─── Theme token sets ───────────────────────────────────────── */
const DARK = {
  id:                 'dark',
  sidebarBg:          '#0F1B2D',
  sidebarBorder:      'none',
  sidebarShadow:      'none',
  divider:            'rgba(255,255,255,0.06)',
  logoBg:             'rgba(79,142,247,0.20)',
  logoStroke:         '#4F8EF7',
  logoText:           '#ffffff',
  activeNavBg:        'rgba(79,142,247,0.15)',
  activeNavColor:     '#ffffff',
  activeIconColor:    '#4F8EF7',
  inactiveNavColor:   'rgba(255,255,255,0.52)',
  inactiveIconColor:  'rgba(255,255,255,0.38)',
  hoverNavBg:         'rgba(255,255,255,0.06)',
  hoverNavColor:      'rgba(255,255,255,0.85)',
  badgeActiveBg:      'rgba(255,255,255,0.22)',
  badgeInactiveBg:    'rgba(79,142,247,0.35)',
  profileNameColor:   '#ffffff',
  profileRoleColor:   'rgba(255,255,255,0.45)',
  profileChevronColor:'rgba(255,255,255,0.38)',
  profileHoverBg:     'rgba(255,255,255,0.06)',
  toggleBg:           '#0F1B2D',
  toggleBorder:       'rgba(255,255,255,0.12)',
  toggleColor:        'rgba(255,255,255,0.45)',
  toggleHoverBg:      '#4F8EF7',
  toggleHoverBorder:  '#4F8EF7',
  guideLabel:         'rgba(255,255,255,0.28)',
  guideActiveBg:      'rgba(255,255,255,0.12)',
  guideActiveColor:   '#ffffff',
  guideInactiveBg:    'transparent',
  guideInactiveColor: 'rgba(255,255,255,0.38)',
  guideInactiveBorder:'rgba(255,255,255,0.12)',
}

const LIGHT = {
  id:                 'light',
  sidebarBg:          '#ffffff',
  sidebarBorder:      '1px solid #E8EDF2',
  sidebarShadow:      '2px 0 20px rgba(0,0,0,0.06)',
  divider:            '#F1F5F9',
  logoBg:             'rgba(13,148,136,0.09)',
  logoStroke:         '#0D9488',
  logoText:           '#0F172A',
  activeNavBg:        GRADIENT,
  activeNavColor:     '#ffffff',
  activeIconColor:    '#ffffff',
  inactiveNavColor:   '#64748B',
  inactiveIconColor:  '#94A3B8',
  hoverNavBg:         '#F5F9FF',
  hoverNavColor:      '#1F3A5F',
  badgeActiveBg:      'rgba(255,255,255,0.28)',
  badgeInactiveBg:    GRADIENT,
  profileNameColor:   '#0F172A',
  profileRoleColor:   '#94A3B8',
  profileChevronColor:'#CBD5E1',
  profileHoverBg:     '#F8FAFC',
  toggleBg:           '#ffffff',
  toggleBorder:       '#E2E8F0',
  toggleColor:        '#94A3B8',
  toggleHoverBg:      '#0D9488',
  toggleHoverBorder:  '#0D9488',
  guideLabel:         '#CBD5E1',
  guideActiveBg:      GRADIENT,
  guideActiveColor:   '#ffffff',
  guideInactiveBg:    'transparent',
  guideInactiveColor: '#94A3B8',
  guideInactiveBorder:'#E2E8F0',
}

const THEMES = { dark: DARK, light: LIGHT }
const STORAGE_KEY = 'ht_nav_theme'

const MAIN_NAV = [
  { id: 'dashboard',           label: 'Dashboard',           icon: <LayoutDashboard size={17} /> },
  { id: 'clinic-management',   label: 'Clinic Management',   icon: <Building2 size={17} /> },
  { id: 'resource-management', label: 'Resource Management', icon: <Boxes size={17} /> },
  { id: 'billing-management',  label: 'Billing Management',  icon: <CreditCard size={17} /> },
  { id: 'messages',            label: 'Messages',            icon: <MessageSquare size={17} />, badge: 3 },
]

/* ─── Nav Item ───────────────────────────────────────────────── */
function NavItem({ icon, label, active, onClick, badge, collapsed, showTooltip, T }) {
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={onClick}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          gap: collapsed ? 0 : 12,
          padding: collapsed ? '12px 0' : '11px 14px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: 9, border: 'none', cursor: 'pointer',
          background: active ? T.activeNavBg : 'transparent',
          color: active ? T.activeNavColor : T.inactiveNavColor,
          fontSize: 13.5, fontWeight: active ? 600 : 500,
          fontFamily: FF, transition: 'background 0.18s, color 0.15s', textAlign: 'left',
        }}
        onMouseEnter={e => {
          if (!active) {
            e.currentTarget.style.background = T.hoverNavBg
            e.currentTarget.style.color = T.hoverNavColor
          }
        }}
        onMouseLeave={e => {
          if (!active) {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = T.inactiveNavColor
          }
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, width: 18, height: 18, color: active ? T.activeIconColor : T.inactiveIconColor, transition: 'color 0.15s' }}>
          {icon}
        </span>
        {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
        {!collapsed && badge !== undefined && (
          <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: active ? T.badgeActiveBg : T.badgeInactiveBg, color: '#fff', lineHeight: 1.4, flexShrink: 0 }}>
            {badge}
          </span>
        )}
      </button>

      {/* Tooltip when collapsed */}
      {collapsed && showTooltip && (
        <div style={{ position: 'absolute', left: 'calc(100% + 10px)', top: '50%', transform: 'translateY(-50%)', background: '#1E293B', color: '#fff', fontSize: 12.5, fontWeight: 500, padding: '6px 12px', borderRadius: 7, whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 200, boxShadow: '0 4px 14px rgba(0,0,0,0.30)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'absolute', right: '100%', top: '50%', transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderRight: '5px solid #1E293B' }} />
          {label}
          {badge !== undefined && (
            <span style={{ fontSize: 10, fontWeight: 700, background: GRADIENT, padding: '1px 5px', borderRadius: 999, color: '#fff', lineHeight: 1.4 }}>{badge}</span>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── Nav Style Demo Guide ───────────────────────────────────── */
function NavStyleGuide({ T, navTheme, setNavTheme, collapsed }) {
  const options = [
    { id: 'dark',  label: 'Blue',  dot: '#4F8EF7' },
    { id: 'light', label: 'White', dot: GRADIENT   },
  ]

  if (collapsed) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px' }}>
        <button
          onClick={() => {
            const next = navTheme === 'dark' ? 'light' : 'dark'
            setNavTheme(next)
            localStorage.setItem(STORAGE_KEY, next)
          }}
          title="Toggle nav style"
          style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid ${T.guideInactiveBorder}`, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: T.guideInactiveColor, transition: 'all 0.18s' }}
          onMouseEnter={e => { e.currentTarget.style.background = T.hoverNavBg; e.currentTarget.style.color = T.hoverNavColor }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = T.guideInactiveColor }}
        >
          <Layers size={13} />
        </button>
      </div>
    )
  }

  return (
    <div style={{ margin: '8px 12px 4px', padding: '12px 14px', borderRadius: 10, background: navTheme === 'dark' ? 'rgba(255,255,255,0.04)' : '#F8FAFC', border: `1px solid ${navTheme === 'dark' ? 'rgba(255,255,255,0.07)' : '#EEF2F8'}` }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: T.guideLabel, textTransform: 'uppercase', letterSpacing: '0.10em', margin: '0 0 10px', fontFamily: FF }}>
        Nav Style
      </p>
      <div style={{ display: 'flex', gap: 6 }}>
        {options.map(opt => {
          const isActive = navTheme === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => { setNavTheme(opt.id); localStorage.setItem(STORAGE_KEY, opt.id) }}
              style={{
                flex: 1, height: 32, borderRadius: 8, border: isActive ? 'none' : `1px solid ${T.guideInactiveBorder}`,
                background: isActive ? T.guideActiveBg : T.guideInactiveBg,
                color: isActive ? T.guideActiveColor : T.guideInactiveColor,
                fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: FF,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                transition: 'all 0.18s',
                boxShadow: isActive ? '0 2px 8px rgba(31,58,95,0.22)' : 'none',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = T.hoverNavBg; e.currentTarget.style.color = T.hoverNavColor } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = T.guideInactiveBg; e.currentTarget.style.color = T.guideInactiveColor } }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, background: isActive ? 'rgba(255,255,255,0.7)' : opt.dot, display: 'inline-block' }} />
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ─── SidebarV5 ──────────────────────────────────────────────── */
export default function SidebarV5({ active, collapsed, onToggle }) {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const [navTheme, setNavTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'light' ? 'light' : 'dark'
  })

  const T = THEMES[navTheme]
  const navW = collapsed ? COLLAPSED_W : NAV_W

  return (
    <>
      <div style={{
        width: navW, minHeight: '100vh',
        background: T.sidebarBg,
        borderRight: T.sidebarBorder,
        boxShadow: T.sidebarShadow,
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, zIndex: 40,
        transition: 'width 0.22s ease, background 0.22s ease',
        overflow: 'hidden',
      }}>

        {/* ── Logo ── */}
        <div style={{ height: 80, display: 'flex', alignItems: 'center', padding: collapsed ? '0' : '0 20px', justifyContent: collapsed ? 'center' : 'flex-start', borderBottom: `1px solid ${T.divider}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10 }}>
            <svg width="28" height="28" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <rect width="26" height="26" rx="7" fill={T.logoBg} />
              <path d="M3 13h4l2-5.5 2.5 11 2-7.5 1.5 3.5H23" stroke={T.logoStroke} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            {!collapsed && (
              <span style={{ fontSize: 14, fontWeight: 700, color: T.logoText, letterSpacing: '-0.02em', whiteSpace: 'nowrap', fontFamily: FF, transition: 'color 0.22s' }}>
                Health Telematix
              </span>
            )}
          </div>
        </div>

        {/* ── Main nav ── */}
        <div style={{ padding: collapsed ? '14px 8px' : '14px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {MAIN_NAV.map(item => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={active === item.id}
                badge={item.badge}
                collapsed={collapsed}
                T={T}
                onClick={() => {
                  if (item.id === 'dashboard')         navigate('/dashboard')
                  if (item.id === 'clinic-management') navigate('/clinic-management')
                  if (item.id === 'messages')          navigate('/messages')
                }}
              />
            ))}
          </div>

          {/* ── Nav Style Demo Guide ── */}
          <NavStyleGuide T={T} navTheme={navTheme} setNavTheme={setNavTheme} collapsed={collapsed} />
        </div>

        {/* ── Bottom — Settings + Profile ── */}
        <div style={{ borderTop: `1px solid ${T.divider}`, padding: '12px 12px 20px', display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}>
          <NavItem
            icon={<Settings size={17} />}
            label="Settings"
            active={active === 'settings'}
            collapsed={collapsed}
            T={T}
          />

          {/* Profile */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileOpen(o => !o)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10, padding: collapsed ? '9px 0' : '9px 12px', justifyContent: collapsed ? 'center' : 'flex-start', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: FF, background: profileOpen ? T.profileHoverBg : 'transparent', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = T.profileHoverBg}
              onMouseLeave={e => { if (!profileOpen) e.currentTarget.style.background = 'transparent' }}
            >
              <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #2a4f82, #1F3A5F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '0.02em' }}>
                SM
              </div>
              {!collapsed && (
                <>
                  <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                    <p style={{ fontSize: 12.5, fontWeight: 600, color: T.profileNameColor, margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontFamily: FF, transition: 'color 0.22s' }}>Dr. Sarah Mitchell</p>
                    <p style={{ fontSize: 11, color: T.profileRoleColor, margin: 0, fontFamily: FF, transition: 'color 0.22s' }}>Admin</p>
                  </div>
                  <ChevronDown size={13} style={{ color: T.profileChevronColor, flexShrink: 0, transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.15s, color 0.22s' }} />
                </>
              )}
            </button>

            {profileOpen && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => setProfileOpen(false)} />
                <div style={{ position: 'absolute', bottom: 'calc(100% + 6px)', left: 0, right: collapsed ? 'auto' : 0, width: collapsed ? 200 : 'auto', background: '#ffffff', borderRadius: 10, border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.14)', zIndex: 100, overflow: 'hidden', fontFamily: FF }}>
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
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Collapse toggle ── */}
      <button
        onClick={onToggle}
        style={{ position: 'fixed', left: navW - 12, bottom: 40, width: 24, height: 24, borderRadius: '50%', background: T.toggleBg, border: `1.5px solid ${T.toggleBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.14)', zIndex: 50, color: T.toggleColor, transition: 'left 0.22s ease, background 0.18s, color 0.18s, border-color 0.18s' }}
        onMouseEnter={e => { e.currentTarget.style.background = T.toggleHoverBg; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = T.toggleHoverBorder }}
        onMouseLeave={e => { e.currentTarget.style.background = T.toggleBg; e.currentTarget.style.color = T.toggleColor; e.currentTarget.style.borderColor = T.toggleBorder }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </>
  )
}
