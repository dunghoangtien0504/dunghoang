'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS } from '@/lib/products'

const product = PRODUCTS.khoa2_2768

const FAQS = [
  { q:'AI Agent riêng của mình là cái gì? Giống Tiểu Hà Mã như thế nào?',
    a:'Tiểu Hà Mã là AI agent mình đang dùng thật cho business của mình trên Telegram. Trong Khóa 2, mình setup cho bạn 1 agent tương tự — nhưng được train theo SOP và sản phẩm của riêng bạn. Không phải chatbot trả lời chung chung. Nó biết business của bạn cụ thể.' },
  { q:'Mình setup agent cho bạn theo kiểu nào?',
    a:'Bạn sẽ điền vào bộ câu hỏi về business: sản phẩm gì, khách như thế nào, câu hỏi thường gặp là gì, giọng trả lời muốn ra sao. Mình dựa vào đó để cấu hình agent. Bạn test thử, góp ý, mình chỉnh lại cho đến khi ưng. Sau khi xong, agent chạy trên Telegram của bạn.' },
  { q:'Rollover từ Khóa 1 thế nào?',
    a:'Nếu đã mua Khóa 1 (868.686đ), số tiền đó được trừ vào Khóa 2. Bạn chỉ cần thêm 3.000.000đ để có toàn bộ Khóa 2 kèm AI Agent riêng. Liên hệ mình qua Telegram để áp dụng.' },
  { q:'Chỉ 20 suất/đợt là thật không?',
    a:'Thật. Setup agent riêng cần mình làm tay từng người, không thể làm hàng loạt. Mỗi đợt 20 suất, hết là đóng đăng ký chờ đợt sau.' },
  { q:'Bảo hành thế nào?',
    a:'14 ngày hoàn 100%. Nếu 14 ngày đầu bạn thấy không phù hợp, nhắn mình, hoàn trong 24 giờ không hỏi lý do.' },
  { q:'Khác gì Khóa 1?',
    a:'Khóa 1: bạn tự học 24 AI agent và tự áp dụng vào business của mình. Khóa 2: bạn có đủ 24 skill của Khóa 1, cộng thêm mình setup riêng 1 AI Agent trên Telegram cho business của bạn và 1 buổi soi hệ thống 1 kèm 1. Phù hợp nếu bạn muốn có AI Agent hoạt động thật, không chỉ học lý thuyết.' },
  { q:'AI Agent sau khi setup thì chạy thế nào?',
    a:'Agent chạy trên Telegram. Bạn hoặc khách hàng nhắn vào là nó trả lời theo đúng cách bạn muốn. Bạn có thể dùng nó để xử lý câu hỏi thường gặp, tư vấn sản phẩm, hoặc hỗ trợ bản thân lúc cần tra cứu SOP nhanh.' },
]

