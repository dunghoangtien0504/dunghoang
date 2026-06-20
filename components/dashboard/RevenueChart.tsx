'use client'

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { date: '09/05', revenue: 12000000,  orders: 5 },
  { date: '11/05', revenue: 8000000,   orders: 3 },
  { date: '13/05', revenue: 25000000,  orders: 12 },
  { date: '15/05', revenue: 18000000,  orders: 8 },
  { date: '17/05', revenue: 32000000,  orders: 18 },
  { date: '19/05', revenue: 28000000,  orders: 15 },
  { date: '21/05', revenue: 65000000,  orders: 35 },
  { date: '22/05', revenue: 145000000, orders: 78 },
  { date: '23/05', revenue: 120000000, orders: 65 },
  { date: '24/05', revenue: 98000000,  orders: 52 },
  { date: '25/05', revenue: 85000000,  orders: 45 },
  { date: '27/05', revenue: 45000000,  orders: 24 },
  { date: '28/05', revenue: 38000000,  orders: 20 },
  { date: '30/05', revenue: 22000000,  orders: 11 },
]

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
          <span className="text-text-muted">{e.name === 'revenue' ? 'Doanh thu' : 'Don hang'}:</span>
          <span className="text-text-primary font-semibold">
            {e.name === 'revenue' ? `${(e.value / 1_000_000).toFixed(1)}M` : e.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function RevenueChart() {
  return (
    <div className="card card-hover">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="section-title">Xu huong doanh thu</h3>
          <p className="text-text-muted text-xs mt-0.5">Doanh thu & don hang theo ngay</p>
        </div>
        <span className="chip">Theo ngay</span>
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <ComposedChart data={data} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#DDD8CB" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="rev" orientation="left" tickFormatter={fmtRev} tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="ord" orientation="right" tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(v) => (
              <span className="text-text-muted text-xs">{v === 'revenue' ? 'Doanh thu' : 'Don hang'}</span>
            )}
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Bar yAxisId="rev" dataKey="revenue" fill="#C0390E" opacity={0.85} radius={[4, 4, 0, 0]} maxBarSize={22} />
          <Line yAxisId="ord" type="monotone" dataKey="orders" stroke="#0D2B1A" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#0D2B1A' }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
