'use client'

import { useState, useEffect, useCallback } from 'react'
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Eye, Users, Monitor, Smartphone, Tablet, RefreshCw, TrendingUp, Globe } from 'lucide-react'
import { clsx } from 'clsx'

type TrafficData = {
  totalViews: number
  uniqueVisitors: number
  timeline: { label: string; views: number; unique: number }[]
  topPages: { path: string; count: number }[]
  devices: Record<string, number>
}

type RangeKey = 'today' | '7d' | '30d' | '90d' | 'custom'
type GroupKey = 'hour' | 'day' | 'week' | 'month'

const RANGE_OPTIONS: { key: RangeKey; label: string; defaultGroup: GroupKey }[] = [
  { key: 'today', label: 'Hôm nay',  defaultGroup: 'hour' },
  { key: '7d',    label: '7 ngày',   defaultGroup: 'day' },
  { key: '30d',   label: '30 ngày',  defaultGroup: 'day' },
  { key: '90d',   label: '90 ngày',  defaultGroup: 'week' },
  { key: 'custom',label: 'Tùy chọn', defaultGroup: 'day' },
]

const GROUP_OPTIONS: { key: GroupKey; label: string }[] = [
  { key: 'hour',  label: 'Giờ' },
  { key: 'day',   label: 'Ngày' },
  { key: 'week',  label: 'Tuần' },
  { key: 'month', label: 'Tháng' },
]

const DEVICE_COLORS: Record<string, string> = {
  desktop: '#0D2B1A',
  mobile:  '#C0390E',
  tablet:  '#88860B',
}
const DEVICE_LABELS: Record<string, string> = {
  desktop: 'Máy tính',
  mobile:  'Di động',
  tablet:  'Máy tính bảng',
}
const DEVICE_ICONS: Record<string, React.ReactNode> = {
  desktop: <Monitor size={14} />,
  mobile:  <Smartphone size={14} />,
  tablet:  <Tablet size={14} />,
}

function toISO(d: Date) { return d.toISOString() }

function getRange(key: RangeKey, customFrom?: string, customTo?: string): { from: string; to: string } {
  const now = new Date()
  const to = toISO(now)

  if (key === 'custom' && customFrom && customTo) {
    return { from: new Date(customFrom).toISOString(), to: new Date(customTo + 'T23:59:59').toISOString() }
  }

  const d = new Date(now)
  switch (key) {
    case 'today':
      d.setHours(0, 0, 0, 0)
      break
    case '7d':
      d.setDate(d.getDate() - 7)
      break
    case '30d':
      d.setDate(d.getDate() - 30)
      break
    case '90d':
      d.setDate(d.getDate() - 90)
      break
  }
  return { from: toISO(d), to }
}

function fmtDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-border rounded-xl p-3 shadow-card-md text-xs">
      <p className="text-text-secondary font-semibold mb-2">{label}</p>
      {payload.map((e) => (
        <div key={e.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
          <span className="text-text-muted">{e.name === 'views' ? 'Lượt xem' : 'Khách'}:</span>
          <span className="text-text-primary font-semibold">{e.value.toLocaleString('vi-VN')}</span>
        </div>
      ))}
    </div>
  )
}

