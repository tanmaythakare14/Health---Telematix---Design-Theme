/* ----------------------------------------------------------------
   IllustrationPanel — Left dark panel
   Pure presentational, no state, all data hardcoded
   ---------------------------------------------------------------- */

const STATS = [
  { label: 'Active Patients', value: '2,841', delta: '+12 today', up: true },
  { label: 'RPM Alerts', value: '47', delta: '3 critical', alert: true },
  { label: 'Enrollments', value: '318', delta: '+28 MTD', up: true },
  { label: 'Compliance', value: '94.2%', delta: '+1.8%', up: true },
]

const PATIENTS = [
  { initials: 'JM', name: 'James Mitchell', condition: 'Hypertension', badge: 'rpm', avatarClass: 'auth-avatar--blue' },
  { initials: 'SR', name: 'Sarah Reynolds', condition: 'Type II Diabetes', badge: 'alert', avatarClass: 'auth-avatar--amber' },
  { initials: 'PK', name: 'Patricia Kim', condition: 'Heart Failure', badge: 'ok', avatarClass: 'auth-avatar--teal' },
  { initials: 'AT', name: 'Alan Torres', condition: 'Atrial Fibrillation', badge: 'rpm', avatarClass: 'auth-avatar--navy' },
]

// BP Trend line chart points (x,y in 260x80 viewBox)
const LINE_POINTS = '0,65 30,60 60,55 90,58 120,50 150,47 180,51 210,44 260,41'
const AREA_POINTS = `${LINE_POINTS} 260,80 0,80`

// Weekly enrollment bar heights (out of 70)
const BAR_HEIGHTS = [38, 55, 30, 64, 48, 60, 44]
const BAR_WIDTH = 10
const BAR_GAP = 7
const BAR_BOTTOM = 70

function StatCard({ label, value, delta, up, alert: isAlert }) {
  return (
    <div className="auth-stat-card">
      <span className="auth-stat-card__label">{label}</span>
      <span className="auth-stat-card__value">{value}</span>
      <span className={`auth-stat-card__delta ${isAlert ? 'auth-stat-card__delta--alert' : 'auth-stat-card__delta--up'}`}>
        {up && (
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 8V2M2 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {delta}
      </span>
    </div>
  )
}

function LineChartCard() {
  return (
    <div className="auth-chart-card">
      <div className="auth-chart-card__title">BP Trend — 30 Days</div>
      <svg viewBox="0 0 260 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F8EF7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4F8EF7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[20, 40, 60].map((y) => (
          <line key={y} x1="0" y1={y} x2="260" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}
        {/* Area fill */}
        <polygon points={AREA_POINTS} fill="url(#lineGrad)" />
        {/* Line */}
        <polyline
          points={LINE_POINTS}
          stroke="#4F8EF7"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Data point dots */}
        {LINE_POINTS.split(' ').map((pt, i) => {
          const [x, y] = pt.split(',').map(Number)
          return <circle key={i} cx={x} cy={y} r="3" fill="#4F8EF7" />
        })}
      </svg>
    </div>
  )
}

function BarChartCard() {
  const totalW = BAR_HEIGHTS.length * (BAR_WIDTH + BAR_GAP) - BAR_GAP
  const maxH = Math.max(...BAR_HEIGHTS)

  return (
    <div className="auth-chart-card">
      <div className="auth-chart-card__title">Enrollments</div>
      <svg viewBox={`0 0 ${totalW} 80`} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {BAR_HEIGHTS.map((h, i) => {
          const x = i * (BAR_WIDTH + BAR_GAP)
          const isMax = h === maxH
          return (
            <rect
              key={i}
              x={x}
              y={BAR_BOTTOM - h}
              width={BAR_WIDTH}
              height={h}
              rx="3"
              fill={isMax ? '#4F8EF7' : 'rgba(79,142,247,0.50)'}
            />
          )
        })}
      </svg>
    </div>
  )
}

function PatientListCard() {
  return (
    <div className="auth-patients">
      <div className="auth-patients__title">Recent Patients</div>
      {PATIENTS.map((p) => (
        <div key={p.initials} className="auth-patient-row">
          <div className={`auth-avatar ${p.avatarClass}`}>{p.initials}</div>
          <div className="auth-patient-info">
            <div className="auth-patient-info__name">{p.name}</div>
            <div className="auth-patient-info__condition">{p.condition}</div>
          </div>
          <span className={`auth-badge auth-badge--${p.badge}`}>
            {p.badge === 'rpm' ? 'RPM' : p.badge === 'alert' ? 'Alert' : 'OK'}
          </span>
        </div>
      ))}
    </div>
  )
}

// Heartbeat / EKG logo icon
function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="rgba(79,142,247,0.18)" />
      <path
        d="M4 14h4l2-6 3 12 2-8 2 4h7"
        stroke="#4F8EF7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default function IllustrationPanel() {
  return (
    <div className="auth-left">
      {/* Logo only at top */}
      <div className="auth-left__logo">
        <LogoIcon />
        Health Telematix
      </div>

      {/* Dashboard illustration */}
      <div className="auth-illustration">
        <div className="auth-dash">
          {/* Stat cards */}
          <div className="auth-dash__stats">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Charts */}
          <div className="auth-dash__charts">
            <LineChartCard />
            <BarChartCard />
          </div>

          {/* Patient list */}
          <PatientListCard />
        </div>
      </div>

      {/* Branding text — below illustration, center aligned */}
      <div className="auth-left__brand">
        <h1 className="auth-left__tagline">Smarter Care,<br />Better Outcomes.</h1>
        <p className="auth-left__sub">
          HIPAA-compliant RPM and care management — built for value-based chronic disease programs.
        </p>
      </div>
    </div>
  )
}
