'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type GrowthDay = { date: string; enrollments: number; newUsers: number }

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
          <span className="text-text-muted">{e.name === 'enrollments' ? 'Ghi danh mới' : 'Tài khoản mới'}:</span>
          <span className="text-text-primary font-semibold">{e.value}</span>
        </div>
      ))}
    </div>
  )
}

const PLACEHOLDER: GrowthDay[] = Array.from({ length: 8 }, (_, i) => ({
  date: `${String(i * 4 + 1).padStart(2,'0')}/06`,
  enrollments: 0,
  newUsers: 0,
}))

export default function GrowthChart({ data }: { data?: GrowthDay[] | null }) {
  const chartData = (data && data.length > 0) ? data : PLACEHOLDER
  const isEmpty   = !data || data.length === 0

  return (
    <div className="card card-hover">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="section-title">Tăng trưởng học viên</h3>
          <p className="text-text-muted text-xs mt-0.5">Ghi danh &amp; tài khoản mới theo ngày</p>
        </div>
        {isEmpty && <span className="chip text-text-muted">Chưa có data</span>}
      </div>
      <ResponsiveContainer width="100%" height={195}>
        <LineChart data={chartData} margin={{ top: 4, right: 4, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#DDD8CB" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: '#7A8C7E', fontSize: 9 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(v) => (
              <span className="text-text-muted text-xs">
                {v === 'enrollments' ? 'Ghi danh mới' : 'Tài khoản mới'}
              </span>
            )}
            wrapperStyle={{ paddingTop: '8px' }}
          />
          <Line type="monotone" dataKey="enrollments" stroke="#0D2B1A" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
          <Line type="monotone" dataKey="newUsers"    stroke="#3D6B4A" strokeWidth={2}   dot={false} activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