export default function TrafficPage() {
  const [range, setRange]         = useState<RangeKey>('7d')
  const [group, setGroup]         = useState<GroupKey>('day')
  const [customFrom, setCustomFrom] = useState(fmtDate(new Date(Date.now() - 7 * 86400000)))
  const [customTo, setCustomTo]     = useState(fmtDate(new Date()))
  const [data, setData]           = useState<TrafficData | null>(null)
  const [loading, setLoading]     = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    const { from, to } = getRange(range, customFrom, customTo)
    fetch(`/api/admin/traffic?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&group=${group}`)
      .then(r => r.json())
      .then(setData)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [range, group, customFrom, customTo])

  useEffect(() => { load() }, [load])

  function selectRange(key: RangeKey) {
    setRange(key)
    const opt = RANGE_OPTIONS.find(o => o.key === key)
    if (opt) setGroup(opt.defaultGroup)
  }

  const totalDevices = data ? Object.values(data.devices).reduce((s, v) => s + v, 0) : 0
  const pieData = data
    ? Object.entries(data.devices).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }))
    : []
  const avgPerBucket = data && data.timeline.length
    ? Math.round(data.totalViews / data.timeline.length)
    : 0

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Lưu Lượng Truy Cập</h1>
          <p className="page-subtitle">Thống kê pageview theo thời gian thực từ Supabase</p>
        </div>
        <button className="btn-primary text-xs py-1.5" onClick={load} disabled={loading}>
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          Làm mới
        </button>
      </div>

      {/* Range selector */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex bg-surface border border-border rounded-lg p-0.5 shadow-card">
          {RANGE_OPTIONS.map(opt => (
            <button
              key={opt.key}
              onClick={() => selectRange(opt.key)}
              className={clsx(
                'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                range === opt.key
                  ? 'bg-brand-dark text-white shadow-btn'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {range === 'custom' && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={customFrom}
              onChange={e => setCustomFrom(e.target.value)}
              className="input-field text-xs py-1.5 w-36"
            />
            <span className="text-text-muted text-xs">→</span>
            <input
              type="date"
              value={customTo}
              onChange={e => setCustomTo(e.target.value)}
              className="input-field text-xs py-1.5 w-36"
            />
          </div>
        )}

        <div className="ml-auto flex bg-surface border border-border rounded-lg p-0.5 shadow-card">
          {GROUP_OPTIONS.map(opt => (
            <button
              key={opt.key}
              onClick={() => setGroup(opt.key)}
              className={clsx(
                'px-2.5 py-1 rounded-md text-xs font-medium transition-all',
                group === opt.key
                  ? 'bg-brand-accent text-white shadow-btn'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard
          icon={<Eye size={18} className="text-brand-accent" />}
          iconBg="bg-brand-accent/10"
          label="Tổng lượt xem"
          value={loading ? '...' : (data?.totalViews ?? 0).toLocaleString('vi-VN')}
        />
        <KPICard
          icon={<Users size={18} className="text-brand-dark" />}
          iconBg="bg-brand-dark/10"
          label="Khách duy nhất"
          value={loading ? '...' : (data?.uniqueVisitors ?? 0).toLocaleString('vi-VN')}
        />
        <KPICard
          icon={<TrendingUp size={18} className="text-brand-border" />}
          iconBg="bg-brand-border/10"
          label={`TB/${group === 'hour' ? 'giờ' : group === 'day' ? 'ngày' : group === 'week' ? 'tuần' : 'tháng'}`}
          value={loading ? '...' : avgPerBucket.toLocaleString('vi-VN')}
        />
        <KPICard
          icon={<Globe size={18} className="text-brand-olive" />}
          iconBg="bg-brand-olive/10"
          label="Trang phổ biến nhất"
          value={loading ? '...' : (data?.topPages?.[0]?.path ?? '—')}
          small
        />
      </div>

      {/* Main chart */}
      <div className="card card-hover">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="section-title">Lượt xem theo thời gian</h3>
            <p className="text-text-muted text-xs mt-0.5">Pageview &amp; khách duy nhất</p>
          </div>
          <span className="chip">{loading ? 'Đang tải...' : `${data?.timeline?.length ?? 0} điểm dữ liệu`}</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data?.timeline ?? []} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C0390E" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#C0390E" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gUnique" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0D2B1A" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#0D2B1A" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#DDD8CB" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="views" stroke="#C0390E" strokeWidth={2} fill="url(#gViews)" name="views" />
            <Area type="monotone" dataKey="unique" stroke="#0D2B1A" strokeWidth={2} fill="url(#gUnique)" name="unique" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3 justify-center">
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <div className="w-3 h-1 rounded bg-brand-accent" /> Lượt xem
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <div className="w-3 h-1 rounded bg-brand-dark" /> Khách duy nhất
          </div>
        </div>
      </div>

      {/* Row 2: Top pages + Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top pages */}
        <div className="card card-hover">
          <h3 className="section-title mb-4">Top trang được xem nhiều nhất</h3>
          {loading ? (
            <p className="text-text-muted text-xs">Đang tải...</p>
          ) : !data?.topPages?.length ? (
            <p className="text-text-muted text-xs">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-2">
              {data.topPages.map((pg, i) => {
                const pct = data.totalViews ? (pg.count / data.totalViews) * 100 : 0
                return (
                  <div key={pg.path} className="flex items-center gap-3">
                    <span className="text-[10px] text-text-muted font-mono w-4 text-right">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-medium text-text-primary truncate">{pg.path}</span>
                        <span className="text-xs font-mono text-text-muted ml-2 flex-shrink-0">
                          {pg.count.toLocaleString('vi-VN')}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-brand-accent/70 transition-all"
                          style={{ width: `${Math.max(pct, 2)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Devices */}
        <div className="card card-hover">
          <h3 className="section-title mb-4">Thiết bị truy cập</h3>
          <div className="flex items-center gap-6">
            <div className="w-40 h-40 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={DEVICE_COLORS[entry.name] ?? '#ccc'} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {Object.entries(data?.devices ?? {}).map(([device, count]) => {
                const pct = totalDevices ? ((count / totalDevices) * 100).toFixed(1) : '0'
                return (
                  <div key={device} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: DEVICE_COLORS[device] + '15', color: DEVICE_COLORS[device] }}
                    >
                      {DEVICE_ICONS[device]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-text-primary">{DEVICE_LABELS[device] ?? device}</span>
                        <span className="text-xs font-mono text-text-muted">{pct}%</span>
                      </div>
                      <p className="text-[10px] text-text-muted">{count.toLocaleString('vi-VN')} lượt</p>
                    </div>
                  </div>
                )
              })}
              {loading && <p className="text-text-muted text-xs">Đang tải...</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Hourly heatmap bar chart */}
      {group === 'hour' && data?.timeline && data.timeline.length > 0 && (
        <div className="card card-hover">
          <h3 className="section-title mb-4">Phân bố theo giờ</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data.timeline} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDD8CB" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: '#7A8C7E', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="views" fill="#C0390E" opacity={0.85} radius={[3, 3, 0, 0]} maxBarSize={18} name="views" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

function KPICard({ icon, iconBg, label, value, small }: {
  icon: React.ReactNode; iconBg: string; label: string; value: string; small?: boolean
}) {
  return (
    <div className="stat-card card-hover group">
      <div className="flex items-start justify-between">
        <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-card', iconBg)}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-text-muted text-xs mb-0.5">{label}</p>
        <p className={clsx(
          'font-bold text-text-primary leading-tight',
          small ? 'text-sm truncate' : 'text-2xl font-mono'
        )}>
          {value}
        </p>
      </div>
    </div>
  )
}
