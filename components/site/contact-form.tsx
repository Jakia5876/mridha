'use client'

import { useState, type FormEvent } from 'react'
import type { SiteText } from '@/lib/portfolio-data'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const list = (s: string | undefined) => (s || '').split(',').map((x) => x.trim()).filter(Boolean)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[\d\s()-]{6,24}$/
const MAX_DETAILS = 3000

/** Project-inquiry form. Saves to Supabase (/admin → Messages) and emails the owner; falls back to email if that fails. */
export function ContactForm({ email, text: t }: { email: string; text: SiteText['contact'] }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [bad, setBad] = useState<Record<string, boolean>>({})
  const [service, setService] = useState('')
  const [budget, setBudget] = useState('')
  const [count, setCount] = useState(0)

  const services = list(t.serviceOptions)
  const budgets = list(t.budgetOptions)
  const timelines = list(t.timelineOptions)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const v = {
      name: String(f.get('name') || '').trim(),
      email: String(f.get('email') || '').trim(),
      phone: String(f.get('phone') || '').trim(),
      service,
      budget,
      timeline: String(f.get('timeline') || '').trim(),
      details: String(f.get('details') || '').trim(),
    }
    const miss = {
      name: !v.name,
      email: !EMAIL_RE.test(v.email),
      phone: !PHONE_RE.test(v.phone),
      budget: budgets.length > 0 && !v.budget,
      details: v.details.length < 10,
    }
    setBad(miss)
    if (Object.values(miss).some(Boolean)) {
      return setError(
        miss.email && v.email ? 'Please enter a valid email address.'
          : miss.phone && v.phone ? 'Please enter a valid phone / WhatsApp number.'
            : miss.details && v.details ? 'Please describe your project in a little more detail.'
              : 'Please fill in the highlighted fields.',
      )
    }

    setError('')
    setStatus('sending')
    let res: Response | null = null
    try {
      res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...v, website: f.get('website') || '' }),
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
      const body = `${v.details}\n\nPhone: ${v.phone}\nService: ${v.service || '—'}\nBudget: ${v.budget || '—'}\nTimeline: ${v.timeline || '—'}\n\n— ${v.name} (${v.email})`
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Project inquiry from ${v.name}`)}&body=${encodeURIComponent(body)}`
      return
    }
    form.reset()
    setService('')
    setBudget('')
    setCount(0)
    setBad({})
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <div className="contact-form cf-done reveal in" role="status">
        <div className="cf-check" aria-hidden="true">✓</div>
        <h3>{t.success}</h3>
        <p className="muted">{t.responseNote}</p>
        <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>{t.sendAnother}</button>
      </div>
    )
  }

  const cls = (k: string) => `cf-field${bad[k] ? ' invalid' : ''}`

  return (
    <form className="contact-form reveal" onSubmit={onSubmit} noValidate>
      <div className="cf-head">
        <h3>{t.formTitle}</h3>
        <p className="muted">{t.responseNote}</p>
      </div>

      <div className="row">
        <label className={cls('name')}>
          <span>{t.name} <i>*</i></span>
          <input name="name" autoComplete="name" maxLength={200} placeholder="John Smith" onInput={() => setBad((b) => ({ ...b, name: false }))} />
        </label>
        <label className={cls('email')}>
          <span>{t.email} <i>*</i></span>
          <input name="email" type="email" autoComplete="email" maxLength={320} placeholder="you@company.com" onInput={() => setBad((b) => ({ ...b, email: false }))} />
        </label>
      </div>

      <div className="row">
        <label className={cls('phone')}>
          <span>{t.phone} <i>*</i></span>
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={24} placeholder="+880 1XXX-XXXXXX" onInput={() => setBad((b) => ({ ...b, phone: false }))} />
        </label>
        {timelines.length > 0 && (
          <label className="cf-field">
            <span>{t.timeline}</span>
            <select name="timeline" defaultValue="">
              <option value="">{t.selectPlaceholder}</option>
              {timelines.map((x) => <option key={x} value={x}>{x}</option>)}
            </select>
          </label>
        )}
      </div>

      {services.length > 0 && (
        <fieldset className="cf-field">
          <legend>{t.service}</legend>
          <div className="cf-chips">
            {services.map((x) => (
              <button type="button" key={x} className={`cf-chip${service === x ? ' on' : ''}`} aria-pressed={service === x}
                onClick={() => setService(service === x ? '' : x)}>{x}</button>
            ))}
          </div>
        </fieldset>
      )}

      {budgets.length > 0 && (
        <fieldset className={cls('budget')}>
          <legend>{t.budget} <i>*</i></legend>
          <div className="cf-chips">
            {budgets.map((x) => (
              <button type="button" key={x} className={`cf-chip${budget === x ? ' on' : ''}`} aria-pressed={budget === x}
                onClick={() => { setBudget(x); setBad((b) => ({ ...b, budget: false })) }}>{x}</button>
            ))}
          </div>
        </fieldset>
      )}

      <label className={cls('details')}>
        <span>{t.details} <i>*</i></span>
        <textarea name="details" rows={5} maxLength={MAX_DETAILS} placeholder={t.detailsPlaceholder}
          onInput={(e) => { setCount(e.currentTarget.value.length); setBad((b) => ({ ...b, details: false })) }} />
        <small className="cf-count">{count} / {MAX_DETAILS}</small>
      </label>

      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      {error && <p className="form-error" role="alert">{error}</p>}

      <button className="btn btn-light cf-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? t.sending : t.button} <span className="arrow">↗</span>
      </button>
      <p className="cf-privacy">{t.privacyNote}</p>
    </form>
  )
}
