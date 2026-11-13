'use client'

import { useEffect, useRef, useState } from 'react'
import type { SiteText } from '@/lib/portfolio-data'

/** Floating "Get in touch" button: Messenger chat, phone call and WhatsApp. */
export function ContactWidget({ phone, facebook, text: t }: {
  phone: string
  facebook?: string
  text: SiteText['widget']
}) {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onDown = (e: PointerEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('pointerdown', onDown) }
  }, [open])

  const digits = phone.replace(/\D/g, '')
  const tel = `+${digits}`
  // facebook.com/a3mittech → m.me/a3mittech (opens Messenger directly)
  const fbPage = facebook?.match(/facebook\.com\/([^/?#]+)/i)?.[1]
  const items = [
    fbPage && {
      key: 'messenger', href: `https://m.me/${fbPage}`, title: t.chatTitle, sub: t.chatSub, external: true,
      icon: <path d="M12 2C6.4 2 2 6.1 2 11.3c0 2.9 1.4 5.5 3.7 7.2V22l3.4-1.9c.9.3 1.9.4 2.9.4 5.6 0 10-4.1 10-9.3S17.6 2 12 2Zm1 12.5-2.6-2.7-5 2.7 5.5-5.8 2.6 2.7 5-2.7-5.5 5.8Z" />,
    },
    digits && {
      key: 'call', href: `tel:${tel}`, title: t.callTitle, sub: t.callSub || phone, external: false,
      icon: <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />,
    },
    digits && {
      key: 'whatsapp', href: `https://wa.me/${digits}?text=${encodeURIComponent(t.waPrefill)}`, title: t.waTitle, sub: t.waSub, external: true,
      icon: <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.8 14.1c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.1.1.6-.1 1.3Z" />,
    },
  ].filter(Boolean) as { key: string; href: string; title: string; sub: string; external: boolean; icon: React.ReactNode }[]

  if (!items.length) return null

  return (
    <div className={`cw${open ? ' open' : ''}`} ref={box}>
      <div className="cw-panel" role="dialog" aria-label={t.heading} aria-hidden={!open}>
        <p className="cw-head">{t.heading}</p>
        <ul>
          {items.map((it) => (
            <li key={it.key}>
              <a href={it.href} className={`cw-item cw-${it.key}`} tabIndex={open ? 0 : -1}
                {...(it.external && { target: '_blank', rel: 'noopener noreferrer' })} onClick={() => setOpen(false)}>
                <span className="cw-icon"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">{it.icon}</svg></span>
                <span className="cw-text"><b>{it.title}</b><small>{it.sub}</small></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button type="button" className="cw-toggle" aria-expanded={open} aria-label={open ? t.close : t.heading} onClick={() => setOpen(!open)}>
        <svg className="cw-ico-chat" viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.4 1.2 4.6 3.1 6.1L4.5 21l3.9-1.9c1.1.3 2.3.4 3.6.4 5.5 0 10-3.8 10-8.5S17.5 3 12 3ZM7.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
        </svg>
        <svg className="cw-ico-close" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
    </div>
  )
}
