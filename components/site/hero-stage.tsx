'use client'

import { useEffect, useRef, useState } from 'react'
import type { Meter } from '@/lib/portfolio-data'
import { Rich } from './rich'

export function HeroStage({ name, photo, meters, tagline, status }: {
  name: string; photo: string; meters: Meter[]; tagline: string; status: string
}) {
  const phone = useRef<HTMLDivElement>(null)
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setFilled(true))
    if (!matchMedia('(pointer: fine)').matches) return () => cancelAnimationFrame(id)

    const onMove = (e: MouseEvent) => {
      if (!phone.current || window.scrollY > window.innerHeight) return
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      phone.current.style.transform = `translateX(-50%) rotateZ(${10 - x * 4}deg) rotateY(${-14 + x * 12}deg) rotateX(${6 - y * 8}deg)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="stage">
      <div className="phone" ref={phone}>
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt={name} />
          </div>
          <div className="phone-name">{name}</div>
          <div className="phone-role">
            <Rich text={tagline} emTag="em" emClass="" />
          </div>
          <div className="meters">
            {meters.map((m) => (
              <div className="meter" key={m.label}>
                <div className="meter-top">
                  <span>{m.label}</span>
                  <span>{m.value}</span>
                </div>
                <div className="meter-bar">
                  <i style={{ width: filled ? `${m.value}%` : 0 }} />
                </div>
              </div>
            ))}
          </div>
          <div className="phone-status">
            <span className="dot-live" /> {status}
          </div>
        </div>
      </div>
      <div className="pedestal" aria-hidden="true" />
      <div className="floor-glow" aria-hidden="true" />
    </div>
  )
}
