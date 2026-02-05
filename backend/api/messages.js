let messages = []

module.exports = (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json({ messages })
  }

  if (req.method === 'POST') {
    try {
      const { name, message } = req.body
      if (!message) return res.status(400).json({ error: 'message required' })
      const entry = { id: messages.length + 1, name: name || 'anonymous', message, createdAt: new Date().toISOString() }
      messages.push(entry)
      return res.status(201).json({ ok: true, entry })
    } catch (e) {
      return res.status(400).json({ error: 'bad request' })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end('Method Not Allowed')
}
