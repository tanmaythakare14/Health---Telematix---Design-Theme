export default function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error = '',
  placeholder = '',
  autoComplete,
  rightAddon,
}) {
  const inputClasses = [
    'auth-input',
    error ? 'auth-input--error' : '',
    rightAddon ? 'auth-input--has-addon' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="auth-field">
      <label htmlFor={id} className="auth-label">
        {label}
      </label>

      <div className="auth-input-wrapper">
        <input
          id={id}
          type={type}
          className={inputClasses}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? 'true' : undefined}
        />
        {rightAddon && rightAddon}
      </div>

      {error && (
        <span id={`${id}-error`} role="alert" className="auth-error-msg">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="#DC2626" strokeWidth="1.5" />
            <path d="M8 5v3.5" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="11" r="0.75" fill="#DC2626" />
          </svg>
          {error}
        </span>
      )}
    </div>
  )
}
