import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail, validatePassword } from '../../utils/authValidation'

/* ─── Break out of #root width constraint ─────────────────────── */
function useAuthRoot() {
  useEffect(() => {
    const root = document.getElementById('root')
    root?.classList.add('auth-root')
    return () => root?.classList.remove('auth-root')
  }, [])
}

/* ─── Eye Toggle ───────────────────────────────────────────────── */
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

/* ─── Right Panel Illustration (teal panel art) ────────────────── */
function PanelIllustration() {
  return (
    <svg width="340" height="320" viewBox="0 0 340 320" fill="none">
      {/* Central monitor / device */}
      <rect x="100" y="80" width="140" height="100" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>
      {/* Screen content */}
      <rect x="112" y="92" width="116" height="76" rx="5" fill="rgba(255,255,255,0.08)"/>
      {/* EKG line on screen */}
      <path d="M116 130 L132 130 L138 110 L146 150 L152 118 L158 130 L224 130"
            stroke="rgba(255,255,255,0.70)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Monitor stand */}
      <line x1="170" y1="180" x2="170" y2="210" stroke="rgba(255,255,255,0.20)" strokeWidth="3"/>
      <rect x="148" y="210" width="44" height="8" rx="4" fill="rgba(255,255,255,0.14)"/>

      {/* Left device — blood pressure cuff */}
      <rect x="36" y="130" width="56" height="78" rx="10" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.20)" strokeWidth="1.8"/>
      <rect x="44" y="144" width="40" height="28" rx="5" fill="rgba(255,255,255,0.08)"/>
      <text x="64" y="163" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="12" fontWeight="700" fontFamily="Inter, sans-serif">120</text>
      <text x="64" y="175" textAnchor="middle" fill="rgba(255,255,255,0.50)" fontSize="8"  fontFamily="Inter, sans-serif">mmHg</text>
      <line x1="92" y1="165" x2="108" y2="153" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

      {/* Right device — weight scale */}
      <rect x="248" y="134" width="56" height="70" rx="10" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.20)" strokeWidth="1.8"/>
      <circle cx="276" cy="162" r="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.20)" strokeWidth="1.5"/>
      <text x="276" y="167" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif">BMI</text>
      <line x1="248" y1="168" x2="232" y2="162" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>

      {/* Stat chips */}
      <rect x="68" y="232" width="74" height="30" rx="15" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
      <text x="105" y="252" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif">98 Patients</text>

      <rect x="152" y="232" width="60" height="30" rx="15" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
      <text x="182" y="252" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif">RPM ✓</text>

      <rect x="222" y="232" width="58" height="30" rx="15" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2"/>
      <text x="251" y="252" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="600" fontFamily="Inter, sans-serif">APCM</text>

      {/* Floating sparkle dots */}
      <circle cx="56"  cy="82"  r="5" fill="rgba(255,255,255,0.18)"/>
      <circle cx="78"  cy="62"  r="3" fill="rgba(255,255,255,0.14)"/>
      <circle cx="282" cy="72"  r="4" fill="rgba(255,255,255,0.16)"/>
      <circle cx="306" cy="96"  r="3" fill="rgba(255,255,255,0.12)"/>
      <circle cx="44"  cy="280" r="4" fill="rgba(255,255,255,0.12)"/>
      <circle cx="296" cy="288" r="5" fill="rgba(255,255,255,0.14)"/>

      {/* Connecting dashed lines between devices and monitor */}
      <path d="M92 170 C100 170 100 170 108 160" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3"/>
      <path d="M248 162 C240 162 240 162 232 162" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3"/>
    </svg>
  )
}

