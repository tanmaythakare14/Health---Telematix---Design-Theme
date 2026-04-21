import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Lock, Bot, AlertCircle, Pill, Activity, HeartPulse,
  UserCheck, MessageSquare, Edit3, Bell, LogOut,
} from 'lucide-react'

/* ─── Design tokens ──────────────────────────────────────────── */
const BRAND    = '#2563EB'
const BRAND_LT = '#EFF6FF'
const PAGE_BG  = '#F8FAFF'
const SURFACE  = '#FFFFFF'
const BORDER   = '#E2E8F0'
const TEXT     = '#0F172A'
const MUTED    = '#64748B'
const FF       = 'Inter, system-ui, sans-serif'
const TOPBAR_H = 64

/* ─── Sender config ──────────────────────────────────────────── */
const SENDER = {
  patient:   { bg: BRAND,     text: '#ffffff', label: 'Patient',       dot: BRAND,     avatar: '#DBEAFE', avatarText: BRAND     },
  ai:        { bg: '#F5F3FF', text: '#3B0764', label: 'AI Agent',      dot: '#7C3AED', avatar: '#EDE9FE', avatarText: '#7C3AED' },
  nurse:     { bg: '#F0FDF4', text: '#14532D', label: 'Virtual Nurse', dot: '#16A34A', avatar: '#DCFCE7', avatarText: '#16A34A' },
  physician: { bg: '#FFFBEB', text: '#78350F', label: 'Physician',     dot: '#D97706', avatar: '#FEF3C7', avatarText: '#B45309' },
}

