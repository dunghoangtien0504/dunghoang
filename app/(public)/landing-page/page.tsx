'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS, formatVND } from '@/lib/products'

const product = PRODUCTS['landing-page']

const LESSONS = [
  { n:'01', title:'Bài 1: Setup công cụ Vibe Coding (Cursor, Antigravity, Claude Code)', time:'30 phút', output:'Cursor, Antigravity, Claude Code đã cài, thư mục làm việc sẵn sàng' },
  { n:'02', title:'Bài 2 (Skill 01): Xây dựng Chân dung khách hàng (avatar-khach-hang.md)', time:'30 phút', output:'avatar-khach-hang.md — biết viết cho ai' },
  { n:'03', title:'Bài 3 (Skill 02): Định hình Giọng văn thương hiệu (brand-dna.md) để AI viết không bị generic', time:'45 phút', output:'brand-dna.md — AI viết đúng giọng bạn' },
  { n:'04', title:'Bài 4 (Skill 03): Thiết kế Offer theo phương trình giá trị của Alex Hormozi', time:'45 phút', output:'offer-scorecard.md — offer nghe xứng đáng với giá' },
  { n:'05', title:'Bài 5 (Skill 05): Định danh Cơ chế khác biệt (Hero Mechanism) để giải thích cách làm riêng', time:'45 phút', output:'hero-mechanism.md + 3 bản headline' },
  { n:'06', title:'Bài 6 (Skill 07): Đóng gói Offer hoàn chỉnh 5 lớp (Core, Bonus, Guarantee, Urgency, CTA)', time:'60 phút', output:'offer-final.md — offer đủ 5 tầng' },
  { n:'07', title:'Bài 7 (Skill 09): Xác định Phễu bán hàng (Funnel Strategist) và chọn 1 mục tiêu duy nhất cho landing page', time:'45 phút', output:'funnel-plan.md — 1 mục tiêu rõ cho landing page' },
  { n:'08', title:'Bài 8 (Skill 10): Tự build Landing Page HTML thật từ các file dữ liệu trên', time:'90 phút', output:'landing-page.html — chạy được, không phải demo' },
  { n:'09', title:'Bài 9 (Skill 11): Nâng cấp UI/UX chuẩn Pro Max (hệ màu, typography, spacing, độ nổi bật của CTA)', time:'60 phút', output:'landing-page-v2.html — đẹp hơn, chuyển đổi cao hơn' },
  { n:'10', title:'Bài 10: Deploy lên Vercel, cài SePay nhận tiền tự động và gắn Meta Pixel tracking', time:'60 phút', output:'Landing page đang chạy thật trên tên miền của bạn' },
]

