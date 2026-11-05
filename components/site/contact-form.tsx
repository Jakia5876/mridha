'use client'

import { useState, type FormEvent } from 'react'
import type { SiteText } from '@/lib/portfolio-data'

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Saves the message to Supabase (visible in /admin → Messages). Falls back to email if that fails. */
export function ContactForm({ email, text: t }: { email: string; text: SiteText['contact'] }) {
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
    if (!name || !from || !message) return setError('Please fill in name, email and message.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(from)) return setError('Please enter a valid email address.')

    setError('')
    setStatus('sending')
    let res: Response | null = null
    try {
      res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: from, subject, message, website: f.get('website') || '' }),
      })
    } catch {}

    // validation / rate-limit problems: show the message, keep what they typed
    if (res && (res.status === 400 || res.status === 429)) {
      const j = (await res.json().catch(() => ({}))) as { error?: string }
      setStatus('error')
      return setError(j.error || 'Please check the form and try again.')
    }
    if (!res?.ok) {
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
          {t.name}
          <input name="name" required autoComplete="name" maxLength={200} />
        </label>
        <label>
          {t.email}
          <input name="email" type="email" required autoComplete="email" maxLength={320} />
        </label>
      </div>
      <label>
        {t.subject}
        <input name="subject" maxLength={300} />
      </label>
      <label>
        {t.message}
        <textarea name="message" rows={4} required maxLength={5000} />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      {error && <p className="form-error">{error}</p>}
      {status === 'sent' && <p className="form-ok">{t.success}</p>}
      <button className="btn btn-light" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t.sending : t.button} <span className="arrow">↗</span>
      </button>
    </form>
  )
}
