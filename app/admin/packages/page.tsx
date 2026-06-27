import { Package } from 'lucide-react'

export default function PackagesPage() {
  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quản lý Gói</h1>
          <p className="page-subtitle">Tạo gói bundle kết hợp nhiều khoá học</p>
        </div>
      </div>

      <div className="card flex flex-col items-center justify-center py-16 gap-4 border-dashed">
        <div className="w-16 h-16 rounded-2xl bg-surface-2 border border-border flex items-center justify-center">
          <Package size={28} className="text-text-muted" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="font-semibold text-text-primary mb-1">Chưa có gói bundle nào</p>
          <p className="text-text-muted text-sm max-w-sm">
            Gói bundle cho phép gộp nhiều khoá học với giá ưu đãi. Hiện tại website đang bán các khoá riêng lẻ — chưa cần tạo gói.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-text-muted bg-surface-2 border border-border rounded-lg px-3 py-2">
          <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
          Tính năng sẵn sàng khi cần — chỉ cần cấu hình trong code
        </div>
      </div>
    </div>
  )
}
