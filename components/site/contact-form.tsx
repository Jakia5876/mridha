'use client'

import { useState, type FormEvent } from 'react'

/**
 * এখন: সাবমিট করলে ভিজিটরের ইমেইল অ্যাপ খুলে যায়।
 * পরে: Supabase যুক্ত হলে মেসেজ ডাটাবেসে জমা হবে, /admin-এ দেখা যাবে।
 */
export function ContactForm({ email }: { email: string }) {
  const [error, setError] = useState('')

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get('name') || '').trim()
    const from = String(f.get('email') || '').trim()
    const message = String(f.get('message') || '').trim()
    if (!name || !from || !message) return setError('Please fill in name, email and message.')
    setError('')
    const subject = String(f.get('subject') || '').trim() || `New project inquiry from ${name}`
    const body = `${message}\n\n— ${name} (${from})`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="contact-form reveal" onSubmit={onSubmit} noValidate>
      <div className="row">
        <label>
          Name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label>
        Subject
        <input name="subject" />
      </label>
      <label>
        Message
        <textarea name="message" rows={4} required />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button className="btn btn-light" type="submit">
        Start Project <span className="arrow">↗</span>
      </button>
    </form>
  )
}
