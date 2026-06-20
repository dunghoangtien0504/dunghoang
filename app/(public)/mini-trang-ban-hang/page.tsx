'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS } from '@/lib/products'

const product = PRODUCTS.mini_368

const INCLUDES = [
  { icon:'🎯', title:'SOP Làm Landing Page Trong 1 Giờ', desc:'Quy trình từng bước: từ không có gì đến trang bán hàng chạy thật — không cần code, không cần thiết kế.' },
  { icon:'📝', title:'Bộ Prompt Sẵn — Dán Là Chạy',       desc:'Prompt viết headline, bullets, CTA, section proof. AI viết theo đúng giọng bạn sau khi điền BRAND_DNA.' },
  { icon:'🧩', title:'Checklist 12 Điểm Trang Bán Hàng',  desc:'Trước khi bấm đăng: 12 điểm kiểm tra nhanh. Không bỏ sót phần nào làm khách thoát trang.' },
  { icon:'🎁', title:'File BRAND_DNA Mẫu (Kèm Theo)',      desc:'Điền 15 phút là AI biết bạn là ai. Dùng lại cho mọi thứ sau này — không chỉ landing page.' },
]

const FAQS = [
  { q:'Không biết code có làm được không?',
    a:'Được. Không cần code, không cần thiết kế. SOP dùng công cụ có sẵn (có thể là Canva, Notion, hoặc tool miễn phí). Bạn chỉ cần máy tính và kết nối mạng.' },
  { q:'Học xong mất bao lâu để có trang thật?',
    a:'1 giờ cho trang đầu tiên nếu làm theo đúng SOP. Mình test với nhiều người — ai cũng có trang chạy được trong buổi học hôm đó.' },
  { q:'Đã có Khóa 1 rồi thì Mini có ích không?',
    a:'Khóa 1 gồm cả mini này bên trong. Nếu bạn đã mua Khóa 1 thì không cần mua riêng.' },
  { q:'368k trừ vào Khóa 1 như thế nào?',
    a:'Khi bạn muốn nâng lên Khóa 1 (686.868đ), 368k bạn đã trả sẽ được trừ thẳng. Chỉ cần thêm 318.868đ là có trọn bộ 25 skill.' },
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

      {/* Nav */}
      <nav className="bg-[#0D2B1A] px-4 py-3 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-[#F6F0E4] font-black font-mono text-sm">DungHoang.com</span>
          <button onClick={open} className="bg-[#C0390E] hover:bg-[#a02e0a] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
            Đăng ký 368k →
          </button>
        </div>
      </nav>

      {/* [1] HERO */}
      <section ref={heroRef} className="bg-[#0D2B1A] px-4 pt-14 pb-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-block bg-[#C0390E]/20 text-[#E87C5E] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Mini Course · AI Bán Hàng · 1 Skill Duy Nhất
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F6F0E4] leading-tight">
            Làm Landing Page<br/>
            <span className="text-[#C0390E]">Bằng AI — Trong 1 Giờ</span><br/>
            <span className="text-2xl sm:text-3xl font-bold text-[#F6F0E4]/70">Không cần code, không cần thiết kế</span>
          </h1>
          <p className="text-[#F6F0E4]/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            SOP từng bước + bộ prompt sẵn + checklist 12 điểm.
            Cuối buổi bạn có trang bán hàng thật chạy được — không phải bài tập trên lớp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={open}
              className="h-14 px-8 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-base font-black rounded-2xl transition-colors shadow-lg shadow-red-900/30">
              Bắt Đầu Ngay — 368.000đ →
            </button>
            <a href="#co-gi"
              className="h-14 px-8 border border-[#F6F0E4]/20 text-[#F6F0E4]/70 hover:text-[#F6F0E4] text-sm font-medium rounded-2xl flex items-center justify-center transition-colors">
              Xem trong khóa có gì →
            </a>
          </div>
          <p className="text-[#F6F0E4]/40 text-xs">368k có thể trừ vào Khóa 1 sau này nếu bạn muốn nâng cấp</p>
        </div>
      </section>

      {/* [2] TRUST BAR */}
      <section className="bg-white border-y border-[#DDD8CB] py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { n:'605+', label:'học viên đã học' },
              { n:'1h',   label:'có trang thật ngay' },
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
            <p>Không phải vì sản phẩm không tốt. Mà vì họ không có đủ thông tin để quyết định — và bạn không có chỗ nào để đặt hết thông tin đó ra.</p>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-3">
            <p className="font-bold text-[#0D2B1A] text-sm">Hậu quả thực tế:</p>
            {[
              'Mỗi tháng tự nhẩm tính có bao nhiêu khách đã bỏ đi vì không đủ thông tin',
              'Vẫn phải giải thích lại từ đầu với từng khách — mất 20-30 phút/người',
              'Đối thủ có trang bán hàng đẹp → khách tin hơn dù sản phẩm chưa chắc tốt hơn',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-orange-500 text-xs mt-1 flex-shrink-0">→</span>
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>

          <div className="border-l-4 border-[#C0390E] pl-4">
            <p className="text-gray-700 leading-relaxed italic">
              "Một trang bán hàng tốt không thay thế bạn — nó làm công việc giải thích hộ bạn <strong className="not-italic text-[#0D2B1A]">24/7</strong>, kể cả lúc 3h sáng khi bạn đang ngủ."
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
            <p className="text-[#F6F0E4]"><strong>Bây giờ: mình làm trang mới trong 1 giờ.</strong> AI viết copy. Công cụ miễn phí lo phần thiết kế. Mình chỉ cần biết mình muốn nói gì với khách.</p>
            <p>Khóa này là toàn bộ quy trình đó — đóng gói thành SOP từng bước, kèm prompt sẵn để bạn chỉ việc điền vào.</p>
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
              { n:'1', head:'Nạp BRAND_DNA — 15 phút', body:'Điền file BRAND_DNA: bạn là ai, bán gì, cho ai, giọng viết như thế nào. Làm 1 lần, dùng mãi.' },
              { n:'2', head:'Dùng prompt tạo copy — 20 phút', body:'Paste BRAND_DNA + prompt vào AI. Nó viết headline, sub, bullets, CTA, section proof theo đúng sản phẩm bạn.' },
              { n:'3', head:'Lắp vào template — 20 phút', body:'Dùng tool miễn phí, lắp copy vào. Không cần thiết kế từ đầu — template sẵn có, bạn chỉ thay nội dung.' },
              { n:'4', head:'Chạy checklist 12 điểm — 5 phút', body:'Kiểm tra nhanh 12 điểm trước khi đăng. Không bỏ sót phần nào làm khách thoát trang.' },
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
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Nội dung</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Bạn nhận được gì</h2>
          </div>
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
          <button onClick={open}
            className="w-full h-14 bg-[#C0390E] hover:bg-[#a02e0a] text-white font-black rounded-2xl transition-colors text-base shadow-lg shadow-red-900/20">
            Giữ Chỗ — 368.000đ →
          </button>
        </div>
      </section>

      {/* [7] EMOTION */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Tưởng tượng tuần sau</h2>
          <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-4 text-[#F6F0E4]/80 text-sm leading-relaxed">
            <p>Khách hỏi giá. Bạn gửi 1 link. Họ đọc trang — tự hiểu sản phẩm, tự thấy giá trị, tự thuyết phục bản thân.</p>
            <p className="text-[#F6F0E4]"><strong>Bạn không cần giải thích nữa. Trang làm thay.</strong></p>
            <p>3h sáng có người hỏi mua. Trang vẫn đang chạy. Đơn vẫn về.</p>
            <p className="text-[#88860B]">Đó là thứ 368k và 1 buổi làm cho bạn.</p>
          </div>
        </div>
      </section>

      {/* [8] AUTHORITY */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#F6F0E4]">Tại sao tin SOP này?</h2>
          <div className="space-y-3">
            {[
              { icon:'✅', text:'605+ học viên đã học — không phải con số trên slide, là người thật đăng ký thật' },
              { icon:'🏡', text:'Mình đang dùng chính quy trình này cho homestay + khoá học + tư vấn — không phải demo' },
              { icon:'⏱️', text:'SOP được rút gọn từ 2 năm thử sai — bạn không cần mất 2 năm đó nữa' },
              { icon:'🔄', text:'Mua Mini xong muốn nâng: 368k trừ thẳng vào Khóa 1 (686.868đ)' },
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
            <h2 className="text-2xl font-black text-[#0D2B1A]">368.000đ — tương đương 1 buổi cafe</h2>
          </div>
          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden">
            <div className="bg-[#0D2B1A] px-5 py-3">
              <p className="text-[#F6F0E4] font-bold text-sm">Bạn nhận được</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]">
              {[
                { item:'SOP Làm Landing Page Trong 1 Giờ', value:'490.000đ' },
                { item:'Bộ Prompt AI sẵn dán là chạy',     value:'290.000đ' },
                { item:'Checklist 12 điểm',                 value:'99.000đ' },
                { item:'BONUS: File BRAND_DNA mẫu',         value:'199.000đ', bonus:true },
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
              <p className="text-lg font-black text-gray-400 line-through">1.078.000đ</p>
            </div>
            <div className="px-5 py-4 bg-[#EAF5EF] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#0D2B1A]">Học phí</p>
                <p className="text-xs text-[#3D6B4A]">Có thể trừ vào Khóa 1 nếu nâng cấp</p>
              </div>
              <p className="text-3xl font-black text-[#0D2B1A]">368.000đ</p>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-lg font-black rounded-2xl transition-colors shadow-xl shadow-red-900/25">
              Đăng Ký Ngay — 368.000đ →
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
              Mình tin vào chất lượng đủ để đặt cam kết này. Nếu bạn học xong mà thấy SOP không giúp được gì —
              nhắn Telegram là xong. Mình không giữ tiền của người không thấy giá trị.
            </p>
          </div>
        </div>
      </section>

      {/* [11] IS FOR / NOT FOR */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Mini course này dành cho ai?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-[#2D7A4F] text-sm">✓ DÀNH CHO BẠN NẾU:</p>
              <div className="space-y-2">
                {[
                  'Đang bán hàng qua inbox mà chưa có trang bán chuyên nghiệp',
                  'Muốn tự làm trang bán hàng mà không biết bắt đầu từ đâu',
                  'Không muốn thuê người (tốn tiền + chờ đợi + phụ thuộc)',
                  'Có sản phẩm/dịch vụ thật và muốn bán online tốt hơn',
                ].map((t, i) => <p key={i} className="text-sm text-gray-700 leading-snug">• {t}</p>)}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-gray-500 text-sm">✗ KHÔNG PHÙ HỢP NẾU:</p>
              <div className="space-y-2">
                {[
                  'Đã có Khóa 1 (skill này nằm trong Khóa 1 rồi)',
                  'Cần hệ thống đầy đủ hơn 1 skill',
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

      {/* [13] CTA FINAL */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
            1 giờ từ bây giờ —<br/>bạn có thể đã có trang bán hàng thật.
          </h2>
          <p className="text-gray-500 text-sm">Hoặc tiếp tục giải thích qua inbox với từng khách một.</p>
          <button onClick={open}
            className="w-full h-16 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-base font-black rounded-2xl transition-colors shadow-xl shadow-red-900/25">
            Quyết Định Hôm Nay — Bắt Đầu Làm Ngay →
          </button>
          <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
            <span>✓ 368k</span>
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
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Mini Course Trang Bán Hàng — 368k</p>
            <p className="text-[#F6F0E4]/50 text-xs">Bảo hành 14 ngày · Trừ vào Khóa 1 nếu nâng</p>
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
