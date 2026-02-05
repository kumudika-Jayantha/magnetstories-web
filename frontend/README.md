# Frontend (Next.js)

A minimal Next.js frontend with three pages:

- `/` - Home (pings backend health)
- `/about` - About
- `/contact` - Contact form that POSTs to the backend

How to run locally:

1. cd frontend
2. npm install
3. NEXT_PUBLIC_API_BASE=http://localhost:3001 npm run dev

Deploy to Vercel:

- Deploy this folder as a separate Vercel project, or add it to your monorepo and configure the project to use this folder as the root.
- Set `NEXT_PUBLIC_API_BASE` to your backend's URL in Vercel Environment Variables if deploying separately.
