import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail, validatePassword } from '../../utils/authValidation'

/* ─── Break out of #root width constraint (same as AuthLayout) ── */
function useAuthRoot() {
  useEffect(() => {
    const root = document.getElementById('root')
    root?.classList.add('auth-root')
    return () => root?.classList.remove('auth-root')
  }, [])
}

/* ─── Doodle color tokens ───────────────────────────────────── */
// Primary blue at two depths — lighter shade of primary
const D  = 'rgba(37,99,235,0.14)'   // regular doodles
const DG = 'rgba(37,99,235,0.06)'   // ghost / oversized background layer

/* ─── Helper: all shapes accept a `c` (color) prop ─────────── */

function Stethoscope({ style, c = D }) {
  return (
    <svg width="100" height="110" viewBox="0 0 90 100" fill="none" style={style}>
      <circle cx="45" cy="84" r="13" stroke={c} strokeWidth="2.8"/>
      <circle cx="45" cy="84" r="5"  stroke={c} strokeWidth="2.2"/>
      <path d="M45 71 C45 52 45 38 24 24 C17 18 17 9 24 4"
            stroke={c} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d="M45 71 C45 52 45 38 66 24 C73 18 73 9 66 4"
            stroke={c} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <circle cx="24" cy="3" r="4" stroke={c} strokeWidth="2.2"/>
      <circle cx="66" cy="3" r="4" stroke={c} strokeWidth="2.2"/>
    </svg>
  )
}

