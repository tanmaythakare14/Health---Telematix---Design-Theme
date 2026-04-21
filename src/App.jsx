import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { VariantProvider, useVariant } from './context/VariantContext'
import DemoSwitcher from './components/demo/DemoSwitcher'

/* Auth pages */
import SignIn         from './pages/auth/SignIn'
import SignInV2       from './pages/auth/SignInV2'
import SignInV3       from './pages/auth/SignInV3'
import SignInV4       from './pages/auth/SignInV4'
import ForgotPassword from './pages/auth/ForgotPassword'

/* Dashboard pages */
import ClinicManagement   from './pages/dashboard/ClinicManagement'
import ClinicManagementV2 from './pages/dashboard/ClinicManagementV2'
import ClinicManagementV4 from './pages/dashboard/ClinicManagementV4'
import ClinicDetail       from './pages/dashboard/ClinicDetail'
import ClinicDetailV2     from './pages/dashboard/ClinicDetailV2'
import ClinicDetailV4     from './pages/dashboard/ClinicDetailV4'
import MessagesV1        from './pages/dashboard/MessagesV1'
import MessagesV2        from './pages/dashboard/MessagesV2'
import MessagesV4        from './pages/dashboard/MessagesV4'
import DashboardV4       from './pages/dashboard/DashboardV4'
import DashboardV2       from './pages/dashboard/DashboardV2'
import DashboardV1       from './pages/dashboard/DashboardV1'

/* ── Variant router wrappers (thin — just pick the right component) ── */

function SignInRoute() {
  const { variant } = useVariant()
  if (variant === 2) return <SignInV2 />
  if (variant === 3) return <SignInV3 />
  if (variant === 4) return <SignInV4 />
  return <SignIn />
}

function ClinicManagementRoute() {
  const { variant } = useVariant()
  if (variant === 2) return <ClinicManagementV2 />
  if (variant === 4) return <ClinicManagementV4 />
  return <ClinicManagement />
}

function MessagesRoute() {
  const { variant } = useVariant()
  if (variant === 4) return <MessagesV4 />
  if (variant === 2) return <MessagesV2 />
  return <MessagesV1 />
}

function DashboardRoute() {
  const { variant } = useVariant()
  if (variant === 4) return <DashboardV4 />
  if (variant === 2) return <DashboardV2 />
  if (variant === 1) return <DashboardV1 />
  return <Navigate to="/clinic-management" replace />
}

function ClinicDetailRoute() {
  const { variant } = useVariant()
  if (variant === 2) return <ClinicDetailV2 />
  if (variant === 4) return <ClinicDetailV4 />
  return <ClinicDetail />
}

/* ── App ──────────────────────────────────────────────────────── */

export default function App() {
  return (
    <VariantProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"                       element={<SignInRoute />} />
          <Route path="/forgot-password"        element={<ForgotPassword />} />
          <Route path="/clinic-management"      element={<ClinicManagementRoute />} />
          <Route path="/clinic-management/:id"  element={<ClinicDetailRoute />} />
          <Route path="/messages"              element={<MessagesRoute />} />
          <Route path="/dashboard"             element={<DashboardRoute />} />
        </Routes>
        <DemoSwitcher />
      </BrowserRouter>
    </VariantProvider>
  )
}
