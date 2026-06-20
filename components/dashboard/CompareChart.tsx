'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Day 1',  current: 18000000,  previous: 22000000 },
  { day: 'Day 3',  current: 45000000,  previous: 35000000 },
  { day: 'Day 5',  current: 32000000,  previous: 48000000 },
  { day: 'Day 7',  current: 60000000,  previous: 42000000 },
  { day: 'Day 9',  current: 75000000,  previous: 55000000 },
  { day: 'Day 11', current: 88000000,  previous: 62000000 },
  { day: 'Day 13', current: 95000000,  previous: 70000000 },
  { day: 'Day 15', current: 110000000, previous: 82000000 },
  { day: 'Day 17', current: 145000000, previous: 95000000 },
  { day: 'Day 19', current: 125000000, previous: 108000000 },
  { day: 'Day 21', current: 98000000,  previous: 115000000 },
  { day: 'Day 23', current: 72000000,  previous: 90000000 },
]

const fmtM = (v: number) => `${(v / 1_000_000).toFixed(0)}M`

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
            {e.name === 'current' ? 'Ky hien tai' : 'Ky truoc'}:
          </span>
          <span className="text-text-primary font-semibold">{(e.value / 1_000_000).toFixed(1)}M</span>
        </div>
      ))}
    </div>
  )
}

export default function CompareChart() {
  return (
    <div className="card card-hover">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="section-title">So sanh doanh thu</h3>
          <p className="text-text-muted text-xs mt-0.5">Ky hien tai vs ky truoc</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={data} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#DDD8CB" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={fmtM} tick={{ fill: '#7A8C7E', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(v) => (
              <span className="text-text-muted text-xs">
                {v === 'current' ? 'Ky hien tai' : 'Ky truoc'}
              </span>
            )}
            wrapperStyle={{ paddingTop: '10px' }}
          />
          <Line type="monotone" dataKey="current" stroke="#C0390E" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#C0390E' }} />
          <Line type="monotone" dataKey="previous" stroke="#88860B" strokeWidth={1.5} strokeDasharray="5 4" dot={false} activeDot={{ r: 4, fill: '#88860B' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
