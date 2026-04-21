import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Building2, Boxes, MessageSquare, Settings,
  Bell, LogOut, ChevronDown, ChevronLeft, ChevronRight, Search, Lock, Bot,
  AlertCircle, Pill, Activity, HeartPulse, Weight,
  Users, UserCheck, Clock,
} from 'lucide-react'

/* ─── Design tokens ──────────────────────────────────────────── */
const TEAL       = '#0D9488'
const TEAL_LT    = '#F0FDFA'
const PAGE_BG    = '#FAFAF9'
const NAV_W      = 240
const COLLAPSED_W = 60
const FF         = 'Inter, system-ui, sans-serif'

/* ─── Sender colour map ──────────────────────────────────────── */
const SENDER = {
  patient:   { bg: '#F0FDFA', border: '#99F6E4', text: '#0F172A', label: 'Patient',      dot: TEAL    },
  ai:        { bg: '#F5F3FF', border: '#DDD6FE', text: '#0F172A', label: 'AI Agent',     dot: '#7C3AED' },
  nurse:     { bg: '#EFF6FF', border: '#BFDBFE', text: '#0F172A', label: 'Virtual Nurse', dot: '#2563EB' },
  physician: { bg: '#F0FDF4', border: '#BBF7D0', text: '#0F172A', label: 'Physician',    dot: '#059669' },
}

