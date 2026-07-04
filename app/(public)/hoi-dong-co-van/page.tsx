'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { Reveal, GrowBar } from '@/components/motion/Reveal'
import { PRODUCTS } from '@/lib/products'
import { Crown, Coins, Megaphone, Handshake, UsersRound, Shield, CalendarClock, ClipboardList, Bot, Gift, ArrowRight, CheckCircle2, Stethoscope, ListChecks, Radar, CalendarCheck2 } from 'lucide-react'

const product = PRODUCTS['hoi-dong-co-van']

// ── 5 Cố vấn — mô tả trung thực theo đúng nội dung skill ─────────────────────
const ADVISORS = [
  {
    icon: <Crown className="w-5 h-5 text-[#88860B]" />,
    role: 'CEO — Quản Trị Kiến Tạo',
    does: 'Chẩn đoán doanh nghiệp bạn đang ở giai đoạn nào, xây bộ điều khiển trung tâm, cùng bạn ra quyết định lớn: scale hay gọn lại, làm gì trước làm gì sau.',
    ask:  '"Công ty mình càng làm càng đuối, không hiểu sao" — hỏi CEO.',
  },
  {
    icon: <Coins className="w-5 h-5 text-[#88860B]" />,
    role: 'CFO — Tài Chính & Dòng Tiền',
    does: 'Soi sức khỏe tài chính, kiểm soát dòng tiền, tính CAC/LTV, định giá sản phẩm, đánh giá có nên đầu tư mở rộng hay không.',
    ask:  '"Có lãi mà không có tiền, nên vay 2 tỷ mở chi nhánh không?" — hỏi CFO.',
  },
  {
    icon: <Megaphone className="w-5 h-5 text-[#88860B]" />,
    role: 'CMO — Marketing Thu Hút',
    does: 'Lập kế hoạch marketing năm/quý, thiết kế offer thu hút, chọn kênh quảng cáo, đo CAC/CPL để biết tiền ads đi đâu.',
    ask:  '"Chạy ads 50 triệu mà không thấy lead nào" — hỏi CMO.',
  },
  {
    icon: <Handshake className="w-5 h-5 text-[#88860B]" />,
    role: 'CCO — Bán Hàng & Kênh Phân Phối',
    does: 'Vận hành pipeline bán hàng, kịch bản chốt đơn kiểu "bán như bác sĩ", thiết kế upsell + giữ chân khách, chính sách đại lý nếu bạn bán qua kênh.',
    ask:  '"Khách mua 1 lần rồi đi mất, không quay lại" — hỏi CCO.',
  },
  {
    icon: <UsersRound className="w-5 h-5 text-[#88860B]" />,
    role: 'CHRO — Nhân Sự & Lương Khoán',
    does: 'Tuyển người đầu tiên đúng cách, viết mô tả công việc + KPI, 5 phương pháp chia lương khoán để nhân viên tự chạy theo kết quả.',
    ask:  '"Muốn thuê người đầu tiên mà sợ trả lương xong không ra việc" — hỏi CHRO.',
  },
]

