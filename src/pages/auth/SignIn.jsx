import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import { Button } from '../../components/ui/Button'
import InputField from '../../components/ui/InputField'
import { validateEmail, validatePassword } from '../../utils/authValidation'

// ── Inline SVG icons (defined outside component to avoid re-creation) ──

function WordmarkIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <rect width="26" height="26" rx="7" fill="#1F3A5F" />
      <path
        d="M3 13h4l2-5.5 2.5 11 2-7.5 1.5 3.5H23"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1 12C1 12 5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M10.73 10.73a3 3 0 0 0 4.24 4.24" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

// ── Validation ──
function validate({ email, password }) {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
  }
}

// ── Main Component ──
export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState({ email: false, password: false })
  const [loading, setLoading] = useState(false)

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const errs = validate({ email, password })
    setErrors((prev) => ({ ...prev, [field]: errs[field] }))
  }

  function handleChange(field, value) {
    if (field === 'email') setEmail(value)
    if (field === 'password') setPassword(value)

    if (touched[field]) {
      const newVals = { email, password, [field]: value }
      const errs = validate(newVals)
      setErrors((prev) => ({ ...prev, [field]: errs[field] }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Mark all fields as touched
    setTouched({ email: true, password: true })
    const errs = validate({ email, password })
    setErrors(errs)
    if (errs.email || errs.password) return

    setLoading(true)
    // Simulated async sign-in
    setTimeout(() => {
      setLoading(false)
      navigate('/clinic-management')
    }, 1200)
  }

  const passwordToggle = (
    <button
      type="button"
      className="auth-toggle-btn"
      onClick={() => setShowPassword((s) => !s)}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      <EyeIcon open={showPassword} />
    </button>
  )

  return (
    <AuthLayout>
      <div className="auth-form-container">
        {/* Wordmark */}
        <div className="auth-wordmark">
          <WordmarkIcon />
          Health Telematix
        </div>

        {/* Heading */}
        <h1 className="auth-heading">Sign In</h1>
        <p className="auth-subheading">Enter your credentials to access your care management dashboard.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <InputField
            id="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(v) => handleChange('email', v)}
            onBlur={() => handleBlur('email')}
            error={touched.email ? errors.email : ''}
            placeholder="admin@clinicname.com"
            autoComplete="email"
          />

          <InputField
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(v) => handleChange('password', v)}
            onBlur={() => handleBlur('password')}
            error={touched.password ? errors.password : ''}
            placeholder="••••••••"
            autoComplete="current-password"
            rightAddon={passwordToggle}
          />

          {/* Forgot Password */}
          <div className="auth-forgot">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={loading} className="w-full rounded-full h-12 text-sm font-semibold" style={{ background: '#1F3A5F' }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>

        {/* Legal */}
        <p className="auth-legal">
          By signing in, you agree to our{' '}
          <a href="#">Privacy Policy</a>
          {' '}&amp;{' '}
          <a href="#">Terms of Service</a>
        </p>
      </div>

      {/* Footer */}
      <div className="auth-footer">
        &copy; {new Date().getFullYear()} Health Telematix. All rights reserved.
      </div>
    </AuthLayout>
  )
}
