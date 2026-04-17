import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Plus, MoreHorizontal, Pencil, Mail, Users,
  Link2, SlashSquare, RefreshCw, Upload, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { Button }   from '@/components/ui/button'
import { Input }    from '@/components/ui/input'
import { Badge }    from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator }              from '@/components/ui/separator'
import { ALL_CLINICS }            from '../../data/clinics'

/* ─── Design tokens ──────────────────────────────────────────── */
const BRAND    = '#2563EB'
const BRAND_LT = '#EFF6FF'
const PAGE_BG  = '#F8FAFF'

const ROWS_PER_PAGE = 8
const EHR_OPTIONS   = ['Epic', 'Cerner / Oracle Health', 'athenahealth', 'eClinicalWorks', 'Allscripts', 'MEDITECH', 'NextGen']

/* ─── Top Navigation Bar ─────────────────────────────────────── */
function TopNav() {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)

  const NAV_LINKS = [
    { label: 'Dashboard',            active: false },
    { label: 'Clinic Management',    active: true  },
    { label: 'Resource Management',  active: false },
    { label: 'Billing Management',   active: false },
  ]

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: '#ffffff',
      borderBottom: '1px solid #E2E8F0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        width: '100%',
        display: 'flex', alignItems: 'center',
        height: 64, padding: '0 25px', gap: 0,
        boxSizing: 'border-box',
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

        {/* Divider */}
        <div style={{ width: 1, height: 22, background: '#E2E8F0', margin: '0 24px' }} />

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href="#"
              style={{
                padding: '7px 13px',
                borderRadius: 7,
                fontSize: 13.5,
                fontWeight: link.active ? 600 : 500,
                color: link.active ? BRAND : '#64748B',
                background: link.active ? BRAND_LT : 'transparent',
                textDecoration: 'none',
                fontFamily: 'Inter, system-ui, sans-serif',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s, color 0.15s',
              }}
              onClick={e => e.preventDefault()}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>

          {/* Bell */}
          <button style={{
            position: 'relative', width: 36, height: 36, borderRadius: 8,
            border: 'none', background: 'transparent', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#64748B',
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

          {/* Profile divider */}
          <div style={{ width: 1, height: 22, background: '#E2E8F0', margin: '0 4px' }} />

          {/* Profile */}
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
              }}>
                SM
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', lineHeight: 1, fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Dr. Sarah Mitchell
                </span>
                <span style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1, fontFamily: 'Inter, system-ui, sans-serif' }}>
                  admin@healthtelematix.com
                </span>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{ marginLeft: 2, transition: 'transform 0.15s', transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>

            {profileOpen && (
              <>
                {/* Backdrop */}
                <div
                  style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                  onClick={() => setProfileOpen(false)}
                />
                {/* Dropdown */}
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: '#ffffff', borderRadius: 10,
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)',
                  minWidth: 200, zIndex: 100, overflow: 'hidden',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}>
                  {/* User info header */}
                  <div style={{ padding: '12px 14px', borderBottom: '1px solid #F1F5F9' }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: 0 }}>Dr. Sarah Mitchell</p>
                    <p style={{ fontSize: 11.5, color: '#94A3B8', margin: '2px 0 0' }}>admin@healthtelematix.com</p>
                  </div>
                  {/* Logout item */}
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

/* ─── Status Badge ───────────────────────────────────────────── */
function StatusBadge({ status }) {
  return status === 'active' ? (
    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-50 font-medium text-xs gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
      Active
    </Badge>
  ) : (
    <Badge className="bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-100 font-medium text-xs gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
      Deactivated
    </Badge>
  )
}

