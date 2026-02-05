import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  return (
    <main style={{fontFamily:'system-ui, sans-serif', padding: 20}}>
      <h1>MagnetStories (Frontend)</h1>
      <p>A tiny 3-page site wired to a simple backend.</p>
      <nav style={{marginBottom:20}}>
        <Link href="/about"><a style={{marginRight:12}}>About</a></Link>
        <Link href="/contact"><a>Contact</a></Link>
      </nav>

      <section>
        <h2>Backend health</h2>
        <BackendPing />
      </section>
    </main>
  )
}

function BackendPing(){
  const [status, setStatus] = useState('checking...')
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001'
    fetch(`${base}/api/hello`)
      .then(r => r.json())
      .then(j => setStatus(j.message || 'ok'))
      .catch(() => setStatus('offline'))
  }, [])
  return <div>Backend: {status}</div>
}
