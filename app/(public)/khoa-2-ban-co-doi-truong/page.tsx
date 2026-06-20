'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, ShieldCheck, ChevronDown, ChevronUp, ArrowRight, Users, Zap } from 'lucide-react'
import CheckoutModal from '@/components/checkout/CheckoutModal'

// ── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Tiểu Hà Mã là gì? Khác gì chatbot thường?',
    a: 'Tiểu Hà Mã là đội trưởng AI mình cài riêng cho bạn trên Telegram. Không phải chatbot trả lời chung chung. Nó biết SOP của bạn, biết sản phẩm của bạn, và kèm bạn theo từng bước như một đội trưởng thật. Bạn hỏi đến đâu, nó chỉ đến đó.',
  },
  {
    q: '30 ngày cam kết là cam kết gì cụ thể?',
    a: 'Mình cam kết: trong 30 ngày bạn sẽ dựng xong hệ thống tự chạy gồm content tự đăng, tự trả lời khách, và đơn tự về. Nếu làm đủ theo SOP mà không đạt, mình ngồi review lại cùng bạn và sửa cho đến khi chạy được.',
  },
  {
    q: 'Rollover từ Khóa 1 thế nào?',
    a: 'Nếu bạn đã mua Khóa 1 (686.868đ), số tiền đó được trừ vào Khóa 2. Bạn chỉ cần thêm 2.081.818đ nữa để có toàn bộ Khóa 2 bao gồm Tiểu Hà Mã kèm sát. Áp dụng tự động khi thanh toán.',
  },
  {
    q: 'Khác gì Khóa 1 ngoài Tiểu Hà Mã?',
    a: 'Khóa 1 bạn tự học và tự áp dụng 25 skill. Khóa 2 có thêm bộ SOP chi tiết từng bước dựng cả hệ thống, cộng với Tiểu Hà Mã kèm 24/7 qua Telegram để đảm bảo bạn không bị kẹt ở bước nào. Phù hợp nếu bạn muốn chắc ăn hơn.',
  },
  {
    q: 'Chỉ 20 suất là thật hay marketing?',
    a: 'Thật. Vì Tiểu Hà Mã cần mình thiết lập riêng và kèm sát từng người. Mình không thể kèm cùng lúc quá nhiều người mà vẫn đảm bảo chất lượng. Mỗi đợt mình chỉ nhận 20 suất.',
  },
  {
    q: 'Bảo hành thế nào?',
    a: 'Bảo hành 14 ngày hoàn 100%. Mua về, học thử, nếu thấy không phù hợp thì nhắn mình. Hoàn lại trong 24 giờ, không hỏi lý do.',
  },
]

// ── Bonus items ───────────────────────────────────────────────────────────────
const BONUSES = [
  {
    icon: '📋',
    name: '489 Tiêu Đề Đã Chạy Ads',
    value: '2.000.000đ',
    desc: 'Dán vào là ra content. Đủ dùng cho 1 năm mà không cần nghĩ tiêu đề.',
  },
  {
    icon: '🧬',
    name: 'File BRAND_DNA Hoàn Chỉnh',
    value: '500.000đ',
    desc: 'AI đọc xong biết bạn là ai. Dùng được cho mọi thứ sau này.',
  },
  {
    icon: '🎯',
    name: '27 Yếu Tố Triệu View',
    value: '1.000.000đ',
    desc: 'Checklist kiểm tra trước khi đăng bài. Giảm đáng kể tỷ lệ bài đăng lên rồi không ai xem.',
  },
  {
    icon: '📊',
    name: 'Ma Trận Nội Dung 90 Ngày',
    value: '1.500.000đ',
    desc: 'Lịch đăng bài 3 tháng với góc độ đa dạng. Không bao giờ hết chủ đề.',
  },
  {
    icon: '🔍',
    name: 'Buổi Soi Hệ Thống Cùng Mình',
    value: '5.000.000đ',
    desc: 'Sau 30 ngày, mình ngồi review toàn bộ hệ thống bạn dựng và chỉ chỗ cần tối ưu.',
  },
]

