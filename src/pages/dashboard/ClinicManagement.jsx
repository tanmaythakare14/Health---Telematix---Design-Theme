import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, MoreHorizontal, Pencil, Mail, Users, Link2, SlashSquare, RefreshCw, X, Upload, ChevronLeft, ChevronRight } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

import { ALL_CLINICS } from '../../data/clinics'

const ROWS_PER_PAGE = 8
const EHR_OPTIONS = ['Epic', 'Cerner / Oracle Health', 'athenahealth', 'eClinicalWorks', 'Allscripts', 'MEDITECH', 'NextGen']

/* ── Status Badge ────────────────────────────────────────────── */
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

/* ── Add Clinic Modal ────────────────────────────────────────── */
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
          {/* Clinic Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Clinic Name <span className="text-red-500">*</span></label>
            <Input placeholder="e.g. Sunrise Family Health" value={form.clinicName} onChange={e => set('clinicName', e.target.value)} className="h-10 text-sm rounded-lg border-slate-200 focus-visible:ring-[#1F3A5F]/20 focus-visible:border-[#1F3A5F]" />
          </div>

          {/* Admin Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Admin Email <span className="text-red-500">*</span></label>
            <Input type="email" placeholder="admin@clinicname.com" value={form.adminEmail} onChange={e => set('adminEmail', e.target.value)} className="h-10 text-sm rounded-lg border-slate-200 focus-visible:ring-[#1F3A5F]/20 focus-visible:border-[#1F3A5F]" />
          </div>

          {/* NPI */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">NPI Number <span className="text-red-500">*</span></label>
            <Input placeholder="10-digit NPI" maxLength={10} value={form.npi} onChange={e => set('npi', e.target.value)} className="h-10 text-sm rounded-lg border-slate-200 font-mono focus-visible:ring-[#1F3A5F]/20 focus-visible:border-[#1F3A5F]" />
          </div>

          {/* TIN */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">TIN Number <span className="text-red-500">*</span></label>
            <Input placeholder="XX-XXXXXXX" value={form.tin} onChange={e => set('tin', e.target.value)} className="h-10 text-sm rounded-lg border-slate-200 font-mono focus-visible:ring-[#1F3A5F]/20 focus-visible:border-[#1F3A5F]" />
          </div>

          {/* Clinic Logo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Clinic Logo <span className="text-slate-400 font-normal">(optional)</span></label>
            <label className="h-10 flex items-center justify-center gap-2 border border-dashed border-slate-200 rounded-lg cursor-pointer text-[13px] text-slate-400 hover:border-[#1F3A5F] hover:text-[#1F3A5F] transition-colors bg-slate-50 hover:bg-blue-50/30">
              <Upload size={14} />
              Upload logo
              <input type="file" accept="image/*" className="hidden" />
            </label>
          </div>

          {/* EHR */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-slate-700">Connect EHR <span className="text-slate-400 font-normal">(optional)</span></label>
            <Select value={form.ehr} onValueChange={v => set('ehr', v)}>
              <SelectTrigger className="h-10 text-sm rounded-lg border-slate-200 focus:ring-[#1F3A5F]/20 focus:border-[#1F3A5F]">
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
          <Button onClick={onClose} className="rounded-[5px] h-9 px-5 text-sm gap-2" style={{ background: '#1F3A5F' }}>
            <Plus size={14} />
            Add Clinic &amp; Invite Admin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function ClinicManagement() {
  const navigate = useNavigate()
  const [tab, setTab]           = useState('active')
  const [search, setSearch]     = useState('')
  const [page, setPage]         = useState(1)
  const [showModal, setShowModal] = useState(false)

  const filtered = ALL_CLINICS.filter(
    c => c.status === tab && c.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE))
  const paginated  = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)

  const activeCount      = ALL_CLINICS.filter(c => c.status === 'active').length
  const deactivatedCount = ALL_CLINICS.filter(c => c.status === 'deactivated').length

  function handleTabChange(val) {
    setTab(val)
    setPage(1)
    setSearch('')
  }

  function handleSearch(e) {
    setSearch(e.target.value)
    setPage(1)
  }

  return (
    <DashboardLayout pageTitle="Clinic Management">

      {/* ── Section 1: Page Header ── */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-[22px] font-bold text-slate-900 tracking-tight leading-tight">Clinic Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage registered clinics, care teams, and EHR integrations.</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="rounded-[5px] h-10 px-5 text-[13.5px] font-semibold gap-2 shadow-sm shadow-[#1F3A5F]/20 hover:shadow-md hover:shadow-[#1F3A5F]/25 transition-shadow"
          style={{ background: '#1F3A5F' }}
        >
          <Plus size={15} strokeWidth={2.5} />
          Add New Clinic
        </Button>
      </div>

      {/* ── Section 2: Tabs + Search ── */}
      <div className="flex items-end justify-between mb-5 border-b border-slate-200">
        <Tabs value={tab} onValueChange={handleTabChange}>
          <TabsList className="bg-transparent p-0 rounded-none h-auto gap-0">
            <TabsTrigger
              value="active"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1F3A5F] data-[state=active]:text-[#1F3A5F] data-[state=active]:font-semibold text-slate-500 px-5 pb-3 pt-1 text-[13.5px] bg-transparent shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent -mb-px"
            >
              Active Clinics
              <span className="ml-2 bg-slate-100 text-slate-500 data-[state=active]:bg-[#1F3A5F] data-[state=active]:text-white text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: tab === 'active' ? '#1F3A5F' : undefined, color: tab === 'active' ? 'white' : undefined }}>
                {activeCount}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="deactivated"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#1F3A5F] data-[state=active]:text-[#1F3A5F] data-[state=active]:font-semibold text-slate-500 px-5 pb-3 pt-1 text-[13.5px] bg-transparent shadow-none data-[state=active]:shadow-none data-[state=active]:bg-transparent -mb-px"
            >
              Deactivated Clinics
              <span className="ml-2 text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: tab === 'deactivated' ? '#1F3A5F' : '#f1f5f9', color: tab === 'deactivated' ? 'white' : '#64748b' }}>
                {deactivatedCount}
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search */}
        <div className="relative w-80 mb-2.5">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <Input
            placeholder="Search by Clinic Name"
            value={search}
            onChange={handleSearch}
            className="pl-8 h-9 text-[13.5px] rounded-[5px] border-slate-200 focus-visible:ring-[#1F3A5F]/15 focus-visible:border-[#1F3A5F] bg-white"
          />
        </div>
      </div>

      {/* ── Section 3: Table ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/80 border-slate-200 hover:bg-slate-50/80">
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
            {paginated.length > 0 ? paginated.map((clinic) => (
              <TableRow
                key={clinic.id}
                className="border-slate-100 hover:bg-slate-50/80 transition-colors cursor-pointer"
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
                  <span className="text-[13px] text-slate-500">{clinic.npi}</span>
                </TableCell>

                {/* TIN */}
                <TableCell className="py-3.5">
                  <span className="text-[13px] text-slate-500">{clinic.tin}</span>
                </TableCell>

                {/* Admin Email */}
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
                    <Mail size={12} className="text-slate-400 flex-shrink-0" />
                    {clinic.adminEmail}
                  </div>
                </TableCell>

                {/* Linked Users */}
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
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
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
                    <p className="text-[13px]">{search ? 'Try a different search term' : 'Add a new clinic to get started'}</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* ── Pagination ── */}
        {filtered.length > ROWS_PER_PAGE && (
          <>
            <Separator className="bg-slate-100" />
            <div className="flex items-center justify-between px-6 py-3">
              <p className="text-[12.5px] text-slate-500">
                Showing <span className="font-medium text-slate-700">{(page - 1) * ROWS_PER_PAGE + 1}–{Math.min(page * ROWS_PER_PAGE, filtered.length)}</span> of <span className="font-medium text-slate-700">{filtered.length}</span> clinics
              </p>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
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
                    style={n === page ? { background: '#1F3A5F' } : {}}
                  >
                    {n}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
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

      {/* ── Modal ── */}
      <AddClinicModal open={showModal} onClose={() => setShowModal(false)} />

    </DashboardLayout>
  )
}
