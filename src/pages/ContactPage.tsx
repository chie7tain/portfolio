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

  const fieldClass =
    'w-full bg-transparent border-0 border-b border-ink/25 px-0 py-3 text-ink placeholder:text-faded/50 focus:outline-none focus:border-vermilion transition-colors'
  const labelClass =
    'block font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faded mb-1'

  return (
    <div className="max-w-6xl mx-auto px-6 pt-14 pb-24 relative z-10">
      <header className="border-b-2 border-ink pb-8 mb-12">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-vermilion">
          § 05 — Correspondence
        </span>
        <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-[-0.02em] text-ink leading-[0.95] mt-4">
          Get in touch
        </h1>
        <p className="mt-5 max-w-xl text-ink-soft leading-relaxed">
          Have a project in mind, a question, or just want to say hello? Send a
          note and I&apos;ll get back to you.
        </p>
      </header>

      {isSuccess ? (
        <div className="max-w-lg">
          <p className="font-display text-3xl font-semibold text-ink mb-3">
            Message sent.
          </p>
          <p className="text-ink-soft">
            Thanks for reaching out — I&apos;ll get back to you soon.
          </p>
          <button
            onClick={reset}
            className="mt-8 font-mono text-xs uppercase tracking-[0.15em] text-vermilion hover:underline underline-offset-4"
          >
            ← Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl space-y-8">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldClass}
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>
              Message
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${fieldClass} resize-none`}
              placeholder="What's on your mind?"
            />
          </div>

          {isError && (
            <p className="font-mono text-sm text-vermilion">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="group inline-flex items-center gap-3 bg-ink text-paper font-mono text-xs uppercase tracking-[0.2em] px-8 py-4 hover:bg-vermilion transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Sending…' : 'Send message'}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </button>
        </form>
      )}
    </div>
  )
}
