import Nav from '../components/Nav'
import { useEffect, useState } from 'react'

export default function Home() {
  return (
    <div className="page container">
      <Nav />

      <header className="hero">
        <div className="hero-inner">
          <h1>Professional Image Uploads</h1>
          <p className="lead">Upload high-quality photos for your customers and store them securely in Google Drive.</p>
        </div>
        <img className="hero-image" src="https://via.placeholder.com/1200x400?text=MagnetStories+Hero" alt="hero" />
      </header>

      <main>
        <section className="form-card">
          <h2>New Customer — Upload Photos</h2>
          <p className="muted">Provide contact details and attach one or more photos. The backend will upload files to Google Drive.</p>

          <CustomerUploadForm />
        </section>
      </main>

      <style jsx>{`
        .hero { position:relative; text-align:center; color:white; margin-bottom:20px }
        .hero-image { width:100%; height:320px; object-fit:cover; filter:brightness(0.6) }
        .hero-inner { position:absolute; left:0; right:0; top:40px }
        .hero h1 { font-size:34px; margin:0 }
        .lead { color:#e6eefc }

        .form-card { max-width:980px; margin:20px auto; background:white; padding:18px; border-radius:8px; box-shadow:0 6px 18px rgba(12,20,40,0.06) }
        .muted { color:#6b7280 }
      `}</style>
    </div>
  )
}

function CustomerUploadForm(){
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    // create object URLs for previews
    const urls = files.map(f => ({ name: f.name, url: URL.createObjectURL(f) }))
    setPreviews(urls)
    return () => {
      // revoke object URLs to avoid memory leaks
      urls.forEach(u => URL.revokeObjectURL(u.url))
    }
  }, [files])

  function onFiles(e){
    const chosen = Array.from(e.target.files || [])
    setFiles(chosen)
  }

  async function submit(e){
    e.preventDefault()
    if(!name || !phone) return setStatus('Please provide name and phone')
    if(files.length === 0) return setStatus('Please attach at least one photo')

    setStatus('Uploading...')
    try{
      const base = process.env.NEXT_PUBLIC_API_BASE || ''
      const fd = new FormData()
      fd.append('name', name)
      fd.append('address', address)
      fd.append('phone', phone)
      files.forEach(f => fd.append('photos', f, f.name))

      const res = await fetch(`${base}/api/upload`, { method: 'POST', body: fd })
      if(!res.ok) throw new Error('Upload failed')
      const json = await res.json()
      setStatus('Upload successful')
      console.log('upload result', json)
      // reset form
      setName('')
      setAddress('')
      setPhone('')
      setFiles([])
    }catch(err){
      console.error(err)
      setStatus('Upload failed')
    }
  }

  return (
    <form onSubmit={submit} className="customer-form">
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <label>
          Name
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" required />
        </label>
        <label>
          Phone
          <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone number" required />
        </label>
      </div>

      <label style={{display:'block',marginTop:12}}>
        Address
        <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Street address" />
      </label>

      <label style={{display:'block',marginTop:12}}>
        Photos
        <input type="file" accept="image/*" multiple onChange={onFiles} />
      </label>

      {previews.length > 0 && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:10,marginTop:12}}>
          {previews.map(p => (
            <div key={p.url} style={{border:'1px solid #eee',borderRadius:6,overflow:'hidden'}}>
              <img src={p.url} alt={p.name} style={{width:'100%',height:100,objectFit:'cover'}} />
              <div style={{padding:6,fontSize:12,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.name}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{marginTop:12}}>
        <button className="btn" type="submit">Create customer & upload</button>
        <span style={{marginLeft:12}}>{status}</span>
      </div>

      <style jsx>{`
        .customer-form input { width:100%; padding:8px; margin-top:6px; border:1px solid #d1d5db; border-radius:6px }
        .btn { background:#0b69ff; color:white; border:none; padding:10px 14px; border-radius:6px }
      `}</style>
    </form>
  )
}
