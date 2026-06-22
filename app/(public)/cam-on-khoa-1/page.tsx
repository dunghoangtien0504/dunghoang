'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, ShieldCheck, Users } from 'lucide-react'
import CheckoutModal from '@/components/checkout/CheckoutModal'

// ── Countdown logic ───────────────────────────────────────────────────────────
const STORAGE_KEY = 'cam-on-k1-deadline'
const DURATION_MS = 24 * 60 * 60 * 1000 // 24h

function getDeadline(): number {
  if (typeof window === 'undefined') return Date.now() + DURATION_MS
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return parseInt(stored, 10)
  const deadline = Date.now() + DURATION_MS
  localStorage.setItem(STORAGE_KEY, String(deadline))
  return deadline
}

function calcRemaining(deadline: number) {
  const diff = Math.max(0, deadline - Date.now())
  const h = Math.floor(diff / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)
  return { h, m, s, expired: diff === 0 }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function CountdownTimer() {
  const [remaining, setRemaining] = useState({ h: 23, m: 59, s: 59, expired: false })

  useEffect(() => {
    const deadline = getDeadline()
    setRemaining(calcRemaining(deadline))
    const id = setInterval(() => {
      setRemaining(calcRemaining(deadline))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  if (remaining.expired) {
    return (
      <div className="text-center text-sm text-[#7A8C7E] bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl px-4 py-3">
        Ưu đãi rollover đã hết hạn. Nhắn{' '}
        <a href="https://t.me/KentHoang" className="text-[#3D6B4A] underline">@KentHoang</a>{' '}
        nếu bạn vẫn muốn nâng cấp.
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {[
        { val: remaining.h, label: 'giờ' },
        { val: remaining.m, label: 'phút' },
        { val: remaining.s, label: 'giây' },
      ].map(({ val, label }, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="bg-[#0D2B1A] text-[#F6F0E4] rounded-xl px-3 py-2 text-center min-w-[52px]">
            <div className="text-2xl font-bold font-mono leading-none">{pad(val)}</div>
            <div className="text-[10px] text-[#88860B] mt-0.5">{label}</div>
          </div>
          {i < 2 && <span className="text-[#0D2B1A] font-bold text-xl">:</span>}
        </div>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CamOnKhoa1Page() {
  const [visible, setVisible] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const openCheckout = useCallback(() => setCheckoutOpen(true), [])

  // Rollover: Khóa 1 868.686đ trừ vào Khóa 2 3.868.686đ
  const extraNeeded = (3868686 - 868686).toLocaleString('vi-VN') // 3.000.000

  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">

      <CheckoutModal
        productId="khoa2_2768"
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />

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
              Bộ 24 AI agent của bạn đã sẵn sàng.
            </h1>
            <p className="text-[#3D6B4A] leading-relaxed">
              Mình vừa gửi email kích hoạt về hộp thư của bạn.
              Kiểm tra inbox và cả spam nhé... đôi khi email tự lạc.
            </p>
          </div>
        </div>

        {/* ── Countdown upsell card ───────────────────────────────── */}
        <div className="bg-white border-2 border-[#C0390E]/30 rounded-3xl overflow-hidden shadow-sm">

          {/* Header badge */}
          <div className="bg-[#C0390E] px-6 py-3 text-center">
            <p className="text-white text-sm font-semibold">
              Ưu đãi đặc biệt chỉ dành cho bạn vừa mua Khóa 1
            </p>
          </div>

          <div className="p-6 space-y-6">

            {/* Countdown */}
            <div className="space-y-2 text-center">
              <p className="text-sm text-[#7A8C7E]">Ưu đãi này hết sau</p>
              <CountdownTimer />
            </div>

            {/* Copy */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2D7A4F]" />
                <h2 className="text-lg font-bold text-[#0D2B1A]">
                  Muốn có đội trưởng AI kèm sát 30 ngày?
                </h2>
              </div>
              <p className="text-[#3D6B4A] leading-relaxed text-sm">
                Vừa xong Khóa 1 bạn có đủ 24 AI agent rồi. Nhưng nếu muốn có người
                kèm từng bước cho đến khi hệ thống thật sự tự chạy, đó là Khóa 2.
              </p>
              <p className="text-[#3D6B4A] leading-relaxed text-sm">
                Và vì bạn vừa trả 686.868đ cho Khóa 1, số tiền đó được trừ thẳng vào.
                Bạn chỉ cần thêm <strong className="text-[#0D2B1A]">{extraNeeded}đ</strong> nữa.
              </p>
            </div>

            {/* Price breakdown */}
            <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#7A8C7E]">Giá Khóa 2 đầy đủ</span>
                <span className="line-through text-[#7A8C7E]">3.868.686đ</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#3D6B4A]">Bạn đã trả (Khóa 1)</span>
                <span className="text-[#2D7A4F] font-semibold">-686.868đ</span>
              </div>
              <div className="h-px bg-[#DDD8CB]" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#0D2B1A]">Bạn cần thêm</span>
                <span className="font-bold text-[#C0390E] text-xl">{extraNeeded}đ</span>
              </div>
            </div>

            {/* What Khóa 2 adds */}
            <div className="space-y-2">
              <p className="text-sm font-semibold text-[#0D2B1A]">Khóa 2 thêm vào so với Khóa 1:</p>
              <ul className="space-y-2">
                {[
                  'Tiểu Hà Mã kèm sát 24/7 qua Telegram',
                  'SOP chi tiết từng bước dựng hệ thống tự chạy',
                  'Cam kết: 30 ngày có hệ thống hoặc mình sửa cùng',
                  '5 bonus: 489 tiêu đề, BRAND_DNA, 27 yếu tố, ma trận content, buổi soi hệ thống',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#3D6B4A]">
                    <CheckCircle className="w-4 h-4 text-[#2D7A4F] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Neo giá */}
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-xl p-4 text-sm text-[#3D6B4A] leading-relaxed">
              Nếu thuê đủ: 24 AI agent (50tr/tháng) + SOP (20tr) + đội trưởng kèm sát (20tr) = 90tr+ tự lo.
              Bạn trả một lần 3.868.686đ. Phần còn lại sau khi trừ Khóa 1 chỉ là {extraNeeded}đ.
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <button
                onClick={openCheckout}
                className="flex items-center justify-center gap-2 w-full h-14 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold text-base rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Nâng Cấp Lên Khóa 2
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-center text-xs text-[#7A8C7E] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Bảo hành 14 ngày hoàn 100%. Chỉ 20 suất mỗi đợt.
              </p>
            </div>

            {/* Xem trang bán hàng đầy đủ */}
            <p className="text-center text-sm text-[#7A8C7E]">
              Muốn xem chi tiết trước?{' '}
              <Link href="/khoa-2-ban-co-doi-truong" className="text-[#3D6B4A] underline font-medium">
                Xem trang Khóa 2 đầy đủ
              </Link>
            </p>

            {/* Soft close */}
            <p className="text-center text-sm text-[#7A8C7E]">
              Chưa muốn nâng cấp ngay cũng được. Khóa 1 đang chờ trong hộp thư rồi.
            </p>
          </div>
        </div>

        {/* ── Footer nhỏ ────────────────────────────────────────── */}
        <div className="text-center space-y-2 pb-6">
          <p className="text-sm text-[#7A8C7E]">
            Cần hỗ trợ?{' '}
            <a
              href="https://t.me/KentHoang"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3D6B4A] underline font-medium"
            >
              Nhắn @KentHoang trên Telegram
            </a>
          </p>
          <p className="text-xs text-[#7A8C7E]">
            <Link href="/" className="hover:text-[#3D6B4A] transition-colors">DungHoang.com</Link>
            {' '}·{' '}
            <Link href="/khoa-1-ban-tu-lap" className="hover:text-[#3D6B4A] transition-colors">
              Khóa 1
            </Link>
            {' '}·{' '}
            <Link href="/khoa-2-ban-co-doi-truong" className="hover:text-[#3D6B4A] transition-colors">
              Khóa 2
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