/* ─── Mock sessions ──────────────────────────────────────────── */
const SESSIONS = [
  {
    id: 1,
    patient: {
      name: 'Emma Rodriguez', initials: 'ER', color: TEAL,
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
        { name: 'Lisinopril',  dose: '10 mg', freq: 'Once daily (AM)' },
        { name: 'Amlodipine',  dose: '5 mg',  freq: 'Once daily (PM)' },
      ],
      onCall: { name: 'Sara Alvarez, RN', role: 'Virtual Nurse', initials: 'SA', color: '#2563EB' },
    },
    preview: "Thank you, Dr. Carter. I'll be available at 3 PM.",
    time: '10:18 AM',
    date: 'Today',
    unread: 2,
    messages: [
      { id: 1, sender: 'patient',   name: 'Emma Rodriguez',    time: '9:30 AM',  text: 'Good morning. My blood pressure reading this morning was 148/92. Should I be concerned?' },
      { id: 2, sender: 'ai',        name: 'AI Health Agent',   time: '9:31 AM',  text: 'Good morning, Emma. A reading of 148/92 is elevated above your target range of 130/80. I have noted this in your record and alerted your care team. Can you confirm you have taken your morning medications?' },
      { id: 3, sender: 'patient',   name: 'Emma Rodriguez',    time: '9:32 AM',  text: 'Yes, I took my lisinopril at 8 AM as scheduled.' },
      { id: 4, sender: 'ai',        name: 'AI Health Agent',   time: '9:33 AM',  text: 'Thank you. I have escalated this to your nurse for review. Please avoid strenuous activity until you hear back from your care team.' },
      { id: 5, sender: 'nurse',     name: 'Sara Alvarez, RN',  time: '9:45 AM',  text: 'Hi Emma, I reviewed your reading. Since you have taken your medication, let us monitor for the next hour. If your systolic stays above 150 mmHg, please call us immediately.' },
      { id: 6, sender: 'patient',   name: 'Emma Rodriguez',    time: '9:50 AM',  text: 'Okay, I will check again at 10:30. Should I also reduce my salt intake today?' },
      { id: 7, sender: 'nurse',     name: 'Sara Alvarez, RN',  time: '9:52 AM',  text: 'Absolutely. Keep sodium under 1,500 mg today and stay well hydrated. I will follow up after your 10:30 reading.' },
      { id: 8, sender: 'physician', name: 'Dr. James Carter',  time: '10:15 AM', text: 'Emma, I reviewed your readings and the nurse notes. Your lisinopril dosage may need a small adjustment. I will schedule a follow-up call for this afternoon at 3 PM to discuss next steps.' },
      { id: 9, sender: 'patient',   name: 'Emma Rodriguez',    time: '10:18 AM', text: 'Thank you, Dr. Carter. I will be available at 3 PM.' },
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
        { level: 'high',   text: 'Glucose spike — 214 mg/dL before breakfast' },
      ],
      medications: [
        { name: 'Metformin',  dose: '1000 mg', freq: 'Twice daily with meals' },
        { name: 'Ozempic',    dose: '0.5 mg',  freq: 'Once weekly (injection)' },
      ],
      onCall: { name: 'Thomas Wu, RN', role: 'Virtual Nurse', initials: 'TW', color: '#2563EB' },
    },
    preview: 'I will cut back on carbs at dinner. Thanks.',
    time: '8:14 AM',
    date: 'Today',
    unread: 0,
    messages: [
      { id: 1, sender: 'patient',   name: 'Michael Chen',     time: '7:02 AM', text: 'My Dexcom showed 214 this morning before breakfast. I did not eat anything unusual last night.' },
      { id: 2, sender: 'ai',        name: 'AI Health Agent',  time: '7:03 AM', text: 'Thank you for reporting, Michael. A fasting glucose of 214 mg/dL is above your target of 130. I have flagged this for your nurse and logged the reading. Did you take your Metformin with dinner yesterday?' },
      { id: 3, sender: 'patient',   name: 'Michael Chen',     time: '7:05 AM', text: 'Yes I did. Maybe I ate too many carbs at dinner?' },
      { id: 4, sender: 'nurse',     name: 'Thomas Wu, RN',    time: '7:30 AM', text: 'Good morning Michael. I reviewed your overnight CGM data and the spike aligns with a carb-heavy dinner. For now, take your morning Metformin and do a light 15-minute walk. I will check your mid-morning reading at 10 AM.' },
      { id: 5, sender: 'patient',   name: 'Michael Chen',     time: '8:10 AM', text: 'Understood. I will cut back on carbs at dinner. Thanks.' },
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
        { label: 'Weight',        value: '164', unit: 'lbs', time: 'Yesterday, 8:00 AM', alert: true  },
        { label: 'Blood Pressure',value: '136/84', unit: 'mmHg', time: 'Yesterday',      alert: false },
        { label: 'Heart Rate',    value: '88',  unit: 'bpm', time: 'Yesterday',          alert: false },
      ],
      alerts: [
        { level: 'high',   text: '2 lb weight gain in 24 hours — possible fluid retention' },
        { level: 'medium', text: 'Shortness of breath reported yesterday evening' },
      ],
      medications: [
        { name: 'Furosemide',  dose: '40 mg', freq: 'Once daily (AM)' },
        { name: 'Carvedilol',  dose: '6.25 mg', freq: 'Twice daily' },
        { name: 'Lisinopril',  dose: '5 mg',  freq: 'Once daily' },
      ],
      onCall: { name: 'Sara Alvarez, RN', role: 'Virtual Nurse', initials: 'SA', color: '#2563EB' },
    },
    preview: 'I will stay on bed rest and call if it gets worse.',
    time: 'Yesterday',
    date: 'Yesterday',
    unread: 0,
    messages: [
      { id: 1, sender: 'patient',   name: 'Linda Foster',     time: 'Yest. 7:00 PM', text: 'I gained 2 pounds since this morning and I am feeling short of breath when I climb the stairs.' },
      { id: 2, sender: 'ai',        name: 'AI Health Agent',  time: 'Yest. 7:01 PM', text: 'Linda, a 2 lb gain in one day combined with shortness of breath can be a sign of fluid retention. I have urgently alerted your nurse and physician. Are you experiencing any chest pain or dizziness?' },
      { id: 3, sender: 'patient',   name: 'Linda Foster',     time: 'Yest. 7:03 PM', text: 'No chest pain, just the shortness of breath when moving around.' },
      { id: 4, sender: 'nurse',     name: 'Sara Alvarez, RN', time: 'Yest. 7:12 PM', text: 'Linda, I am escalating this to Dr. Carter right now. In the meantime, please rest in a seated or semi-reclined position and avoid any exertion. Take your evening Furosemide if you have not yet.' },
      { id: 5, sender: 'physician', name: 'Dr. James Carter', time: 'Yest. 7:30 PM', text: 'Linda, I reviewed your weight trend and symptoms. This looks like mild fluid overload. I am increasing your Furosemide temporarily to 80 mg for the next 48 hours. If symptoms worsen — increased breathlessness, chest pain, or weight above 166 lbs — go to the ER immediately.' },
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
        { label: 'Weight',        value: '263', unit: 'lbs', time: '2 days ago', alert: false },
        { label: 'Blood Pressure',value: '132/84', unit: 'mmHg', time: '2 days ago', alert: false },
        { label: 'Heart Rate',    value: '76',  unit: 'bpm', time: '2 days ago', alert: false },
      ],
      alerts: [],
      medications: [
        { name: 'Semaglutide (Ozempic)', dose: '1 mg', freq: 'Once weekly (injection)' },
      ],
      onCall: { name: 'Marcus Patel', role: 'Health Navigator', initials: 'MP', color: '#D97706' },
    },
    preview: 'I tracked my meals this week. Down 1.2 lbs.',
    time: '2 days ago',
    date: '2 days ago',
    unread: 0,
    messages: [
      { id: 1, sender: 'patient',   name: 'James Whitmore',   time: 'Apr 15, 10:00 AM', text: 'I tracked all my meals this week and stayed under 1,800 calories every day. I am down 1.2 lbs since last Monday.' },
      { id: 2, sender: 'nurse',     name: 'Sara Alvarez, RN', time: 'Apr 15, 10:20 AM', text: 'James, that is great progress! Consistent calorie tracking is one of the most effective tools for weight management. Keep it up. Are you tolerating the Ozempic injection well?' },
      { id: 3, sender: 'patient',   name: 'James Whitmore',   time: 'Apr 15, 10:25 AM', text: 'Yes, mild nausea for the first couple of hours but it goes away. Much better than the first few weeks.' },
      { id: 4, sender: 'physician', name: 'Dr. James Carter', time: 'Apr 15, 11:00 AM', text: 'Excellent work, James. The nausea typically settles within the first 4 to 6 weeks. Your trend is on track. I will review your A1C and lipid panel results when they come in next week.' },
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
        { label: 'Heart Rate',    value: '112', unit: 'bpm',  time: '3 days ago', alert: true  },
        { label: 'Blood Pressure',value: '142/88', unit: 'mmHg', time: '3 days ago', alert: true },
        { label: 'Weight',        value: '145', unit: 'lbs',  time: '3 days ago', alert: false },
      ],
      alerts: [
        { level: 'high',   text: 'Irregular heart rate detected — 112 bpm at rest' },
        { level: 'high',   text: 'CHA₂DS₂-VASc score 4 — elevated stroke risk' },
      ],
      medications: [
        { name: 'Apixaban (Eliquis)', dose: '5 mg', freq: 'Twice daily' },
        { name: 'Metoprolol',         dose: '25 mg', freq: 'Twice daily' },
      ],
      onCall: { name: 'Sara Alvarez, RN', role: 'Virtual Nurse', initials: 'SA', color: '#2563EB' },
    },
    preview: 'Understood. I will go in for the ECG tomorrow morning.',
    time: '3 days ago',
    date: '3 days ago',
    unread: 0,
    messages: [
      { id: 1, sender: 'patient',   name: 'Patricia Lee',     time: 'Apr 14, 2:00 PM', text: 'My heart has been racing since this morning and I feel very fatigued. My monitor shows 112 bpm at rest.' },
      { id: 2, sender: 'ai',        name: 'AI Health Agent',  time: 'Apr 14, 2:01 PM', text: 'Patricia, a resting heart rate of 112 bpm with fatigue warrants prompt attention for someone with AFib. I have alerted your care team immediately. Are you also experiencing any chest discomfort, dizziness, or difficulty breathing?' },
      { id: 3, sender: 'patient',   name: 'Patricia Lee',     time: 'Apr 14, 2:03 PM', text: 'Mild dizziness but no chest pain. I took my Apixaban this morning.' },
      { id: 4, sender: 'nurse',     name: 'Sara Alvarez, RN', time: 'Apr 14, 2:15 PM', text: 'Patricia, thank you for reporting promptly. I am looping in Dr. Carter now. Please sit down, rest, and avoid any physical exertion. If dizziness worsens or you experience chest pain, call 911 immediately.' },
      { id: 5, sender: 'physician', name: 'Dr. James Carter', time: 'Apr 14, 2:40 PM', text: 'Patricia, this may be a rate-control episode related to your AFib. Since you took your Apixaban and have no chest pain, I want you to get an urgent ECG tomorrow morning at the clinic. I will also increase your Metoprolol to 37.5 mg starting tonight. Call us if anything changes before then.' },
      { id: 6, sender: 'patient',   name: 'Patricia Lee',     time: 'Apr 14, 2:45 PM', text: 'Understood. I will go in for the ECG tomorrow morning.' },
    ],
  },
]

