'use client'

import { useEffect } from 'react'
import type { Booking, SiteText } from '@/lib/portfolio-data'

/** Cal.com embed namespace used by every "book" button on the page. */
const NS = 'book'
const CONFIG = JSON.stringify({ layout: 'month_view', theme: 'dark' })

type CalFn = ((...args: unknown[]) => void) & { loaded?: boolean; ns: Record<string, (...args: unknown[]) => void>; q: unknown[] }
declare global { interface Window { Cal?: CalFn } }

/**
 * Loads Cal.com's embed script once. After that, any element with
 * data-cal-link / data-cal-namespace opens the booking popup on click.
 */
export function CalEmbed() {
  useEffect(() => {
    if (window.Cal?.ns?.[NS]) return
    /* official Cal.com loader snippet (https://cal.com/docs/developing/guides/embeds) */
    ;(function (C: Window & typeof globalThis, A: string, L: string) {
      const p = (a: { q: unknown[] }, ar: unknown) => { a.q.push(ar) }
      const d = C.document
      C.Cal = C.Cal || (function (this: unknown, ...ar: unknown[]) {
        const cal = C.Cal as CalFn
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          d.head.appendChild(d.createElement('script')).src = A
          cal.loaded = true
        }
        if (ar[0] === L) {
          const api = function (...args: unknown[]) { p(api as unknown as { q: unknown[] }, args) } as unknown as CalFn
          const namespace = ar[1]
          api.q = api.q || []
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api
            p(cal.ns[namespace] as unknown as { q: unknown[] }, ar)
            p(cal, ['initNamespace', namespace])
          } else p(cal, ar)
          return
        }
        p(cal, ar)
      } as unknown as CalFn)
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    const Cal = window.Cal!
    Cal('init', NS, { origin: 'https://app.cal.com' })
    Cal.ns[NS]('ui', {
      theme: 'dark',
      cssVarsPerTheme: { dark: { 'cal-brand': '#f2f2f2' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    })
  }, [])
  return null
}

/** Attributes that turn any button/link into a Cal.com popup trigger. */
export function calTrigger(link: string) {
  return { 'data-cal-link': link, 'data-cal-namespace': NS, 'data-cal-config': CONFIG }
}

export function BookingCards({ booking, text: t }: { booking: Booking; text: SiteText['book'] }) {
  const events = (booking.events || []).filter((e) => e.slug && e.title)
  if (!booking.calUser || events.length === 0) return null

  return (
    <div className="booking reveal">
      <div className="booking-head">
        <div className="pill"><span className="pill-dot" />{t.pill}</div>
        <h3>{t.heading}</h3>
        <p className="muted">{t.sub}</p>
      </div>
      <div className="booking-grid">
        {events.map((e, i) => (
          <button type="button" className={`book-card${i === 0 ? ' featured' : ''}`} key={e.slug} {...calTrigger(`${booking.calUser}/${e.slug}`)}>
            <span className="book-time">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              {e.duration} min
            </span>
            <span className="book-title">{e.title}</span>
            <span className="book-desc">{e.desc}</span>
            <span className="book-foot">
              <span className="book-apps" aria-label="Google Meet or Zoom">
                <i className="app-meet" title="Google Meet" /> <i className="app-zoom" title="Zoom" /> Meet · Zoom
              </span>
              <span className="book-go">{t.button} <span className="arrow">↗</span></span>
            </span>
          </button>
        ))}
      </div>
      <div className="booking-or"><span>{t.orMessage}</span></div>
    </div>
  )
}
