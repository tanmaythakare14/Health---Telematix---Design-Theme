import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ChevronRight, TrendingUp, TrendingDown,
  Users, Mail, Phone, Building2, Hash, CreditCard,
  Wifi, UserCircle2, Pencil, SlashSquare, RefreshCw,
  Activity, HeartPulse, Search,
  LayoutDashboard, Boxes, MessageSquare, Settings,
  Bell, LogOut, ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge }  from '@/components/ui/badge'
import { ALL_CLINICS } from '../../data/clinics'

/* ─── Design tokens ──────────────────────────────────────────── */
const TEAL    = '#0D9488'
const TEAL_LT = '#F0FDFA'
const PAGE_BG = '#FAFAF9'
const NAV_W   = 240
const FF      = 'Inter, system-ui, sans-serif'

/* ─── Left Nav Item ──────────────────────────────────────────── */
function NavItem({ icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 11,
      padding: '9px 12px', borderRadius: 9,
      background: active ? TEAL : 'transparent',
      border: 'none', cursor: 'pointer',
      color: active ? '#ffffff' : '#64748B',
      fontSize: 13.5, fontWeight: active ? 600 : 400,
      fontFamily: FF, transition: 'background 0.15s, color 0.15s', textAlign: 'left',
    }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F1F5F9' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
    >
      <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, opacity: active ? 1 : 0.65 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge !== undefined && (
        <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: active ? 'rgba(255,255,255,0.25)' : TEAL, color: '#fff', lineHeight: 1.4 }}>
          {badge}
        </span>
      )}
    </button>
  )
}

