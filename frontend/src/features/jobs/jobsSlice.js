import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'http://localhost:5000/api'

const getToken = (thunkAPI) => {
  return thunkAPI.getState().auth.user?.token
}

export const fetchJobs = createAsyncThunk('jobs/fetchAll', async (_, thunkAPI) => {
  try {
    const token = getToken(thunkAPI)
    const res = await axios.get(`${API}/jobs`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const createJob = createAsyncThunk('jobs/create', async (data, thunkAPI) => {
  try {
    const token = getToken(thunkAPI)
    const res = await axios.post(`${API}/jobs`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const updateJob = createAsyncThunk('jobs/update', async ({ id, data }, thunkAPI) => {
  try {
    const token = getToken(thunkAPI)
    const res = await axios.put(`${API}/jobs/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const deleteJob = createAsyncThunk('jobs/delete', async (id, thunkAPI) => {
  try {
    const token = getToken(thunkAPI)
    await axios.delete(`${API}/jobs/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const applyJob = createAsyncThunk('jobs/apply', async (id, thunkAPI) => {
  try {
    const token = getToken(thunkAPI)
    await axios.post(`${API}/jobs/${id}/apply`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const fetchAppliedJobs = createAsyncThunk('jobs/fetchApplied', async (_, thunkAPI) => {
  try {
    const token = getToken(thunkAPI)
    const res = await axios.get(`${API}/jobs/applications`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    appliedJobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => { state.loading = true })
      .addCase(fetchJobs.fulfilled, (state, action) => { state.loading = false; state.jobs = action.payload })
      .addCase(fetchJobs.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(createJob.fulfilled, (state, action) => { state.jobs.push(action.payload) })
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(j => j._id === action.payload._id)
        if (index !== -1) state.jobs[index] = action.payload
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(j => j._id !== action.payload)
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        const job = state.jobs.find(j => j._id === action.payload)
        if (job) job.applied = true
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.appliedJobs = action.payload
      })
  }
})

export default jobsSlice.reducer