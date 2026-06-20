'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ShieldCheck, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import CheckoutModal from '@/components/checkout/CheckoutModal'

// ── Data ─────────────────────────────────────────────────────────────────────
const INCLUDES = [
  {
    icon: '🎯',
    title: 'Skill AI Làm Landing Page Trong 1 Giờ',
    desc: 'Quy trình từng bước: từ không có gì đến trang bán hàng chạy thật. Không cần biết code. Không cần biết thiết kế.',
  },
  {
    icon: '📝',
    title: 'Bộ Prompt Sẵn — Dán Là Chạy',
    desc: 'Prompt viết headline, bullets, CTA, section proof. AI viết theo đúng giọng bạn sau khi điền BRAND_DNA.',
  },
  {
    icon: '🧩',
    title: 'Checklist 12 Điểm Trang Bán Hàng',
    desc: 'Trước khi bấm đăng: 12 điểm kiểm tra nhanh. Không bỏ sót phần nào làm khách thoát trang.',
  },
  {
    icon: '🎁',
    title: 'File BRAND_DNA Mẫu (Tặng Kèm)',
    desc: 'Điền 15 phút là AI biết bạn là ai. Dùng lại được cho mọi thứ sau này, không chỉ landing page.',
  },
]

const FAQS = [
  {
    q: 'Mình không rành công nghệ, làm được không?',
    a: 'Được. Mình từng dạy người không biết AI làm xong trong 1 tiếng. Quy trình có hình ảnh từng bước, không có chỗ nào bạn phải tự đoán.',
  },
  {
    q: 'Trang bán hàng này dùng công cụ gì?',
    a: 'Mình hướng dẫn dùng các tool miễn phí / rẻ có sẵn. Bạn không cần mua thêm phần mềm nào.',
  },
  {
    q: 'Nếu mình không hài lòng thì sao?',
    a: 'Mình bảo hành 14 ngày hoàn 100%. Không hỏi lý do. Chuyển khoản lại trong 24 giờ.',
  },
  {
    q: 'Khác gì mấy khóa dạy landing page khác?',
    a: 'Cái này mình chỉ dạy 1 skill thôi, không phải cả khóa. Bạn làm xong trong buổi, không phải xem 10 video rồi vẫn chưa có trang.',
  },
]

// ── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white border border-[#DDD8CB] rounded-2xl px-5 py-4 hover:border-[#3D6B4A]/40 transition-all"
    >
      <div className="flex justify-between items-start gap-4">
        <span className="font-semibold text-[#0D2B1A] text-sm leading-snug">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-[#3D6B4A] flex-shrink-0 mt-0.5" />
          : <ChevronDown className="w-4 h-4 text-[#3D6B4A] flex-shrink-0 mt-0.5" />
        }
      </div>
      {open && (
        <p className="text-sm text-[#7A8C7E] leading-relaxed mt-3 pt-3 border-t border-[#DDD8CB]">
          {a}
        </p>
      )}
    </button>
  )
}

