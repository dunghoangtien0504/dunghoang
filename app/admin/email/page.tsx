'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Users, Send, Zap, Search, Mail, CheckCircle, XCircle, Clock, RefreshCw, Download,
} from 'lucide-react'

const tabs = ['Tổng quan', 'Subscribers', 'Automations', 'Email Logs']

const SEQUENCE_LABELS: Record<string, string> = {
  cross_sell_nurture:  'Chăm sóc chéo (2 ngày/email)',
  khoa1_onboarding:     'Onboarding Khóa 1',
  landing_onboarding:   'Onboarding Landing Page',
  challenge_7ngay:      'Thử thách 7 ngày',
}

function seqLabel(name: string) {
  return SEQUENCE_LABELS[name] ?? name
}

function fmtDateTime(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
}

type SequenceStat = { active: number; completed: number; unsubscribed: number; paused: number; total: number }

type Overview = {
  totalSubscribers: number
  activeSubscribers: number
  unsubscribedCount: number
  totalEmailsSent: number
  activeAutomations: number
  bySequence: Record<string, SequenceStat>
  recentLogs: Array<{
    id: string
    subject: string
    sequence_name: string
    day: number
    sent_at: string
    subscriber: { email: string; name: string | null } | null
  }>
}

type Subscriber = {
  id: string
  email: string
  name: string | null
  source: string | null
  tags: string[] | null
  created_at: string
}

