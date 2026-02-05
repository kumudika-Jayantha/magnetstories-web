import { useState } from 'react'

export default function Upload(){
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)
  const [result, setResult] = useState(null)

  async function submit(e){
    e.preventDefault()
    if(!file) return setStatus('Please choose a file')
    setStatus('Uploading...')
    const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001'
    const fd = new FormData()
    fd.append('file', file, file.name)
    try{
      const res = await fetch(`${base}/api/upload`, { method: 'POST', body: fd })
      const j = await res.json()
      if(!res.ok) throw new Error(j.error || 'Upload failed')
      setResult(j)
      setStatus('Uploaded')
    }catch(err){
      setStatus('Upload failed: ' + err.message)
    }
  }

  return (
    <main style={{fontFamily:'system-ui, sans-serif', padding:20}}>
      <h1>Upload Image</h1>
      <p>Choose a high-quality image and upload it to Google Drive.</p>
      <form onSubmit={submit} style={{display:'grid', gap:8, maxWidth:600}}>
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files && e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      {status && <p><strong>{status}</strong></p>}
      {result && (
        <div>
          <h3>Result</h3>
          <pre style={{whiteSpace:'pre-wrap', wordBreak:'break-word'}}>{JSON.stringify(result, null, 2)}</pre>
          {result.uploads && result.uploads[0] && result.uploads[0].webViewLink && (
            <p><a href={result.uploads[0].webViewLink} target="_blank" rel="noreferrer">Open in Drive</a></p>
          )}
        </div>
      )}
    </main>
  )
}
