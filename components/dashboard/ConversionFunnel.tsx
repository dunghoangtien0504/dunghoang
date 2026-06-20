'use client'

const steps = [
  { step: 1, label: 'Đăng ký',             count: 605, color: 'bg-brand-dark',   text: 'text-brand-dark' },
  { step: 2, label: 'Ghi danh',            count: 363, percent: 60.0, color: 'bg-brand-accent',  text: 'text-brand-accent' },
  { step: 3, label: 'Học bài đầu tiên',    count: 298, percent: 82.1, color: 'bg-brand-border',  text: 'text-brand-border' },
  { step: 4, label: 'Hoàn thành 50%',      count: 187, percent: 62.8, color: 'bg-brand-olive',   text: 'text-brand-olive' },
  { step: 5, label: 'Hoàn thành khoá học', count: 124, percent: 66.3, color: 'bg-success',        text: 'text-success' },
]

export default function ConversionFunnel() {
  const max = steps[0].count
  const totalRate = ((steps[steps.length - 1].count / max) * 100).toFixed(1)

  return (
    <div className="card card-hover">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="section-title">Phễu chuyển đổi</h3>
          <p className="text-text-muted text-xs mt-0.5">Hành trình học viên</p>
        </div>
        <div className="chip">
          <span className="text-success font-semibold">{totalRate}%</span>
          <span className="text-text-muted">hoàn thành</span>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.step} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${s.color}`}>
              <span className="text-white text-[10px] font-bold">{s.step}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-text-secondary text-xs">{s.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-text-primary text-xs font-semibold font-mono">
                    {s.count.toLocaleString('vi-VN')}
                  </span>
                  {s.percent && (
                    <span className={`text-[10px] font-semibold ${s.text}`}>{s.percent}%</span>
                  )}
                </div>
              </div>
              <div className="progress-bar">
                <div className={`progress-fill ${s.color}`} style={{ width: `${(s.count / max) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
