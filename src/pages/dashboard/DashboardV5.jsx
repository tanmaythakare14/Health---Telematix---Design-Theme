import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell, ChevronDown,
  TrendingUp, TrendingDown,
  Users, UserPlus, UserMinus, Activity, DollarSign, Percent,
} from 'lucide-react'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, PieChart, Pie, Cell,
} from 'recharts'
import { ALL_CLINICS } from '../../data/clinics'
import { Card, CardContent } from '@/components/ui/card'
import SidebarV5, { NAV_W, COLLAPSED_W } from '../../components/layout/SidebarV5'

/* ─── Design tokens ─────────────────────────────────────────── */
const TEAL      = '#0D9488'
const NAVY      = '#1F3A5F'
const GRADIENT  = 'linear-gradient(135deg, #1F3A5F 0%, #0D9488 100%)'
const PAGE_BG   = '#FAFAF9'
const FF        = 'Inter, system-ui, sans-serif'

/* ─── Chart data ─────────────────────────────────────────────── */

function genDays(count, baseApcm, baseRpm) {
  return Array.from({ length: count }, (_, i) => ({
    label: String(i + 1),
    apcm: Math.round(baseApcm * (1 + Math.sin(i * 0.85 + 1.2) * 0.14 + Math.sin(i * 0.28) * 0.07)),
    rpm:  Math.round(baseRpm  * (1 + Math.sin(i * 0.85 + 2.5) * 0.14 + Math.sin(i * 0.28 + 1) * 0.07)),
  }))
}

const MONTHLY_DATA = {
  Jan: genDays(31, 920,  400),
  Feb: genDays(28, 1040, 450),
  Mar: genDays(31, 990,  428),
  Apr: genDays(30, 1120, 484),
  May: genDays(31, 1200, 520),
  Jun: genDays(30, 1290, 558),
  Jul: genDays(31, 1230, 528),
  Aug: genDays(31, 1340, 578),
  Sep: genDays(30, 1420, 608),
  Oct: genDays(31, 1468, 635),
  Nov: genDays(30, 1548, 674),
  Dec: genDays(31, 1636, 724),
}

const QUARTERLY_DATA = {
  Q1: [
    { label: 'Jan', apcm: 28400, rpm: 12300 },
    { label: 'Feb', apcm: 31200, rpm: 13100 },
    { label: 'Mar', apcm: 29800, rpm: 12800 },
  ],
  Q2: [
    { label: 'Apr', apcm: 33500, rpm: 14200 },
    { label: 'May', apcm: 36200, rpm: 15600 },
    { label: 'Jun', apcm: 38900, rpm: 16800 },
  ],
  Q3: [
    { label: 'Jul', apcm: 37100, rpm: 15900 },
    { label: 'Aug', apcm: 40300, rpm: 17400 },
    { label: 'Sep', apcm: 42800, rpm: 18200 },
  ],
  Q4: [
    { label: 'Oct', apcm: 44100, rpm: 19100 },
    { label: 'Nov', apcm: 46500, rpm: 20300 },
    { label: 'Dec', apcm: 49200, rpm: 21800 },
  ],
}

