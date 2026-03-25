# JobApp — Full Stack Job Application Platform

A full-stack job application platform where users can browse, search, filter, and apply for jobs. Admins can post, edit, and delete job listings.

---

## Live Demo

- **Frontend**: https://job-app-phi-bay.vercel.app
- **Backend API**: https://job-app-p42e.onrender.com

---

## Tech Stack

**Frontend**
- React (Vite)
- Redux Toolkit (RTK) for global state and API calls
- React Router DOM for routing
- Tailwind CSS for styling
- Axios for HTTP requests

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing

---

## Features

### Authentication
- Signup and Login with JWT
- Role-based access:
  - Emails ending with `@arnifi.com` → **Admin**
  - All other emails → **User**
- Persistent login using localStorage

### User Features
- Browse all job listings as cards
- Search jobs by company name
- Filter jobs by location and type (Full Time / Part Time)
- Apply to jobs with one click
- View all applied jobs on a separate page

### Admin Features
- Create new job listings (company, position, type, location)
- Edit existing job listings
- Delete job listings
- View all jobs posted by any admin

---

## Project Structure

```
job-app/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── jobController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Job.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   ├── .env
│   └── server.js
└── frontend/
    ├── src/
    │   ├── app/
    │   │   └── store.js
    │   ├── features/
    │   │   ├── auth/
    │   │   │   ├── authSlice.js
    │   │   │   ├── LoginPage.jsx
    │   │   │   └── SignupPage.jsx
    │   │   ├── jobs/
    │   │   │   ├── jobsSlice.js
    │   │   │   ├── JobsPage.jsx
    │   │   │   └── AppliedJobsPage.jsx
    │   │   └── admin/
    │   │       └── AdminDashboard.jsx
    │   ├── components/
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   └── LandingPage.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── vercel.json
```

---

## API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/signup` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/jobs` | Get all jobs | Authenticated |
| POST | `/api/jobs` | Create a new job | Admin only |
| PUT | `/api/jobs/:id` | Update a job | Admin only |
| DELETE | `/api/jobs/:id` | Delete a job | Admin only |
| POST | `/api/jobs/:id/apply` | Apply to a job | User only |
| GET | `/api/jobs/applications` | Get applied jobs | Authenticated |

---

## Setup Instructions

### Prerequisites
- Node.js v18+
- npm v9+
- Git
- MongoDB Atlas account

### 1. Clone the repository

```bash
git clone https://github.com/Navneet-Pitani/job-app.git
cd job-app
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Running Locally

Make sure both servers are running simultaneously.

Open two terminals:

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@arnifi.com | 123456 |
| User | test@gmail.com | 123456 |

> To create your own admin account, sign up with any `@arnifi.com` email.

---

## Deployment

- **Frontend** deployed on [Vercel](https://vercel.com)
- **Backend** deployed on [Render](https://render.com)
- **Database** hosted on [MongoDB Atlas](https://cloud.mongodb.com)

### Environment Variables on Render (Backend)

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Your secret key |

### Environment Variables on Vercel (Frontend)

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://job-app-p42e.onrender.com/api` |

---

## Notes

- Render free tier spins down after 15 minutes of inactivity. The first request may take 30–60 seconds to wake up.
- JWT tokens expire after 7 days.
