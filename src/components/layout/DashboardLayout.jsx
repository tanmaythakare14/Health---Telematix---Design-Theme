import { useState, useEffect } from 'react'
import '../../styles/dashboard.css'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const NAV_W       = 240
const COLLAPSED_W = 60
const PAGE_BG     = '#F4F7FB'

export default function DashboardLayout({ children, pageTitle, pageSubtitle }) {
  const [navCollapsed, setNavCollapsed] = useState(false)
  const navW = navCollapsed ? COLLAPSED_W : NAV_W

  useEffect(() => {
    const root = document.getElementById('root')
    if (root) root.classList.add('auth-root')
    return () => root?.classList.remove('auth-root')
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: PAGE_BG, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar collapsed={navCollapsed} onToggle={() => setNavCollapsed(o => !o)} />

      {/* Right column: TopBar (sticky) + page content */}
      <div style={{
        marginLeft: navW,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        transition: 'margin-left 0.22s ease',
      }}>
        <TopBar pageTitle={pageTitle} pageSubtitle={pageSubtitle} />
        <main className="dash-main">
          <div className="dash-page">{children}</div>
        </main>
      </div>
    </div>
  )
}
