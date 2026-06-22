'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS } from '@/lib/products'

const product = PRODUCTS.khoa2_2768

const FAQS = [
  { q:'Tiểu Hà Mã là gì? Khác gì chatbot thường?',
    a:'Tiểu Hà Mã là AI agent mình cài riêng cho bạn trên Telegram. Không phải chatbot trả lời chung chung. Nó biết SOP của bạn, biết sản phẩm của bạn, và kèm bạn theo từng bước. Bạn hỏi đến đâu, nó chỉ đến đó. Mình thiết lập riêng từng người, không dùng chung.' },
  { q:'30 ngày cam kết là cam kết gì?',
    a:'Trong 30 ngày bạn sẽ dựng xong hệ thống: content tự đăng, khách tự được trả lời, đơn tự về. Mình kèm sát qua Telegram, không để bạn kẹt ở bước nào. Nếu làm đủ theo SOP mà không đạt, mình ngồi review lại và sửa cùng bạn.' },
  { q:'Rollover từ Khóa 1 thế nào?',
    a:'Nếu đã mua Khóa 1 (868.686đ), số tiền đó được trừ vào Khóa 2. Bạn chỉ cần thêm 3.000.000đ để có toàn bộ Khóa 2 kèm Tiểu Hà Mã. Liên hệ mình qua Telegram để áp dụng.' },
  { q:'Chỉ 20 suất/đợt là thật không?',
    a:'Thật. Tiểu Hà Mã cần mình thiết lập riêng và kèm sát từng người. Mình không thể kèm cùng lúc quá nhiều người mà vẫn đảm bảo chất lượng. Mỗi đợt 20 suất, hết là đóng đăng ký.' },
  { q:'Bảo hành thế nào?',
    a:'14 ngày hoàn 100%. Nếu 14 ngày đầu bạn thấy không phù hợp, nhắn mình, hoàn trong 24 giờ không hỏi lý do.' },
  { q:'Khác gì Khóa 1?',
    a:'Khóa 1 bạn tự học 24 skill, tự áp dụng. Khóa 2 có thêm: bộ SOP dựng cả hệ thống 30 ngày + Tiểu Hà Mã kèm 24/7 qua Telegram. Phù hợp nếu bạn muốn chắc ăn hơn hoặc không muốn tự mày mò.' },
]

