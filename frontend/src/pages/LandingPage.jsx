import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="px-8 py-5 flex justify-between items-center bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">JobApp</h1>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="text-blue-600 border border-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition font-medium"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <span className="bg-blue-100 text-blue-600 text-sm font-medium px-4 py-1 rounded-full mb-6">
          Find your next opportunity
        </span>
        <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Find Your <span className="text-blue-600">Dream Job</span>
        </h2>
        <p className="text-gray-500 text-xl mb-10 max-w-xl">
          Browse hundreds of jobs, apply with one click, and track all your applications in one place.
        </p>
        <div className="flex gap-4">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition"
          >
            Log In
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl w-full">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-gray-800 text-lg mb-2">Search & Filter</h3>
            <p className="text-gray-500 text-sm">Find jobs by company, location, or type easily.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 text-lg mb-2">One Click Apply</h3>
            <p className="text-gray-500 text-sm">Apply to any job instantly with a single click.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-800 text-lg mb-2">Track Applications</h3>
            <p className="text-gray-500 text-sm">Keep track of all jobs you've applied to.</p>
          </div>
        </div>
      </div>
    </div>
  )
}