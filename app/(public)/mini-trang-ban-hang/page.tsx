'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS } from '@/lib/products'

const product = PRODUCTS.mini_368

const INCLUDES = [
  { icon:'🎯', title:'SOP Làm Landing Page Trong 1 Buổi', desc:'Quy trình từng bước: từ không có gì đến trang bán hàng chạy thật. Không cần code, không cần thiết kế.' },
  { icon:'📝', title:'Bộ Prompt Sẵn — Dán Là Chạy',       desc:'Prompt viết headline, bullets, CTA, section proof. AI viết theo đúng giọng bạn sau khi điền BRAND_DNA.' },
  { icon:'🧩', title:'Checklist 12 Điểm Trang Bán Hàng',  desc:'12 điểm kiểm tra trước khi bấm đăng. Không bỏ sót phần nào làm khách đọc xong mà không mua.' },
  { icon:'🧬', title:'File BRAND_DNA (Điền 1 Lần, Dùng Mãi)', desc:'Điền 15 phút là AI biết bạn là ai. Dùng lại cho mọi thứ sau này — không chỉ landing page.' },
]

const CONTENT_SYSTEM_ITEMS = [
  'Workspace Notion đang chạy thật — bạn duplicate về dùng ngay',
  'Brand DNA + Story Bank: AI viết bài đúng giọng bạn, không phải giọng AI',
  'Hook Library + 600+ mẫu tiêu đề + Ma trận content 40/30/20/10%',
  'Quy trình 4 bước: Thu thập → Phân tích → Sản xuất → Phân phối',
  'Visual Brief 7 mục cho designer — không cần giải thích lại từ đầu',
  'AI commands: gõ "viết bài" là có bài sẵn để duyệt và đăng',
]

