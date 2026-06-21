'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { trackPurchase } from '@/lib/fbq'

export default function CamOnThuThachPage() {
  useEffect(() => {
    trackPurchase(368000)
  }, [])

  return (
    <div className="min-h-screen bg-[#F6F0E4] flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6 text-center">

        <div className="w-20 h-20 bg-[#0D2B1A] rounded-3xl flex items-center justify-center mx-auto">
          <span className="text-[#F6F0E4] font-black font-mono text-xl">DH</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#0D2B1A]">Cọc đã nhận!</h1>
          <p className="text-[#3D6B4A] leading-relaxed">
            Mình vừa xác nhận thanh toán 368k của bạn. Challenge <strong>Bí Quyết 7 Ngày Đưa AI Vào Business</strong> bắt đầu ngay bây giờ.
          </p>
        </div>

        <div className="bg-white border border-[#DDD8CB] rounded-2xl p-6 text-left space-y-4">
          <p className="font-bold text-[#0D2B1A]">Tiếp theo bạn cần làm:</p>
          <div className="space-y-3">
            {[
              { n: '1', text: 'Kiểm tra email — mình vừa gửi link đăng nhập vào khu học' },
              { n: '2', text: 'Đăng nhập → vào mục "Thử Thách 7 Ngày" trong portal' },
              { n: '3', text: 'Ngày 1 sẽ mở lúc 7h sáng ngày mai (hoặc ngay bây giờ nếu chưa đến 7h)' },
              { n: '4', text: 'Mỗi ngày có 24h để hoàn thành bài tập và nộp bằng chứng' },
            ].map(s => (
              <div key={s.n} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EAF5EF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#2D7A4F] text-xs font-bold">{s.n}</span>
                </div>
                <p className="text-sm text-[#3D6B4A]">{s.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-xl p-4 text-sm text-[#2D7A4F]">
          <strong>Nhắc lại luật hoàn cọc:</strong> Hoàn thành đúng hạn cả 7 ngày → mình hoàn lại đủ 368k trong 48h sau ngày cuối.
        </div>

        <Link href="/portal"
          className="block w-full h-12 bg-[#0D2B1A] hover:bg-[#1a4a2e] text-[#F6F0E4] font-bold rounded-xl flex items-center justify-center transition-colors">
          Vào khu học ngay →
        </Link>

        <p className="text-xs text-[#7A8C7E]">
          Câu hỏi? Nhắn Telegram <a href="https://t.me/KentHoang" className="underline">@KentHoang</a>
        </p>
      </div>
    </div>
  )
}
