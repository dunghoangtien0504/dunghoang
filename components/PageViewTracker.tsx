'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

function getSessionId() {
  if (typeof window === 'undefined') return ''
  let sid = sessionStorage.getItem('pv_sid')
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem('pv_sid', sid)
  }
  return sid
}

function getDevice(): string {
  if (typeof window === 'undefined') return 'desktop'
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

export default function PageViewTracker() {
  const pathname = usePathname()
  const lastPath = useRef('')

  useEffect(() => {
    if (pathname === lastPath.current) return
    lastPath.current = pathname

    const body = JSON.stringify({
      path: pathname,
      referrer: document.referrer || null,
      device: getDevice(),
      sessionId: getSessionId(),
    })

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', body)
    } else {
      fetch('/api/track', { method: 'POST', body, keepalive: true })
    }
  }, [pathname])

  return null
}
