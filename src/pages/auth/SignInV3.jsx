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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M1 12C1 12 5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Z"
            stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M10.73 10.73a3 3 0 0 0 4.24 4.24"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="1" y1="1" x2="23" y2="23"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

/* ─── Form Field ───────────────────────────────────────────────── */
function Field({ id, label, type = 'text', value, onChange, onBlur, error, placeholder, rightAddon }) {
  const [focused, setFocused] = useState(false)

  const borderColor = error ? '#EF4444' : focused ? '#0D9488' : '#E2E8F0'
  const shadow      = focused && !error ? '0 0 0 3px rgba(13,148,136,0.14)' : 'none'

  return (
    <div style={{ marginBottom: error ? 12 : 20 }}>
      <label
        htmlFor={id}
        style={{
          display: 'block', fontSize: 13.5, fontWeight: 600,
          color: '#374151', marginBottom: 7,
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
            width: '100%', height: 50,
            padding: rightAddon ? '0 48px 0 16px' : '0 16px',
            border: `1.5px solid ${borderColor}`,
            borderRadius: 10, fontSize: 15,
            color: '#111827', background: '#FAFAFA',
            outline: 'none', fontFamily: 'Inter, system-ui, sans-serif',
            boxSizing: 'border-box',
            transition: 'border-color 0.18s, box-shadow 0.18s',
            boxShadow: shadow,
          }}
        />
        {rightAddon && (
          <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)' }}>
            {rightAddon}
          </div>
        )}
      </div>
      {error && (
        <p style={{ margin: '5px 0 0', fontSize: 12.5, color: '#EF4444', fontFamily: 'Inter, system-ui, sans-serif' }}>
          {error}
        </p>
      )}
    </div>
  )
}

