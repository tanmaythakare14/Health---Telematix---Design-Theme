import { useState } from 'react'
import {
  Search, Lock, Bot, Activity, HeartPulse, Weight,
  Users, Clock, ChevronDown, Pill, ShieldAlert,
} from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'

/* ─── Design tokens (V1 Classic Navy) ───────────────────────── */
const NAVY     = '#1F3A5F'
const NAVY_MED = '#2D4F7C'
const NAVY_LT  = '#EBF1FA'
const NAVY_XLT = '#F5F8FC'
const FF       = 'Inter, system-ui, sans-serif'

/* ─── Sender config ──────────────────────────────────────────── */
const SENDER = {
  patient:   { bg: '#F0F6FF', border: '#BFDBFE', label: 'Patient',       dot: '#3B82F6', avatarBg: '#DBEAFE', avatarColor: '#1D4ED8', textColor: '#1E40AF' },
  ai:        { bg: '#FAF5FF', border: '#E9D5FF', label: 'AI Agent',      dot: '#7C3AED', avatarBg: '#EDE9FE', avatarColor: '#6D28D9', textColor: '#5B21B6' },
  nurse:     { bg: '#F0FDF4', border: '#BBF7D0', label: 'Virtual Nurse', dot: '#16A34A', avatarBg: '#DCFCE7', avatarColor: '#15803D', textColor: '#166534' },
  physician: { bg: '#FFFBEB', border: '#FDE68A', label: 'Physician',     dot: '#D97706', avatarBg: '#FEF3C7', avatarColor: '#B45309', textColor: '#92400E' },
}