const YEARLY_DATA = {
  2024: [
    { label: 'Jan', apcm: 22000, rpm: 9500  },
    { label: 'Feb', apcm: 24500, rpm: 10200 },
    { label: 'Mar', apcm: 23200, rpm: 9900  },
    { label: 'Apr', apcm: 26800, rpm: 11300 },
    { label: 'May', apcm: 28900, rpm: 12400 },
    { label: 'Jun', apcm: 31100, rpm: 13300 },
    { label: 'Jul', apcm: 29700, rpm: 12700 },
    { label: 'Aug', apcm: 32200, rpm: 13900 },
    { label: 'Sep', apcm: 34200, rpm: 14600 },
    { label: 'Oct', apcm: 35300, rpm: 15300 },
    { label: 'Nov', apcm: 37200, rpm: 16200 },
    { label: 'Dec', apcm: 39400, rpm: 17400 },
  ],
  2025: [
    { label: 'Jan', apcm: 28400, rpm: 12300 },
    { label: 'Feb', apcm: 31200, rpm: 13100 },
    { label: 'Mar', apcm: 29800, rpm: 12800 },
    { label: 'Apr', apcm: 33500, rpm: 14200 },
    { label: 'May', apcm: 36200, rpm: 15600 },
    { label: 'Jun', apcm: 38900, rpm: 16800 },
    { label: 'Jul', apcm: 37100, rpm: 15900 },
    { label: 'Aug', apcm: 40300, rpm: 17400 },
    { label: 'Sep', apcm: 42800, rpm: 18200 },
    { label: 'Oct', apcm: 44100, rpm: 19100 },
    { label: 'Nov', apcm: 46500, rpm: 20300 },
    { label: 'Dec', apcm: 49200, rpm: 21800 },
  ],
  2026: [
    { label: 'Jan', apcm: 34200, rpm: 14500 },
    { label: 'Feb', apcm: 37100, rpm: 15800 },
    { label: 'Mar', apcm: 35600, rpm: 15100 },
    { label: 'Apr', apcm: 40100, rpm: 17000 },
    { label: 'May', apcm: 43300, rpm: 18600 },
    { label: 'Jun', apcm: 46600, rpm: 20100 },
    { label: 'Jul', apcm: 44500, rpm: 19000 },
    { label: 'Aug', apcm: 48300, rpm: 20800 },
    { label: 'Sep', apcm: 51300, rpm: 21800 },
    { label: 'Oct', apcm: 52900, rpm: 22900 },
    { label: 'Nov', apcm: 55800, rpm: 24300 },
    { label: 'Dec', apcm: 59000, rpm: 26100 },
  ],
}

const SECONDARY_OPTIONS = {
  Monthly:   ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  Quarterly: ['Q1','Q2','Q3','Q4'],
  Yearly:    ['2024','2025','2026'],
}
const SECONDARY_DEFAULTS = { Monthly: 'Apr', Quarterly: 'Q2', Yearly: '2026' }

const CPT_CARDS = [
  { code: 'G0557', desc: 'APCM — Complex Chronic (2+ conditions, high risk)', patients: 612, revenue: 30600 },
  { code: 'G0556', desc: 'APCM — Standard (any Medicare, 1+ condition)',       patients: 235, revenue: 3525  },
  { code: '99454', desc: 'RPM Device Supply — 16+ days data/month',            patients: 398, revenue: 15124 },
  { code: '99457', desc: 'RPM Treatment Management — 20+ min/month',           patients: 287, revenue: 9869  },
]

const PATIENT_ROWS = [
  { name: 'Margaret Johnson',  age: 68, condition: 'Hypertension',       apcm: 1, rpm: 1, apcmRev: 50,  rpmRev: 38,  total: 88  },
  { name: 'Robert Chen',       age: 72, condition: 'Type II Diabetes',   apcm: 1, rpm: 1, apcmRev: 117, rpmRev: 38,  total: 155 },
  { name: 'Dorothy Williams',  age: 65, condition: 'Heart Failure',      apcm: 1, rpm: 1, apcmRev: 50,  rpmRev: 38,  total: 88  },
  { name: 'James Patterson',   age: 79, condition: 'Atrial Fibrillation',apcm: 1, rpm: 0, apcmRev: 117, rpmRev: 0,   total: 117 },
  { name: 'Susan Martinez',    age: 61, condition: 'Obesity',            apcm: 1, rpm: 1, apcmRev: 15,  rpmRev: 38,  total: 53  },
  { name: 'Harold Thompson',   age: 74, condition: 'Hypertension',       apcm: 1, rpm: 1, apcmRev: 50,  rpmRev: 38,  total: 88  },
  { name: 'Carol Anderson',    age: 67, condition: 'Type II Diabetes',   apcm: 1, rpm: 1, apcmRev: 117, rpmRev: 38,  total: 155 },
  { name: 'Walter Robinson',   age: 83, condition: 'Heart Failure',      apcm: 1, rpm: 0, apcmRev: 50,  rpmRev: 0,   total: 50  },
]

