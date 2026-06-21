'use client'

type FunnelStep = {
  step:  number
  label: string
  count: number
  color: string
  text:  string
  percent?: number
}

const PLACEHOLDER: FunnelStep[] = [
  { step: 1, label: 'Đăng ký tài khoản',       count: 0, color: 'bg-brand-dark',   text: 'text-brand-dark' },
  { step: 2, label: 'Ghi danh khoá học',        count: 0, color: 'bg-brand-accent', text: 'text-brand-accent' },
  { step: 3, label: 'Bắt đầu học bài',          count: 0, color: 'bg-brand-border', text: 'text-brand-border' },
  { step: 4, label: 'Hoàn thành ít nhất 1 bài', count: 0, color: 'bg-success',      text: 'text-success' },
]

export default function ConversionFunnel({ data }: { data?: FunnelStep[] | null }) {
  const raw   = (data && data.length > 0) ? data : PLACEHOLDER
  const isEmpty = !data || data.length === 0

  // Tính % so với bước trước
  const steps: FunnelStep[] = raw.map((s, i) => ({
    ...s,
    percent: i === 0 ? undefined : raw[i-1].count > 0 ? Math.round((s.count / raw[i-1].count) * 100 * 10) / 10 : undefined,
  }))

  const max       = steps[0].count || 1
  const totalRate = steps.length > 1 && steps[0].count > 0
    ? ((steps[steps.length - 1].count / steps[0].count) * 100).toFixed(1)
    : '—'

  return (
    <div className="card card-hover">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="section-title">Phễu chuyển đổi</h3>
          <p className="text-text-muted text-xs mt-0.5">Hành trình học viên</p>
        </div>
        <div className="chip">
          {isEmpty
            ? <span className="text-text-muted">Chưa có data</span>
            : <><span className="text-success font-semibold">{totalRate}%</span><span className="text-text-muted">hoàn thành</span></>
          }
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.step} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isEmpty ? 'bg-text-muted/20' : s.color}`}>
              <span className="text-white text-[10px] font-bold">{s.step}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-text-secondary text-xs">{s.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-text-primary text-xs font-semibold font-mono">
                    {isEmpty ? '—' : s.count.toLocaleString('vi-VN')}
                  </span>
                  {!isEmpty && s.percent !== undefined && (
                    <span className={`text-[10px] font-semibold ${s.text}`}>{s.percent}%</span>
                  )}
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${isEmpty ? 'bg-text-muted/20' : s.color}`}
                  style={{ width: isEmpty ? '0%' : `${(s.count / max) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
