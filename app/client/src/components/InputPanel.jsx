import { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function InputPanel({ onResult }) {
  const [raw, setRaw] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    const entries = raw.split('\n').map(s => s.trim()).filter(Boolean)
    if (entries.length === 0) return toast.error('Enter at least one node')

    setLoading(true)
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:8080'
      const { data } = await axios.post(`${base}/bfhl`, { data: entries })
      onResult(data)
      toast.success('Done!')
    } catch (err) {
      toast.error(err.response?.data?.error || 'API call failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="panel">
      <Toaster position="top-right" />
      <textarea
        className="input-box"
        rows={8}
        placeholder={"A->B\nA->C\nB->D\nhello\nA->A"}
        value={raw}
        onChange={e => setRaw(e.target.value)}
      />
      <button className="btn" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Processing...' : 'Submit'}
      </button>
    </div>
  )
}