# Backend (Vercel Serverless Functions)

This folder uses Vercel Serverless Functions placed under `api/`.

Endpoints:
- `GET /api/hello` - health check
- `GET /api/messages` - list messages (in-memory)
- `POST /api/messages` - add a message (JSON body: { name?, message })

How to run locally:

- Option A: Use `vercel dev` (recommended for parity with Vercel)
  1. Install Vercel CLI: `npm i -g vercel`
  2. cd backend
  3. vercel dev

- Option B: Use a small Express wrapper (not included) or test functions with curl by running a lightweight local server that forwards requests.

Deploy to Vercel:
- Create a new Vercel project pointing to this `backend/` folder, or add it as a separate project.
- Vercel will serve the functions under `https://<your-deployment>/api/*`.

Note: The messages are stored in-memory for simplicity. For production, use a real DB.
