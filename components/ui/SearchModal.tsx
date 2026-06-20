'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { LucideIcon } from 'lucide-react'
import { Search, BookOpen, Users, ShoppingCart, Mail, TrendingUp, FileText, ArrowRight, X, Command } from 'lucide-react'
import { COURSES, ORDERS, CONTACTS } from '@/lib/constants'
import { cn } from '@/lib/utils'

// ─── Search Index ──────────────────────────────────────────────────────────────
interface SearchItem {
  label: string
  sub: string
  href: string
  icon: LucideIcon
  category: string
}

const QUICK_LINKS: Omit<SearchItem, 'sub'>[] = [
  { label: 'Admin Panel',       href: '/admin',               icon: TrendingUp,  category: 'Trang' },
  { label: 'Quan ly Khoa hoc',  href: '/admin/courses',       icon: BookOpen,    category: 'Trang' },
  { label: 'Quan ly Don hang',  href: '/admin/orders',        icon: ShoppingCart,category: 'Trang' },
  { label: 'Khach hang CRM',    href: '/admin/crm/contacts',  icon: Users,       category: 'Trang' },
  { label: 'Pipeline',          href: '/admin/crm/pipeline',  icon: TrendingUp,  category: 'Trang' },
  { label: 'Email Marketing',   href: '/admin/email',         icon: Mail,        category: 'Trang' },
  { label: 'Quan ly Blog',      href: '/admin/blog',          icon: FileText,    category: 'Trang' },
  { label: 'Quan ly Users',     href: '/admin/users',         icon: Users,       category: 'Trang' },
]

function buildIndex() {
  const results: SearchItem[] = [
    ...QUICK_LINKS.map(q => ({ ...q, sub: '' })),
    ...COURSES.map(c => ({ label: c.title, sub: `${c.students} hoc vien · ${(c.price/1_000_000).toFixed(1)}M`, href: '/admin/courses', icon: BookOpen, category: 'Khoa hoc' })),
    ...ORDERS.slice(0, 5).map(o => ({ label: o.customer, sub: `${o.id} · ${(o.amount/1_000_000).toFixed(1)}M`, href: '/admin/orders', icon: ShoppingCart, category: 'Don hang' })),
    ...CONTACTS.slice(0, 5).map(c => ({ label: c.name, sub: `${c.email} · ${c.stage}`, href: '/admin/crm/contacts', icon: Users, category: 'Khach hang' })),
  ]
  return results
}

const SEARCH_INDEX = buildIndex()

// ─── Component ─────────────────────────────────────────────────────────────────
interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery]       = useState('')
  const [selected, setSelected] = useState(0)
  const router                  = useRouter()
  const inputRef                = useRef<HTMLInputElement>(null)

  const results = query.length > 1
    ? SEARCH_INDEX.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.sub.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : QUICK_LINKS.map(q => ({ ...q, sub: '' }))

  const navigate = useCallback((href: string) => {
    router.push(href)
    onClose()
    setQuery('')
  }, [router, onClose])

  // Focus input when open
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Keyboard nav
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown')  { e.preventDefault(); setSelected(s => Math.min(s + 1, results.length - 1)) }
      if (e.key === 'ArrowUp')    { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)) }
      if (e.key === 'Enter')      { e.preventDefault(); if (results[selected]) navigate(results[selected].href) }
      if (e.key === 'Escape')     { onClose() }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, results, selected, navigate, onClose])

  useEffect(() => setSelected(0), [query])

  if (!isOpen) return null

  const grouped = results.reduce((acc, item) => {
    const cat = item.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {} as Record<string, typeof results>)

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl shadow-card-lg overflow-hidden animate-slide-up">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search size={16} className="text-text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tim kiem trang, khoa hoc, khach hang..."
            className="flex-1 bg-transparent text-text-primary text-sm placeholder:text-text-muted outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-text-muted hover:text-text-primary transition-colors">
              <X size={14} />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-1 bg-surface-3 border border-border rounded px-1.5 py-0.5 text-text-muted text-[10px]">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto py-2">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <p className="text-text-muted text-[10px] font-semibold uppercase tracking-wider px-4 py-1.5">
                {category}
              </p>
              {items.map((item, idx) => {
                const Icon = item.icon
                const globalIdx = results.indexOf(item)
                return (
                  <button
                    key={`${item.href}-${idx}`}
                    onClick={() => navigate(item.href)}
                    onMouseEnter={() => setSelected(globalIdx)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                      globalIdx === selected ? 'bg-brand-dark/5' : 'hover:bg-surface-2',
                    )}
                  >
                    <div className={cn(
                      'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0',
                      globalIdx === selected ? 'bg-brand-dark text-text-on-dark' : 'bg-surface-3 text-text-muted',
                    )}>
                      <Icon size={13} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm truncate', globalIdx === selected ? 'text-text-primary font-medium' : 'text-text-secondary')}>
                        {item.label}
                      </p>
                      {item.sub && (
                        <p className="text-text-muted text-[10px] truncate">{item.sub}</p>
                      )}
                    </div>
                    {globalIdx === selected && (
                      <ArrowRight size={12} className="text-text-muted flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          ))}

          {query.length > 1 && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-text-muted text-sm">Khong tim thay ket qua cho "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="border-t border-border px-4 py-2.5 flex items-center gap-4 text-[10px] text-text-muted">
          <span className="flex items-center gap-1"><kbd className="bg-surface-3 border border-border rounded px-1 py-0.5">↑↓</kbd> Di chuyen</span>
          <span className="flex items-center gap-1"><kbd className="bg-surface-3 border border-border rounded px-1 py-0.5">↵</kbd> Mo</span>
          <span className="flex items-center gap-1"><kbd className="bg-surface-3 border border-border rounded px-1 py-0.5">ESC</kbd> Dong</span>
        </div>
      </div>
    </div>
  )
}

// ─── Hook: open with Cmd+K ──────────────────────────────────────────────────────
export function useSearch() {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(v => !v)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])
  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }
}