/* ─── Mock sessions ──────────────────────────────────────────── */
const SESSIONS = [
  {
    id: 1,
    patient: {
      name: 'Emma Rodriguez', initials: 'ER', color: '#2563EB',
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
      onCall: { name: 'Sara Alvarez, RN', role: 'Virtual Nurse', initials: 'SA' },
    },
    preview: "Thank you, Dr. Carter. I'll be available at 3 PM.",
    time: '10:18 AM', date: 'Today', unread: 2,
    participants: ['Patient', 'AI Agent', 'Virtual Nurse', 'Physician'],
    messages: [
      { id: 1, sender: 'patient',   name: 'Emma Rodriguez',   time: '9:30 AM',  text: 'Good morning. My blood pressure reading this morning was 148/92. Should I be concerned?' },
      { id: 2, sender: 'ai',        name: 'AI Health Agent',  time: '9:31 AM',  text: 'Good morning, Emma. A reading of 148/92 is elevated above your target range of 130/80. I have noted this in your record and alerted your care team. Can you confirm you have taken your morning medications?' },
      { id: 3, sender: 'patient',   name: 'Emma Rodriguez',   time: '9:32 AM',  text: 'Yes, I took my lisinopril at 8 AM as scheduled.' },
      { id: 4, sender: 'ai',        name: 'AI Health Agent',  time: '9:33 AM',  text: 'Thank you. I have escalated this to your nurse for review. Please avoid strenuous activity until you hear back from your care team.' },
      { id: 5, sender: 'nurse',     name: 'Sara Alvarez, RN', time: '9:45 AM',  text: 'Hi Emma, I reviewed your reading. Since you have taken your medication, let us monitor for the next hour. If your systolic stays above 150 mmHg, please call us immediately.' },
      { id: 6, sender: 'patient',   name: 'Emma Rodriguez',   time: '9:50 AM',  text: 'Okay, I will check again at 10:30. Should I also reduce my salt intake today?' },
      { id: 7, sender: 'nurse',     name: 'Sara Alvarez, RN', time: '9:52 AM',  text: 'Absolutely. Keep sodium under 1,500 mg today and stay well hydrated. I will follow up after your 10:30 reading.' },
      { id: 8, sender: 'physician', name: 'Dr. James Carter', time: '10:15 AM', text: 'Emma, I reviewed your readings and the nurse notes. Your lisinopril dosage may need a small adjustment. I will schedule a follow-up call for this afternoon at 3 PM to discuss next steps.' },
      { id: 9, sender: 'patient',   name: 'Emma Rodriguez',   time: '10:18 AM', text: 'Thank you, Dr. Carter. I will be available at 3 PM.' },
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
      onCall: { name: 'Thomas Wu, RN', role: 'Virtual Nurse', initials: 'TW' },
    },
    preview: 'I will cut back on carbs at dinner. Thanks.',
    time: '8:14 AM', date: 'Today', unread: 0,
    participants: ['Patient', 'AI Agent', 'Virtual Nurse'],
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
      onCall: { name: 'Sara Alvarez, RN', role: 'Virtual Nurse', initials: 'SA' },
    },
    preview: 'I will stay on bed rest and call if it gets worse.',
    time: 'Yesterday', date: 'Yesterday', unread: 0,
    participants: ['Patient', 'AI Agent', 'Virtual Nurse', 'Physician'],
    messages: [
      { id: 1, sender: 'patient',   name: 'Linda Foster',     time: 'Yest. 7:00 PM', text: 'I gained 2 pounds since this morning and I am feeling short of breath when I climb the stairs.' },
      { id: 2, sender: 'ai',        name: 'AI Health Agent',  time: 'Yest. 7:01 PM', text: 'Linda, a 2 lb gain in one day combined with shortness of breath can be a sign of fluid retention. I have urgently alerted your nurse and physician. Are you experiencing any chest pain or dizziness?' },
      { id: 3, sender: 'patient',   name: 'Linda Foster',     time: 'Yest. 7:03 PM', text: 'No chest pain, just the shortness of breath when moving around.' },
      { id: 4, sender: 'nurse',     name: 'Sara Alvarez, RN', time: 'Yest. 7:12 PM', text: 'Linda, I am escalating this to Dr. Carter right now. Please rest in a seated position and avoid any exertion. Take your evening Furosemide if you have not yet.' },
      { id: 5, sender: 'physician', name: 'Dr. James Carter', time: 'Yest. 7:30 PM', text: 'Linda, this looks like mild fluid overload. I am increasing your Furosemide temporarily to 80 mg for the next 48 hours. If symptoms worsen — increased breathlessness, chest pain, or weight above 166 lbs — go to the ER immediately.' },
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
      onCall: { name: 'Marcus Patel', role: 'Health Navigator', initials: 'MP' },
    },
    preview: 'I tracked my meals this week. Down 1.2 lbs.',
    time: '2 days ago', date: 'Apr 15', unread: 0,
    participants: ['Patient', 'Virtual Nurse', 'Physician'],
    messages: [
      { id: 1, sender: 'patient',   name: 'James Whitmore',   time: 'Apr 15, 10:00 AM', text: 'I tracked all my meals this week and stayed under 1,800 calories every day. I am down 1.2 lbs since last Monday.' },
      { id: 2, sender: 'nurse',     name: 'Sara Alvarez, RN', time: 'Apr 15, 10:20 AM', text: 'James, that is great progress! Keep it up. Are you tolerating the Ozempic injection well?' },
      { id: 3, sender: 'patient',   name: 'James Whitmore',   time: 'Apr 15, 10:25 AM', text: 'Yes, mild nausea for the first couple of hours but it goes away. Much better than the first few weeks.' },
      { id: 4, sender: 'physician', name: 'Dr. James Carter', time: 'Apr 15, 11:00 AM', text: 'Excellent work, James. The nausea typically settles within 4–6 weeks. I will review your A1C and lipid panel results when they come in next week.' },
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
      onCall: { name: 'Sara Alvarez, RN', role: 'Virtual Nurse', initials: 'SA' },
    },
    preview: 'Understood. I will go in for the ECG tomorrow morning.',
    time: '3 days ago', date: 'Apr 14', unread: 0,
    participants: ['Patient', 'AI Agent', 'Virtual Nurse', 'Physician'],
    messages: [
      { id: 1, sender: 'patient',   name: 'Patricia Lee',     time: 'Apr 14, 2:00 PM', text: 'My heart has been racing since this morning and I feel very fatigued. My monitor shows 112 bpm at rest.' },
      { id: 2, sender: 'ai',        name: 'AI Health Agent',  time: 'Apr 14, 2:01 PM', text: 'Patricia, a resting heart rate of 112 bpm with fatigue warrants prompt attention for someone with AFib. I have alerted your care team immediately. Are you also experiencing any chest discomfort, dizziness, or difficulty breathing?' },
      { id: 3, sender: 'patient',   name: 'Patricia Lee',     time: 'Apr 14, 2:03 PM', text: 'Mild dizziness but no chest pain. I took my Apixaban this morning.' },
      { id: 4, sender: 'nurse',     name: 'Sara Alvarez, RN', time: 'Apr 14, 2:15 PM', text: 'Patricia, thank you for reporting promptly. I am looping in Dr. Carter now. Please sit down, rest, and avoid any physical exertion. If dizziness worsens or you experience chest pain, call 911 immediately.' },
      { id: 5, sender: 'physician', name: 'Dr. James Carter', time: 'Apr 14, 2:40 PM', text: 'Patricia, this may be a rate-control episode. I want you to get an urgent ECG tomorrow morning at the clinic. I am also increasing your Metoprolol to 37.5 mg starting tonight. Call us if anything changes.' },
      { id: 6, sender: 'patient',   name: 'Patricia Lee',     time: 'Apr 14, 2:45 PM', text: 'Understood. I will go in for the ECG tomorrow morning.' },
    ],
  },
]

