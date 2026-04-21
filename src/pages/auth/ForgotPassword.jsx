import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import { Button } from '../../components/ui/Button'
import InputField from '../../components/ui/InputField'
import { validateEmail } from '../../utils/authValidation'

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

function ArrowLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="1.75" />
      <path d="M7.5 12l3 3 6-6" stroke="#10B981" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleBlur() {
    setTouched(true)
    setError(validateEmail(email))
  }

  function handleChange(value) {
    setEmail(value)
    if (touched) setError(validateEmail(value))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    const err = validateEmail(email)
    setError(err)
    if (err) return

    setLoading(true)
    setTimeout(() => {
      console.log('Reset link sent to:', email)
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <AuthLayout>
      <div className="auth-form-container">
        {/* Wordmark */}
        <div className="auth-wordmark">
          <WordmarkIcon />
          Health Telematix
        </div>

        {/* Back link */}
        <Link to="/" className="auth-back-link">
          <ArrowLeftIcon />
          Back to Sign In
        </Link>

        {/* Heading */}
        <h1 className="auth-heading">Reset Password</h1>

        {submitted ? (
          /* ── Success State ── */
          <>
            <div className="auth-success-box">
              <div className="auth-success-box__icon">
                <CheckCircleIcon />
              </div>
              <p className="auth-success-box__title">Check your inbox</p>
              <p className="auth-success-box__body">
                A password reset link has been sent to{' '}
                <strong>{email}</strong>. It expires in 30 minutes.
              </p>
            </div>

            <Link to="/" className="auth-back-link" style={{ marginTop: '8px' }}>
              <ArrowLeftIcon />
              Back to Sign In
            </Link>
          </>
        ) : (
          /* ── Form State ── */
          <>
            <p className="auth-fp-desc">
              Enter your admin email address and we&apos;ll send you a secure link to reset your password.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <InputField
                id="reset-email"
                label="Email Address"
                type="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched ? error : ''}
                placeholder="admin@clinicname.com"
                autoComplete="email"
              />

              <Button type="submit" disabled={loading} className="w-full rounded-full h-12 text-sm font-semibold" style={{ background: '#1F3A5F' }}>
                {loading ? 'Sending link…' : 'Send Reset Link'}
              </Button>
            </form>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="auth-footer">
        &copy; {new Date().getFullYear()} Health Telematix. All rights reserved.
      </div>
    </AuthLayout>
  )
}