/* ─── Top Bar ────────────────────────────────────────────────── */
function TopBar() {
  return (
    <div style={{ height: 80, background: '#ffffff', borderBottom: '1px solid #E8EDF2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 30 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h1 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: FF, letterSpacing: '-0.01em', lineHeight: 1.2 }}>Dashboard</h1>
        <p style={{ fontSize: 12.5, color: '#94A3B8', margin: 0, fontFamily: FF, lineHeight: 1.3 }}>Overview of clinic performance, enrollment metrics and billing</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ position: 'relative', width: 38, height: 38, borderRadius: 9, border: '1px solid #E2E8F0', background: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
          <Bell size={17} />
          <span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', border: '1.5px solid white' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 8px', borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #2a4f82, #1F3A5F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>SM</div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: '#0F172A', margin: 0, fontFamily: FF, lineHeight: 1.2 }}>Dr. Sarah Mitchell</p>
            <p style={{ fontSize: 10.5, color: '#94A3B8', margin: 0, fontFamily: FF, lineHeight: 1.3 }}>admin@healthtelematix.com</p>
          </div>
          <ChevronDown size={13} style={{ color: '#CBD5E1', flexShrink: 0 }} />
        </div>
      </div>
    </div>
  )
}

/* ─── Pill Button ────────────────────────────────────────────── */
function Pill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 13px', borderRadius: 999, border: 'none', cursor: 'pointer',
      background: active ? GRADIENT : 'transparent',
      color: active ? '#fff' : '#64748B',
      fontSize: 12, fontWeight: active ? 600 : 500,
      fontFamily: FF,
      transition: 'all 0.15s ease',
    }}>{label}</button>
  )
}

/* ─── KPI Card ───────────────────────────────────────────────── */
function KpiCard({ icon, label, subLabel, value, trendUp, trendText }) {
  return (
    <div style={{
      background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: 14,
      padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1, minWidth: 0, paddingRight: 10 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', margin: '0 0 3px', fontFamily: FF, lineHeight: 1.3 }}>{label}</p>
          <p style={{ fontSize: 11.5, color: '#94A3B8', margin: 0, fontFamily: FF, lineHeight: 1.4 }}>{subLabel}</p>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: '#ffffff', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: NAVY, flexShrink: 0 }}>
          {icon}
        </div>
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', fontFamily: FF, lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontSize: 11.5, fontWeight: 600, padding: '3px 8px', borderRadius: 999,
          background: trendUp ? 'rgba(16,185,129,0.10)' : 'rgba(239,68,68,0.10)',
          color: trendUp ? '#059669' : '#DC2626',
        }}>
          {trendUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {trendText}
        </span>
        <span style={{ fontSize: 11.5, color: '#94A3B8', fontFamily: FF }}>vs last year</span>
      </div>
    </div>
  )
}

/* ─── Custom Tooltip for line chart ─────────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: '#1E293B', borderRadius: 10, padding: '10px 14px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.20)', fontFamily: FF }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ fontSize: 13, fontWeight: 600, color: entry.color, margin: '2px 0' }}>
          {entry.name}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

/* ─── Custom Tooltip for pie chart ──────────────────────────── */
function PieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div style={{ background: '#1E293B', borderRadius: 10, padding: '10px 14px', fontFamily: FF }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: d.payload.color || '#fff', margin: 0 }}>{d.name}</p>
      <p style={{ fontSize: 12, color: '#CBD5E1', margin: '3px 0 0' }}>${d.value.toLocaleString()}</p>
    </div>
  )
}

