'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function CamOnLandingPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const extraNeeded = (3868686 - 686868).toLocaleString('vi-VN') // 3.181.818

  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">

      <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]/90 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
            <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
          </div>
          <span className="font-bold text-[#0D2B1A] text-sm">DungHoang.com</span>
        </div>
      </header>

      <div className={`max-w-2xl mx-auto px-4 py-12 space-y-8 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>

        {/* Xác nhận */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-[#EAF5EF] rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-[#2D7A4F]" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#0D2B1A]">
              Nhận được rồi. Cảm ơn bạn nha.
            </h1>
            <p className="text-[#3D6B4A] leading-relaxed">
              Mình vừa gửi email kích hoạt khoá học về hộp thư của bạn.
              Kiểm tra inbox (và cả thư mục spam) nhé.
            </p>
          </div>
        </div>

        {/* CTA vào portal */}
        <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-4 text-center">
          <p className="text-[#F6F0E4] font-bold">Vào khu học ngay</p>
          <p className="text-[#F6F0E4]/70 text-sm leading-relaxed">
            Đăng nhập bằng email bạn vừa mua. Khóa Landing Page đã sẵn sàng ở trang chủ portal.
          </p>
          <a href="https://dunghoang.com/portal"
            className="inline-flex items-center gap-2 bg-[#C0390E] hover:bg-[#b0300a] text-white font-bold px-6 py-3 rounded-xl transition-colors">
            Vào Khu Học →
          </a>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px bg-[#DDD8CB] flex-1" />
          <span className="text-sm text-[#7A8C7E]">Trong khi chờ email...</span>
          <div className="h-px bg-[#DDD8CB] flex-1" />
        </div>

        {/* Upsell Coaching */}
        <div className="bg-white border border-[#DDD8CB] rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-[#0D2B1A] px-6 py-3 flex items-center gap-2">
            <span className="text-[#88860B] text-lg">🎯</span>
            <span className="text-[#F6F0E4] text-sm font-semibold">Dành riêng cho bạn vừa mua Khóa Landing Page</span>
          </div>

          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#0D2B1A]">
                Bạn sắp có landing page thật.
              </h2>
              <p className="text-[#3D6B4A] leading-relaxed text-sm">
                Khóa Landing Page dạy bạn tự build. Nhưng nếu muốn có người ngồi cùng,
                kèm từng bước đến khi hệ thống thật sự tự chạy — đó là Coaching.
              </p>
              <p className="text-[#3D6B4A] leading-relaxed text-sm">
                Và vì bạn đã trả 686.868đ rồi, số tiền đó trừ thẳng vào.
                Bạn chỉ cần thêm <strong className="text-[#0D2B1A]">{extraNeeded}đ</strong> nữa.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#7A8C7E]">Giá Coaching đầy đủ</span>
                <span className="line-through text-[#7A8C7E]">3.868.686đ</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#3D6B4A]">Bạn đã trả (Khóa Landing Page)</span>
                <span className="text-[#2D7A4F] font-semibold">-686.868đ</span>
              </div>
              <div className="h-px bg-[#DDD8CB]" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#0D2B1A]">Bạn chỉ cần thêm</span>
                <span className="font-bold text-[#C0390E] text-xl">{extraNeeded}đ</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#0D2B1A]">Coaching thêm vào so với Khóa Landing Page:</p>
              <ul className="space-y-2">
                {[
                  'Tiểu Hà Mã kèm sát 24/7 qua Telegram',
                  '1 buổi Soi Hệ Thống 1-kèm-1 với Dũng',
                  'SOP dựng hệ thống bán hàng tự chạy (24 AI agent đầy đủ)',
                  'Cam kết 30 ngày có hệ thống hoặc làm lại cùng',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#3D6B4A]">
                    <CheckCircle className="w-4 h-4 text-[#2D7A4F] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-xl p-4 text-sm text-[#3D6B4A] leading-relaxed">
              Thuê đủ người: 24 AI agent (50tr/tháng) + đội trưởng kèm sát (20tr/tháng) = 70tr+.
              Bạn trả một lần. Phần còn lại sau khi trừ Khóa Landing Page chỉ là {extraNeeded}đ.
            </div>

            <div className="space-y-3">
              <Link
                href="/khoa-2-ban-co-doi-truong"
                className="flex items-center justify-center gap-2 w-full h-14 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold text-base rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Xem Coaching đầy đủ
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-center text-xs text-[#7A8C7E]">
                Bảo hành 14 ngày hoàn 100%. Chỉ 20 suất mỗi đợt.
              </p>
            </div>

            <p className="text-center text-sm text-[#7A8C7E]">
              Chưa muốn xem ngay cũng không sao. Khóa Landing Page đang chờ bạn trong hộp thư rồi.
            </p>
          </div>
        </div>

        <div className="text-center space-y-2 pb-6">
          <p className="text-sm text-[#7A8C7E]">
            Cần hỗ trợ?{' '}
            <a href="https://t.me/KentHoang" target="_blank" rel="noopener noreferrer"
              className="text-[#3D6B4A] underline font-medium">
              Nhắn @KentHoang trên Telegram
            </a>
          </p>
          <p className="text-xs text-[#7A8C7E]">
            <Link href="/" className="hover:text-[#3D6B4A] transition-colors">DungHoang.com</Link>
            {' '}·{' '}
            <Link href="/portal" className="hover:text-[#3D6B4A] transition-colors">Khu học</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
