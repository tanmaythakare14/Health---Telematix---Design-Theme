import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ChevronRight, TrendingUp, TrendingDown,
  Users, Mail, Phone, Building2, Hash, CreditCard,
  Wifi, UserCircle2, Pencil, SlashSquare, RefreshCw,
  UserPlus, Trash2, Activity, HeartPulse, Stethoscope,
} from 'lucide-react'
import { Button }   from '@/components/ui/button'
import { Badge }    from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { ALL_CLINICS } from '../../data/clinics'

/* ─── Design tokens ──────────────────────────────────────────── */
const BRAND    = '#2563EB'
const BRAND_LT = '#EFF6FF'
const PAGE_BG  = '#F8FAFF'

/* ─── Top Navigation (same as ClinicManagementV2) ────────────── */
function TopNav() {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)

  const NAV_LINKS = [
    { label: 'Dashboard',           active: false },
    { label: 'Clinic Management',   active: true  },
    { label: 'Resource Management', active: false },
    { label: 'Billing Management',  active: false },
  ]
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: '#ffffff',
      borderBottom: '1px solid #E2E8F0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        width: '100%', boxSizing: 'border-box',
        display: 'flex', alignItems: 'center',
        height: 64, padding: '0 25px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
          <svg width="30" height="30" viewBox="0 0 26 26" fill="none">
            <rect width="26" height="26" rx="7" fill={BRAND_LT}/>
            <path d="M3 13h4l2-5.5 2.5 11 2-7.5 1.5 3.5H23"
                  stroke={BRAND} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 15, fontWeight: 700, color: BRAND, letterSpacing: '-0.02em', fontFamily: 'Inter, system-ui, sans-serif' }}>
            Health Telematix
          </span>
        </div>
        <div style={{ width: 1, height: 22, background: '#E2E8F0', margin: '0 24px' }} />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV_LINKS.map(link => (
            <a key={link.label} href="#"
              style={{
                padding: '7px 13px', borderRadius: 7,
                fontSize: 13.5, fontWeight: link.active ? 600 : 500,
                color: link.active ? BRAND : '#64748B',
                background: link.active ? BRAND_LT : 'transparent',
                textDecoration: 'none',
                fontFamily: 'Inter, system-ui, sans-serif',
                whiteSpace: 'nowrap',
              }}
              onClick={e => e.preventDefault()}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{
            position: 'relative', width: 36, height: 36, borderRadius: 8,
            border: 'none', background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span style={{
              position: 'absolute', top: 7, right: 8,
              width: 7, height: 7, borderRadius: '50%',
              background: '#EF4444', border: '1.5px solid white',
            }} />
          </button>
          <div style={{ width: 1, height: 22, background: '#E2E8F0', margin: '0 4px' }} />

          {/* Profile with logout dropdown */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setProfileOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '6px 10px', borderRadius: 10, cursor: 'pointer',
                background: profileOpen ? BRAND_LT : 'transparent',
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: `linear-gradient(135deg, #3B82F6, ${BRAND})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0,
              }}>SM</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', lineHeight: 1, fontFamily: 'Inter, system-ui, sans-serif' }}>Dr. Sarah Mitchell</span>
                <span style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1, fontFamily: 'Inter, system-ui, sans-serif' }}>admin@healthtelematix.com</span>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ marginLeft: 2, transition: 'transform 0.15s', transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>

            {profileOpen && (
              <>
                <div
                  style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                  onClick={() => setProfileOpen(false)}
                />
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: '#ffffff', borderRadius: 10,
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
                  minWidth: 200, zIndex: 100, overflow: 'hidden',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}>
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid #F1F5F9' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: 0 }}>Dr. Sarah Mitchell</p>
                    <p style={{ fontSize: 11.5, color: '#94A3B8', margin: '2px 0 0' }}>admin@healthtelematix.com</p>
                  </div>
                  <button
                    onClick={() => { setProfileOpen(false); navigate('/') }}
                    style={{
                      width: '100%', padding: '10px 14px',
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 9,
                      fontSize: 13, fontWeight: 500, color: '#EF4444',
                      textAlign: 'left', transition: 'background 0.12s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Log Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

/* ─── KPI Stat Card (with subtle primary border) ─────────────── */
function KpiCard({ label, sublabel, value, icon, trend }) {
  const isUp = trend?.up
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 14,
      border: `1px solid rgba(37,99,235,0.14)`,
      boxShadow: '0 1px 4px rgba(37,99,235,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      padding: '20px 22px',
      display: 'flex', flexDirection: 'column', gap: 16,
      flex: 1,
    }}>
      {/* Top: label + icon */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <p style={{ fontSize: 13.5, fontWeight: 600, color: '#1E293B', margin: 0, lineHeight: 1.3 }}>{label}</p>
          <p style={{ fontSize: 12, color: '#94A3B8', margin: '3px 0 0', lineHeight: 1 }}>{sublabel}</p>
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 9, flexShrink: 0,
          background: BRAND_LT, color: BRAND,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon}
        </div>
      </div>

      {/* Middle: value */}
      <p style={{ fontSize: 34, fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1, letterSpacing: '-0.03em' }}>
        {value.toLocaleString()}
      </p>

      {/* Bottom: trend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontSize: 12, fontWeight: 700,
          padding: '3px 8px', borderRadius: 6,
          background: isUp ? '#ECFDF5' : '#FEF2F2',
          color:      isUp ? '#059669' : '#DC2626',
        }}>
          {isUp
            ? <TrendingUp size={11} strokeWidth={2.5} />
            : <TrendingDown size={11} strokeWidth={2.5} />}
          {isUp ? '+' : '-'}{trend?.pct}%
        </span>
        <span style={{ fontSize: 12, color: '#94A3B8' }}>vs last year</span>
      </div>
    </div>
  )
}

/* ─── Info Row (right sidebar) ───────────────────────────────── */
function InfoRow({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ color: '#CBD5E1' }}>{icon}</span>
        {label}
      </span>
      <span style={{ fontSize: 13.5, fontWeight: 500, color: '#1E293B', lineHeight: 1.4 }}>{value || '—'}</span>
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

/* ─── Line Tab Bar ───────────────────────────────────────────── */
function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', marginBottom: 24, gap: 0 }}>
      {tabs.map(t => {
        const isActive = active === t.id
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              padding: '10px 20px',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13.5, fontWeight: isActive ? 600 : 500,
              color: isActive ? BRAND : '#64748B',
              borderBottom: isActive ? `2px solid ${BRAND}` : '2px solid transparent',
              marginBottom: -1,
              fontFamily: 'Inter, system-ui, sans-serif',
              transition: 'color 0.15s',
              display: 'flex', alignItems: 'center', gap: 7,
            }}
          >
            {t.label}
            {t.count !== undefined && (
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999,
                background: isActive ? BRAND_LT : '#F1F5F9',
                color:      isActive ? BRAND    : '#64748B',
              }}>
                {t.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ─── Clinic Details section (Overview tab) ──────────────────── */
function ClinicDetailsGrid({ clinic }) {
  const rows = [
    { icon: <Building2 size={13}/>,   label: 'Clinic Name',      value: clinic.name              },
    { icon: <Mail size={13}/>,        label: 'Admin Email',       value: clinic.adminEmail        },
    { icon: <Phone size={13}/>,       label: 'Phone Number',      value: clinic.phone             },
    { icon: <UserCircle2 size={13}/>, label: 'Clinic Admin',      value: clinic.clinicAdminName   },
    { icon: <Wifi size={13}/>,        label: 'Connected EHR',     value: clinic.ehr               },
    { icon: <Hash size={13}/>,        label: 'NPI Number',        value: clinic.npi               },
    { icon: <CreditCard size={13}/>,  label: 'TIN Number',        value: clinic.tin               },
    { icon: <Users size={13}/>,       label: 'Linked Users',      value: `${clinic.linkedUsers} users` },
  ]
  return (
    <div style={{
      background: '#ffffff', borderRadius: 14,
      border: '1px solid #E2E8F0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      padding: '22px 24px',
    }}>
      <div style={{ marginBottom: 18 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0 }}>Clinic Information</p>
        <p style={{ fontSize: 12.5, color: '#94A3B8', margin: '3px 0 0' }}>Registered details and configuration</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 32px' }}>
        {rows.map(r => (
          <div key={r.label}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ color: BRAND }}>{r.icon}</span>{r.label}
            </p>
            <p style={{ fontSize: 13.5, fontWeight: 500, color: '#1E293B', margin: 0, lineHeight: 1.4 }}>{r.value || '—'}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Linked Users Table ─────────────────────────────────────── */
function LinkedUsersTab({ clinic }) {
  return (
    <div style={{
      background: '#ffffff', borderRadius: 14,
      border: '1px solid #E2E8F0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 22px', borderBottom: '1px solid #F1F5F9',
      }}>
        <div>
          <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0 }}>Linked Users</p>
          <p style={{ fontSize: 12.5, color: '#94A3B8', margin: '3px 0 0' }}>{clinic.linkedUsers} members in this clinic</p>
        </div>
        <Button
          className="rounded-[5px] h-9 px-4 text-[13px] font-semibold gap-2"
          style={{ background: BRAND }}
        >
          <UserPlus size={13} />
          Add User
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow style={{ background: PAGE_BG }} className="border-slate-100 hover:bg-[#F8FAFF]">
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-6">User</TableHead>
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Role</TableHead>
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Email</TableHead>
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Phone</TableHead>
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Added On</TableHead>
            <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pr-6 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(clinic.linkedUsersList || []).map((user, i) => (
            <TableRow key={i} className="border-slate-100 hover:bg-slate-50/60 transition-colors">
              <TableCell className="pl-6 py-3.5">
                <div className="flex items-center gap-3">
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                    background: BRAND_LT, color: BRAND,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                  }}>
                    {user.initials}
                  </div>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: '#1E293B' }}>{user.name}</span>
                </div>
              </TableCell>
              <TableCell className="py-3.5">
                <span style={{
                  fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 999,
                  background: BRAND_LT, color: BRAND,
                }}>
                  {user.role}
                </span>
              </TableCell>
              <TableCell className="py-3.5">
                <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
                  <Mail size={12} className="text-slate-400" />{user.email}
                </div>
              </TableCell>
              <TableCell className="py-3.5 text-[13px] text-slate-500">{user.phone}</TableCell>
              <TableCell className="py-3.5 text-[13px] text-slate-500">{user.addedOn}</TableCell>
              <TableCell className="py-3.5 pr-6 text-right">
                <button style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#CBD5E1', padding: 6, borderRadius: 6,
                  display: 'inline-flex', alignItems: 'center',
                  transition: 'color 0.15s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
                  onMouseLeave={e => e.currentTarget.style.color = '#CBD5E1'}
                >
                  <Trash2 size={14} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function ClinicDetailV2() {
  const { id } = useParams()
  const navigate = useNavigate()
  const clinic = ALL_CLINICS.find(c => c.id === Number(id))

  const [mainTab,  setMainTab]  = useState('overview')

  if (!clinic) {
    return (
      <div style={{ minHeight: '100vh', background: PAGE_BG, fontFamily: 'Inter, system-ui, sans-serif' }}>
        <TopNav />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 0', gap: 12, color: '#94A3B8' }}>
          <Building2 size={40} strokeWidth={1.25} style={{ opacity: 0.4 }} />
          <p style={{ fontSize: 15, fontWeight: 500, color: '#64748B', margin: 0 }}>Clinic not found</p>
          <Button onClick={() => navigate('/clinic-management')}
            className="rounded-[5px] h-9 px-5 text-[13px]" style={{ background: BRAND }}>
            Back to Clinic Management
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: PAGE_BG, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <TopNav />

      <div style={{ width: '100%', boxSizing: 'border-box', padding: '32px 25px' }}>

        {/* ── Breadcrumb ── */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B', marginBottom: 22 }}>
          <Link
            to="/clinic-management"
            style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748B', textDecoration: 'none', fontWeight: 500 }}
          >
            <ArrowLeft size={13} />
            Clinic Management
          </Link>
          <ChevronRight size={13} style={{ color: '#CBD5E1' }} />
          <span style={{ color: '#1E293B', fontWeight: 600 }}>{clinic.name}</span>
        </nav>

        {/* ── Clinic Header ── */}
        <div style={{
          background: '#ffffff', borderRadius: 14,
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          padding: '20px 24px', marginBottom: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Clinic avatar */}
            <div style={{
              width: 52, height: 52, borderRadius: 12, flexShrink: 0,
              background: clinic.color + '22', border: `1.5px solid ${clinic.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 800, color: clinic.color,
            }}>
              {clinic.initials}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                  {clinic.name}
                </h1>
                <StatusBadge status={clinic.status} />
              </div>
              <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
                {clinic.ehr} · NPI {clinic.npi}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Button variant="outline"
              className="rounded-[5px] h-9 px-4 text-[13px] gap-2 border-slate-200 text-slate-600 hover:border-slate-300">
              <Pencil size={13} /> Edit Details
            </Button>
            {clinic.status === 'active' ? (
              <Button variant="outline"
                className="rounded-[5px] h-9 px-4 text-[13px] gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300">
                <SlashSquare size={13} /> Deactivate
              </Button>
            ) : (
              <Button variant="outline"
                className="rounded-[5px] h-9 px-4 text-[13px] gap-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                <RefreshCw size={13} /> Reactivate
              </Button>
            )}
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>

          {/* ════ LEFT — Main Content (65%) ════ */}
          <div style={{ flex: '1 1 0', minWidth: 0 }}>

            {/* Tab bar */}
            <TabBar
              tabs={[
                { id: 'overview',     label: 'Overview'      },
                { id: 'linkedusers',  label: 'Linked Users', count: clinic.linkedUsers },
              ]}
              active={mainTab}
              onChange={setMainTab}
            />

            {/* ── Overview Tab ── */}
            {mainTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* KPI Cards */}
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#64748B', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Performance Metrics
                  </p>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <KpiCard
                      label="Onboarded Patients"
                      sublabel="Total patients enrolled in the care program"
                      value={clinic.patients}
                      icon={<Users size={16} />}
                      trend={clinic.trends?.patients}
                    />
                    <KpiCard
                      label="APCM Program"
                      sublabel="Active patients enrolled in APCM care management"
                      value={clinic.apcm}
                      icon={<HeartPulse size={16} />}
                      trend={clinic.trends?.apcm}
                    />
                    <KpiCard
                      label="RPM Program"
                      sublabel="Active patients enrolled in remote patient monitoring"
                      value={clinic.rpm}
                      icon={<Activity size={16} />}
                      trend={clinic.trends?.rpm}
                    />
                  </div>
                </div>

                {/* Clinic Details */}
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#64748B', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Clinic Details
                  </p>
                  <ClinicDetailsGrid clinic={clinic} />
                </div>

              </div>
            )}

            {/* ── Linked Users Tab ── */}
            {mainTab === 'linkedusers' && (
              <LinkedUsersTab clinic={clinic} />
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
