import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateKey } from '../../api'

export default function LoginPage() {
  const [key, setKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await validateKey(key)
      sessionStorage.setItem('apiKey', key)
      navigate('/admin/projects')
    } catch (err) {
      setError(err instanceof TypeError ? 'Could not reach the server. Check your connection.' : 'Invalid API key')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-main-black px-6">
      <div className="w-full max-w-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mb-3">Admin</p>
        <h1 className="text-3xl font-black mb-8">Sign in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="API key"
            value={key}
            onChange={e => setKey(e.target.value)}
            required
            className="bg-white/5 border border-white/10 rounded px-4 py-3 text-main-white placeholder-main-white/30 focus:outline-none focus:border-main-red"
          />
          {error && <p className="text-main-red text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-main-red text-main-white font-semibold py-3 rounded hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Checking…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