/* ─── Left Nav Item ──────────────────────────────────────────── */
function NavItem({ icon, label, active, onClick, badge, collapsed, showTooltip }) {
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={onClick} style={{
        width: '100%', display: 'flex', alignItems: 'center',
        gap: collapsed ? 0 : 11,
        padding: collapsed ? '10px 0' : '9px 12px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderRadius: 9,
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
        {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
        {!collapsed && badge !== undefined && (
          <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 6px', borderRadius: 999, background: active ? 'rgba(255,255,255,0.25)' : TEAL, color: '#fff', lineHeight: 1.4 }}>{badge}</span>
        )}
      </button>
      {collapsed && showTooltip && (
        <div style={{ position: 'absolute', left: 'calc(100% + 10px)', top: '50%', transform: 'translateY(-50%)', background: '#1E293B', color: '#fff', fontSize: 12.5, fontWeight: 500, padding: '6px 12px', borderRadius: 7, whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 200, boxShadow: '0 4px 14px rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ position: 'absolute', right: '100%', top: '50%', transform: 'translateY(-50%)', width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderRight: '5px solid #1E293B' }} />
          {label}
          {badge !== undefined && <span style={{ fontSize: 10, fontWeight: 700, background: TEAL, padding: '1px 5px', borderRadius: 999, color: '#fff' }}>{badge}</span>}
        </div>
      )}
    </div>
  )
}

/* ─── Left Navigation ────────────────────────────────────────── */
function LeftNav({ active: activeItem, collapsed, onToggle }) {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)

  const mainNav = [
    { id: 'dashboard',           label: 'Dashboard',           icon: <LayoutDashboard size={17} /> },
    { id: 'clinic-management',   label: 'Clinic Management',   icon: <Building2 size={17} /> },
    { id: 'resource-management', label: 'Resource Management', icon: <Boxes size={17} /> },
    { id: 'messages',            label: 'Messages',            icon: <MessageSquare size={17} />, badge: 2 },
  ]

  const navW = collapsed ? COLLAPSED_W : NAV_W

  return (
    <div style={{ width: navW, minHeight: '100vh', background: '#ffffff', borderRight: '1px solid #E8EDF2', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, zIndex: 40, boxShadow: '2px 0 12px rgba(0,0,0,0.04)', transition: 'width 0.22s ease', overflow: 'hidden' }}>

      {/* Logo + toggle */}
      <div style={{ padding: collapsed ? '20px 0' : '22px 18px 18px', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'space-between', flexShrink: 0, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: TEAL, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 10px ${TEAL}44` }}>
            <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
              <path d="M3 13h4l2-5.5 2.5 11 2-7.5 1.5 3.5H23" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {!collapsed && (
            <div>
              <p style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.15, fontFamily: FF, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Health Telematix</p>
              <p style={{ fontSize: 10.5, fontWeight: 500, color: '#94A3B8', margin: 0, fontFamily: FF, whiteSpace: 'nowrap' }}>Care Management Platform</p>
            </div>
          )}
        </div>
        <button onClick={onToggle} style={{ position: 'fixed', left: navW - 12, top: 40, width: 24, height: 24, borderRadius: '50%', background: '#ffffff', border: '1.5px solid #E8EDF2', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.10)', zIndex: 50, color: '#94A3B8', transition: 'left 0.22s ease' }}
          onMouseEnter={e => { e.currentTarget.style.background = TEAL; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = TEAL }}
          onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.borderColor = '#E8EDF2' }}
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </div>

      <div style={{ height: 1, background: '#F1F5F9', margin: collapsed ? '0 10px' : '0 18px', flexShrink: 0 }} />
      <div style={{ padding: collapsed ? '14px 8px' : '14px 12px', flex: 1 }}>
        {!collapsed && <p style={{ fontSize: 10, fontWeight: 700, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 12px', fontFamily: FF }}>Main Menu</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {mainNav.map(item => (
            <NavItem key={item.id} icon={item.icon} label={item.label} active={activeItem === item.id} badge={item.badge} collapsed={collapsed}
              onClick={() => {
                if (item.id === 'dashboard')         navigate('/dashboard')
                if (item.id === 'clinic-management') navigate('/clinic-management')
                if (item.id === 'messages')          navigate('/messages')
              }} />
          ))}
        </div>
      </div>
      <div style={{ padding: collapsed ? '10px 8px 18px' : '10px 12px 18px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
        <NavItem icon={<Settings size={17} />} label="Settings" active={activeItem === 'settings'} collapsed={collapsed} />
        <div style={{ position: 'relative', marginTop: 6 }}>
          <button onClick={() => setProfileOpen(o => !o)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10, padding: collapsed ? '9px 0' : '9px 12px', justifyContent: collapsed ? 'center' : 'flex-start', borderRadius: 9, background: profileOpen ? '#F1F5F9' : 'transparent', border: 'none', cursor: 'pointer', fontFamily: FF, transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F1F5F9'}
            onMouseLeave={e => { if (!profileOpen) e.currentTarget.style.background = 'transparent' }}
          >
            <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: `linear-gradient(135deg, #14B8A6, ${TEAL})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>SM</div>
            {!collapsed && (
              <>
                <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                  <p style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A', margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Dr. Sarah Mitchell</p>
                  <p style={{ fontSize: 11, color: '#94A3B8', margin: 0, lineHeight: 1.3 }}>Admin</p>
                </div>
                <ChevronDown size={13} style={{ color: '#94A3B8', flexShrink: 0, transition: 'transform 0.15s', transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
              </>
            )}
          </button>
          {profileOpen && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 90 }} onClick={() => setProfileOpen(false)} />
              <div style={{ position: 'absolute', bottom: 'calc(100% + 6px)', left: 0, right: collapsed ? 'auto' : 0, width: collapsed ? 200 : 'auto', background: '#ffffff', borderRadius: 10, border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.10)', zIndex: 100, overflow: 'hidden', fontFamily: FF }}>
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

/* ─── Sender avatar ──────────────────────────────────────────── */
function SenderAvatar({ session, sender }) {
  const map = {
    patient:   { initials: session.patient.initials, bg: session.patient.color + '22', color: session.patient.color },
    ai:        { initials: 'AI',  bg: '#EDE9FE', color: '#7C3AED' },
    nurse:     { initials: session.patient.onCall.initials, bg: '#DBEAFE', color: '#2563EB' },
    physician: { initials: 'MD',  bg: '#DCFCE7', color: '#059669' },
  }
  const s = map[sender]
  return (
    <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700, fontFamily: FF }}>
      {s.initials}
    </div>
  )
}

/* ─── Right panel section header ────────────────────────────── */
function SectionHeader({ icon, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
      <span style={{ color: TEAL, display: 'flex', alignItems: 'center' }}>{icon}</span>
      <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.09em', margin: 0, fontFamily: FF }}>{title}</p>
    </div>
  )
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function MessagesV4() {
  const navigate = useNavigate()
  const [navCollapsed, setNavCollapsed] = useState(false)
  const [search,       setSearch]       = useState('')
  const [selected,     setSelected]     = useState(SESSIONS[0])

  const TOPBAR_H = 64
  const panelH   = `calc(100vh - ${TOPBAR_H}px)`

  const filtered = SESSIONS.filter(s =>
    s.patient.name.toLowerCase().includes(search.toLowerCase())
  )

  const s = selected  // shorthand
  const p = s?.patient

  return (
    <div style={{ minHeight: '100vh', background: PAGE_BG, fontFamily: FF, display: 'flex' }}>
      <LeftNav active="messages" collapsed={navCollapsed} onToggle={() => setNavCollapsed(o => !o)} />

      <div style={{ marginLeft: navCollapsed ? COLLAPSED_W : NAV_W, flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, transition: 'margin-left 0.22s ease' }}>

        {/* ── Top bar ── */}
        <div style={{ height: TOPBAR_H, background: '#ffffff', borderBottom: '1px solid #E8EDF2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', flexShrink: 0 }}>
          <div>
            <h1 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: FF, letterSpacing: '-0.01em' }}>Messages</h1>
            <p style={{ fontSize: 12, color: '#94A3B8', margin: 0, fontFamily: FF }}>Read-only conversation history</p>
          </div>
          <button style={{ position: 'relative', width: 38, height: 38, borderRadius: 9, border: '1px solid #E2E8F0', background: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
            <Bell size={17} />
            <span style={{ position: 'absolute', top: 8, right: 9, width: 7, height: 7, borderRadius: '50%', background: '#EF4444', border: '1.5px solid white' }} />
          </button>
        </div>

        {/* ── 3-panel body ── */}
        <div style={{ display: 'flex', height: panelH, overflow: 'hidden' }}>

          {/* ════ LEFT PANEL — Conversation list ════ */}
          <div style={{ width: '20%', flexShrink: 0, borderRight: '1px solid #E8EDF2', background: '#ffffff', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

            {/* Search */}
            <div style={{ padding: '16px 14px', borderBottom: '1px solid #F1F5F9', flexShrink: 0 }}>
              <div style={{ position: 'relative' }}>
                <Search size={13} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', pointerEvents: 'none' }} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by patient name…"
                  style={{ width: '100%', height: 36, paddingLeft: 32, paddingRight: 12, border: '1px solid #E8EDF2', borderRadius: 9, fontSize: 13, color: '#1E293B', background: PAGE_BG, outline: 'none', fontFamily: FF, boxSizing: 'border-box' }}
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
                    style={{
                      padding: '14px 16px', cursor: 'pointer',
                      background: isActive ? TEAL_LT : 'transparent',
                      borderBottom: '1px solid #F8FAFF',
                      borderLeft: isActive ? `3px solid ${TEAL}` : '3px solid transparent',
                      transition: 'background 0.12s',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F8FAFF' }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      {/* Avatar */}
                      <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, background: session.patient.color + '20', color: session.patient.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, fontFamily: FF }}>
                        {session.patient.initials}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A', fontFamily: FF, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 140 }}>{session.patient.name}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                            {session.unread > 0 && (
                              <span style={{ width: 18, height: 18, borderRadius: '50%', background: TEAL, color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FF }}>{session.unread}</span>
                            )}
                            <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: FF }}>{session.time}</span>
                          </div>
                        </div>
                        <p style={{ fontSize: 11.5, color: '#94A3B8', margin: '2px 0 4px', fontFamily: FF, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{session.preview}</p>
                        <span style={{ fontSize: 10.5, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: session.patient.color + '18', color: session.patient.color, fontFamily: FF }}>{session.patient.condition}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ════ MIDDLE PANEL — Conversation ════ */}
          <div style={{ width: '55%', flexShrink: 0, display: 'flex', flexDirection: 'column', background: PAGE_BG, overflow: 'hidden' }}>

            {/* Convo header */}
            <div style={{ padding: '14px 20px', background: '#ffffff', borderBottom: '1px solid #E8EDF2', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: p?.color + '20', color: p?.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, fontFamily: FF }}>
                  {p?.initials}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: FF }}>{p?.name}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8', margin: 0, fontFamily: FF }}>
                    {s?.messages.length} messages · {s?.patient.programs.join(', ')} · {s?.date}
                  </p>
                </div>
              </div>
              {/* Participants legend */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {Object.entries(SENDER).map(([key, val]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: val.dot, display: 'inline-block' }} />
                    <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: FF }}>{val.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {s?.messages.map(msg => {
                  const style = SENDER[msg.sender]
                  return (
                    <div key={msg.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                      <SenderAvatar session={s} sender={msg.sender} />
                      <div style={{ maxWidth: '68%', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
                        {/* Sender tag */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          {msg.sender === 'ai' && <Bot size={11} style={{ color: '#7C3AED' }} />}
                          <span style={{ fontSize: 11.5, fontWeight: 600, color: style.dot, fontFamily: FF }}>{msg.name}</span>
                          <span style={{ fontSize: 10.5, color: '#CBD5E1', fontFamily: FF }}>·</span>
                          <span style={{ fontSize: 11, color: '#CBD5E1', fontFamily: FF }}>{msg.time}</span>
                        </div>
                        {/* Bubble */}
                        <div style={{ padding: '10px 14px', borderRadius: '4px 14px 14px 14px', background: style.bg, border: `1px solid ${style.border}`, fontSize: 13.5, color: style.text, lineHeight: 1.6, fontFamily: FF }}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Read-only bar */}
            <div style={{ padding: '12px 20px', borderTop: '1px solid #E8EDF2', background: '#ffffff', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 40, borderRadius: 10, background: PAGE_BG, border: '1px solid #E8EDF2', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
                <Lock size={13} style={{ color: '#CBD5E1', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#CBD5E1', fontFamily: FF }}>Clinic admins have read-only access — messaging is not available</span>
              </div>
            </div>
          </div>

          {/* ════ RIGHT PANEL — Patient context ════ */}
          <div style={{ width: '25%', flexShrink: 0, borderLeft: '1px solid #E8EDF2', background: '#ffffff', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

            {/* Patient overview header */}
            <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: p?.color + '20', color: p?.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, fontFamily: FF }}>
                  {p?.initials}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0, fontFamily: FF }}>{p?.name}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8', margin: '2px 0 0', fontFamily: FF }}>{p?.gender} · Age {p?.age} · DOB {p?.dob}</p>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {p?.programs.map(prog => (
                    <span key={prog} style={{ fontSize: 11, fontWeight: 600, padding: '2px 9px', borderRadius: 999, background: TEAL_LT, color: TEAL, fontFamily: FF }}>{prog}</span>
                  ))}
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 9px', borderRadius: 999, background: '#F1F5F9', color: '#64748B', fontFamily: FF }}>EHR {p?.ehrId}</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 22 }}>

              {/* Vitals */}
              <div>
                <SectionHeader icon={<Activity size={13}/>} title="Latest Vitals" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {p?.vitals.map((v, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', borderRadius: 9, background: v.alert ? '#FEF2F2' : PAGE_BG, border: `1px solid ${v.alert ? '#FECACA' : '#E8EDF2'}` }}>
                      <div>
                        <p style={{ fontSize: 11.5, color: '#64748B', margin: 0, fontFamily: FF }}>{v.label}</p>
                        <p style={{ fontSize: 13, fontWeight: 700, color: v.alert ? '#DC2626' : '#0F172A', margin: '2px 0 0', fontFamily: FF }}>{v.value} <span style={{ fontSize: 11, fontWeight: 400, color: '#94A3B8' }}>{v.unit}</span></p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {v.alert && <AlertCircle size={13} style={{ color: '#DC2626', display: 'block', marginLeft: 'auto', marginBottom: 2 }} />}
                        <p style={{ fontSize: 10.5, color: '#94A3B8', margin: 0, fontFamily: FF }}>{v.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Alerts */}
              {p?.alerts.length > 0 && (
                <div>
                  <SectionHeader icon={<AlertCircle size={13}/>} title="Active Alerts" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {p.alerts.map((a, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '9px 11px', borderRadius: 9, background: a.level === 'high' ? '#FEF2F2' : '#FFFBEB', border: `1px solid ${a.level === 'high' ? '#FECACA' : '#FDE68A'}` }}>
                        <AlertCircle size={12} style={{ color: a.level === 'high' ? '#DC2626' : '#D97706', flexShrink: 0, marginTop: 1 }} />
                        <p style={{ fontSize: 12, color: a.level === 'high' ? '#991B1B' : '#92400E', margin: 0, lineHeight: 1.5, fontFamily: FF }}>{a.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medications */}
              <div>
                <SectionHeader icon={<Pill size={13}/>} title="Active Medications" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {p?.medications.map((med, i) => (
                    <div key={i} style={{ padding: '9px 12px', borderRadius: 9, background: PAGE_BG, border: '1px solid #E8EDF2' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: 0, fontFamily: FF }}>{med.name}</p>
                      <p style={{ fontSize: 11.5, color: '#94A3B8', margin: '2px 0 0', fontFamily: FF }}>{med.dose} · {med.freq}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* On Call */}
              <div>
                <SectionHeader icon={<UserCheck size={13}/>} title="On Call Participant" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 9, background: PAGE_BG, border: '1px solid #E8EDF2' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: p?.onCall.color + '20', color: p?.onCall.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: FF, flexShrink: 0 }}>
                    {p?.onCall.initials}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', margin: 0, fontFamily: FF }}>{p?.onCall.name}</p>
                    <p style={{ fontSize: 11.5, color: '#94A3B8', margin: 0, fontFamily: FF }}>{p?.onCall.role}</p>
                  </div>
                  <span style={{ marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
                </div>
              </div>

              {/* Active Programs */}
              <div>
                <SectionHeader icon={<HeartPulse size={13}/>} title="Active Programs" />
                <div style={{ display: 'flex', gap: 8 }}>
                  {p?.programs.map(prog => (
                    <div key={prog} style={{ flex: 1, padding: '10px 12px', borderRadius: 9, background: TEAL_LT, border: `1px solid ${TEAL}30`, textAlign: 'center' }}>
                      <p style={{ fontSize: 14, fontWeight: 800, color: TEAL, margin: 0, fontFamily: FF }}>{prog}</p>
                      <p style={{ fontSize: 10.5, color: '#0D948888', margin: '2px 0 0', fontFamily: FF }}>Active</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversation Flow */}
              <div>
                <SectionHeader icon={<MessageSquare size={13}/>} title="Conversation Flow" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  {[
                    { label: 'Patient', color: TEAL },
                    { label: 'AI', color: '#7C3AED' },
                    { label: 'Nurse', color: '#2563EB' },
                    { label: 'Physician', color: '#059669' },
                  ].map((node, i, arr) => (
                    <div key={node.label} style={{ display: 'flex', alignItems: 'center', flex: i < arr.length - 1 ? '1' : 'none' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: node.color + '20', color: node.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, fontFamily: FF }}>{node.label.slice(0, 2)}</div>
                        <span style={{ fontSize: 9.5, color: '#94A3B8', fontFamily: FF, whiteSpace: 'nowrap' }}>{node.label}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div style={{ flex: 1, height: 1.5, background: `linear-gradient(90deg, ${node.color}60, ${arr[i+1].color}60)`, margin: '0 3px', marginBottom: 14 }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
