import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ChevronRight, TrendingUp, TrendingDown,
  Users, Mail, Phone, Building2, Hash, CreditCard,
  Wifi, UserCircle2, Pencil, SlashSquare, RefreshCw,
  Activity, HeartPulse, Search,
  Bell, ChevronDown,
} from 'lucide-react'
import SidebarV5, { NAV_W, COLLAPSED_W } from '../../components/layout/SidebarV5'
import { Button } from '@/components/ui/Button'
import { Badge }  from '@/components/ui/badge'
import { ALL_CLINICS } from '../../data/clinics'

/* ─── Design tokens ──────────────────────────────────────────── */
const TEAL     = '#0D9488'
const TEAL_LT  = '#F0FDFA'
const PAGE_BG  = '#FAFAF9'
const GRADIENT = 'linear-gradient(135deg, #1F3A5F 0%, #0D9488 100%)'
const FF       = 'Inter, system-ui, sans-serif'


/* ─── Top Bar ────────────────────────────────────────────────── */
function TopBar({ clinic }) {
  return (
    <div style={{ height: 80, background: '#ffffff', borderBottom: '1px solid #E8EDF2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 30 }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B' }}>
        <Link to="/clinic-management" style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748B', textDecoration: 'none', fontWeight: 500, fontFamily: FF }}>
          <ArrowLeft size={13} /> Clinic Management
        </Link>
        <ChevronRight size={12} style={{ color: '#CBD5E1' }} />
        <span style={{ color: '#0F172A', fontWeight: 600, fontFamily: FF }}>{clinic?.name}</span>
      </nav>
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

/* ─── KPI Card ───────────────────────────────────────────────── */
function KpiCard({ heading, subheading, value, trend, icon }) {
  const isUp = trend?.up
  return (
    <div style={{ flex: 1, background: '#ffffff', borderRadius: 14, border: '1px solid #E8EDF2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A', margin: 0, lineHeight: 1.3, fontFamily: FF }}>{heading}</p>
          <p style={{ fontSize: 12.5, color: '#94A3B8', margin: '4px 0 0', lineHeight: 1.4, fontFamily: FF }}>{subheading}</p>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(#ffffff, #ffffff) padding-box, linear-gradient(135deg, #1F3A5F 0%, #0D9488 100%) border-box', border: '1.5px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F3A5F' }}>
          {icon}
        </div>
      </div>
      <p style={{ fontSize: 36, fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1, letterSpacing: '-0.03em', fontFamily: FF }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
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
function FieldItem({ field }) {
  if (!field) return <div />
  return (
    <div>
      <p style={{ fontSize: 10.5, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px', display: 'flex', alignItems: 'center', gap: 5, fontFamily: FF }}>
        <span style={{ color: '#1F3A5F', display: 'flex', alignItems: 'center' }}>{field.icon}</span>
        {field.label}
      </p>
      <p style={{ fontSize: 14, fontWeight: 500, color: '#1E293B', margin: 0, lineHeight: 1.4, fontFamily: FF }}>{field.value || '—'}</p>
    </div>
  )
}

function ClinicInfoCard({ clinic }) {
  const fields = [
    { icon: <Building2 size={13}/>,   label: 'Clinic Name',   value: clinic.name,                   col: 'left'  },
    { icon: <Mail size={13}/>,        label: 'Admin Email',   value: clinic.adminEmail,             col: 'right' },
    { icon: <Phone size={13}/>,       label: 'Phone Number',  value: clinic.phone,                  col: 'left'  },
    { icon: <UserCircle2 size={13}/>, label: 'Clinic Admin',  value: clinic.clinicAdminName,        col: 'right' },
    { icon: <Wifi size={13}/>,        label: 'Connected EHR', value: clinic.ehr,                    col: 'left'  },
    { icon: <Hash size={13}/>,        label: 'NPI Number',    value: clinic.npi,                    col: 'right' },
    { icon: <CreditCard size={13}/>,  label: 'TIN Number',    value: clinic.tin,                    col: 'left'  },
    { icon: <Users size={13}/>,       label: 'Linked Users',  value: `${clinic.linkedUsers} users`, col: 'right' },
  ]
  const left  = fields.filter(f => f.col === 'left')
  const right = fields.filter(f => f.col === 'right')

  return (
    <div style={{ background: '#ffffff', borderRadius: 14, border: '1px solid #E8EDF2', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: '24px 28px' }}>
      <p style={{ fontSize: 10.5, fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 18px', fontFamily: FF }}>Clinic Details</p>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: FF }}>Clinic Information</p>
        <p style={{ fontSize: 13, color: '#94A3B8', margin: '4px 0 0', fontFamily: FF }}>Registered details and configuration</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 60px' }}>
        {left.map((f, i) => (
          <><FieldItem key={`l${i}`} field={f} /><FieldItem key={`r${i}`} field={right[i]} /></>
        ))}
      </div>
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
          <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: 13, fontWeight: 600, color: '#1F3A5F', textDecoration: 'none', fontFamily: FF }}>See All</a>
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
            <tr key={i} style={{ borderBottom: '1px solid #F8FAFF' }}>
              <td style={{ padding: '14px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, rgba(31,58,95,0.08) 0%, rgba(13,148,136,0.08) 100%)', color: '#1F3A5F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: FF }}>{u.initials}</div>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: '#1E293B', fontFamily: FF }}>{u.name}</span>
                </div>
              </td>
              <td style={{ padding: '14px' }}><span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: 'linear-gradient(135deg, rgba(31,58,95,0.07) 0%, rgba(13,148,136,0.07) 100%)', color: '#1F3A5F', border: '1px solid rgba(31,58,95,0.12)', fontFamily: FF }}>{u.role}</span></td>
              <td style={{ padding: '14px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B', fontFamily: FF }}><Mail size={12} style={{ color: '#CBD5E1', flexShrink: 0 }} />{u.email}</div></td>
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
export default function ClinicDetailV5() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [navCollapsed, setNavCollapsed] = useState(false)
  const clinic = ALL_CLINICS.find(c => c.id === Number(id))

  if (!clinic) {
    return (
      <div style={{ minHeight: '100vh', background: PAGE_BG, fontFamily: FF, display: 'flex' }}>
        <SidebarV5 active="clinic-management" collapsed={navCollapsed} onToggle={() => setNavCollapsed(o => !o)} />
        <div style={{ marginLeft: navCollapsed ? COLLAPSED_W : NAV_W, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, transition: 'margin-left 0.22s ease' }}>
          <Building2 size={40} strokeWidth={1.25} style={{ opacity: 0.3, color: '#94A3B8' }} />
          <p style={{ fontSize: 15, fontWeight: 500, color: '#64748B', margin: 0 }}>Clinic not found</p>
          <Button onClick={() => navigate('/clinic-management')} className="rounded-[8px] h-9 px-5 text-[13px]" style={{ background: GRADIENT }}>
            Back to Clinic Management
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: PAGE_BG, fontFamily: FF, display: 'flex' }}>
      <SidebarV5 active="clinic-management" collapsed={navCollapsed} onToggle={() => setNavCollapsed(o => !o)} />

      <div style={{ marginLeft: navCollapsed ? COLLAPSED_W : NAV_W, flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, transition: 'margin-left 0.22s ease' }}>
        <TopBar clinic={clinic} />

        <main style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 22 }}>

          {/* Clinic header strip */}
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

          {/* 3 KPI Cards */}
          <div style={{ display: 'flex', gap: 16 }}>
            <KpiCard heading="Onboarded Patients" subheading="Total patients enrolled in care programs" value={clinic.patients} trend={clinic.trends?.patients} icon={<Users size={17}/>} />
            <KpiCard heading="APCM Program" subheading="Active advanced primary care management" value={clinic.apcm} trend={clinic.trends?.apcm} icon={<HeartPulse size={17}/>} />
            <KpiCard heading="RPM Program" subheading="Active remote patient monitoring enrollment" value={clinic.rpm} trend={clinic.trends?.rpm} icon={<Activity size={17}/>} />
          </div>

          <ClinicInfoCard clinic={clinic} />
          <TeamTable clinic={clinic} />

        </main>
      </div>
    </div>
  )
}
