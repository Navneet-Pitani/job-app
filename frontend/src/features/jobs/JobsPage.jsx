import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs, applyJob } from './jobsSlice'
import { logout } from '../auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'

export default function JobsPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { jobs, loading } = useSelector((state) => state.jobs)
  const { user } = useSelector((state) => state.auth)

  const [search, setSearch] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const appliedIds = jobs
    .filter((job) => job.applicants?.includes(user?._id))
    .map((job) => job._id)

  useEffect(() => {
    dispatch(fetchJobs())
  }, [dispatch])

  const handleApply = async (jobId) => {
    await dispatch(applyJob(jobId))
    dispatch(fetchJobs())
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const filtered = jobs.filter((job) => {
    const matchSearch = job.company.toLowerCase().includes(search.toLowerCase())
    const matchLocation = locationFilter ? job.location === locationFilter : true
    const matchType = typeFilter ? job.type === typeFilter : true
    return matchSearch && matchLocation && matchType
  })

  const locations = [...new Set(jobs.map((j) => j.location))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">JobApp</h1>
        <div className="flex gap-4 items-center">
          <Link to="/applied" className="text-sm text-gray-600 hover:text-blue-600">
            Applied Jobs
          </Link>
          <span className="text-sm text-gray-500">Hi, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
          </select>
        </div>

        {/* Job Cards */}
        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((job) => (
              <div key={job._id} className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{job.position}</h2>
                  <p className="text-blue-600 font-medium mt-1">{job.company}</p>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                    <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {job.location}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(job._id)}
                  disabled={appliedIds.includes(job._id)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {appliedIds.includes(job._id) ? 'Applied ✓' : 'Apply'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}