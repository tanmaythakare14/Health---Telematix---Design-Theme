import { useParams, Link, useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { ALL_CLINICS } from '../../data/clinics'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  ChevronRight, Pencil, Users, Link2, SlashSquare, RefreshCw,
  Phone, Mail, Building2, Hash, CreditCard, Wifi, UserCircle2,
  ArrowLeft, TrendingUp, TrendingDown, Trash2, UserPlus,
} from 'lucide-react'

/* ── Helpers ────────────────────────────────────────────────── */

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

function StatCard({ label, sublabel, value, color, icon, trend }) {
  const isUp = trend?.up

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col gap-5">

      {/* Top: label block + icon */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[14px] font-semibold text-slate-800 leading-snug">{label}</p>
          <p className="text-[12px] text-slate-400 mt-0.5">{sublabel}</p>
        </div>
        <div
          className="h-9 w-9 rounded-[8px] flex items-center justify-center shrink-0"
          style={{ background: color + '15', color }}
        >
          {icon}
        </div>
      </div>

      {/* Middle: numeric value */}
      <p className="text-[32px] font-bold text-slate-900 tracking-tight leading-none">
        {value.toLocaleString()}
      </p>

      {/* Bottom: trend vs last year */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 text-[12px] font-semibold px-2 py-0.5 rounded-md ${
            isUp
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-red-50 text-red-500'
          }`}
        >
          {isUp
            ? <TrendingUp size={12} strokeWidth={2.25} />
            : <TrendingDown size={12} strokeWidth={2.25} />
          }
          {isUp ? '+' : '-'}{trend?.pct}%
        </span>
        <span className="text-[12px] text-slate-400">vs last year</span>
      </div>

    </div>
  )
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
        <span className="text-slate-300">{icon}</span>
        {label}
      </p>
      <p className="text-[14px] font-medium text-slate-800 leading-snug">{value || '—'}</p>
    </div>
  )
}

/* ── Main Page ──────────────────────────────────────────────── */

export default function ClinicDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const clinic = ALL_CLINICS.find(c => c.id === Number(id))

  /* 404 state */
  if (!clinic) {
    return (
      <DashboardLayout pageTitle="Not Found">
        <div className="flex flex-col items-center justify-center py-40 gap-4 text-slate-400">
          <Building2 size={40} strokeWidth={1.25} className="opacity-40" />
          <p className="text-[15px] font-medium text-slate-500">Clinic not found</p>
          <Button
            onClick={() => navigate('/clinic-management')}
            className="rounded-[5px] h-9 px-5 text-[13px]"
            style={{ background: '#1F3A5F' }}
          >
            Back to Clinic Management
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  const isActive = clinic.status === 'active'

  return (
    <DashboardLayout pageTitle={clinic.name}>

      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-1.5 text-[13px] mb-6 text-slate-500">
        <Link
          to="/clinic-management"
          className="flex items-center gap-1 hover:text-[#1F3A5F] transition-colors font-medium"
        >
          <ArrowLeft size={13} className="shrink-0" />
          Clinic Management
        </Link>
        <ChevronRight size={13} className="text-slate-300 shrink-0" />
        <span className="text-slate-800 font-medium truncate">{clinic.name}</span>
      </nav>

      {/* ── Clinic Header Card ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-6 py-5 mb-5">
        <div className="flex items-center justify-between gap-6 flex-wrap">

          {/* Identity */}
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 rounded-xl shrink-0">
              <AvatarFallback
                className="rounded-xl text-[16px] font-bold"
                style={{
                  background: clinic.color + '20',
                  color: clinic.color,
                  border: `2px solid ${clinic.color}30`,
                }}
              >
                {clinic.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <h1 className="text-[19px] font-bold text-slate-900 tracking-tight leading-none">
                  {clinic.name}
                </h1>
                <StatusBadge status={clinic.status} />
              </div>
              <div className="flex items-center gap-5 text-[12.5px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Phone size={12} className="text-slate-400" />
                  {clinic.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail size={12} className="text-slate-400" />
                  {clinic.adminEmail}
                </span>
                {clinic.ehr && (
                  <span className="flex items-center gap-1.5">
                    <Wifi size={12} className="text-slate-400" />
                    {clinic.ehr}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {isActive ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-[5px] h-9 px-4 gap-2 text-[13px] border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <Pencil size={13} />
                  Edit Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-[5px] h-9 px-4 gap-2 text-[13px] border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <Users size={13} />
                  Manage Users
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-[5px] h-9 px-4 gap-2 text-[13px] border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  <Link2 size={13} />
                  Manage EHR
                </Button>
                <Button
                  size="sm"
                  className="rounded-[5px] h-9 px-4 gap-2 text-[13px] bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 shadow-none"
                >
                  <SlashSquare size={13} />
                  Deactivate
                </Button>
              </>
            ) : (
              <>
                <p className="text-[12.5px] text-slate-400 mr-1">
                  Deactivated on <span className="font-medium text-slate-500">{clinic.deactivatedOn}</span>
                </p>
                <Button
                  size="sm"
                  className="rounded-[5px] h-9 px-4 gap-2 text-[13px] bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 shadow-none"
                >
                  <RefreshCw size={13} />
                  Reactivate Clinic
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Section 1: Stats ── */}
      <div className="mb-2">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-3 px-0.5">
          Overview
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-5">
          <StatCard
            label="Onboarded Patients"
            sublabel="Total patients enrolled"
            value={clinic.patients}
            color="#4F8EF7"
            trend={clinic.trends?.patients}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            }
          />
          <StatCard
            label="Patients Under APCM"
            sublabel="Advanced primary care mgmt."
            value={clinic.apcm}
            color="#10B981"
            trend={clinic.trends?.apcm}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            }
          />
          <StatCard
            label="Patients Under RPM"
            sublabel="Remote patient monitoring"
            value={clinic.rpm}
            color="#A78BFA"
            trend={clinic.trends?.rpm}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
              </svg>
            }
          />
        </div>
      </div>

      {/* ── Section 2: Clinic Details ── */}
      <div className="flex flex-col gap-4 mb-2">
        <h2 className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest px-0.5">
          Clinic Details
        </h2>

        {/* ── Clinic Information Card ── */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
            <h3 className="text-[13.5px] font-semibold text-slate-800">Clinic Information</h3>
            <p className="text-[12px] text-slate-400 mt-0.5">Registration, identifiers and contact details</p>
          </div>
          <div className="px-6 py-5 grid grid-cols-3 gap-x-10 gap-y-5">
            <DetailRow icon={<Building2 size={12} />} label="Clinic Name"       value={clinic.name} />
            <DetailRow icon={<Phone size={12} />}     label="Phone Number"      value={clinic.phone} />
            <DetailRow icon={<Mail size={12} />}      label="Clinic Email"      value={clinic.adminEmail} />
            <DetailRow icon={<Hash size={12} />}      label="NPI Number"        value={clinic.npi} />
            <DetailRow icon={<CreditCard size={12} />}label="TIN Number"        value={clinic.tin} />
            <DetailRow icon={<Wifi size={12} />}      label="Connected EHR"     value={clinic.ehr} />
          </div>

          <Separator className="bg-slate-100" />

          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
            <h3 className="text-[13.5px] font-semibold text-slate-800">Administration</h3>
            <p className="text-[12px] text-slate-400 mt-0.5">Primary clinic admin and contact</p>
          </div>
          <div className="px-6 py-5 grid grid-cols-3 gap-x-10 gap-y-5">
            <DetailRow icon={<UserCircle2 size={12} />} label="Clinic Admin Name"    value={clinic.clinicAdminName} />
            <DetailRow icon={<Mail size={12} />}         label="Admin Email Address"  value={clinic.adminEmail} />
          </div>
        </div>

        {/* ── Linked Users Card ── */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
            <div>
              <h3 className="text-[13.5px] font-semibold text-slate-800">Linked Users</h3>
              <p className="text-[12px] text-slate-400 mt-0.5">
                {clinic.linkedUsers} users assigned to this clinic
              </p>
            </div>
            <Button
              size="sm"
              className="rounded-[5px] h-9 px-4 gap-2 text-[13px]"
              style={{ background: '#1F3A5F' }}
            >
              <UserPlus size={13} />
              Add User
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 border-slate-200 hover:bg-slate-50/80">
                <TableHead className="pl-6 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">User</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Role</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Email Address</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Phone Number</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Added On</TableHead>
                <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clinic.linkedUsersList.map((user, i) => (
                <TableRow key={i} className="border-slate-100 hover:bg-slate-50/60 transition-colors">

                  {/* User — avatar + name */}
                  <TableCell className="pl-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-8 w-8 rounded-[7px] flex items-center justify-center text-[11px] font-bold shrink-0"
                        style={{ background: '#1F3A5F14', color: '#1F3A5F' }}
                      >
                        {user.initials}
                      </div>
                      <span className="text-[13.5px] font-semibold text-slate-800">{user.name}</span>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell className="py-3.5">
                    <span className="text-[13px] text-slate-600">{user.role}</span>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="py-3.5">
                    <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
                      <Mail size={12} className="text-slate-300 shrink-0" />
                      {user.email}
                    </div>
                  </TableCell>

                  {/* Phone */}
                  <TableCell className="py-3.5">
                    <div className="flex items-center gap-1.5 text-[13px] text-slate-500">
                      <Phone size={12} className="text-slate-300 shrink-0" />
                      {user.phone}
                    </div>
                  </TableCell>

                  {/* Added On */}
                  <TableCell className="py-3.5 text-[13px] text-slate-500">
                    {user.addedOn}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="py-3.5 pr-6 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-[5px] text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>

                </TableRow>
              ))}

              {/* Overflow hint row */}
              {clinic.linkedUsers > clinic.linkedUsersList.length && (
                <TableRow className="border-slate-100 hover:bg-slate-50/40">
                  <TableCell colSpan={6} className="pl-6 py-3 text-[12.5px] text-[#1F3A5F] font-semibold">
                    <button className="hover:underline">
                      +{clinic.linkedUsers - clinic.linkedUsersList.length} more users — view all
                    </button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

      </div>

    </DashboardLayout>
  )
}