const FAQS = [
  { q:'Không biết code có làm được không?', a:'Được. Không cần code một chữ. Vibe Coding nghĩa là bạn tải file skill về, bỏ vào thư mục, chat AI "đọc file này và làm hộ tôi". AI viết code, bạn nói muốn gì.' },
  { q:'Cần dùng tool AI nào? Có tốn tiền không?', a:'Cursor (miễn phí tier cơ bản), hoặc Antigravity, hoặc Claude Code. Bài 1 hướng dẫn cài cả 3. Bạn dùng cái nào phù hợp nhất với máy tính bạn đang có.' },
  { q:'Có thể nâng cấp lên Coaching sau không?', a:'Được. 686.868đ bạn đã trả sẽ được trừ thẳng vào học phí Coaching. Nhắn mình qua Telegram @KentHoang để áp dụng ưu đãi.' },
  { q:'Cuối khóa có landing page thật không hay chỉ bài tập?', a:'Landing page thật. Deploy lên Vercel, có tên miền, SePay nhận tiền. Bài 10 hướng dẫn từng bước deploy và kết nối thanh toán luôn.' },
  { q:'Học bao lâu thì xong?', a:'10 buổi, mỗi buổi 30-90 phút. Ai học liên tục 2 tuần là xong. Ai học cuối tuần thì khoảng 1 tháng.' },
  { q:'Khác gì Khóa 1 — 24 AI Agent?', a:'Khóa 1 dạy cả 24 skill cho nhiều mục đích (content, chatbot, email...). Khóa Landing Page tập trung 100% vào 1 mục tiêu: có landing page thật chạy được cuối khóa. Sâu hơn, có coaching output từng bài.' },
  { q:'Bảo hành thế nào?', a:'14 ngày hoàn 100%. Học thử, không phù hợp thì nhắn mình, hoàn trong 24h không hỏi lý do.' },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#DDD8CB] rounded-xl overflow-hidden bg-white">
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
    <div className="min-h-screen bg-[#F6F0E4] font-sans antialiased text-[#0D2B1A]">

      {/* [0] ANNOUNCEMENT BAR */}
      <div className="bg-[#88860B] text-[#F6F0E4] text-center py-2.5 px-4 text-xs sm:text-sm font-semibold tracking-wide shadow-sm relative z-20">
        Tặng kèm Hệ thống Content Notion (368.686đ) + 8 file skill · Bảo hành 14 ngày hoàn tiền 100%
      </div>

      {/* [1] HERO */}
      <section ref={heroRef} className="relative overflow-hidden bg-[#0D2B1A] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#173F28] via-[#0D2B1A] to-[#05150C] px-4 pt-20 pb-24 border-b border-[#3D6B4A]/20">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#3D6B4A]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#C0390E]/10 border border-[#C0390E]/30 text-[#FF9E80] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C0390E] animate-pulse" />
            Khóa Thực Hành · Vibe Coding · 8 Skill Files Sẵn Có
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-[#F6F0E4] leading-[1.15] tracking-tight">
            Tự Dựng Landing Page Thật
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B4A] to-[#C0390E]">
              Không Cần Biết Code
            </span>
          </h1>

          <p className="text-xl sm:text-2xl font-bold text-[#F6F0E4]/85 max-w-2xl mx-auto">
            AI làm hết phần kỹ thuật. Bạn chỉ cần ra lệnh bằng tiếng Việt.
          </p>

          <p className="text-[#C8D5C9] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            10 buổi thực hành có SOP và câu lệnh viết sẵn. Mỗi buổi hoàn thành 1 tệp output thật. 
            Kết khóa, bạn sở hữu một <strong className="text-[#F6F0E4]">trang bán hàng tự động 24/7</strong> chạy trên tên miền của riêng mình — không phải template rập khuôn.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-md mx-auto">
            <button onClick={open}
              className="group relative h-14 px-8 bg-gradient-to-r from-[#D94F2B] to-[#C0390E] hover:from-[#E85E39] hover:to-[#D94F2B] active:scale-[0.98] text-white text-base font-bold rounded-2xl transition-all duration-200 shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2">
              Bắt Đầu Ngay — {formatVND(product.price)}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <a href="#curriculum"
              className="h-14 px-8 bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 hover:bg-[#F6F0E4]/10 hover:border-[#F6F0E4]/25 text-[#F6F0E4]/80 hover:text-[#F6F0E4] text-sm font-semibold rounded-2xl flex items-center justify-center transition-all duration-200">
              Xem Lộ Trình Chi Tiết
            </a>
          </div>

          <p className="text-[#F6F0E4]/55 text-xs pt-1">
            Muốn nâng cấp lên Coaching sau? 686.868đ bạn trả hôm nay sẽ được trừ thẳng vào học phí. Nhắn Telegram <a href="https://t.me/KentHoang" className="underline hover:text-[#F6F0E4]/85 font-medium">@KentHoang</a>.
          </p>
        </div>
      </section>

      {/* [2] TRUST BAR */}
      <section className="bg-white border-y border-[#DDD8CB]/80 py-6 px-4 shadow-sm relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center divide-x divide-[#DDD8CB]">
            {[
              { n: '10 Bài Học', label: 'Thực hành ra file thật' },
              { n: '8 Skill Files', label: 'Tải về máy dùng vĩnh viễn' },
              { n: '14 Ngày', label: 'Bảo hành hoàn tiền 100%' },
            ].map((s, idx) => (
              <div key={s.n} className={idx === 0 ? '' : 'pl-4'}>
                <p className="text-2xl sm:text-4xl font-extrabold text-[#0D2B1A] tracking-tight">{s.n}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [3] PAIN */}
      <section className="px-4 py-20 bg-[#F6F0E4]">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-[#C0390E] uppercase tracking-widest bg-[#C0390E]/5 px-3 py-1 rounded-full border border-[#C0390E]/15">Thực tế phũ phàng</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B1A] leading-tight">
              Muốn có trang bán hàng tự động,<br/>nhưng tự làm thì kẹt, thuê ngoài thì sợ
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Nỗi lo chi phí & kiểm soát',
                desc: 'Thuê freelancer tốn 2-5 triệu/trang, chờ đợi 2 tuần. Muốn đổi một câu chữ, chỉnh một mức giá lại phải gửi yêu cầu chờ sửa, tốn thời gian và cực kỳ bất tiện.'
              },
              {
                title: 'Nỗi sợ kỹ thuật & code',
                desc: 'Tự học lập trình, HTML/CSS thì quá sức. Mua các công cụ kéo thả thì trả phí hằng tháng đắt đỏ, dùng vài bữa không hiệu quả lại bỏ phí.'
              },
              {
                title: 'Nỗi thất vọng từ AI chung chung',
                desc: 'Hỏi ChatGPT viết landing page thì ra nội dung sáo rỗng, nghe toàn văn mẫu marketing giả tạo, không đúng giọng văn chân thực của bạn.'
              },
              {
                title: 'Mệt mỏi vì chốt đơn thủ công',
                desc: 'Không có trang bán hàng, bạn phải túc trực điện thoại 24/7 để tư vấn qua inbox Zalo/Facebook. Giải thích một nội dung cho 100 khách giống hệt nhau.'
              }
            ].map((p, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-6 shadow-card hover:border-[#3D6B4A]/30 transition-all duration-200">
                <div className="w-8 h-8 rounded-lg bg-[#C0390E]/10 flex items-center justify-center mb-3">
                  <span className="text-[#C0390E] font-bold text-sm">!</span>
                </div>
                <h4 className="font-bold text-[#0D2B1A] text-base mb-1">{p.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-3xl p-8 space-y-6">
            <p className="font-bold text-[#0D2B1A] text-lg text-center sm:text-left">Hậu quả là...</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: 'Tụt hậu doanh số', desc: 'Đối thủ có trang bán hàng đẹp, tự động chốt đơn dù sản phẩm chưa chắc tốt bằng bạn.' },
                { title: 'Lãng phí tài nguyên', desc: 'Trang bán hàng thuê làm xong rồi đắp chiếu vì không biết cách tự chỉnh sửa, tối ưu.' },
                { title: 'Kẹt trong việc sự vụ', desc: 'Suốt ngày chat tư vấn thủ công, không có thời gian tập trung cải tiến sản phẩm.' }
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C0390E]">
                    <span className="font-bold text-lg">→</span>
                    <h5 className="font-bold text-[#0D2B1A] text-sm">{item.title}</h5>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <button onClick={open}
            className="w-full h-14 bg-gradient-to-r from-[#0D2B1A] to-[#153f27] hover:from-[#153f27] hover:to-[#0D2B1A] text-[#F6F0E4] font-bold rounded-2xl transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2">
            Giải Quyết Ngay Với Vibe Coding →
          </button>
        </div>
      </section>

      {/* [4] BRIDGE — WHAT IS VIBE CODING */}
      <section className="bg-[#0D2B1A] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#05150C] via-[#0D2B1A] to-[#173F28] px-4 py-20 relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#88860B] uppercase tracking-widest bg-[#88860B]/10 px-3 py-1 rounded-full border border-[#88860B]/20">Mô hình vận hành mới</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#F6F0E4] leading-tight">
              Vibe Coding: Tải file skill về. Chat AI. Xong.
            </h2>
          </div>
          
          <div className="space-y-6 text-[#C8D5C9] text-base leading-relaxed">
            <p>
              Khóa học này chuyển giao <strong className="text-[#F6F0E4]">8 file skill chuyên dụng</strong> đã được đóng gói sẵn. Bạn không cần tự viết code,
              chỉ cần kéo file skill vào thư mục và ra lệnh cho AI trong Cursor/Antigravity/Claude Code:
            </p>
            
            <div className="bg-[#12121E] border border-white/5 rounded-2xl p-5 shadow-inner relative overflow-hidden font-mono text-sm">
              <div className="flex items-center gap-1.5 pb-3 border-b border-white/5 mb-3">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                <span className="text-xs text-gray-500 font-sans ml-2">Terminal AI Chat</span>
              </div>
              <p className="text-[#88c0a0] text-xs mb-1">// Dán câu lệnh này vào AI và nhấn Enter:</p>
              <p className="text-[#e8f0ec] leading-relaxed">
                "Đọc các file trong folder agent-avatar-builder. 
                Sau đó áp dụng skill để viết bản mô tả khách hàng cho sản phẩm: [Tên sản phẩm của bạn]."
              </p>
            </div>

            <p className="text-[#F6F0E4] font-medium">
              AI sẽ tự động đọc quy trình SOP, hỏi bạn từng câu hỏi một để lấy dữ liệu thực tế, rồi tự viết ra file kết quả.
            </p>
            <p>
              Mỗi bài học tương ứng với 1 file output (chân dung khách, giọng văn, offer, phễu...). Cuối cùng, 
              AI sẽ kết nối toàn bộ dữ liệu này để tự viết tệp HTML chạy thật cho landing page của bạn.
            </p>
          </div>
        </div>
      </section>

      {/* [5] CURRICULUM */}
      <section id="curriculum" className="px-4 py-20 bg-[#F6F0E4]">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest bg-[#3D6B4A]/5 px-3 py-1 rounded-full border border-[#3D6B4A]/15">Lộ trình học</span>
            <h2 className="text-3xl font-black text-[#0D2B1A]">10 bài thực hành thực tế</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">Mỗi buổi học bàn giao 1 file skill + prompt copy-paste + checklist phê duyệt bài tập rõ ràng.</p>
          </div>

          <div className="space-y-4">
            {LESSONS.map((l, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 shadow-card hover:border-[#3D6B4A]/40 hover:shadow-card-md transition-all duration-200 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0D2B1A] flex items-center justify-center flex-shrink-0 text-[#F6F0E4] font-black text-sm shadow-sm">
                  {l.n}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className="font-extrabold text-[#0D2B1A] text-base leading-snug">{l.title}</p>
                    <span className="text-xs text-gray-400 font-semibold bg-gray-100 px-2 py-0.5 rounded-md self-start sm:self-center">{l.time}</span>
                  </div>
                  <p className="text-xs text-[#3D6B4A] leading-relaxed">
                    Output: <strong className="text-[#0D2B1A]">{l.output}</strong>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={open}
            className="w-full h-16 bg-gradient-to-r from-[#D94F2B] to-[#C0390E] hover:from-[#E85E39] hover:to-[#D94F2B] text-white font-black rounded-2xl transition-all shadow-lg shadow-brand-accent/15 active:scale-[0.98] flex items-center justify-center gap-2">
            Đăng Ký Thực Hành Ngay — {formatVND(product.price)} →
          </button>
        </div>
      </section>

      {/* [6] WHAT YOU GET */}
      <section className="bg-white border-y border-[#DDD8CB]/80 px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest bg-[#3D6B4A]/5 px-3 py-1 rounded-full border border-[#3D6B4A]/15">Tài nguyên khóa học</span>
            <h2 className="text-3xl font-black text-[#0D2B1A]">Những gì bạn nhận được khi đăng ký</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon:'🎯', title:'10 bài học có SOP thực hành', desc:'Hướng dẫn rõ ràng từng bước, file prompt soạn sẵn, checklist xong bài tự chấm điểm để bạn không lo bị lạc hướng.' },
              { icon:'📦', title:'8 file skill — Tải về dùng trọn đời', desc:'avatar-builder, brand-voice, hormozi-system, hero-mechanism, offer-architect, funnel-strategist, landing-page, ui-ux-pro-max. Tài sản dùng mãi mãi.' },
              { icon:'🏗️', title:'Landing page HTML độc bản', desc:'AI sinh mã nguồn HTML trực tiếp dựa trên định vị, giọng văn và offer riêng của bạn, không sao chép hay trùng lặp với bất cứ ai.' },
              { icon:'🚀', title:'Deploy, Nhận Tiền & Đo lường', desc:'Cài đặt tên miền riêng, nhận tiền chuyển khoản tự động qua SePay, tích hợp Meta Pixel theo dõi conversion. Tất cả chạy thật.' },
            ].map((item, i) => (
              <div key={i} className="border border-[#DDD8CB] rounded-2xl p-6 flex gap-4 bg-[#FAF8F5] hover:bg-white hover:border-[#3D6B4A]/30 hover:shadow-card transition-all duration-200">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div className="space-y-1">
                  <p className="font-bold text-[#0D2B1A] text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bonus block */}
          <div className="bg-[#EAF5EF] border border-[#2D7A4F]/30 rounded-3xl p-8 space-y-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#2D7A4F]/5 rounded-full translate-x-8 -translate-y-8 pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2D7A4F]/10 flex items-center justify-center text-xl">🎁</div>
              <div>
                <p className="font-extrabold text-[#0D2B1A] text-base">TẶNG KÈM: Content Không Cần Cảm Hứng</p>
                <p className="text-xs text-[#2D7A4F] font-semibold">Workspace Notion + AI viết bài đúng giọng bạn · Trị giá 368.686đ</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700 pt-2 border-t border-[#2D7A4F]/10">
              {[
                'Brand DNA & Story Bank: Dán một lần, AI nhớ giọng viết mãi mãi',
                'Hook Library + 600+ mẫu tiêu đề giật tít thu hút',
                'Quy trình sản xuất đa kênh tự động hóa',
                'AI Commands: Gõ "viết bài" là có bài viết thô sẵn để chỉnh',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#2D7A4F] text-xs mt-1 font-bold">✓</span>
                  <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <button onClick={open}
            className="w-full h-16 bg-gradient-to-r from-[#D94F2B] to-[#C0390E] hover:from-[#E85E39] hover:to-[#D94F2B] text-white font-black rounded-2xl transition-all shadow-lg shadow-brand-accent/15 active:scale-[0.98] flex items-center justify-center gap-2">
            Đăng Ký & Nhận Quà Tặng Ngay →
          </button>
        </div>
      </section>

      {/* [7] EMOTION */}
      <section className="px-4 py-20 bg-[#F6F0E4]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0D2B1A] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#173F28] to-[#0D2B1A] border border-[#3D6B4A]/20 rounded-3xl p-8 sm:p-10 space-y-6 text-[#C8D5C9] text-base leading-relaxed shadow-lg relative overflow-hidden">
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#3D6B4A]/10 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-2xl font-black text-[#F6F0E4] text-center">Bức tranh sau 2 tuần thực hành...</h3>
            <p>Khách hàng tiềm năng hỏi thăm sản phẩm. Thay vì ngồi giải thích dài dòng qua chat, bạn chỉ cần gửi link trang bán hàng tự động của mình.</p>
            <p className="text-[#F6F0E4] font-semibold">
              Khách tự đọc, tự thấy thuyết phục, tự quét QR chuyển khoản. Landing page hoạt động thay bạn 24/7, mang đơn về ngay cả khi bạn đang ngủ.
            </p>
            <p>
              Quan trọng nhất, bạn làm chủ công nghệ. Muốn đổi giá, sửa chữ, thêm quà tặng — bạn chỉ cần bật Cursor lên, chat với AI 5 phút là cập nhật xong, 
              không cần phụ thuộc vào designer hay dev ngoài.
            </p>
            <p className="text-[#88860B] font-bold text-center pt-2">Một lần học kỹ năng, sở hữu hệ thống trọn đời.</p>
          </div>
        </div>
      </section>

      {/* [8] AUTHORITY */}
      <section className="bg-[#0D2B1A] relative overflow-hidden px-4 py-20 border-y border-[#3D6B4A]/25">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.01)_1px,_transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#88860B] uppercase tracking-widest bg-[#88860B]/10 px-3 py-1 rounded-full border border-[#88860B]/20">Chứng thực thực tế</span>
            <h2 className="text-3xl font-black text-[#F6F0E4]">Tại sao bạn nên tin quy trình này?</h2>
          </div>

          <div className="space-y-4">
            {[
              { icon: '🛠️', text: 'Tôi dùng chính quy trình Vibe Coding này để tự tay xây dựng, phát triển và cập nhật dunghoang.com mỗi ngày.' },
              { icon: '📦', text: '8 file skill bàn giao trong khóa học chính là những tệp tin tôi đang sử dụng thật cho việc kinh doanh cá nhân — không phải tạo ra để dạy lý thuyết.' },
              { icon: '🏠', text: 'Từ landing page cho homestay, khóa học, đến dịch vụ tư vấn của tôi... đều được nhân bản nhanh chóng bằng bộ công cụ này.' },
              { icon: '👥', text: 'Học viên thuộc mọi ngành nghề (coach, tư vấn, bán sản phẩm vật lý, dịch vụ...) đều tự làm được mà không cần nền tảng công nghệ từ trước.' },
              { icon: '🔄', text: 'Bảo hành 100% trong 14 ngày. Nếu bạn học thử thấy quy trình không phù hợp, nhắn Telegram @KentHoang nhận lại tiền trong 24h.' },
            ].map(a => (
              <div key={a.icon} className="flex items-start gap-4 bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 hover:border-white/10 transition-all duration-200">
                <span className="text-2xl flex-shrink-0 mt-0.5">{a.icon}</span>
                <p className="text-[#C8D5C9] text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [9] PRICING */}
      <section className="px-4 py-20 bg-[#F6F0E4]">
        <div className="max-w-3xl mx-auto space-y-10">

          {/* Value anchor — so sánh chi phí thực tế */}
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest bg-[#3D6B4A]/5 px-3 py-1 rounded-full border border-[#3D6B4A]/15">Đầu tư một lần — dùng mãi mãi</span>
            <h2 className="text-3xl font-black text-[#0D2B1A]">Những gì thị trường đang tính — và bạn sẽ không phải trả nữa</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">Mỗi lần cần landing page mới để test ads, bạn đang mất tiền cho 1 trong 3 lựa chọn này.</p>
          </div>

          {/* 3 lựa chọn thị trường */}
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label:'Thuê freelancer', cost:'2.000.000 – 5.000.000đ', unit:'/ 1 trang', note:'Cần 10–15 trang/tháng để test ads → mất 20–75 triệu', icon:'👨‍💻' },
              { label:'Thuê nhân sự marketing', cost:'10.000.000 – 15.000.000đ', unit:'/ tháng', note:'Vẫn phải chờ, vẫn phải sửa, vẫn không chủ động được', icon:'👥' },
              { label:'Thuê agency làm website', cost:'20.000.000 – 30.000.000đ', unit:'/ lần', note:'Muốn chỉnh 1 dòng chữ lại phải gửi yêu cầu, chờ 3–5 ngày', icon:'🏢' },
            ].map((c, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3">
                <span className="text-2xl">{c.icon}</span>
                <p className="font-bold text-[#0D2B1A] text-sm">{c.label}</p>
                <div>
                  <p className="text-xl font-black text-[#C0390E]">{c.cost}</p>
                  <p className="text-xs text-gray-400">{c.unit}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed border-t border-[#DDD8CB] pt-3">{c.note}</p>
              </div>
            ))}
          </div>

          {/* Pricing box */}
          <div className="bg-white border-2 border-[#0D2B1A] rounded-3xl overflow-hidden shadow-xl">
            <div className="bg-[#0D2B1A] px-6 py-4">
              <p className="text-[#F6F0E4] font-bold text-base">Bạn nhận được trong khóa này</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]/80">
              {[
                { item:'10 buổi thực hành có SOP hướng dẫn từng bước', value:'2.000.000đ', note:'= 1 trang thuê freelancer rẻ nhất thị trường' },
                { item:'8 file skill AI chuyên dụng — dùng mãi mãi', value:'4.000.000đ', note:'= 2 buổi thuê chuyên gia AI training' },
                { item:'Mã nguồn Landing Page HTML riêng của bạn', value:'3.000.000đ', note:'= agency tính để bàn giao source code' },
                { item:'Deploy Vercel + tên miền + SePay nhận tiền thật', value:'2.000.000đ', note:'= setup kỹ thuật mà không cần thuê dev' },
                { item:'🎁 Tặng kèm: Content Không Cần Cảm Hứng (Notion)', value:'368.686đ', note:'Bộ prompt AI viết đúng giọng bạn', bonus:true },
              ].map((r, i) => (
                <div key={i} className={`px-6 py-4 ${r.bonus ? 'bg-[#EAF5EF]/70' : ''}`}>
                  <div className="flex justify-between items-start gap-4">
                    <p className={`text-sm font-semibold ${r.bonus ? 'text-[#2D7A4F]' : 'text-gray-800'}`}>{r.item}</p>
                    <p className={`text-sm font-black flex-shrink-0 ${r.bonus ? 'text-[#2D7A4F]' : 'text-gray-400 line-through'}`}>{r.value}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{r.note}</p>
                </div>
              ))}
            </div>

            <div className="px-6 py-4 bg-[#FAF7F2] flex justify-between items-center border-t border-[#DDD8CB]">
              <div>
                <p className="font-bold text-[#0D2B1A] text-sm">Tổng giá trị thực tế</p>
                <p className="text-xs text-gray-400">Nếu mua riêng lẻ từng phần</p>
              </div>
              <p className="text-lg font-black text-gray-400 line-through">11.368.686đ</p>
            </div>

            <div className="px-6 py-6 bg-[#EAF5EF] border-t-2 border-[#0D2B1A]">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-black text-[#0D2B1A] text-lg">Học phí — trả một lần, dùng mãi</p>
                  <p className="text-xs text-[#3D6B4A] mt-1">Ít hơn chi phí thuê freelancer làm 1 trang · Bảo hành 14 ngày hoàn 100%</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-4xl font-black text-[#0D2B1A]">{formatVND(product.price)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button onClick={open}
              className="w-full h-16 bg-gradient-to-r from-[#C0390E] to-[#E85E39] hover:from-[#E85E39] hover:to-[#C0390E] text-white text-lg font-black rounded-2xl transition-all shadow-xl shadow-brand-accent/20 active:scale-[0.98]">
              Đăng Ký Học Ngay — {formatVND(product.price)} →
            </button>
            <p className="text-center text-xs text-gray-400">Hỗ trợ chuyển khoản nhanh · Kích hoạt ngay lập tức · Bảo hành 14 ngày</p>
          </div>
        </div>
      </section>

      {/* [10] GUARANTEE */}
      <section className="bg-[#EAF5EF]/80 border-y border-[#2D7A4F]/20 px-4 py-16">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-[#2D7A4F] flex items-center justify-center flex-shrink-0 text-white text-3xl shadow-sm">
            🛡️
          </div>
          <div className="space-y-3 text-center sm:text-left">
            <h3 className="text-2xl font-black text-[#0D2B1A]">Cam kết bảo hành rủi ro 100% trong 14 ngày</h3>
            <p className="text-[#2D7A4F] text-sm font-bold bg-[#2D7A4F]/5 border border-[#2D7A4F]/15 px-3 py-1 rounded-full inline-block">Học thử thoải mái · Đăng ký không rủi ro</p>
            <p className="text-sm text-gray-600 leading-relaxed pt-2">
              Tôi tin vào tính thực chiến của quy trình này đủ để cam kết: Trong vòng 14 ngày kể từ khi đăng ký, nếu bạn áp dụng nhưng thấy không phù hợp, 
              chỉ cần gửi tin nhắn Zalo/Telegram cho tôi. Tôi sẽ hoàn trả 100% học phí trong vòng 24h, hoàn toàn không hỏi lý do gây khó dễ.
            </p>
          </div>
        </div>
      </section>

      {/* [11] FOR WHO */}
      <section className="px-4 py-20 bg-[#F6F0E4]">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black text-[#0D2B1A] text-center">Khóa học này dành cho ai?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <p className="font-extrabold text-[#2D7A4F] text-base">✓ PHÙ HỢP TUYỆT ĐỐI NẾU:</p>
              <div className="space-y-3">
                {[
                  'Bạn là Solopreneur, chủ shop, coach, freelancer muốn tự xây trang bán hàng tối ưu.',
                  'Bạn muốn sở hữu kỹ năng chủ động thiết kế, tự kiểm soát nội dung và nhân bản trang web.',
                  'Bạn đã thử dùng AI viết bài nhưng chưa ưng ý vì giọng văn quá hời hợt, chung chung.',
                  'Bạn mong muốn tháo gỡ rào cản chốt đơn thủ công, đưa quy trình bán hàng tự động 24/7.'
                ].map((t, i) => <p key={i} className="text-sm text-gray-700 leading-relaxed">• {t}</p>)}
              </div>
            </div>
            
            <div className="bg-white border border-[#DDD8CB] rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <p className="font-extrabold text-gray-400 text-base">✗ KHÔNG PHÙ HỢP NẾU:</p>
              <div className="space-y-3">
                {[
                  'Bạn chỉ muốn phó mặc 100% việc cho người khác làm hộ mà không muốn chạm tay vào học hỏi.',
                  'Bạn chưa có ý tưởng sản phẩm hay dịch vụ cụ thể nào để bắt đầu thiết lập trang bán hàng.',
                  'Bạn kỳ vọng có phần mềm tự động hóa hoàn toàn không cần tư duy sáng tạo hay chuẩn bị nội dung.'
                ].map((t, i) => <p key={i} className="text-sm text-gray-500 leading-relaxed">• {t}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [12] FAQ */}
      <section className="bg-white border-y border-[#DDD8CB]/80 px-4 py-20">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest bg-[#3D6B4A]/5 px-3 py-1 rounded-full border border-[#3D6B4A]/15">Giải đáp thắc mắc</span>
            <h2 className="text-3xl font-black text-[#0D2B1A]">Câu hỏi thường gặp</h2>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            {FAQS.map((f, i) => <AccordionItem key={i} q={f.q} a={f.a} />)}
          </div>

          <p className="text-center text-sm text-gray-500 pt-4">
            Bạn còn thắc mắc khác? Chat trực tiếp với tôi qua Telegram{' '}
            <a href="https://t.me/KentHoang" className="text-[#3D6B4A] underline font-bold hover:text-[#0D2B1A] transition-colors">@KentHoang</a>
          </p>
        </div>
      </section>

      {/* [13] SOCIAL PROOF */}
      <section className="px-4 py-20 bg-[#FAF7F2] border-b border-[#DDD8CB]">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-black text-[#0D2B1A] text-center">Phản hồi từ những học viên thực tế</h2>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              {
                stars: 5,
                quote: 'Trước đây tôi rất sợ mấy thuật ngữ kỹ thuật như code, hosting, domain. Không ngờ với Vibe Coding, Cursor đọc file skill và tự viết HTML hết. Tôi chỉ cần trả lời câu hỏi và duyệt kết quả.',
                name:  'Lan Phương',
                role:  'Coach & Bán khóa học online',
                result:'Sở hữu trang bán hàng sau 6 ngày',
              },
              {
                stars: 5,
                quote: 'Phần tư duy Offer Hormozi thực sự làm thay đổi góc nhìn của tôi. Viết headline tập trung giải quyết nỗi đau và cam kết rõ ràng giúp tỷ lệ khách đọc đến cuối trang tăng hẳn.',
                name:  'Minh Tuấn',
                role:  'Huấn luyện viên sức khỏe cá nhân',
                result:'Tỷ lệ chuyển đổi trang tăng rõ rệt',
              },
              {
                stars: 5,
                quote: 'Bài 10 deploy hướng dẫn chi tiết từng bước. Tôi không biết gì về lập trình vẫn đưa trang web lên tên miền riêng thành công, kết nối SePay tự động báo đơn cực sướng.',
                name:  'Thu Hà',
                role:  'Chủ shop mỹ phẩm thiên nhiên',
                result:'Web chạy thật, tên miền riêng hoàn thành',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-6 space-y-4 hover:shadow-card-md hover:border-[#3D6B4A]/30 transition-all duration-200">
                <div className="flex gap-1 text-amber-400">
                  {Array(t.stars).fill(0).map((_, j) => <span key={j} className="text-sm">★</span>)}
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
          <p className="text-center text-xs text-gray-400 italic">Lưu ý: Kết quả có thể khác biệt tùy theo sản phẩm và mức độ áp dụng của từng người.</p>
        </div>
      </section>

      {/* [14] FINAL CTA */}
      <section className="px-4 py-20 bg-[#F6F0E4]">
        <div className="max-w-2xl mx-auto space-y-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0D2B1A] leading-tight">
            2 tuần nữa, bạn đã sở hữu một trang bán hàng tự chốt đơn 24/7
          </h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">Hoặc bạn chọn tiếp tục tốn hàng giờ trực chat Zalo giải thích đi giải thích lại cho từng khách hàng thủ công.</p>
          
          <button onClick={open}
            className="w-full h-16 bg-gradient-to-r from-[#C0390E] to-[#E85E39] hover:from-[#E85E39] hover:to-[#C0390E] text-white text-lg font-black rounded-2xl transition-all shadow-xl shadow-brand-accent/25 active:scale-[0.98] hover:scale-[1.01]">
            Bắt Đầu Ngay — {formatVND(product.price)} →
          </button>
          
          <div className="flex items-center justify-center gap-6 text-xs text-gray-400 font-semibold">
            <span>✓ Học phí {formatVND(product.price)}</span>
            <span>✓ Bảo hành hoàn tiền 14 ngày</span>
            <span>✓ Tặng Content System Notion</span>
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
          </p>
          <div className="flex justify-center gap-4 text-xs text-[#F6F0E4]/30">
            <a href="/portal" className="hover:text-[#F6F0E4]/60">Khu học</a>
            <a href="/khoa-1-ban-tu-lap" className="hover:text-[#F6F0E4]/60">Khóa 1</a>
            <a href="/khoa-2-ban-co-doi-truong" className="hover:text-[#F6F0E4]/60">Coaching</a>
          </div>
        </div>
      </footer>

      {/* STICKY BAR */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D2B1A]/90 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-slide-up">
          <div className="min-w-0">
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Tạo Landing Page Chuyển Đổi Cao</p>
            <p className="text-[#C8D5C9]/60 text-xs truncate">10 bài học · Bàn giao 8 skill · Hoàn tiền 14 ngày</p>
          </div>
          <button onClick={open}
            className="flex-shrink-0 bg-[#C0390E] hover:bg-[#E85E39] text-white font-bold px-5 h-11 rounded-xl text-sm transition-all shadow-md">
            Đăng ký — {formatVND(product.price)}
          </button>
        </div>
      )}

      <CheckoutModal productId={product.id} open={showCheckout} onClose={() => setShowCheckout(false)} />
    </div>
  )
}
