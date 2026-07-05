'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Check, X, ShieldCheck, Zap, FileCode2, Rocket, Package, Clock,
  ArrowRight, Terminal, Wallet, Gift, BadgeCheck, Users, Building2,
  UserRound, MessageSquareText, Ban, Layers, MousePointerClick, Home,
  RefreshCw, GraduationCap, Timer, Sparkles
} from 'lucide-react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS, formatVND } from '@/lib/products'

const product = PRODUCTS['landing-page']

const LESSONS = [
  { n:'01', title:'Setup công cụ Vibe Coding (Cursor, Antigravity, Claude Code)', time:'30 phút', output:'Cursor, Antigravity, Claude Code đã cài, thư mục làm việc sẵn sàng' },
  { n:'02', title:'Skill 01: Xây chân dung khách hàng', time:'30 phút', output:'avatar-khach-hang.md, biết mình đang viết cho ai' },
  { n:'03', title:'Skill 02: Định hình giọng văn thương hiệu để AI viết không bị giả', time:'45 phút', output:'brand-dna.md, AI viết đúng giọng bạn' },
  { n:'04', title:'Skill 03: Thiết kế Offer theo phương trình giá trị Alex Hormozi', time:'45 phút', output:'offer-scorecard.md, offer nghe xứng đáng với giá' },
  { n:'05', title:'Skill 05: Định danh cơ chế khác biệt (Hero Mechanism)', time:'45 phút', output:'hero-mechanism.md + 3 bản headline' },
  { n:'06', title:'Skill 07: Đóng gói Offer hoàn chỉnh 5 lớp (Core, Bonus, Guarantee, Urgency, CTA)', time:'60 phút', output:'offer-final.md, offer đủ 5 tầng' },
  { n:'07', title:'Skill 09: Xác định phễu bán hàng, chọn 1 mục tiêu duy nhất cho trang', time:'45 phút', output:'funnel-plan.md, 1 mục tiêu rõ cho landing page' },
  { n:'08', title:'Skill 10: Tự build Landing Page HTML thật từ các file dữ liệu trên', time:'90 phút', output:'landing-page.html chạy được, không phải demo' },
  { n:'09', title:'Skill 11: Nâng cấp UI/UX chuẩn Pro Max (màu, chữ, khoảng cách, độ nổi CTA)', time:'60 phút', output:'landing-page-v2.html đẹp hơn, chuyển đổi cao hơn' },
  { n:'10', title:'Deploy lên Vercel, cài SePay nhận tiền tự động, gắn Meta Pixel', time:'60 phút', output:'Landing page đang chạy thật trên tên miền của bạn' },
]