/* ─── Add Clinic Modal ───────────────────────────────────────── */
function AddClinicModal({ open, onClose }) {
  const [form, setForm] = useState({ clinicName: '', adminEmail: '', npi: '', tin: '', ehr: '' })
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[560px] p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-7 pt-6 pb-5 border-b border-slate-100">
          <DialogTitle className="text-[17px] font-bold text-slate-900 tracking-tight">Add New Clinic</DialogTitle>
          <DialogDescription className="text-[13px] text-slate-500 mt-0.5">
            Fill in the details to register and invite a new clinic admin.
          </DialogDescription>
        </DialogHeader>

        <div className="px-7 py-5 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Clinic Name <span className="text-red-500">*</span></label>
            <Input placeholder="e.g. Sunrise Family Health" value={form.clinicName}
              onChange={e => set('clinicName', e.target.value)}
              className="h-10 text-sm rounded-lg border-slate-200 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB]" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Admin Email <span className="text-red-500">*</span></label>
            <Input type="email" placeholder="admin@clinicname.com" value={form.adminEmail}
              onChange={e => set('adminEmail', e.target.value)}
              className="h-10 text-sm rounded-lg border-slate-200 focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB]" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">NPI Number <span className="text-red-500">*</span></label>
            <Input placeholder="10-digit NPI" maxLength={10} value={form.npi}
              onChange={e => set('npi', e.target.value)}
              className="h-10 text-sm rounded-lg border-slate-200 font-mono focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB]" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">TIN Number <span className="text-red-500">*</span></label>
            <Input placeholder="XX-XXXXXXX" value={form.tin}
              onChange={e => set('tin', e.target.value)}
              className="h-10 text-sm rounded-lg border-slate-200 font-mono focus-visible:ring-[#2563EB]/20 focus-visible:border-[#2563EB]" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Clinic Logo <span className="text-slate-400 font-normal">(optional)</span></label>
            <label className="h-10 flex items-center justify-center gap-2 border border-dashed border-slate-200 rounded-lg cursor-pointer text-[13px] text-slate-400 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors bg-slate-50 hover:bg-blue-50/30">
              <Upload size={14} />
              Upload logo
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Connect EHR <span className="text-slate-400 font-normal">(optional)</span></label>
            <Select value={form.ehr} onValueChange={v => set('ehr', v)}>
              <SelectTrigger className="h-10 text-sm rounded-lg border-slate-200 focus:ring-[#2563EB]/20 focus:border-[#2563EB]">
                <SelectValue placeholder="Select EHR System" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {EHR_OPTIONS.map(opt => (
                  <SelectItem key={opt} value={opt.toLowerCase()} className="text-sm">{opt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="px-7 py-4 border-t border-slate-100 flex-row justify-end gap-2">
          <Button variant="outline" onClick={onClose}
            className="rounded-[5px] h-9 px-5 text-sm border-slate-200 text-slate-600">
            Cancel
          </Button>
          <Button onClick={onClose}
            className="rounded-[5px] h-9 px-5 text-sm gap-2"
            style={{ background: BRAND }}>
            <Plus size={14} />
            Add Clinic &amp; Invite Admin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function ClinicManagementV2() {
  const navigate = useNavigate()

  const [tab,       setTab]       = useState('active')
  const [search,    setSearch]    = useState('')
  const [page,      setPage]      = useState(1)
  const [showModal, setShowModal] = useState(false)

  const filtered = ALL_CLINICS.filter(
    c => c.status === tab && c.name.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages      = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE))
  const paginated       = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)
  const activeCount     = ALL_CLINICS.filter(c => c.status === 'active').length
  const deactivatedCount = ALL_CLINICS.filter(c => c.status === 'deactivated').length

  function handleTabChange(val) { setTab(val); setPage(1); setSearch('') }
  function handleSearch(e)      { setSearch(e.target.value); setPage(1)  }

  return (
    <div style={{ minHeight: '100vh', background: PAGE_BG, fontFamily: 'Inter, system-ui, sans-serif' }}>

      <TopNav />

      <main style={{ width: '100%', padding: '36px 25px', boxSizing: 'border-box' }}>

        {/* ── Page Header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 4px', lineHeight: 1.2 }}>
              Clinic Management
            </h1>
            <p style={{ fontSize: 14, color: '#64748B', margin: 0, lineHeight: 1.5 }}>
              Manage registered clinics, care teams, and EHR integrations.
            </p>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="rounded-[5px] h-10 px-5 text-[13.5px] font-semibold gap-2"
            style={{ background: BRAND, boxShadow: '0 4px 14px rgba(37,99,235,0.22)' }}
          >
            <Plus size={15} strokeWidth={2.5} />
            Add New Clinic
          </Button>
        </div>

        {/* ── Controls row: Pill Switcher + Search ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>

          {/* Pill Switcher */}
          <div style={{
            display: 'inline-flex',
            background: '#F1F5F9',
            borderRadius: 10,
            padding: 4,
            gap: 3,
          }}>
            {[
              { val: 'active',      label: 'Active Clinics',      count: activeCount      },
              { val: 'deactivated', label: 'Deactivated Clinics', count: deactivatedCount },
            ].map(t => {
              const isActive = tab === t.val
              return (
                <button
                  key={t.val}
                  onClick={() => handleTabChange(t.val)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '7px 16px', borderRadius: 7, border: 'none',
                    fontSize: 13.5, fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif',
                    transition: 'all 0.18s ease',
                    background:  isActive ? '#ffffff' : 'transparent',
                    color:       isActive ? BRAND     : '#64748B',
                    boxShadow:   isActive ? '0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  {t.label}
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    padding: '2px 7px', borderRadius: 999, lineHeight: '16px',
                    background: isActive ? BRAND : 'rgba(100,116,139,0.12)',
                    color:      isActive ? '#fff' : '#64748B',
                  }}>
                    {t.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search */}
          <div className="relative" style={{ width: 288 }}>
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <Input
              placeholder="Search by Clinic Name"
              value={search}
              onChange={handleSearch}
              className="pl-8 h-9 text-[13.5px] rounded-[5px] border-slate-200 bg-white focus-visible:ring-[#2563EB]/15 focus-visible:border-[#2563EB]"
            />
          </div>
        </div>

        {/* ── Table Card ── */}
        <div style={{
          background: '#ffffff',
          borderRadius: 16,
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        }}>
          <Table>
            <TableHeader>
              <TableRow style={{ background: PAGE_BG }} className="border-slate-100 hover:bg-[#F8FAFF]">
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider pl-6">Clinic</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">NPI Number</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">TIN Number</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Admin Email</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Users</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Patients</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginated.length > 0 ? paginated.map(clinic => (
                <TableRow
                  key={clinic.id}
                  className="border-slate-100 hover:bg-slate-50/60 transition-colors cursor-pointer"
                  onClick={() => navigate(`/clinic-management/${clinic.id}`)}
                >
                  {/* Clinic */}
                  <TableCell className="pl-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 rounded-xl flex-shrink-0">
                        <AvatarFallback
                          className="rounded-xl text-[12px] font-bold"
                          style={{ background: clinic.color + '22', color: clinic.color, border: `1.5px solid ${clinic.color}33` }}
                        >
                          {clinic.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[13.5px] font-semibold text-slate-800">{clinic.name}</span>
                    </div>
                  </TableCell>

                  {/* NPI */}
                  <TableCell className="py-3.5">
                    <span className="text-[13px] text-slate-500 font-mono">{clinic.npi}</span>
                  </TableCell>

                  {/* TIN */}
                  <TableCell className="py-3.5">
                    <span className="text-[13px] text-slate-500 font-mono">{clinic.tin}</span>
                  </TableCell>

                  {/* Admin Email */}
                  <TableCell className="py-3.5">
                    <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
                      <Mail size={12} className="text-slate-400 flex-shrink-0" />
                      {clinic.adminEmail}
                    </div>
                  </TableCell>

                  {/* Users */}
                  <TableCell className="py-3.5">
                    <div className="flex items-center gap-1.5 text-[13.5px] font-medium text-slate-700">
                      <Users size={13} className="text-slate-400" />
                      {clinic.linkedUsers}
                    </div>
                  </TableCell>

                  {/* Patients */}
                  <TableCell className="py-3.5 text-[13.5px] font-medium text-slate-700">
                    {clinic.patients.toLocaleString()}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="py-3.5">
                    <StatusBadge status={clinic.status} />
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="py-3.5 pr-6 text-right" onClick={e => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"
                          className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5 shadow-lg shadow-slate-200/80 border-slate-200">
                        {clinic.status === 'active' ? (
                          <>
                            <DropdownMenuItem className="rounded-lg text-[13px] gap-2.5 py-2 cursor-pointer">
                              <Pencil size={13} className="text-slate-400" /> Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg text-[13px] gap-2.5 py-2 cursor-pointer">
                              <Mail size={13} className="text-slate-400" /> Change Admin Email
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg text-[13px] gap-2.5 py-2 cursor-pointer">
                              <Users size={13} className="text-slate-400" /> Manage Users
                            </DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg text-[13px] gap-2.5 py-2 cursor-pointer">
                              <Link2 size={13} className="text-slate-400" /> Manage EHR Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1.5 bg-slate-100" />
                            <DropdownMenuItem className="rounded-lg text-[13px] gap-2.5 py-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                              <SlashSquare size={13} /> Deactivate Clinic
                            </DropdownMenuItem>
                          </>
                        ) : (
                          <DropdownMenuItem className="rounded-lg text-[13px] gap-2.5 py-2 cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50">
                            <RefreshCw size={13} /> Reactivate Clinic
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={8} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                      <Search size={32} strokeWidth={1.25} className="opacity-40" />
                      <p className="text-[14px] font-medium text-slate-500">No clinics found</p>
                      <p className="text-[13px]">
                        {search ? 'Try a different search term' : 'Add a new clinic to get started'}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {filtered.length > ROWS_PER_PAGE && (
            <>
              <Separator className="bg-slate-100" />
              <div className="flex items-center justify-between px-6 py-3">
                <p className="text-[12.5px] text-slate-500">
                  Showing{' '}
                  <span className="font-medium text-slate-700">
                    {(page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, filtered.length)}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium text-slate-700">{filtered.length}</span> clinics
                </p>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline" size="icon"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="h-8 w-8 rounded-[5px] border-slate-200 text-slate-500 disabled:opacity-40"
                  >
                    <ChevronLeft size={15} />
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <Button
                      key={n}
                      variant={n === page ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setPage(n)}
                      className={`h-8 w-8 rounded-[5px] text-[13px] font-medium ${n === page ? 'shadow-none' : 'text-slate-500 hover:text-slate-800'}`}
                      style={n === page ? { background: BRAND } : {}}
                    >
                      {n}
                    </Button>
                  ))}

                  <Button
                    variant="outline" size="icon"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="h-8 w-8 rounded-[5px] border-slate-200 text-slate-500 disabled:opacity-40"
                  >
                    <ChevronRight size={15} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

      </main>

      <AddClinicModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
