import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchJobs, createJob, updateJob, deleteJob } from '../jobs/jobsSlice'
import { logout } from '../auth/authSlice'
import { useNavigate } from 'react-router-dom'

const emptyForm = { company: '', position: '', type: 'Full Time', location: '' }

export default function AdminDashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { jobs, loading } = useSelector((state) => state.jobs)
  const { user } = useSelector((state) => state.auth)

  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    dispatch(fetchJobs())
  }, [dispatch])

  const adminJobs = jobs.filter(
    (job) => job.createdBy === user?._id || job.createdBy?._id === user?._id
  )

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingId) {
      await dispatch(updateJob({ id: editingId, data: form }))
      setSuccessMsg('Job updated successfully!')
    } else {
      await dispatch(createJob(form))
      setSuccessMsg('Job created successfully!')
    }
    setForm(emptyForm)
    setEditingId(null)
    setTimeout(() => setSuccessMsg(''), 3000)
  }

  const handleEdit = (job) => {
    setForm({
      company: job.company,
      position: job.position,
      type: job.type,
      location: job.location,
    })
    setEditingId(job._id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      await dispatch(deleteJob(id))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">JobApp — Admin</h1>
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-500">Hi, {user?.name}</span>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Job Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {editingId ? 'Edit Job' : 'Post a New Job'}
          </h2>

          {successMsg && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
                placeholder="e.g. Google"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                name="position"
                value={form.position}
                onChange={handleChange}
                required
                placeholder="e.g. Frontend Developer"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                placeholder="e.g. Bangalore"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2 flex gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {editingId ? 'Update Job' : 'Post Job'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => { setForm(emptyForm); setEditingId(null) }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Posted Jobs</h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : adminJobs.length === 0 ? (
            <p className="text-gray-500">You haven't posted any jobs yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Position</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {adminJobs.map((job) => (
                    <tr key={job._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{job.company}</td>
                      <td className="px-4 py-3 text-gray-600">{job.position}</td>
                      <td className="px-4 py-3">
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                          {job.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{job.location}</td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => handleEdit(job)}
                          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 text-xs font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}