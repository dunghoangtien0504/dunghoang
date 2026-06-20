'use client'

import { useState } from 'react'
import {
  Users, Send, Eye, MousePointer, Zap, Plus, Search,
  Filter, ChevronRight, Mail, TrendingUp, MoreHorizontal,
  Clock, CheckCircle, FileText, Settings
} from 'lucide-react'

const tabs = ['Tổng quan', 'Campaigns', 'Subscribers', 'Lists', 'Templates', 'Automations', 'Tags', 'Analytics']

const campaigns = [
  { id: 1, title: 'Google tặng 4 tháng gói Pro miễn phí trị giá hơn 2 triệu', sent: 426, open: 26, click: 0, status: 'sent', date: '24/5/2026' },
  { id: 2, title: 'Update VEO3.1 lên OMNI FLASH', sent: 400, open: 30, click: 0, status: 'sent', date: '23/5/2026' },
  { id: 3, title: 'Zoom WebAllInOne - Mời Sinh Tố 100K - 22.05.2026', sent: 357, open: 24, click: 1, status: 'sent', date: '22/5/2026' },
  { id: 4, title: 'Zoom WebAllInOne - Mời Sinh Tố 100K - 22.05.2026', sent: 0, open: 0, click: 0, status: 'draft', date: '22/5/2026' },
  { id: 5, title: 'Zoom KOL AI', sent: 248, open: 43, click: 6, status: 'sent', date: '15/5/2026' },
  { id: 6, title: 'Ra mắt khoá học Affiliate Marketing 2026', sent: 312, open: 38, click: 4, status: 'sent', date: '10/5/2026' },
]

const statCards = [
  { label: 'Tổng subscribers', value: '480', sub: '480 đang hoạt động', icon: Users, color: 'text-accent', bg: 'bg-accent/10', trend: '+12%' },
  { label: 'Email đã gửi', value: '1.434', sub: '8 campaigns', icon: Send, color: 'text-primary', bg: 'bg-primary/10', trend: '+8%' },
  { label: 'Open rate TB', value: '29.5%', sub: '423 lượt mở', icon: Eye, color: 'text-purple-400', bg: 'bg-purple-500/10', trend: '+3.2%' },
  { label: 'Click rate TB', value: '1.3%', sub: '19 lượt click', icon: MousePointer, color: 'text-pink-400', bg: 'bg-pink-500/10', trend: '-0.2%' },
  { label: 'Active Automations', value: '0', sub: 'workflows đang chạy', icon: Zap, color: 'text-success', bg: 'bg-success/10' },
]

function StatusBadge({ status }: { status: string }) {
  if (status === 'sent') return <span className="badge badge-success">Đã gửi</span>
  if (status === 'draft') return <span className="badge badge-gray">Bản nháp</span>
  if (status === 'scheduled') return <span className="badge badge-blue">Đã lên lịch</span>
  return null
}

