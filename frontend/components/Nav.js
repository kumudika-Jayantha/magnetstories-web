import Link from 'next/link'

export default function Nav(){
  return (
    <header className="nav">
      <div className="wrap">
        <h2 className="brand">MagnetStories</h2>
        <nav>
          <Link href="/"><a>Home</a></Link>
          <Link href="/about"><a>About</a></Link>
          <Link href="/contact"><a>Contact</a></Link>
          <Link href="/upload"><a>Upload</a></Link>
        </nav>
      </div>

      <style jsx>{`
        .nav { background: #0b69ff; color: white; padding: 10px 0 }
        .wrap { display:flex; align-items:center; justify-content:space-between; max-width:1100px; margin:0 auto; padding:0 16px }
        .brand { margin:0; font-size:18px }
        nav a { color: white; margin-left:14px; text-decoration:none }
      `}</style>
    </header>
  )
}
