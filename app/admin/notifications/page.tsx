'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Bell, ShoppingCart, Users, CheckCheck, RefreshCw, Zap } from 'lucide-react'

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

const TYPE_CFG = {
  order:   { icon: ShoppingCart, color: 'text-brand-accent', bg: 'bg-brand-accent/10', label: 'Đơn hàng' },
  student: { icon: Users,        color: 'text-brand-border', bg: 'bg-brand-border/10', label: 'Học viên' },
  refund:  { icon: ShoppingCart, color: 'text-danger',       bg: 'bg-danger/10',        label: 'Hoàn tiền' },
}

type FilterType = 'all' | NotifType

export default function NotificationsPage() {
  const [notifs, setNotifs]       = useState<Notification[]>([])
  const [loading, setLoading]     = useState(true)
  const [typeFilter, setTypeFilter] = useState<FilterType>('all')

  const load = useCallback(() => {
    setLoading(true)
    fetch('/api/admin/notifications')
      .then(r => r.json())
      .then(d => setNotifs(d.notifs ?? []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = notifs.filter(n => typeFilter === 'all' || n.type === typeFilter)
  const unread   = notifs.filter(n => !n.read).length
  const markAll  = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Thông báo</h1>
          <p className="page-subtitle">
            {loading ? 'Đang tải...' : `${unread} chưa đọc · ${notifs.length} tổng (30 ngày qua)`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unread > 0 && (
            <button onClick={markAll} className="btn-secondary text-xs py-1.5">
              <CheckCheck size={12} />Đọc tất cả
            </button>
          )}
          <button onClick={load} disabled={loading} className="btn-primary text-xs py-1.5">
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />Làm mới
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Notification list */}
        <div className="col-span-2 space-y-3">
          {/* Filter */}
          <div className="flex items-center gap-1 bg-surface border border-border rounded-lg p-1 w-fit shadow-card">
            {(['all', 'order', 'student', 'refund'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  typeFilter === f ? 'bg-brand-dark text-text-on-dark' : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {f === 'all' ? 'Tất cả' : TYPE_CFG[f].label}
              </button>
            ))}
          </div>

          <div className="card divide-y divide-border/50 p-0 overflow-hidden">
            {loading ? (
              <div className="py-10 text-center">
                <RefreshCw size={20} className="text-text-muted mx-auto mb-2 animate-spin" />
                <p className="text-text-muted text-sm">Đang tải thông báo...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-10 text-center">
                <Bell size={28} className="text-text-muted mx-auto mb-2" strokeWidth={1.5} />
                <p className="text-text-muted text-sm">Không có thông báo</p>
                <p className="text-text-muted text-xs mt-1">Thông báo sẽ xuất hiện khi có đơn hàng hoặc học viên mới</p>
              </div>
            ) : (
              filtered.map(n => {
                const cfg = TYPE_CFG[n.type] ?? TYPE_CFG.order
                const Icon = cfg.icon
                return (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 p-4 transition-colors group cursor-pointer ${
                      n.read ? 'hover:bg-surface-2' : 'bg-brand-dark/2 hover:bg-brand-dark/4'
                    }`}
                    onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                      <Icon size={15} className={cfg.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-medium ${n.read ? 'text-text-secondary' : 'text-text-primary'}`}>
                          {n.title}
                        </p>
                        {!n.read && <div className="w-2 h-2 rounded-full bg-brand-accent flex-shrink-0" />}
                      </div>
                      <p className="text-text-muted text-xs mt-0.5">{n.body}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-text-muted text-[10px]">{n.time}</p>
                      <span className={`badge text-[9px] mt-1 ${cfg.bg} ${cfg.color} border-0`}>
                        {cfg.label}
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          {/* Stats */}
          <div className="card card-hover p-4">
            <h3 className="section-title text-sm mb-3">Tổng quan</h3>
            <div className="space-y-2.5">
              {(Object.entries(TYPE_CFG) as [NotifType, typeof TYPE_CFG[NotifType]][]).map(([key, cfg]) => {
                const count   = notifs.filter(n => n.type === key).length
                const unreadN = notifs.filter(n => n.type === key && !n.read).length
                const Icon = cfg.icon
                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${cfg.bg}`}>
                        <Icon size={11} className={cfg.color} />
                      </div>
                      <span className="text-text-secondary text-xs">{cfg.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-text-primary font-mono text-xs font-semibold">{count}</span>
                      {unreadN > 0 && (
                        <span className="badge bg-brand-accent text-white text-[9px]">{unreadN}</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Channels */}
          <div className="card card-hover p-4 bg-brand-dark/2 border-brand-border/15">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={13} className="text-brand-olive" />
              <h3 className="section-title text-sm">Kênh thông báo</h3>
            </div>
            <div className="space-y-1.5 text-xs text-text-muted">
              <div className="flex justify-between"><span>In-app</span><span className="text-success font-medium">Đang hoạt động</span></div>
              <div className="flex justify-between"><span>Email (Resend)</span><span className="text-success font-medium">Đang hoạt động</span></div>
              <div className="flex justify-between"><span>Push browser</span><span className="italic">Chưa kích hoạt</span></div>
              <div className="flex justify-between"><span>Zalo OA</span><span className="italic">Chưa kết nối</span></div>
            </div>
          </div>

          {/* Quick nav */}
          <div className="card card-hover p-4">
            <h3 className="section-title text-sm mb-3">Truy cập nhanh</h3>
            <div className="space-y-1">
              {[
                { href: '/admin/orders', label: 'Quản lý đơn hàng' },
                { href: '/admin/users',  label: 'Quản lý users' },
                { href: '/admin',        label: 'Admin Dashboard' },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-2 text-xs text-text-secondary hover:text-text-primary transition-colors">
                  {l.label}
                  <span className="text-text-muted">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
