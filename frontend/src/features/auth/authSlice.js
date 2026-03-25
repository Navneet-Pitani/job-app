import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API = 'https://job-app-p42e.onrender.com/api/auth'

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

export const signup = createAsyncThunk('auth/signup', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/signup`, data)
    localStorage.setItem('user', JSON.stringify(res.data))
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API}/login`, data)
    localStorage.setItem('user', JSON.stringify(res.data))
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage,
    loading: false,
    error: null,
  },
reducers: {
  logout: (state) => {
    localStorage.removeItem('user')
    state.user = null
  },
  clearError: (state) => {
    state.error = null
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => { state.loading = true; state.error = null })
      .addCase(signup.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
      .addCase(signup.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(login.pending, (state) => { state.loading = true; state.error = null })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  }
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer