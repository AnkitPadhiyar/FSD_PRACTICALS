# Simple CRUD demo

This folder contains a minimal CRUD demo with an Express API (server) and a Vite + React client.

Server
- Location: `server`

1. cd server
2. npm install
3. npm start

The server listens on port 4000 by default.

Client
- Location: `client`

1. cd client
2. npm install
3. npm run dev

The client expects the server at `http://localhost:4000/api`. To change, set `REACT_APP_API_URL` when starting.

Quick API examples (server must be running):

# Create
curl -X POST http://localhost:4000/api/notes -H "Content-Type: application/json" -d "{\"title\":\"My Note\",\"content\":\"Hello\"}"

# Read
curl http://localhost:4000/api/notes

# Update
curl -X PUT http://localhost:4000/api/notes/1 -H "Content-Type: application/json" -d "{\"title\":\"Updated\"}"

# Delete
curl -X DELETE http://localhost:4000/api/notes/1