// ── FAQ Item ──────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#DDD8CB] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-[#FAF7F2] transition-colors"
      >
        <span className="font-semibold text-[#0D2B1A] text-sm leading-snug">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-[#7A8C7E] flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-[#7A8C7E] flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-[#3D6B4A] leading-relaxed border-t border-[#DDD8CB] pt-3">
          {a}
        </div>
      )}
    </div>
  )
}

// ── CTA Button ────────────────────────────────────────────────────────────────
function CtaButton({ label = 'Tham Gia Khóa 2 — 2.768.686đ', onClick }: { label?: string; onClick: () => void }) {
  return (
    <div className="space-y-2">
      <button
        onClick={onClick}
        className="flex items-center justify-center gap-2 w-full h-14 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold text-base rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      >
        {label}
        <ArrowRight className="w-5 h-5" />
      </button>
      <p className="text-center text-xs text-[#7A8C7E] flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5" />
        Bảo hành 14 ngày hoàn 100%. Chỉ 20 suất mỗi đợt.
      </p>
    </div>
  )
}

// ── Countdown (visual only) ───────────────────────────────────────────────────
function CountdownBadge() {
  const [slotsLeft] = useState(7)
  return (
    <div className="inline-flex items-center gap-2 bg-[#C0390E]/10 border border-[#C0390E]/30 text-[#C0390E] text-sm font-semibold px-4 py-2 rounded-full">
      <span className="w-2 h-2 bg-[#C0390E] rounded-full animate-pulse" />
      Còn {slotsLeft} suất trong đợt này
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Khoa2Page() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">

      <CheckoutModal
        productId="khoa2_2768"
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />

      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
              <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
            </div>
            <span className="font-bold text-[#0D2B1A] text-sm">DungHoang.com</span>
          </div>
          <button
            onClick={() => setCheckoutOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-[#C0390E] hover:bg-[#A0300B] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Tham gia — 2.768.686đ
          </button>
        </div>
      </header>

      {/* ── Announcement bar ──────────────────────────────────── */}
      <div className="bg-[#0D2B1A] py-2.5 text-center">
        <p className="text-[#F6F0E4] text-xs sm:text-sm">
          Đã mua Khóa 1? Trừ thẳng 686.868đ. Chỉ cần thêm{' '}
          <strong className="text-[#88860B]">2.081.818đ</strong> nữa.
        </p>
      </div>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section
        className={`max-w-5xl mx-auto px-4 pt-12 pb-8 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#EAF5EF] text-[#2D7A4F] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#2D7A4F]/20">
              <Users className="w-3.5 h-3.5" />
              Khóa 2 — Bản Có Đội Trưởng
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#0D2B1A] leading-tight">
              30 ngày dựng xong hệ thống tự chạy.
              <span className="text-[#3D6B4A]"> Có đội trưởng AI kèm sát từng bước.</span>
            </h1>

            <p className="text-[#3D6B4A] text-lg leading-relaxed">
              Khóa 1 dạy 25 skill để bạn tự làm.
              Khóa 2 thêm Tiểu Hà Mã kèm sát 24/7 qua Telegram để đảm bảo bạn
              không bị kẹt ở bước nào và hệ thống thật sự chạy được trong 30 ngày.
            </p>

            <CountdownBadge />

            {/* 3 kết quả cụ thể */}
            <div className="space-y-3">
              {[
                ['Content tự đăng', 'Lịch nội dung tự chạy, không cần ngồi nghĩ mỗi ngày'],
                ['Khách tự được trả lời', 'Tiểu Hà Mã trả lời câu hỏi, lọc lead, đặt lịch hẹn'],
                ['Đơn tự về', 'Phễu tự nuôi dưỡng lead và chốt đơn khi họ sẵn sàng'],
              ].map(([title, desc], i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#2D7A4F] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0D2B1A] text-sm">{title}</span>
                    <span className="text-[#3D6B4A] text-sm"> — {desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right price card */}
          <div className="bg-white border border-[#DDD8CB] rounded-3xl p-6 shadow-sm space-y-5">
            {/* Rollover notice */}
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-xl p-3 text-sm text-[#2D7A4F]">
              Đã mua Khóa 1? <strong>686.868đ được trừ thẳng vào đây.</strong>
            </div>

            {/* Price */}
            <div className="space-y-1">
              <p className="text-sm text-[#7A8C7E]">Đầu tư một lần</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#0D2B1A]">2.768.686đ</span>
              </div>
              <p className="text-xs text-[#7A8C7E]">
                Tương đương 3 ngày lương nhân viên.
                Dùng mãi, không phí tháng.
              </p>
            </div>

            <CtaButton onClick={() => setCheckoutOpen(true)} />

            {/* Badges */}
            <div className="grid grid-cols-3 gap-2 text-xs text-center text-[#3D6B4A]">
              {[
                ['⚡', 'Truy cập ngay'],
                ['🛡️', 'BH 14 ngày'],
                ['🤖', 'Hà Mã 24/7'],
              ].map(([icon, label], i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-base">{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pain ───────────────────────────────────────────────── */}
      <section className="bg-[#0D2B1A] py-12">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <p className="text-[#88860B] text-sm font-semibold uppercase tracking-wider text-center">
            Tại sao biết rồi vẫn không làm được?
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F6F0E4] text-center leading-tight">
            Học xong rồi để đó. Không phải vì lười.
          </h2>
          <p className="text-[#C8D5C9] text-sm text-center leading-relaxed">
            Mình biết cảm giác này. Xem xong video, gật đầu hiểu, nhưng mở máy lên không biết bắt đầu từ đâu.
            Không có ai hỏi, không có ai kiểm tra, rồi cứ để đó...
          </p>
          <div className="space-y-4">
            {[
              ['😔', '"Mua mấy khóa AI rồi nhưng chưa áp dụng được cái nào. Không phải vì không muốn."'],
              ['🤯', '"Học xong không biết áp dụng vào đâu. Kiến thức thì có nhưng không thành hệ thống."'],
              ['😓', '"Không có ai kèm nên cứ mắc kẹt ở những bước nhỏ mà không biết hỏi ai."'],
            ].map(([emoji, text], i) => (
              <div key={i} className="flex gap-4 items-start bg-white/5 rounded-2xl p-4">
                <span className="text-2xl flex-shrink-0">{emoji}</span>
                <p className="text-[#C8D5C9] text-sm leading-relaxed italic">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-[#C8D5C9] text-center text-sm">
            Đó là lý do Khóa 2 có thêm Tiểu Hà Mã. Không phải để học thêm.
            Mà để có người kèm từng bước cho đến khi xong.
          </p>
        </div>
      </section>

      {/* ── Tiểu Hà Mã section ──────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-14 space-y-8">
        <div className="text-center space-y-2">
          <p className="text-[#88860B] text-sm font-semibold uppercase tracking-wider">Điểm khác biệt</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0D2B1A]">Tiểu Hà Mã kèm bạn 24/7</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Không có Hà Mã */}
          <div className="bg-white border border-[#DDD8CB] rounded-3xl p-6 space-y-4">
            <p className="font-semibold text-[#7A8C7E] text-sm">Không có đội trưởng (Khóa 1)</p>
            <ul className="space-y-3">
              {[
                'Tự học 25 skill theo tốc độ riêng',
                'Mắc kẹt ở bước nào thì tự tìm cách giải',
                'Không ai kiểm tra xem hệ thống đã chạy chưa',
                'Kết quả phụ thuộc vào sự kỷ luật của bạn',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#7A8C7E]">
                  <span className="mt-0.5 flex-shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Có Hà Mã */}
          <div className="bg-[#EAF5EF] border border-[#2D7A4F]/30 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#2D7A4F]" />
              <p className="font-semibold text-[#0D2B1A] text-sm">Có Tiểu Hà Mã (Khóa 2)</p>
            </div>
            <ul className="space-y-3">
              {[
                'Hà Mã biết SOP của bạn, kèm từng bước cụ thể',
                'Hỏi bất cứ lúc nào qua Telegram, được trả lời ngay',
                'Hà Mã kiểm tra từng phần và báo khi nào sẵn sàng',
                'Cam kết: 30 ngày có hệ thống tự chạy hoặc mình sửa cùng',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#2D7A4F]">
                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Neo giá ─────────────────────────────────────────────── */}
      <section className="bg-white border-y border-[#DDD8CB] py-12">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-[#88860B] text-sm font-semibold uppercase tracking-wider">So sánh chi phí thực tế</p>
            <h2 className="text-2xl font-bold text-[#0D2B1A]">Nếu bạn tự lo từng thứ một...</h2>
          </div>
          <div className="space-y-3">
            {[
              ['25 skill AI (nhân sự làm 25 việc này)', '50.000.000đ/tháng'],
              ['SOP chi tiết từng hệ thống', '20.000.000đ'],
              ['Đội trưởng AI kèm sát 30 ngày (Tiểu Hà Mã)', '20.000.000đ'],
              ['5 bonus (tiêu đề, BRAND_DNA, 27 yếu tố...)', '10.000.000đ'],
              ['Buổi soi hệ thống sau 30 ngày', '5.000.000đ'],
            ].map(([item, value], i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-[#FAF7F2] rounded-2xl border border-[#DDD8CB]">
                <span className="text-sm text-[#3D6B4A]">{item}</span>
                <span className="text-sm text-[#7A8C7E] line-through ml-4 flex-shrink-0">{value}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#0D2B1A] rounded-2xl p-5 text-center space-y-2">
            <p className="text-[#C8D5C9] text-sm">Tổng nếu tự lo</p>
            <p className="text-2xl font-bold text-[#C8D5C9] line-through">105.000.000đ+</p>
            <p className="text-[#88860B] text-sm">Bạn trả hôm nay</p>
            <p className="text-3xl font-bold text-white">2.768.686đ</p>
            <p className="text-[#7A8C7E] text-xs">Một lần. Dùng mãi.</p>
          </div>
        </div>
      </section>

      {/* ── Bonus ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-14 space-y-8">
        <div className="text-center space-y-2">
          <p className="text-[#88860B] text-sm font-semibold uppercase tracking-wider">Quà tặng kèm</p>
          <h2 className="text-2xl font-bold text-[#0D2B1A]">5 Quà Tặng Không Thể Mua Riêng</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BONUSES.map((bonus, i) => (
            <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{bonus.icon}</span>
                <span className="text-xs text-[#7A8C7E] line-through">{bonus.value}</span>
              </div>
              <p className="font-semibold text-[#0D2B1A] text-sm">{bonus.name}</p>
              <p className="text-xs text-[#3D6B4A] leading-relaxed">{bonus.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── For / Not For ──────────────────────────────────────── */}
      <section className="bg-[#0D2B1A] py-12">
        <div className="max-w-4xl mx-auto px-4 grid sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-[#F6F0E4] flex items-center gap-2 text-lg">
              <CheckCircle className="w-5 h-5 text-[#2D7A4F]" />
              Dành cho bạn nếu...
            </h3>
            <ul className="space-y-3">
              {[
                'Đã biết AI nhưng chưa tạo được hệ thống chạy thật',
                'Muốn có người kèm sát đến khi hệ thống hoạt động',
                'Từng mua khóa rồi để đó và muốn lần này khác',
                'Muốn cam kết có kết quả trong 30 ngày cụ thể',
                'Đang kinh doanh một mình và muốn AI thay phần lớn công việc',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#C8D5C9]">
                  <CheckCircle className="w-4 h-4 text-[#2D7A4F] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-[#F6F0E4] flex items-center gap-2 text-lg">
              <span className="text-[#C0390E] font-bold text-xl leading-none">✕</span>
              Không phù hợp nếu...
            </h3>
            <ul className="space-y-3">
              {[
                'Bạn muốn người khác làm hết, không muốn tự tay làm gì',
                'Bạn chưa có sản phẩm hoặc dịch vụ để đưa vào hệ thống',
                'Bạn không sẵn sàng dành 1-2 tiếng mỗi ngày trong 30 ngày đầu',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#7A8C7E]">
                  <span className="text-[#C0390E] flex-shrink-0 font-bold mt-0.5">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Về Dũng ─────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-14">
        <div className="bg-white border border-[#DDD8CB] rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#0D2B1A] flex items-center justify-center flex-shrink-0">
              <span className="text-[#F6F0E4] font-bold text-2xl font-mono">DH</span>
            </div>
            <div>
              <p className="font-bold text-[#0D2B1A] text-lg">Dũng Hoàng</p>
              <p className="text-sm text-[#7A8C7E]">Đang vận hành công ty một người nhờ AI.</p>
            </div>
          </div>
          <p className="text-[#3D6B4A] leading-relaxed text-sm">
            Tiểu Hà Mã là cái mình đang dùng mỗi ngày để vận hành DungHoang.com, homestay,
            và tất cả các dự án khác. Mình không cần nhân viên vì Hà Mã làm thay.
          </p>
          <p className="text-[#3D6B4A] leading-relaxed text-sm">
            Trong Khóa 2 mình thiết lập riêng một Hà Mã cho bạn, dạy nó hiểu sản phẩm và khách hàng của bạn,
            rồi kèm bạn 24/7 qua Telegram cho đến khi hệ thống của bạn tự chạy được.
          </p>
        </div>
      </section>

      {/* ── Guarantee ──────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 pb-14">
        <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-3xl p-8 text-center space-y-4">
          <div className="text-4xl">🛡️</div>
          <h3 className="text-xl font-bold text-[#0D2B1A]">Bảo Hành 14 Ngày Hoàn 100%</h3>
          <p className="text-[#3D6B4A] text-sm leading-relaxed max-w-xl mx-auto">
            Mua về, bắt đầu cùng Hà Mã. Trong 14 ngày nếu thấy không phù hợp,
            nhắn mình. Mình hoàn lại 2.768.686đ trong 24 giờ. Không hỏi lý do.
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 pb-14 space-y-4">
        <h2 className="text-xl font-bold text-[#0D2B1A] text-center">Câu Hỏi Thường Gặp</h2>
        <div className="space-y-3">
          {FAQS.map((item, i) => <FaqItem key={i} {...item} />)}
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="bg-[#0D2B1A] py-14">
        <div className="max-w-2xl mx-auto px-4 space-y-6 text-center">
          <CountdownBadge />
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F6F0E4] leading-tight">
            30 ngày. Tiểu Hà Mã kèm sát.
            <br />
            <span className="text-[#88860B]">Hệ thống tự chạy hoặc mình sửa cùng.</span>
          </h2>
          <p className="text-[#C8D5C9] text-sm leading-relaxed">
            Đã mua Khóa 1? Trừ thẳng 686.868đ. Chỉ cần thêm 2.081.818đ.
          </p>
          <div className="max-w-sm mx-auto">
            <CtaButton onClick={() => setCheckoutOpen(true)} />
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-[#DDD8CB] bg-[#F6F0E4] py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7A8C7E]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#0D2B1A] flex items-center justify-center">
              <span className="text-[#F6F0E4] font-bold text-xs font-mono">DH</span>
            </div>
            <span>DungHoang.com</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/thu-thach-7-ngay" className="hover:text-[#3D6B4A] transition-colors">Thử thách 7 ngày</Link>
            <Link href="/mini-trang-ban-hang" className="hover:text-[#3D6B4A] transition-colors">Mini 368k</Link>
            <Link href="/khoa-1-ban-tu-lap" className="hover:text-[#3D6B4A] transition-colors">Khóa 1</Link>
            <a href="https://t.me/kenthoang" target="_blank" rel="noopener noreferrer" className="hover:text-[#3D6B4A] transition-colors">@kenthoang</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
