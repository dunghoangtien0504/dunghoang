'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ShieldCheck, ChevronDown, ChevronUp, ArrowRight, BookOpen } from 'lucide-react'
import CheckoutModal from '@/components/checkout/CheckoutModal'

// ── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Không biết gì về AI thì học được không?',
    a: 'Được. Mình thiết kế cho người chưa dùng AI bao giờ. Bạn chỉ cần có máy tính và kết nối internet. Mỗi skill có hướng dẫn từng bước, không bỏ bước nào.',
  },
  {
    q: 'Khác gì so với Mini 368k?',
    a: 'Mini chỉ dạy 1 skill: làm trang bán hàng. Khóa 1 gồm đủ 25 skill: từ trang bán, chatbot, email tự động, content, ads, phễu... tạo thành hệ thống bán hàng hoàn chỉnh. Nếu bạn đã mua Mini, 368k được trừ thẳng vào giá Khóa 1.',
  },
  {
    q: 'Rollover 368k nghĩa là sao?',
    a: '368k bạn đã trả cho Mini sẽ được khấu trừ khi bạn mua Khóa 1. Thay vì trả 686.868đ, bạn chỉ cần thêm 318.868đ. Áp dụng tự động khi bạn thanh toán.',
  },
  {
    q: 'Học xong có dùng được ngay không?',
    a: 'Mỗi skill có output cụ thể: cuối buổi bạn có thứ gì đó chạy thật, không chỉ kiến thức chung chung. Tuỳ skill mà output là trang bán hàng, chatbot, chuỗi email... dùng được ngay.',
  },
  {
    q: 'Bảo hành thế nào?',
    a: 'Mình bảo hành 14 ngày hoàn 100%. Mua về học thử, thấy không phù hợp thì nhắn mình. Mình hoàn trong 24 giờ, không hỏi lý do.',
  },
]

// ── 25 Skill list ────────────────────────────────────────────────────────────
const SKILLS = [
  { num: '01', name: 'Trang bán hàng 1 giờ', tag: 'Nền tảng' },
  { num: '02', name: 'Avatar khách hàng chuẩn', tag: 'Chiến lược' },
  { num: '03', name: 'Giọng thương hiệu riêng', tag: 'Chiến lược' },
  { num: '04', name: 'Cơ chế khác biệt (Hero Mechanism)', tag: 'Chiến lược' },
  { num: '05', name: 'Thiết kế offer không từ chối được', tag: 'Offer' },
  { num: '06', name: 'Lead magnet kéo email', tag: 'Lead' },
  { num: '07', name: 'Phễu bán hàng tự chạy', tag: 'Phễu' },
  { num: '08', name: 'Ads Facebook viết bằng AI', tag: 'Quảng cáo' },
  { num: '09', name: 'Kịch bản video VSL', tag: 'Nội dung' },
  { num: '10', name: 'Chuỗi email nuôi dưỡng lead', tag: 'Email' },
  { num: '11', name: 'Follow-up lead không mua', tag: 'Email' },
  { num: '12', name: 'Script gọi điện chốt đơn', tag: 'Sales' },
  { num: '13', name: 'Chatbot trả lời khách tự động', tag: 'Tự động' },
  { num: '14', name: 'Content 30 ngày không cạn ý', tag: 'Nội dung' },
  { num: '15', name: 'Caption + hook mạng xã hội', tag: 'Nội dung' },
  { num: '16', name: 'Tóm tắt tài liệu dài thành bài đăng', tag: 'Nội dung' },
  { num: '17', name: 'Lịch đăng bài tự động', tag: 'Tự động' },
  { num: '18', name: 'Đặt lịch hẹn tư vấn tự động', tag: 'Tự động' },
  { num: '19', name: 'Báo cáo doanh thu hàng tuần', tag: 'Quản lý' },
  { num: '20', name: 'Quản lý đơn hàng không cần nhân viên', tag: 'Quản lý' },
  { num: '21', name: 'Chăm sóc khách sau mua', tag: 'Retention' },
  { num: '22', name: 'Upsell tự động sau giao dịch', tag: 'Doanh thu' },
  { num: '23', name: 'Affiliate tracking đơn giản', tag: 'Doanh thu' },
  { num: '24', name: 'Review + testimonial tự thu thập', tag: 'Proof' },
  { num: '25', name: 'Dashboard tổng hợp mọi kênh', tag: 'Quản lý' },
]

