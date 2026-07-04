'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const COURSES = [
  { name: 'Setup Meta AI Agent',           price: '99k',         href: '/meta-ai-agent' },
  { name: 'Content Không Cần Cảm Hứng',   price: '368.686đ',    href: '/he-thong-content' },
  { name: 'Landing Page Siêu Chuyển Đổi', price: '686.868đ',    href: '/khoa-landing-page' },
  { name: '24 AI Agent for Business',      price: '868.686đ',    href: '/24-ai-agent' },
  { name: 'Hội Đồng Cố Vấn AI',           price: '2.868.686đ',  href: '/hoi-dong-co-van' },
  { name: 'Coaching — Cầm Tay Chỉ Việc',  price: '3.868.686đ',  href: '/coaching' },
]

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
            <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
          </div>
          <span className="font-bold text-[#0D2B1A] text-sm">DungHoang.com</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden sm:flex items-center gap-1">
          {/* Dropdown khóa học */}
          <div ref={dropRef} className="relative">
            <button
              onClick={() => setOpen(o => !o)}
              className="flex items-center gap-1 text-sm text-[#3D6B4A] font-medium px-3 py-1.5 rounded-lg hover:bg-[#EAF5EF] hover:text-[#0D2B1A] transition-colors"
            >
              Khóa học
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <div className="absolute top-full left-0 mt-1.5 bg-white border border-[#DDD8CB] rounded-xl shadow-lg py-1.5 min-w-[280px] z-50">
                {COURSES.map((c, i) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 hover:bg-[#F6F0E4] transition-colors group ${
                      c.href === '/hoi-dong-co-van' ? 'border-t border-b border-[#DDD8CB] my-1 bg-[#FDFBF7]' : ''
                    }`}
                  >
                    <span className={`text-sm font-medium group-hover:text-[#0D2B1A] ${
                      c.href === '/hoi-dong-co-van' ? 'text-[#88860B] font-semibold' : 'text-[#0D2B1A]'
                    }`}>
                      {c.name}
                    </span>
                    <span className="text-xs text-[#7A8C7E] font-mono ml-4 flex-shrink-0">{c.price}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/tin-tuc"
            className="text-sm text-[#3D6B4A] font-medium px-3 py-1.5 rounded-lg hover:bg-[#EAF5EF] hover:text-[#0D2B1A] transition-colors">
            Tin tức
          </Link>
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2">
          <Link href="/24-ai-agent"
            className="inline-flex text-xs sm:text-sm font-semibold text-white bg-[#C0390E] hover:bg-[#A0300B] active:scale-[0.97] px-2.5 sm:px-3 py-1.5 rounded-lg transition-all">
            <span className="hidden sm:inline">Xem khóa học</span>
            <span className="sm:hidden">Khóa học</span>
          </Link>
          <Link href="/portal"
            className="hidden sm:block text-sm text-[#7A8C7E] hover:text-[#3D6B4A] transition-colors px-2 py-1.5">
            Đăng nhập
          </Link>
        </div>

      </div>
    </header>
  )
}