// ── CTA Button ───────────────────────────────────────────────────────────────
function CtaButton({ label = 'Mua Ngay — 368.000đ', onClick }: { label?: string; onClick: () => void }) {
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
        Bảo hành 14 ngày hoàn 100%. Không hỏi lý do.
      </p>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function MiniTrangBanHangPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">

      <CheckoutModal
        productId="mini_368"
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />

      {/* ── Header ───────────────────────────────────────────── */}
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
            Mua ngay 368k
          </button>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 pt-14 pb-12">

        {/* Label */}
        <div className="inline-flex items-center gap-2 bg-[#EAF5EF] border border-[#2D7A4F]/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#2D7A4F]" />
          <span className="text-sm font-medium text-[#2D7A4F]">Mini "Trang Bán Hàng 1 Giờ"</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0D2B1A] leading-tight mb-4">
          Mình mất 8 triệu một tháng để thuê người làm cái này...
          <br />
          <span className="text-[#C0390E]">Bây giờ AI làm xong trong 1 tiếng.</span>
        </h1>

        <p className="text-lg text-[#3D6B4A] leading-relaxed mb-8">
          Đây là 1 skill trong bộ Biệt Đội AI Agent của mình. Skill làm trang bán hàng.
          Bạn không cần biết code. Không cần biết thiết kế. Chỉ cần 1 tiếng.
        </p>

        {/* Price card */}
        <div className="bg-white border border-[#DDD8CB] rounded-3xl p-7 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div className="space-y-1">
              <p className="text-sm text-[#7A8C7E]">Thuê người làm việc này</p>
              <p className="text-2xl font-bold text-[#7A8C7E] line-through">8-10 triệu / tháng</p>
              <p className="text-xs text-[#7A8C7E]">(chỉ làm được 5-10 trang/tháng, còn nghỉ phép, đòi tăng lương)</p>
            </div>
            <div className="text-right space-y-0.5">
              <p className="text-sm text-[#3D6B4A] font-medium">Học skill này — dùng mãi</p>
              <p className="text-4xl font-bold text-[#0D2B1A]">368.000đ</p>
              <p className="text-xs text-[#88860B]">Một lần. Không phí tháng.</p>
            </div>
          </div>
          <div className="mt-6">
            <CtaButton onClick={() => setCheckoutOpen(true)} />
          </div>
          <div className="flex flex-wrap gap-4 mt-5 pt-5 border-t border-[#DDD8CB]">
            {[
              { icon: '⚡', text: 'Truy cập ngay sau khi thanh toán' },
              { icon: '🛡️', text: 'Bảo hành 14 ngày hoàn 100%' },
              { icon: '🔄', text: '368k trừ vào Khóa 1 nếu nâng cấp' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="text-xs text-[#7A8C7E]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PAIN ─────────────────────────────────────────────── */}
      <section className="bg-[#0D2B1A] py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-[#88860B] font-semibold text-sm uppercase tracking-widest">Mình từng ở chỗ này</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F6F0E4] leading-snug">
            Trang bán hàng chưa có là mỗi ngày đang mất tiền...
          </h2>
          <p className="text-[#A8C4B0] leading-relaxed">
            Hồi trước mình cũng vậy. Có sản phẩm rồi mà không có chỗ bán. Nhờ người làm thì chờ,
            tự làm thì không biết bắt đầu từ đâu. Đăng lên Zalo rồi ngồi chờ inbox...
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { e: '😩', t: '"Muốn bán mà chưa có trang — cứ đăng Facebook thôi, không chuyên nghiệp."' },
              { e: '💸', t: '"Thuê người làm 1 trang tốn cả triệu, xong muốn sửa lại phải nhờ lại từ đầu."' },
              { e: '😰', t: '"Tự mày mò Canva, WordPress, mất cả ngày mà ra cái vừa xấu vừa không chuyển đổi."' },
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="text-2xl mb-3">{card.e}</div>
                <p className="text-[#A8C4B0] text-sm leading-relaxed italic">{card.t}</p>
              </div>
            ))}
          </div>
          <p className="text-[#A8C4B0] leading-relaxed">
            Cho đến khi mình tìm ra cách dùng AI làm trang trong 1 tiếng.
            Không phải trang xấu cho có. Là trang chạy được, bán được.
          </p>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-[#88860B] font-semibold text-sm uppercase tracking-widest mb-3">Bạn sẽ có</p>
          <h2 className="text-2xl font-bold text-[#0D2B1A]">Trong Mini "Trang Bán Hàng 1 Giờ"</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {INCLUDES.map((item, i) => (
            <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-6 hover:border-[#3D6B4A]/40 transition-colors">
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="font-bold text-[#0D2B1A] text-sm mb-2">{item.title}</p>
              <p className="text-[#7A8C7E] text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHO THIS IS FOR ──────────────────────────────────── */}
      <section className="bg-[#FAF7F2] py-14 px-4 border-y border-[#DDD8CB]">
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-[#0D2B1A] mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#2D7A4F]" />
                Dành cho bạn nếu...
              </h3>
              <ul className="space-y-3">
                {[
                  'Đang bán sản phẩm/dịch vụ mà chưa có trang bán hàng chuyên nghiệp',
                  'Đã thử Canva, WordPress, nhờ người làm nhưng mỗi lần sửa lại phụ thuộc người khác',
                  'Muốn tự chủ trang của mình mà không cần học code',
                  'Đang học 7 ngày thử thách và muốn có trang bán hàng ngay tuần này',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm text-[#0D2B1A]">
                    <CheckCircle className="w-4 h-4 text-[#2D7A4F] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-[#0D2B1A] mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full border-2 border-[#7A8C7E] flex items-center justify-center text-[#7A8C7E] text-xs font-bold">✕</span>
                Không phù hợp nếu...
              </h3>
              <ul className="space-y-3">
                {[
                  'Bạn muốn ai đó làm trang hộ (mình dạy tự làm, không làm thay)',
                  'Bạn cần trang cực phức tạp với nhiều tính năng lập trình',
                  'Bạn chưa có sản phẩm/dịch vụ gì để bán',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm text-[#7A8C7E]">
                    <span className="w-4 h-4 rounded-full border border-[#DDD8CB] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-[#EAF5EF] border border-[#2D7A4F]/30 rounded-3xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <ShieldCheck className="w-8 h-8 text-[#2D7A4F]" />
          </div>
          <h3 className="text-xl font-bold text-[#0D2B1A]">Bảo Hành 14 Ngày Hoàn 100%</h3>
          <p className="text-[#3D6B4A] leading-relaxed max-w-sm mx-auto text-sm">
            Mua về, học thử. Trong 14 ngày nếu bạn thấy không phù hợp, nhắn mình một tin.
            Mình hoàn lại 368.000đ trong 24 giờ. Không hỏi lý do, không giữ lại.
          </p>
          <p className="text-xs text-[#7A8C7E] italic">
            Đối thủ bảo hành 3 ngày. Mình thấy vậy không đủ để bạn an tâm thử.
          </p>
        </div>
      </section>

      {/* ── VALUE STACK ──────────────────────────────────────── */}
      <section className="bg-[#0D2B1A] py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <p className="text-[#88860B] font-semibold text-sm uppercase tracking-widest mb-2">Bạn nhận được</p>
            <h2 className="text-2xl font-bold text-[#F6F0E4]">Đổi 368.000đ Lấy Gì?</h2>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="divide-y divide-white/10">
              {[
                { item: 'Skill AI Làm Landing Page (1 giờ)', value: '8-10tr/tháng nếu thuê người' },
                { item: 'Bộ Prompt Sẵn — Dán Là Chạy', value: '686.000đ' },
                { item: 'Checklist 12 Điểm Trang Bán Hàng', value: '686.000đ' },
                { item: '🎁 File BRAND_DNA Mẫu (Tặng Kèm)', value: '686.000đ' },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-4 gap-4">
                  <span className="text-[#A8C4B0] text-sm">{row.item}</span>
                  <span className="text-[#F6F0E4] text-sm font-semibold text-right flex-shrink-0 line-through opacity-60">{row.value}</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-5 py-4 bg-white/5">
                <span className="text-[#F6F0E4] font-bold">Bạn trả hôm nay</span>
                <span className="text-[#C0390E] font-bold text-xl">368.000đ</span>
              </div>
            </div>
          </div>

          <p className="text-[#A8C4B0] text-sm text-center leading-relaxed">
            Thuê một người chỉ ngồi làm landing page thôi đã 8-10 triệu một tháng,
            mà tháng làm được 5-10 cái là cùng...
            <br />
            <span className="text-[#F6F0E4]">Cái này dạy bạn tự làm không giới hạn. Một lần.</span>
          </p>

          <div className="max-w-sm mx-auto">
            <CtaButton label="Học Ngay — 368.000đ" onClick={() => setCheckoutOpen(true)} />
          </div>
        </div>
      </section>

      {/* ── ROLLOVER NOTE ────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-2xl p-6 flex gap-4 items-start">
          <div className="text-2xl flex-shrink-0">💡</div>
          <div>
            <p className="font-semibold text-[#0D2B1A] text-sm mb-1">Dùng được luôn cho Biệt Đội đầy đủ</p>
            <p className="text-[#7A8C7E] text-sm leading-relaxed">
              Mini này là 1 trong 25 skill của Khóa "Biệt Đội AI Agent".
              Nếu sau này bạn muốn học cả bộ 25 skill, 368.000đ hôm nay sẽ được trừ vào.
              Không mất đi đâu.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-bold text-[#0D2B1A] mb-6 text-center">Câu hỏi hay gặp</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-[#0D2B1A] py-14 px-4">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#F6F0E4]">Bắt đầu làm trang bán hàng hôm nay</h2>
            <p className="text-[#A8C4B0] text-sm">1 giờ. AI làm hộ. 368.000đ.</p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setCheckoutOpen(true)}
              className="flex items-center justify-center gap-2 w-full h-14 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold text-base rounded-xl transition-all shadow-lg"
            >
              Mua Ngay — 368.000đ
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-[#7A8C7E] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Bảo hành 14 ngày hoàn 100%
            </p>
          </div>
          <p className="text-[#7A8C7E] text-xs">
            Câu hỏi? Nhắn mình qua{' '}
            <a href="https://m.me/dunghoang" className="underline hover:text-[#A8C4B0] transition-colors">Messenger</a>
            {' '}nha.
          </p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="bg-[#F6F0E4] border-t border-[#DDD8CB] py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-[#0D2B1A] flex items-center justify-center">
              <span className="text-[#F6F0E4] font-bold text-[10px] font-mono">DH</span>
            </div>
            <span className="text-[#0D2B1A] font-semibold text-sm">DungHoang.com</span>
          </div>
          <p className="text-[#7A8C7E] text-xs">© 2026 DungHoang.com</p>
          <div className="flex gap-4">
            <Link href="/chinh-sach-bao-mat" className="text-[#7A8C7E] text-xs hover:text-[#0D2B1A] transition-colors">Chính sách</Link>
            <Link href="/lien-he" className="text-[#7A8C7E] text-xs hover:text-[#0D2B1A] transition-colors">Liên hệ</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
