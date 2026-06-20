'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { date: '01/05', enrollments: 18, newUsers: 24 },
  { date: '05/05', enrollments: 28, newUsers: 35 },
  { date: '09/05', enrollments: 35, newUsers: 48 },
  { date: '13/05', enrollments: 55, newUsers: 68 },
  { date: '17/05', enrollments: 72, newUsers: 88 },
  { date: '21/05', enrollments: 120, newUsers: 140 },
  { date: '23/05', enrollments: 98, newUsers: 115 },
  { date: '27/05', enrollments: 45, newUsers: 58 },
  { date: '29/05', enrollments: 30, newUsers: 40 },
]

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
          <span className="text-text-muted">{e.name === 'enrollments' ? 'New Enrollments' : 'New Users'}:</span>
          <span className="text-text-primary font-semibold">{e.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function GrowthChart() {
  return (
    <div className="card card-hover">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="section-title">Tang truong hoc vien</h3>
          <p className="text-text-muted text-xs mt-0.5">Dang ky moi theo ngay</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={195}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#DDD8CB" vertical={false} />
          <XAxis dataKey="date" tick={{ fill: '#7A8C7E', fontSize: 9 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(v) => (
              <span className="text-text-muted text-xs">
                {v === 'enrollments' ? 'New Enrollments' : 'New Users'}
              </span>
            )}
            wrapperStyle={{ paddingTop: '8px' }}
          />
          <Line type="monotone" dataKey="enrollments" stroke="#0D2B1A" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
          <Line type="monotone" dataKey="newUsers" stroke="#3D6B4A" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
