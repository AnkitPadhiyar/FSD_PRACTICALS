# Tuition Admin

Simple admin panel for managing students (add/view/edit/delete). Uses Express.js and MongoDB (Mongoose).

Prerequisites
- Node.js (16+ recommended)
- MongoDB (local or Atlas). If using Atlas, set the MONGODB_URI environment variable before starting the server.

Quick start

1. Install dependencies

```powershell
npm install
```

2. Start MongoDB (if local) or set MONGODB_URI for Atlas, then start the server (development mode with nodemon):

```powershell
npm run dev
```

3. Open http://localhost:3000 in your browser.

API endpoints
- GET /api/students
- GET /api/students/:id
- POST /api/students
- PUT /api/students/:id
- DELETE /api/students/:id

Notes
- The UI is intentionally minimal. The server serves static files from `public/`.
- For production, consider adding validation, authentication, and CSRF protections.