/* ─── Main Component ───────────────────────────────────────────── */
export default function SignInV3() {
  useAuthRoot()
  const navigate = useNavigate()

  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe,   setRememberMe]   = useState(false)
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
    setErrors(p => ({ ...p, [field]: validate({ email, password })[field] }))
  }

  function handleChange(field, val) {
    if (field === 'email')    setEmail(val)
    if (field === 'password') setPassword(val)
    if (touched[field]) {
      const next = { email, password, [field]: val }
      setErrors(p => ({ ...p, [field]: validate(next)[field] }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched({ email: true, password: true })
    const errs = validate({ email, password })
    setErrors(errs)
    if (errs.email || errs.password) return
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 1200)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        fontFamily: 'Inter, system-ui, sans-serif',
        background: '#fff',
      }}
    >

      {/* ════════════════════════════════════════════════
          LEFT — 60% · Form panel (centered card)
      ════════════════════════════════════════════════ */}
      <div
        style={{
          flex: '0 0 50%',
          minHeight: '100vh',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 40px',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {/* Centered form card — max-width keeps it from stretching */}
        <div style={{ width: '100%', maxWidth: 440 }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
            <svg width="36" height="36" viewBox="0 0 26 26" fill="none">
              <rect width="26" height="26" rx="7" fill="#0D9488"/>
              <path d="M3 13h4l2-5.5 2.5 11 2-7.5 1.5 3.5H23"
                    stroke="white" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Health Telematix
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 30, fontWeight: 800, color: '#0F172A',
            margin: '0 0 8px', letterSpacing: '-0.03em', lineHeight: 1.15,
          }}>
            Welcome to<br />Health Telematix
          </h1>
          <p style={{ fontSize: 15, color: '#6B7280', margin: '0 0 32px', lineHeight: 1.6 }}>
            Your unified care management &amp; RPM platform.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <Field
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={v => handleChange('email', v)}
              onBlur={() => handleBlur('email')}
              error={touched.email ? errors.email : ''}
              placeholder="Enter your email address"
            />

            <Field
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={v => handleChange('password', v)}
              onBlur={() => handleBlur('password')}
              error={touched.password ? errors.password : ''}
              placeholder="Enter your password"
              rightAddon={
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: 0, display: 'flex', alignItems: 'center' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showPassword} />
                </button>
              }
            />

            {/* Remember me + Forgot password */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 28, marginTop: -6,
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }}>
                <div
                  onClick={() => setRememberMe(v => !v)}
                  style={{
                    width: 36, height: 20, borderRadius: 999,
                    background: rememberMe ? '#0D9488' : '#D1D5DB',
                    position: 'relative', cursor: 'pointer',
                    transition: 'background 0.2s', flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 2,
                    left: rememberMe ? 18 : 2,
                    width: 16, height: 16, borderRadius: '50%',
                    background: 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.20)',
                    transition: 'left 0.2s',
                  }} />
                </div>
                <span style={{ fontSize: 13.5, color: '#4B5563', fontWeight: 500 }}>Remember me</span>
              </label>

              <Link
                to="/forgot-password"
                style={{ fontSize: 13.5, fontWeight: 600, color: '#0D9488', textDecoration: 'none' }}
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit — Teal CTA */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', height: 52,
                background: loading ? '#5EADA7' : '#0D9488',
                border: 'none', borderRadius: 999,
                color: 'white', fontSize: 16, fontWeight: 700,
                fontFamily: 'Inter, system-ui, sans-serif',
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.01em',
                transition: 'all 0.2s ease',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: loading ? 'none' : '0 4px 16px rgba(13,148,136,0.32)',
              }}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.30)" strokeWidth="3"/>
                    <path d="M12 2 A10 10 0 0 1 22 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Signing in…
                </>
              ) : 'Log in'}
            </button>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </form>

          {/* Legal */}
          <p style={{ marginTop: 24, fontSize: 12.5, color: '#9CA3AF', textAlign: 'center', lineHeight: 1.6 }}>
            By signing in, you agree to our{' '}
            <a href="#" style={{ color: '#0D9488', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>
            {' '}&amp;{' '}
            <a href="#" style={{ color: '#0D9488', textDecoration: 'none', fontWeight: 600 }}>Terms of Service</a>
          </p>

          {/* Footer */}
          <p style={{ marginTop: 32, fontSize: 12, color: '#D1D5DB', textAlign: 'center' }}>
            © {new Date().getFullYear()} Health Telematix. All rights reserved.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          RIGHT — 40% · Real photo with black overlay
      ════════════════════════════════════════════════ */}
      <div
        style={{
          flex: '0 0 50%',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
        }}
      >
        {/* Real healthcare photo */}
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85"
          alt="Healthcare professional"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
          }}
        />

        {/* Black gradient overlay — strong at top & bottom, lets image breathe in middle */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.30) 48%, rgba(0,0,0,0.72) 100%)',
        }} />

        {/* Very subtle teal color wash — just a hint, not overwhelming */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(13,148,136,0.06)',
        }} />

        {/* ── Overlay content ── */}
        <div
          style={{
            position: 'absolute', inset: 0, zIndex: 1,
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '48px 36px 44px',
          }}
        >
          {/* TOP — Heading & subheading */}
          <div>
            {/* Pill tag */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.22)',
              borderRadius: 999, padding: '5px 14px',
              marginBottom: 22, backdropFilter: 'blur(8px)',
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#34D399' }} />
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: 'rgba(255,255,255,0.88)',
                letterSpacing: '0.07em', textTransform: 'uppercase',
              }}>
                Care Platform
              </span>
            </div>

            {/* Main heading — large for elderly readability */}
            <h2 style={{
              fontSize: 36, fontWeight: 900,
              color: '#FFFFFF', margin: '0 0 14px',
              lineHeight: 1.15, letterSpacing: '-0.025em',
              textShadow: '0 2px 12px rgba(0,0,0,0.50)',
            }}>
              Smarter Care<br/>Starts Here.
            </h2>

            {/* Subheading */}
            <p style={{
              fontSize: 15.5, color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.65, margin: 0,
              textShadow: '0 1px 6px rgba(0,0,0,0.45)',
              fontWeight: 400,
            }}>
              Monitor patient vitals in real time, manage APCM &amp; RPM programs, and keep your clinical team coordinated.
            </p>

            {/* Teal accent line */}
            <div style={{
              width: 48, height: 3,
              background: '#0D9488',
              borderRadius: 999, margin: '22px 0',
            }} />

            {/* Key stats */}
            <div style={{ display: 'flex', gap: 24 }}>
              {[
                { num: '15+',    label: 'Clinics'      },
                { num: '2,400+', label: 'Patients'     },
                { num: '98%',    label: 'RPM Uptime'   },
              ].map(s => (
                <div key={s.num}>
                  <div style={{
                    fontSize: 26, fontWeight: 800, color: '#FFFFFF',
                    lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.40)',
                  }}>
                    {s.num}
                  </div>
                  <div style={{
                    fontSize: 11.5, color: 'rgba(255,255,255,0.65)',
                    marginTop: 4, fontWeight: 500, letterSpacing: '0.02em',
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM — Trust badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: '🔒', label: 'HIPAA Compliant'    },
              { icon: '⚡', label: 'FHIR R4 Ready'      },
              { icon: '✅', label: 'SOC 2 Type II'       },
              { icon: '🔐', label: '256-bit Encryption'  },
            ].map(b => (
              <div
                key={b.label}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.14)',
                  borderRadius: 10, padding: '9px 14px',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <span style={{ fontSize: 14 }}>{b.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
