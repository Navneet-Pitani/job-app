import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppliedJobs } from './jobsSlice'
import { logout } from '../auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'

export default function AppliedJobsPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { appliedJobs, loading } = useSelector((state) => state.jobs)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    console.log('Fetching applied jobs...')
    dispatch(fetchAppliedJobs()).then((result) => {
    console.log('Result:', result)
  }) }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }
  console.log('appliedJobs from store:', appliedJobs)
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">JobApp</h1>
        <div className="flex gap-4 items-center">
          <Link to="/jobs" className="text-sm text-gray-600 hover:text-blue-600">
            All Jobs
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applied Jobs</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : appliedJobs.length === 0 ? (
          <p className="text-center text-gray-500">You haven't applied to any jobs yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliedJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-xl shadow p-6">
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
                <span className="mt-4 inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                  Applied ✓
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}