/* ─── Mock sessions ──────────────────────────────────────────── */
const SESSIONS = [
  {
    id: 1,
    patient: {
      name: 'Emma Rodriguez', initials: 'ER', color: BRAND,
      age: 54, dob: 'Mar 12, 1970', gender: 'Female',
      ehrId: 'PT-10042', condition: 'Hypertension',
      programs: ['APCM', 'RPM'],
      vitals: [
        { label: 'Blood Pressure', value: '148 / 92', unit: 'mmHg', time: 'Today, 9:30 AM', alert: true  },
        { label: 'Heart Rate',     value: '78',        unit: 'bpm',  time: 'Today, 9:30 AM', alert: false },
        { label: 'Weight',         value: '172',       unit: 'lbs',  time: 'Yesterday',      alert: false },
      ],
      alerts: [
        { level: 'high',   text: 'BP above target — 148/92 recorded today' },
        { level: 'medium', text: 'Medication adherence review due this week' },
      ],
      medications: [
        { name: 'Lisinopril', dose: '10 mg', freq: 'Once daily (AM)' },
        { name: 'Amlodipine', dose: '5 mg',  freq: 'Once daily (PM)' },
      ],
      onCall: { name: 'Sara Alvarez, RN', role: 'Virtual Nurse', initials: 'SA', color: '#16A34A' },
    },
    preview: "Thank you, Dr. Carter. I'll be available at 3 PM.",
    time: '10:18 AM', date: 'Today', unread: 2,
    messages: [
      { id: 1, sender: 'patient',   name: 'Emma Rodriguez',   time: '9:30 AM',  text: 'Good morning. My blood pressure reading this morning was 148/92. Should I be concerned?' },
      { id: 2, sender: 'ai',        name: 'AI Health Agent',  time: '9:31 AM',  text: 'Good morning, Emma. A reading of 148/92 is elevated above your target range of 130/80. I have noted this in your record and alerted your care team. Can you confirm you have taken your morning medications?' },
      { id: 3, sender: 'patient',   name: 'Emma Rodriguez',   time: '9:32 AM',  text: 'Yes, I took my lisinopril at 8 AM as scheduled.' },
      { id: 4, sender: 'ai',        name: 'AI Health Agent',  time: '9:33 AM',  text: 'Thank you. I have escalated this to your nurse for review. Please avoid strenuous activity until you hear back from your care team.' },
      { id: 5, sender: 'nurse',     name: 'Sara Alvarez, RN', time: '9:45 AM',  text: 'Hi Emma, I reviewed your reading. Since you have taken your medication, let us monitor for the next hour. If your systolic stays above 150 mmHg, please call us immediately.' },
      { id: 6, sender: 'patient',   name: 'Emma Rodriguez',   time: '9:50 AM',  text: 'Okay, I will check again at 10:30. Should I also reduce my salt intake today?' },
      { id: 7, sender: 'nurse',     name: 'Sara Alvarez, RN', time: '9:52 AM',  text: 'Absolutely. Keep sodium under 1,500 mg today and stay well hydrated. I will follow up after your 10:30 reading.' },
      { id: 8, sender: 'physician', name: 'Dr. James Carter', time: '10:15 AM', text: 'Emma, I reviewed your readings and the nurse notes. Your lisinopril dosage may need a small adjustment. I will schedule a follow-up call for this afternoon at 3 PM to discuss next steps.' },
      { id: 9, sender: 'patient',   name: 'Emma Rodriguez',   time: '10:18 AM', text: "Thank you, Dr. Carter. I'll be available at 3 PM." },
    ],
  },
  {
    id: 2,
    patient: {
      name: 'Michael Chen', initials: 'MC', color: '#7C3AED',
      age: 61, dob: 'Aug 5, 1963', gender: 'Male',
      ehrId: 'PT-10089', condition: 'Type II Diabetes',
      programs: ['APCM', 'RPM'],
      vitals: [
        { label: 'Glucose (CGM)', value: '214', unit: 'mg/dL', time: 'Today, 7:00 AM', alert: true  },
        { label: 'Heart Rate',    value: '72',  unit: 'bpm',   time: 'Today, 7:00 AM', alert: false },
        { label: 'Weight',        value: '198', unit: 'lbs',   time: 'Yesterday',      alert: false },
      ],
      alerts: [
        { level: 'high', text: 'Glucose spike — 214 mg/dL before breakfast' },
      ],
      medications: [
        { name: 'Metformin', dose: '1000 mg', freq: 'Twice daily with meals' },
        { name: 'Ozempic',   dose: '0.5 mg',  freq: 'Once weekly (injection)' },
      ],
      onCall: { name: 'Thomas Wu, RN', role: 'Virtual Nurse', initials: 'TW', color: '#16A34A' },
    },
    preview: 'I will cut back on carbs at dinner. Thanks.',
    time: '8:14 AM', date: 'Today', unread: 0,
    messages: [
      { id: 1, sender: 'patient', name: 'Michael Chen',    time: '7:02 AM', text: 'My Dexcom showed 214 this morning before breakfast. I did not eat anything unusual last night.' },
      { id: 2, sender: 'ai',      name: 'AI Health Agent', time: '7:03 AM', text: 'Thank you for reporting, Michael. A fasting glucose of 214 mg/dL is above your target of 130. I have flagged this for your nurse and logged the reading. Did you take your Metformin with dinner yesterday?' },
      { id: 3, sender: 'patient', name: 'Michael Chen',    time: '7:05 AM', text: 'Yes I did. Maybe I ate too many carbs at dinner?' },
      { id: 4, sender: 'nurse',   name: 'Thomas Wu, RN',   time: '7:30 AM', text: 'Good morning Michael. I reviewed your overnight CGM data and the spike aligns with a carb-heavy dinner. Take your morning Metformin and do a light 15-minute walk. I will check your mid-morning reading at 10 AM.' },
      { id: 5, sender: 'patient', name: 'Michael Chen',    time: '8:10 AM', text: 'Understood. I will cut back on carbs at dinner. Thanks.' },
    ],
  },
  {
    id: 3,
    patient: {
      name: 'Linda Foster', initials: 'LF', color: '#0891B2',
      age: 68, dob: 'Nov 22, 1956', gender: 'Female',
      ehrId: 'PT-10103', condition: 'Heart Failure',
      programs: ['APCM', 'RPM'],
      vitals: [
        { label: 'Weight',         value: '164',    unit: 'lbs',  time: 'Yest. 8:00 AM', alert: true  },
        { label: 'Blood Pressure', value: '136/84', unit: 'mmHg', time: 'Yesterday',     alert: false },
        { label: 'Heart Rate',     value: '88',     unit: 'bpm',  time: 'Yesterday',     alert: false },
      ],
      alerts: [
        { level: 'high',   text: '2 lb weight gain in 24 hrs — possible fluid retention' },
        { level: 'medium', text: 'Shortness of breath reported yesterday evening' },
      ],
      medications: [
        { name: 'Furosemide', dose: '40 mg',   freq: 'Once daily (AM)' },
        { name: 'Carvedilol', dose: '6.25 mg', freq: 'Twice daily'      },
        { name: 'Lisinopril', dose: '5 mg',    freq: 'Once daily'       },
      ],
      onCall: { name: 'Sara Alvarez, RN', role: 'Virtual Nurse', initials: 'SA', color: '#16A34A' },
    },
    preview: 'I will stay on bed rest and call if it gets worse.',
    time: 'Yesterday', date: 'Yesterday', unread: 0,
    messages: [
      { id: 1, sender: 'patient',   name: 'Linda Foster',     time: 'Yest. 7:00 PM', text: 'I gained 2 pounds since this morning and I am feeling short of breath when I climb the stairs.' },
      { id: 2, sender: 'ai',        name: 'AI Health Agent',  time: 'Yest. 7:01 PM', text: 'Linda, a 2 lb gain in one day combined with shortness of breath can be a sign of fluid retention. I have urgently alerted your nurse and physician. Are you experiencing any chest pain or dizziness?' },
      { id: 3, sender: 'patient',   name: 'Linda Foster',     time: 'Yest. 7:03 PM', text: 'No chest pain, just the shortness of breath when moving around.' },
      { id: 4, sender: 'nurse',     name: 'Sara Alvarez, RN', time: 'Yest. 7:12 PM', text: 'Linda, I am escalating this to Dr. Carter right now. Please rest and avoid any exertion. Take your evening Furosemide if you have not yet.' },
      { id: 5, sender: 'physician', name: 'Dr. James Carter', time: 'Yest. 7:30 PM', text: 'Linda, this looks like mild fluid overload. I am increasing your Furosemide temporarily to 80 mg for 48 hours. If symptoms worsen, go to the ER immediately.' },
      { id: 6, sender: 'patient',   name: 'Linda Foster',     time: 'Yest. 7:35 PM', text: 'I will stay on bed rest and call if it gets worse. Thank you.' },
    ],
  },
  {
    id: 4,
    patient: {
      name: 'James Whitmore', initials: 'JW', color: '#D97706',
      age: 47, dob: 'Feb 9, 1977', gender: 'Male',
      ehrId: 'PT-10217', condition: 'Obesity',
      programs: ['APCM'],
      vitals: [
        { label: 'Weight',         value: '263',    unit: 'lbs',  time: '2 days ago', alert: false },
        { label: 'Blood Pressure', value: '132/84', unit: 'mmHg', time: '2 days ago', alert: false },
        { label: 'Heart Rate',     value: '76',     unit: 'bpm',  time: '2 days ago', alert: false },
      ],
      alerts: [],
      medications: [
        { name: 'Semaglutide (Ozempic)', dose: '1 mg', freq: 'Once weekly (injection)' },
      ],
      onCall: { name: 'Marcus Patel', role: 'Health Navigator', initials: 'MP', color: '#D97706' },
    },
    preview: 'I tracked my meals this week. Down 1.2 lbs.',
    time: '2 days ago', date: '2 days ago', unread: 0,
    messages: [
      { id: 1, sender: 'patient',   name: 'James Whitmore',   time: 'Apr 15, 10:00 AM', text: 'I tracked all my meals this week and stayed under 1,800 calories every day. I am down 1.2 lbs since last Monday.' },
      { id: 2, sender: 'nurse',     name: 'Sara Alvarez, RN', time: 'Apr 15, 10:20 AM', text: 'Great progress James! Consistent calorie tracking is one of the most effective tools. Are you tolerating the Ozempic injection well?' },
      { id: 3, sender: 'patient',   name: 'James Whitmore',   time: 'Apr 15, 10:25 AM', text: 'Yes, mild nausea for the first couple of hours but it goes away. Much better than the first few weeks.' },
      { id: 4, sender: 'physician', name: 'Dr. James Carter', time: 'Apr 15, 11:00 AM', text: 'Excellent work, James. The nausea typically settles within 4 to 6 weeks. Your trend is on track. I will review your A1C and lipid panel next week.' },
    ],
  },
  {
    id: 5,
    patient: {
      name: 'Patricia Lee', initials: 'PL', color: '#E11D48',
      age: 72, dob: 'Jun 30, 1952', gender: 'Female',
      ehrId: 'PT-10331', condition: 'Atrial Fibrillation',
      programs: ['APCM', 'RPM'],
      vitals: [
        { label: 'Heart Rate',     value: '112',    unit: 'bpm',  time: '3 days ago', alert: true  },
        { label: 'Blood Pressure', value: '142/88', unit: 'mmHg', time: '3 days ago', alert: true  },
        { label: 'Weight',         value: '145',    unit: 'lbs',  time: '3 days ago', alert: false },
      ],
      alerts: [
        { level: 'high', text: 'Irregular heart rate — 112 bpm at rest' },
        { level: 'high', text: 'CHA₂DS₂-VASc score 4 — elevated stroke risk' },
      ],
      medications: [
        { name: 'Apixaban (Eliquis)', dose: '5 mg',  freq: 'Twice daily' },
        { name: 'Metoprolol',         dose: '25 mg', freq: 'Twice daily' },
      ],
      onCall: { name: 'Sara Alvarez, RN', role: 'Virtual Nurse', initials: 'SA', color: '#16A34A' },
    },
    preview: 'Understood. I will go in for the ECG tomorrow morning.',
    time: '3 days ago', date: '3 days ago', unread: 0,
    messages: [
      { id: 1, sender: 'patient',   name: 'Patricia Lee',     time: 'Apr 14, 2:00 PM', text: 'My heart has been racing since this morning and I feel very fatigued. My monitor shows 112 bpm at rest.' },
      { id: 2, sender: 'ai',        name: 'AI Health Agent',  time: 'Apr 14, 2:01 PM', text: 'Patricia, a resting heart rate of 112 bpm with fatigue warrants prompt attention. I have alerted your care team immediately. Are you experiencing any chest discomfort or difficulty breathing?' },
      { id: 3, sender: 'patient',   name: 'Patricia Lee',     time: 'Apr 14, 2:03 PM', text: 'Mild dizziness but no chest pain. I took my Apixaban this morning.' },
      { id: 4, sender: 'nurse',     name: 'Sara Alvarez, RN', time: 'Apr 14, 2:15 PM', text: 'Patricia, I am looping in Dr. Carter now. Please sit down and rest. If dizziness worsens or you get chest pain, call 911 immediately.' },
      { id: 5, sender: 'physician', name: 'Dr. James Carter', time: 'Apr 14, 2:40 PM', text: 'Patricia, this may be a rate-control episode. Since you took your Apixaban, please get an urgent ECG tomorrow morning at the clinic. I am increasing your Metoprolol to 37.5 mg starting tonight.' },
      { id: 6, sender: 'patient',   name: 'Patricia Lee',     time: 'Apr 14, 2:45 PM', text: 'Understood. I will go in for the ECG tomorrow morning.' },
    ],
  },
]

