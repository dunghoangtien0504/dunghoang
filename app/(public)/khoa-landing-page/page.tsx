'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS } from '@/lib/products'

const product = PRODUCTS.landing_186

const LESSONS = [
  { n:'01', title:'Cài Công Cụ Vibe Coding', time:'30 phút', output:'Cursor / Antigravity / Claude Code đã cài, thư mục làm việc sẵn sàng' },
  { n:'02', title:'Skill #01 — Chân Dung Khách Hàng', time:'30 phút', output:'avatar-khach-hang.md — biết viết cho ai' },
  { n:'03', title:'Skill #02 — Giọng Văn Thương Hiệu', time:'45 phút', output:'brand-dna.md — AI viết đúng giọng bạn' },
  { n:'04', title:'Skill #03 — Tư Duy Offer Kiểu Hormozi', time:'45 phút', output:'offer-scorecard.md — offer nghe xứng đáng với giá' },
  { n:'05', title:'Skill #05 — Cơ Chế Khác Biệt', time:'45 phút', output:'hero-mechanism.md + 3 bản headline' },
  { n:'06', title:'Skill #07 — Thiết Kế Offer Hoàn Chỉnh', time:'60 phút', output:'offer-final.md — offer đủ 5 tầng' },
  { n:'07', title:'Skill #09 — Phễu Bán Hàng', time:'45 phút', output:'funnel-plan.md — 1 mục tiêu rõ cho landing page' },
  { n:'08', title:'Skill #10 — Xây Landing Page Thật', time:'90 phút', output:'landing-page.html — chạy được, không phải demo' },
  { n:'09', title:'Skill #11 — Nâng Cấp Giao Diện UI/UX', time:'60 phút', output:'landing-page-v2.html — đẹp hơn, chuyển đổi cao hơn' },
  { n:'10', title:'Deploy + Thanh Toán + Tracking', time:'60 phút', output:'Landing page đang chạy thật trên tên miền của bạn' },
]

