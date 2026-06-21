'use client'

import { useState, useEffect } from 'react'
import { Cookie, X, ChevronDown, ChevronUp } from 'lucide-react'
import { getCookie, setCookie } from '@/lib/cookies'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Kiểm tra xem người dùng đã đồng ý hay từ chối cookie chưa
    const consent = getCookie('cookie_consent')
    if (!consent) {
      // Hiển thị banner sau 1 giây để tạo hiệu ứng mượt mà
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAllow = () => {
    // Lưu trạng thái đồng ý cookie trong 10 năm (3650 ngày)
    setCookie('cookie_consent', 'allowed', 3650)
    setIsVisible(false)
  }

  const handleDecline = () => {
    // Từ chối sẽ ẩn banner tạm thời trong 30 ngày
    setCookie('cookie_consent', 'declined', 30)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-6 z-[9999] max-w-sm w-[calc(100vw-3rem)] bg-surface border border-border rounded-2xl p-5 shadow-card-lg animate-slide-up flex flex-col items-center text-center">
      {/* Nút đóng banner ở góc trên bên phải */}
      <button 
        onClick={handleDecline}
        className="absolute top-3 right-3 text-text-muted hover:text-brand-dark transition-colors duration-150"
        aria-label="Đóng"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Icon Bánh quy nằm chính giữa */}
      <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center mb-3 shadow-inner">
        <Cookie className="w-6 h-6 text-white" />
      </div>

      {/* Nội dung chính ở giữa */}
      <h3 className="text-brand-dark font-bold text-base mb-1.5">
        Chấp nhận Cookie & Theo dõi?
      </h3>
      <p className="text-text-muted text-xs leading-relaxed mb-3 px-1">
        Chúng tôi sử dụng cookie nhằm ghi nhớ nguồn giới thiệu tiếp thị (Affiliate), đo lường hiệu quả quảng cáo (UTM) và duy trì bảo mật đăng nhập cho Admin.
      </p>

      {/* Link tìm hiểu thêm */}
      <button 
        onClick={() => setShowDetails(!showDetails)}
        className="text-brand-border hover:text-brand-dark font-semibold text-xs underline mb-3 inline-flex items-center gap-1 transition-colors duration-150"
      >
        Tìm hiểu chi tiết
        {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {/* Phần giải thích chi tiết có thể mở rộng */}
      {showDetails && (
        <div className="w-full text-left bg-surface-2 border border-border rounded-lg p-3 mb-4 text-xs space-y-2.5 max-h-48 overflow-y-auto animate-fade-in transition-all duration-200">
          <p className="text-brand-dark font-medium border-b border-border/50 pb-1">
            🍪 Vai trò của Cookie trên website:
          </p>
          <div className="space-y-2">
            <div>
              <span className="font-semibold text-brand-accent">1. Cộng tác viên (Affiliate):</span>
              <p className="text-text-muted mt-0.5 pl-2 border-l-2 border-brand-accent/30">
                Nếu bạn truy cập từ link giới thiệu, cookie sẽ lưu mã giới thiệu trong <strong>30 ngày</strong> để tự động ghi nhận và chi trả hoa hồng cho người chia sẻ khi bạn đăng ký khóa học.
              </p>
            </div>
            <div>
              <span className="font-semibold text-brand-olive">2. Thống kê tiếp thị (UTM):</span>
              <p className="text-text-muted mt-0.5 pl-2 border-l-2 border-brand-olive/30">
                Ghi nhớ nguồn chiến dịch quảng cáo (như Facebook Ads, Youtube...) để chúng tôi đo lường kênh hiệu quả và tối ưu hóa chi phí vận hành.
              </p>
            </div>
            <div>
              <span className="font-semibold text-brand-dark">3. Phiên đăng nhập (Admin Session):</span>
              <p className="text-text-muted mt-0.5 pl-2 border-l-2 border-brand-dark/30">
                Lưu mã xác thực đăng nhập bảo mật của Admin giúp duy trì phiên làm việc mà không cần đăng nhập lại liên tục.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Nút bấm Cho phép đầy đủ chiều ngang ở dưới */}
      <button 
        onClick={handleAllow}
        className="w-full bg-brand-accent hover:bg-primary-dark text-white font-bold py-2.5 px-4 rounded-xl shadow-btn hover:shadow-btn-hover active:scale-[0.98] transition-all duration-150 text-sm select-none"
      >
        Đồng ý và Tiếp tục
      </button>
    </div>
  )
}