/* ─── Form Field ───────────────────────────────────────────────── */
function Field({ id, label, type = 'text', value, onChange, onBlur, error, placeholder, rightAddon }) {
  const [focused, setFocused] = useState(false)

  const borderColor = error
    ? '#EF4444'
    : focused
      ? '#0D9488'
      : '#E2E8F0'

  const shadow = focused && !error ? '0 0 0 4px rgba(13,148,136,0.12)' : 'none'

  return (
    <div style={{ marginBottom: error ? 14 : 18 }}>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          fontSize: 13,
          fontWeight: 600,
          color: '#374151',
          marginBottom: 7,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
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
            height: 48,
            padding: rightAddon ? '0 44px 0 16px' : '0 16px',
            border: `1.5px solid ${borderColor}`,
            borderRadius: 12,
            fontSize: 14,
            color: '#1E293B',
            background: '#F8FFFE',
            outline: 'none',
            fontFamily: 'Inter, system-ui, sans-serif',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxShadow: shadow,
          }}
        />
        {rightAddon && (
          <div style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)' }}>
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

/* ─── Feature row in right panel ─────────────────────────────── */
function Feature({ icon, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 32, height: 32,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{text}</span>
    </div>
  )
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function SignInV4() {
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
        display: 'flex',
        flexDirection: 'row-reverse',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* ── LEFT — Form panel ── */}
      <div
        style={{
          flex: '0 0 48%',
          minHeight: '100vh',
          background: '#FAFAF9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 56px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Subtle teal top border */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #0D9488, #059669)',
        }} />

        <div style={{ width: '100%', maxWidth: 400 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
            <svg width="34" height="34" viewBox="0 0 26 26" fill="none">
              <rect width="26" height="26" rx="7" fill="#0D9488"/>
              <path d="M3 13h4l2-5.5 2.5 11 2-7.5 1.5 3.5H23"
                    stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', letterSpacing: '-0.01em' }}>
              Health Telematix
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 28,
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 8px',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
          }}>
            Welcome back 👋
          </h1>
          <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 32px', lineHeight: 1.6 }}>
            Sign in to manage your care programs and patient health data.
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
            <div style={{ textAlign: 'right', marginBottom: 24, marginTop: -8 }}>
              <Link
                to="/forgot-password"
                style={{ fontSize: 13, fontWeight: 600, color: '#0D9488', textDecoration: 'none' }}
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
                height: 50,
                background: loading ? '#5EADA7' : '#0D9488',
                border: 'none',
                borderRadius: 12,
                color: 'white',
                fontSize: 15,
                fontWeight: 700,
                fontFamily: 'Inter, system-ui, sans-serif',
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.01em',
                boxShadow: loading ? 'none' : '0 4px 16px rgba(13,148,136,0.28)',
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
              ) : 'Sign In to Dashboard'}
            </button>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </form>

          {/* Legal */}
          <p style={{ marginTop: 24, fontSize: 12, color: '#9CA3AF', textAlign: 'center', lineHeight: 1.6 }}>
            By signing in, you agree to our{' '}
            <a href="#" style={{ color: '#0D9488', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>
            {' '}&amp;{' '}
            <a href="#" style={{ color: '#0D9488', textDecoration: 'none', fontWeight: 500 }}>Terms of Service</a>
          </p>

          {/* Footer */}
          <p style={{ marginTop: 32, fontSize: 12, color: '#D1D5DB', textAlign: 'center' }}>
            © {new Date().getFullYear()} Health Telematix. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── RIGHT — Teal illustration panel ── */}
      <div
        style={{
          flex: 1,
          minHeight: '100vh',
          background: 'linear-gradient(145deg, #0D9488 0%, #0F766E 40%, #059669 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '56px 48px',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern circles */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 320, height: 320,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60,
          width: 240, height: 240,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '55%', right: -40,
          width: 160, height: 160,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          pointerEvents: 'none',
        }} />

        {/* Content — left-aligned column, 40px gap between all sections */}
        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 400,
          display: 'flex', flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 40,
        }}>

          {/* Illustration */}
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <PanelIllustration />
          </div>

          {/* Headline + subheading */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
            <h2 style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              textAlign: 'left',
            }}>
              Unified Care Management Platform
            </h2>
            <p style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.70)',
              margin: 0,
              lineHeight: 1.65,
              textAlign: 'left',
            }}>
              Monitor RPM devices, manage APCM care programs, and coordinate your clinical team — all in one place.
            </p>
          </div>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', width: '100%' }}>
            <Feature
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              }
              text="Real-time RPM device monitoring & alerts"
            />
            <Feature
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              }
              text="Multi-clinic & care team management"
            />
            <Feature
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              }
              text="APCM & RPM billing-ready monthly reports"
            />
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            {['HIPAA Compliant', 'FHIR R4', 'SOC 2 Type II'].map(label => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.20)',
                borderRadius: 999,
                padding: '5px 14px',
                fontSize: 11, fontWeight: 600,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '0.03em',
              }}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
