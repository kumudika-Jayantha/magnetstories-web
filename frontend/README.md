# Frontend (Next.js)

A minimal Next.js frontend with three pages:

- `/` - Home (pings backend health)
- `/about` - About
- `/contact` - Contact form that POSTs to the backend
 - `/upload` - Upload images page (uploads to backend `/api/upload`)

How to run locally:

1. cd frontend
2. npm install
3. NEXT_PUBLIC_API_BASE=http://localhost:3001 npm run dev

Deploy to Vercel:

- Deploy this folder as a separate Vercel project, or add it to your monorepo and configure the project to use this folder as the root.
- Set `NEXT_PUBLIC_API_BASE` to your backend's URL in Vercel Environment Variables if deploying separately.

Vercel deploy notes:

- This folder is a full Next.js app and can be deployed directly to Vercel. The provided `vercel.json` uses the Next builder.
- Set the environment variable `NEXT_PUBLIC_API_BASE` in Vercel if your backend is deployed under a different domain (for example `https://api.example.com`). If your backend is deployed as a separate Vercel project, use its URL there.
- If you deploy both frontend and backend to the same Vercel project (monorepo), you can use a rewrite so `/api/*` routes point to the backend functions. Alternatively, deploy backend separately and set `NEXT_PUBLIC_API_BASE`.