/* ─── Sender Avatar ──────────────────────────────────────────── */
function SenderAvatar({ sender, name }) {
  const cfg = SENDER[sender]
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div style={{
      width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
      background: cfg.avatarBg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11.5, fontWeight: 700, color: cfg.avatarColor, fontFamily: FF,
    }}>
      {sender === 'ai' ? <Bot size={15} style={{ color: cfg.avatarColor }} /> : initials}
    </div>
  )
}

/* ─── Sender Tag ─────────────────────────────────────────────── */
function SenderTag({ sender }) {
  const cfg = SENDER[sender]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 10, fontWeight: 700, fontFamily: FF,
      color: cfg.textColor, background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      padding: '2px 7px', borderRadius: 999,
      textTransform: 'uppercase', letterSpacing: '0.04em',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
      {cfg.label}
    </span>
  )
}

/* ─── Message Bubble ─────────────────────────────────────────── */
function MessageBubble({ msg, showDivider }) {
  const cfg = SENDER[msg.sender]
  return (
    <>
      {showDivider && <div style={{ height: 1, background: '#EEF2F8', margin: '2px 20px' }} />}
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 22px' }}>
        <SenderAvatar sender={msg.sender} name={msg.name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', fontFamily: FF }}>{msg.name}</span>
            <SenderTag sender={msg.sender} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 7 }}>
            <Clock size={10} style={{ color: '#CBD5E1' }} />
            <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: FF }}>{msg.time}</span>
          </div>
          <div style={{
            background: cfg.bg, border: `1px solid ${cfg.border}`,
            borderRadius: '3px 12px 12px 12px',
            padding: '10px 14px',
            fontSize: 13.5, lineHeight: 1.65, color: '#1E293B',
            fontFamily: FF, maxWidth: '82%',
          }}>
            {msg.text}
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Vital Icon ─────────────────────────────────────────────── */
function VitalIcon({ label }) {
  const l = label.toLowerCase()
  if (l.includes('pressure')) return <Activity size={13} style={{ color: NAVY }}    />
  if (l.includes('heart'))    return <HeartPulse size={13} style={{ color: '#E11D48' }} />
  if (l.includes('glucose'))  return <Activity size={13} style={{ color: '#7C3AED' }} />
  return <Weight size={13} style={{ color: '#0891B2' }} />
}

