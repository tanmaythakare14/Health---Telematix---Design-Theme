import { useEffect } from 'react'
import '../../styles/auth.css'
import IllustrationPanel from './IllustrationPanel'

export default function AuthLayout({ children }) {
  // Break out of the 1126px #root constraint for full-bleed auth layout
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) root.classList.add('auth-root')
    return () => {
      if (root) root.classList.remove('auth-root')
    }
  }, [])

  return (
    <div className="auth-layout">
      <IllustrationPanel />
      <div className="auth-right">
        {children}
      </div>
    </div>
  )
}
