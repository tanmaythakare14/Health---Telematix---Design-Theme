import { useEffect } from 'react'
import '../../styles/dashboard.css'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function DashboardLayout({ children, pageTitle }) {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) root.classList.add('auth-root')
    return () => root?.classList.remove('auth-root')
  }, [])

  return (
    <div className="dash-shell">
      <Sidebar />
      <TopBar pageTitle={pageTitle} />
      <main className="dash-main">
        <div className="dash-page">{children}</div>
      </main>
    </div>
  )
}
