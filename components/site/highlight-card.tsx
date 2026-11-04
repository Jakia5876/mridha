'use client'

import { useEffect, useState } from 'react'
import type { Highlight } from '@/lib/portfolio-data'

function Laurel({ flip }: { flip?: boolean }) {
  return (
    <svg className={`laurel${flip ? ' flip' : ''}`} viewBox="0 0 40 80" aria-hidden="true">
      <path d="M30 78 C14 64 8 44 14 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <g fill="currentColor">
        <ellipse cx="9" cy="22" rx="3.6" ry="8" transform="rotate(-20 9 22)" />
        <ellipse cx="7" cy="36" rx="3.6" ry="8" transform="rotate(-40 7 36)" />
        <ellipse cx="9" cy="50" rx="3.6" ry="8" transform="rotate(-58 9 50)" />
        <ellipse cx="15" cy="63" rx="3.6" ry="8" transform="rotate(-72 15 63)" />
        <ellipse cx="22" cy="28" rx="3" ry="7" transform="rotate(25 22 28)" />
        <ellipse cx="22" cy="44" rx="3" ry="7" transform="rotate(10 22 44)" />
        <ellipse cx="27" cy="58" rx="3" ry="7" transform="rotate(-5 27 58)" />
      </g>
    </svg>
  )
}

export function HighlightCard({ items }: { items: Highlight[] }) {
  const [cur, setCur] = useState(0)
  const [shown, setShown] = useState(0)
  const [swapping, setSwapping] = useState(false)

  // auto-advance every 4s; restarts whenever the slide changes
  useEffect(() => {
    if (items.length < 2) return
    const t = setTimeout(() => setCur((c) => (c + 1) % items.length), 4000)
    return () => clearTimeout(t)
  }, [cur, items.length])

  // fade out → swap text → fade in
  useEffect(() => {
    if (cur === shown) return
    setSwapping(true)
    const t = setTimeout(() => {
      setShown(cur)
      setSwapping(false)
    }, 300)
    return () => clearTimeout(t)
  }, [cur, shown])

  const h = items[shown]
  if (!h) return null

  return (
    <div className="award-card">
      <div className="award-stars">★ ★ ★ ★ ★</div>
      <div className="award-body">
        <Laurel />
        <div className={`award-text${swapping ? ' swap' : ''}`}>
          <div className="award-kicker">{h.kicker}</div>
          <div className="award-title">{h.title}</div>
        </div>
        <Laurel flip />
      </div>
      <div className="award-rule" />
      <div className="award-foot">
        <p className={`award-caption${swapping ? ' swap' : ''}`}>{h.caption}</p>
        <div className="award-dots">
          {items.map((_, i) => (
            <button key={i} aria-label={`Slide ${i + 1}`} className={i === cur ? 'active' : ''} onClick={() => setCur(i)} />
          ))}
        </div>
      </div>
    </div>
  )
}