export default function EmailPage() {
  const [activeTab, setActiveTab] = useState('Tổng quan')
  const [overview, setOverview] = useState<Overview | null>(null)
  const [loading, setLoading] = useState(true)

  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [subTotal, setSubTotal] = useState(0)
  const [subSearch, setSubSearch] = useState('')
  const [subLoading, setSubLoading] = useState(false)

  const loadOverview = useCallback(() => {
    setLoading(true)
    fetch('/api/admin/email')
      .then(r => r.json())
      .then(d => setOverview(d))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => { loadOverview() }, [loadOverview])

  const loadSubscribers = useCallback((search: string) => {
    setSubLoading(true)
    const params = new URLSearchParams({ page: '1', pageSize: '30' })
    if (search) params.set('search', search)
    fetch(`/api/admin/email/subscribers?${params}`)
      .then(r => r.json())
      .then(d => { setSubscribers(d.subscribers ?? []); setSubTotal(d.total ?? 0) })
      .catch(() => {})
      .finally(() => setSubLoading(false))
  }, [])

  useEffect(() => {
    if (activeTab === 'Subscribers') loadSubscribers(subSearch)
  }, [activeTab, loadSubscribers, subSearch])

  const statCards = overview ? [
    { label: 'Tổng subscribers', value: overview.totalSubscribers, sub: `${overview.activeSubscribers} đang hoạt động`, icon: Users, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'Email đã gửi', value: overview.totalEmailsSent, sub: 'từ email_logs thật', icon: Send, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Đã huỷ đăng ký', value: overview.unsubscribedCount, sub: `${overview.totalSubscribers ? Math.round((overview.unsubscribedCount / overview.totalSubscribers) * 100) : 0}% tổng`, icon: XCircle, color: 'text-danger', bg: 'bg-danger/10' },
    { label: 'Automations đang chạy', value: overview.activeAutomations, sub: 'chuỗi có subscriber active', icon: Zap, color: 'text-success', bg: 'bg-success/10' },
  ] : []

  return (
    <div className="p-5 space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-text-primary font-bold text-xl">Email Marketing</h1>
          <p className="text-text-muted text-xs mt-0.5">Dữ liệu thật từ subscribers, email_sequences, email_logs</p>
        </div>
        <button onClick={loadOverview} className="btn-ghost text-xs">
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          Làm mới
        </button>
      </div>

      <div className="flex items-center gap-1 border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all duration-150 -mb-px ${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-text-muted hover:text-text-secondary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stat Cards — luôn hiển thị, dùng chung mọi tab */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {(loading ? Array.from({ length: 4 }) : statCards).map((s, i) => {
          if (loading || !s) {
            return <div key={i} className="stat-card animate-pulse h-24" />
          }
          const stat = s as typeof statCards[number]
          const Icon = stat.icon
          return (
            <div key={stat.label} className="stat-card card-hover group">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.bg}`}>
                <Icon size={17} className={stat.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary font-mono">{stat.value}</p>
                <p className="text-text-muted text-[10px] mt-0.5">{stat.label}</p>
                <p className="text-text-muted text-[10px]">{stat.sub}</p>
              </div>
            </div>
          )
        })}
      </div>

      {activeTab === 'Tổng quan' && (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 card card-hover">
            <h3 className="section-title mb-4">Email gần đây nhất (thật)</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="table-header">Chủ đề</th>
                    <th className="table-header">Chuỗi</th>
                    <th className="table-header text-right">Ngày gửi</th>
                  </tr>
                </thead>
                <tbody>
                  {(overview?.recentLogs ?? []).map(log => (
                    <tr key={log.id} className="table-row">
                      <td className="table-cell">
                        <div className="flex items-start gap-2">
                          <Mail size={13} className="text-text-muted mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-text-primary text-xs font-medium line-clamp-1 max-w-[260px]">{log.subject}</p>
                            <p className="text-text-muted text-[10px]">{log.subscriber?.email ?? '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell text-xs text-text-secondary">{seqLabel(log.sequence_name)}</td>
                      <td className="table-cell text-right text-xs text-text-muted flex items-center justify-end gap-1">
                        <Clock size={10} />{fmtDateTime(log.sent_at)}
                      </td>
                    </tr>
                  ))}
                  {!loading && (overview?.recentLogs.length ?? 0) === 0 && (
                    <tr><td colSpan={3} className="table-cell text-center text-text-muted text-xs py-6">Chưa có email nào được gửi</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card card-hover">
            <h3 className="section-title text-sm mb-3">Subscribers</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Đang hoạt động', count: overview?.activeSubscribers ?? 0, iconColor: 'text-success', icon: CheckCircle },
                { label: 'Đã huỷ đăng ký', count: overview?.unsubscribedCount ?? 0, iconColor: 'text-danger', icon: XCircle },
              ].map(item => {
                const total = overview?.totalSubscribers || 1
                const percent = Math.round((item.count / total) * 100)
                const Icon = item.icon
                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <Icon size={11} className={item.iconColor} />
                        <span className="text-text-secondary text-xs">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-text-primary text-xs font-medium font-mono">{item.count}</span>
                        <span className={`text-xs font-medium ${item.iconColor}`}>{percent}%</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className={`progress-fill ${item.iconColor === 'text-success' ? 'bg-success' : 'bg-danger'}`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-text-muted">
              <span>{overview?.totalSubscribers ?? 0} tổng</span>
              <span>{overview?.activeSubscribers ?? 0} active</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Subscribers' && (
        <div className="card card-hover">
          <div className="flex items-center justify-between mb-3">
            <h3 className="section-title">Danh sách subscribers ({subTotal})</h3>
            <a
              href={`/api/admin/email/subscribers/export${subSearch ? `?search=${encodeURIComponent(subSearch)}` : ''}`}
              className="btn-secondary text-xs py-1.5"
            >
              <Download size={13} />
              Tải CSV
            </a>
          </div>
          <div className="relative mb-3">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              value={subSearch}
              onChange={e => setSubSearch(e.target.value)}
              placeholder="Tìm theo tên hoặc email..."
              className="input-field pl-8 py-1.5 text-xs h-8 w-full max-w-xs"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="table-header">Email</th>
                  <th className="table-header">Tên</th>
                  <th className="table-header">Nguồn</th>
                  <th className="table-header">Tags</th>
                  <th className="table-header text-right">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map(s => (
                  <tr key={s.id} className="table-row">
                    <td className="table-cell text-xs text-text-primary">{s.email}</td>
                    <td className="table-cell text-xs text-text-secondary">{s.name ?? '—'}</td>
                    <td className="table-cell text-xs text-text-muted">{s.source ?? '—'}</td>
                    <td className="table-cell">
                      <div className="flex flex-wrap gap-1">
                        {(s.tags ?? []).map(t => (
                          <span key={t} className={`badge ${t === 'unsubscribed' ? 'badge-gray' : 'badge-blue'} text-[10px]`}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="table-cell text-right text-xs text-text-muted">{fmtDateTime(s.created_at)}</td>
                  </tr>
                ))}
                {!subLoading && subscribers.length === 0 && (
                  <tr><td colSpan={5} className="table-cell text-center text-text-muted text-xs py-6">Không tìm thấy subscriber nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Automations' && (
        <div className="card card-hover">
          <h3 className="section-title mb-4">Chuỗi email tự động</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="table-header">Chuỗi</th>
                  <th className="table-header text-right">Đang chạy</th>
                  <th className="table-header text-right">Hoàn tất</th>
                  <th className="table-header text-right">Đã huỷ</th>
                  <th className="table-header text-right">Tạm dừng</th>
                  <th className="table-header text-right">Tổng</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(overview?.bySequence ?? {}).map(([name, stat]) => (
                  <tr key={name} className="table-row">
                    <td className="table-cell text-xs text-text-primary font-medium">{seqLabel(name)}</td>
                    <td className="table-cell text-right text-xs text-success font-mono">{stat.active}</td>
                    <td className="table-cell text-right text-xs text-text-muted font-mono">{stat.completed}</td>
                    <td className="table-cell text-right text-xs text-danger font-mono">{stat.unsubscribed}</td>
                    <td className="table-cell text-right text-xs text-text-muted font-mono">{stat.paused}</td>
                    <td className="table-cell text-right text-xs text-text-primary font-mono">{stat.total}</td>
                  </tr>
                ))}
                {!loading && Object.keys(overview?.bySequence ?? {}).length === 0 && (
                  <tr><td colSpan={6} className="table-cell text-center text-text-muted text-xs py-6">Chưa có chuỗi email nào</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Email Logs' && (
        <div className="card card-hover">
          <h3 className="section-title mb-4">Toàn bộ nhật ký gửi email (30 gần nhất)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="table-header">Chủ đề</th>
                  <th className="table-header">Người nhận</th>
                  <th className="table-header">Chuỗi</th>
                  <th className="table-header text-right">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {(overview?.recentLogs ?? []).map(log => (
                  <tr key={log.id} className="table-row">
                    <td className="table-cell text-xs text-text-primary line-clamp-1 max-w-[260px]">{log.subject}</td>
                    <td className="table-cell text-xs text-text-secondary">{log.subscriber?.email ?? '—'}</td>
                    <td className="table-cell text-xs text-text-muted">{seqLabel(log.sequence_name)}</td>
                    <td className="table-cell text-right text-xs text-text-muted">{fmtDateTime(log.sent_at)}</td>
                  </tr>
                ))}
                {!loading && (overview?.recentLogs.length ?? 0) === 0 && (
                  <tr><td colSpan={4} className="table-cell text-center text-text-muted text-xs py-6">Chưa có email nào được gửi</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
