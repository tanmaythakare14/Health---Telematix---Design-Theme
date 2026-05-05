import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Plus, MoreHorizontal, Pencil, Mail, Users,
  Link2, SlashSquare, RefreshCw, Upload,
  Bell, ChevronDown, ChevronLeft, ChevronRight,
} from 'lucide-react'
import SidebarV5, { NAV_W, COLLAPSED_W } from '../../components/layout/SidebarV5'
import { Button }   from '@/components/ui/Button'
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
const TEAL            = '#0D9488'
const GRADIENT        = 'linear-gradient(135deg, #1F3A5F 0%, #0D9488 100%)'
const GRADIENT_SHADOW = '0 4px 16px rgba(31,58,95,0.28)'
const PAGE_BG         = '#FAFAF9'
const FF              = 'Inter, system-ui, sans-serif'

const ROWS_PER_PAGE = 8
const EHR_OPTIONS   = ['Epic', 'Cerner / Oracle Health', 'athenahealth', 'eClinicalWorks', 'Allscripts', 'MEDITECH', 'NextGen']


/* ─── Top Bar ────────────────────────────────────────────────── */
function TopBar({ title, subtitle }) {
  return (
    <div style={{
      height: 80, background: '#ffffff',
      borderBottom: '1px solid #E8EDF2',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky', top: 0, zIndex: 30,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <h1 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: FF, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 12.5, color: '#94A3B8', margin: 0, fontFamily: FF, lineHeight: 1.3 }}>{subtitle}</p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ position: 'relative', width: 38, height: 38, borderRadius: 9, border: '1px solid #E2E8F0', background: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
          <Bell size={17} />
          <span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', border: '1.5px solid white' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '5px 8px', borderRadius: 8, cursor: 'pointer', transition: 'background 0.15s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, #14B8A6, ${TEAL})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>SM</div>
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
          {[
            { key: 'clinicName', label: 'Clinic Name',   req: true,  placeholder: 'e.g. Sunrise Family Health', type: 'text'  },
            { key: 'adminEmail', label: 'Admin Email',   req: true,  placeholder: 'admin@clinicname.com',       type: 'email' },
            { key: 'npi',        label: 'NPI Number',    req: true,  placeholder: '10-digit NPI',               type: 'text'  },
            { key: 'tin',        label: 'TIN Number',    req: true,  placeholder: 'XX-XXXXXXX',                 type: 'text'  },
          ].map(f => (
            <div key={f.key} className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-700">
                {f.label} {f.req && <span className="text-red-500">*</span>}
              </label>
              <Input type={f.type} placeholder={f.placeholder} value={form[f.key]}
                onChange={e => set(f.key, e.target.value)}
                className="h-10 text-sm rounded-lg border-slate-200" />
            </div>
          ))}

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Clinic Logo <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <label className="h-10 flex items-center justify-center gap-2 border border-dashed border-slate-200 rounded-lg cursor-pointer text-[13px] text-slate-400 hover:text-[#0D9488] hover:border-[#0D9488] transition-colors bg-slate-50">
              <Upload size={14} /> Upload logo
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">
              Connect EHR <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <Select value={form.ehr} onValueChange={v => set('ehr', v)}>
              <SelectTrigger className="h-10 text-sm rounded-lg border-slate-200">
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
          <Button variant="outline" onClick={onClose} className="rounded-[5px] h-9 px-5 text-sm border-slate-200 text-slate-600">
            Cancel
          </Button>
          {/* CTA — gradient */}
          <Button
            onClick={onClose}
            className="rounded-[5px] h-9 px-5 text-sm gap-2"
            style={{ background: GRADIENT, boxShadow: GRADIENT_SHADOW }}
          >
            <Plus size={14} /> Add Clinic &amp; Invite Admin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function ClinicManagementV5() {
  const navigate = useNavigate()

  const [navCollapsed, setNavCollapsed] = useState(false)
  const [tab,          setTab]          = useState('active')
  const [search,    setSearch]    = useState('')
  const [page,      setPage]      = useState(1)
  const [showModal, setShowModal] = useState(false)

  const filtered         = ALL_CLINICS.filter(c => c.status === tab && c.name.toLowerCase().includes(search.toLowerCase()))
  const totalPages       = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE))
  const paginated        = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)
  const activeCount      = ALL_CLINICS.filter(c => c.status === 'active').length
  const deactivatedCount = ALL_CLINICS.filter(c => c.status === 'deactivated').length

  function handleTabChange(val) { setTab(val); setPage(1); setSearch('') }
  function handleSearch(e)      { setSearch(e.target.value); setPage(1) }

  return (
    <div style={{ minHeight: '100vh', background: PAGE_BG, fontFamily: FF, display: 'flex' }}>

      <SidebarV5 active="clinic-management" collapsed={navCollapsed} onToggle={() => setNavCollapsed(o => !o)} />

      {/* Main area */}
      <div style={{ marginLeft: navCollapsed ? COLLAPSED_W : NAV_W, flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, transition: 'margin-left 0.22s ease' }}>

        <TopBar title="Clinic Management" subtitle="Manage registered clinics, care teams, and EHR integrations" />

        <main style={{ padding: '28px 28px', flex: 1 }}>

          {/* ── Page Header ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Pill Switcher */}
              <div style={{ display: 'inline-flex', background: '#F1F5F9', borderRadius: 10, padding: 4, gap: 3 }}>
                {[
                  { val: 'active',      label: 'Active',      count: activeCount      },
                  { val: 'deactivated', label: 'Deactivated', count: deactivatedCount },
                ].map(t => {
                  const isActive = tab === t.val
                  return (
                    <button
                      key={t.val}
                      onClick={() => handleTabChange(t.val)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 7,
                        padding: '7px 16px', borderRadius: 7, border: 'none',
                        fontSize: 13, fontWeight: isActive ? 600 : 500,
                        cursor: 'pointer', fontFamily: FF,
                        transition: 'all 0.18s',
                        background: isActive ? '#ffffff' : 'transparent',
                        color:      isActive ? '#1F3A5F' : '#64748B',
                        boxShadow:  isActive ? '0 1px 3px rgba(0,0,0,0.10)' : 'none',
                      }}
                    >
                      {t.label}
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        padding: '2px 7px', borderRadius: 999, lineHeight: '16px',
                        background: isActive ? GRADIENT : 'rgba(100,116,139,0.12)',
                        color:      isActive ? '#fff'   : '#64748B',
                      }}>{t.count}</span>
                    </button>
                  )
                })}
              </div>

              {/* Search */}
              <div className="relative" style={{ width: 260 }}>
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <Input
                  placeholder="Search clinics…"
                  value={search}
                  onChange={handleSearch}
                  className="pl-8 h-9 text-[13px] rounded-[8px] border-slate-200 bg-white"
                />
              </div>
            </div>

            {/* CTA — gradient */}
            <Button
              onClick={() => setShowModal(true)}
              className="rounded-[8px] h-9 px-5 text-[13px] font-semibold gap-2"
              style={{ background: GRADIENT, boxShadow: GRADIENT_SHADOW }}
            >
              <Plus size={14} strokeWidth={2.5} />
              Add New Clinic
            </Button>
          </div>

          {/* ── Table Card ── */}
          <div style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #E8EDF2',
            boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}>
            <Table>
              <TableHeader>
                <TableRow style={{ background: PAGE_BG }} className="border-slate-100 hover:bg-[#FAFAF9]">
                  <TableHead className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider pl-6">Clinic</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">NPI Number</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">TIN Number</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Admin Email</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Users</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Patients</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginated.length > 0 ? paginated.map(clinic => (
                  <TableRow
                    key={clinic.id}
                    className="border-slate-100 hover:bg-slate-50/60 transition-colors cursor-pointer"
                    onClick={() => navigate(`/clinic-management/${clinic.id}`)}
                  >
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 rounded-xl flex-shrink-0">
                          <AvatarFallback
                            className="rounded-xl text-[12px] font-bold"
                            style={{ background: clinic.color + '18', color: clinic.color, border: `1.5px solid ${clinic.color}30` }}
                          >
                            {clinic.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-[13.5px] font-semibold text-slate-800">{clinic.name}</span>
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <span className="text-[13px] text-slate-500">{clinic.npi}</span>
                    </TableCell>

                    <TableCell className="py-4">
                      <span className="text-[13px] text-slate-500">{clinic.tin}</span>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
                        <Mail size={12} className="text-slate-400 flex-shrink-0" />
                        {clinic.adminEmail}
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="flex items-center gap-1.5 text-[13.5px] font-medium text-slate-700">
                        <Users size={13} className="text-slate-400" />
                        {clinic.linkedUsers}
                      </div>
                    </TableCell>

                    <TableCell className="py-4 text-[13.5px] font-medium text-slate-700">
                      {clinic.patients.toLocaleString()}
                    </TableCell>

                    <TableCell className="py-4">
                      <StatusBadge status={clinic.status} />
                    </TableCell>

                    <TableCell className="py-4 pr-6 text-right" onClick={e => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon"
                            className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5 shadow-lg border-slate-200">
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
                        <p className="text-[13px]">{search ? 'Try a different search term' : 'Add a new clinic to get started'}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {filtered.length > ROWS_PER_PAGE && (
              <>
                <Separator className="bg-slate-100" />
                <div className="flex items-center justify-between px-6 py-3">
                  <p className="text-[12.5px] text-slate-500">
                    Showing{' '}
                    <span className="font-medium text-slate-700">
                      {(page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, filtered.length)}
                    </span>{' '}
                    of <span className="font-medium text-slate-700">{filtered.length}</span> clinics
                  </p>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="h-8 w-8 rounded-[5px] border-slate-200 text-slate-500 disabled:opacity-40">
                      <ChevronLeft size={15} />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                      <Button key={n}
                        variant={n === page ? 'default' : 'ghost'}
                        size="icon"
                        onClick={() => setPage(n)}
                        className={`h-8 w-8 rounded-[5px] text-[13px] font-medium ${n === page ? 'shadow-none' : 'text-slate-500 hover:text-slate-800'}`}
                        style={n === page ? { background: GRADIENT } : {}}>
                        {n}
                      </Button>
                    ))}
                    <Button variant="outline" size="icon"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="h-8 w-8 rounded-[5px] border-slate-200 text-slate-500 disabled:opacity-40">
                      <ChevronRight size={15} />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      <AddClinicModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
