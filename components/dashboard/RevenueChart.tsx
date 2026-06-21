'use client'

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type RevenueDay = { date: string; revenue: number; orders: number }

const fmtRev = (v: number) =>
  v >= 1_000_000 ? `${(v / 1_000_000).toFixed(0)}M` : `${(v / 1_000).toFixed(0)}K`

interface TooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-border rounded-xl p-3 shadow-card-md text-xs">
      <p className="text-text-secondary font-semibold mb-2">{label}</p>
      {payload.map((e) => (
        <div key={e.name} className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }} />
          <span className="text-text-muted">{e.name === 'revenue' ? 'Doanh thu' : 'Đơn hàng'}:</span>
          <span className="text-text-primary font-semibold">
            {e.name === 'revenue' ? `${(e.value / 1_000_000).toFixed(1)}M` : e.value}
          </span>
        </div>
      ))}
    </div>
  )
}

const PLACEHOLDER: RevenueDay[] = Array.from({ length: 8 }, (_, i) => ({
  date: `${String(i * 4 + 1).padStart(2,'0')}/06`,
  revenue: 0,
  orders: 0,
}))

export default function RevenueChart({ data }: { data?: RevenueDay[] | null }) {
  const chartData = (data && data.length > 0) ? data : PLACEHOLDER
  const isEmpty   = !data || data.length === 0

  return (
    <div className="card card-hover">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="section-title">Xu hướng doanh thu</h3>
          <p className="text-text-muted text-xs mt-0.5">Doanh thu &amp; đơn hàng theo ngày (30 ngày qua)</p>
        </div>
        <span className="chip">{isEmpty ? 'Chưa có data' : 'Dữ liệu thật'}</span>
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <ComposedChart data={chartData} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#DDD8CB" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="rev" orientation="left" tickFormatter={fmtRev} tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="ord" orientation="right" tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(v) => (
              <span className="text-text-muted text-xs">{v === 'revenue' ? 'Doanh thu' : 'Đơn hàng'}</span>
            )}
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Bar yAxisId="rev" dataKey="revenue" fill="#C0390E" opacity={isEmpty ? 0.2 : 0.85} radius={[4,4,0,0]} maxBarSize={22} />
          <Line yAxisId="ord" type="monotone" dataKey="orders" stroke="#0D2B1A" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#0D2B1A' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