/* ─── Collapsible Section ────────────────────────────────────── */
function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid #EEF2F8' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '11px 16px', background: 'none', border: 'none', cursor: 'pointer',
      }}>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: NAVY, textTransform: 'uppercase', letterSpacing: '0.09em', fontFamily: FF }}>
          {title}
        </span>
        <ChevronDown size={13} style={{ color: '#94A3B8', transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.15s', flexShrink: 0 }} />
      </button>
      {open && <div style={{ padding: '0 16px 14px' }}>{children}</div>}
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function MessagesV1() {
  const [selectedId, setSelectedId] = useState(1)
  const [search, setSearch]         = useState('')

  const session   = SESSIONS.find(s => s.id === selectedId)
  const { patient } = session
  const filtered  = SESSIONS.filter(s =>
    s.patient.name.toLowerCase().includes(search.toLowerCase())
  )
  const totalUnread = SESSIONS.reduce((n, s) => n + s.unread, 0)

  return (
    <DashboardLayout pageTitle="Messages" pageSubtitle="Team communication and patient messaging">
      {/* Negate dash-page padding and fill the remaining viewport */}
      <div style={{
        margin: '-32px',
        height: 'calc(100vh - 80px)',
        display: 'flex',
        overflow: 'hidden',
        fontFamily: FF,
      }}>

        {/* ══ LEFT — Conversation List ════════════════════════ */}
        <div style={{
          flex: '0 0 25%', minWidth: 0,
          background: '#ffffff',
          borderRight: '1px solid #E6EBF4',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Panel header */}
          <div style={{ padding: '18px 16px 13px', borderBottom: '1px solid #EEF2F8' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div>
                <h2 style={{ fontSize: 14.5, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: FF, letterSpacing: '-0.01em' }}>Conversations</h2>
                <p style={{ fontSize: 11.5, color: '#94A3B8', margin: '2px 0 0', fontFamily: FF }}>Admin read-only view</p>
              </div>
              {totalUnread > 0 && (
                <span style={{ fontSize: 11, fontWeight: 700, background: NAVY, color: '#fff', padding: '3px 9px', borderRadius: 999, fontFamily: FF }}>
                  {totalUnread} new
                </span>
              )}
            </div>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F5F7FA', borderRadius: 8, padding: '7px 11px', border: '1.5px solid #E6EBF4' }}>
              <Search size={13} style={{ color: '#94A3B8', flexShrink: 0 }} />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search patients…"
                style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 12.5, color: '#374151', fontFamily: FF, width: '100%' }}
              />
            </div>
          </div>

          {/* Conversation list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.map(s => {
              const active = s.id === selectedId
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedId(s.id)}
                  style={{
                    width: '100%', textAlign: 'left', display: 'flex', gap: 10,
                    alignItems: 'flex-start', padding: '12px 16px',
                    borderLeft: `3px solid ${active ? NAVY : 'transparent'}`,
                    background: active ? NAVY_LT : 'transparent',
                    border: 'none', borderLeft: `3px solid ${active ? NAVY : 'transparent'}`,
                    borderBottom: '1px solid #F3F6FB',
                    cursor: 'pointer', transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = NAVY_XLT }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                    background: s.patient.color + '18', border: `1.5px solid ${s.patient.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, color: s.patient.color, fontFamily: FF,
                  }}>
                    {s.patient.initials}
                  </div>
                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', fontFamily: FF, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>
                        {s.patient.name}
                      </span>
                      <span style={{ fontSize: 10.5, color: '#94A3B8', fontFamily: FF, flexShrink: 0, marginLeft: 6 }}>{s.time}</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 4px', fontFamily: FF, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {s.preview}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10.5, color: active ? NAVY : '#94A3B8', background: active ? '#D8E8F8' : '#F1F5F9', padding: '1px 7px', borderRadius: 999, fontFamily: FF }}>
                        {s.patient.condition}
                      </span>
                      {s.unread > 0 && (
                        <span style={{ fontSize: 10, fontWeight: 700, background: NAVY, color: '#fff', minWidth: 18, height: 18, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px', fontFamily: FF }}>
                          {s.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ══ MIDDLE — Chat History ═══════════════════════════ */}
        <div style={{ flex: '0 0 50%', minWidth: 0, display: 'flex', flexDirection: 'column', background: '#F8FAFD' }}>
          {/* Chat header */}
          <div style={{
            height: 64, flexShrink: 0,
            background: '#ffffff', borderBottom: '1px solid #E6EBF4',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                background: patient.color + '18', border: `1.5px solid ${patient.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: patient.color, fontFamily: FF,
              }}>
                {patient.initials}
              </div>
              <div>
                <h2 style={{ fontSize: 14.5, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: FF }}>{patient.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11.5, color: '#64748B', fontFamily: FF }}>{patient.condition}</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#CBD5E1', flexShrink: 0 }} />
                  <Users size={11} style={{ color: '#94A3B8' }} />
                  <span style={{ fontSize: 11.5, color: '#64748B', fontFamily: FF }}>{session.participants.length} participants:</span>
                  <span style={{ fontSize: 11.5, color: '#94A3B8', fontFamily: FF }}>{session.participants.join(' · ')}</span>
                </div>
              </div>
            </div>
            {/* Read-only badge */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: NAVY_LT, border: `1px solid #C3D5EC`,
              borderRadius: 999, padding: '6px 14px', flexShrink: 0,
            }}>
              <Lock size={12} style={{ color: NAVY }} />
              <span style={{ fontSize: 11.5, fontWeight: 600, color: NAVY, fontFamily: FF, whiteSpace: 'nowrap' }}>Read-Only Access</span>
            </div>
          </div>

          {/* Date / count bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#E6EBF4' }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', fontFamily: FF, whiteSpace: 'nowrap' }}>
              {session.date} · {session.messages.length} messages
            </span>
            <div style={{ flex: 1, height: 1, background: '#E6EBF4' }} />
          </div>

          {/* Messages scroll area */}
          <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }}>
            {session.messages.map((msg, i) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                showDivider={i > 0 && session.messages[i - 1].sender !== msg.sender}
              />
            ))}
          </div>

          {/* Read-only footer */}
          <div style={{
            padding: '11px 24px',
            background: '#ffffff', borderTop: '1px solid #E6EBF4',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Lock size={13} style={{ color: '#94A3B8', flexShrink: 0 }} />
            <span style={{ fontSize: 12.5, color: '#94A3B8', fontFamily: FF, lineHeight: 1.5 }}>
              You are viewing this conversation in <strong style={{ color: '#64748B' }}>read-only</strong> mode. Only the assigned care team can send messages.
            </span>
          </div>
        </div>

        {/* ══ RIGHT — Patient Context ══════════════════════════ */}
        <div style={{
          flex: '0 0 25%', minWidth: 0,
          background: '#ffffff', borderLeft: '1px solid #E6EBF4',
          display: 'flex', flexDirection: 'column',
          overflowY: 'auto',
        }}>
          {/* Patient identity header */}
          <div style={{ background: NAVY, padding: '18px 16px 16px', position: 'sticky', top: 0, zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: FF,
              }}>
                {patient.initials}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0, fontFamily: FF, lineHeight: 1.25 }}>{patient.name}</p>
                <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.65)', margin: '2px 0 0', fontFamily: FF }}>{patient.condition}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {[`${patient.age} yrs`, patient.gender, `EHR ${patient.ehrId}`, `DOB ${patient.dob}`].map((tag, i) => (
                <span key={i} style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.70)', background: 'rgba(255,255,255,0.12)', padding: '3px 8px', borderRadius: 999, fontFamily: FF }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Active Alerts */}
          {patient.alerts.length > 0 && (
            <Section title={`Active Alerts · ${patient.alerts.length}`} defaultOpen>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {patient.alerts.map((a, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 8, alignItems: 'flex-start',
                    background: a.level === 'high' ? '#FFF5F5' : '#FFFBEB',
                    border: `1px solid ${a.level === 'high' ? '#FCA5A5' : '#FDE68A'}`,
                    borderRadius: 8, padding: '8px 10px',
                  }}>
                    <ShieldAlert size={13} style={{ color: a.level === 'high' ? '#DC2626' : '#D97706', flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 12, lineHeight: 1.5, color: a.level === 'high' ? '#991B1B' : '#92400E', fontFamily: FF }}>{a.text}</span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Latest Vitals */}
          <Section title="Latest Vitals" defaultOpen>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {patient.vitals.map((v, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 10px', borderRadius: 8,
                  background: v.alert ? '#FFF5F5' : '#F8FAFC',
                  border: `1px solid ${v.alert ? '#FCA5A5' : '#EEF2F8'}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <VitalIcon label={v.label} />
                    <span style={{ fontSize: 12, color: '#64748B', fontFamily: FF }}>{v.label}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: v.alert ? '#DC2626' : '#0F172A', margin: 0, fontFamily: FF }}>
                      {v.value} <span style={{ fontSize: 10.5, fontWeight: 500, color: '#94A3B8' }}>{v.unit}</span>
                    </p>
                    <p style={{ fontSize: 10.5, color: '#94A3B8', margin: '1px 0 0', fontFamily: FF }}>{v.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Active Medications */}
          <Section title={`Active Medications · ${patient.medications.length}`} defaultOpen>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {patient.medications.map((med, i) => (
                <div key={i} style={{ display: 'flex', gap: 9, alignItems: 'flex-start', padding: '8px 10px', background: '#F8FAFC', borderRadius: 8, border: '1px solid #EEF2F8' }}>
                  <Pill size={13} style={{ color: NAVY, flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A', margin: 0, fontFamily: FF }}>{med.name}</p>
                    <p style={{ fontSize: 11.5, color: '#64748B', margin: '2px 0 0', fontFamily: FF }}>{med.dose} · {med.freq}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* On-Call Participant */}
          <Section title="On-Call Participant" defaultOpen>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', background: NAVY_XLT, borderRadius: 8, border: `1px solid ${NAVY_LT}` }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                background: NAVY_LT, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: NAVY, fontFamily: FF,
              }}>
                {patient.onCall.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: 0, fontFamily: FF }}>{patient.onCall.name}</p>
                <p style={{ fontSize: 11.5, color: '#64748B', margin: '1px 0 0', fontFamily: FF }}>{patient.onCall.role}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontSize: 10.5, color: '#10B981', fontWeight: 600, fontFamily: FF }}>Online</span>
              </div>
            </div>
          </Section>

          {/* Active Programs */}
          <Section title="Active Programs" defaultOpen>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {patient.programs.map((prog, i) => (
                <span key={i} style={{ fontSize: 12, fontWeight: 700, color: NAVY, background: NAVY_LT, border: `1px solid #C3D5EC`, padding: '5px 14px', borderRadius: 999, fontFamily: FF }}>
                  {prog}
                </span>
              ))}
            </div>
          </Section>

          {/* Conversation Thread Summary */}
          <Section title="Conversation Thread" defaultOpen>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {session.participants.map((p, i) => {
                const key  = p === 'AI Agent' ? 'ai' : p === 'Virtual Nurse' ? 'nurse' : p === 'Physician' ? 'physician' : 'patient'
                const cfg  = SENDER[key]
                const msgs = session.messages.filter(m => m.sender === key).length
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '7px 10px', background: '#F8FAFC', borderRadius: 8, border: '1px solid #EEF2F8',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.dot, flexShrink: 0 }} />
                      <span style={{ fontSize: 12.5, fontWeight: 500, color: '#374151', fontFamily: FF }}>{p}</span>
                    </div>
                    <span style={{ fontSize: 11.5, color: '#94A3B8', fontFamily: FF }}>{msgs} msg{msgs !== 1 ? 's' : ''}</span>
                  </div>
                )
              })}
            </div>
          </Section>

          <div style={{ flex: 1, minHeight: 20 }} />
        </div>

      </div>
    </DashboardLayout>
  )
}
