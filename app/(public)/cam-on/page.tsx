'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Mail, ArrowRight, ChevronRight } from 'lucide-react'

export default function CamOnPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans flex flex-col">

      {/* ── Header minimal ─────────────────────────────────── */}
      <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
              <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
            </div>
            <span className="font-bold text-[#0D2B1A] text-sm">DungHoang.com</span>
          </div>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className={`max-w-lg w-full transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >

          {/* Confirmation card */}
          <div className="bg-white border border-[#DDD8CB] rounded-3xl p-8 shadow-sm text-center space-y-5">

            {/* Icon */}
            <div className="w-16 h-16 bg-[#EAF5EF] rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-[#2D7A4F]" />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#0D2B1A]">Xong rồi ^^</h1>
              <p className="text-[#3D6B4A] leading-relaxed">
                Email đang trên đường đến hộp thư của bạn. Thường mất dưới 5 phút.
              </p>
            </div>

            {/* Check spam reminder */}
            <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl p-4 flex gap-3 items-start text-left">
              <Mail className="w-5 h-5 text-[#88860B] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#0D2B1A] mb-0.5">Không thấy email?</p>
                <p className="text-sm text-[#7A8C7E]">
                  Kiểm tra thư mục <strong>Spam</strong> hoặc <strong>Promotions</strong> nha.
                  Đánh dấu "Không phải spam" để email tiếp theo vào thẳng inbox.
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-[#DDD8CB]" />
            <span className="text-xs text-[#7A8C7E] font-medium">Trong khi chờ email...</span>
            <div className="flex-1 h-px bg-[#DDD8CB]" />
          </div>

          {/* Soft sell Mini */}
          <div className="bg-white border border-[#DDD8CB] rounded-3xl p-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#EAF5EF] border border-[#2D7A4F]/30 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D7A4F]" />
              <span className="text-xs font-medium text-[#2D7A4F]">Dành cho bạn muốn bắt đầu ngay</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold text-[#0D2B1A] leading-snug">
                Mình có 1 thứ nhỏ muốn giới thiệu...
              </h2>
              <p className="text-[#3D6B4A] text-sm leading-relaxed">
                Trong 7 ngày thử thách, ngày 2 bạn sẽ tự làm trang bán hàng với AI.
                Nhưng nếu bạn muốn xem cả quy trình đầy đủ ngay hôm nay...
              </p>
            </div>

            <div className="bg-[#F6F0E4] rounded-2xl p-4 space-y-2">
              <p className="text-sm font-semibold text-[#0D2B1A]">Mini "Trang Bán Hàng 1 Giờ"</p>
              <p className="text-sm text-[#7A8C7E] leading-relaxed">
                Skill làm landing page AI. Một người không biết code tự làm trong 1 tiếng.
                Thuê người làm cái này 8-10tr/tháng. Mình bán 1 lần.
              </p>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold text-[#0D2B1A]">368.000đ</span>
                  <span className="text-xs text-[#7A8C7E] line-through">8-10tr/tháng</span>
                </div>
                <span className="text-xs text-[#88860B] font-medium bg-[#FFF8E1] px-2 py-1 rounded-full">Một lần dùng mãi</span>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                href="/mini-trang-ban-hang"
                className="flex items-center justify-center gap-2 w-full h-12 bg-[#C0390E] hover:bg-[#A0300B] text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow-md"
              >
                Xem chi tiết Mini
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-xs text-[#7A8C7E]">
                Bảo hành 14 ngày hoàn 100%. Không thích thì mình trả lại, không hỏi gì thêm.
              </p>
            </div>

            <div className="border-t border-[#DDD8CB] pt-3">
              <p className="text-xs text-[#7A8C7E] text-center">
                Chưa muốn xem ngay cũng được. Email thử thách sẽ đến trong vài phút.
              </p>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-[#7A8C7E] mt-6">
            Câu hỏi gì nhắn mình qua{' '}
            <a href="https://m.me/dunghoang" className="underline hover:text-[#0D2B1A] transition-colors">
              Messenger
            </a>{' '}
            hoặc reply thẳng email nhé.
          </p>

        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-[#DDD8CB] py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#0D2B1A] flex items-center justify-center">
              <span className="text-[#F6F0E4] font-bold text-[10px] font-mono">DH</span>
            </div>
            <span className="text-[#0D2B1A] font-semibold text-sm">DungHoang.com</span>
          </div>
          <p className="text-[#7A8C7E] text-xs">© 2026 DungHoang.com</p>
          <div className="flex gap-4">
            <a href="/chinh-sach-bao-mat" className="text-[#7A8C7E] text-xs hover:text-[#0D2B1A] transition-colors">Chính sách</a>
            <a href="/lien-he" className="text-[#7A8C7E] text-xs hover:text-[#0D2B1A] transition-colors">Liên hệ</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
