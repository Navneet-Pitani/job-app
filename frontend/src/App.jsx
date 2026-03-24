import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './features/auth/LoginPage'
import SignupPage from './features/auth/SignupPage'
import JobsPage from './features/jobs/JobsPage'
import AppliedJobsPage from './features/jobs/AppliedJobsPage'
import AdminDashboard from './features/admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/jobs" element={
          <ProtectedRoute>
            <JobsPage />
          </ProtectedRoute>
        } />

        <Route path="/applied" element={
          <ProtectedRoute>
            <AppliedJobsPage />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}