const TAG_COLORS: Record<string, string> = {
  'Nền tảng':  'bg-[#EAF5EF] text-[#2D7A4F]',
  'Chiến lược':'bg-[#FFF8E6] text-[#7A6000]',
  'Offer':     'bg-[#FFF0EC] text-[#C0390E]',
  'Lead':      'bg-[#EAF5EF] text-[#2D7A4F]',
  'Phễu':      'bg-[#F0EDF8] text-[#5B3DA8]',
  'Quảng cáo': 'bg-[#FFF0EC] text-[#C0390E]',
  'Email':     'bg-[#EAF5EF] text-[#2D7A4F]',
  'Sales':     'bg-[#FFF8E6] text-[#7A6000]',
  'Nội dung':  'bg-[#EDF3FF] text-[#2B5BB8]',
  'Tự động':   'bg-[#F0EDF8] text-[#5B3DA8]',
  'Quản lý':   'bg-[#FAF7F2] text-[#5A4A3A]',
  'Retention': 'bg-[#EAF5EF] text-[#2D7A4F]',
  'Doanh thu': 'bg-[#FFF8E6] text-[#7A6000]',
  'Proof':     'bg-[#FFF0EC] text-[#C0390E]',
}

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
function CtaButton({
  label = 'Mua Khóa 1 — 686.868đ',
  onClick,
}: {
  label?: string
  onClick: () => void
}) {
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

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Khoa1Page() {
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">

      <CheckoutModal
        productId="khoa1_686"
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
            Mua ngay 686.868đ
          </button>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left: copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#EAF5EF] text-[#2D7A4F] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#2D7A4F]/20">
              <BookOpen className="w-3.5 h-3.5" />
              Khóa 1 — Bản Tự Lập
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#0D2B1A] leading-tight">
              25 skill AI. Mỗi skill thay 1 người.
              Cả bộ thay 1 đội nhân sự.
            </h1>

            <p className="text-[#3D6B4A] text-lg leading-relaxed">
              Hồi trước mình cũng thuê người làm từng việc này.
              Rồi nhận ra AI làm được hết, và làm nhanh hơn, rẻ hơn.
              Mình gói lại thành 25 skill có hướng dẫn, bạn học rồi tự chạy một mình.
            </p>

            {/* Social proof nhỏ */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['N', 'T', 'L', 'H', 'M'].map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[#3D6B4A] border-2 border-[#F6F0E4] flex items-center justify-center text-white text-xs font-bold"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#3D6B4A]">
                Hơn 600 người đang dùng bộ skill này
              </p>
            </div>
          </div>

          {/* Right: price card */}
          <div className="bg-white border border-[#DDD8CB] rounded-3xl p-6 shadow-sm space-y-5">
            {/* Rollover notice */}
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-xl p-3 text-sm text-[#2D7A4F]">
              Đã mua Mini 368k? <strong>368k đó được trừ thẳng vào đây.</strong> Bạn chỉ cần thêm 318.868đ.
            </div>

            {/* Price */}
            <div className="space-y-1">
              <p className="text-sm text-[#7A8C7E]">Giá đầy đủ</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#0D2B1A]">686.868đ</span>
                <span className="text-sm text-[#7A8C7E] line-through">50tr+/tháng thuê người</span>
              </div>
              <p className="text-xs text-[#7A8C7E]">Một lần. Không phí tháng. Dùng mãi.</p>
            </div>

            <CtaButton onClick={() => setCheckoutOpen(true)} />

            {/* Badges */}
            <div className="grid grid-cols-3 gap-2 text-xs text-center text-[#3D6B4A]">
              {[
                ['⚡', 'Truy cập ngay'],
                ['🛡️', 'BH 14 ngày'],
                ['🔄', '368k rollover'],
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

      {/* ── Pain section ────────────────────────────────────────── */}
      <section className="bg-[#0D2B1A] py-12">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <p className="text-[#88860B] text-sm font-semibold uppercase tracking-wider text-center">
            Mình từng ở chỗ này
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F6F0E4] text-center leading-tight">
            Kinh doanh một mình mà cần làm đủ thứ...
          </h2>
          <div className="space-y-4">
            {[
              ['😩', '"Muốn đăng content nhưng không biết viết gì, cứ ngồi nhìn màn hình trắng."'],
              ['💸', '"Thuê người chạy ads tốn cả chục triệu mà không ra đơn, mình không hiểu tại sao."'],
              ['😰', '"Trả lời khách hàng cả ngày, không còn thời gian để làm việc thật."'],
              ['😤', '"Mua mấy khóa AI rồi nhưng không biết áp dụng vào đâu, để đó bụi."'],
            ].map(([emoji, text], i) => (
              <div key={i} className="flex gap-4 items-start bg-white/5 rounded-2xl p-4">
                <span className="text-2xl flex-shrink-0">{emoji}</span>
                <p className="text-[#C8D5C9] text-sm leading-relaxed italic">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-[#C8D5C9] text-center text-sm leading-relaxed">
            Mình từng vậy. Cho đến khi tìm ra cách để AI làm thay phần lớn những việc này.
            25 skill trong khóa này chính là 25 thứ mình đã giải quyết được.
          </p>
        </div>
      </section>

      {/* ── 25 Skills ──────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-14 space-y-8">
        <div className="text-center space-y-2">
          <p className="text-[#88860B] text-sm font-semibold uppercase tracking-wider">Bạn sẽ có</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0D2B1A]">25 Skill AI — Mỗi Cái Thay 1 Người</h2>
          <p className="text-[#3D6B4A] max-w-xl mx-auto text-sm leading-relaxed">
            Không phải lý thuyết. Mỗi skill có hướng dẫn + prompt sẵn + checklist.
            Học xong là làm được ngay.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SKILLS.map((skill) => (
            <div
              key={skill.num}
              className="flex items-start gap-3 bg-white border border-[#DDD8CB] rounded-2xl p-4 hover:border-[#3D6B4A]/40 transition-colors"
            >
              <span className="font-mono text-xs text-[#7A8C7E] flex-shrink-0 mt-0.5 w-6">{skill.num}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0D2B1A] leading-snug">{skill.name}</p>
                <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${TAG_COLORS[skill.tag] ?? 'bg-[#FAF7F2] text-[#7A8C7E]'}`}>
                  {skill.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── For / Not For ──────────────────────────────────────── */}
      <section className="bg-white border-y border-[#DDD8CB] py-12">
        <div className="max-w-4xl mx-auto px-4 grid sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-[#0D2B1A] flex items-center gap-2 text-lg">
              <CheckCircle className="w-5 h-5 text-[#2D7A4F]" />
              Dành cho bạn nếu...
            </h3>
            <ul className="space-y-3">
              {[
                'Đang kinh doanh một mình và muốn AI làm thay những việc tốn thời gian',
                'Đã thử dùng ChatGPT nhưng chưa biết áp dụng bài bản vào việc kinh doanh',
                'Muốn tự chủ, không phụ thuộc freelancer hay nhân viên cho từng việc nhỏ',
                'Đang học Thử thách 7 ngày và muốn đi xa hơn sau khi kết thúc',
                'Đã mua Mini 368k và muốn nâng cấp lên bộ đầy đủ với chi phí tối thiểu',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#3D6B4A]">
                  <CheckCircle className="w-4 h-4 text-[#2D7A4F] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-[#0D2B1A] flex items-center gap-2 text-lg">
              <span className="text-[#C0390E] font-bold text-xl leading-none">✕</span>
              Không phù hợp nếu...
            </h3>
            <ul className="space-y-3">
              {[
                'Bạn muốn ai đó làm hết cho mình (khóa này dạy tự làm, không làm thay)',
                'Bạn cần giải pháp cực phức tạp với đội ngũ lập trình riêng',
                'Bạn chưa có sản phẩm hoặc dịch vụ gì để bán',
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
              <p className="text-sm text-[#7A8C7E]">Solopreneur. Đang dùng AI để vận hành mọi thứ một mình.</p>
            </div>
          </div>
          <p className="text-[#3D6B4A] leading-relaxed text-sm">
            Mình không phải chuyên gia hay giảng viên. Mình là người đang kinh doanh một mình,
            vừa vận hành homestay, vừa build DungHoang.com, và dùng AI để làm hầu hết mọi thứ
            mà trước đây cần cả đội.
          </p>
          <p className="text-[#3D6B4A] leading-relaxed text-sm">
            25 skill này là những gì mình đang dùng thật, không phải lý thuyết.
            Hơn 600 người đã học và có kết quả. Mình chia sẻ lại vì nghĩ người kinh doanh một mình
            nên biết những thứ này.
          </p>
        </div>
      </section>

      {/* ── Guarantee ──────────────────────────────────────────── */}
      <section className="bg-[#0D2B1A] py-10">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-4">
          <div className="text-4xl">🛡️</div>
          <h3 className="text-xl font-bold text-[#F6F0E4]">Bảo Hành 14 Ngày Hoàn 100%</h3>
          <p className="text-[#C8D5C9] text-sm leading-relaxed">
            Mua về, học thử. Trong 14 ngày nếu bạn thấy không phù hợp, nhắn mình một tin.
            Mình hoàn lại 686.868đ trong 24 giờ. Không hỏi lý do, không giữ lại.
            Đối thủ bảo hành 3 ngày. Mình thấy vậy không đủ để bạn an tâm thử.
          </p>
        </div>
      </section>

      {/* ── Value Stack ─────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 py-14 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-[#88860B] text-sm font-semibold uppercase tracking-wider">Bạn nhận được</p>
          <h2 className="text-2xl font-bold text-[#0D2B1A]">Đổi 686.868đ Lấy Gì?</h2>
        </div>
        <div className="space-y-3">
          {[
            ['25 skill AI có hướng dẫn từng bước', '50.000.000đ/tháng (giá thuê 25 người)', true],
            ['Bộ prompt sẵn dán là chạy cho cả 25 skill', '5.000.000đ', false],
            ['SOP chi tiết từng quy trình', '3.000.000đ', false],
            ['Checklist trước khi chạy mỗi hệ thống', '1.000.000đ', false],
            ['File BRAND_DNA mẫu', '500.000đ', false],
          ].map(([item, value, isMain], i) => (
            <div
              key={i}
              className={`flex justify-between items-center p-4 rounded-2xl border ${
                isMain ? 'border-[#3D6B4A]/40 bg-[#EAF5EF]' : 'border-[#DDD8CB] bg-white'
              }`}
            >
              <span className={`text-sm ${isMain ? 'font-semibold text-[#0D2B1A]' : 'text-[#3D6B4A]'}`}>{item as string}</span>
              <span className="text-sm text-[#7A8C7E] line-through ml-4 flex-shrink-0">{value as string}</span>
            </div>
          ))}
        </div>
        <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-2xl p-5 text-center space-y-2">
          <p className="text-sm text-[#7A8C7E]">Tổng giá trị nếu tự lo</p>
          <p className="text-2xl font-bold text-[#7A8C7E] line-through">59.500.000đ</p>
          <p className="text-sm text-[#7A8C7E]">Bạn trả hôm nay</p>
          <p className="text-3xl font-bold text-[#C0390E]">686.868đ</p>
          <p className="text-xs text-[#7A8C7E]">Một lần. Không phí tháng.</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F6F0E4] leading-tight">
            25 skill. Dùng mãi.
            <br />
            <span className="text-[#88860B]">Không nhân viên. Không lương tháng.</span>
          </h2>
          <p className="text-[#C8D5C9] text-sm leading-relaxed">
            Nếu bạn đã mua Mini 368k, trừ thẳng vào. Chỉ cần thêm 318.868đ nữa.
          </p>
          <div className="max-w-sm mx-auto space-y-3">
            <button
              onClick={() => setCheckoutOpen(true)}
              className="flex items-center justify-center gap-2 w-full h-14 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold text-base rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Mua Khóa 1 — 686.868đ
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-[#7A8C7E] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Bảo hành 14 ngày hoàn 100%. Không hỏi lý do.
            </p>
          </div>
          <p className="text-[#7A8C7E] text-xs">
            Sau Khóa 1 muốn có thêm đội trưởng AI kèm sát 24/7?{' '}
            <Link href="/khoa-2-ban-co-doi-truong" className="text-[#C8D5C9] underline">
              Xem Khóa 2
            </Link>
          </p>
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
            <Link href="/thu-thach-7-ngay" className="hover:text-[#3D6B4A] transition-colors">
              Thử thách 7 ngày
            </Link>
            <Link href="/mini-trang-ban-hang" className="hover:text-[#3D6B4A] transition-colors">
              Mini 368k
            </Link>
            <a href="https://t.me/kenthoang" target="_blank" rel="noopener noreferrer" className="hover:text-[#3D6B4A] transition-colors">
              @kenthoang
            </a>
          </div>
        </div>
      </footer>

    </div>
  )
}
