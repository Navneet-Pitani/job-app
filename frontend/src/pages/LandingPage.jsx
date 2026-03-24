import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col">
      {/* Navbar */}
      <nav className="px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">JobApp</h1>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="text-white border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition font-medium"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition font-medium"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
          Find Your Dream Job
        </h2>
        <p className="text-blue-100 text-xl mb-10 max-w-xl">
          Browse hundreds of jobs, apply with one click, and track all your applications in one place.
        </p>
        <div className="flex gap-4">
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition"
          >
            Log In
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl w-full">
          <div className="bg-white bg-opacity-10 rounded-xl p-6 text-white">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-lg mb-2">Search & Filter</h3>
            <p className="text-blue-100 text-sm">Find jobs by company, location, or type easily.</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-6 text-white">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-lg mb-2">One Click Apply</h3>
            <p className="text-blue-100 text-sm">Apply to any job instantly with a single click.</p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-xl p-6 text-white">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-lg mb-2">Track Applications</h3>
            <p className="text-blue-100 text-sm">Keep track of all jobs you've applied to.</p>
          </div>
        </div>
      </div>
    </div>
  )
}