const WEEK_PLAN = [
  {
    w: 'Tuần 1', head: 'Đặt nền móng (Skill 01-04)',
    items: [
      'Skill 01 — Chân Dung Khách Hàng: biết đúng khách, mọi thứ sau mới chuẩn',
      'Skill 02 — BRAND_DNA: dạy AI viết đúng giọng bạn, dùng cho toàn hệ thống',
      'Skill 03 — Tư Duy Offer Kiểu Hormozi: đóng gói offer giá trị cao hơn giá tiền',
      'Skill 04 — Tư Duy Vận Hành Một Mình: lên kế hoạch, ưu tiên việc, review tuần',
      'Setup Tiểu Hà Mã riêng cho business của bạn trên Telegram',
    ],
  },
  {
    w: 'Tuần 2', head: 'Xây hệ thống bán hàng (Skill 05-12)',
    items: [
      'Skill 05 — Cơ Chế Khác Biệt: đặt tên cách bạn làm, khách khó so giá với ai khác',
      'Skill 06 — Mô Hình Doanh Thu: bậc thang sản phẩm từ rẻ tới đắt để khách mua nhiều lần',
      'Skill 07 — Thiết Kế Offer: lời đề nghị khó từ chối + bảo hành + đảo ngược rủi ro',
      'Skill 08 — Mồi Miễn Phí: quà tặng kéo khách lạ để lại liên hệ',
      'Skill 09 — Vẽ Phễu Bán Hàng: sơ đồ từng bước từ khách lạ tới khách mua',
      'Skill 10 — Dựng Landing Page: trang bán hàng chạy được ngay, không cần code',
      'Skill 11 — Làm Đẹp Giao Diện: chỉnh trang đẹp, chuẩn điện thoại, nhìn chuyên nghiệp',
      'Skill 12 — Viết Bài SEO: bài chuẩn Google để khách tự tìm tới không tốn tiền ads',
    ],
  },
  {
    w: 'Tuần 3', head: 'Kéo traffic & chốt đơn (Skill 13-17)',
    items: [
      'Skill 13 — Quảng Cáo Facebook/TikTok: viết nhiều góc độ để test, giữ mẫu nào ra đơn rẻ',
      'Skill 14 — Kịch Bản Video Bán Hàng: từ hook đầu tới lời kêu gọi cuối, sẵn để quay',
      'Skill 15 — Chuỗi Email Bán Hàng: email nuôi dưỡng và chốt sau khi khách để lại email',
      'Skill 16 — Vớt Khách Nguội: nhắn lại người từng quan tâm nhưng chưa mua',
      'Skill 17 — Kịch Bản Gọi Chốt Đơn: script tư vấn qua điện thoại + xử lý từ chối',
    ],
  },
  {
    w: 'Tuần 4', head: 'Tự động hóa vận hành (Skill 18-24)',
    items: [
      'Skill 18 — Hệ Thống Content Đa Kênh: 1 nội dung nhân ra nhiều dạng FB/TikTok/YouTube',
      'Skill 19 — Marketing Việt Nam: framework điền vào là có nội dung đúng nền tảng VN',
      'Skill 20 — Carousel Instagram: nhiều slide dạy hoặc kể chuyện, caption + hashtag sẵn',
      'Skill 21 — Tiêu Đề Thu Hút: 10 tiêu đề mỗi lần, nhiều kiểu để chọn cái hiệu quả nhất',
      'Skill 22 — Chatbot Messenger & Instagram: bot trả lời khách tự động trên Page của bạn',
      'Skill 23 — Nghiên Cứu Tài Liệu Bằng AI: tóm tắt, hỏi đáp, tạo quiz từ tài liệu thật',
      'Skill 24 — Tiểu Hà Mã (GoClaw): tối ưu AI đội trưởng theo đúng SOP business bạn đã xây',
    ],
  },
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

export default function Khoa2Page() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSticky,   setShowSticky]   = useState(false)
  const [slots,        setSlots]        = useState(20)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { threshold: 0 })
    if (heroRef.current) obs.observe(heroRef.current)
    return () => obs.disconnect()
  }, [])

  const open = () => setShowCheckout(true)

  return (
    <div className="min-h-screen bg-[#F6F0E4] font-sans">

      {/* SCARCITY BAR */}
      <div className="bg-[#C0390E] text-white text-center py-2 px-4 text-xs sm:text-sm font-medium">
        ⚡ Đợt này chỉ còn <strong className="font-mono">{slots} suất</strong> · AI Agent cần setup riêng từng người, không thể nhận thêm
      </div>


      {/* [1] HERO */}
      <section ref={heroRef} className="bg-[#0D2B1A] px-4 pt-14 pb-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-block bg-[#C0390E]/20 text-[#E87C5E] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Khóa 2 · Bản Có Đội Trưởng · 20 Suất/Đợt
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F6F0E4] leading-tight">
            24 AI Agent for Business<br/>
            <span className="text-[#C0390E]">+ AI Đội Trưởng Của Riêng Bạn</span>
          </h1>
          <p className="text-[#F6F0E4]/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Phiên bản đầy đủ nhất. Học đủ 24 AI Agent như Khóa 1.
            Thêm: mình setup riêng 1 AI Agent trên Telegram cho business của bạn — biết sản phẩm bạn, biết khách bạn, hoạt động thật.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={open}
              className="h-14 px-8 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.03] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40">
              Giữ Suất · 3.868.686đ →
            </button>
            <a href="#ke-hoach"
              className="h-14 px-8 border border-[#F6F0E4]/20 text-[#F6F0E4]/70 hover:text-[#F6F0E4] text-sm font-medium rounded-2xl flex items-center justify-center transition-colors">
              Xem Khóa 2 gồm gì →
            </a>
          </div>
          <p className="text-[#F6F0E4]/40 text-xs">Đã mua Khóa 1 (868.686đ)? Chỉ cần thêm 3.000.000đ · Bảo hành 14 ngày hoàn 100%</p>
        </div>
      </section>

      {/* [2] TRUST BAR */}
      <section className="bg-white border-y border-[#DDD8CB] py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { n:'24',      label:'AI Agent học được' },
              { n:'1',       label:'AI Agent cài riêng cho bạn' },
              { n:'20',      label:'suất/đợt tối đa' },
              { n:'14 ngày', label:'bảo hành hoàn 100%' },
            ].map(s => (
              <div key={s.n}>
                <p className="text-xl sm:text-2xl font-black text-[#0D2B1A]">{s.n}</p>
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
            <p className="text-xs font-bold text-[#C0390E] uppercase tracking-widest">Thực trạng</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
              Khóa 1 bạn học 24 skill.<br/>Khóa 2 bạn có thêm AI Agent hoạt động thật.
            </h2>
          </div>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Học skill là một chuyện. Có AI thật đang chạy cho business của mình là chuyện khác.</p>
            <p>Khóa 2 sinh ra vì nhiều người học Khóa 1 xong muốn bước tiếp: không chỉ biết cách làm, mà có AI Agent đang làm thật cho mình — đúng giọng, đúng sản phẩm, đúng cách mình muốn.</p>
          </div>
          <div className="space-y-3">
            {[
              { icon:'🤖', head:'Khóa 1: bạn học cách dùng 24 AI Agent', body:'Hiểu từng skill, có SOP, có prompt. Tự áp dụng vào business theo nhịp của mình.' },
              { icon:'⚡', head:'Khóa 2: thêm AI Agent cài riêng cho bạn', body:'Mình setup 1 AI Agent trên Telegram cho business của bạn cụ thể. Biết sản phẩm bạn, biết khách bạn, trả lời theo cách bạn muốn.' },
              { icon:'🔍', head:'Thêm: 1 buổi soi hệ thống 1 kèm 1', body:'Nhìn vào business của bạn cùng nhau, xem đang dùng AI đúng chỗ chưa, bước tiếp nên làm gì.' },
            ].map((p, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-xl p-4 flex items-start gap-3 transition-all duration-200 hover:shadow-md hover:border-brand-border/20 hover:translate-y-[-2px]">
                <span className="text-lg flex-shrink-0">{p.icon}</span>
                <div>
                  <p className="font-bold text-[#0D2B1A] text-sm">{p.head}</p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={open}
            className="w-full h-14 bg-[#0D2B1A] hover:bg-[#153f27] active:scale-[0.97] hover:scale-[1.01] text-[#F6F0E4] font-bold rounded-2xl transition-all duration-200 shadow-md">
            Tôi Muốn Có AI Agent Của Riêng Mình →
          </button>
        </div>
      </section>

      {/* [4] BRIDGE */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <p className="text-xs font-bold text-[#88860B] uppercase tracking-widest">Tiểu Hà Mã là gì</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F6F0E4] leading-tight">
            AI Agent mình đang dùng thật.<br/>Và sẽ setup một cái y vậy cho bạn.
          </h2>
          <div className="space-y-4 text-[#F6F0E4]/75 text-sm sm:text-base leading-relaxed">
            <p>Tiểu Hà Mã là AI agent mình cài trên Telegram cho chính business của mình. Nó biết toàn bộ SOP, biết sản phẩm, biết cách mình muốn trả lời khách. Mình hỏi nó bất cứ lúc nào là có câu trả lời ngay.</p>
            <p>Trong Khóa 2, mình làm y vậy cho bạn. Điền vào bộ câu hỏi về business của bạn, mình dựa vào đó cài agent. Bạn test thử, mình chỉnh đến khi ưng.</p>
            <p className="text-[#F6F0E4]"><strong>Không phải chatbot trả lời chung chung.</strong> Agent của bạn biết bạn đang bán gì, khách thường hỏi gì, và trả lời theo cách bạn muốn.</p>
            <p className="text-[#F6F0E4]/60 italic">Mình đang dùng thật hàng ngày. Nên mình biết cài cho bạn là được.</p>
          </div>
        </div>
      </section>

      {/* [5] KE HOACH */}
      <section id="ke-hoach" className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Khóa 2 gồm gì</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">24 AI Agent + AI Đội Trưởng của bạn</h2>
            <p className="text-sm text-gray-500">4 tuần học đủ 24 skill. Song song mình setup AI Agent riêng cho bạn.</p>
          </div>
          <div className="space-y-3">
            {WEEK_PLAN.map(w => (
              <div key={w.w} className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-md hover:border-brand-border/30 hover:translate-y-[-2px]">
                <div className="bg-[#0D2B1A] px-5 py-3 flex items-center gap-3">
                  <span className="text-[#C0390E] font-black text-xs font-mono">{w.w}</span>
                  <span className="text-[#F6F0E4] font-bold text-sm">{w.head}</span>
                </div>
                <div className="px-5 py-3 space-y-1.5">
                  {w.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[#2D7A4F] text-xs">✓</span>
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={open}
            className="w-full h-14 bg-[#C0390E] hover:bg-[#a02e0a] text-white font-black rounded-2xl transition-colors shadow-lg shadow-red-900/20">
            Giữ Suất · 3.868.686đ →
          </button>
        </div>
      </section>

      {/* [7] EMOTION */}
      <section className="bg-white border-y border-[#DDD8CB] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Sau Khóa 2: bạn có gì trong tay</h2>
          <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-4 text-[#F6F0E4]/80 text-sm leading-relaxed">
            <p>Bạn biết cách dùng 24 AI Agent vào đúng việc trong business của mình.</p>
            <p>Và bạn có 1 AI Agent đang chạy thật trên Telegram — biết sản phẩm bạn, trả lời theo cách bạn muốn.</p>
            <p className="text-[#F6F0E4]"><strong>Không phải học xong để đó. Là học xong có cái chạy được ngay.</strong></p>
            <p>Mình đang dùng y vậy cho business của mình. Nên mình biết nó làm được gì và cài cho bạn như thế nào.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { before:'Học skill rồi để đó',        after:'24 skill + AI Agent chạy thật' },
              { before:'Tự mày mò cài agent',         after:'Mình cài tay, bạn dùng luôn' },
              { before:'Prompt chung chung',          after:'Agent biết đúng business bạn' },
              { before:'Hỏi không ai trả lời',       after:'1 buổi soi hệ thống 1 kèm 1' },
            ].map((r, i) => (
              <div key={i} className="bg-[#F6F0E4] rounded-xl border border-[#DDD8CB] p-3">
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
          <h2 className="text-2xl font-black text-[#F6F0E4]">Khóa 2 gồm 3 phần</h2>
          <div className="space-y-4">
            {[
              { icon:'📚', head:'Phần 1: 24 AI Agent for Business (đầy đủ như Khóa 1)', body:'Toàn bộ 24 skill trong khu học. Video + SOP + prompt sẵn cho từng bước. Học theo nhịp của bạn, không deadline.' },
              { icon:'🤖', head:'Phần 2: Mình setup AI Agent riêng cho bạn trên Telegram', body:'Bạn điền bộ câu hỏi về business. Mình dựa vào đó cài agent biết đúng sản phẩm, đúng khách, đúng cách bạn muốn trả lời. Bạn test thử, mình chỉnh cho đến khi ưng.' },
              { icon:'🔍', head:'Phần 3: 1 buổi Soi Hệ Thống 1 kèm 1', body:'Gặp trực tiếp qua video call. Nhìn vào business của bạn cùng nhau: đang dùng AI đúng chỗ chưa, bước tiếp nên làm gì, chỗ nào đang có lỗ hổng.' },
            ].map(a => (
              <div key={a.icon} className="flex items-start gap-4 bg-[#F6F0E4]/5 rounded-xl p-4">
                <span className="text-2xl flex-shrink-0">{a.icon}</span>
                <div>
                  <p className="font-bold text-[#F6F0E4] text-sm">{a.head}</p>
                  <p className="text-[#F6F0E4]/60 text-sm mt-1 leading-relaxed">{a.body}</p>
                </div>
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
            <h2 className="text-2xl font-black text-[#0D2B1A]">So sánh thực tế trước khi quyết định</h2>
          </div>

          {/* So sánh */}
          <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-2xl p-5 space-y-3">
            <p className="font-bold text-[#0D2B1A] text-sm">Nếu thuê người làm thay hoặc tự làm:</p>
            {[
              { item:'Thuê freelancer setup chatbot 1 lần', cost:'5-15 triệu' },
              { item:'Tự học mày mò cài agent (thời gian)', cost:'2-4 tuần' },
              { item:'Tư vấn 1 kèm 1 với chuyên gia AI',   cost:'3-5 triệu/buổi' },
              { item:'Khóa học AI + riêng phần agent setup', cost:'5-10 triệu' },
            ].map((r, i) => (
              <div key={i} className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{r.item}</p>
                <p className="text-sm font-bold text-red-500">{r.cost}</p>
              </div>
            ))}
            <div className="border-t border-[#DDD8CB] pt-3">
              <p className="text-sm text-gray-500">Khóa 2: 24 skill + setup agent thật + soi hệ thống — gói trong 1 lần.</p>
            </div>
          </div>

          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden">
            <div className="bg-[#0D2B1A] px-5 py-3">
              <p className="text-[#F6F0E4] font-bold text-sm">Khóa 2 · Bản Có Đội Trưởng</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]">
              {[
                { item:'24 AI Agent for Business — đầy đủ như Khóa 1', value:'868.686đ' },
                { item:'Setup AI Agent riêng cho bạn trên Telegram',    value:'3.000.000đ' },
                { item:'Buổi Soi Hệ Thống 1 kèm 1 (video call)',        value:'1.000.000đ', bonus:true },
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
              <p className="font-bold text-[#0D2B1A]">Giá trị tổng cộng</p>
              <p className="text-xl font-black text-gray-400 line-through">4.868.686đ</p>
            </div>
            <div className="px-5 py-4 bg-[#EAF5EF] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#0D2B1A]">Trả 1 lần, dùng mãi</p>
                <p className="text-xs text-[#3D6B4A]">Đã mua Khóa 1 (868.686đ)? Chỉ thêm 3.000.000đ</p>
              </div>
              <p className="text-3xl font-black text-[#0D2B1A]">3.868.686đ</p>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-lg font-black rounded-2xl transition-colors shadow-xl shadow-red-900/25">
              Giữ Suất · 3.868.686đ →
            </button>
            <p className="text-center text-xs text-gray-400">Chuyển khoản · Xác nhận 5-10 phút · Bảo hành 14 ngày hoàn 100%</p>
          </div>
        </div>
      </section>

      {/* [10] GUARANTEE */}
      <section className="bg-[#EAF5EF] border-y border-[#2D7A4F]/20 px-4 py-12">
        <div className="max-w-2xl mx-auto flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#2D7A4F] flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🛡️</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#0D2B1A]">Cam kết kép</h3>
            <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
              <p><strong className="text-[#0D2B1A]">1. Bảo hành 14 ngày hoàn 100%:</strong> Không phù hợp trong 14 ngày đầu → nhắn mình, hoàn trong 24h không hỏi lý do.</p>
              <p><strong className="text-[#0D2B1A]">2. Setup agent đến khi ưng:</strong> Mình chỉnh agent theo phản hồi của bạn cho đến khi nó hoạt động đúng cách bạn muốn. Không setup xong rồi bỏ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* [11] IS FOR / NOT FOR */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Khóa 2 dành cho ai?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-[#2D7A4F] text-sm">✓ DÀNH CHO:</p>
              <div className="space-y-2">
                {[
                  'Đã học Khóa 1 (hoặc mua luôn Khóa 2) và muốn có AI Agent hoạt động thật, không chỉ học lý thuyết',
                  'Có business đang chạy, muốn AI Agent biết đúng sản phẩm và khách hàng của mình',
                  'Muốn tiết kiệm thời gian mày mò tự cài — nhờ mình setup tay cho',
                  'Muốn có 1 buổi ngồi nhìn vào business để biết đang dùng AI đúng hướng chưa',
                ].map((t, i) => <p key={i} className="text-sm text-gray-700 leading-snug">• {t}</p>)}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-gray-500 text-sm">✗ KHÔNG PHẢI CHO:</p>
              <div className="space-y-2">
                {[
                  'Chưa có sản phẩm/dịch vụ thật — agent cần biết bạn bán gì mới cài được',
                  'Muốn AI Agent tự kiếm tiền mà không cần làm gì từ phía bạn',
                  'Chưa chắc AI có phù hợp không — thử Khóa 1 trước rồi nâng cấp sau',
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
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Học viên Khóa 2</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Học xong + có AI Agent đang chạy thật</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name:'Chủ homestay 3 phòng', result:'Sau khi mình setup AI Agent, inbox câu hỏi thường gặp tự được trả lời. Mình chỉ cần xác nhận đặt phòng. Tiết kiệm mấy tiếng mỗi ngày không cần reply thủ công nữa', outcome:'AI Agent trả lời khách 24/7 đúng thông tin phòng' },
              { name:'Coach kinh doanh',       result:'Agent biết đúng các gói dịch vụ và câu mình hay dùng để tư vấn. Khách hỏi bất cứ lúc nào đều có câu trả lời. Buổi soi hệ thống xong mình biết bước tiếp nên làm gì rồi', outcome:'Agent tư vấn đúng gói, đúng giọng' },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3 transition-all duration-200 hover:shadow-md hover:border-brand-border/20 hover:translate-y-[-2px]">
                <p className="text-sm text-gray-700 leading-relaxed italic">"{t.result}"</p>
                <div className="border-t border-[#EFE9DC] pt-3">
                  <p className="text-xs font-bold text-[#0D2B1A]">{t.name}</p>
                  <p className="text-xs text-[#2D7A4F] font-medium mt-0.5">→ {t.outcome}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400">Kết quả thay đổi tùy business và mức độ thực hiện theo SOP. Đây là ví dụ từ học viên thật.</p>
        </div>
      </section>

      {/* [13] FINAL CTA */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
              Còn {slots} suất đợt này.<br/>Khi hết, đóng đăng ký.
            </h2>
            <p className="text-gray-500 text-sm">Setup AI Agent riêng cần làm tay từng người. Mình không thể nhận thêm.</p>
          </div>

          <div className="bg-[#0D2B1A] rounded-2xl p-5 space-y-3">
            <p className="text-[#F6F0E4] font-bold text-sm">Bạn đang cân nhắc giữa:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-[#C0390E] text-lg">A</span>
                <p className="text-[#F6F0E4]/70 text-sm">Đăng ký hôm nay: học đủ 24 skill + có AI Agent của riêng mình</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#C0390E] text-lg">B</span>
                <p className="text-[#F6F0E4]/70 text-sm">Chờ thêm, và tiếp tục mày mò tự cài trong lúc đó</p>
              </div>
            </div>
            <p className="text-[#88860B] text-sm italic">Cả hai đều hợp lệ. Nhưng nếu bạn muốn có agent thật đang chạy — đợt này còn {slots} suất.</p>
          </div>

          <div className="space-y-3">
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.02] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-xl shadow-red-900/25 hover:shadow-2xl hover:shadow-red-900/40">
              Giữ Suất · 3.868.686đ →
            </button>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 flex-wrap">
              <span>✓ 24 AI Agent for Business</span>
              <span>✓ AI Agent cài riêng cho bạn</span>
              <span>✓ Bảo hành 14 ngày</span>
            </div>
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

      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D2B1A]/95 backdrop-blur-md border-t border-[#F6F0E4]/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-slide-up">
          <div className="min-w-0">
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Khóa 2 · Có Đội Trưởng · {slots} suất</p>
            <p className="text-[#F6F0E4]/50 text-xs">3.868.686đ · 24 skill + AI Agent riêng · Bảo hành 14 ngày</p>
          </div>
          <button onClick={open}
            className="flex-shrink-0 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.03] text-white font-bold px-4 h-11 rounded-xl text-sm transition-all duration-200 whitespace-nowrap">
            Giữ suất →
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