/* ─── Left Navigation ────────────────────────────────────────── */
function LeftNav({ active: activeItem }) {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)

  const mainNav = [
    { id: 'dashboard',           label: 'Dashboard',           icon: <LayoutDashboard size={17} /> },
    { id: 'clinic-management',   label: 'Clinic Management',   icon: <Building2 size={17} /> },
    { id: 'resource-management', label: 'Resource Management', icon: <Boxes size={17} /> },
    { id: 'messages',            label: 'Messages',            icon: <MessageSquare size={17} />, badge: 3 },
  ]

  return (
    <div style={{ width: NAV_W, minHeight: '100vh', background: '#ffffff', borderRight: '1px solid #E8EDF2', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, zIndex: 40, boxShadow: '2px 0 12px rgba(0,0,0,0.04)' }}>
      <div style={{ padding: '22px 18px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 10px ${TEAL}44` }}>
            <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
              <path d="M3 13h4l2-5.5 2.5 11 2-7.5 1.5 3.5H23" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.15, fontFamily: FF, letterSpacing: '-0.02em' }}>Health Telematix</p>
            <p style={{ fontSize: 10.5, fontWeight: 500, color: '#94A3B8', margin: 0, fontFamily: FF }}>Care Management Platform</p>
          </div>
        </div>
      </div>
      <div style={{ height: 1, background: '#F1F5F9', margin: '0 18px' }} />
      <div style={{ padding: '14px 12px', flex: 1 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 12px', fontFamily: FF }}>Main Menu</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {mainNav.map(item => (
            <NavItem key={item.id} icon={item.icon} label={item.label} active={activeItem === item.id} badge={item.badge}
              onClick={() => { if (item.id === 'clinic-management') navigate('/clinic-management'); if (item.id === 'messages') navigate('/messages') }} />
          ))}
        </div>
      </div>
      <div style={{ padding: '10px 12px 18px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <NavItem icon={<Settings size={17} />} label="Settings" active={activeItem === 'settings'} />
        <div style={{ position: 'relative', marginTop: 6 }}>
          <button onClick={() => setProfileOpen(o => !o)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9, background: profileOpen ? '#F1F5F9' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: FF, transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
            onMouseLeave={e => { if (!profileOpen) e.currentTarget.style.background = 'transparent' }}
          >
            <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, #14B8A6, ${TEAL})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>SM</div>
            <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
              <p style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A', margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Dr. Sarah Mitchell</p>
              <p style={{ fontSize: 11, color: '#94A3B8', margin: 0, lineHeight: 1.3 }}>Admin</p>
            </div>
            <ChevronDown size={13} style={{ color: '#94A3B8', flexShrink: 0, transition: 'transform 0.15s', transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
          </button>
          {profileOpen && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => setProfileOpen(false)} />
              <div style={{ position: 'absolute', bottom: 'calc(100% + 6px)', left: 0, right: 0, background: '#ffffff', borderRadius: 10, border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.10)', zIndex: 100, overflow: 'hidden', fontFamily: FF }}>
                <div style={{ padding: '12px 14px', borderBottom: '1px solid #F1F5F9' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: 0 }}>Dr. Sarah Mitchell</p>
                  <p style={{ fontSize: 11.5, color: '#94A3B8', margin: '2px 0 0' }}>admin@healthtelematix.com</p>
                </div>
                <button onClick={() => { setProfileOpen(false); navigate('/') }} style={{ width: '100%', padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 9, fontSize: 13, fontWeight: 500, color: '#EF4444', textAlign: 'left' }}
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
  )
}

/* ─── Top Bar ────────────────────────────────────────────────── */
function TopBar({ clinic }) {
  return (
    <div style={{ height: 80, background: '#ffffff', borderBottom: '1px solid #E8EDF2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', position: 'sticky', top: 0, zIndex: 30 }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B' }}>
        <Link to="/clinic-management" style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748B', textDecoration: 'none', fontWeight: 500, fontFamily: FF }}>
          <ArrowLeft size={13} /> Clinic Management
        </Link>
        <ChevronRight size={12} style={{ color: '#CBD5E1' }} />
        <span style={{ color: '#0F172A', fontWeight: 600, fontFamily: FF }}>{clinic?.name}</span>
      </nav>
      <button style={{ position: 'relative', width: 38, height: 38, borderRadius: 9, border: '1px solid #E2E8F0', background: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
        <Bell size={17} />
        <span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', border: '1.5px solid white' }} />
      </button>
    </div>
  )
}

/* ─── KPI Card ───────────────────────────────────────────────── */
function KpiCard({ heading, subheading, value, trend, icon, accent }) {
  const isUp = trend?.up
  const color = accent || TEAL
  return (
    <div style={{ flex: 1, background: '#ffffff', borderRadius: 14, border: '1px solid #E8EDF2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Top row: heading + icon */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', margin: 0, lineHeight: 1.3, fontFamily: FF }}>{heading}</p>
          <p style={{ fontSize: 12.5, color: '#94A3B8', margin: '4px 0 0', lineHeight: 1.4, fontFamily: FF }}>{subheading}</p>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: color + '18', color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
      </div>

      {/* Value */}
      <p style={{ fontSize: 36, fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1, letterSpacing: '-0.03em', fontFamily: FF }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>

      {/* Trend */}
      {trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: isUp ? '#ECFDF5' : '#FEF2F2', color: isUp ? '#059669' : '#DC2626' }}>
            {isUp ? <TrendingUp size={11} strokeWidth={2.5}/> : <TrendingDown size={11} strokeWidth={2.5}/>}
            {isUp ? '+' : '-'}{trend.pct}%
          </span>
          <span style={{ fontSize: 12, color: '#94A3B8', fontFamily: FF }}>vs last year</span>
        </div>
      )}
    </div>
  )
}

/* ─── Clinic Information Card ────────────────────────────────── */
function ClinicInfoCard({ clinic }) {
  const fields = [
    { icon: <Building2 size={13}/>,   label: 'Clinic Name',   value: clinic.name,                        col: 'left'  },
    { icon: <Mail size={13}/>,        label: 'Admin Email',   value: clinic.adminEmail,                  col: 'right' },
    { icon: <Phone size={13}/>,       label: 'Phone Number',  value: clinic.phone,                       col: 'left'  },
    { icon: <UserCircle2 size={13}/>, label: 'Clinic Admin',  value: clinic.clinicAdminName,             col: 'right' },
    { icon: <Wifi size={13}/>,        label: 'Connected EHR', value: clinic.ehr,                         col: 'left'  },
    { icon: <Hash size={13}/>,        label: 'NPI Number',    value: clinic.npi,                         col: 'right' },
    { icon: <CreditCard size={13}/>,  label: 'TIN Number',    value: clinic.tin,                         col: 'left'  },
    { icon: <Users size={13}/>,       label: 'Linked Users',  value: `${clinic.linkedUsers} users`,      col: 'right' },
  ]

  const left  = fields.filter(f => f.col === 'left')
  const right = fields.filter(f => f.col === 'right')

  return (
    <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #E8EDF2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '24px 28px' }}>
      {/* Section label */}
      <p style={{ fontSize: 10.5, fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 18px', fontFamily: FF }}>
        Clinic Details
      </p>

      {/* Card header */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: FF }}>Clinic Information</p>
        <p style={{ fontSize: 13, color: '#94A3B8', margin: '4px 0 0', fontFamily: FF }}>Registered details and configuration</p>
      </div>

      {/* Two-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 60px' }}>
        {[...left.map((f, i) => ({ ...f, pair: right[i] }))].map((f, i) => (
          <FieldPair key={i} left={f} right={f.pair} />
        ))}
      </div>
    </div>
  )
}

function FieldPair({ left, right }) {
  return (
    <>
      <FieldItem field={left} />
      {right && <FieldItem field={right} />}
    </>
  )
}

function FieldItem({ field }) {
  if (!field) return <div />
  return (
    <div>
      <p style={{ fontSize: 10.5, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 5, fontFamily: FF }}>
        <span style={{ color: TEAL, display: 'flex', alignItems: 'center' }}>{field.icon}</span>
        {field.label}
      </p>
      <p style={{ fontSize: 14, fontWeight: 500, color: '#1E293B', margin: 0, lineHeight: 1.4, fontFamily: FF }}>
        {field.value || '—'}
      </p>
    </div>
  )
}

/* ─── Team Members Table ─────────────────────────────────────── */
function TeamTable({ clinic }) {
  const [search, setSearch] = useState('')
  const members = (clinic.linkedUsersList || []).filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #E8EDF2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid #F1F5F9' }}>
        <div>
          <p style={{ fontSize: 14.5, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: FF }}>Team Members</p>
          <p style={{ fontSize: 12.5, color: '#94A3B8', margin: '3px 0 0', fontFamily: FF }}>All users linked to this clinic</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
              style={{ height: 34, paddingLeft: 30, paddingRight: 36, border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 13, color: '#1E293B', background: PAGE_BG, outline: 'none', fontFamily: FF, width: 180 }} />
            <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: '#CBD5E1', fontFamily: FF, fontWeight: 500 }}>⌘1</span>
          </div>
          <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: 13, fontWeight: 600, color: TEAL, textDecoration: 'none', fontFamily: FF }}>See All</a>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: PAGE_BG }}>
            {[{ h: 'Name', pl: 24 }, { h: 'Role' }, { h: 'Email' }, { h: 'Phone' }, { h: 'Added On' }, { h: '' }].map((col, i) => (
              <th key={i} style={{ padding: `10px ${col.pl || 14}px`, textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: FF, borderBottom: '1px solid #F1F5F9', whiteSpace: 'nowrap' }}>
                {col.h}{col.h && ' ↕'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {members.map((u, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #F8FAFF', transition: 'background 0.12s' }}
              onMouseEnter={e => e.currentTarget.style.background = TEAL_LT}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{ padding: '14px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: TEAL_LT, color: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: FF }}>
                    {u.initials}
                  </div>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: '#1E293B', fontFamily: FF }}>{u.name}</span>
                </div>
              </td>
              <td style={{ padding: '14px' }}>
                <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: TEAL_LT, color: TEAL, fontFamily: FF }}>{u.role}</span>
              </td>
              <td style={{ padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B', fontFamily: FF }}>
                  <Mail size={12} style={{ color: '#CBD5E1', flexShrink: 0 }} />{u.email}
                </div>
              </td>
              <td style={{ padding: '14px', fontSize: 13, color: '#64748B', fontFamily: FF }}>{u.phone}</td>
              <td style={{ padding: '14px', fontSize: 13, color: '#64748B', fontFamily: FF }}>{u.addedOn}</td>
              <td style={{ padding: '14px 24px', textAlign: 'right' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#CBD5E1', padding: 6, borderRadius: 6, display: 'inline-flex', alignItems: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#64748B'}
                  onMouseLeave={e => e.currentTarget.style.color = '#CBD5E1'}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
                  </svg>
                </button>
              </td>
            </tr>
          ))}
          {members.length === 0 && (
            <tr><td colSpan={6} style={{ padding: '40px', textAlign: 'center', fontSize: 13.5, color: '#94A3B8', fontFamily: FF }}>No members match your search.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

/* ─── Status Badge ───────────────────────────────────────────── */
function StatusBadge({ status }) {
  return status === 'active' ? (
    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 font-medium text-xs gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />Active
    </Badge>
  ) : (
    <Badge className="bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-100 font-medium text-xs gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />Deactivated
    </Badge>
  )
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function ClinicDetailV4() {
  const { id } = useParams()
  const navigate = useNavigate()
  const clinic = ALL_CLINICS.find(c => c.id === Number(id))

  if (!clinic) {
    return (
      <div style={{ minHeight: '100vh', background: PAGE_BG, fontFamily: FF, display: 'flex' }}>
        <LeftNav active="clinic-management" />
        <div style={{ marginLeft: NAV_W, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
          <Building2 size={40} strokeWidth={1.25} style={{ opacity: 0.3, color: '#94A3B8' }} />
          <p style={{ fontSize: 15, fontWeight: 500, color: '#64748B', margin: 0 }}>Clinic not found</p>
          <Button onClick={() => navigate('/clinic-management')} className="rounded-[8px] h-9 px-5 text-[13px]" style={{ background: TEAL }}>
            Back to Clinic Management
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: PAGE_BG, fontFamily: FF, display: 'flex' }}>
      <LeftNav active="clinic-management" />

      <div style={{ marginLeft: NAV_W, flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar clinic={clinic} />

        <main style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 22 }}>

          {/* ── Clinic header strip ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: clinic.color + '18', border: `1.5px solid ${clinic.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: clinic.color, flexShrink: 0 }}>
                {clinic.initials}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
                  <h1 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em', fontFamily: FF }}>{clinic.name}</h1>
                  <StatusBadge status={clinic.status} />
                </div>
                <p style={{ fontSize: 13, color: '#94A3B8', margin: 0, fontFamily: FF }}>{clinic.ehr} · NPI {clinic.npi} · {clinic.adminEmail}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="outline" className="rounded-[8px] h-9 px-4 text-[13px] gap-2 border-slate-200 text-slate-600">
                <Pencil size={13}/> Edit
              </Button>
              {clinic.status === 'active' ? (
                <Button variant="outline" className="rounded-[8px] h-9 px-4 text-[13px] gap-2 border-red-200 text-red-600 hover:bg-red-50">
                  <SlashSquare size={13}/> Deactivate
                </Button>
              ) : (
                <Button variant="outline" className="rounded-[8px] h-9 px-4 text-[13px] gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                  <RefreshCw size={13}/> Reactivate
                </Button>
              )}
            </div>
          </div>

          {/* ── 3 KPI Cards in one row ── */}
          <div style={{ display: 'flex', gap: 16 }}>
            <KpiCard
              heading="Onboarded Patients"
              subheading="Total patients enrolled in care programs"
              value={clinic.patients}
              trend={clinic.trends?.patients}
              icon={<Users size={17}/>}
              accent={TEAL}
            />
            <KpiCard
              heading="APCM Program"
              subheading="Active advanced primary care management"
              value={clinic.apcm}
              trend={clinic.trends?.apcm}
              icon={<HeartPulse size={17}/>}
              accent="#7C3AED"
            />
            <KpiCard
              heading="RPM Program"
              subheading="Active remote patient monitoring enrollment"
              value={clinic.rpm}
              trend={clinic.trends?.rpm}
              icon={<Activity size={17}/>}
              accent="#0891B2"
            />
          </div>

          {/* ── Clinic Information ── */}
          <ClinicInfoCard clinic={clinic} />

          {/* ── Team Members table ── */}
          <TeamTable clinic={clinic} />

        </main>
      </div>
    </div>
  )
}
