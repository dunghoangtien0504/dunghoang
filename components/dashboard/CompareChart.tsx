'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type CompareDay = { day: string; current: number; previous: number }

const fmtM = (v: number) => v === 0 ? '0' : `${(v / 1_000_000).toFixed(0)}M`

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
          <span className="text-text-muted">
            {e.name === 'current' ? '30 ngày qua' : '30 ngày trước'}:
          </span>
          <span className="text-text-primary font-semibold">{(e.value / 1_000_000).toFixed(1)}M</span>
        </div>
      ))}
    </div>
  )
}

const PLACEHOLDER: CompareDay[] = Array.from({ length: 10 }, (_, i) => ({
  day: `Ngày ${i * 3 + 1}`,
  current: 0,
  previous: 0,
}))

export default function CompareChart({ data }: { data?: CompareDay[] | null }) {
  const chartData = (data && data.length > 0) ? data : PLACEHOLDER
  const isEmpty   = !data || data.every(d => d.current === 0 && d.previous === 0)

  return (
    <div className="card card-hover">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="section-title">So sánh doanh thu</h3>
          <p className="text-text-muted text-xs mt-0.5">30 ngày qua vs 30 ngày trước</p>
        </div>
        {isEmpty && <span className="chip text-text-muted">Chưa đủ data</span>}
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={chartData} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#DDD8CB" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={fmtM} tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(v) => (
              <span className="text-text-muted text-xs">
                {v === 'current' ? '30 ngày qua' : '30 ngày trước'}
              </span>
            )}
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Line type="monotone" dataKey="current"  stroke="#C0390E" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#C0390E' }} />
          <Line type="monotone" dataKey="previous" stroke="#88860B" strokeWidth={1.5} strokeDasharray="5 4" dot={false} activeDot={{ r: 4, fill: '#88860B' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
