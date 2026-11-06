'use client'

import Image from 'next/image'
import { unoptimized } from '@/lib/img'
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
        <span className="phone-btn phone-btn-action" aria-hidden="true" />
        <span className="phone-btn phone-btn-vol" aria-hidden="true" />
        <span className="phone-btn phone-btn-power" aria-hidden="true" />
        <div className="phone-screen">
          <div className="phone-island" aria-hidden="true" />
          <div className="phone-statusbar" aria-hidden="true">
            <span>9:41</span>
            <span className="sb-icons">
              <svg viewBox="0 0 18 12" width="15" height="10"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
              <svg viewBox="0 0 16 12" width="13" height="10"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0L8 11.5Zm-4.2-4.3L2.3 5.7a8 8 0 0 1 11.4 0l-1.5 1.5a5.9 5.9 0 0 0-8.4 0ZM.8 4.2-.6 2.8a11.2 11.2 0 0 1 17.2 0l-1.4 1.4a9.2 9.2 0 0 0-14.4 0Z" /></svg>
              <span className="sb-battery"><i /></span>
            </span>
          </div>
          <div className="phone-photo">
            <Image src={photo} unoptimized={unoptimized(photo)} alt={name} fill priority sizes="300px" />
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
      <div className="phone-glow" aria-hidden="true" />
      <div className="floor-glow" aria-hidden="true" />
    </div>
  )
}
