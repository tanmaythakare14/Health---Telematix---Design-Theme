function BellIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export default function TopBar({ pageTitle = 'Dashboard', pageSubtitle = '' }) {
  return (
    <header className="dash-topbar">
      {/* Title + Subtitle */}
      <div className="dash-topbar__title-block">
        <span className="dash-topbar__page-title">{pageTitle}</span>
        {pageSubtitle && (
          <span className="dash-topbar__page-subtitle">{pageSubtitle}</span>
        )}
      </div>

      <div className="dash-topbar__actions" style={{ gap: 10 }}>
        {/* Notification Bell */}
        <button className="dash-notif-btn" aria-label="Notifications">
          <BellIcon />
          <span className="dash-notif-badge" aria-hidden="true" />
        </button>

        {/* Profile — no surrounding box, no divider */}
        <button className="dash-profile" aria-label="Account menu">
          <div className="dash-profile__avatar">SM</div>
          <div className="dash-profile__info">
            <span className="dash-profile__name">Dr. Sarah Mitchell</span>
            <span className="dash-profile__email">admin@healthtelematix.com</span>
          </div>
          <ChevronDownIcon />
        </button>
      </div>
    </header>
  )
}
