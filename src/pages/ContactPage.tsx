import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { submitContact } from '../api'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const { mutate, isPending, isSuccess, isError, reset } = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      setName('')
      setEmail('')
      setMessage('')
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutate({ name, email, message })
  }

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-main-white placeholder:text-main-white/30 focus:outline-none focus:border-main-red/60 transition-colors'

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-main-red mb-3">Contact</p>
      <h1 className="text-4xl font-black mb-2">Get in touch</h1>
      <p className="text-main-white/50 mb-4 max-w-lg text-sm">
        Have a project in mind, a question, or just want to say hi? Send a message and I'll get back to you.
      </p>
      <div className="w-12 h-1 bg-main-red mb-10" />

      {isSuccess ? (
        <div className="max-w-lg">
          <p className="text-main-white/80 text-lg font-semibold mb-2">Message sent.</p>
          <p className="text-main-white/50 text-sm">
            Thanks for reaching out — I'll get back to you soon.
          </p>
          <button
            onClick={reset}
            className="mt-6 text-sm text-main-red hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-lg space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-main-white/60 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-main-white/60 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-main-white/60 mb-2">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${inputClass} resize-none`}
              placeholder="What's on your mind?"
            />
          </div>

          {isError && (
            <p className="text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-3 bg-main-red text-main-white font-semibold rounded-lg hover:bg-main-red/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Sending…' : 'Send message'}
          </button>
        </form>
      )}
    </div>
  )
}
