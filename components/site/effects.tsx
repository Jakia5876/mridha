'use client'

import { useEffect } from 'react'

/** Page-wide effects: scroll reveal, stat counters, cursor glow, workflow-wall parallax. */
export function Effects() {
  useEffect(() => {
    const cleanups: (() => void)[] = []

    // reveal on scroll
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('in')
          io.unobserve(e.target)
        }),
      { threshold: 0.12 },
    )
    const revealEls = document.querySelectorAll<HTMLElement>('.reveal')
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 0.08}s`
      io.observe(el)
    })
    // Safety net: reveal anything already on screen, and everything after a moment
    // (in case IntersectionObserver never fires, e.g. some in-app browsers).
    const showVisible = () =>
      revealEls.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in')
      })
    const raf = requestAnimationFrame(showVisible)
    window.addEventListener('scroll', showVisible, { passive: true })
    cleanups.push(() => {
      io.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', showVisible)
    })

    // counters
    const statIO = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
            const end = Number(el.dataset.count)
            const t0 = performance.now()
            const step = (t: number) => {
              const k = Math.min((t - t0) / 1400, 1)
              el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3))))
              if (k < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
          })
          statIO.unobserve(e.target)
        }),
      { threshold: 0.5 },
    )
    document.querySelectorAll('.stats').forEach((el) => statIO.observe(el))
    cleanups.push(() => statIO.disconnect())

    // cursor glow (desktop only)
    const glow = document.querySelector<HTMLElement>('.cursor-glow')
    if (glow && matchMedia('(pointer: fine)').matches) {
      const onMove = (e: MouseEvent) => {
        glow.style.left = `${e.clientX}px`
        glow.style.top = `${e.clientY}px`
      }
      window.addEventListener('mousemove', onMove, { passive: true })
      cleanups.push(() => window.removeEventListener('mousemove', onMove))
    } else glow?.remove()

    // workflow wall parallax
    const wall = document.querySelector<HTMLElement>('.wall')
    const wallImg = document.querySelector<HTMLElement>('.wall-img')
    if (wall && wallImg) {
      const onScroll = () => {
        const r = wall.getBoundingClientRect()
        if (r.bottom < 0 || r.top > window.innerHeight) return
        const k = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
        wallImg.style.setProperty('--wall-shift', `${k * 40}px`)
      }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      cleanups.push(() => window.removeEventListener('scroll', onScroll))
    }

    return () => cleanups.forEach((c) => c())
  }, [])

  return null
}