/* ─── Top Navigation ─────────────────────────────────────────── */
function TopNav() {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)

  const NAV_LINKS = [
    { label: 'Dashboard',           active: false, path: null },
    { label: 'Clinic Management',   active: false, path: '/clinic-management' },
    { label: 'Resource Management', active: false, path: null },
    { label: 'Billing Management',  active: false, path: null },
    { label: 'Messages',            active: true,  path: '/messages' },
  ]

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: SURFACE, borderBottom: `1px solid ${BORDER}`, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', height: TOPBAR_H, padding: '0 24px', gap: 0 }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
          <svg width="30" height="30" viewBox="0 0 26 26" fill="none">
            <rect width="26" height="26" rx="7" fill={BRAND_LT}/>
            <path d="M3 13h4l2-5.5 2.5 11 2-7.5 1.5 3.5H23" stroke={BRAND} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 15, fontWeight: 700, color: BRAND, letterSpacing: '-0.02em', fontFamily: FF }}>Health Telematix</span>
        </div>

        <div style={{ width: 1, height: 22, background: BORDER, margin: '0 24px', flexShrink: 0 }} />

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {NAV_LINKS.map(link => (
            <a key={link.label} href="#"
              style={{ padding: '7px 13px', borderRadius: 7, fontSize: 13.5, fontWeight: link.active ? 600 : 500, color: link.active ? BRAND : MUTED, background: link.active ? BRAND_LT : 'transparent', textDecoration: 'none', fontFamily: FF, whiteSpace: 'nowrap', transition: 'background 0.15s, color 0.15s' }}
              onClick={e => { e.preventDefault(); if (link.path) navigate(link.path) }}
              onMouseEnter={e => { if (!link.active) { e.currentTarget.style.background = '#F8FAFF'; e.currentTarget.style.color = TEXT } }}
              onMouseLeave={e => { if (!link.active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = MUTED } }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{ position: 'relative', width: 36, height: 36, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MUTED }}>
            <Bell size={18} />
            <span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', border: '1.5px solid white' }} />
          </button>
          <div style={{ width: 1, height: 22, background: BORDER, margin: '0 4px' }} />
          <div style={{ position: 'relative' }}>
            <div onClick={() => setProfileOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', borderRadius: 10, cursor: 'pointer', background: profileOpen ? BRAND_LT : 'transparent', transition: 'background 0.15s' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: `linear-gradient(135deg, #3B82F6, ${BRAND})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0 }}>SM</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: TEXT, lineHeight: 1, fontFamily: FF }}>Dr. Sarah Mitchell</span>
                <span style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1, fontFamily: FF }}>admin@healthtelematix.com</span>
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 2, transition: 'transform 0.15s', transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            {profileOpen && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => setProfileOpen(false)} />
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: SURFACE, borderRadius: 10, border: `1px solid ${BORDER}`, boxShadow: '0 8px 24px rgba(0,0,0,0.10)', minWidth: 200, zIndex: 100, overflow: 'hidden', fontFamily: FF }}>
                  <div style={{ padding: '12px 14px', borderBottom: `1px solid #F1F5F9` }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: TEXT, margin: 0 }}>Dr. Sarah Mitchell</p>
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
    </header>
  )
}