const FAQS = [
  {
    q: 'Khác gì Khóa 1? Có cần mua cả hai không?',
    a: 'Không cần mua cả hai — Hội Đồng Cố Vấn đã bao gồm trọn bộ 24 agent của Khóa 1 bên trong. Khác biệt là tầng trên: Khóa 1 cho bạn 24 nhân viên AI làm việc tay chân; Hội Đồng thêm 5 giám đốc quyết chiến lược + quy trình vận hành tuần nối hai tầng lại — giám đốc kê toa việc, nhân viên thực thi, bạn chỉ duyệt. Nếu đã mua Khóa 1 rồi thì số tiền đó trừ thẳng vào, chỉ thêm 2.000.000đ.',
  },
  {
    q: '"90% tự động" nghĩa là sao? Tôi còn phải làm gì?',
    a: 'Nghĩa đen: phần nghĩ (5 cố vấn phân tích, kê toa) và phần làm (24 agent viết content, email, trang bán, trả inbox) là AI. Phần của bạn gồm 2 việc không nên tự động: họp hội đồng 30 phút mỗi thứ 2 và duyệt thành phẩm 15 phút mỗi ngày trước khi đăng. AI không tự đăng bài, không tự gửi tiền, không tự quyết thay bạn — doanh nghiệp mang tên bạn, quyết định cuối là của bạn.',
  },
  {
    q: 'AI cố vấn thì đáng tin đến đâu? Nó quyết thay tôi à?',
    a: 'Không. Mỗi cố vấn là một quy trình hỏi đáp có cấu trúc: nó hỏi bạn số liệu thật, phân tích theo framework quản trị đã được đóng gói, rồi đưa ra phân tích + phương án kèm lý do. Người quyết vẫn là bạn. Giá trị của nó là bạn không còn quyết một mình trong bóng tối — có người phản biện trước khi bạn xuống tiền.',
  },
  {
    q: 'Dùng thế nào cho đúng? Mỗi tuần mất bao lâu?',
    a: 'Cách mình dùng: mỗi tuần 1 buổi "họp hội đồng" 30 phút. Mang 1 vấn đề nóng nhất tuần đó ra hỏi đúng cố vấn phụ trách. Cuối buổi có bản phân tích + việc cần làm tuần sau. Ngoài ra lúc nào kẹt quyết định thì mở ra hỏi ngay, không cần chờ lịch.',
  },
  {
    q: 'Bảo hành thế nào?',
    a: '14 ngày hoàn 100% như mọi sản phẩm khác của mình. Thử ít nhất 2 buổi họp với 2 cố vấn — nếu không thấy quyết định nào sáng ra, nhắn mình hoàn tiền trong 24 giờ.',
  },
  {
    q: 'Muốn nâng lên Khóa 2 Coaching thì sao?',
    a: 'Khóa 2 (3.868.686đ) = toàn bộ Hội Đồng Cố Vấn này + Dũng kèm sát 1-1 trong 30 ngày + Tiểu Hà Mã cài riêng cho business bạn. Nếu bạn mua Hội Đồng hôm nay rồi muốn lên Khóa 2, số tiền 2.868.686đ trừ thẳng vào — chỉ thêm 1.000.000đ. Nhắn Telegram @KentHoang để mình áp dụng.',
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#DDD8CB] rounded-xl overflow-hidden bg-white transition-all duration-200 hover:border-[#3D6B4A]/30 hover:shadow-sm">
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

export default function HoiDongCoVanPage() {
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

      {/* [0] ANNOUNCEMENT */}
      <div className="bg-[#0D2B1A] text-[#F6F0E4] text-center py-2.5 px-4 text-xs sm:text-sm font-medium">
        Trọn bộ công ty AI: 5 Giám Đốc + 24 Nhân Viên + Quy Trình Vận Hành · Đã nằm trọn trong Khóa 2
      </div>

      {/* [1] HERO — THỬ NGHIỆM bảng màu sáng: nền kem trắng, chữ đen đậm, nhấn xanh lá tươi */}
      <section ref={heroRef} className="bg-[#FBFAF5] px-4 pt-12 pb-14 overflow-hidden relative">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-[#8BC34A]/[0.10] blur-3xl pointer-events-none" />
        <div className="absolute -left-24 bottom-0 w-64 h-64 rounded-full bg-[#2D7A4F]/[0.06] blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-8 items-center">
          {/* Text column — entrance fade-up khi tải trang */}
          <Reveal className="space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-[#0D2B1A] text-[#F6F0E4] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              Hội Đồng Cố Vấn AI
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#0D2B1A] leading-[1.12]">
              Bạn đã có nhân viên AI.<br/>
              Giờ là lúc có{' '}
              <span className="relative z-0 inline-block whitespace-nowrap">
                <span className="absolute inset-x-0 bottom-1 h-[0.4em] bg-[#8BC34A] -z-10" />
                ban giám đốc
              </span>.
            </h1>

            <p className="text-[#0D2B1A]/65 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              Trọn bộ công ty AI: 5 giám đốc (CEO, CFO, CMO, CCO, CHRO) + 24 nhân viên AI + quy trình vận hành tuần.
              Giám đốc kê toa, nhân viên thực thi — bạn họp 30 phút thứ 2 và duyệt 15 phút mỗi ngày.
            </p>

            {/* Feature chips — thay cho đoạn text liệt kê thuần */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {['5 giám đốc AI', '24 nhân viên AI', 'Quy trình vận hành tuần'].map(f => (
                <span key={f} className="inline-flex items-center gap-1.5 bg-white border border-[#0D2B1A]/10 text-[#0D2B1A] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D7A4F]" />{f}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <button onClick={open}
                className="h-14 px-8 bg-[#0D2B1A] hover:bg-[#153f27] active:scale-[0.97] hover:scale-[1.02] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-lg shadow-[#0D2B1A]/20 inline-flex items-center justify-center gap-2">
                Lập Hội Đồng Của Tôi <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#5-co-van"
                className="h-14 px-8 border border-[#0D2B1A]/15 text-[#0D2B1A]/70 hover:text-[#0D2B1A] hover:border-[#0D2B1A]/30 text-sm font-medium rounded-2xl flex items-center justify-center transition-colors">
                Gặp 5 cố vấn
              </a>
            </div>
            <p className="text-[#0D2B1A]/40 text-xs">Trả 1 lần, dùng trọn đời</p>
          </Reveal>

          {/* Visual column — council roster card kiểu "mockup" trên nền sáng, vào sau text 150ms */}
          <Reveal delay={150} className="hidden sm:block">
            <div className="bg-[#0D2B1A] rounded-3xl p-5 space-y-2.5 shadow-2xl shadow-[#0D2B1A]/15">
              <p className="text-[#8BC34A] text-[10px] font-bold uppercase tracking-widest px-1 pb-1">Ban giám đốc của bạn</p>
              {[
                { i: <Crown className="w-4 h-4" />, r: 'CEO' },
                { i: <Coins className="w-4 h-4" />, r: 'CFO' },
                { i: <Megaphone className="w-4 h-4" />, r: 'CMO' },
                { i: <Handshake className="w-4 h-4" />, r: 'CCO' },
                { i: <UsersRound className="w-4 h-4" />, r: 'CHRO' },
              ].map((m, idx) => (
                <div key={m.r} className="flex items-center gap-3 bg-[#F6F0E4]/[0.06] rounded-xl px-3.5 py-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#8BC34A]/20 text-[#8BC34A] flex items-center justify-center flex-shrink-0">{m.i}</span>
                  <span className="text-[#F6F0E4] font-bold text-sm">{m.r}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#8BC34A]/70 ml-auto flex-shrink-0" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* [2] PAIN — quyết định một mình */}
      <section className="px-4 py-14">
        <Reveal className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#C0390E] uppercase tracking-widest">Chuyện quen thuộc</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
              Việc tay chân thì AI làm được rồi.<br/>Nhưng quyết định lớn vẫn mình bạn gánh.
            </h2>
          </div>

          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Có nên tăng giá không? Tiền tháng này đi đâu mà không thấy dư? Thuê người đầu tiên bây giờ hay ráng thêm 6 tháng? Chạy ads tiếp hay dừng?</p>
            <p>Mỗi câu hỏi đó, chủ doanh nghiệp lớn có cả ban giám đốc ngồi phản biện. Còn solopreneur thì tự hỏi, tự trả lời, tự chịu — nhiều khi quyết theo cảm tính lúc 11h đêm rồi sáng mai hối.</p>
          </div>

          <div className="border-l-4 border-[#C0390E] pl-4 space-y-2">
            <p className="text-gray-700 leading-relaxed">
              Sai một bài content, mất một buổi. Sai một quyết định giá, một kênh bán, một lần thuê người — mất vài tháng và vài chục triệu.
            </p>
            <p className="font-bold text-[#0D2B1A]">Hội Đồng Cố Vấn sinh ra để bạn không phải quyết một mình nữa.</p>
          </div>

          <button onClick={open}
            className="w-full h-14 bg-[#0D2B1A] hover:bg-[#153f27] active:scale-[0.97] hover:scale-[1.01] text-[#F6F0E4] font-bold rounded-2xl transition-all duration-200 shadow-md">
            Tôi Không Muốn Quyết Một Mình Nữa →
          </button>
        </Reveal>
      </section>

      {/* [3] 5 CỐ VẤN — nền sáng, CEO là thẻ đậm nổi bật (giống mockup video trong ảnh mẫu), 4 cố vấn còn lại xếp lưới trắng */}
      <section id="5-co-van" className="bg-white border-y border-[#DDD8CB] px-4 py-14">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#88860B] uppercase tracking-widest">Ban giám đốc của bạn</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">5 cố vấn — 5 mảng bạn đang tự gánh</h2>
            <p className="text-gray-500 text-sm">Phương pháp quản trị được đóng gói thành skill, hỏi là có người phân tích cùng</p>
          </div>

          {/* CEO — chủ tịch hội đồng, thẻ đậm nổi trên nền sáng */}
          <Reveal>
          <div className="bg-[#0D2B1A] rounded-2xl p-5 sm:p-6 space-y-2.5 shadow-lg shadow-[#0D2B1A]/10">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-[#8BC34A]/20 flex items-center justify-center flex-shrink-0">{ADVISORS[0].icon}</span>
              <div>
                <p className="text-[#8BC34A] text-[10px] font-bold uppercase tracking-widest">Chủ tịch hội đồng</p>
                <p className="font-black text-[#F6F0E4] text-base">{ADVISORS[0].role}</p>
              </div>
            </div>
            <p className="text-[#F6F0E4]/70 text-sm leading-relaxed">{ADVISORS[0].does}</p>
            <p className="text-[#8BC34A] text-xs italic leading-relaxed">{ADVISORS[0].ask}</p>
          </div>
          </Reveal>

          {/* 4 cố vấn còn lại — lưới 2 cột trắng, stagger 80ms/card khi cuộn tới */}
          <div className="grid sm:grid-cols-2 gap-3">
            {ADVISORS.slice(1).map((a, idx) => (
              <Reveal key={a.role} delay={idx * 80} className={idx % 2 === 1 ? 'sm:mt-4' : ''}>
              <div
                className="bg-[#FBFAF5] border border-[#DDD8CB] hover:border-[#88860B]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 rounded-2xl p-5 space-y-2 h-full">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#88860B]/12 flex items-center justify-center flex-shrink-0">{a.icon}</span>
                  <p className="font-black text-[#0D2B1A] text-sm sm:text-base">{a.role}</p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{a.does}</p>
                <p className="text-[#3D6B4A] text-xs italic leading-relaxed">{a.ask}</p>
              </div>
              </Reveal>
            ))}
          </div>

          <button onClick={open}
            className="w-full h-14 bg-[#0D2B1A] hover:bg-[#153f27] active:scale-[0.98] text-white font-black rounded-2xl transition-all duration-200 text-base">
            Tôi Muốn Cả 5 Người Này — 2.868.686đ →
          </button>
        </div>
      </section>

      {/* [3.5] XEM THỬ — mẫu output thật của cố vấn CEO, dùng case ví dụ có sẵn trong skill (không lộ số liệu riêng của học viên nào) */}
      <section className="px-4 py-14 bg-[#FBFAF5]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#8BC34A] uppercase tracking-widest">Không nói suông</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Xem thử — cố vấn phân tích thật ra sao</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              Đây là đúng khuôn "toa quản trị" mà cố vấn CEO xuất ra, chạy trên 1 tình huống ví dụ: agency marketing 25 người, doanh thu 800 triệu/tháng, lợi nhuận chỉ 30 triệu.
            </p>
          </div>

          <Reveal>
          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#0D2B1A] px-5 py-3.5 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-[#8BC34A]/20 flex items-center justify-center flex-shrink-0">
                <Crown className="w-4 h-4 text-[#8BC34A]" />
              </span>
              <div>
                <p className="text-[#F6F0E4] font-bold text-sm">Toa quản trị — Agency marketing (ví dụ)</p>
                <p className="text-[#8BC34A] text-[11px]">Cố vấn CEO · Quản trị kiến tạo</p>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {/* Chẩn đoán */}
              <div>
                <p className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  <Stethoscope className="w-3.5 h-3.5" />Chẩn đoán
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { l: 'Giai đoạn', v: '1 · Sống sót' },
                    { l: 'Biên lợi nhuận', v: '3,75%' },
                    { l: 'Quản lý', v: 'CEO nhúng tay' },
                  ].map(s => (
                    <div key={s.l} className="bg-[#FAF7F2] rounded-lg p-2.5">
                      <p className="text-[10px] text-gray-400">{s.l}</p>
                      <p className="text-sm font-bold text-[#0D2B1A]">{s.v}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-red-50 rounded-lg p-3 mt-2.5">
                  <p className="text-xs text-red-700 leading-relaxed">
                    <span className="font-bold">Điểm yếu lớn nhất:</span> doanh thu cao (800tr/tháng) nhưng lợi nhuận mỏng — offer đang bị ép giá, và CEO vẫn là nút thắt vận hành.
                  </p>
                </div>
              </div>

              {/* Toa 90 ngày */}
              <div>
                <p className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  <ListChecks className="w-3.5 h-3.5" />Toa 90 ngày
                </p>
                <div className="space-y-2.5">
                  {[
                    { t: 'Nâng cấp offer (Grand Slam Offer)', d: 'Tăng giá trị cảm nhận để tăng giá bán, kéo ngắn thời gian hoàn vốn chi phí thu khách.' },
                    { t: 'Đóng băng bộ điều khiển trung tâm v1', d: 'Chốt lại các hạn mức tài chính hiện tại thành 1 bảng kiểm soát, thay vì để trong đầu CEO.' },
                    { t: 'Khoán 1 mảng việc cho 1 trưởng phòng', d: 'Chọn mảng CEO đang mất nhiều thời gian nhất, giao hẳn kèm KPI rõ để CEO rút tay dần.' },
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0D2B1A] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      <div>
                        <p className="text-sm font-semibold text-[#0D2B1A]">{p.t}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{p.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Theo dõi hàng tuần */}
              <div>
                <p className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  <Radar className="w-3.5 h-3.5" />Theo dõi hàng tuần
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['CAC payback (ngày)', 'Biên lợi nhuận %', 'Giờ CEO còn nhúng tay', 'Doanh thu/khách'].map(k => (
                    <span key={k} className="text-xs bg-[#EAF5EF] text-[#2D7A4F] px-2.5 py-1 rounded-full font-medium">{k}</span>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#DDD8CB] pt-3 flex items-center gap-2">
                <CalendarCheck2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-xs text-gray-500">Tái khám sau 3 tuần — kiểm tra offer mới đã đẩy biên lợi nhuận lên chưa.</p>
              </div>
            </div>
          </div>
          </Reveal>

          <div className="bg-[#0D2B1A] rounded-xl p-4 text-sm text-[#F6F0E4]/75 leading-relaxed text-center">
            Nói thẳng như FAQ bên dưới: cố vấn <span className="text-[#8BC34A] font-semibold">không quyết thay bạn</span> và không hứa doanh thu — nó chỉ ra đúng thứ tự ưu tiên, chặn bạn khỏi sai lầm nhảy cóc giai đoạn. Với dữ liệu thật của bạn, toa sẽ cụ thể như thế này.
          </div>
        </div>
      </section>

      {/* [4] CÁCH DÙNG — nghi thức họp tuần */}
      <section className="px-4 py-14 bg-[#FAF7F2] border-y border-[#DDD8CB]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Cách dùng</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Mỗi tuần một buổi họp hội đồng — 30 phút</h2>
          </div>
          <div className="relative">
            {/* Đường nối — chỉ hiện ở desktop, tạo cảm giác quy trình liền mạch thay vì 3 ô rời rạc */}
            <div className="hidden sm:block absolute top-6 left-[16.5%] right-[16.5%] h-px bg-[#DDD8CB]" />
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-4">
              {[
                { icon: <CalendarClock className="w-5 h-5 text-[#F6F0E4]" />, step: '1', title: 'Chọn vấn đề nóng nhất', desc: 'Tuần này chuyện gì làm bạn mất ngủ? Giá, tiền, khách, người — mang đúng 1 chuyện.' },
                { icon: <Bot className="w-5 h-5 text-[#F6F0E4]" />, step: '2', title: 'Hỏi đúng cố vấn', desc: 'Mở skill của giám đốc phụ trách. Cố vấn hỏi ngược lại số liệu thật của bạn rồi mới phân tích.' },
                { icon: <ClipboardList className="w-5 h-5 text-[#F6F0E4]" />, step: '3', title: 'Nhận toa việc, giao agent thực thi', desc: 'Cuối buổi có toa việc ghi rõ giao agent nào. Dán lệnh theo bảng có sẵn — agent làm, bạn duyệt 15 phút mỗi ngày.' },
              ].map((c, idx) => (
                <Reveal key={c.step} delay={idx * 120} className="relative space-y-2.5">
                  <span className="relative z-10 w-12 h-12 rounded-2xl bg-[#0D2B1A] flex items-center justify-center shadow-sm">
                    {c.icon}
                  </span>
                  <p className="font-bold text-[#0D2B1A] text-sm">
                    <span className="text-[#C0390E] font-mono mr-1.5">{c.step}.</span>{c.title}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="bg-[#0D2B1A]/5 rounded-xl p-4 text-sm text-gray-600 leading-relaxed">
            <p><strong className="text-[#0D2B1A]">Mình nói thẳng:</strong> cố vấn AI phân tích và đề xuất — không quyết thay bạn, không cam kết doanh thu. Giá trị thật của nó: trước mỗi quyết định lớn, bạn có người hỏi ngược "số liệu đâu?", "tính kỹ chưa?" — thứ mà solopreneur không bao giờ có.</p>
          </div>
        </div>
      </section>

      {/* [4.5] CHI PHÍ THUÊ THẬT — neo giá bằng lương thị trường */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#C0390E] uppercase tracking-widest">Làm phép tính</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Thuê 5 vị trí này ngoài thị trường tốn bao nhiêu?</h2>
            <p className="text-gray-500 text-sm">Mức lương phổ biến cho cấp giám đốc có kinh nghiệm tại Việt Nam</p>
          </div>

          <Reveal>
          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 space-y-4">
              {[
                { role: 'CEO / Cố vấn điều hành',    salary: '60 – 120 triệu', pct: 100 },
                { role: 'CFO / Giám đốc tài chính',  salary: '40 – 80 triệu',  pct: 67 },
                { role: 'CMO / Giám đốc marketing',  salary: '40 – 70 triệu',  pct: 58 },
                { role: 'CCO / Giám đốc kinh doanh', salary: '40 – 70 triệu',  pct: 58 },
                { role: 'CHRO / Giám đốc nhân sự',   salary: '30 – 60 triệu',  pct: 50 },
              ].map((r, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-baseline gap-3">
                    <p className="text-sm text-gray-700 font-medium">{r.role}</p>
                    <p className="text-sm font-bold text-gray-500 flex-shrink-0">{r.salary}<span className="text-gray-400 font-normal">/tháng</span></p>
                  </div>
                  {/* Thanh lương lớn dần từ 0 khi cuộn tới — stagger 100ms/thanh */}
                  <GrowBar pct={r.pct} delay={i * 100} />
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-[#0D2B1A] flex justify-between items-center">
              <p className="font-bold text-[#F6F0E4] text-sm">Cả ban giám đốc</p>
              <p className="text-xl sm:text-2xl font-black text-[#F6F0E4]">210 – 400 triệu<span className="text-[#F6F0E4]/50 text-sm font-normal">/tháng</span></p>
            </div>
          </div>
          </Reveal>

          <Reveal delay={100}>
          <div className="bg-[#0D2B1A] rounded-2xl p-5 space-y-2 text-center">
            <p className="text-[#F6F0E4]/70 text-sm leading-relaxed">
              Chưa kể: tuyển được người giỏi mất 3-6 tháng, lương tháng 13, bảo hiểm, và rủi ro họ nghỉ việc mang theo kinh nghiệm.
            </p>
            <p className="text-[#F6F0E4] font-black text-lg">
              Hội Đồng Cố Vấn AI: <span className="text-[#8BC34A]">2.868.686đ trả 1 lần</span> — bằng chưa tới 1 ngày lương của ban giám đốc thật.
            </p>
            <p className="text-[#F6F0E4]/50 text-xs leading-relaxed">
              Nói cho công bằng: cố vấn AI không thay được con người ở quan hệ và trách nhiệm pháp lý.
              Nhưng ở phần phân tích, phản biện và framework ra quyết định — nó làm được phần lớn, với chi phí gần như bằng 0.
            </p>
          </div>
          </Reveal>
        </div>
      </section>

      {/* [5] VALUE STACK + PRICING */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Đầu tư</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">2.868.686đ — thay vì 30-50 triệu/tháng thuê 1 cố vấn thật</h2>
          </div>

          <Reveal>
          <div className="bg-white border-2 border-[#8BC34A]/30 rounded-2xl overflow-hidden shadow-lg shadow-[#8BC34A]/10">
            <div className="bg-[#0D2B1A] px-5 py-3">
              <p className="text-[#F6F0E4] font-bold text-sm">Toàn bộ bạn nhận được</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]">
              {[
                { item: 'Skill CEO — Quản Trị Kiến Tạo',            value: '5.000.000đ' },
                { item: 'Skill CFO — Tài Chính & Dòng Tiền',        value: '5.000.000đ' },
                { item: 'Skill CMO — Marketing Thu Hút',            value: '5.000.000đ' },
                { item: 'Skill CCO — Bán Hàng & Kênh Phân Phối',    value: '5.000.000đ' },
                { item: 'Skill CHRO — Nhân Sự & Lương Khoán',       value: '5.000.000đ' },
                { item: 'Trọn bộ 24 AI Agent for Business (nguyên Khóa 1)', value: '16.484.832đ' },
                { item: 'Quy Trình Vận Hành Hội Đồng — SOP họp tuần + bảng giao việc 24 agent', value: '2.000.000đ' },
                { item: 'Mẫu Biên Bản Họp Hội Đồng hàng tuần',       value: '499.000đ', bonus: true },
                { item: 'Script Báo Cáo Tuần tự động — kéo số liệu từ hệ thống của bạn', value: '990.000đ', bonus: true },
              ].map((r, i) => (
                <div key={i} className={`px-5 py-3 flex justify-between items-center gap-3 ${r.bonus ? 'bg-[#EAF5EF]' : ''}`}>
                  <p className={`text-sm flex items-center gap-2 ${r.bonus ? 'font-semibold text-[#2D7A4F]' : 'text-gray-700'}`}>
                    {r.bonus && <Gift className="w-4 h-4 flex-shrink-0" />}{r.item}
                  </p>
                  <p className={`text-sm font-bold flex-shrink-0 ml-4 ${r.bonus ? 'text-[#2D7A4F]' : 'text-gray-400'}`}>{r.value}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-[#FAF7F2] flex justify-between items-center">
              <p className="font-bold text-[#0D2B1A]">Tổng giá trị</p>
              <p className="text-xl font-black text-gray-400 line-through">44.973.832đ</p>
            </div>
            <div className="px-5 py-5 bg-[#EAF5EF] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#0D2B1A]">Trọn bộ hôm nay</p>
                <p className="text-xs text-[#3D6B4A] max-w-[180px] sm:max-w-none">Đã học Khóa 1? Trừ 868.686đ — chỉ thêm 2.000.000đ · Lên Khóa 2 chỉ thêm 1.000.000đ</p>
              </div>
              <p className="text-3xl font-black text-[#0D2B1A] flex-shrink-0">2.868.686đ</p>
            </div>
          </div>
          </Reveal>

          <div className="bg-[#0D2B1A]/5 rounded-xl p-4 text-sm text-gray-700 leading-relaxed space-y-2">
            <p><strong className="text-[#0D2B1A]">So sánh thực tế:</strong></p>
            <p>Thuê 1 cố vấn chiến lược thật: 30-50 triệu/tháng, và họ chỉ rành 1 mảng.</p>
            <p>Hội Đồng Cố Vấn: 2.868.686đ trả 1 lần — 5 mảng, hỏi lúc 11h đêm cũng trả lời.</p>
          </div>

          <div className="space-y-3">
            <button onClick={open}
              className="w-full h-16 bg-[#0D2B1A] hover:bg-[#153f27] active:scale-[0.98] text-white text-lg font-black rounded-2xl transition-all duration-200 shadow-xl shadow-[#0D2B1A]/20">
              Lập Hội Đồng Của Tôi Ngay →
            </button>
            <p className="text-center text-xs text-gray-400">Chuyển khoản · Xác nhận trong 5-10 phút · Bảo hành 14 ngày hoàn 100%</p>
          </div>
        </div>
      </section>

      {/* [6] GUARANTEE */}
      <section className="bg-[#EAF5EF] border-y border-[#2D7A4F]/20 px-4 py-12">
        <Reveal className="max-w-2xl mx-auto flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#2D7A4F] flex items-center justify-center flex-shrink-0">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#0D2B1A]">Bảo Hành 14 Ngày</h3>
            <p className="text-[#3D6B4A] text-sm font-semibold">Họp thử 2 buổi với 2 cố vấn — không thấy quyết định nào sáng ra → hoàn 100% trong 24h</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Mình không muốn giữ tiền của người không thấy giá trị. Nhắn một tin là hoàn, không thủ tục rườm rà.
            </p>
          </div>
        </Reveal>
      </section>

      {/* [7] IS FOR / NOT FOR */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Hội Đồng Cố Vấn dành cho ai?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Reveal className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-[#2D7A4F] text-sm">DÀNH CHO:</p>
              <div className="space-y-2">
                {[
                  'Business đã có doanh thu, đang lớn dần và quyết định ngày càng nặng',
                  'Solopreneur sắp thuê người đầu tiên hoặc sắp mở thêm sản phẩm/kênh',
                  'Người đã học Khóa 1 và muốn lên cấp: từ làm đúng sang quyết đúng',
                ].map((t, i) => <p key={i} className="text-sm text-gray-700 leading-snug flex gap-2"><span className="text-[#2D7A4F]">✓</span> {t}</p>)}
              </div>
            </Reveal>
            <Reveal delay={100} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-gray-500 text-sm">KHÔNG PHẢI CHO:</p>
              <div className="space-y-2">
                {[
                  'Người chưa có sản phẩm hoặc chưa có đồng doanh thu nào — học Khóa 1 trước',
                  'Người muốn AI quyết thay và cam kết kết quả doanh thu',
                  'Người cần kèm sát 1-1 từng bước — đó là Khóa 2 Coaching',
                ].map((t, i) => <p key={i} className="text-sm text-gray-500 leading-snug flex gap-2"><span>✗</span> {t}</p>)}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* [8] FAQ */}
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

      {/* [9] FINAL CTA */}
      <section className="px-4 py-14 bg-[#FAF7F2]">
        <Reveal className="max-w-2xl mx-auto space-y-4 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-[#0D2B1A] leading-tight">
            Doanh nghiệp lớn không phải vì làm nhiều hơn.<br/>
            Mà vì{' '}
            <span className="relative z-0 inline-block whitespace-nowrap">
              <span className="absolute inset-x-0 bottom-0.5 h-[0.35em] bg-[#8BC34A] -z-10" />
              quyết đúng nhiều hơn
            </span>.
          </h2>
          <button onClick={open}
            className="w-full h-16 bg-[#0D2B1A] hover:bg-[#153f27] active:scale-[0.97] hover:scale-[1.02] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-xl shadow-[#0D2B1A]/20">
            Lập Hội Đồng Của Tôi — 2.868.686đ →
          </button>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 flex-wrap">
            <span>✓ 5 giám đốc AI</span>
            <span>✓ Bảo hành 14 ngày hoàn 100%</span>
            <span>✓ Trừ thẳng vào Khóa 2 khi nâng cấp</span>
          </div>
        </Reveal>
      </section>

      {/* [10] FOOTER */}
      <footer className="bg-[#0D2B1A] px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-[#F6F0E4] font-black font-mono">DungHoang.com</p>
          <p className="text-[#F6F0E4]/40 text-xs">
            © 2026 Dũng Hoàng · Telegram{' '}
            <a href="https://t.me/KentHoang" className="underline hover:text-[#F6F0E4]/70">@KentHoang</a>
            {' '}· Zalo 0938725413
          </p>
          <div className="flex justify-center gap-4 text-xs text-[#F6F0E4]/30">
            <a href="/24-ai-agent" className="hover:text-[#F6F0E4]/60">Khóa 1</a>
            <a href="/coaching" className="hover:text-[#F6F0E4]/60">Khóa 2</a>
            <a href="/portal" className="hover:text-[#F6F0E4]/60">Khu học</a>
          </div>
        </div>
      </footer>

      {/* Sticky bottom bar */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D2B1A]/95 backdrop-blur-md border-t border-[#F6F0E4]/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-slide-up">
          <div className="min-w-0">
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Hội Đồng Cố Vấn AI · 2.868.686đ</p>
            <p className="text-[#F6F0E4]/50 text-xs">5 giám đốc AI · Bảo hành 14 ngày</p>
          </div>
          <button onClick={open}
            className="flex-shrink-0 bg-[#8BC34A] hover:bg-[#7CB342] active:scale-[0.97] hover:scale-[1.02] text-[#0D2B1A] font-bold px-5 h-11 rounded-xl text-sm transition-all duration-200">
            Lập Hội Đồng →
          </button>
        </div>
      )}

      <CheckoutModal productId={product.id} open={showCheckout} onClose={() => setShowCheckout(false)} />
    </div>
  )
}
