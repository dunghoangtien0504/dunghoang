'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { Bell, ShoppingCart, Users, Mail, TrendingUp, CheckCheck, X, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

type NotifType = 'order' | 'student' | 'email' | 'sale'

interface Notification {
  id: number
  type: NotifType
  title: string
  body: string
  href: string
  time: string
  read: boolean
}

const MOCK_NOTIFS: Notification[] = [
  { id: 1, type: 'order',   title: 'Don hang moi',         body: 'Nguyen Van An vua mua Affiliate Marketing 2026 — 1.99M',     href: '/admin/orders',       time: '2 phut truoc',   read: false },
  { id: 2, type: 'student', title: 'Hoc vien moi',         body: 'Tran Thi Binh da dang ky khoa Content System 10X',           href: '/admin/users',        time: '15 phut truoc',  read: false },
  { id: 3, type: 'email',   title: 'Campaign da gui',      body: 'Campaign "Update VEO3.1" da gui thanh cong — 400 emails',    href: '/admin/email',        time: '1 gio truoc',    read: false },
  { id: 4, type: 'sale',    title: 'Deal duoc cap nhat',   body: 'Le Minh Cuong chuyen sang giai doan "Quan tam"',             href: '/admin/crm/pipeline', time: '2 gio truoc',    read: true  },
  { id: 5, type: 'order',   title: 'Don hang hoan tien',   body: 'Hoang Van Em yeu cau hoan tien don DH240105 — 1.99M',        href: '/admin/orders',       time: '3 gio truoc',    read: true  },
  { id: 6, type: 'student', title: '5 hoc vien hoan thanh',body: '5 hoc vien vua hoan thanh khoa Affiliate Marketing',         href: '/admin/users',        time: 'Hom qua',        read: true  },
]

const TYPE_CFG: Record<NotifType, { icon: React.ElementType; color: string; bg: string }> = {
  order:   { icon: ShoppingCart, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
  student: { icon: Users,        color: 'text-brand-border', bg: 'bg-brand-border/10' },
  email:   { icon: Mail,         color: 'text-brand-olive',  bg: 'bg-brand-olive/10'  },
  sale:    { icon: TrendingUp,   color: 'text-success',      bg: 'bg-success-light'   },
}

export default function NotificationPanel() {
  const [open, setOpen]   = useState(false)
  const [notifs, setNotifs] = useState(MOCK_NOTIFS)
  const panelRef          = useRef<HTMLDivElement>(null)
  const unread            = notifs.filter(n => !n.read).length

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  const markRead    = (id: number) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const dismiss     = (id: number) => setNotifs(prev => prev.filter(n => n.id !== id))

  return (
    <div className="relative" ref={panelRef}>
      {/* Bell button */}
      <button
        onClick={() => setOpen(v => !v)}
        className={cn(
          'relative p-2 rounded-lg text-text-on-dark-2 hover:text-text-on-dark hover:bg-white/10 transition-all',
          open && 'bg-white/10 text-text-on-dark',
        )}
        aria-label={`Thong bao${unread > 0 ? ` (${unread} chua doc)` : ''}`}
      >
        <Bell size={16} />
        {unread > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 bg-brand-accent rounded-full flex items-center justify-center text-white text-[9px] font-bold px-0.5">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-2xl shadow-card-lg z-50 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <h3 className="text-text-primary font-semibold text-sm">Thong bao</h3>
              {unread > 0 && (
                <span className="badge bg-brand-accent text-white text-[10px]">{unread} moi</span>
              )}
            </div>
            {unread > 0 && (
              <button onClick={markAllRead} className="btn-ghost text-[10px] py-1 px-2 gap-1">
                <CheckCheck size={11} /> Doc het
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto">
            {notifs.length === 0 ? (
              <div className="py-8 text-center">
                <Bell size={24} className="text-text-muted mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-text-muted text-sm">Khong co thong bao</p>
              </div>
            ) : (
              notifs.map((n) => {
                const cfg = TYPE_CFG[n.type]
                const Icon = cfg.icon
                return (
                  <div
                    key={n.id}
                    className={cn(
                      'flex items-start gap-3 px-4 py-3 border-b border-border/50 last:border-0 group transition-colors',
                      n.read ? 'hover:bg-surface-2' : 'bg-brand-dark/2 hover:bg-brand-dark/4',
                    )}
                  >
                    {/* Unread dot */}
                    <div className="flex flex-col items-center gap-1 pt-0.5 flex-shrink-0">
                      <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', cfg.bg)}>
                        <Icon size={13} className={cfg.color} />
                      </div>
                      {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />}
                    </div>

                    {/* Content */}
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

                    {/* Dismiss */}
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

          {/* Footer */}
          <div className="border-t border-border px-4 py-2.5">
            <Link
              href="/admin/notifications"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 text-text-muted text-xs hover:text-brand-accent transition-colors"
            >
              Xem tat ca thong bao <ExternalLink size={11} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
