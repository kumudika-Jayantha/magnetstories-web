import { useState } from 'react'

export default function Contact(){
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)

  async function submit(e){
    e.preventDefault()
    setStatus('sending...')
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001'
    try{
      const res = await fetch(`${base}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
      })
      if(!res.ok) throw new Error('network')
      setName('')
      setMessage('')
      setStatus('sent')
    }catch(e){
      setStatus('failed')
    }
  }

  return (
    <main style={{fontFamily:'system-ui, sans-serif', padding:20}}>
      <h1>Contact</h1>
      <form onSubmit={submit} style={{display:'grid',gap:8,maxWidth:420}}>
        <input placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <textarea placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} rows={5} />
        <button type="submit">Send</button>
      </form>
      {status && <p>Status: {status}</p>}
    </main>
  )
}