function HeartEKG({ style, c = D }) {
  return (
    <svg width="220" height="55" viewBox="0 0 220 55" fill="none" style={style}>
      <path d="M0 28 L50 28 L60 28 L66 8 L74 48 L82 18 L88 28 L220 28"
            stroke={c} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function Heart({ style, c = D }) {
  return (
    <svg width="68" height="62" viewBox="0 0 52 48" fill="none" style={style}>
      <path d="M26 44 C9 32 1 21 1 14 C1 7 7 1 14 1 C18 1 22 3 26 8 C30 3 34 1 38 1 C45 1 51 7 51 14 C51 21 43 32 26 44Z"
            stroke={c} strokeWidth="2.8" strokeLinejoin="round"/>
    </svg>
  )
}

function Pill({ style, c = D }) {
  return (
    <svg width="85" height="40" viewBox="0 0 85 38" fill="none" style={style}>
      <rect x="2" y="2" width="81" height="34" rx="17" stroke={c} strokeWidth="2.8"/>
      <line x1="42.5" y1="2" x2="42.5" y2="36" stroke={c} strokeWidth="2.8"/>
    </svg>
  )
}

function MedCross({ style, c = D }) {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" style={style}>
      <rect x="17" y="1"  width="18" height="50" rx="5" stroke={c} strokeWidth="2.8"/>
      <rect x="1"  y="17" width="50" height="18" rx="5" stroke={c} strokeWidth="2.8"/>
    </svg>
  )
}

function DNA({ style, c = D }) {
  return (
    <svg width="55" height="130" viewBox="0 0 55 130" fill="none" style={style}>
      <path d="M10 5 C52 22 52 42 10 58 C-32 74 -32 94 10 110"
            stroke={c} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d="M44 5 C2 22 2 42 44 58 C86 74 86 94 44 110"
            stroke={c} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <line x1="10" y1="31"  x2="44" y2="31"  stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="10" y1="58"  x2="44" y2="58"  stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="10" y1="84"  x2="44" y2="84"  stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}

function Thermometer({ style, c = D }) {
  return (
    <svg width="38" height="110" viewBox="0 0 36 108" fill="none" style={style}>
      <rect x="13" y="2" width="10" height="68" rx="5" stroke={c} strokeWidth="2.8"/>
      <circle cx="18" cy="88" r="14" stroke={c} strokeWidth="2.8"/>
      <line x1="18" y1="66" x2="18" y2="40" stroke={c} strokeWidth="4" strokeLinecap="round"/>
      <line x1="23" y1="25" x2="26" y2="25" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="23" y1="38" x2="26" y2="38" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="23" y1="51" x2="26" y2="51" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function Syringe({ style, c = D }) {
  return (
    <svg width="130" height="38" viewBox="0 0 130 36" fill="none" style={style}>
      <line x1="93" y1="18" x2="128" y2="18" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
      <rect x="26" y="7" width="67" height="22" rx="4" stroke={c} strokeWidth="2.8"/>
      <line x1="26" y1="18" x2="5" y2="18" stroke={c} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="5"  y1="8"  x2="5"  y2="28" stroke={c} strokeWidth="3.5" strokeLinecap="round"/>
      <line x1="52" y1="7"  x2="52" y2="13" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="67" y1="7"  x2="67" y2="13" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="82" y1="7"  x2="82" y2="13" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function Shield({ style, c = D }) {
  return (
    <svg width="62" height="72" viewBox="0 0 60 70" fill="none" style={style}>
      <path d="M30 5 L56 16 L56 36 C56 53 30 65 30 65 C30 65 4 53 4 36 L4 16 Z"
            stroke={c} strokeWidth="2.8" strokeLinejoin="round"/>
      <line x1="30" y1="25" x2="30" y2="48" stroke={c} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="18" y1="36" x2="42" y2="36" stroke={c} strokeWidth="2.8" strokeLinecap="round"/>
    </svg>
  )
}

function Clipboard({ style, c = D }) {
  return (
    <svg width="65" height="80" viewBox="0 0 62 78" fill="none" style={style}>
      <rect x="4"  y="12" width="54" height="62" rx="6" stroke={c} strokeWidth="2.8"/>
      <rect x="20" y="5"  width="22" height="16" rx="5" stroke={c} strokeWidth="2.8"/>
      <line x1="14" y1="35" x2="48" y2="35" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="14" y1="47" x2="48" y2="47" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="14" y1="59" x2="36" y2="59" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  )
}

function Capsule({ style, c = D }) {
  return (
    <svg width="48" height="48" viewBox="0 0 44 44" fill="none" style={style}>
      <ellipse cx="22" cy="22" rx="10" ry="20" stroke={c} strokeWidth="2.8"/>
      <line x1="12" y1="22" x2="32" y2="22" stroke={c} strokeWidth="2.8"/>
    </svg>
  )
}

function Lungs({ style, c = D }) {
  return (
    <svg width="100" height="80" viewBox="0 0 96 76" fill="none" style={style}>
      <line x1="48" y1="2" x2="48" y2="28" stroke={c} strokeWidth="2.8" strokeLinecap="round"/>
      <path d="M48 28 C30 28 14 32 14 52 C14 64 22 72 32 70 C40 68 42 60 42 52 L42 28"
            stroke={c} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d="M48 28 C66 28 82 32 82 52 C82 64 74 72 64 70 C56 68 54 60 54 52 L54 28"
            stroke={c} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

/* ── NEW shapes ──────────────────────────────────────────────── */

function Bandage({ style, c = D }) {
  return (
    <svg width="90" height="36" viewBox="0 0 88 34" fill="none" style={style}>
      <rect x="2" y="2" width="84" height="30" rx="15" stroke={c} strokeWidth="2.8"/>
      <rect x="29" y="7" width="30" height="20" rx="3" stroke={c} strokeWidth="2"/>
      <line x1="44" y1="10" x2="44" y2="24" stroke={c} strokeWidth="2"   strokeLinecap="round"/>
      <line x1="37" y1="17" x2="51" y2="17" stroke={c} strokeWidth="2"   strokeLinecap="round"/>
      <circle cx="15" cy="17" r="3" stroke={c} strokeWidth="2"/>
      <circle cx="73" cy="17" r="3" stroke={c} strokeWidth="2"/>
    </svg>
  )
}

function MedBag({ style, c = D }) {
  return (
    <svg width="78" height="72" viewBox="0 0 76 70" fill="none" style={style}>
      <rect x="2" y="20" width="72" height="48" rx="9" stroke={c} strokeWidth="2.8"/>
      <path d="M22 20 L22 12 Q22 3 38 3 Q54 3 54 12 L54 20"
            stroke={c} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <line x1="38" y1="34" x2="38" y2="52" stroke={c} strokeWidth="2.8" strokeLinecap="round"/>
      <line x1="29" y1="43" x2="47" y2="43" stroke={c} strokeWidth="2.8" strokeLinecap="round"/>
    </svg>
  )
}

function Droplet({ style, c = D }) {
  return (
    <svg width="42" height="58" viewBox="0 0 40 56" fill="none" style={style}>
      <path d="M20 4 C20 4 36 24 36 36 C36 46 29 52 20 52 C11 52 4 46 4 36 C4 24 20 4 20 4Z"
            stroke={c} strokeWidth="2.8" strokeLinejoin="round"/>
      <path d="M13 38 C13 34 16 31 20 31" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function Beaker({ style, c = D }) {
  return (
    <svg width="55" height="65" viewBox="0 0 52 62" fill="none" style={style}>
      <rect x="18" y="2" width="16" height="20" rx="3" stroke={c} strokeWidth="2.8"/>
      <path d="M18 22 L6 54 Q4 58 8 58 L44 58 Q48 58 46 54 L34 22 Z"
            stroke={c} strokeWidth="2.8" strokeLinejoin="round"/>
      <line x1="10" y1="46" x2="42" y2="46" stroke={c} strokeWidth="2"   strokeLinecap="round"/>
      <circle cx="20" cy="40" r="2.5" stroke={c} strokeWidth="1.8"/>
      <circle cx="30" cy="36" r="1.8" stroke={c} strokeWidth="1.8"/>
    </svg>
  )
}

function HeartCircle({ style, c = D }) {
  return (
    <svg width="65" height="65" viewBox="0 0 62 62" fill="none" style={style}>
      <circle cx="31" cy="31" r="28" stroke={c} strokeWidth="2.8"/>
      <path d="M10 31 L18 31 L21 24 L25 38 L29 27 L32 31 L52 31"
            stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ─── Background Doodle Layer ───────────────────────────────── */
function DoodleBackground() {
  const P = { position: 'absolute' }   // shorthand
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>

      {/* ════ GHOST LAYER — large, faint shapes for depth ════ */}
      <HeartEKG    c={DG} style={{ ...P, top: '30%',    left: '-3%',   width: 320, transform: 'rotate(-6deg)' }} />
      <DNA         c={DG} style={{ ...P, top: '18%',    right: '-2%',  width: 90, height: 200, transform: 'rotate(5deg)' }} />
      <Lungs       c={DG} style={{ ...P, bottom: '8%',  left: '8%',   width: 200, height: 160, transform: 'rotate(4deg)' }} />
      <Stethoscope c={DG} style={{ ...P, bottom: '5%',  right: '8%',  width: 180, height: 200, transform: 'rotate(-12deg)' }} />

      {/* ════ TOP-LEFT CLUSTER ════ */}
      <Stethoscope style={{ ...P, top: '3%',   left: '2%',   transform: 'rotate(-22deg)' }} />
      <MedCross    style={{ ...P, top: '2%',   left: '16%',  transform: 'rotate(12deg)',  width: 44, height: 44 }} />
      <Capsule     style={{ ...P, top: '14%',  left: '6%',   transform: 'rotate(-35deg)' }} />
      <Bandage     style={{ ...P, top: '22%',  left: '3%',   transform: 'rotate(14deg)' }} />

      {/* ════ TOP STRIP ════ */}
      <HeartEKG    style={{ ...P, top: '1%',   left: '28%',  transform: 'rotate(-4deg)' }} />
      <Heart       style={{ ...P, top: '5%',   left: '54%',  transform: 'rotate(22deg)',  width: 46, height: 42 }} />
      <Heart       style={{ ...P, top: '3%',   left: '63%',  transform: 'rotate(18deg)' }} />

      {/* ════ TOP-RIGHT CLUSTER ════ */}
      <Pill        style={{ ...P, top: '2%',   right: '2%',  transform: 'rotate(-28deg)' }} />
      <DNA         style={{ ...P, top: '9%',   right: '1%',  transform: 'rotate(12deg)' }} />
      <Droplet     style={{ ...P, top: '22%',  right: '5%',  transform: 'rotate(-15deg)' }} />

      {/* ════ LEFT INNER ZONE (fills the wide gap left of card) ════ */}
      <MedBag      style={{ ...P, top: '28%',  left: '4%',   transform: 'rotate(10deg)' }} />
      <Heart       style={{ ...P, top: '34%',  left: '15%',  transform: 'rotate(8deg)',   width: 50, height: 46 }} />
      <Beaker      style={{ ...P, top: '43%',  left: '5%',   transform: 'rotate(-22deg)' }} />
      <HeartCircle style={{ ...P, top: '54%',  left: '9%',   transform: 'rotate(6deg)' }} />
      <Pill        style={{ ...P, top: '48%',  left: '1%',   transform: 'rotate(35deg)',  width: 62, height: 30 }} />
      <Syringe     style={{ ...P, top: '64%',  left: '-3%',  transform: 'rotate(-38deg)' }} />
      <Capsule     style={{ ...P, top: '70%',  left: '13%',  transform: 'rotate(-20deg)' }} />
      <Shield      style={{ ...P, top: '76%',  left: '2%',   transform: 'rotate(-8deg)' }} />

      {/* ════ RIGHT INNER ZONE (fills the wide gap right of card) ════ */}
      <MedBag      style={{ ...P, top: '26%',  right: '5%',  transform: 'rotate(-12deg)' }} />
      <Clipboard   style={{ ...P, top: '36%',  right: '1%',  transform: 'rotate(-14deg)' }} />
      <Bandage     style={{ ...P, top: '46%',  right: '3%',  transform: 'rotate(20deg)' }} />
      <Beaker      style={{ ...P, top: '53%',  right: '9%',  transform: 'rotate(-8deg)' }} />
      <Thermometer style={{ ...P, top: '60%',  right: '2%',  transform: 'rotate(22deg)' }} />
      <Droplet     style={{ ...P, top: '69%',  right: '7%',  transform: 'rotate(16deg)' }} />
      <MedCross    style={{ ...P, top: '79%',  right: '3%',  transform: 'rotate(8deg)',   width: 40, height: 40 }} />

      {/* ════ BOTTOM STRIP ════ */}
      <Lungs       style={{ ...P, bottom: '3%', left: '3%',   transform: 'rotate(5deg)' }} />
      <HeartEKG    style={{ ...P, bottom: '2%', left: '20%',  transform: 'rotate(3deg)',  width: 150 }} />
      <MedCross    style={{ ...P, bottom: '9%', left: '38%',  transform: 'rotate(-10deg)', width: 38, height: 38 }} />
      <Heart       style={{ ...P, bottom: '4%', left: '52%',  transform: 'rotate(-18deg)', width: 55, height: 50 }} />
      <Capsule     style={{ ...P, bottom: '7%', left: '67%',  transform: 'rotate(26deg)',  width: 40 }} />
      <Pill        style={{ ...P, bottom: '3%', right: '7%',  transform: 'rotate(30deg)',  width: 65 }} />
      <Capsule     style={{ ...P, bottom: '6%', right: '2%',  transform: 'rotate(-25deg)' }} />
    </div>
  )
}

/* ─── Eye Toggle Icon ────────────────────────────────────────── */
function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M1 12C1 12 5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Z"
            stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
            stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <path d="M10.73 10.73a3 3 0 0 0 4.24 4.24"
            stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
      <line x1="1" y1="1" x2="23" y2="23"
            stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
    </svg>
  )
}

/* ─── Inline Form Field ──────────────────────────────────────── */
function Field({ id, label, type = 'text', value, onChange, onBlur, error, placeholder, rightAddon }) {
  const [focused, setFocused] = useState(false)

  const borderColor = error
    ? '#EF4444'
    : focused
      ? '#2563EB'
      : '#E2E8F0'

  const shadow = focused && !error ? '0 0 0 4px rgba(37,99,235,0.10)' : 'none'

  return (
    <div style={{ marginBottom: error ? 14 : 18 }}>
      <label
        htmlFor={id}
        style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 7 }}
      >
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={id}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); onBlur?.() }}
          style={{
            width: '100%',
            height: 46,
            padding: rightAddon ? '0 44px 0 14px' : '0 14px',
            border: `1.5px solid ${borderColor}`,
            borderRadius: 10,
            fontSize: 14,
            color: '#1E293B',
            background: '#F8FAFC',
            outline: 'none',
            fontFamily: 'Inter, system-ui, sans-serif',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: shadow,
          }}
        />
        {rightAddon && (
          <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
            {rightAddon}
          </div>
        )}
      </div>
      {error && (
        <p style={{ margin: '5px 0 0', fontSize: 12, color: '#EF4444', fontFamily: 'Inter, system-ui, sans-serif' }}>
          {error}
        </p>
      )}
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function SignInV2() {
  useAuthRoot()
  const navigate = useNavigate()

  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors,       setErrors]       = useState({ email: '', password: '' })
  const [touched,      setTouched]      = useState({ email: false, password: false })
  const [loading,      setLoading]      = useState(false)

  function validate(vals) {
    return {
      email:    validateEmail(vals.email),
      password: validatePassword(vals.password),
    }
  }

  function handleBlur(field) {
    setTouched(p => ({ ...p, [field]: true }))
    const errs = validate({ email, password })
    setErrors(p => ({ ...p, [field]: errs[field] }))
  }

  function handleChange(field, val) {
    if (field === 'email')    setEmail(val)
    if (field === 'password') setPassword(val)
    if (touched[field]) {
      const next = { email, password, [field]: val }
      const errs = validate(next)
      setErrors(p => ({ ...p, [field]: errs[field] }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched({ email: true, password: true })
    const errs = validate({ email, password })
    setErrors(errs)
    if (errs.email || errs.password) return
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/clinic-management') }, 1200)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(145deg, #F4F7FF 0%, #EEF4FF 50%, #F0F7FF 100%)',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative',
      }}
    >
      {/* Doodle background layer */}
      <DoodleBackground />

      {/* Centering shell */}
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 16px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 440 }}>

          {/* ── Card ── */}
          <div
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(12px)',
              borderRadius: 24,
              padding: '44px 44px 36px',
              boxShadow: '0 24px 64px rgba(37,99,235,0.10), 0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid rgba(255,255,255,0.8)',
              boxSizing: 'border-box',
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <svg width="32" height="32" viewBox="0 0 26 26" fill="none">
                <rect width="26" height="26" rx="7" fill="#2563EB"/>
                <path d="M3 13h4l2-5.5 2.5 11 2-7.5 1.5 3.5H23"
                      stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', letterSpacing: '-0.01em' }}>
                Health Telematix
              </span>
            </div>

            {/* Heading */}
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', margin: '0 0 6px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Welcome back
            </h1>
            <p style={{ fontSize: 14, color: '#64748B', margin: '0 0 28px', lineHeight: 1.5 }}>
              Sign in to your care management dashboard.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <Field
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={v => handleChange('email', v)}
                onBlur={() => handleBlur('email')}
                error={touched.email ? errors.email : ''}
                placeholder="admin@clinicname.com"
              />

              <Field
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={v => handleChange('password', v)}
                onBlur={() => handleBlur('password')}
                error={touched.password ? errors.password : ''}
                placeholder="••••••••"
                rightAddon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: 0, display: 'flex', alignItems: 'center' }}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                }
              />

              {/* Forgot */}
              <div style={{ textAlign: 'right', marginBottom: 22, marginTop: -8 }}>
                <Link
                  to="/forgot-password"
                  style={{ fontSize: 13, fontWeight: 600, color: '#2563EB', textDecoration: 'none' }}
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  height: 48,
                  background: loading
                    ? '#93C5FD'
                    : 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  border: 'none',
                  borderRadius: 12,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.01em',
                  boxShadow: loading ? 'none' : '0 4px 16px rgba(37,99,235,0.30)',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.35)" strokeWidth="3"/>
                      <path d="M12 2 A10 10 0 0 1 22 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Signing in…
                  </>
                ) : 'Sign In'}
              </button>

              {/* Spinner keyframe */}
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </form>

            {/* Legal */}
            <p style={{ marginTop: 20, fontSize: 12, color: '#94A3B8', textAlign: 'center', lineHeight: 1.6 }}>
              By signing in, you agree to our{' '}
              <a href="#" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>
              {' '}&amp;{' '}
              <a href="#" style={{ color: '#2563EB', textDecoration: 'none', fontWeight: 500 }}>Terms of Service</a>
            </p>
          </div>

          {/* Footer */}
          <p style={{ marginTop: 20, fontSize: 12, color: '#94A3B8', textAlign: 'center' }}>
            © {new Date().getFullYear()} Health Telematix. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