/* ─── Context Selector Dropdown ──────────────────────────────── */
function SelectFilter({ options, value, onChange }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '5px 11px', borderRadius: 8,
          border: `1.5px solid rgba(31,58,95,0.20)`,
          background: open ? 'rgba(31,58,95,0.04)' : '#ffffff',
          color: NAVY, fontSize: 12.5, fontWeight: 600,
          cursor: 'pointer', fontFamily: FF,
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(31,58,95,0.04)' }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = '#ffffff' }}
      >
        {value}
        <ChevronDown size={12} style={{ transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>
      {open && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => setOpen(false)} />
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            background: '#ffffff', borderRadius: 10,
            border: '1px solid #E2E8F0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
            zIndex: 100, overflow: 'hidden', minWidth: 90,
            fontFamily: FF,
          }}>
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false) }}
                style={{
                  width: '100%', padding: '8px 14px',
                  background: opt === value ? 'rgba(31,58,95,0.06)' : 'none',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  fontSize: 13, fontWeight: opt === value ? 600 : 400,
                  color: opt === value ? NAVY : '#374151',
                  fontFamily: FF,
                }}
                onMouseEnter={e => { if (opt !== value) e.currentTarget.style.background = '#F8FAFC' }}
                onMouseLeave={e => { if (opt !== value) e.currentTarget.style.background = 'none' }}
              >
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function DashboardV5() {
  const [navCollapsed, setNavCollapsed] = useState(false)
  const [period,       setPeriod]       = useState('Monthly')
  const [selection,    setSelection]    = useState('Apr')

  function handlePeriodChange(p) {
    setPeriod(p)
    setSelection(SECONDARY_DEFAULTS[p])
  }

  function getChartData() {
    if (period === 'Monthly')   return MONTHLY_DATA[selection]   ?? MONTHLY_DATA.Apr
    if (period === 'Quarterly') return QUARTERLY_DATA[selection] ?? QUARTERLY_DATA.Q1
    return YEARLY_DATA[Number(selection)] ?? YEARLY_DATA[2026]
  }

  const chartData = getChartData()
  const apcmTotal = chartData.reduce((s, d) => s + d.apcm, 0)
  const rpmTotal  = chartData.reduce((s, d) => s + d.rpm,  0)
  const otherTotal = Math.round((apcmTotal + rpmTotal) * 0.075)
  const grandTotal = apcmTotal + rpmTotal + otherTotal

  const pieData = [
    { name: 'APCM Revenue', value: apcmTotal,  color: TEAL     },
    { name: 'RPM Revenue',  value: rpmTotal,   color: '#64748B' },
    { name: 'Other',        value: otherTotal, color: '#CBD5E1' },
  ]

  const fmt$ = n => `$${n.toLocaleString()}`

  const totals = PATIENT_ROWS.reduce(
    (acc, r) => ({ apcm: acc.apcm + r.apcm, rpm: acc.rpm + r.rpm, apcmRev: acc.apcmRev + r.apcmRev, rpmRev: acc.rpmRev + r.rpmRev, total: acc.total + r.total }),
    { apcm: 0, rpm: 0, apcmRev: 0, rpmRev: 0, total: 0 }
  )

  const kpis = [
    { label: 'Total Enrolled Patients',    subLabel: 'Active patients across all programs',       value: '1,284', trendUp: true,  trendText: '↑ 8.2%', icon: <Users size={16} />      },
    { label: 'Total APCM Enrollments',     subLabel: 'Patients enrolled under APCM billing',     value: '847',   trendUp: true,  trendText: '↑ 5.4%', icon: <Activity size={16} />   },
    { label: 'Total RPM Enrollments',      subLabel: 'Patients with active RPM devices',          value: '437',   trendUp: true,  trendText: '↑ 12.1%',icon: <DollarSign size={16} /> },
    { label: 'Overall Enrollment Rate',    subLabel: 'Eligible patients successfully enrolled',   value: '76.3%', trendUp: true,  trendText: '↑ 3.1%', icon: <Percent size={16} />    },
    { label: 'New Enrollments This Month', subLabel: 'Newly onboarded patients in current month', value: '94',    trendUp: true,  trendText: '↑ 18',   icon: <UserPlus size={16} />   },
    { label: 'Disenrollments This Month',  subLabel: 'Patients who exited program this month',    value: '12',    trendUp: false, trendText: '↓ 3',    icon: <UserMinus size={16} />  },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: PAGE_BG, fontFamily: FF }}>
      <SidebarV5
        active="dashboard"
        collapsed={navCollapsed}
        onToggle={() => setNavCollapsed(o => !o)}
      />

      <div style={{ marginLeft: navCollapsed ? COLLAPSED_W : NAV_W, transition: 'margin-left 0.22s ease', flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar />

        <div style={{ padding: '28px 28px 48px', display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* ── KPI Cards ───────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {kpis.map((kpi, i) => <KpiCard key={i} {...kpi} />)}
          </div>

          {/* ── Charts Row ──────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, alignItems: 'stretch' }}>

            {/* Revenue Over Time */}
            <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: '0 0 3px', letterSpacing: '-0.01em', fontFamily: FF }}>
                    Revenue Over Time
                  </h2>
                  <p style={{ fontSize: 12.5, color: '#94A3B8', margin: 0, fontFamily: FF }}>
                    APCM vs RPM revenue comparison
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <SelectFilter
                    options={SECONDARY_OPTIONS[period]}
                    value={selection}
                    onChange={setSelection}
                  />
                  <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: 999, padding: 3, gap: 1 }}>
                    {['Monthly', 'Quarterly', 'Yearly'].map(p => (
                      <Pill key={p} label={p} active={period === p} onClick={() => handlePeriodChange(p)} />
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 6, right: 8, left: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'Inter, system-ui' }} axisLine={false} tickLine={false} interval={period === 'Monthly' ? 4 : 0} />
                  <YAxis tickFormatter={v => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: '#94A3B8', fontFamily: 'Inter, system-ui' }} axisLine={false} tickLine={false} width={44} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    iconType="circle" iconSize={8}
                    formatter={(value) => <span style={{ fontSize: 12, color: '#64748B', fontFamily: 'Inter, system-ui' }}>{value}</span>}
                    wrapperStyle={{ paddingTop: 12 }}
                  />
                  <Line type="monotone" dataKey="apcm" name="APCM Revenue" stroke={TEAL} strokeWidth={2.5} dot={{ r: 3.5, fill: TEAL, stroke: 'white', strokeWidth: 2 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="rpm"  name="RPM Revenue"  stroke="#64748B" strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3, fill: '#64748B', stroke: 'white', strokeWidth: 2 }} activeDot={{ r: 4.5 }} />
                </LineChart>
              </ResponsiveContainer>
              </div>

            </div>

            {/* Revenue by Program */}
            <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #E2E8F0', padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: '0 0 3px', letterSpacing: '-0.01em', fontFamily: FF }}>
                Revenue by Program
              </h2>
              <p style={{ fontSize: 12.5, color: '#94A3B8', margin: '0 0 20px', fontFamily: FF }}>
                {period} distribution
              </p>

              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                    startAngle={90} endAngle={-270}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <div style={{ textAlign: 'center', marginTop: -12, marginBottom: 16 }}>
                <p style={{ fontSize: 11, color: '#94A3B8', margin: '0 0 2px', fontFamily: FF }}>Total Revenue</p>
                <p style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.03em', fontFamily: FF }}>{fmt$(grandTotal)}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pieData.map((seg, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 9, height: 9, borderRadius: '50%', background: seg.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: '#64748B', fontFamily: FF }}>{seg.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A', fontFamily: FF }}>{fmt$(seg.value)}</span>
                      <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: FF }}>
                        {((seg.value / grandTotal) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Billing Stats ────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.01em', fontFamily: FF }}>Billing Stats</h2>
              <span style={{ fontSize: 12.5, color: '#94A3B8', fontFamily: FF }}>CPT / HCPCS code breakdown</span>
            </div>

            {/* CPT Code Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {CPT_CARDS.map((card, i) => (
                <Card
                  key={i}
                  className="border-0 border-l-[4px] shadow-sm overflow-hidden"
                  style={{ borderLeftColor: NAVY }}
                >
                  <CardContent className="p-[16px_18px] flex flex-col gap-[10px]">
                    <div>
                      <span className="text-[15px] font-extrabold tracking-[-0.01em]" style={{ color: NAVY }}>
                        {card.code}
                      </span>
                      <p className="text-[11.5px] text-slate-400 mt-1 leading-snug">
                        {card.desc}
                      </p>
                    </div>

                    <div className="h-px bg-slate-100" />

                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-slate-400 mb-0.5">
                          Patients Billed
                        </p>
                        <p className="text-[20px] font-extrabold tracking-[-0.02em] text-slate-900 leading-none">
                          {card.patients.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.06em] text-slate-400 mb-0.5">
                          Revenue
                        </p>
                        <p className="text-[18px] font-extrabold tracking-[-0.02em] leading-none" style={{ color: NAVY }}>
                          {fmt$(card.revenue)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Patient Billing Table */}
            <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: FF }}>Patient Billing Summary</h3>
                  <p style={{ fontSize: 12, color: '#94A3B8', margin: '2px 0 0', fontFamily: FF }}>Showing {PATIENT_ROWS.length} patients — April 2026</p>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: NAVY, background: 'rgba(31,58,95,0.06)', padding: '4px 10px', borderRadius: 999, fontFamily: FF }}>
                  {period}
                </span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC' }}>
                    {['Patient Name', 'Age', 'Primary Condition', 'APCM', 'RPM', 'APCM Revenue', 'RPM Revenue', 'Total Billed'].map((h, i) => (
                      <th key={i} style={{
                        padding: '11px 16px', textAlign: i <= 2 ? 'left' : 'right',
                        fontSize: 11, fontWeight: 700, color: '#64748B',
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        whiteSpace: 'nowrap', borderBottom: '1px solid #E2E8F0',
                        fontFamily: FF,
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PATIENT_ROWS.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9', cursor: 'default' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700, color: '#64748B', flexShrink: 0, fontFamily: FF }}>
                            {row.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A', fontFamily: FF }}>{row.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: '#64748B', fontFamily: FF }}>{row.age}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: '#374151', background: '#F1F5F9', padding: '3px 9px', borderRadius: 999, fontFamily: FF, whiteSpace: 'nowrap' }}>{row.condition}</span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: row.apcm ? 'rgba(31,58,95,0.07)' : '#F8FAFC', color: row.apcm ? NAVY : '#94A3B8', fontFamily: FF }}>
                          {row.apcm ? '✓ Active' : '—'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: row.rpm ? '#EFF6FF' : '#F8FAFC', color: row.rpm ? '#3B82F6' : '#94A3B8', fontFamily: FF }}>
                          {row.rpm ? '✓ Active' : '—'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13, color: '#374151', fontFamily: FF }}>{fmt$(row.apcmRev)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13, color: '#374151', fontFamily: FF }}>{fmt$(row.rpmRev)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13.5, fontWeight: 700, color: '#0F172A', fontFamily: FF }}>{fmt$(row.total)}</td>
                    </tr>
                  ))}
                  {/* Totals */}
                  <tr style={{ background: '#F8FAFC', borderTop: '2px solid #E2E8F0' }}>
                    <td style={{ padding: '12px 16px', fontSize: 13.5, fontWeight: 700, color: '#0F172A', fontFamily: FF }} colSpan={3}>Totals</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13.5, fontWeight: 700, color: '#0F172A', fontFamily: FF }}>{totals.apcm}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13.5, fontWeight: 700, color: '#0F172A', fontFamily: FF }}>{totals.rpm}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13.5, fontWeight: 700, color: '#0F172A', fontFamily: FF }}>{fmt$(totals.apcmRev)}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13.5, fontWeight: 700, color: '#0F172A', fontFamily: FF }}>{fmt$(totals.rpmRev)}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 14, fontWeight: 800, color: NAVY, fontFamily: FF }}>{fmt$(totals.total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