/* ─── Avatar ─────────────────────────────────────────────────── */
function Avatar({ initials, bg, color, size = 34 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0, background: bg, color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.32, fontWeight: 700, fontFamily: FF }}>
      {initials}
    </div>
  )
}

/* ─── Right-panel section header ─────────────────────────────── */
function SectionHead({ icon, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
      <span style={{ color: BRAND, display: 'flex' }}>{icon}</span>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.09em', fontFamily: FF }}>{title}</span>
    </div>
  )
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function MessagesV2() {
  const [search,   setSearch]   = useState('')
  const [selected, setSelected] = useState(SESSIONS[0])

  const filtered = SESSIONS.filter(s =>
    s.patient.name.toLowerCase().includes(search.toLowerCase())
  )

  const s = selected
  const p = s?.patient
  const panelH = `calc(100vh - ${TOPBAR_H}px)`

  return (
    <div style={{ minHeight: '100vh', background: PAGE_BG, fontFamily: FF, display: 'flex', flexDirection: 'column' }}>
      <TopNav />

      {/* ── 3-panel body ── */}
      <div style={{ display: 'flex', height: panelH, overflow: 'hidden', flex: 1 }}>

        {/* ════ LEFT PANEL 25% ════ */}
        <div style={{ width: '22%', flexShrink: 0, background: SURFACE, borderRight: `1px solid ${BORDER}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Header */}
          <div style={{ padding: '18px 18px 12px', borderBottom: `1px solid ${BORDER}`, flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: TEXT, fontFamily: FF }}>Messages</span>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 7px', borderRadius: 999, background: BRAND, color: '#fff', fontFamily: FF }}>
                  {SESSIONS.reduce((a, s) => a + s.unread, 0) || SESSIONS.length}
                </span>
              </div>
              <button style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${BORDER}`, background: SURFACE, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: MUTED }}
                onMouseEnter={e => { e.currentTarget.style.background = BRAND_LT; e.currentTarget.style.color = BRAND }}
                onMouseLeave={e => { e.currentTarget.style.background = SURFACE; e.currentTarget.style.color = MUTED }}
              >
                <Edit3 size={14} />
              </button>
            </div>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#CBD5E1', pointerEvents: 'none' }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                style={{ width: '100%', height: 36, paddingLeft: 30, paddingRight: 12, border: `1.5px solid ${BORDER}`, borderRadius: 9, fontSize: 13, color: TEXT, background: PAGE_BG, outline: 'none', fontFamily: FF, boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                onFocus={e => e.target.style.borderColor = BRAND}
                onBlur={e => e.target.style.borderColor = BORDER}
              />
            </div>
          </div>

          {/* Session list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.map(session => {
              const isActive = selected?.id === session.id
              return (
                <div
                  key={session.id}
                  onClick={() => setSelected(session)}
                  style={{ padding: '14px 18px', cursor: 'pointer', background: isActive ? BRAND_LT : SURFACE, borderBottom: `1px solid #F1F5F9`, borderLeft: `3px solid ${isActive ? BRAND : 'transparent'}`, transition: 'background 0.12s' }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F8FAFF' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = SURFACE }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    {/* Avatar with unread dot */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <Avatar initials={session.patient.initials} bg={session.patient.color + '18'} color={session.patient.color} size={40} />
                      {session.unread > 0 && (
                        <span style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: '50%', background: BRAND, border: '2px solid white' }} />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                        <span style={{ fontSize: 13.5, fontWeight: 600, color: TEXT, fontFamily: FF, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>{session.patient.name}</span>
                        <span style={{ fontSize: 11, color: MUTED, fontFamily: FF, flexShrink: 0 }}>{session.time}</span>
                      </div>
                      <p style={{ fontSize: 12.5, color: MUTED, margin: '0 0 6px', fontFamily: FF, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.4 }}>{session.preview}</p>
                      <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: session.patient.color + '15', color: session.patient.color, fontFamily: FF }}>{session.patient.condition}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ════ MIDDLE PANEL 50% ════ */}
        <div style={{ width: '56%', flexShrink: 0, display: 'flex', flexDirection: 'column', background: SURFACE, overflow: 'hidden' }}>

          {/* Convo header */}
          <div style={{ padding: '14px 22px', background: SURFACE, borderBottom: `1px solid ${BORDER}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar initials={p?.initials} bg={p?.color + '18'} color={p?.color} size={38} />
              <div>
                <p style={{ fontSize: 14.5, fontWeight: 700, color: TEXT, margin: 0, fontFamily: FF }}>{p?.name}</p>
                <p style={{ fontSize: 12, color: MUTED, margin: '1px 0 0', fontFamily: FF }}>
                  {s?.messages.length} messages &nbsp;·&nbsp; {s?.patient.programs.join(', ')} &nbsp;·&nbsp; {s?.date}
                </p>
              </div>
            </div>
            {/* Participant legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {Object.entries(SENDER).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: val.dot, display: 'inline-block' }} />
                  <span style={{ fontSize: 11, color: MUTED, fontFamily: FF }}>{val.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Messages scroll area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 22px 16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {s?.messages.map((msg, idx) => {
                const isPatient = msg.sender === 'patient'
                const cfg = SENDER[msg.sender]
                const showDate = idx === 0

                return (
                  <div key={msg.id}>
                    {showDate && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{ flex: 1, height: 1, background: BORDER }} />
                        <span style={{ fontSize: 11.5, color: MUTED, fontFamily: FF, fontWeight: 500 }}>{s.date}</span>
                        <div style={{ flex: 1, height: 1, background: BORDER }} />
                      </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 10 }}>
                      {/* Avatar */}
                      <Avatar
                        initials={isPatient ? (p?.initials || 'PT') : msg.sender === 'ai' ? 'AI' : msg.sender === 'nurse' ? p?.onCall?.initials || 'RN' : 'MD'}
                        bg={cfg.avatar}
                        color={cfg.avatarText}
                        size={32}
                      />
                      <div style={{ maxWidth: '65%', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
                        {/* Sender + time */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {msg.sender === 'ai' && <Bot size={11} style={{ color: '#7C3AED' }} />}
                          <span style={{ fontSize: 11.5, fontWeight: 600, color: cfg.dot, fontFamily: FF }}>{msg.name}</span>
                          <span style={{ fontSize: 10.5, color: '#CBD5E1' }}>·</span>
                          <span style={{ fontSize: 11, color: '#CBD5E1', fontFamily: FF }}>{msg.time}</span>
                        </div>
                        {/* Bubble */}
                        <div style={{
                          padding: '10px 15px',
                          borderRadius: '4px 16px 16px 16px',
                          background: cfg.bg,
                          border: `1px solid ${cfg.dot}22`,
                          fontSize: 13.5, color: cfg.text, lineHeight: 1.6, fontFamily: FF,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        }}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Read-only bar */}
          <div style={{ padding: '12px 22px', background: SURFACE, borderTop: `1px solid ${BORDER}`, flexShrink: 0 }}>
            <div style={{ height: 44, borderRadius: 10, background: PAGE_BG, border: `1.5px solid ${BORDER}`, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10 }}>
              <Lock size={14} style={{ color: '#CBD5E1', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#CBD5E1', fontFamily: FF }}>Clinic admins have read-only access — messaging is not available</span>
            </div>
          </div>
        </div>

        {/* ════ RIGHT PANEL 25% ════ */}
        <div style={{ width: '22%', flexShrink: 0, borderLeft: `1px solid ${BORDER}`, background: SURFACE, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

          {/* Patient header */}
          <div style={{ padding: '20px 18px 16px', borderBottom: `1px solid ${BORDER}`, textAlign: 'center' }}>
            <Avatar initials={p?.initials} bg={p?.color + '18'} color={p?.color} size={52} />
            <p style={{ fontSize: 14.5, fontWeight: 700, color: TEXT, margin: '10px 0 3px', fontFamily: FF }}>{p?.name}</p>
            <p style={{ fontSize: 12, color: MUTED, margin: 0, fontFamily: FF }}>{p?.gender} · Age {p?.age} · DOB {p?.dob}</p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
              {p?.programs.map(prog => (
                <span key={prog} style={{ fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 999, background: BRAND_LT, color: BRAND, fontFamily: FF }}>{prog}</span>
              ))}
              <span style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', borderRadius: 999, background: PAGE_BG, color: MUTED, border: `1px solid ${BORDER}`, fontFamily: FF }}>EHR {p?.ehrId}</span>
            </div>
          </div>

          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 22 }}>

            {/* Latest Vitals */}
            <div>
              <SectionHead icon={<Activity size={13}/>} title="Latest Vitals" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {p?.vitals.map((v, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', borderRadius: 9, background: v.alert ? '#FEF2F2' : PAGE_BG, border: `1px solid ${v.alert ? '#FECACA' : BORDER}` }}>
                    <div>
                      <p style={{ fontSize: 11, color: MUTED, margin: 0, fontFamily: FF }}>{v.label}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: v.alert ? '#DC2626' : TEXT, margin: '2px 0 0', fontFamily: FF }}>
                        {v.value} <span style={{ fontSize: 10.5, fontWeight: 400, color: MUTED }}>{v.unit}</span>
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {v.alert && <AlertCircle size={12} style={{ color: '#DC2626', display: 'block', marginLeft: 'auto', marginBottom: 2 }} />}
                      <p style={{ fontSize: 10, color: MUTED, margin: 0, fontFamily: FF }}>{v.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Alerts */}
            {p?.alerts.length > 0 && (
              <div>
                <SectionHead icon={<AlertCircle size={13}/>} title="Active Alerts" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {p.alerts.map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '9px 11px', borderRadius: 9, background: a.level === 'high' ? '#FEF2F2' : '#FFFBEB', border: `1px solid ${a.level === 'high' ? '#FECACA' : '#FDE68A'}` }}>
                      <AlertCircle size={12} style={{ color: a.level === 'high' ? '#DC2626' : '#D97706', flexShrink: 0, marginTop: 1 }} />
                      <p style={{ fontSize: 12, color: a.level === 'high' ? '#991B1B' : '#92400E', margin: 0, lineHeight: 1.5, fontFamily: FF }}>{a.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Medications */}
            <div>
              <SectionHead icon={<Pill size={13}/>} title="Active Medications" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {p?.medications.map((med, i) => (
                  <div key={i} style={{ padding: '9px 12px', borderRadius: 9, background: PAGE_BG, border: `1px solid ${BORDER}` }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: TEXT, margin: 0, fontFamily: FF }}>{med.name}</p>
                    <p style={{ fontSize: 11.5, color: MUTED, margin: '2px 0 0', fontFamily: FF }}>{med.dose} · {med.freq}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* On Call Participant */}
            <div>
              <SectionHead icon={<UserCheck size={13}/>} title="On Call Participant" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 9, background: PAGE_BG, border: `1px solid ${BORDER}` }}>
                <Avatar initials={p?.onCall.initials} bg={p?.onCall.color + '20'} color={p?.onCall.color} size={32} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: TEXT, margin: 0, fontFamily: FF }}>{p?.onCall.name}</p>
                  <p style={{ fontSize: 11.5, color: MUTED, margin: 0, fontFamily: FF }}>{p?.onCall.role}</p>
                </div>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
              </div>
            </div>

            {/* Active Programs */}
            <div>
              <SectionHead icon={<HeartPulse size={13}/>} title="Active Programs" />
              <div style={{ display: 'flex', gap: 8 }}>
                {p?.programs.map(prog => (
                  <div key={prog} style={{ flex: 1, padding: '10px 12px', borderRadius: 9, background: BRAND_LT, border: `1px solid ${BRAND}22`, textAlign: 'center' }}>
                    <p style={{ fontSize: 15, fontWeight: 800, color: BRAND, margin: 0, fontFamily: FF }}>{prog}</p>
                    <p style={{ fontSize: 10.5, color: `${BRAND}99`, margin: '2px 0 0', fontFamily: FF }}>Active</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Conversation Flow */}
            <div>
              <SectionHead icon={<MessageSquare size={13}/>} title="Conversation Flow" />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {[
                  { label: 'Patient',   color: BRAND   },
                  { label: 'AI',        color: '#7C3AED' },
                  { label: 'Nurse',     color: '#16A34A' },
                  { label: 'Physician', color: '#D97706' },
                ].map((node, i, arr) => (
                  <div key={node.label} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? 1 : 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: node.color + '18', border: `1.5px solid ${node.color}40`, color: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, fontFamily: FF }}>
                        {node.label.slice(0, 2)}
                      </div>
                      <span style={{ fontSize: 9.5, color: MUTED, fontFamily: FF, whiteSpace: 'nowrap' }}>{node.label}</span>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, ${node.color}50, ${arr[i + 1].color}50)`, margin: '0 3px', marginBottom: 14 }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
