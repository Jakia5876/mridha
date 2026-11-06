'use client'

import { useEffect, useState } from 'react'
import { Socials } from './socials'
import { calTrigger } from './booking'
import type { SiteText } from '@/lib/portfolio-data'

const SECTIONS = [
  ['#about', 'about'],
  ['#services', 'services'],
  ['#work', 'work'],
  ['#live', 'live'],
  ['#skills', 'skills'],
  ['#testimonials', 'testimonials'],
  ['#contact', 'contact'],
] as const

export function HeaderMenu({ name, email, socials, nav, book }: {
  name: string; email: string; socials: Record<string, string>; nav: SiteText['nav']
  /** Cal.com popup button (hidden when no booking link) */
  book?: { link: string; label: string }
}) {
  // empty label in /admin → link hidden
  const links = SECTIONS.map(([href, key]) => ({ href, label: nav[key] })).filter((l) => l.label)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // highlight the link of the section currently in view
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    )
    sections.forEach((s) => io.observe(s))
    const onTop = () => { if (window.scrollY < window.innerHeight * 0.5) setActive('') }
    window.addEventListener('scroll', onTop, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', onTop) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <a href="#top" className="logo">{name}</a>

        {/* desktop: links in the top bar */}
        <nav className="topnav" aria-label="Main">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? 'on' : ''} aria-current={active === l.href ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          {book && (
            <button type="button" className="btn btn-light header-book" {...calTrigger(book.link)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
              <span>{book.label}</span>
            </button>
          )}
          <a href="#contact" className="btn btn-ghost header-cta">
            {nav.cta} <span className="arrow">↗</span>
          </a>
        </div>
      </header>

      {/* mobile / tablet: fullscreen menu */}
      <nav className="menu" aria-hidden={!open} inert={!open}>
        <ul className="menu-list">
          {links.map((l, i) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                <span>/{String(i + 1).padStart(2, '0')}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-foot">
          <a href={`mailto:${email}`}>{email}</a>
          <Socials socials={socials} />
        </div>
      </nav>
    </>
  )
}