const FAQS = [
  { q:'Không biết code có làm được không?', a:'Được. Không cần code một chữ. Vibe Coding nghĩa là bạn tải file skill về, bỏ vào thư mục, chat AI "đọc file này và làm hộ tôi". AI viết code, bạn nói muốn gì.' },
  { q:'Cần dùng tool AI nào? Có tốn tiền không?', a:'Cursor (miễn phí tier cơ bản), hoặc Antigravity, hoặc Claude Code. Bài 1 hướng dẫn cài cả 3. Bạn dùng cái nào phù hợp nhất với máy tính bạn đang có.' },
  { q:'Có thể nâng cấp lên Coaching sau không?', a:'Được. 686.868đ bạn đã trả sẽ được trừ thẳng vào học phí Coaching. Nhắn mình qua Telegram @KentHoang để áp dụng ưu đãi.' },
  { q:'Cuối khóa có landing page thật không hay chỉ bài tập?', a:'Landing page thật. Deploy lên Vercel, có tên miền, SePay nhận tiền. Bài 10 hướng dẫn từng bước deploy và kết nối thanh toán luôn.' },
  { q:'Học bao lâu thì xong?', a:'10 buổi, mỗi buổi 30 đến 90 phút. Ai học liên tục 2 tuần là xong. Ai học cuối tuần thì khoảng 1 tháng.' },
  { q:'Khác gì Khóa 1 (24 AI Agent)?', a:'Khóa 1 dạy cả 24 skill cho nhiều mục đích (content, chatbot, email...). Khóa Landing Page tập trung 100% vào 1 mục tiêu: có landing page thật chạy được cuối khóa. Sâu hơn, có duyệt output từng bài.' },
  { q:'Bảo hành thế nào?', a:'14 ngày hoàn 100%. Học thử, không phù hợp thì nhắn mình, hoàn trong 24h không hỏi lý do.' },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#DDD8CB] rounded-2xl overflow-hidden bg-white">
      <button onClick={() => setOpen(o => !o)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 bg-white hover:bg-[#FAF7F2] transition-colors">
        <span className="font-bold text-[#0D2B1A] text-sm leading-snug">{q}</span>
        <span className={`text-[#C0390E] font-bold flex-shrink-0 text-lg transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`grid transition-all duration-200 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed bg-white border-t border-gray-100">
            <p>{a}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionBadge({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'red' | 'olive' }) {
  const cls = {
    green: 'text-[#3D6B4A] bg-[#3D6B4A]/5 border-[#3D6B4A]/15',
    red:   'text-[#C0390E] bg-[#C0390E]/5 border-[#C0390E]/15',
    olive: 'text-[#88860B] bg-[#88860B]/10 border-[#88860B]/25',
  }[tone]
  return (
    <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${cls}`}>
      {children}
    </span>
  )
}

export default function KhoaLandingPage() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSticky,   setShowSticky]   = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { threshold: 0 })
    if (heroRef.current) obs.observe(heroRef.current)
    return () => obs.disconnect()
  }, [])

  const open = () => setShowCheckout(true)

  return (
    <div className="min-h-dvh bg-[#FAF7F0] font-sans antialiased text-[#0D2B1A]">

      {/* [0] ANNOUNCEMENT BAR */}
      <div className="bg-[#0D2B1A] text-[#F6F0E4] text-center py-2.5 px-4 text-xs sm:text-sm font-semibold tracking-wide relative z-20">
        <Gift size={14} className="inline -mt-0.5 mr-1.5 text-[#8BC34A]" />
        Tặng kèm Hệ thống Content Notion (368.686đ) · Bảo hành 14 ngày hoàn tiền 100%
      </div>

      {/* [1] HERO — light, 2 cột trên desktop */}
      <section ref={heroRef} className="relative bg-[#FAF7F0] px-4 pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#DDD8CB] overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3D6B4A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center">

          {/* Cột trái: thông điệp */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-[#DDD8CB] text-[#3D6B4A] text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C0390E] animate-pulse" />
              Khóa thực hành · Vibe Coding · 8 file skill sẵn có
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0D2B1A] leading-[1.1] tracking-tight">
              Tự làm trang bán hàng
              <br />
              <span className="text-[#C0390E]">chốt đơn 24/7</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#3D6B4A] font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Không cần biết một dòng code. AI làm hết phần kỹ thuật,
              bạn chỉ cần ra lệnh bằng tiếng Việt.
            </p>

            <p className="text-sm text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              10 buổi thực hành có SOP và câu lệnh viết sẵn. Mỗi buổi xong 1 file thật.
              Kết khóa, trang của bạn <strong className="text-[#0D2B1A]">chạy trên tên miền riêng</strong>, nhận tiền tự động qua SePay.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <button onClick={open}
                className="h-14 px-8 bg-[#C0390E] hover:bg-[#A83208] active:scale-[0.98] text-white text-base font-bold rounded-2xl transition-all duration-200 shadow-lg shadow-[#C0390E]/20 flex items-center justify-center gap-2 group">
                Cho Tôi Bắt Đầu · {formatVND(product.price)}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#curriculum"
                className="h-14 px-6 bg-white border border-[#DDD8CB] hover:border-[#3D6B4A]/40 text-[#0D2B1A] text-sm font-semibold rounded-2xl flex items-center justify-center transition-all duration-200">
                Xem lộ trình 10 buổi
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-gray-500 font-medium pt-1">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#2D7A4F]" /> Hoàn 100% trong 14 ngày</span>
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-[#2D7A4F]" /> Kích hoạt ngay sau thanh toán</span>
              <span className="flex items-center gap-1.5"><Package size={14} className="text-[#2D7A4F]" /> 8 file skill dùng trọn đời</span>
            </div>
          </div>

          {/* Cột phải: thẻ tóm tắt offer */}
          <div className="hidden lg:block">
            <div className="bg-white border border-[#DDD8CB] rounded-3xl shadow-xl shadow-[#0D2B1A]/5 overflow-hidden">
              <div className="bg-[#0D2B1A] px-6 py-4 flex items-center justify-between">
                <p className="text-[#F6F0E4] font-bold text-sm">Landing Page Siêu Chuyển Đổi</p>
                <span className="text-[10px] font-bold text-[#8BC34A] bg-[#8BC34A]/10 border border-[#8BC34A]/25 px-2 py-0.5 rounded-full">PHỔ BIẾN NHẤT</span>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { icon: GraduationCap, text: '10 buổi thực hành, mỗi buổi ra 1 file thật' },
                  { icon: FileCode2,     text: '8 file skill AI chuyên dụng, tải về dùng mãi' },
                  { icon: Rocket,        text: 'Deploy tên miền riêng + SePay nhận tiền' },
                  { icon: Gift,          text: 'Tặng Hệ thống Content Notion (368.686đ)' },
                ].map((r, i) => {
                  const Icon = r.icon
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#EAF5EF] flex items-center justify-center flex-shrink-0">
                        <Icon size={15} className="text-[#2D7A4F]" />
                      </div>
                      <p className="text-sm text-gray-700 leading-snug pt-1.5">{r.text}</p>
                    </div>
                  )
                })}
                <div className="border-t border-[#DDD8CB] pt-4 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-400 line-through">Giá trị 11.368.686đ</p>
                    <p className="text-3xl font-black text-[#0D2B1A]">{formatVND(product.price)}</p>
                  </div>
                  <button onClick={open}
                    className="h-11 px-5 bg-[#C0390E] hover:bg-[#A83208] text-white text-sm font-bold rounded-xl transition-colors">
                    Đăng ký
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [2] TRUST STRIP */}
      <section className="bg-white border-b border-[#DDD8CB]/80 py-6 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: GraduationCap, n: '10 buổi',   label: 'Thực hành ra file thật' },
            { icon: FileCode2,     n: '8 skill',   label: 'Tải về dùng vĩnh viễn' },
            { icon: Timer,         n: '2 tuần',    label: 'Là có trang chạy thật' },
            { icon: ShieldCheck,   n: '14 ngày',   label: 'Hoàn tiền 100%' },
          ].map((s) => {
            const Icon = s.icon
            return (
              <div key={s.n} className="space-y-1">
                <Icon size={18} className="mx-auto text-[#3D6B4A]" />
                <p className="text-xl sm:text-2xl font-extrabold text-[#0D2B1A] tracking-tight">{s.n}</p>
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* [3] PAIN — mở bằng cảnh đời thường */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <SectionBadge tone="red">Chuyện quen không?</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B1A] leading-tight">
              11 giờ đêm, bạn vẫn đang trả lời inbox<br className="hidden sm:block" /> giải thích cùng một thứ cho khách thứ 20
            </h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto text-left sm:text-center">
              Mình từng y hệt vậy. Sản phẩm có rồi, khách hỏi cũng có, nhưng cứ mỗi khách là một lượt
              gõ lại từ đầu: giá bao nhiêu, có gì bên trong, bảo hành thế nào. Muốn có một trang
              để khách tự đọc, tự hiểu, tự chuyển khoản. Mà nghĩ tới chuyện làm web là thấy 4 bức tường:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: Wallet,
                title: 'Thuê ngoài thì đắt và bị động',
                desc: 'Freelancer tính 2 đến 5 triệu một trang, chờ 2 tuần. Muốn đổi một câu chữ, một mức giá lại phải nhắn, chờ, giục.'
              },
              {
                icon: FileCode2,
                title: 'Tự học code thì quá sức',
                desc: 'HTML, CSS, hosting, domain... mỗi thứ một núi. Còn công cụ kéo thả thì trả phí hằng tháng, dùng vài bữa lại bỏ.'
              },
              {
                icon: MessageSquareText,
                title: 'Nhờ ChatGPT thì ra văn mẫu',
                desc: 'Hỏi AI viết landing page thì ra nội dung sáo rỗng, giọng ai cũng giống ai, đọc là biết máy viết, khách không tin.'
              },
              {
                icon: Clock,
                title: 'Chốt đơn thủ công thì kiệt sức',
                desc: 'Không có trang bán hàng, bạn là trang bán hàng. Trực điện thoại cả ngày, giải thích một nội dung cho 100 người giống hệt nhau.'
              }
            ].map((p, i) => {
              const Icon = p.icon
              return (
                <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-6 hover:border-[#C0390E]/30 transition-all duration-200">
                  <div className="w-9 h-9 rounded-xl bg-[#C0390E]/10 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-[#C0390E]" />
                  </div>
                  <h4 className="font-bold text-[#0D2B1A] text-base mb-1.5">{p.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="bg-white border border-[#DDD8CB] rounded-3xl p-8 space-y-5">
            <p className="font-bold text-[#0D2B1A] text-lg">Và nếu cứ để vậy...</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: 'Đơn rơi vào tay đối thủ', desc: 'Họ có trang tự chốt đơn dù sản phẩm chưa chắc tốt bằng của bạn.' },
                { title: 'Tiền đã chi thì đắp chiếu', desc: 'Trang thuê làm xong không biết tự sửa, không dám đụng, để đó.' },
                { title: 'Mãi kẹt việc sự vụ', desc: 'Ngày nào cũng trực chat, không còn giờ nào cải tiến sản phẩm.' }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ArrowRight size={15} className="text-[#C0390E] flex-shrink-0" />
                    <h5 className="font-bold text-[#0D2B1A] text-sm">{item.title}</h5>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* [4] SOLUTION BRIDGE — Vibe Coding */}
      <section className="bg-white border-y border-[#DDD8CB]/80 px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-3 text-center">
            <SectionBadge tone="olive">Cách làm mới</SectionBadge>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B1A] leading-tight">
              Vibe Coding: tải file skill về, chat với AI, xong
            </h2>
          </div>

          <div className="space-y-6 text-gray-600 text-base leading-relaxed">
            <p>
              Khóa này chuyển giao <strong className="text-[#0D2B1A]">8 file skill chuyên dụng</strong> đã đóng gói sẵn.
              Bạn không viết code. Bạn kéo file skill vào thư mục rồi ra lệnh cho AI trong Cursor, Antigravity hoặc Claude Code:
            </p>

            <div className="bg-[#0D2B1A] rounded-2xl p-5 font-mono text-sm shadow-lg">
              <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 mb-3">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <span className="text-xs text-[#C8D5C9]/50 font-sans ml-2 flex items-center gap-1"><Terminal size={11} /> AI Chat</span>
              </div>
              <p className="text-[#8BC34A] text-xs mb-1.5">Dán câu lệnh này vào AI và nhấn Enter:</p>
              <p className="text-[#F6F0E4] leading-relaxed">
                "Đọc các file trong folder agent-avatar-builder.
                Sau đó áp dụng skill để viết bản mô tả khách hàng cho sản phẩm: [tên sản phẩm của bạn]."
              </p>
            </div>

            <p className="text-[#0D2B1A] font-medium">
              AI tự đọc quy trình, hỏi bạn từng câu để lấy dữ liệu thật, rồi tự viết ra file kết quả.
            </p>
          </div>

          {/* 3 bước */}
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            {[
              { icon: Package,            step: 'Bước 1', title: 'Tải file skill', desc: '8 file đóng gói sẵn, kéo vào thư mục là dùng' },
              { icon: MousePointerClick,  step: 'Bước 2', title: 'Chat với AI',    desc: 'Câu lệnh viết sẵn, dán vào và trả lời câu hỏi' },
              { icon: Rocket,             step: 'Bước 3', title: 'Nhận trang thật', desc: 'File HTML chạy được, deploy lên tên miền riêng' },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="bg-[#FAF7F0] border border-[#DDD8CB] rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#0D2B1A] flex items-center justify-center">
                      <Icon size={16} className="text-[#F6F0E4]" />
                    </div>
                    <span className="text-[10px] font-bold text-[#3D6B4A] uppercase tracking-wider">{s.step}</span>
                  </div>
                  <p className="font-bold text-[#0D2B1A] text-sm">{s.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* [4.5] KHÔNG PHẢI LÀ GÌ — pre-frame */}
      <section className="px-4 py-16 bg-[#FAF7F0]">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <SectionBadge tone="red">Nói rõ trước khi bạn đăng ký</SectionBadge>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A]">Khóa này KHÔNG phải là...</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Không phải khóa lý thuyết AI', desc: 'Không có slide dài dòng về "AI là gì". Buổi nào cũng bắt tay làm, xong buổi là có file.' },
              { title: 'Không phải tool kéo thả trả phí tháng', desc: 'Bạn sở hữu mã nguồn HTML của chính mình. Không thuê bao, không phụ thuộc nền tảng nào.' },
              { title: 'Không phải xem video xong để đó', desc: 'Mỗi bài có checklist duyệt output. Chưa ra file thật thì chưa tính là xong bài.' },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-6 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Ban size={15} className="text-gray-400" />
                </div>
                <p className="font-bold text-[#0D2B1A] text-sm leading-snug">{item.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [5] CURRICULUM */}
      <section id="curriculum" className="px-4 py-20 bg-white border-y border-[#DDD8CB]/80">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <SectionBadge>Lộ trình học</SectionBadge>
            <h2 className="text-3xl font-black text-[#0D2B1A]">10 buổi, buổi nào xong cũng có file thật</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">Mỗi buổi bàn giao 1 file skill + câu lệnh copy dán + checklist tự chấm.</p>
          </div>

          <div className="space-y-3">
            {LESSONS.map((l, i) => (
              <div key={i} className="bg-[#FAF7F0] border border-[#DDD8CB] rounded-2xl p-5 hover:border-[#3D6B4A]/40 transition-all duration-200 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0D2B1A] flex items-center justify-center flex-shrink-0 text-[#F6F0E4] font-black text-sm">
                  {l.n}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className="font-extrabold text-[#0D2B1A] text-sm sm:text-base leading-snug">{l.title}</p>
                    <span className="text-xs text-gray-400 font-semibold bg-white border border-[#DDD8CB] px-2 py-0.5 rounded-md self-start sm:self-center flex-shrink-0">{l.time}</span>
                  </div>
                  <p className="text-xs text-[#3D6B4A] leading-relaxed">
                    Output: <strong className="text-[#0D2B1A]">{l.output}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={open}
            className="w-full h-16 bg-[#C0390E] hover:bg-[#A83208] text-white font-black rounded-2xl transition-all shadow-lg shadow-[#C0390E]/15 active:scale-[0.98] flex items-center justify-center gap-2">
            Tôi Muốn Thực Hành Ngay · {formatVND(product.price)}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* [6] WHAT YOU GET */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <SectionBadge>Tài nguyên khóa học</SectionBadge>
            <h2 className="text-3xl font-black text-[#0D2B1A]">Những gì bạn nhận được khi đăng ký</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: GraduationCap, title:'10 bài học có SOP thực hành', desc:'Hướng dẫn từng bước, file prompt soạn sẵn, checklist tự chấm để không lạc hướng.' },
              { icon: Package,       title:'8 file skill, tải về dùng trọn đời', desc:'avatar-builder, brand-voice, hormozi-system, hero-mechanism, offer-architect, funnel-strategist, landing-page, ui-ux-pro-max.' },
              { icon: FileCode2,     title:'Landing page HTML độc bản', desc:'AI viết mã nguồn từ định vị, giọng văn và offer của riêng bạn. Không trùng với ai.' },
              { icon: Rocket,        title:'Deploy, nhận tiền, đo lường', desc:'Tên miền riêng, SePay báo tiền tự động, Meta Pixel theo dõi conversion. Chạy thật hết.' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="border border-[#DDD8CB] rounded-2xl p-6 flex gap-4 bg-white hover:border-[#3D6B4A]/30 transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF5EF] flex items-center justify-center flex-shrink-0">
                    <Icon size={17} className="text-[#2D7A4F]" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-[#0D2B1A] text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bonus */}
          <div className="bg-[#EAF5EF] border border-[#2D7A4F]/25 rounded-3xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D7A4F] flex items-center justify-center">
                <Gift size={18} className="text-white" />
              </div>
              <div>
                <p className="font-extrabold text-[#0D2B1A] text-base">TẶNG KÈM: Content Không Cần Cảm Hứng</p>
                <p className="text-xs text-[#2D7A4F] font-semibold">Workspace Notion + AI viết bài đúng giọng bạn · Trị giá 368.686đ</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-[#2D7A4F]/15">
              {[
                'Brand DNA & Story Bank: dán một lần, AI nhớ giọng viết mãi',
                'Hook Library với 600+ mẫu tiêu đề',
                'Quy trình sản xuất nội dung đa kênh',
                'AI Commands: gõ "viết bài" là có bản thô để chỉnh',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check size={13} className="text-[#2D7A4F] mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* [7] FUTURE PACING — kịch bản theo phút */}
      <section className="bg-white border-y border-[#DDD8CB]/80 px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <SectionBadge>Thử tua nhanh 2 tuần</SectionBadge>
            <h2 className="text-3xl font-black text-[#0D2B1A]">Một buổi sáng bình thường, sau khi trang chạy thật</h2>
          </div>

          <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-[#DDD8CB]">
            {[
              { time: '8:00',  text: 'Khách nhắn hỏi về sản phẩm. Thay vì gõ lại từ đầu, bạn gửi 1 đường link.' },
              { time: '8:03',  text: 'Khách tự đọc. Trang trả lời hộ bạn mọi câu hỏi: giá, nội dung, bảo hành, cách thanh toán.' },
              { time: '8:07',  text: 'Điện thoại "ting". SePay báo tiền về. Hệ thống tự gửi email kích hoạt cho khách.' },
              { time: '8:12',  text: 'Bạn vẫn đang ăn sáng. Đơn đã chốt xong mà bạn chưa gõ thêm chữ nào.' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-8 top-0.5 w-[22px] h-[22px] rounded-full bg-[#0D2B1A] flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8BC34A]" />
                </span>
                <p className="text-sm leading-relaxed text-gray-600">
                  <strong className="text-[#C0390E] font-black font-mono mr-2">{step.time}</strong>
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF7F0] border border-[#DDD8CB] rounded-2xl p-6 text-center space-y-1">
            <p className="text-[#0D2B1A] font-bold">Muốn đổi giá, sửa chữ, thêm quà tặng?</p>
            <p className="text-sm text-gray-500">Bật Cursor lên, chat với AI 5 phút là xong. Không chờ designer, không chờ dev.</p>
          </div>
        </div>
      </section>

      {/* [8] AUTHORITY — khiêm nhường, thật */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <SectionBadge tone="olive">Ai đang chia sẻ với bạn?</SectionBadge>
            <h2 className="text-3xl font-black text-[#0D2B1A]">Mình không dạy thứ mình không dùng</h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
              Mình là Dũng. Không phải chuyên gia AI, không phải giảng viên. Mình kinh doanh một mình,
              vận hành homestay và build DungHoang.com, nên mọi thứ trong khóa này đều là đồ mình xài hằng ngày.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: Home,       text: 'Chính trang bạn đang đọc được dựng bằng đúng quy trình Vibe Coding này. Mình tự tay cập nhật nó mỗi ngày.' },
              { icon: Package,    text: '8 file skill bàn giao trong khóa là file mình đang dùng thật cho việc kinh doanh, không phải tạo ra để dạy.' },
              { icon: Layers,     text: 'Từ trang homestay, trang khóa học đến trang dịch vụ, mình đều nhân bản nhanh bằng bộ công cụ này.' },
              { icon: Users,      text: 'Học viên đủ ngành nghề: coach, tư vấn, bán hàng vật lý, dịch vụ... đều tự làm được mà không có nền tảng công nghệ.' },
              { icon: RefreshCw,  text: 'Bảo hành 14 ngày hoàn 100%. Học thử thấy không hợp, nhắn Telegram @KentHoang, nhận lại tiền trong 24h.' },
            ].map((a, i) => {
              const Icon = a.icon
              return (
                <div key={i} className="flex items-start gap-4 bg-white border border-[#DDD8CB] rounded-2xl p-5 hover:border-[#3D6B4A]/30 transition-all duration-200">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF5EF] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#2D7A4F]" />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed pt-1.5">{a.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* [9] PRICING — neo giá bằng chi phí thuê người thật */}
      <section className="bg-white border-y border-[#DDD8CB]/80 px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="text-center space-y-3">
            <SectionBadge>Đầu tư một lần, dùng mãi</SectionBadge>
            <h2 className="text-3xl font-black text-[#0D2B1A]">Thị trường đang tính bao nhiêu cho việc này?</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">Mỗi lần cần trang mới để test quảng cáo, bạn đang trả tiền cho 1 trong 3 lựa chọn này.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: UserRound, label:'Thuê freelancer', cost:'2 đến 5 triệu', unit:'mỗi trang', note:'Cần 10 trang một tháng để test ads là mất 20 đến 50 triệu' },
              { icon: Users,     label:'Thuê nhân sự marketing', cost:'10 đến 15 triệu', unit:'mỗi tháng', note:'Vẫn phải chờ, vẫn phải sửa, vẫn không chủ động được' },
              { icon: Building2, label:'Thuê agency', cost:'20 đến 30 triệu', unit:'mỗi lần', note:'Muốn chỉnh 1 dòng chữ phải gửi yêu cầu, chờ 3 đến 5 ngày' },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <div key={i} className="bg-[#FAF7F0] border border-[#DDD8CB] rounded-2xl p-5 space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#DDD8CB] flex items-center justify-center">
                    <Icon size={16} className="text-[#3D6B4A]" />
                  </div>
                  <p className="font-bold text-[#0D2B1A] text-sm">{c.label}</p>
                  <div>
                    <p className="text-xl font-black text-[#C0390E]">{c.cost}</p>
                    <p className="text-xs text-gray-400">{c.unit}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed border-t border-[#DDD8CB] pt-3">{c.note}</p>
                </div>
              )
            })}
          </div>

          {/* Value stack */}
          <div className="bg-white border-2 border-[#0D2B1A] rounded-3xl overflow-hidden shadow-xl">
            <div className="bg-[#0D2B1A] px-6 py-4">
              <p className="text-[#F6F0E4] font-bold text-base">Bạn nhận được trong khóa này</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]/80">
              {[
                { item:'10 buổi thực hành có SOP từng bước', value:'2.000.000đ', note:'Bằng thuê freelancer làm đúng 1 trang' },
                { item:'8 file skill AI chuyên dụng, dùng mãi mãi', value:'4.000.000đ', note:'Bằng 2 buổi thuê chuyên gia AI training' },
                { item:'Mã nguồn landing page HTML của riêng bạn', value:'3.000.000đ', note:'Khoản agency tính khi bàn giao source code' },
                { item:'Deploy Vercel + tên miền + SePay nhận tiền', value:'2.000.000đ', note:'Phần setup kỹ thuật thường phải thuê dev' },
                { item:'Tặng kèm: Content Không Cần Cảm Hứng (Notion)', value:'368.686đ', note:'Bộ prompt AI viết đúng giọng bạn', bonus:true },
              ].map((r, i) => (
                <div key={i} className={`px-6 py-4 ${r.bonus ? 'bg-[#EAF5EF]/70' : ''}`}>
                  <div className="flex justify-between items-start gap-4">
                    <p className={`text-sm font-semibold flex items-start gap-2 ${r.bonus ? 'text-[#2D7A4F]' : 'text-gray-800'}`}>
                      {r.bonus && <Gift size={14} className="mt-0.5 flex-shrink-0" />}
                      {r.item}
                    </p>
                    <p className={`text-sm font-black flex-shrink-0 ${r.bonus ? 'text-[#2D7A4F]' : 'text-gray-400 line-through'}`}>{r.value}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{r.note}</p>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 bg-[#FAF7F2] flex justify-between items-center border-t border-[#DDD8CB]">
              <div>
                <p className="font-bold text-[#0D2B1A] text-sm">Tổng chi phí nếu thuê ngoài từng phần</p>
                <p className="text-xs text-gray-400">Theo giá thị trường đang tính</p>
              </div>
              <p className="text-lg font-black text-gray-400 line-through">11.368.686đ</p>
            </div>

            <div className="px-6 py-6 bg-[#EAF5EF] border-t-2 border-[#0D2B1A]">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <p className="font-black text-[#0D2B1A] text-lg">Học phí trọn khóa</p>
                  <p className="text-xs text-[#3D6B4A] mt-1">Rẻ hơn thuê freelancer làm 1 trang · Bảo hành 14 ngày hoàn 100%</p>
                </div>
                <p className="text-4xl font-black text-[#0D2B1A] flex-shrink-0">{formatVND(product.price)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#A83208] text-white text-lg font-black rounded-2xl transition-all shadow-xl shadow-[#C0390E]/20 active:scale-[0.98] flex items-center justify-center gap-2">
              Cho Tôi Đăng Ký · {formatVND(product.price)}
              <ArrowRight size={20} />
            </button>
            <p className="text-center text-xs text-gray-400">Chuyển khoản QR · Kích hoạt ngay lập tức · Hoàn tiền trong 14 ngày</p>
          </div>
        </div>
      </section>

      {/* [9.5] LỘ TRÌNH 3 NGÀY ĐẦU */}
      <section className="px-4 py-16 bg-[#FAF7F0]">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <SectionBadge>Sau khi thanh toán</SectionBadge>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A]">3 ngày đầu tiên của bạn sẽ thế này</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { day: 'Hôm nay', title: 'Vào học ngay', desc: 'Thanh toán xong nhận email kích hoạt liền. Bài 1 cài tool mất 30 phút, tối nay là chạy được câu lệnh đầu tiên.' },
              { day: 'Ngày 2',  title: 'Có 2 file nền tảng', desc: 'Chân dung khách hàng + giọng văn thương hiệu. Từ giờ AI viết gì cũng đúng giọng bạn.' },
              { day: 'Ngày 3',  title: 'Offer thành hình', desc: 'Offer theo phương trình Hormozi. Bạn bắt đầu thấy trang của mình sẽ bán cái gì, cho ai, vì sao họ mua.' },
            ].map((d, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-6 space-y-2">
                <span className="inline-block text-[10px] font-bold text-[#C0390E] uppercase tracking-wider bg-[#C0390E]/5 border border-[#C0390E]/15 px-2.5 py-1 rounded-full">{d.day}</span>
                <p className="font-bold text-[#0D2B1A] text-sm">{d.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [10] GUARANTEE */}
      <section className="bg-[#EAF5EF] border-y border-[#2D7A4F]/20 px-4 py-16">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#2D7A4F] flex items-center justify-center flex-shrink-0 shadow-sm">
            <ShieldCheck size={30} className="text-white" />
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <h3 className="text-2xl font-black text-[#0D2B1A]">Cam kết hoàn tiền 100% trong 14 ngày</h3>
            <p className="text-[#2D7A4F] text-sm font-bold bg-white border border-[#2D7A4F]/15 px-3 py-1 rounded-full inline-block">Học thử thoải mái · Không rủi ro</p>
            <p className="text-sm text-gray-600 leading-relaxed pt-1">
              Mình tin quy trình này đủ để cam kết: trong 14 ngày kể từ khi đăng ký, nếu bạn học thử
              mà thấy không phù hợp, chỉ cần nhắn Zalo hoặc Telegram cho mình. Hoàn 100% học phí
              trong 24 giờ, không hỏi lý do, không làm khó.
            </p>
          </div>
        </div>
      </section>

      {/* [11] FOR WHO */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black text-[#0D2B1A] text-center">Khóa này dành cho ai?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-3xl p-6 sm:p-8 space-y-4">
              <p className="font-extrabold text-[#2D7A4F] text-sm flex items-center gap-2">
                <BadgeCheck size={17} /> RẤT HỢP NẾU BẠN:
              </p>
              <div className="space-y-3">
                {[
                  'Là solopreneur, chủ shop, coach, freelancer muốn tự chủ trang bán hàng của mình.',
                  'Muốn có kỹ năng tự dựng, tự sửa, tự nhân bản trang mà không chờ ai.',
                  'Đã thử nhờ AI viết nhưng chưa ưng vì giọng văn hời hợt, chung chung.',
                  'Muốn thoát cảnh chốt đơn thủ công, chuyển sang bán tự động 24/7.'
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-[#2D7A4F] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#DDD8CB] rounded-3xl p-6 sm:p-8 space-y-4">
              <p className="font-extrabold text-gray-400 text-sm flex items-center gap-2">
                <X size={17} /> CHƯA HỢP NẾU BẠN:
              </p>
              <div className="space-y-3">
                {[
                  'Chỉ muốn phó mặc 100% cho người khác làm hộ, không muốn tự tay học.',
                  'Chưa có sản phẩm hay dịch vụ cụ thể nào để dựng trang bán.',
                  'Kỳ vọng một phần mềm bấm nút là xong, không cần chuẩn bị nội dung gì.'
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <X size={14} className="text-gray-300 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-500 leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [12] FAQ */}
      <section className="bg-white border-y border-[#DDD8CB]/80 px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <SectionBadge>Giải đáp thắc mắc</SectionBadge>
            <h2 className="text-3xl font-black text-[#0D2B1A]">Câu hỏi thường gặp</h2>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            {FAQS.map((f, i) => <AccordionItem key={i} q={f.q} a={f.a} />)}
          </div>

          <p className="text-center text-sm text-gray-500 pt-4">
            Còn thắc mắc khác? Chat trực tiếp với mình qua Telegram{' '}
            <a href="https://t.me/KentHoang" className="text-[#3D6B4A] underline font-bold hover:text-[#0D2B1A] transition-colors">@KentHoang</a>
          </p>
        </div>
      </section>

      {/* [13] SOCIAL PROOF + CTA sát testimonial */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black text-[#0D2B1A] text-center">Học viên nói gì sau khóa học</h2>

          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              {
                quote: 'Trước đây tôi rất sợ mấy thuật ngữ kỹ thuật như code, hosting, domain. Không ngờ với Vibe Coding, Cursor đọc file skill và tự viết HTML hết. Tôi chỉ cần trả lời câu hỏi và duyệt kết quả.',
                name:  'Lan Phương',
                role:  'Coach & bán khóa học online',
                result:'Có trang bán hàng sau 6 ngày',
              },
              {
                quote: 'Phần tư duy Offer Hormozi thực sự thay đổi góc nhìn của tôi. Viết headline tập trung giải quyết nỗi đau và cam kết rõ ràng giúp tỷ lệ khách đọc đến cuối trang tăng hẳn.',
                name:  'Minh Tuấn',
                role:  'Huấn luyện viên sức khỏe',
                result:'Tỷ lệ chuyển đổi tăng rõ rệt',
              },
              {
                quote: 'Bài 10 deploy hướng dẫn chi tiết từng bước. Tôi không biết gì về lập trình vẫn đưa trang lên tên miền riêng thành công, kết nối SePay tự động báo đơn.',
                name:  'Thu Hà',
                role:  'Chủ shop mỹ phẩm thiên nhiên',
                result:'Web chạy thật, tên miền riêng',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-6 space-y-4 hover:border-[#3D6B4A]/30 transition-all duration-200">
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, j) => (
                    <Sparkles key={j} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-sm font-bold text-[#0D2B1A]">{t.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
                  </div>
                  <span className="text-xs bg-[#EAF5EF] text-[#2D7A4F] px-3 py-1 rounded-full font-bold">{t.result}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 italic">Kết quả có thể khác nhau tùy sản phẩm và mức độ áp dụng của từng người.</p>

          {/* [14] FINAL CTA ngay sau testimonial */}
          <div className="max-w-2xl mx-auto space-y-6 text-center pt-8">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B1A] leading-tight">
              2 tuần nữa, trang của bạn tự chốt đơn 24/7
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Hoặc mọi thứ vẫn như cũ: mỗi tối vẫn ngồi gõ lại cùng một đoạn tư vấn cho từng khách một.
            </p>

            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#A83208] text-white text-lg font-black rounded-2xl transition-all shadow-xl shadow-[#C0390E]/25 active:scale-[0.98] flex items-center justify-center gap-2">
              Cho Tôi Bắt Đầu · {formatVND(product.price)}
              <ArrowRight size={20} />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-400 font-semibold">
              <span className="flex items-center gap-1"><Check size={12} className="text-[#2D7A4F]" /> Kích hoạt ngay</span>
              <span className="flex items-center gap-1"><Check size={12} className="text-[#2D7A4F]" /> Hoàn tiền 14 ngày</span>
              <span className="flex items-center gap-1"><Check size={12} className="text-[#2D7A4F]" /> Tặng Content System Notion</span>
            </div>
          </div>
        </div>
      </section>

      {/* [15] FOOTER */}
      <footer className="bg-[#0D2B1A] px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-[#F6F0E4] font-black font-mono">DungHoang.com</p>
          <p className="text-[#F6F0E4]/40 text-xs">
            © 2026 Dũng Hoàng · Telegram{' '}
            <a href="https://t.me/KentHoang" className="underline">@KentHoang</a>
            {' '}· Zalo 0938725413
          </p>
          <div className="flex justify-center gap-4 text-xs text-[#F6F0E4]/30">
            <a href="/portal" className="hover:text-[#F6F0E4]/60">Khu học</a>
            <a href="/24-ai-agent" className="hover:text-[#F6F0E4]/60">Khóa 1</a>
            <a href="/coaching" className="hover:text-[#F6F0E4]/60">Coaching</a>
          </div>
        </div>
      </footer>

      {/* STICKY BAR */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D2B1A]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-slide-up">
          <div className="min-w-0">
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Landing Page Siêu Chuyển Đổi</p>
            <p className="text-[#C8D5C9]/60 text-xs truncate">10 buổi · 8 skill · Hoàn tiền 14 ngày</p>
          </div>
          <button onClick={open}
            className="flex-shrink-0 bg-[#C0390E] hover:bg-[#A83208] text-white font-bold px-5 h-11 rounded-xl text-sm transition-all shadow-md">
            Đăng ký · {formatVND(product.price)}
          </button>
        </div>
      )}

      <CheckoutModal productId={product.id} open={showCheckout} onClose={() => setShowCheckout(false)} />
    </div>
  )
}
