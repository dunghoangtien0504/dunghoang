'use client'

// ── Motion primitives theo taste-skill ────────────────────────────────────────
// - Scroll-reveal bằng IntersectionObserver (KHÔNG dùng window scroll listener)
// - Easing chuẩn: cubic-bezier(0.16, 1, 0.3, 1), duration 600ms
// - Stagger qua prop delay (ms)
// - Tôn trọng prefers-reduced-motion: hiện ngay, không animate

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return

    // Phần tử đã nằm trong khung nhìn lúc mount → hiện ngay (animate từ tick sau),
    // không chờ IntersectionObserver. Tránh nháy trắng nội dung đầu trang.
    // Dùng setTimeout thay requestAnimationFrame để không phụ thuộc render frame.
    const vh = window.innerHeight
    const rect = el.getBoundingClientRect()
    if (!vh || rect.top < vh * 0.92) {
      const t = setTimeout(() => setShown(true), 30)
      return () => clearTimeout(t)
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return { ref, shown }
}

/** Fade-up khi cuộn tới. delay (ms) để stagger các phần tử anh em. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const { ref, shown } = useInView()
  const style: CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? 'none' : `translateY(${y}px)`,
    transition: `opacity 600ms ${EASE} ${delay}ms, transform 600ms ${EASE} ${delay}ms`,
    willChange: shown ? undefined : 'opacity, transform',
  }
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}

/** Thanh bar lớn dần từ 0 → pct% khi cuộn tới — dùng cho biểu đồ lương. */
export function GrowBar({
  pct,
  delay = 0,
  className,
}: {
  pct: number
  delay?: number
  className?: string
}) {
  const { ref, shown } = useInView(0.3)
  return (
    <div ref={ref} className="h-2 bg-[#FAF7F2] rounded-full overflow-hidden">
      <div
        className={className ?? 'h-full bg-[#88860B]/60 rounded-full'}
        style={{
          width: shown ? `${pct}%` : '0%',
          transition: `width 900ms ${EASE} ${delay}ms`,
        }}
      />
    </div>
  )
}