const FAQS = [
  { q:'Không biết code có làm được không?', a:'Được. Không cần code một chữ. Vibe Coding nghĩa là bạn tải file skill về, bỏ vào thư mục, chat AI "đọc file này và làm hộ tôi". AI viết code, bạn nói muốn gì.' },
  { q:'Cần dùng tool AI nào? Có tốn tiền không?', a:'Cursor (miễn phí tier cơ bản), hoặc Antigravity, hoặc Claude Code. Bài 1 hướng dẫn cài cả 3. Bạn dùng cái nào phù hợp nhất với máy tính bạn đang có.' },
  { q:'Đã mua Landing Page Siêu Chuyển Đổi (686.868đ) rồi thì sao?', a:'686.868đ đó được trừ thẳng vào học phí khóa này. Bạn chỉ thêm 1.181.132đ nữa là học đủ 10 bài. Nhắn mình qua Telegram @KentHoang để áp dụng.' },
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
    <div className="min-h-screen bg-[#F6F0E4] font-sans">

      {/* [0] ANNOUNCEMENT BAR */}
      <div className="bg-[#88860B] text-white text-center py-2 px-4 text-xs sm:text-sm font-medium">
        Tặng kèm Content System Notion (368.686đ) + 8 file skill · Bảo hành 14 ngày hoàn 100%
      </div>

      {/* [1] HERO */}
      <section ref={heroRef} className="bg-[#0D2B1A] px-4 pt-14 pb-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-block bg-[#C0390E]/20 text-[#E87C5E] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Khóa Thực Hành · Vibe Coding · 10 Skill Files
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F6F0E4] leading-tight">
            Tự Build Landing Page Thật<br/>
            <span className="text-[#C0390E]">Không Cần Code Một Chữ</span><br/>
            <span className="text-2xl sm:text-3xl font-bold text-[#F6F0E4]/70">AI làm hết phần kỹ thuật. Bạn chỉ cần nói muốn gì.</span>
          </h1>
          <p className="text-[#F6F0E4]/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            10 buổi thực hành với Vibe Coding. Cuối mỗi buổi có file output thật. Cuối khóa bạn có
            landing page đang chạy thật trên tên miền của bạn — không phải demo, không phải template.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={open}
              className="h-14 px-8 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.03] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-lg shadow-red-900/30">
              Bắt Đầu Ngay — 1.868.000đ →
            </button>
            <a href="#curriculum"
              className="h-14 px-8 border border-[#F6F0E4]/20 text-[#F6F0E4]/70 hover:text-[#F6F0E4] text-sm font-medium rounded-2xl flex items-center justify-center transition-colors">
              Xem 10 bài học →
            </a>
          </div>
          <p className="text-[#F6F0E4]/40 text-xs">Đã mua Landing Page Siêu Chuyển Đổi? 686.868đ được trừ thẳng vào đây.</p>
        </div>
      </section>

      {/* [2] TRUST BAR */}
      <section className="bg-white border-y border-[#DDD8CB] py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { n:'10 bài', label:'output file thật mỗi bài' },
              { n:'8 skill', label:'file tải về dùng mãi' },
              { n:'14 ngày', label:'bảo hành hoàn tiền' },
            ].map(s => (
              <div key={s.n}>
                <p className="text-2xl sm:text-3xl font-black text-[#0D2B1A]">{s.n}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [3] PAIN */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#C0390E] uppercase tracking-widest">Vấn đề</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
              Muốn có landing page nhưng<br/>không biết bắt đầu từ đâu.
            </h2>
          </div>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Thuê người thì tốn 2-5 triệu, chờ 2 tuần, muốn sửa lại phải nhờ. Xong rồi thấy trang không đúng ý mà ngại nói.</p>
            <p>Thử dùng AI thì ra cái gì đó chung chung — copy nghe không đúng giọng, design trông không phải của mình, không biết sửa từ đâu.</p>
            <p>Vì AI không biết bạn là ai, bán gì, cho ai, giọng bạn viết như thế nào. Chưa ai dạy AI điều đó trước khi nhờ nó làm landing page.</p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-3">
            <p className="font-bold text-[#0D2B1A] text-sm">Kết quả:</p>
            {[
              'Vẫn bán qua inbox, giải thích lại từ đầu với từng khách',
              'Landing page thuê người làm xong rồi để đó, không dám sửa',
              'Đối thủ có trang bán hàng đẹp hơn dù sản phẩm không tốt hơn',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-orange-500 text-xs mt-1 flex-shrink-0">→</span>
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>
          <button onClick={open}
            className="w-full h-14 bg-[#0D2B1A] hover:bg-[#153f27] text-[#F6F0E4] font-bold rounded-2xl transition-all">
            Tôi Muốn Tự Build Landing Page →
          </button>
        </div>
      </section>

      {/* [4] BRIDGE — WHAT IS VIBE CODING */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-xs font-bold text-[#88860B] uppercase tracking-widest">Cách làm</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F6F0E4] leading-tight">
            Vibe Coding: Tải file skill về.<br/>Chat AI. Xong.
          </h2>
          <div className="space-y-4 text-[#F6F0E4]/75 text-sm sm:text-base leading-relaxed">
            <p>Mỗi bài học có 1 file skill (`.zip` hoặc `.skill`). Bạn tải về, kéo vào thư mục, mở Cursor (hoặc Antigravity, Claude Code), rồi chat:</p>
            <div className="bg-[#1a1a2e] rounded-xl p-4">
              <p className="text-[#88c0a0] text-xs font-mono mb-1">Câu chat mẫu</p>
              <p className="text-[#e8f0ec] font-mono text-sm">"Đọc các file trong folder agent-avatar-builder. Sau đó áp dụng skill cho tôi. Tôi đang bán [sản phẩm của bạn]."</p>
            </div>
            <p className="text-[#F6F0E4]"><strong>AI đọc skill, hỏi bạn từng câu, rồi tự viết file output.</strong> Bạn không cần biết code. Không cần biết AI hoạt động như thế nào bên trong. Chỉ cần trả lời câu hỏi của AI.</p>
            <p>10 bài = 10 file output. File này là input cho file kia. Cuối cùng AI có đủ thông tin để build cả landing page HTML cho bạn.</p>
          </div>
        </div>
      </section>

      {/* [5] CURRICULUM */}
      <section id="curriculum" className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Nội dung</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">10 buổi — 10 output thật</h2>
            <p className="text-sm text-gray-500">Mỗi buổi có file skill + câu chat sẵn + checklist xong bài</p>
          </div>
          <div className="space-y-3">
            {LESSONS.map((l, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-4 flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#0D2B1A] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#F6F0E4] text-xs font-black">{l.n}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-[#0D2B1A] text-sm leading-snug">{l.title}</p>
                    <span className="text-xs text-gray-400 flex-shrink-0">{l.time}</span>
                  </div>
                  <p className="text-xs text-[#3D6B4A] mt-1 leading-snug">Output: <strong>{l.output}</strong></p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={open}
            className="w-full h-14 bg-[#C0390E] hover:bg-[#a02e0a] text-white font-black rounded-2xl transition-colors shadow-lg shadow-red-900/20">
            Đăng Ký Ngay — 1.868.000đ →
          </button>
        </div>
      </section>

      {/* [6] WHAT YOU GET */}
      <section className="bg-white border-y border-[#DDD8CB] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Bạn nhận được</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Đầy đủ để có landing page thật</h2>
          </div>
          <div className="space-y-3">
            {[
              { icon:'🎯', title:'10 bài học có SOP + câu chat sẵn', desc:'Mỗi bài có hướng dẫn từng bước, câu chat copy-paste, và checklist để biết đã xong chưa.' },
              { icon:'📦', title:'8 file skill — tải về dùng ngay', desc:'avatar-builder, brand-voice, hormozi-system, hero-mechanism, offer-architect, funnel-strategist, landing-page, ui-ux-pro-max. Không cần tìm đâu thêm.' },
              { icon:'🏗️', title:'Landing page HTML thật — không phải template', desc:'AI build dựa trên avatar + brand-dna + offer thật của bạn. Mỗi trang ra một bản khác nhau, không phải fill-in-the-blank.' },
              { icon:'🚀', title:'Deploy Vercel + SePay + Meta Pixel', desc:'Bài 10 hướng dẫn đẩy lên Vercel, kết nối tên miền, nhận tiền qua SePay, gắn tracking Pixel. Làm thật luôn.' },
            ].map((item, i) => (
              <div key={i} className="border border-[#DDD8CB] rounded-2xl p-5 flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-bold text-[#0D2B1A] text-sm">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#EAF5EF] border-2 border-[#2D7A4F]/30 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎁</span>
              <div>
                <p className="font-black text-[#0D2B1A] text-sm">TẶNG KÈM: Content Không Cần Cảm Hứng</p>
                <p className="text-xs text-[#3D6B4A] font-medium">Workspace Notion · AI viết bài đúng giọng bạn · Trị giá 368.686đ</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              {[
                'Brand DNA + Story Bank: AI viết bài không cần nhắc lại giọng mỗi lần',
                'Hook Library + 600+ mẫu tiêu đề',
                'Quy trình 4 bước Thu thập → Phân tích → Sản xuất → Phân phối',
                'AI commands: gõ "viết bài" là có bài sẵn để duyệt',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#2D7A4F] text-xs mt-0.5 flex-shrink-0 font-bold">✓</span>
                  <p className="leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={open}
            className="w-full h-14 bg-[#C0390E] hover:bg-[#a02e0a] text-white font-black rounded-2xl transition-colors text-base shadow-lg shadow-red-900/20">
            Giữ Chỗ — 1.868.000đ →
          </button>
        </div>
      </section>

      {/* [7] EMOTION */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">2 tuần nữa trông như thế này</h2>
          <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-4 text-[#F6F0E4]/80 text-sm leading-relaxed">
            <p>Khách hỏi giá. Bạn gửi link. Họ tự đọc, tự thấy giá trị, tự nhấn mua.</p>
            <p className="text-[#F6F0E4]"><strong>Landing page đang làm việc thay bạn 24/7 — kể cả lúc 3h sáng khi bạn đang ngủ.</strong></p>
            <p>Và bạn biết cách tự sửa. Muốn đổi giá, đổi headline, đổi hình — mở Cursor lên, chat AI, 5 phút là xong. Không phải nhờ ai.</p>
            <p>Lần sau cần landing page cho sản phẩm mới, bạn không học lại. Bạn chỉ thay avatar mới vào, chạy skill, 1 buổi là có trang mới.</p>
            <p className="text-[#88860B]">Đó là kỹ năng — không phải template. Một lần học, dùng mãi.</p>
          </div>
        </div>
      </section>

      {/* [8] AUTHORITY */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#F6F0E4]">Tại sao tin quy trình này?</h2>
          <div className="space-y-3">
            {[
              { icon:'✅', text:'Mình đang dùng chính quy trình Vibe Coding này để build và update dunghoang.com hằng ngày' },
              { icon:'📦', text:'8 file skill này là skill mình đang dùng thật trong business — không phải tạo ra để dạy' },
              { icon:'🏠', text:'Landing page homestay, landing page khóa học, landing page tư vấn — đều build theo quy trình này' },
              { icon:'👥', text:'Học viên từ nhiều ngành: coach, bán mỹ phẩm, freelancer, homestay — không ai cần biết code trước' },
              { icon:'🔄', text:'Đã mua Landing Page Siêu Chuyển Đổi? 686.868đ trừ thẳng vào — nhắn @KentHoang' },
            ].map(a => (
              <div key={a.icon} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{a.icon}</span>
                <p className="text-[#F6F0E4]/75 text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [9] PRICING */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Đầu tư</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">1.868.000đ — ít hơn thuê freelancer 1 trang</h2>
            <p className="text-sm text-gray-500">Freelancer build 1 landing page: 2-5 triệu. Chờ 2 tuần. Muốn sửa lại phải nhờ. Không biết làm lần 2.</p>
          </div>
          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden">
            <div className="bg-[#0D2B1A] px-5 py-3">
              <p className="text-[#F6F0E4] font-bold text-sm">Bạn nhận được</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]">
              {[
                { item:'10 bài học + SOP + câu chat sẵn',          value:'1.200.000đ' },
                { item:'8 file skill (tải về dùng mãi)',            value:'800.000đ' },
                { item:'Landing page HTML thật (deploy được)',       value:'500.000đ' },
                { item:'Hướng dẫn deploy Vercel + kết nối tên miền', value:'200.000đ' },
                { item:'🎁 Content Không Cần Cảm Hứng (Notion)',    value:'368.686đ', bonus:true },
              ].map((r, i) => (
                <div key={i} className={`px-5 py-3 flex justify-between items-center ${r.bonus ? 'bg-[#EAF5EF]' : ''}`}>
                  <p className={`text-sm ${r.bonus ? 'font-semibold text-[#2D7A4F]' : 'text-gray-700'}`}>{r.item}</p>
                  <p className={`text-sm font-bold flex-shrink-0 ml-4 ${r.bonus ? 'text-[#2D7A4F]' : 'text-gray-400'}`}>{r.value}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-[#FAF7F2] flex justify-between items-center">
              <p className="font-bold text-[#0D2B1A]">Tổng giá trị</p>
              <p className="text-lg font-black text-gray-400 line-through">3.068.686đ</p>
            </div>
            <div className="px-5 py-4 bg-[#EAF5EF] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#0D2B1A]">Học phí</p>
                <p className="text-xs text-[#3D6B4A]">Đã mua Landing Page Siêu Chuyển Đổi? Trừ 686.868đ</p>
              </div>
              <p className="text-3xl font-black text-[#0D2B1A]">1.868.000đ</p>
            </div>
          </div>
          <div className="space-y-3">
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-lg font-black rounded-2xl transition-colors shadow-xl shadow-red-900/25">
              Đăng Ký Ngay — 1.868.000đ →
            </button>
            <p className="text-center text-xs text-gray-400">Chuyển khoản · Xác nhận trong 5-10 phút · Bảo hành 14 ngày</p>
          </div>
        </div>
      </section>

      {/* [10] GUARANTEE */}
      <section className="bg-[#EAF5EF] border-y border-[#2D7A4F]/20 px-4 py-12">
        <div className="max-w-2xl mx-auto flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#2D7A4F] flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🛡️</span>
          </div>
          <div>
            <h3 className="text-xl font-black text-[#0D2B1A]">Bảo hành 14 ngày hoàn 100%</h3>
            <p className="text-[#3D6B4A] text-sm mt-1 font-medium">Không phù hợp → nhắn mình → hoàn 24h, không hỏi lý do</p>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Mình tin vào chất lượng đủ để đặt cam kết này. Nếu học xong mà thấy quy trình không giúp được gì,
              nhắn Telegram là xong. Mình không giữ tiền của người không thấy giá trị.
            </p>
          </div>
        </div>
      </section>

      {/* [11] FOR WHO */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Khóa này dành cho ai?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-[#2D7A4F] text-sm">✓ DÀNH CHO BẠN NẾU:</p>
              <div className="space-y-2">
                {[
                  'Muốn có landing page thật nhưng không biết bắt đầu từ đâu',
                  'Đã thử dùng AI nhưng ra kết quả chung chung, không đúng giọng',
                  'Không muốn thuê người vì tốn tiền và mất kiểm soát',
                  'Muốn học kỹ năng một lần, tự làm được nhiều lần sau',
                ].map((t, i) => <p key={i} className="text-sm text-gray-700 leading-snug">• {t}</p>)}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-gray-500 text-sm">✗ KHÔNG PHÙ HỢP NẾU:</p>
              <div className="space-y-2">
                {[
                  'Muốn người khác làm thay, không tự tay làm',
                  'Không có sản phẩm/dịch vụ thật để bán',
                  'Cần hệ thống 24 AI agent đầy đủ (xem Khóa 1)',
                ].map((t, i) => <p key={i} className="text-sm text-gray-500 leading-snug">• {t}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [12] FAQ */}
      <section className="bg-white border-y border-[#DDD8CB] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Câu hỏi thường gặp</h2>
          <div className="space-y-2">
            {FAQS.map((f, i) => <AccordionItem key={i} q={f.q} a={f.a} />)}
          </div>
          <p className="text-center text-sm text-gray-400">
            Câu hỏi khác? Nhắn Telegram{' '}
            <a href="https://t.me/KentHoang" className="text-[#3D6B4A] underline font-medium">@KentHoang</a>
          </p>
        </div>
      </section>

      {/* [13] SOCIAL PROOF */}
      <section className="px-4 py-14 bg-[#FAF7F2] border-y border-[#DDD8CB]">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Học viên nói gì</h2>
          <div className="space-y-4">
            {[
              {
                stars: 5,
                quote: 'Trước mình sợ nhất chữ "code". Giờ biết là mình không cần code gì cả. Cursor đọc file skill rồi tự làm. Mình chỉ trả lời câu hỏi của AI và xem nó build trang bán hàng cho mình.',
                name:  'Lan Phương',
                role:  'Bán khóa học online',
                result:'Có landing page trong 1 tuần đầu',
              },
              {
                stars: 5,
                quote: 'Phần Hormozi và Cơ Chế Khác Biệt là 2 bài mình xem đi xem lại nhiều nhất. Sau khi hiểu 2 phần này, headline trang bán của mình thay đổi hoàn toàn. Khách vào trang không bỏ đi nữa.',
                name:  'Minh Tuấn',
                role:  'Coach sức khoẻ',
                result:'Tỷ lệ đọc đến cuối trang tăng',
              },
              {
                stars: 5,
                quote: 'Bài 10 deploy hướng dẫn chi tiết từng bước. Mình không biết Vercel là gì, không biết DNS là gì — nhưng vẫn làm được. Cuối buổi trang đang chạy với tên miền của mình rồi.',
                name:  'Thu Hà',
                role:  'Tư vấn dinh dưỡng',
                result:'Trang thật, tên miền thật, ngày 10',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3 hover:shadow-md transition-all">
                <div className="flex gap-0.5">
                  {Array(t.stars).fill(0).map((_, j) => <span key={j} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#0D2B1A]">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                  <span className="text-xs bg-[#EAF5EF] text-[#2D7A4F] px-3 py-1 rounded-full font-medium">{t.result}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 italic">Kết quả thay đổi tùy người và business. Đây là ví dụ từ học viên thật.</p>
        </div>
      </section>

      {/* [14] FINAL CTA */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
            2 tuần nữa,<br/>bạn có thể đã có landing page thật đang chạy.
          </h2>
          <p className="text-gray-500 text-sm">Hoặc tiếp tục giải thích qua inbox với từng khách một.</p>
          <button onClick={open}
            className="w-full h-16 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.02] text-white text-base font-black rounded-2xl transition-all shadow-xl shadow-red-900/25">
            Bắt Đầu Ngay — 1.868.000đ →
          </button>
          <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
            <span>✓ 1.868.000đ</span>
            <span>✓ Bảo hành 14 ngày</span>
            <span>✓ Tặng Content System</span>
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
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D2B1A]/95 backdrop-blur-md border-t border-[#F6F0E4]/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-slide-up">
          <div className="min-w-0">
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Landing Page Chuyển Đổi Cao — 1.868.000đ</p>
            <p className="text-[#F6F0E4]/50 text-xs">10 buổi · Bảo hành 14 ngày · Tặng Content System</p>
          </div>
          <button onClick={open}
            className="flex-shrink-0 bg-[#C0390E] hover:bg-[#b0300a] text-white font-bold px-5 h-11 rounded-xl text-sm transition-all">
            Đăng ký →
          </button>
        </div>
      )}

      <a href="https://zalo.me/0938725413" target="_blank" rel="noopener noreferrer"
        className="fixed right-4 bottom-20 z-50 w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
        title="Chat Zalo">
        <span className="text-white font-bold text-xs">Zalo</span>
      </a>

      <CheckoutModal productId={product.id} open={showCheckout} onClose={() => setShowCheckout(false)} />
    </div>
  )
}