const WEEK_PLAN = [
  { w:'Tuần 1', head:'Đặt nền móng', items:['Cài BRAND_DNA cho toàn hệ thống','Thiết lập Tiểu Hà Mã trên Telegram','AI viết lịch content 30 ngày đầu tiên','Chatbot Zalo/Facebook tự động trả lời'] },
  { w:'Tuần 2', head:'Dựng máy bán hàng', items:['Landing page 3 sản phẩm chính','Chuỗi email tự động 5 bước','Template tin chốt đơn theo từng tình huống','Hệ thống xin review tự động'] },
  { w:'Tuần 3', head:'Kết nối traffic', items:['Copy quảng cáo Facebook 3 góc độ','DM outreach template cho từng nhóm khách','Story Instagram + highlight','Script video 60 giây sẵn sàng quay'] },
  { w:'Tuần 4', head:'Tự động hóa vận hành', items:['Upsell script cho khách đã mua','Referral system kêu gọi giới thiệu','SOP repost 1 content thành 5 dạng','Review lại toàn hệ thống + tối ưu'] },
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
        ⚡ Đợt này chỉ còn <strong className="font-mono">{slots} suất</strong> · Tiểu Hà Mã cần thiết lập riêng, không thể nhận nhiều hơn
      </div>

      <nav className="bg-[#0D2B1A] px-4 py-3 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-[#F6F0E4] font-black font-mono text-sm">DungHoang.com</span>
          <button onClick={open} className="bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.03] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all duration-200">
            Giữ suất · 3.868.686đ →
          </button>
        </div>
      </nav>

      {/* [1] HERO */}
      <section ref={heroRef} className="bg-[#0D2B1A] px-4 pt-14 pb-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-block bg-[#C0390E]/20 text-[#E87C5E] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Khóa 2 · Bản Có Đội Trưởng · 20 Suất/Đợt
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F6F0E4] leading-tight">
            30 Ngày Dựng Xong<br/>
            <span className="text-[#C0390E]">Hệ Thống Bán Hàng Tự Chạy</span><br/>
            <span className="text-2xl sm:text-3xl font-bold text-[#F6F0E4]/70">Kèm Tiểu Hà Mã · AI Đội Trưởng 24/7</span>
          </h1>
          <p className="text-[#F6F0E4]/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            24 skill AI + bộ SOP dựng hệ thống 4 tuần + Tiểu Hà Mã kèm sát qua Telegram.
            Cam kết: 30 ngày bạn có hệ thống tự chạy, hoặc mình ngồi sửa cùng bạn cho đến khi chạy được.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={open}
              className="h-14 px-8 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.03] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40">
              Giữ Suất · 3.868.686đ →
            </button>
            <a href="#30-ngay"
              className="h-14 px-8 border border-[#F6F0E4]/20 text-[#F6F0E4]/70 hover:text-[#F6F0E4] text-sm font-medium rounded-2xl flex items-center justify-center transition-colors">
              Xem kế hoạch 30 ngày →
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
              { n:'20',    label:'suất/đợt tối đa' },
              { n:'30 ngày', label:'có hệ thống thật' },
              { n:'24/7',  label:'Tiểu Hà Mã kèm sát' },
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
              Bạn biết AI có thể làm được.<br/>Nhưng mỗi lần setup là kẹt.
            </h2>
          </div>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Bạn đã xem video. Đã đọc bài. Biết ChatGPT có thể viết content, biết chatbot có thể trả lời khách.</p>
            <p>Nhưng cứ đến bước bắt đầu thật là kẹt. "Mình bắt đầu từ đâu?" "Cái này kết nối với cái kia thế nào?" "Bước này sai rồi thì sao?"</p>
          </div>
          <div className="space-y-3">
            {[
              { icon:'⚠️', head:'Kẹt vì thiếu người đi cùng', body:'Xem video tự học được đến 80%. Nhưng 20% còn lại chính là phần khó nhất và không ai chỉ cho bạn.' },
              { icon:'⚠️', head:'Kẹt vì không biết thứ tự',   body:'24 skill, bắt đầu từ đâu? Cái nào phụ thuộc cái nào? Setup sai thứ tự là mất thêm 2 tuần.' },
              { icon:'⚠️', head:'Kẹt vì không có template',   body:'Prompt người khác dùng được không có nghĩa là phù hợp với business của bạn. Cần ai customize lại cho bạn.' },
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
            Tôi Muốn Có Người Đi Cùng →
          </button>
        </div>
      </section>

      {/* [4] BRIDGE */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <p className="text-xs font-bold text-[#88860B] uppercase tracking-widest">Đó là lý do Khóa 2 ra đời</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F6F0E4] leading-tight">
            Không phải thêm bài học.<br/>Là người đi cùng bạn trong 30 ngày.
          </h2>
          <div className="space-y-4 text-[#F6F0E4]/75 text-sm sm:text-base leading-relaxed">
            <p>Mình đã kèm đủ loại business qua Khóa 1: từ chủ shop thời trang đến coach, freelancer, homestay.</p>
            <p>Điểm chung: ai cũng biết AI có thể giúp gì. Điểm khác nhau: ai có người đi cùng thì xong trong 30 ngày. Ai không có thì vẫn đang "sắp làm" sau 3 tháng.</p>
            <p className="text-[#F6F0E4]"><strong>Tiểu Hà Mã là đội trưởng AI mình cài riêng cho bạn trên Telegram.</strong> Nó biết SOP của bạn, biết sản phẩm của bạn, và trả lời câu hỏi của bạn bất kể 2h sáng hay 11h đêm.</p>
            <p className="text-[#F6F0E4]/60 italic">Khác chatbot chung chung ở chỗ: Tiểu Hà Mã được cài riêng cho business của bạn, mình setup tay từng cái một.</p>
          </div>
        </div>
      </section>

      {/* [5] 30-NGAY */}
      <section id="30-ngay" className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Kế hoạch 30 ngày</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Tuần nào làm gì, rõ từng bước</h2>
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
            Giữ Suất · Bắt Đầu 30 Ngày →
          </button>
        </div>
      </section>

      {/* [7] EMOTION */}
      <section className="bg-white border-y border-[#DDD8CB] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Ngày 30: hệ thống xong</h2>
          <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-4 text-[#F6F0E4]/80 text-sm leading-relaxed">
            <p>Sáng thứ Hai. Bạn không phải nghĩ hôm nay đăng gì. Lịch content đã có sẵn.</p>
            <p>Inbox có 15 tin nhắn. Tiểu Hà Mã đã trả lời 12 cái. 3 cái cần bạn confirm, Hà Mã draft sẵn câu trả lời rồi.</p>
            <p className="text-[#F6F0E4]"><strong>Business chạy trong khi bạn ngủ.</strong></p>
            <p>Đó không phải mục tiêu viễn tưởng. Đó là thứ 605 người học trước bạn đã làm được. Và 30 ngày là đủ.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { before:'Content: tự viết mỗi ngày', after:'30 bài: AI viết, bạn approve' },
              { before:'Inbox: trả lời từng cái',   after:'Tiểu Hà Mã xử lý tự động' },
              { before:'Setup chatbot: kẹt mãi',    after:'Mình cài sẵn cho bạn' },
              { before:'Tự mày mò 1 mình',          after:'Có người kèm sát 30 ngày' },
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
          <h2 className="text-2xl font-black text-[#F6F0E4]">Mình kèm bạn như thế này</h2>
          <div className="space-y-4">
            {[
              { icon:'🤖', head:'Tiểu Hà Mã · cài riêng cho bạn', body:'Không dùng chung với ai. Mình setup riêng cho business của bạn: biết sản phẩm, biết giọng bạn, biết SOP của bạn.' },
              { icon:'📱', head:'Kèm qua Telegram 24/7', body:'Bạn kẹt bước nào, nhắn Tiểu Hà Mã. Nó trả lời ngay, không cần đợi mình online.' },
              { icon:'📋', head:'SOP 30 ngày chi tiết từng bước', body:'Không phải "làm theo cảm giác". Mỗi ngày biết rõ hôm nay làm gì, tại sao, theo thứ tự nào.' },
              { icon:'🔍', head:'Review hệ thống cuối tháng', body:'Tuần 4 mình review lại toàn bộ cùng bạn. Cái gì chưa chạy tốt, tối ưu lại ngay.' },
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
            <p className="font-bold text-[#0D2B1A] text-sm">Nếu tự thuê người làm thay:</p>
            {[
              { item:'1 nhân viên content', cost:'8-12 triệu/tháng' },
              { item:'1 nhân viên CSKH',   cost:'7-10 triệu/tháng' },
              { item:'Setup chatbot (thuê freelancer)', cost:'5-15 triệu 1 lần' },
              { item:'Freelance làm ads copy', cost:'3-5 triệu/tháng' },
            ].map((r, i) => (
              <div key={i} className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{r.item}</p>
                <p className="text-sm font-bold text-red-500">{r.cost}</p>
              </div>
            ))}
            <div className="border-t border-[#DDD8CB] pt-3 flex justify-between">
              <p className="font-bold text-[#0D2B1A]">Tổng cộng mỗi tháng</p>
              <p className="text-lg font-black text-red-500">23-42 triệu</p>
            </div>
          </div>

          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden">
            <div className="bg-[#0D2B1A] px-5 py-3">
              <p className="text-[#F6F0E4] font-bold text-sm">Khóa 2 · Bản Có Đội Trưởng</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]">
              {[
                { item:'24 SOP AI thực chiến',               value:'12.000.000đ' },
                { item:'Tiểu Hà Mã cài riêng cho bạn',      value:'5.000.000đ' },
                { item:'SOP 30 ngày dựng hệ thống chi tiết', value:'3.000.000đ' },
                { item:'Review + tối ưu hệ thống cuối tháng',value:'2.000.000đ' },
                { item:'BONUS: 489 tiêu đề thu hút',          value:'499.000đ', bonus:true },
                { item:'BONUS: Ma trận nội dung 6 tháng',    value:'299.000đ', bonus:true },
                { item:'BONUS: Buổi soi hệ thống 1 kèm 1',  value:'1.000.000đ', bonus:true },
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
              <p className="text-xl font-black text-gray-400 line-through">24.298.000đ</p>
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
              <p><strong className="text-[#0D2B1A]">2. Cam kết 30 ngày có hệ thống:</strong> Làm đủ theo SOP mà không có hệ thống chạy được → mình ngồi review và sửa cùng bạn cho đến khi chạy.</p>
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
                  'Muốn dựng hệ thống đầy đủ trong 30 ngày, không mày mò mãi',
                  'Đã mua Khóa 1 và muốn có người kèm sát để setup đúng',
                  'Sẵn sàng đầu tư để không cần thuê team content/CSKH',
                  'Business có thu nhập ổn, muốn scale mà không mở rộng headcount',
                ].map((t, i) => <p key={i} className="text-sm text-gray-700 leading-snug">• {t}</p>)}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-gray-500 text-sm">✗ KHÔNG PHẢI CHO:</p>
              <div className="space-y-2">
                {[
                  'Chưa có sản phẩm/dịch vụ thật đang bán (trước tiên dùng AI cần có thứ gì để bán)',
                  'Muốn thụ động hoàn toàn, không muốn học hay làm gì',
                  'Đang thử nghiệm xem AI có phù hợp không (xem Khóa 1 trước)',
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
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Kết quả sau 30 ngày</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Người đi cùng Tiểu Hà Mã: xong thật trong 30 ngày</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name:'Chủ homestay 3 phòng', result:'Hà Mã setup chatbot Zalo trong ngày 3. Từ đó inbox tự được trả lời. Mình chỉ cần xác nhận đặt phòng. Tháng đầu tiết kiệm gần 4 tiếng/ngày', outcome:'Hệ thống CSKH tự động trong 3 ngày' },
              { name:'Coach kinh doanh',       result:'30 bài content cho tháng đầu xong trong tuần 1. Ads Facebook chạy từ tuần 2. Doanh thu tháng đó tăng vì có hệ thống, không phải vì làm nhiều hơn', outcome:'Lịch content 30 ngày + ads chạy trong 2 tuần' },
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
            <p className="text-gray-500 text-sm">Tiểu Hà Mã cần setup riêng. Mình không thể nhận thêm.</p>
          </div>

          <div className="bg-[#0D2B1A] rounded-2xl p-5 space-y-3">
            <p className="text-[#F6F0E4] font-bold text-sm">Bạn đang cân nhắc giữa:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-[#C0390E] text-lg">A</span>
                <p className="text-[#F6F0E4]/70 text-sm">Đăng ký hôm nay: 30 ngày có hệ thống chạy được</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#C0390E] text-lg">B</span>
                <p className="text-[#F6F0E4]/70 text-sm">Chờ thêm, và tiếp tục làm thủ công trong lúc đó</p>
              </div>
            </div>
            <p className="text-[#88860B] text-sm italic">Cả hai đều là lựa chọn hợp lệ. Nhưng B có chi phí thực: thời gian bạn mất đi mỗi ngày không có AI hỗ trợ.</p>
          </div>

          <div className="space-y-3">
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.02] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-xl shadow-red-900/25 hover:shadow-2xl hover:shadow-red-900/40">
              Quyết Định Hôm Nay · Giữ Suất Trước Khi Hết →
            </button>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 flex-wrap">
              <span>✓ 30 ngày có hệ thống</span>
              <span>✓ Tiểu Hà Mã 24/7</span>
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
            <p className="text-[#F6F0E4]/50 text-xs">3.868.686đ · 30 ngày · Tiểu Hà Mã 24/7</p>
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