export default function EmailPage() {
  const [activeTab, setActiveTab] = useState('Tổng quan')

  return (
    <div className="p-5 space-y-5 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-text-primary font-bold text-xl">Email Marketing</h1>
        <p className="text-text-muted text-xs mt-0.5">Quản lý campaigns, subscribers & analytics</p>
      </div>

      {/* Tabs */}
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

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {statCards.map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="stat-card card-hover group">
              <div className="flex items-start justify-between">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg}`}>
                  <Icon size={17} className={s.color} />
                </div>
                {s.trend && (
                  <div className={`flex items-center gap-1 text-[10px] font-medium ${s.trend.startsWith('+') ? 'text-success' : 'text-danger'}`}>
                    <TrendingUp size={10} />
                    {s.trend}
                  </div>
                )}
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary font-mono">{s.value}</p>
                <p className="text-text-muted text-[10px] mt-0.5">{s.label}</p>
                <p className="text-text-muted text-[10px]">{s.sub}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Campaigns Table - 2/3 */}
        <div className="col-span-2 card card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Campaigns gần đây</h3>
            <div className="flex items-center gap-2">
              <button className="btn-ghost text-xs">
                Xem tất cả <ChevronRight size={12} />
              </button>
              <button className="btn-primary text-xs py-1.5">
                <Plus size={13} />
                Tạo campaign
              </button>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input placeholder="Tìm campaign..." className="input-field pl-8 py-1.5 text-xs h-8" />
            </div>
            <button className="btn-secondary text-xs py-1.5">
              <Filter size={12} />
              Lọc
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="table-header">Tiêu đề</th>
                  <th className="table-header text-right">Gửi</th>
                  <th className="table-header text-right">Open %</th>
                  <th className="table-header text-right">Click %</th>
                  <th className="table-header text-right">Trạng thái</th>
                  <th className="table-header"></th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-start gap-2">
                        <Mail size={13} className="text-text-muted mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-text-primary text-xs font-medium line-clamp-1 max-w-[280px]">{c.title}</p>
                          <p className="text-text-muted text-[10px] flex items-center gap-1 mt-0.5">
                            <Clock size={9} />{c.date}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-right font-mono">
                      {c.status === 'draft' ? <span className="text-text-muted">—</span> : c.sent}
                    </td>
                    <td className="table-cell text-right">
                      {c.status === 'draft' ? (
                        <span className="text-text-muted">—</span>
                      ) : (
                        <span className={c.open >= 30 ? 'text-success font-medium' : 'text-primary font-medium'}>
                          {c.open}%
                        </span>
                      )}
                    </td>
                    <td className="table-cell text-right">
                      {c.status === 'draft' ? (
                        <span className="text-text-muted">—</span>
                      ) : (
                        <span className={c.click > 0 ? 'text-accent font-medium' : 'text-text-muted'}>
                          {c.click}%
                        </span>
                      )}
                    </td>
                    <td className="table-cell text-right">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="table-cell">
                      <button className="btn-ghost p-1">
                        <MoreHorizontal size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-4">
          {/* Subscribers Breakdown */}
          <div className="card card-hover">
            <div className="flex items-center justify-between mb-3">
              <h3 className="section-title text-sm">Subscribers</h3>
              <button className="btn-ghost text-xs">Quản lý</button>
            </div>

            <div className="space-y-2.5">
              {[
                { label: 'Đang hoạt động', count: 480, total: 480, percent: 100, color: 'bg-success', icon: CheckCircle, iconColor: 'text-success' },
                { label: 'Huỷ đăng ký', count: 0, total: 480, percent: 0, color: 'bg-danger', icon: Users, iconColor: 'text-danger' },
                { label: 'Bounce rate', count: 0, total: 480, percent: 0, color: 'bg-warning', icon: Mail, iconColor: 'text-warning' },
              ].map((item) => {
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
                        <span className={`text-xs font-medium ${item.iconColor}`}>{item.percent}%</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className={`progress-fill ${item.color}`} style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-text-muted">
              <span>480 tổng</span>
              <span>480 active</span>
            </div>
          </div>

          {/* Quick Broadcast */}
          <div className="card card-hover">
            <h3 className="section-title text-sm mb-3">Gửi broadcast nhanh</h3>
            <div className="space-y-2">
              <input placeholder="Tiêu đề email..." className="input-field text-xs" />
              <textarea
                placeholder="Nội dung email..."
                rows={3}
                className="input-field text-xs resize-none"
              />
              <button className="btn-primary w-full justify-center text-xs py-2">
                <Send size={13} />
                Gửi ngay
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="card card-hover">
            <h3 className="section-title text-sm mb-3">Nhanh</h3>
            <div className="space-y-1">
              {[
                { label: 'Tạo campaign mới', icon: Plus },
                { label: 'Xem templates', icon: FileText },
                { label: 'Thiết lập automation', icon: Zap },
                { label: 'Cài đặt sender', icon: Settings },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button key={item.label} className="w-full sidebar-item text-xs">
                    <Icon size={13} className="text-primary" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
