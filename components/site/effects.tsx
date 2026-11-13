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
    // Safety net: reveal what is already on screen right away (one measurement, not on every
    // scroll — measuring ~100 elements per scroll event made phones stutter), and reveal
    // everything if IntersectionObserver never fires (some in-app browsers).
    const raf = requestAnimationFrame(() =>
      revealEls.forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in')
      }),
    )
    let ioFired = false
    const ioCheck = new IntersectionObserver(() => { ioFired = true; ioCheck.disconnect() })
    ioCheck.observe(document.body)
    const fallback = window.setTimeout(() => { if (!ioFired) revealEls.forEach((el) => el.classList.add('in')) }, 3000)
    cleanups.push(() => {
      io.disconnect()
      ioCheck.disconnect()
      cancelAnimationFrame(raf)
      window.clearTimeout(fallback)
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
      // transform only (GPU) — moving left/top forced a re-layout on every mouse move
      const onMove = (e: MouseEvent) => {
        glow.style.transform = `translate3d(${e.clientX - 260}px, ${e.clientY - 260}px, 0)`
      }
      window.addEventListener('mousemove', onMove, { passive: true })
      cleanups.push(() => window.removeEventListener('mousemove', onMove))
    } else glow?.remove()

    // workflow wall parallax
    const wall = document.querySelector<HTMLElement>('.wall')
    const wallImg = document.querySelector<HTMLElement>('.wall-img')
    // desktop only, at most once per frame
    if (wall && wallImg && matchMedia('(pointer: fine) and (min-width: 861px)').matches) {
      let ticking = false
      const update = () => {
        ticking = false
        const r = wall.getBoundingClientRect()
        if (r.bottom < 0 || r.top > window.innerHeight) return
        const k = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight
        wallImg.style.setProperty('--wall-shift', `${k * 40}px`)
      }
      const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      cleanups.push(() => window.removeEventListener('scroll', onScroll))
    }

    return () => cleanups.forEach((c) => c())
  }, [])

  return null
}
