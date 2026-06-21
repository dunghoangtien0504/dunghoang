'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, BookOpen, Zap } from 'lucide-react'

export default function CamOnMiniPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">

      {/* ── Header nhỏ ─────────────────────────────────────────── */}
      <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]/90 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
            <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
          </div>
          <span className="font-bold text-[#0D2B1A] text-sm">DungHoang.com</span>
        </div>
      </header>

      <div
        className={`max-w-2xl mx-auto px-4 py-12 space-y-8 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >

        {/* ── Xác nhận mua thành công ────────────────────────────── */}
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
              Kiểm tra inbox (và cả thư mục spam) nhé... đôi khi nó lạc vào đó.
            </p>
          </div>
        </div>

        {/* ── Divider ────────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <div className="h-px bg-[#DDD8CB] flex-1" />
          <span className="text-sm text-[#7A8C7E]">Trong khi chờ email...</span>
          <div className="h-px bg-[#DDD8CB] flex-1" />
        </div>

        {/* ── Rollover upsell Khóa 1 ─────────────────────────────── */}
        <div className="bg-white border border-[#DDD8CB] rounded-3xl overflow-hidden shadow-sm">

          {/* Badge */}
          <div className="bg-[#0D2B1A] px-6 py-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#88860B]" />
            <span className="text-[#F6F0E4] text-sm font-semibold">Dành riêng cho bạn vừa mua Mini</span>
          </div>

          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#0D2B1A]">
                Bạn đã trả 686.868đ rồi...
              </h2>
              <p className="text-[#3D6B4A] leading-relaxed">
                Mình có thêm 23 skill nữa trong bộ đầy đủ. Toàn bộ hệ thống
                bán hàng tự động, không phải chỉ trang bán.
              </p>
              <p className="text-[#3D6B4A] leading-relaxed">
                Và vì bạn đã mua Trang Bán Hàng rồi, 686.868đ đó được trừ thẳng vào Khóa 1.
                Bạn chỉ cần thêm <strong className="text-[#0D2B1A]">181.818đ</strong> nữa thôi.
              </p>
            </div>

            {/* So sánh giá */}
            <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#7A8C7E]">Giá Khóa 1 đầy đủ</span>
                <span className="line-through text-[#7A8C7E]">868.686đ</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#3D6B4A]">Bạn đã trả (Trang Bán Hàng)</span>
                <span className="text-[#2D7A4F] font-semibold">-686.868đ</span>
              </div>
              <div className="h-px bg-[#DDD8CB]" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#0D2B1A]">Bạn chỉ cần thêm</span>
                <span className="font-bold text-[#C0390E] text-xl">181.818đ</span>
              </div>
            </div>

            {/* 25 skill preview */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#0D2B1A]">25 skill trong Khóa 1 bao gồm:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {[
                  'Trang bán hàng (bạn đang học)',
                  'Chatbot trả lời khách tự động',
                  'Chuỗi email nuôi dưỡng lead',
                  'Avatar khách hàng chuẩn',
                  'Content 30 ngày không cạn ý',
                  'Ads Facebook viết bằng AI',
                  'Phễu bán hàng tự chạy',
                  'Đặt lịch hẹn tư vấn tự động',
                  'Follow-up lead không mua',
                  'Báo cáo doanh thu hàng tuần',
                ].map((skill, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-[#3D6B4A]">
                    <BookOpen className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#88860B]" />
                    <span>{skill}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2 text-sm text-[#7A8C7E] col-span-full">
                  <span className="text-xs">... và 15 skill nữa</span>
                </div>
              </div>
            </div>

            {/* Neo giá nhân sự */}
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-xl p-4 text-sm text-[#3D6B4A] leading-relaxed">
              Thuê đủ người làm 24 việc này: khoảng 50 triệu/tháng tiền lương.
              Bạn trả một lần 868.686đ, dùng mãi, không lương tháng.
              Phần bạn cần bỏ thêm bây giờ chỉ còn 181.818đ.
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <Link
                href="/khoa-1-ban-tu-lap"
                className="flex items-center justify-center gap-2 w-full h-14 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold text-base rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Xem Khóa 1 đầy đủ
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-center text-xs text-[#7A8C7E]">
                Bảo hành 14 ngày hoàn 100%. Không hỏi lý do.
              </p>
            </div>

            {/* Soft close */}
            <p className="text-center text-sm text-[#7A8C7E]">
              Chưa muốn xem ngay cũng không sao. Mini đang chờ bạn trong hộp thư rồi.
            </p>
          </div>
        </div>

        {/* ── Footer nhỏ ────────────────────────────────────────── */}
        <div className="text-center space-y-2 pb-6">
          <p className="text-sm text-[#7A8C7E]">
            Cần hỗ trợ?{' '}
            <a
              href="https://t.me/kenthoang"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3D6B4A] underline font-medium"
            >
              Nhắn @kenthoang trên Telegram
            </a>
          </p>
          <p className="text-xs text-[#7A8C7E]">
            <Link href="/" className="hover:text-[#3D6B4A] transition-colors">DungHoang.com</Link>
            {' '}·{' '}
            <Link href="/thu-thach-7-ngay" className="hover:text-[#3D6B4A] transition-colors">
              Thử thách 7 ngày
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
