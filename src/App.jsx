import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import MessagesV4        from './pages/dashboard/MessagesV4'

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
          <Route path="/messages"              element={<MessagesV4 />} />
        </Routes>
        <DemoSwitcher />
      </BrowserRouter>
    </VariantProvider>
  )
}
