'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Bell, ShoppingCart, Users, RefreshCw, CheckCheck, X, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

type NotifType = 'order' | 'student' | 'refund'

interface Notification {
  id: string
  type: NotifType
  title: string
  body: string
  href: string
  time: string
  read: boolean
}

const TYPE_CFG: Record<NotifType, { icon: React.ElementType; color: string; bg: string }> = {
  order:   { icon: ShoppingCart, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
  student: { icon: Users,        color: 'text-brand-border', bg: 'bg-brand-border/10' },
  refund:  { icon: ShoppingCart, color: 'text-danger',       bg: 'bg-danger/10'       },
}

export default function NotificationPanel() {
  const [open, setOpen]     = useState(false)
  const [notifs, setNotifs] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const panelRef            = useRef<HTMLDivElement>(null)
  const unread              = notifs.filter(n => !n.read).length

  const load = useCallback(() => {
    setLoading(true)
    fetch('/api/admin/notifications')
      .then(r => r.json())
      .then(d => setNotifs(d.notifs ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  const markRead    = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const dismiss     = (id: string) => setNotifs(prev => prev.filter(n => n.id !== id))

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen(v => !v)}
        className={cn(
          'relative p-2 rounded-lg text-text-on-dark-2 hover:text-text-on-dark hover:bg-white/10 transition-all',
          open && 'bg-white/10 text-text-on-dark',
        )}
        aria-label={`Thông báo${unread > 0 ? ` (${unread} chưa đọc)` : ''}`}
      >
        <Bell size={16} />
        {unread > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-brand-accent rounded-full flex items-center justify-center text-white text-[9px] font-bold px-0.5">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-2xl shadow-card-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <h3 className="text-text-primary font-semibold text-sm">Thông báo</h3>
              {unread > 0 && (
                <span className="badge bg-brand-accent text-white text-[10px]">{unread} mới</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={load} className="btn-ghost text-[10px] py-1 px-2 gap-1" title="Làm mới">
                <RefreshCw size={10} className={loading ? 'animate-spin' : ''} />
              </button>
              {unread > 0 && (
                <button onClick={markAllRead} className="btn-ghost text-[10px] py-1 px-2 gap-1">
                  <CheckCheck size={11} /> Đọc hết
                </button>
              )}
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {loading && notifs.length === 0 ? (
              <div className="py-8 text-center">
                <RefreshCw size={20} className="text-text-muted mx-auto mb-2 animate-spin" />
                <p className="text-text-muted text-xs">Đang tải...</p>
              </div>
            ) : notifs.length === 0 ? (
              <div className="py-8 text-center">
                <Bell size={24} className="text-text-muted mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-text-muted text-sm">Không có thông báo</p>
              </div>
            ) : (
              notifs.map((n) => {
                const cfg = TYPE_CFG[n.type] ?? TYPE_CFG.order
                const Icon = cfg.icon
                return (
                  <div
                    key={n.id}
                    className={cn(
                      'flex items-start gap-3 px-4 py-3 border-b border-border/50 last:border-0 group transition-colors',
                      n.read ? 'hover:bg-surface-2' : 'bg-brand-dark/2 hover:bg-brand-dark/4',
                    )}
                  >
                    <div className="flex flex-col items-center gap-1 pt-0.5 flex-shrink-0">
                      <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', cfg.bg)}>
                        <Icon size={13} className={cfg.color} />
                      </div>
                      {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />}
                    </div>
                    <Link
                      href={n.href}
                      className="flex-1 min-w-0"
                      onClick={() => { markRead(n.id); setOpen(false) }}
                    >
                      <p className={cn('text-xs font-medium leading-snug', n.read ? 'text-text-secondary' : 'text-text-primary')}>
                        {n.title}
                      </p>
                      <p className="text-text-muted text-[10px] leading-relaxed mt-0.5 line-clamp-2">{n.body}</p>
                      <p className="text-text-muted text-[9px] mt-1">{n.time}</p>
                    </Link>
                    <button
                      onClick={() => dismiss(n.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-text-primary p-0.5 flex-shrink-0"
                    >
                      <X size={11} />
                    </button>
                  </div>
                )
              })
            )}
          </div>

          <div className="border-t border-border px-4 py-2.5">
            <Link
              href="/admin/notifications"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 text-text-muted text-xs hover:text-brand-accent transition-colors"
            >
              Xem tất cả thông báo <ExternalLink size={11} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