const FAQS = [
  { q:'Không biết code có làm được không?',
    a:'Được. Không cần code, không cần thiết kế. SOP dùng công cụ có sẵn (Canva, Notion, hoặc tool miễn phí). Bạn chỉ cần máy tính và kết nối mạng.' },
  { q:'Học xong mất bao lâu để có trang thật?',
    a:'1 buổi cho trang đầu tiên nếu làm theo đúng SOP. Mình test với nhiều người — ai cũng có trang chạy được trong buổi học hôm đó.' },
  { q:'Content System bàn giao kiểu gì?',
    a:'Là workspace Notion. Bạn nhận link, bấm Duplicate, điền Brand DNA là bắt đầu dùng được. Không cần cài thêm gì.' },
  { q:'Đã có Khóa 1 rồi thì có cần mua không?',
    a:'Không cần. Khóa 1 đã bao gồm Landing Page skill và tặng kèm Content System luôn rồi.' },
  { q:'686.868đ có trừ vào Khóa 1 không?',
    a:'Có. Khi bạn muốn nâng lên Khóa 1 (868.686đ), phần bạn đã trả sẽ được trừ thẳng. Liên hệ mình qua Telegram để áp dụng.' },
  { q:'Bảo hành thế nào?',
    a:'14 ngày hoàn 100%. Học thử, không phù hợp thì nhắn mình, hoàn trong 24 giờ không hỏi lý do.' },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#DDD8CB] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 bg-white hover:bg-[#FAF7F2] transition-colors">
        <span className="font-semibold text-[#0D2B1A] text-sm leading-snug">{q}</span>
        <span className={`text-[#C0390E] font-bold flex-shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white">
          <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function MiniTrangBanHangPage() {
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
        686.868đ được trừ thẳng vào Khóa 1 (868.686đ) nếu muốn nâng cấp · Bảo hành 14 ngày hoàn 100%
      </div>

      {/* Nav */}
      <nav className="bg-[#0D2B1A] px-4 py-3 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-[#F6F0E4] font-black font-mono text-sm">DungHoang.com</span>
          <button onClick={open} className="bg-[#C0390E] hover:bg-[#a02e0a] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
            Đăng ký 686.868đ →
          </button>
        </div>
      </nav>

      {/* [1] HERO */}
      <section ref={heroRef} className="bg-[#0D2B1A] px-4 pt-14 pb-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-block bg-[#C0390E]/20 text-[#E87C5E] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Skill Landing Page · AI Bán Hàng · Tặng Content System
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F6F0E4] leading-tight">
            Trang Bán Hàng Của Bạn<br/>
            <span className="text-[#C0390E]">Làm Xong Trong 1 Buổi</span><br/>
            <span className="text-2xl sm:text-3xl font-bold text-[#F6F0E4]/70">Không code. Không thuê người. Không chờ.</span>
          </h1>
          <p className="text-[#F6F0E4]/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            SOP từng bước + bộ prompt AI sẵn + checklist 12 điểm.
            Cuối buổi bạn có trang thật chạy được. Kèm luôn hệ thống Content System Notion để không bao giờ hết bài đăng.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={open}
              className="h-14 px-8 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-base font-black rounded-2xl transition-colors shadow-lg shadow-red-900/30">
              Bắt Đầu Ngay — 686.868đ →
            </button>
            <a href="#co-gi"
              className="h-14 px-8 border border-[#F6F0E4]/20 text-[#F6F0E4]/70 hover:text-[#F6F0E4] text-sm font-medium rounded-2xl flex items-center justify-center transition-colors">
              Xem trong khóa có gì →
            </a>
          </div>
          <p className="text-[#F6F0E4]/40 text-xs">686.868đ có thể trừ vào Khóa 1 (868.686đ) nếu bạn muốn nâng cấp sau</p>
        </div>
      </section>

      {/* [2] TRUST BAR */}
      <section className="bg-white border-y border-[#DDD8CB] py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { n:'605+', label:'học viên đã học' },
              { n:'1 buổi', label:'có trang thật ngay' },
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
              Bạn đang bán hàng qua inbox.<br/>Khách hỏi giá rồi im luôn.
            </h2>
          </div>

          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Mỗi ngày bạn nhận tin nhắn hỏi. Bạn giải thích. Họ nói "để em cân nhắc". Rồi biến mất.</p>
            <p>Không phải vì sản phẩm không tốt. Mà vì họ không có đủ thông tin để quyết định, và bạn không có chỗ nào đặt hết thông tin đó ra một lần.</p>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-3">
            <p className="font-bold text-[#0D2B1A] text-sm">Hậu quả thực tế:</p>
            {[
              'Nhẩm tính mỗi tháng mất bao nhiêu khách vì không có trang giải thích đủ',
              'Giải thích lại từ đầu với từng khách — mất 20-30 phút mỗi người',
              'Đối thủ có trang bán hàng đẹp hơn → khách tin hơn dù sản phẩm chưa chắc tốt hơn',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-orange-500 text-xs mt-1 flex-shrink-0">→</span>
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>

          <div className="border-l-4 border-[#C0390E] pl-4">
            <p className="text-gray-700 leading-relaxed italic">
              "Một trang bán hàng tốt không thay thế bạn. Nó làm công việc giải thích hộ bạn <strong className="not-italic text-[#0D2B1A]">24/7</strong>, kể cả lúc 3h sáng khi bạn đang ngủ."
            </p>
          </div>

          <button onClick={open}
            className="w-full h-14 bg-[#0D2B1A] hover:bg-[#1a4a2e] text-[#F6F0E4] font-bold rounded-2xl transition-colors">
            Tôi Muốn Có Trang Bán Hàng Của Mình →
          </button>
        </div>
      </section>

      {/* [4] BRIDGE */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <p className="text-xs font-bold text-[#88860B] uppercase tracking-widest">Sự thật</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F6F0E4] leading-tight">
            Làm landing page không cần<br/>thuê người hay biết code.
          </h2>
          <div className="space-y-4 text-[#F6F0E4]/75 text-sm sm:text-base leading-relaxed">
            <p>Trước đây mình tưởng landing page cần designer + developer. Thuê 2 người, chờ 2 tuần, tốn vài triệu. Xong rồi muốn sửa cái nút lại phải nhờ họ.</p>
            <p className="text-[#F6F0E4]"><strong>Bây giờ: mình làm trang mới trong 1 buổi.</strong> AI viết copy. Công cụ miễn phí lo phần thiết kế. Mình chỉ cần biết mình muốn nói gì với khách.</p>
            <p>Khóa này là toàn bộ quy trình đó, đóng gói thành SOP từng bước kèm prompt sẵn để bạn chỉ việc điền vào và chạy.</p>
          </div>
        </div>
      </section>

      {/* [5] HOW IT WORKS */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Quy trình</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Từ 0 đến trang bán hàng thật trong 1 buổi</h2>
          </div>
          <div className="space-y-3">
            {[
              { n:'1', head:'Nạp BRAND_DNA — 15 phút', body:'Điền file BRAND_DNA: bạn là ai, bán gì, cho ai, giọng viết như thế nào. Làm 1 lần, dùng mãi cho mọi skill sau.' },
              { n:'2', head:'Dùng prompt tạo copy — 20 phút', body:'Paste BRAND_DNA + prompt vào AI. Nó viết headline, sub, bullets, CTA, section proof theo đúng sản phẩm bạn.' },
              { n:'3', head:'Lắp vào template — 20 phút', body:'Dùng tool miễn phí, lắp copy vào. Template sẵn có, bạn chỉ thay nội dung, không cần thiết kế từ đầu.' },
              { n:'4', head:'Chạy checklist 12 điểm — 5 phút', body:'Kiểm tra nhanh 12 điểm trước khi đăng. Không bỏ sót phần nào làm khách đọc xong không mua.' },
            ].map(s => (
              <div key={s.n} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#0D2B1A] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#F6F0E4] text-xs font-black">{s.n}</span>
                </div>
                <div>
                  <p className="font-bold text-[#0D2B1A] text-sm">{s.head}</p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [6] FEATURES */}
      <section id="co-gi" className="bg-white border-y border-[#DDD8CB] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Nội dung</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Bạn nhận được gì</h2>
          </div>

          {/* Main skills */}
          <div className="space-y-3">
            {INCLUDES.map((item, i) => (
              <div key={i} className="border border-[#DDD8CB] rounded-2xl p-5 flex items-start gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-bold text-[#0D2B1A] text-sm">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* BONUS: Content System */}
          <div className="bg-[#EAF5EF] border-2 border-[#2D7A4F]/30 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎁</span>
              <div>
                <p className="font-black text-[#0D2B1A] text-sm">TẶNG KÈM: Content Không Cần Cảm Hứng</p>
                <p className="text-xs text-[#3D6B4A] font-medium">Hệ thống Content System trong Notion · Trị giá 368.686đ</p>
              </div>
            </div>
            <div className="space-y-2">
              {CONTENT_SYSTEM_ITEMS.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#2D7A4F] text-xs mt-0.5 flex-shrink-0 font-bold">✓</span>
                  <p className="text-sm text-gray-700 leading-snug">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[#3D6B4A] italic">Đây là hệ thống mình đang dùng thật hằng ngày, không phải template để cho có.</p>
          </div>

          <button onClick={open}
            className="w-full h-14 bg-[#C0390E] hover:bg-[#a02e0a] text-white font-black rounded-2xl transition-colors text-base shadow-lg shadow-red-900/20">
            Giữ Chỗ — 686.868đ →
          </button>
        </div>
      </section>

      {/* [7] EMOTION */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Tuần sau trông như thế này</h2>
          <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-4 text-[#F6F0E4]/80 text-sm leading-relaxed">
            <p>Khách hỏi giá. Bạn gửi 1 link. Họ đọc trang, tự hiểu sản phẩm, tự thấy giá trị, tự thuyết phục bản thân.</p>
            <p className="text-[#F6F0E4]"><strong>Bạn không cần giải thích nữa. Trang làm thay.</strong></p>
            <p>3h sáng có người hỏi mua. Trang vẫn đang chạy. Đơn vẫn về.</p>
            <p>Hôm sau ngồi xuống, AI đề xuất bài viết dựa trên story thật của bạn. Bạn duyệt 10 phút rồi đi uống cafe.</p>
            <p className="text-[#88860B]">Đó là thứ 1 buổi làm và 1 hệ thống bàn giao cho bạn.</p>
          </div>
        </div>
      </section>

      {/* [8] AUTHORITY */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#F6F0E4]">Tại sao tin quy trình này?</h2>
          <div className="space-y-3">
            {[
              { icon:'✅', text:'605+ học viên đã học — không phải con số trên slide, là người thật đăng ký thật' },
              { icon:'🏡', text:'Mình đang dùng chính quy trình này cho homestay + khóa học + tư vấn hằng ngày' },
              { icon:'📓', text:'Content System là workspace Notion mình đang vận hành thật, không phải template demo' },
              { icon:'⏱️', text:'SOP được rút gọn từ 2 năm thử sai — bạn không cần mất 2 năm đó nữa' },
              { icon:'🔄', text:'Mua xong muốn nâng: 686.868đ trừ thẳng vào Khóa 1 (868.686đ)' },
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
            <h2 className="text-2xl font-black text-[#0D2B1A]">686.868đ — ít hơn 1 bữa thuê designer</h2>
            <p className="text-sm text-gray-500">Thuê freelancer làm landing page: 2-5 triệu. Chờ 1-2 tuần. Muốn sửa lại phải nhờ.</p>
          </div>
          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden">
            <div className="bg-[#0D2B1A] px-5 py-3">
              <p className="text-[#F6F0E4] font-bold text-sm">Bạn nhận được</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]">
              {[
                { item:'SOP Làm Landing Page Trong 1 Buổi', value:'690.000đ' },
                { item:'Bộ Prompt AI sẵn dán là chạy',       value:'290.000đ' },
                { item:'Checklist 12 điểm',                   value:'99.000đ' },
                { item:'File BRAND_DNA mẫu',                  value:'199.000đ' },
                { item:'🎁 Content Không Cần Cảm Hứng (Notion)', value:'368.686đ', bonus:true },
              ].map((r, i) => (
                <div key={i} className={`px-5 py-3 flex justify-between items-center ${r.bonus ? 'bg-[#EAF5EF]' : ''}`}>
                  <p className={`text-sm ${r.bonus ? 'font-semibold text-[#2D7A4F]' : 'text-gray-700'}`}>{r.item}</p>
                  <p className={`text-sm font-bold flex-shrink-0 ml-4 ${r.bonus ? 'text-[#2D7A4F]' : 'text-gray-400'}`}>{r.value}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-[#FAF7F2] flex justify-between items-center">
              <p className="font-bold text-[#0D2B1A]">Tổng giá trị</p>
              <p className="text-lg font-black text-gray-400 line-through">1.646.686đ</p>
            </div>
            <div className="px-5 py-4 bg-[#EAF5EF] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#0D2B1A]">Học phí</p>
                <p className="text-xs text-[#3D6B4A]">Có thể trừ vào Khóa 1 (868.686đ) nếu nâng cấp</p>
              </div>
              <p className="text-3xl font-black text-[#0D2B1A]">686.868đ</p>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-lg font-black rounded-2xl transition-colors shadow-xl shadow-red-900/25">
              Đăng Ký Ngay — 686.868đ →
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
              Mình tin vào chất lượng đủ để đặt cam kết này. Nếu bạn học xong mà thấy SOP không giúp được gì,
              nhắn Telegram là xong. Mình không giữ tiền của người không thấy giá trị.
            </p>
          </div>
        </div>
      </section>

      {/* [11] IS FOR / NOT FOR */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Khóa này dành cho ai?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-[#2D7A4F] text-sm">✓ DÀNH CHO BẠN NẾU:</p>
              <div className="space-y-2">
                {[
                  'Đang bán hàng qua inbox mà chưa có trang bán chuyên nghiệp',
                  'Muốn tự làm trang bán hàng mà không biết bắt đầu từ đâu',
                  'Không muốn thuê người vì tốn tiền, chờ đợi và phụ thuộc',
                  'Cần hệ thống content chạy đều mà không phụ thuộc cảm hứng',
                ].map((t, i) => <p key={i} className="text-sm text-gray-700 leading-snug">• {t}</p>)}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-gray-500 text-sm">✗ KHÔNG PHÙ HỢP NẾU:</p>
              <div className="space-y-2">
                {[
                  'Đã có Khóa 1 (đã bao gồm Landing Page + Content System rồi)',
                  'Cần hệ thống đầy đủ hơn 1 skill (xem Khóa 1)',
                  'Muốn người khác làm thay thay vì tự làm',
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

      {/* [12B] SOCIAL PROOF */}
      <section className="px-4 py-14 bg-[#FAF7F2] border-y border-[#DDD8CB]">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Học viên nói gì</h2>
          <div className="space-y-4">
            {[
              {
                stars: 5,
                quote: 'Mình không biết code, không biết thiết kế. Làm theo SOP đúng 1 buổi là có trang thật chạy được. Bài học quan trọng nhất là BRAND_DNA — từ đó viết gì AI cũng ra đúng giọng mình hơn.',
                name:  'Quỳnh Như',
                role:  'Bán mỹ phẩm online',
                result:'Có trang bán hàng trong 1 buổi',
              },
              {
                stars: 5,
                quote: 'Trước mình trả 2 triệu cho người làm landing page rồi chờ 2 tuần. Giờ mình tự làm trong vài giờ, muốn chỉnh gì sửa ngay. Kèm theo Content System là thứ mình dùng mỗi ngày.',
                name:  'Hoàng Tuấn',
                role:  'Coach sức khoẻ',
                result:'Tiết kiệm 2 triệu + 2 tuần chờ',
              },
              {
                stars: 5,
                quote: 'Bảo hành 14 ngày nên mình cứ thử. Kết quả là sau 3 ngày đầu mình đã dùng được cả bộ prompt để viết trang bán hàng cho 3 dịch vụ khác nhau.',
                name:  'Minh Châu',
                role:  'Freelancer tư vấn marketing',
                result:'Có prompt dùng được cho 3 sản phẩm',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3">
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
          <p className="text-center text-xs text-gray-400 italic">Kết quả thay đổi tùy người và business. Đây là ví dụ từ học viên thật — không phải cam kết.</p>
        </div>
      </section>

      {/* [13] CTA FINAL */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
            1 buổi từ bây giờ,<br/>bạn có thể đã có trang bán hàng thật.
          </h2>
          <p className="text-gray-500 text-sm">Hoặc tiếp tục giải thích qua inbox với từng khách một.</p>
          <button onClick={open}
            className="w-full h-16 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-base font-black rounded-2xl transition-colors shadow-xl shadow-red-900/25">
            Bắt Đầu Ngay — 686.868đ →
          </button>
          <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
            <span>✓ 686.868đ</span>
            <span>✓ Bảo hành 14 ngày</span>
            <span>✓ Có thể nâng lên Khóa 1</span>
          </div>
        </div>
      </section>

      {/* [14] FOOTER */}
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
          </div>
        </div>
      </footer>

      {/* STICKY */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D2B1A] border-t border-[#F6F0E4]/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
          <div className="min-w-0">
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Trang Bán Hàng + Content System — 686.868đ</p>
            <p className="text-[#F6F0E4]/50 text-xs">Bảo hành 14 ngày · Có thể trừ vào Khóa 1</p>
          </div>
          <button onClick={open}
            className="flex-shrink-0 bg-[#C0390E] hover:bg-[#a02e0a] text-white font-bold px-5 h-11 rounded-xl text-sm transition-colors">
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
