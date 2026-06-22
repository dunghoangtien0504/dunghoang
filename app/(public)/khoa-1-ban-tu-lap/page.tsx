'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS } from '@/lib/products'
import { KHOA1_SKILLS, SKILL_GROUPS } from '@/lib/skills'

const product = PRODUCTS.khoa1_686

const FAQS = [
  { q:'Không biết gì về AI thì học được không?',
    a:'Được — đây là đối tượng chính mình viết SOP cho. Mỗi skill có hướng dẫn từng bước. Bạn chỉ cần máy tính, kết nối mạng, và tài khoản ChatGPT hoặc Claude miễn phí.' },
  { q:'Học online hay offline?',
    a:'Học online trên khu học dunghoang.com — mở 24/7, học theo tốc độ của bạn. Mỗi skill là 1 module độc lập, có thể học skill nào trước cũng được.' },
  { q:'Mỗi skill mất bao lâu?',
    a:'Khoảng 30-60 phút nếu làm theo SOP. Cuối mỗi skill có output cụ thể bạn có thể dùng ngay — không phải bài tập nộp lên.' },
  { q:'Đã mua Trang Bán Hàng (686.868đ) thì sao?',
    a:'686.868đ bạn đã trả được trừ thẳng vào Khóa 1. Chỉ cần thêm 181.818đ là có trọn bộ. Liên hệ mình qua Telegram để áp dụng.' },
  { q:'Bảo hành thế nào?',
    a:'14 ngày hoàn 100%. Mua về học thử, không phù hợp thì nhắn mình. Hoàn trong 24 giờ, không hỏi lý do.' },
  { q:'Có khác gì so với Khóa 2?',
    a:'Khóa 1 bạn tự học 24 skill. Khóa 2 có thêm: bộ SOP dựng cả hệ thống 30 ngày + Tiểu Hà Mã kèm sát 24/7 qua Telegram giúp bạn triển khai thực tế trơn tru, không lo bị kẹt.' },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#DDD8CB] rounded-xl overflow-hidden bg-white transition-all duration-200 hover:border-brand-border/40 hover:shadow-sm">
      <button onClick={() => setOpen(o => !o)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 bg-white hover:bg-[#FAF7F2] transition-colors">
        <span className="font-bold text-[#0D2B1A] text-sm leading-snug">{q}</span>
        <span className={`text-[#C0390E] font-bold flex-shrink-0 text-lg transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      <div className={`grid transition-all duration-200 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1 text-sm text-gray-600 leading-relaxed bg-white border-t border-gray-50/50">
            <p>{a}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Khoa1Page() {
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

      {/* ANNOUNCEMENT BAR */}
      <div className="bg-[#88860B] text-white text-center py-2 px-4 text-xs sm:text-sm font-medium">
        605+ solopreneur đã tiết kiệm 4-5 tiếng/ngày · Bảo hành 14 ngày hoàn 100%
      </div>

      <nav className="bg-[#0D2B1A] px-4 py-3 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-[#F6F0E4] font-black font-mono text-sm">DungHoang.com</span>
          <button onClick={open} className="bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.03] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all duration-200">
            Đăng ký 868k →
          </button>
        </div>
      </nav>

      {/* [1] HERO */}
      <section ref={heroRef} className="bg-[#0D2B1A] px-4 pt-14 pb-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-block bg-[#C0390E]/20 text-[#E87C5E] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Khóa 1 · Bản Tự Lập · 24 Skill AI
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F6F0E4] leading-tight">
            24 Skill AI Bán Hàng<br/>
            <span className="text-[#C0390E]">Từ Solopreneur Đang Dùng Thật</span><br/>
            <span className="text-2xl sm:text-3xl font-bold text-[#F6F0E4]/70">Không phải lý thuyết. Không phải demo.</span>
          </h1>
          <p className="text-[#F6F0E4]/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Bộ 24 skill đang chạy trong business của mình mỗi ngày — đóng gói thành SOP từng bước cho bạn tự làm theo.
            Tiết kiệm 4-5 tiếng/ngày, không cần thuê thêm người.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={open}
              className="h-14 px-8 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.03] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40">
              Đăng Ký — 868.686đ →
            </button>
            <a href="#24-skill"
              className="h-14 px-8 border border-[#F6F0E4]/20 text-[#F6F0E4]/70 hover:text-[#F6F0E4] text-sm font-medium rounded-2xl flex items-center justify-center transition-colors">
              Xem đủ 24 skill →
            </a>
          </div>
          <p className="text-[#F6F0E4]/40 text-xs">Đã mua Trang Bán Hàng (686.868đ)? Chỉ cần thêm 181.818đ là có Khóa 1 đầy đủ</p>
        </div>
      </section>

      {/* [2] TRUST BAR */}
      <section className="bg-white border-y border-[#DDD8CB] py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { n:'605+', label:'học viên' },
              { n:'24',   label:'skill AI' },
              { n:'4-5h', label:'tiết kiệm/ngày' },
              { n:'14n',  label:'bảo hành' },
            ].map(s => (
              <div key={s.n}>
                <p className="text-xl sm:text-3xl font-black text-[#0D2B1A]">{s.n}</p>
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
            <p className="text-xs font-bold text-[#C0390E] uppercase tracking-widest">Bức tranh quen thuộc</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
              Kinh doanh một mình.<br/>Mọi thứ đều do bạn tự làm.
            </h2>
          </div>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Sáng viết content. Trưa trả lời inbox. Chiều chạy ads. Tối gửi đơn. Đêm soạn email.</p>
            <p>Không phải vì bạn không cần người — mà vì thuê người thêm chi phí, thêm việc quản lý, thêm rủi ro.</p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-3">
            <p className="font-bold text-[#0D2B1A] text-sm">Điều thực sự đang xảy ra:</p>
            {[
              '1 nhân viên content: 8-12 triệu/tháng. 1 nhân viên ads: 10-15 triệu. 1 người chăm sóc khách: 7-10 triệu. Tổng: 25-37 triệu/tháng.',
              'Bạn đang làm việc của 3-4 người — nhưng không trả lương cho mình.',
              'AI có thể làm phần lớn những việc này với chi phí gần bằng 0. Bạn chỉ chưa có SOP.',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-orange-500 text-xs mt-1 flex-shrink-0">→</span>
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>
          <div className="border-l-4 border-[#C0390E] pl-4">
            <p className="text-gray-700 leading-relaxed italic">
              "24 skill trong khóa này tương đương <strong className="not-italic text-[#0D2B1A]">24 nhân sự AI không bao giờ xin nghỉ</strong> — bạn trả 1 lần 868.686đ, dùng mãi."
            </p>
          </div>
          <button onClick={open}
            className="w-full h-14 bg-[#0D2B1A] hover:bg-[#153f27] active:scale-[0.97] hover:scale-[1.01] text-[#F6F0E4] font-bold rounded-2xl transition-all duration-200 shadow-md">
            Tôi Muốn Có Đội AI Của Mình →
          </button>
        </div>
      </section>

      {/* [4] BRIDGE */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <p className="text-xs font-bold text-[#88860B] uppercase tracking-widest">Cách mình đến đây</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F6F0E4] leading-tight">
            2 năm thử sai → 24 skill AI thực chiến
          </h2>
          <div className="space-y-4 text-[#F6F0E4]/75 text-sm sm:text-base leading-relaxed">
            <p>Mình không bắt đầu từ expert. Mình bắt đầu từ một người vận hành mọi thứ một mình và không đủ tiền thuê team.</p>
            <p>Mình thử dùng AI cho từng việc một. Fail. Chỉnh. Làm lại. Đến khi nào có output dùng được thì mình mới đóng thành SOP.</p>
            <p className="text-[#F6F0E4]"><strong>Kết quả sau 2 năm: 24 SOP chạy được trong business mình thật sự.</strong> Tiết kiệm 4-5 tiếng mỗi ngày. 605 học viên đã làm được điều tương tự.</p>
            <p className="text-[#F6F0E4]/60 italic">Bộ 24 skill trong Khóa 1 là chính xác những gì mình đang dùng — không phải bộ lý thuyết được viết để dạy.</p>
          </div>
        </div>
      </section>

      {/* [6] 24 SKILLS — gom theo 6 nhóm, mô tả output thật */}
      <section id="24-skill" className="px-4 py-14 bg-white border-y border-[#DDD8CB]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">24 skill trong Khóa 1</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Mỗi skill cho bạn một thứ cầm được</h2>
            <p className="text-gray-500 text-sm">Mình ghi rõ skill làm được gì và bạn nhận lại gì — không nói chung chung</p>
          </div>

          <div className="space-y-5">
            {SKILL_GROUPS.map((group, gi) => {
              const items = KHOA1_SKILLS.filter(s => s.group === group)
              return (
                <div key={group} className="border border-[#DDD8CB] rounded-2xl overflow-hidden bg-white transition-all duration-200 hover:shadow-md hover:border-brand-border/30 hover:translate-y-[-2px]">
                  <div className="bg-[#0D2B1A] px-5 py-2.5 flex items-center gap-2">
                    <span className="text-[#C0390E] font-black text-xs font-mono">N{gi + 1}</span>
                    <span className="text-[#F6F0E4] font-bold text-sm">{group}</span>
                    <span className="text-[#F6F0E4]/40 text-xs ml-auto">{items.length} skill</span>
                  </div>
                  <div className="divide-y divide-[#EFE9DC]">
                    {items.map(s => (
                      <div key={s.n} className="px-5 py-3.5 flex items-start gap-3">
                        <span className="text-xs font-black text-[#C0390E] font-mono flex-shrink-0 w-6 pt-0.5">{s.n}</span>
                        <div className="min-w-0">
                          <p className="font-bold text-[#0D2B1A] text-sm flex items-center gap-2 flex-wrap">
                            {s.name}
                            {s.proven && <span className="text-[10px] bg-[#EAF5EF] text-[#2D7A4F] px-1.5 py-0.5 rounded-full font-semibold">đã chứng minh ở Challenge</span>}
                          </p>
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{s.does}</p>
                          <p className="text-xs text-[#3D6B4A] mt-1"><strong>Bạn nhận:</strong> {s.output}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Nói thật về tự động hóa — chống cảm giác bị thổi phồng */}
          <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-xl p-4 text-sm text-gray-600 leading-relaxed">
            <p><strong className="text-[#0D2B1A]">Mình nói thẳng:</strong> 24 skill là 24 quy trình AI làm phần nặng cho bạn (viết, lên ý tưởng, dựng khung).
            Bạn vẫn cần đọc lại, chỉnh cho đúng business của mình, và bấm đăng. Không có thứ gì chạy 100% mà bạn không đụng tay.
            Cái khác biệt là: thay vì mất 2 tiếng viết 1 bài, bạn mất 15 phút duyệt.</p>
          </div>

          <button onClick={open}
            className="w-full h-14 bg-[#C0390E] hover:bg-[#a02e0a] text-white font-black rounded-2xl transition-colors shadow-lg shadow-red-900/20">
            Giữ Chỗ — 868.686đ →
          </button>
        </div>
      </section>

      {/* [7] EMOTION */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Một tháng từ bây giờ</h2>
          <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-4 text-[#F6F0E4]/80 text-sm leading-relaxed">
            <p>6h sáng. Bạn mở điện thoại. Chatbot đã trả lời 12 tin nhắn đêm qua. 3 người hỏi giá, 1 người đặt cọc.</p>
            <p>Bạn mở lịch content. AI đã có 30 bài cho tháng sau — bạn chỉ cần đọc và approve 10 phút.</p>
            <p className="text-[#F6F0E4]"><strong>Business vẫn chạy. Bạn không phải là bottleneck nữa.</strong></p>
            <p className="text-[#88860B]">24 skill là 24 nhân sự AI làm việc song song — bạn chỉ cần quản lý output.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { before: 'Content: 2h/ngày tự viết',   after: 'AI viết: 15 phút approve' },
              { before: 'Inbox: trả lời từng cái',     after: 'Chatbot xử lý tự động' },
              { before: 'Email: soạn thủ công',        after: 'Chuỗi 5 email tự chạy' },
              { before: 'Trang bán: không có',         after: 'Landing page: 1 giờ xong' },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#DDD8CB] p-3">
                <p className="text-xs text-red-400 line-through">{r.before}</p>
                <p className="text-xs text-[#2D7A4F] font-semibold mt-1">✓ {r.after}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [8] AUTHORITY */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#F6F0E4]">Tại sao học từ mình?</h2>
          <div className="space-y-3">
            {[
              { icon:'🏡', text:'Đang vận hành homestay + khoá học + tư vấn AI một mình — 24 skill này đang chạy thật trong business mình' },
              { icon:'👥', text:'605+ học viên đã học — từ chủ shop, coach, freelancer đến solopreneur nhiều ngành' },
              { icon:'📅', text:'SOP được test 2 năm trong thực tế — không phải viết từ sách hay copy từ người khác' },
              { icon:'🔄', text:'Khóa 1 là bước đệm — mua xong muốn nâng, 868.686đ trừ vào Khóa 2 (3.868.686đ)' },
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
            <h2 className="text-2xl font-black text-[#0D2B1A]">868.686đ — thay vì 25 triệu/tháng thuê người</h2>
          </div>
          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden">
            <div className="bg-[#0D2B1A] px-5 py-3">
              <p className="text-[#F6F0E4] font-bold text-sm">Toàn bộ bạn nhận được</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]">
              {[
                { item:'24 SOP AI thực chiến (30-60 phút/skill)',      value:'12.000.000đ' },
                { item:'Skill Landing Page — Làm Trang Bán Hàng',      value:'690.000đ' },
                { item:'Khu học online 24/7 dunghoang.com',            value:'Miễn phí' },
                { item:'Bộ prompt AI cho từng skill',                  value:'2.500.000đ' },
                { item:'🎁 File BRAND_DNA — dạy AI giọng bạn',         value:'199.000đ', bonus:true },
                { item:'🎁 Content Không Cần Cảm Hứng (Notion)',       value:'368.686đ', bonus:true },
              ].map((r, i) => (
                <div key={i} className={`px-5 py-3 flex justify-between items-center ${r.bonus ? 'bg-[#EAF5EF]' : ''}`}>
                  <p className={`text-sm ${r.bonus ? 'font-semibold text-[#2D7A4F]' : 'text-gray-700'}`}>
                    {r.bonus && <span className="text-[#88860B] font-bold">🎁 </span>}{r.item}
                  </p>
                  <p className={`text-sm font-bold flex-shrink-0 ml-4 ${r.bonus ? 'text-[#2D7A4F]' : 'text-gray-400'}`}>{r.value}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-[#FAF7F2] flex justify-between items-center">
              <p className="font-bold text-[#0D2B1A]">Tổng giá trị</p>
              <p className="text-xl font-black text-gray-400 line-through">15.757.686đ</p>
            </div>
            <div className="px-5 py-4 bg-[#EAF5EF] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#0D2B1A]">Học phí</p>
                <p className="text-xs text-[#3D6B4A]">Đã mua Trang Bán Hàng (686.868đ)? Chỉ thêm 181.818đ</p>
              </div>
              <p className="text-3xl font-black text-[#0D2B1A]">868.686đ</p>
            </div>
          </div>

          <div className="bg-[#0D2B1A]/5 rounded-xl p-4 text-sm text-gray-600">
            <p><strong className="text-[#0D2B1A]">So sánh nhanh:</strong> 1 nhân viên content tối thiểu 8 triệu/tháng. Khóa 1 là 868.686đ trả 1 lần — dùng mãi.</p>
          </div>

          <div className="space-y-3">
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-lg font-black rounded-2xl transition-colors shadow-xl shadow-red-900/25">
              Đăng Ký Ngay — 868.686đ →
            </button>
            <p className="text-center text-xs text-gray-400">Chuyển khoản · Xác nhận 5-10 phút · Bảo hành 14 ngày</p>
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
              14 ngày là đủ để bạn thử ít nhất 5-7 skill đầu tiên và thấy kết quả.
              Nếu không thấy gì có ích — hoàn toàn bộ.
            </p>
          </div>
        </div>
      </section>

      {/* [11] IS FOR / NOT FOR */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Khóa 1 dành cho ai?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-[#2D7A4F] text-sm">✓ DÀNH CHO:</p>
              <div className="space-y-2">
                {[
                  'Solopreneur, chủ shop online, coach, freelancer muốn tự làm marketing bằng AI',
                  'Người đang làm 1 mình nhưng muốn kết quả như có team',
                  'Đã mua Mini và muốn nâng lên đủ bộ 24 skill',
                  'Sẵn sàng bỏ 30-60 phút/skill để có công cụ dùng mãi',
                ].map((t, i) => <p key={i} className="text-sm text-gray-700 leading-snug">• {t}</p>)}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-gray-500 text-sm">✗ KHÔNG PHẢI CHO:</p>
              <div className="space-y-2">
                {[
                  'Người muốn AI làm 100% mà không cần học gì',
                  'Người cần ai kèm sát từng bước (xem Khóa 2)',
                  'Người không có sản phẩm/dịch vụ thật để áp dụng',
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
          <div className="text-center space-y-1">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Kết quả thật từ học viên</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">605+ người đã làm được — không phải nghe mình kể</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name:'Chủ shop thời trang online', result:'Từ 2 tiếng viết 1 post xuống 15 phút duyệt — content 30 ngày AI làm sẵn, mình chỉ approve', skill:'Skill #01 + #03 + #06' },
              { name:'Coach sức khỏe freelance',   result:'Chatbot Zalo tự trả lời 70% câu hỏi của khách — mình ngủ ngon hơn, sáng dậy thấy 3 lead mới', skill:'Skill #07 + #08' },
              { name:'Solopreneur bán khóa học',   result:'Landing page xong trong 1 buổi chiều thay vì thuê design 2 tuần — tiết kiệm được khoảng 3 triệu', skill:'Skill #10 Landing Page' },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-4 space-y-3 transition-all duration-200 hover:shadow-md hover:border-brand-border/20 hover:translate-y-[-2px]">
                <p className="text-sm text-gray-700 leading-relaxed italic">"{t.result}"</p>
                <div className="border-t border-[#EFE9DC] pt-3">
                  <p className="text-xs font-bold text-[#0D2B1A]">{t.name}</p>
                  <p className="text-xs text-[#3D6B4A] mt-0.5">{t.skill}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400">Kết quả thay đổi tùy người và business. Đây là ví dụ từ học viên thật — không phải cam kết.</p>
        </div>
      </section>

      {/* [13] CTA FINAL */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
            Bạn đang trả lương cho 1 mình bạn<br/>nhưng làm việc của 4-5 người.
          </h2>
          <p className="text-gray-500 text-sm">868.686đ có thể thay đổi điều đó — và trả 1 lần, dùng mãi.</p>
          <button onClick={open}
            className="w-full h-16 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.02] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-xl shadow-red-900/25 hover:shadow-2xl hover:shadow-red-900/40">
            Quyết Định Hôm Nay — Xây Đội AI Của Mình →
          </button>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 flex-wrap">
            <span>✓ 24 skill thực chiến</span>
            <span>✓ Bảo hành 14 ngày</span>
            <span>✓ Có thể nâng lên Khóa 2</span>
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
            <a href="/khoa-2-ban-co-doi-truong" className="hover:text-[#F6F0E4]/60">Khóa 2</a>
          </div>
        </div>
      </footer>

      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D2B1A]/95 backdrop-blur-md border-t border-[#F6F0E4]/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-slide-up">
          <div className="min-w-0">
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Khóa 1 Bản Tự Lập — 868.686đ</p>
            <p className="text-[#F6F0E4]/50 text-xs">24 skill AI · Bảo hành 14 ngày</p>
          </div>
          <button onClick={open}
            className="flex-shrink-0 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.03] text-white font-bold px-5 h-11 rounded-xl text-sm transition-all duration-200">
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
