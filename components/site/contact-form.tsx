'use client'

import { useState, type FormEvent } from 'react'
import { getBrowserSupabase } from '@/lib/supabase'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Saves the message to Supabase (visible in /admin → Messages). Falls back to email if that fails. */
export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const name = String(f.get('name') || '').trim()
    const from = String(f.get('email') || '').trim()
    const subject = String(f.get('subject') || '').trim()
    const message = String(f.get('message') || '').trim()
    if (f.get('website')) return // honeypot: bots fill hidden fields

    if (!name || !from || !message) return setError('Please fill in name, email and message.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) return setError('Please enter a valid email address.')

    setError('')
    setStatus('sending')
    const { error: dbError } = await getBrowserSupabase()
      .from('messages')
      .insert({ name: name.slice(0, 200), email: from.slice(0, 320), subject: subject.slice(0, 300) || null, message: message.slice(0, 5000) })

    if (dbError) {
      setStatus('error')
      setError('Could not send right now — opening your email app instead.')
      const body = `${message}\n\n— ${name} (${from})`
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject || `Project inquiry from ${name}`)}&body=${encodeURIComponent(body)}`
      return
    }
    form.reset()
    setStatus('sent')
  }

  return (
    <form className="contact-form reveal" onSubmit={onSubmit} noValidate>
      <div className="row">
        <label>
          Name
          <input name="name" required autoComplete="name" maxLength={200} />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" maxLength={320} />
        </label>
      </div>
      <label>
        Subject
        <input name="subject" maxLength={300} />
      </label>
      <label>
        Message
        <textarea name="message" rows={4} required maxLength={5000} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      {error && <p className="form-error">{error}</p>}
      {status === 'sent' && <p className="form-ok">Thank you! Your message has been sent — I&apos;ll reply soon.</p>}
      <button className="btn btn-light" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Start Project'} <span className="arrow">↗</span>
      </button>
    </form>
  )
}
