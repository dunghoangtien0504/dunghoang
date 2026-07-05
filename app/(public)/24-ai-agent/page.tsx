'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS } from '@/lib/products'
import { KHOA1_SKILLS, SKILL_GROUPS } from '@/lib/skills'
import {
  ClipboardList, Clock, Bot, Repeat2, Home, Users, FlaskConical, RefreshCw,
  ShieldCheck, Check, X, ArrowRight, Gift, Zap, GraduationCap, Trophy
} from 'lucide-react'

const product = PRODUCTS['khoa-1']

// ── FAQ — A.R.E.B framework, 7 objection ────────────────────────────────────
const FAQS = [
  {
    q: 'Tôi không phải dân công nghệ, học được không?',
    a: 'Mình hiểu lo lắng đó, vì bản thân mình cũng không phải dân tech. Và đây chính xác là người mình viết SOP này cho. Mỗi skill là quy trình từng bước cụ thể, bạn chỉ cần máy tính và ChatGPT miễn phí. 605 học viên, phần lớn chủ shop và coach không rành công nghệ, đã làm được. Bạn cũng sẽ làm được.',
  },
  {
    q: 'Tôi sợ mua rồi để đó, không làm được gì.',
    a: 'Đây là nỗi sợ mình gặp nhiều nhất, và hoàn toàn hợp lý sau khi đã từng mua khóa học bỏ xó. Chính vì vậy mình thiết kế mỗi skill thành SOP 30-60 phút, có output nhìn thấy ngay hôm đó. Không xem video lý thuyết rồi tự mày mò. Và nếu sau 14 ngày bạn không thấy gì hữu ích, mình hoàn 100% không hỏi lý do. Rủi ro về phía mình hoàn toàn.',
  },
  {
    q: 'Tôi có ChatGPT miễn phí rồi, sao phải mua khóa này?',
    a: 'Câu này mình được hỏi nhiều nhất, và nó rất hợp lý. ChatGPT là công cụ hỏi đáp: bạn hỏi hay thì nó trả lời hay, nhưng bạn vẫn là người phải biết hỏi gì, theo thứ tự nào, xử lý kết quả ra sao. Tức vẫn là "người làm". 24 AI agent ở đây là quy trình giao việc hoàn chỉnh: mỗi agent đã được đóng gói sẵn từ câu hỏi, thứ tự bước, đến khung output. Bạn chỉ nạp thông tin business của mình vào là ra thành phẩm. Vẫn chạy trên chính ChatGPT bạn đang có, không tốn thêm phí công cụ nào.',
  },
  {
    q: 'Ngoài kia có nhiều khóa AI rẻ hơn, sao chọn cái này?',
    a: 'Hầu hết khóa AI dạy cách viết prompt hay thao tác với ChatGPT. Khóa 1 khác ở chỗ: 24 AI agent là 24 quy trình đang chạy thật trong business của mình, mỗi agent cho bạn output dùng được ngay (trang bán hàng, email, content 30 ngày...). Bạn không học lý thuyết. Bạn copy quy trình đã được test 2 năm thực chiến.',
  },
  {
    q: 'Tôi đang rất bận, không có thời gian học.',
    a: 'Chính vì bận nên bạn mới cần hệ thống này hơn bao giờ hết. Mỗi agent 30-60 phút. Học buổi tối 1 tiếng, cuối tuần 2 buổi là xong 4-5 agent. Không cần học hết 24 AI agent cùng lúc. Nhiều học viên nói agent đầu tiên đã tiết kiệm 1-2 tiếng ngay tuần đó. Sau đó thời gian tự mở ra.',
  },
  {
    q: 'Mỗi skill mất bao lâu?',
    a: 'Khoảng 30-60 phút nếu làm theo SOP. Cuối mỗi skill là output cụ thể bạn cầm được và dùng được ngay. Không phải bài tập nộp, không phải quiz. Skill BRAND_DNA thường xong trong 45 phút và được dùng cho tất cả skill viết chữ về sau.',
  },
  {
    q: 'Thử Thách 7 Ngày có bắt buộc không? Lỡ dở giữa chừng thì sao?',
    a: 'Không bắt buộc. Đó là lộ trình gợi ý để bạn có kết quả nhanh nhất trong tuần đầu. Bận thì làm 7 thành quả trong 2-3 tuần cũng được, khu học mở trọn đời không ai giục. Nhưng mình khuyên thật: cứ theo đúng 7 ngày một lần. Cảm giác ngày 7 nhìn lại thấy trang bán, content, email của mình đã chạy thật, nó khác hẳn việc học rải rác.',
  },
  {
    q: 'Bảo hành thế nào?',
    a: '14 ngày hoàn 100%. Học thử ít nhất 3 skill đầu, nếu không thấy gì hữu ích, nhắn mình là hoàn trong 24 giờ. Mình không muốn giữ tiền của người không thấy giá trị.',
  },
  {
    q: 'Đã mua Mini hoặc muốn nâng lên Khóa 2 thì sao?',
    a: 'Đã mua Mini (368.686đ): số tiền đó trừ thẳng vào Khóa 1, chỉ cần thêm 500.000đ. Nhắn Telegram @KentHoang để mình áp dụng. Muốn lên cao hơn: 868.686đ bạn trả hôm nay trừ thẳng vào Hội Đồng Cố Vấn (2.868.686đ, thêm 5 giám đốc AI + quy trình vận hành, chỉ thêm 2.000.000đ) hoặc vào Khóa 2 Coaching (3.868.686đ, chỉ thêm 3.000.000đ, có Dũng kèm sát 1-1).',
  },
]

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#DDD8CB] rounded-2xl overflow-hidden bg-white transition-all duration-200 hover:border-[#3D6B4A]/30">
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
    <div className="min-h-dvh bg-[#FAF7F0] font-sans text-[#0D2B1A]">

      {/* [0] ANNOUNCEMENT BAR */}
      <div className="bg-[#0D2B1A] text-[#F6F0E4] text-center py-2.5 px-4 text-xs sm:text-sm font-semibold tracking-wide relative z-20">
        <Gift size={14} className="inline -mt-0.5 mr-1.5 text-[#8BC34A]" />
        Bonus file BRAND_DNA + Content 30 ngày kèm theo · 605+ học viên đã tiết kiệm 4-5h/ngày
      </div>

      {/* [1] HERO — light, 2 cột trên desktop */}
      <section ref={heroRef} className="relative bg-[#FAF7F0] px-4 pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#DDD8CB] overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3D6B4A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center">

          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-[#DDD8CB] text-[#3D6B4A] text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C0390E] animate-pulse" />
              Khóa 1 · Bản Tự Lập · 24 AI Agent for Business
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0D2B1A] leading-[1.1] tracking-tight">
              24 AI agent
              <br />
              <span className="text-[#C0390E]">làm việc thay bạn mỗi ngày</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#3D6B4A] font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Không phải lý thuyết. Là SOP đang chạy thật trong business của mình.
            </p>

            <p className="text-sm text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              605 solopreneur đã tiết kiệm 4-5 tiếng mỗi ngày bằng bộ SOP này.
              Bạn copy quy trình, AI làm phần nặng, bạn chỉ duyệt và đăng.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <button onClick={open}
                className="h-14 px-8 bg-[#C0390E] hover:bg-[#A83208] active:scale-[0.98] text-white text-base font-bold rounded-2xl transition-all duration-200 shadow-lg shadow-[#C0390E]/20 flex items-center justify-center gap-2 group">
                Tôi Muốn Bắt Đầu Hôm Nay
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#24-skill"
                className="h-14 px-6 bg-white border border-[#DDD8CB] hover:border-[#3D6B4A]/40 text-[#0D2B1A] text-sm font-semibold rounded-2xl flex items-center justify-center transition-all duration-200">
                Xem đủ 24 AI agent
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-xs text-gray-500 font-medium pt-1">
              <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-[#2D7A4F]" /> Hoàn 100% trong 14 ngày</span>
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-[#2D7A4F]" /> Khu học online mở 24/7</span>
            </div>
          </div>

          {/* Thẻ tóm tắt offer */}
          <div className="hidden lg:block">
            <div className="bg-white border border-[#DDD8CB] rounded-3xl shadow-xl shadow-[#0D2B1A]/5 overflow-hidden">
              <div className="bg-[#0D2B1A] px-6 py-4 flex items-center justify-between">
                <p className="text-[#F6F0E4] font-bold text-sm">24 AI Agent for Business</p>
                <span className="text-[10px] font-bold text-[#8BC34A] bg-[#8BC34A]/10 border border-[#8BC34A]/25 px-2 py-0.5 rounded-full">605+ HỌC VIÊN</span>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { icon: Bot,           text: '24 AI agent thực chiến, mỗi agent 30-60 phút' },
                  { icon: GraduationCap, text: 'Khu học online 24/7, truy cập trọn đời' },
                  { icon: Trophy,        text: 'Thử Thách 7 Ngày: hết ngày 7 hệ thống đã chạy' },
                  { icon: Gift,          text: 'Tặng BRAND_DNA + Content 30 Ngày (Notion)' },
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
                    <p className="text-xs text-gray-400 line-through">Giá trị 16.747.686đ</p>
                    <p className="text-3xl font-black text-[#0D2B1A]">868.686đ</p>
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

      {/* [2] TRUST BAR */}
      <section className="bg-white border-b border-[#DDD8CB]/80 py-6 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: Users,       n:'605+', label:'solopreneur đã học' },
            { icon: Bot,         n:'24',   label:'AI agent thực chiến' },
            { icon: Clock,       n:'4-5h', label:'tiết kiệm mỗi ngày' },
            { icon: ShieldCheck, n:'14 ngày', label:'bảo hành hoàn 100%' },
          ].map(s => {
            const Icon = s.icon
            return (
              <div key={s.n} className="space-y-1">
                <Icon size={18} className="mx-auto text-[#3D6B4A]" />
                <p className="text-xl sm:text-2xl font-extrabold text-[#0D2B1A] tracking-tight">{s.n}</p>
                <p className="text-xs text-gray-500 font-medium leading-tight">{s.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* [3] PAIN — 3 lớp: Symptom · Consequence · Identity */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-3 text-center">
            <span className="inline-block text-xs font-bold text-[#C0390E] uppercase tracking-widest bg-[#C0390E]/5 border border-[#C0390E]/15 px-3 py-1 rounded-full">Bức tranh quen thuộc</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
              Bạn đang trả lương cho 1 người<br/>nhưng làm việc của 4-5 người
            </h2>
          </div>

          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>7h sáng viết content. 9h check inbox trả lời. 11h gọi điện tư vấn khách. 2h chiều chỉnh ảnh. 5h gửi hàng. 8h tối soạn email. 10h chạy ads. 11h nghĩ ý tưởng cho ngày mai.</p>
            <p>Không phải vì bạn thích làm vậy. Mà vì không ai làm thay. Còn thuê người thì thêm tiền, thêm quản lý, thêm rủi ro.</p>
          </div>

          <div className="bg-white border border-[#DDD8CB] rounded-2xl p-6 space-y-3">
            <p className="font-bold text-[#0D2B1A] text-sm">Tiếp tục 6 tháng nữa như vầy:</p>
            {[
              'Bạn đốt cạn sức mà doanh số không scale được, vì bottleneck là chính bạn.',
              'Cơ hội bỏ lỡ không phải vì thiếu sản phẩm tốt, mà vì không có thời gian làm marketing đúng cách.',
              'Nhân viên AI của đối thủ đang làm việc 24/7 trong khi bạn vẫn tự gõ từng chữ.',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <ArrowRight size={14} className="text-[#C0390E] mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>

          <div className="border-l-4 border-[#C0390E] pl-4 space-y-3">
            <p className="text-gray-700 leading-relaxed">
              Có một khoảnh khắc mình nhận ra mình không còn là chủ business nữa.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Mình là nhân viên. Nhân viên của chính mình. Không lương, không nghỉ, không thăng tiến.
            </p>
            <p className="font-bold text-[#0D2B1A]">
              24 AI agent trong Khóa 1 là để thay đổi điều đó.
            </p>
          </div>

          <button onClick={open}
            className="w-full h-14 bg-[#0D2B1A] hover:bg-[#153f27] active:scale-[0.98] text-[#F6F0E4] font-bold rounded-2xl transition-all duration-200 shadow-md flex items-center justify-center gap-2">
            Tôi Không Muốn Làm Nhân Viên Cho Chính Mình Nữa
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* [4] BRIDGE/STORY — Before-After Story */}
      <section className="bg-white border-y border-[#DDD8CB]/80 px-4 py-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-3 text-center">
            <span className="inline-block text-xs font-bold text-[#88860B] uppercase tracking-widest bg-[#88860B]/10 border border-[#88860B]/25 px-3 py-1 rounded-full">Cách mình đến đây</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
              Từ 2h sáng không ngủ được<br/>đến business chạy khi mình du lịch
            </h2>
          </div>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Mình muốn có business vừa sinh lợi vừa không ngốn cả cuộc sống. Không phải "bận kinh doanh" 14 tiếng mỗi ngày.
          </p>

          <div className="bg-[#FAF7F0] border border-[#DDD8CB] rounded-2xl p-5 space-y-3">
            <p className="text-gray-700 text-sm leading-relaxed">
              2h sáng. Mình vẫn đang ngồi viết bài content cho ngày mai. Homestay cần đăng, khóa học cần promote. Một mình xử hết.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Hôm đó mình nghĩ: nếu tiếp tục kiểu này, 5 năm nữa mình sẽ vẫn ngồi đây lúc 2h sáng, vẫn gõ từng chữ như vậy.
            </p>
          </div>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Mình bắt đầu thử xây từng AI agent cho từng việc cụ thể. Agent viết content theo đúng giọng mình. Agent nghiên cứu thị trường. Agent trả lời câu hỏi khách. Dùng các công cụ Vibe Coding để ráp chúng lại thành hệ thống. Lần đầu kết quả tệ. Mình không bỏ, mình chỉnh quy trình, thử lại. Chỉnh tiếp, làm lại.
          </p>

          <p className="text-[#0D2B1A] text-sm sm:text-base leading-relaxed font-semibold">
            Sau 2 năm: tiết kiệm 4-5 tiếng mỗi ngày. 605 học viên đã áp dụng và làm được điều tương tự. Business chạy được cả khi mình đang trên máy bay đi Đà Lạt.
          </p>

          <p className="text-gray-500 text-sm italic leading-relaxed">
            Mình không còn là nhân viên của chính mình nữa. 24 AI agent trong Khóa 1 là chính xác những gì mình đóng gói lại từ 2 năm đó.
          </p>

          <button onClick={open}
            className="w-full h-14 bg-[#C0390E] hover:bg-[#A83208] text-white font-black rounded-2xl transition-colors text-base flex items-center justify-center gap-2">
            Giữ Suất Cho Tôi · 868.686đ
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* [5] HOW IT WORKS */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-block text-xs font-bold text-[#3D6B4A] uppercase tracking-widest bg-[#3D6B4A]/5 border border-[#3D6B4A]/15 px-3 py-1 rounded-full">Bộ 24 AI agent là gì</span>
            <h2 className="text-2xl font-black text-[#0D2B1A]">1 AI agent = 1 quy trình AI làm việc thay bạn</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: ClipboardList, title:'SOP từng bước', desc:'Mỗi skill là quy trình copy dán, không cần đoán mò hay tự sáng tạo' },
              { icon: Clock,   title:'30-60 phút mỗi skill', desc:'Làm xong là có output dùng được ngay hôm đó, không phải học rồi về tự làm' },
              { icon: Bot,     title:'AI làm phần nặng', desc:'Viết, lên ý tưởng, dựng khung. Bạn chỉ đọc lại và chỉnh cho đúng business mình' },
              { icon: Repeat2, title:'Dùng mãi không hết', desc:'Học 1 lần, dùng cho mọi sản phẩm, mọi chiến dịch, không lỗi mốt' },
            ].map(c => {
              const Icon = c.icon
              return (
                <div key={c.title} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[#EAF5EF] flex items-center justify-center flex-shrink-0">
                      <Icon size={15} className="text-[#3D6B4A]" />
                    </span>
                    <p className="font-bold text-[#0D2B1A] text-sm">{c.title}</p>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              )
            })}
          </div>
          <div className="bg-white border border-[#DDD8CB] rounded-2xl p-5 text-sm text-gray-600 leading-relaxed">
            <p><strong className="text-[#0D2B1A]">Mình nói thẳng:</strong> AI làm phần nặng (viết, lên ý tưởng, dựng khung). Bạn vẫn cần đọc lại và chỉnh cho đúng business mình, mất 5-15 phút. Cái khác biệt là: thay vì 2 tiếng tự viết, bạn mất 15 phút duyệt.</p>
          </div>
        </div>
      </section>

      {/* [6] 24 SKILLS */}
      <section id="24-skill" className="px-4 py-20 bg-white border-y border-[#DDD8CB]/80">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-block text-xs font-bold text-[#3D6B4A] uppercase tracking-widest bg-[#3D6B4A]/5 border border-[#3D6B4A]/15 px-3 py-1 rounded-full">24 AI agent trong Khóa 1</span>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Mỗi skill cho bạn một thứ cầm được</h2>
            <p className="text-gray-500 text-sm">Mình ghi rõ skill làm được gì và bạn nhận lại gì, không nói chung chung</p>
          </div>

          <div className="space-y-4">
            {SKILL_GROUPS.map((group, gi) => {
              const items = KHOA1_SKILLS.filter(s => s.group === group)
              return (
                <div key={group} className="border border-[#DDD8CB] rounded-2xl overflow-hidden bg-white transition-all duration-200 hover:border-[#3D6B4A]/30">
                  <div className="bg-[#0D2B1A] px-5 py-2.5 flex items-center gap-2">
                    <span className="text-[#8BC34A] font-black text-xs font-mono">N{gi + 1}</span>
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
                            {s.proven && <span className="text-[10px] bg-[#EAF5EF] text-[#2D7A4F] px-1.5 py-0.5 rounded-full font-semibold">đã chứng minh</span>}
                            {s.inMini && <span className="text-[10px] bg-[#FFF3CD] text-[#856404] px-1.5 py-0.5 rounded-full font-semibold">có trong Mini</span>}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.does}</p>
                          <p className="text-xs text-[#3D6B4A] mt-1"><strong>Bạn nhận:</strong> {s.output}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          <button onClick={open}
            className="w-full h-14 bg-[#C0390E] hover:bg-[#A83208] text-white font-black rounded-2xl transition-colors shadow-lg shadow-[#C0390E]/15 flex items-center justify-center gap-2">
            Sở Hữu Bộ 24 AI Agent · 868.686đ
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* [6.5] THỬ THÁCH 7 NGÀY */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-block text-xs font-bold text-[#88860B] uppercase tracking-widest bg-[#88860B]/10 border border-[#88860B]/25 px-3 py-1 rounded-full">Bắt đầu thế nào</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
              Thử Thách 7 Ngày · 7 Thành Quả
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
              Không bài kiểm tra, không điểm số. Mỗi ngày 45-60 phút, cuối ngày bạn cầm được một thứ thật.
              Hết ngày 7: hệ thống bán hàng của bạn đang chạy.
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              { day: 1, skill: '#01', name: 'Chân Dung Khách Hàng',
                old: 'Viết content xong không biết viết cho ai, đăng lên như nói vào khoảng không',
                output: 'Bản mô tả khách hàng chi tiết, mọi bài viết từ nay có người nhận cụ thể' },
              { day: 2, skill: '#02', name: 'Giọng Văn BRAND_DNA',
                old: 'Nhờ AI viết thì ra toàn văn mẫu chung chung, đọc phát biết ngay máy viết',
                output: 'File dạy AI viết đúng giọng bạn, dùng mãi cho mọi skill viết chữ về sau' },
              { day: 3, skill: '#07', name: 'Thiết Kế Offer',
                old: 'Sản phẩm tốt mà nói mãi khách vẫn không thấy khác gì chỗ bán rẻ hơn',
                output: 'Một offer hoàn chỉnh khách khó từ chối, sẵn để đưa lên trang bán' },
              { day: 4, skill: '#10', name: 'Dựng Landing Page + Thanh Toán Tự Động',
                old: 'Thuê ngoài 5-10 triệu chờ cả tuần; khách chuyển khoản phải ngồi check tay từng đơn',
                output: 'Trang bán hàng thật gắn QR Sepay, khách quét là tiền vào tài khoản' },
              { day: 5, skill: '#18', name: 'Hệ Thống Content',
                old: 'Mỗi sáng ngồi cắn bút nghĩ "hôm nay đăng gì", cảm hứng lúc có lúc không',
                output: 'Lịch content + bài viết sẵn cho 2 tuần đầu, chỉ việc duyệt và đăng' },
              { day: 6, skill: '#15', name: 'Chuỗi Email Bán Hàng',
                old: 'Khách để lại email rồi... để đó, quên luôn. Tiền rơi mà không ai nhặt',
                output: 'Bộ email tự động sẵn để dán vào công cụ gửi, khách được chăm không sót ai' },
              { day: 7, skill: '#13', name: 'Lên Sóng + Báo Đơn Telegram',
                old: 'Làm xong để trong máy, chần chừ mãi không dám đăng',
                output: 'Bài đầu tiên lên sóng. Từ nay mỗi đơn thành công, Telegram của bạn "ting" một tiếng' },
            ].map(d => (
              <div key={d.day} className="flex items-start gap-3 bg-white border border-[#DDD8CB] rounded-2xl px-4 py-3.5">
                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#0D2B1A] text-[#F6F0E4] font-black text-sm flex items-center justify-center">
                  N{d.day}
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-[#0D2B1A] font-bold text-sm">
                    {d.name} <span className="text-[#88860B] text-xs font-mono ml-1">skill {d.skill}</span>
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">Cách cũ: {d.old}</p>
                  <p className="text-[#2D7A4F] text-xs leading-relaxed font-medium">Cuối ngày {d.day}: {d.output}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#EAF5EF] border border-[#2D7A4F]/25 rounded-2xl p-5 space-y-2">
            <p className="text-[#0D2B1A] font-bold text-sm">Hoàn thành thử thách, bạn nhận thêm:</p>
            {[
              'Thành quả được đưa lên Tường Thành Quả của khóa (nếu bạn đồng ý chia sẻ)',
              'Được mở tài khoản Cộng Tác Viên: giới thiệu khóa nhận hoa hồng 10-20%',
              'Còn 17 skill nữa để đào sâu theo nhu cầu riêng của bạn, không vội',
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2">
                <Check size={13} className="text-[#2D7A4F] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed">{t}</p>
              </div>
            ))}
          </div>

          <button onClick={open}
            className="w-full h-14 bg-[#C0390E] hover:bg-[#A83208] text-white font-black rounded-2xl transition-colors text-base flex items-center justify-center gap-2">
            Bắt Đầu Ngày 1 Của Tôi
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* [7] EMOTION — Future Pacing */}
      <section className="px-4 py-20 bg-white border-y border-[#DDD8CB]/80">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">6 tuần từ bây giờ, thứ Sáu chiều</h2>

          <div className="bg-[#FAF7F0] border border-[#DDD8CB] rounded-2xl p-6 space-y-4 text-gray-600 text-sm leading-relaxed">
            <p>3h chiều. Bạn đang uống cà phê. Không vội.</p>
            <p>Điện thoại rung, tiếng "ting" quen thuộc. Mở ra: 2 đơn về lúc bạn đang ngủ tối qua. Chatbot đã trả lời hết câu hỏi, khách tự chốt.</p>
            <p>Lịch content tháng sau đã có 30 bài AI làm sẵn. Bạn chỉ cần duyệt 10 phút sáng nay.</p>
            <p className="text-[#0D2B1A] font-bold">Business vẫn đang chạy. Bạn không phải làm 1 mình nữa.</p>
            <p className="text-[#88860B] text-xs font-medium">Không phải viễn tưởng. Đây là lịch của mình và nhiều học viên đang sống.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { before: '2h viết 1 bài content',    after: '15 phút duyệt bài AI viết' },
              { before: 'Trả lời inbox cả ngày',     after: 'Chatbot xử lý 70% tự động' },
              { before: 'Email soạn thủ công',        after: 'Chuỗi 5 email tự chạy theo lịch' },
              { before: 'Landing page: không có',     after: 'Trang bán hàng xong trong 1 buổi' },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#DDD8CB] p-4">
                <p className="text-xs text-gray-400 line-through leading-snug">{r.before}</p>
                <p className="text-xs text-[#2D7A4F] font-semibold mt-1.5 leading-snug flex items-start gap-1">
                  <Check size={12} className="mt-0.5 flex-shrink-0" /> {r.after}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [8] AUTHORITY */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-block text-xs font-bold text-[#88860B] uppercase tracking-widest bg-[#88860B]/10 border border-[#88860B]/25 px-3 py-1 rounded-full">Tại sao học từ mình</span>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Không phải thầy giáo. Là người đang làm thật.</h2>
          </div>
          <div className="space-y-3">
            {[
              { icon: Home,         text:'Mình vận hành homestay + khóa học + tư vấn AI một mình. 24 AI agent này đang chạy thật trong business mình mỗi ngày.' },
              { icon: Users,        text:'605 học viên từ chủ shop, coach, freelancer đến solopreneur nhiều ngành đã học và áp dụng được.' },
              { icon: FlaskConical, text:'SOP được test 2 năm thực chiến. Không phải viết từ sách, không copy từ guru nước ngoài.' },
              { icon: RefreshCw,    text:'Khóa 1 là nền tảng. Mua xong muốn kèm sát, 868.686đ trừ thẳng vào Khóa 2 (3.868.686đ).' },
            ].map((a, i) => {
              const Icon = a.icon
              return (
                <div key={i} className="flex items-start gap-4 bg-white border border-[#DDD8CB] rounded-2xl p-5">
                  <span className="w-9 h-9 rounded-xl bg-[#EAF5EF] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#2D7A4F]" />
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed pt-1.5">{a.text}</p>
                </div>
              )
            })}
          </div>
          <p className="text-gray-500 text-sm italic leading-relaxed border-t border-[#DDD8CB] pt-4 text-center">
            Mình không cần bạn tin mình ngay. Mình chỉ cần bạn thử 14 ngày. Không thấy gì có ích, hoàn 100%.
          </p>
        </div>
      </section>

      {/* [9] VALUE STACK + PRICING */}
      <section className="px-4 py-20 bg-white border-y border-[#DDD8CB]/80">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-block text-xs font-bold text-[#3D6B4A] uppercase tracking-widest bg-[#3D6B4A]/5 border border-[#3D6B4A]/15 px-3 py-1 rounded-full">Đầu tư</span>
            <h2 className="text-2xl font-black text-[#0D2B1A]">868.686đ, thay vì 25 triệu mỗi tháng thuê người</h2>
          </div>

          <div className="bg-white border-2 border-[#0D2B1A] rounded-3xl overflow-hidden shadow-xl">
            <div className="bg-[#0D2B1A] px-5 py-3.5">
              <p className="text-[#F6F0E4] font-bold text-sm">Toàn bộ bạn nhận được</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]/80">
              {[
                { item:'24 AI agent thực chiến (30-60 phút mỗi agent)', value:'12.000.000đ' },
                { item:'Skill Landing Page: Trang Bán Hàng AI',          value:'690.000đ' },
                { item:'Khu học online 24/7, truy cập trọn đời',        value:'990.000đ' },
                { item:'Bộ prompt AI cho từng skill',                    value:'2.500.000đ' },
                { item:'Tặng: File BRAND_DNA dạy AI viết đúng giọng bạn', value:'199.000đ', bonus: true },
                { item:'Tặng: Content 30 Ngày Không Cần Cảm Hứng (Notion)', value:'368.686đ', bonus: true },
              ].map((r, i) => (
                <div key={i} className={`px-5 py-3.5 flex justify-between items-center ${r.bonus ? 'bg-[#EAF5EF]/70' : ''}`}>
                  <p className={`text-sm flex items-start gap-2 ${r.bonus ? 'font-semibold text-[#2D7A4F]' : 'text-gray-700'}`}>
                    {r.bonus && <Gift size={14} className="mt-0.5 flex-shrink-0" />}
                    {r.item}
                  </p>
                  <p className={`text-sm font-bold flex-shrink-0 ml-4 ${r.bonus ? 'text-[#2D7A4F]' : 'text-gray-400 line-through'}`}>{r.value}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-[#FAF7F2] flex justify-between items-center border-t border-[#DDD8CB]">
              <p className="font-bold text-[#0D2B1A]">Tổng giá trị</p>
              <p className="text-xl font-black text-gray-400 line-through">16.747.686đ</p>
            </div>
            <div className="px-5 py-5 bg-[#EAF5EF] flex justify-between items-center border-t-2 border-[#0D2B1A]">
              <div>
                <p className="font-black text-[#0D2B1A]">Học phí</p>
                <p className="text-xs text-[#3D6B4A]">Đã mua Mini (368.686đ)? Chỉ thêm 500.000đ</p>
              </div>
              <p className="text-3xl font-black text-[#0D2B1A]">868.686đ</p>
            </div>
          </div>

          <div className="bg-[#FAF7F0] border border-[#DDD8CB] rounded-2xl p-5 text-sm text-gray-600 leading-relaxed space-y-2">
            <p><strong className="text-[#0D2B1A]">So sánh thực tế:</strong></p>
            <p>1 nhân viên content tối thiểu 8 triệu mỗi tháng. 1 năm là 96 triệu. Nhân viên nghỉ, tiền mất.</p>
            <p>Khóa 1 là 868.686đ trả 1 lần. 24 AI agent dùng mãi, không bao giờ xin nghỉ.</p>
          </div>

          <div className="space-y-3">
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#A83208] text-white text-lg font-black rounded-2xl transition-colors shadow-xl shadow-[#C0390E]/20 flex items-center justify-center gap-2">
              Sở Hữu Ngay Hôm Nay · 868.686đ
              <ArrowRight size={20} />
            </button>
            <p className="text-center text-xs text-gray-400">Chuyển khoản QR · Kích hoạt tự động · Bảo hành 14 ngày hoàn 100%</p>
          </div>
        </div>
      </section>

      {/* [10] GUARANTEE */}
      <section className="bg-[#EAF5EF] border-y border-[#2D7A4F]/20 px-4 py-14">
        <div className="max-w-2xl mx-auto flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#2D7A4F] flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={26} className="text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#0D2B1A]">Bảo Hành Kết Quả 14 Ngày</h3>
            <p className="text-[#2D7A4F] text-sm font-semibold">Không thấy gì hữu ích, nhắn mình, hoàn 100% trong 24h, không hỏi lý do</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              14 ngày đủ để thử ít nhất 5-7 skill đầu và thấy kết quả cụ thể. Nếu không, mình hoàn toàn bộ. Không điều kiện, không thủ tục rườm rà.
            </p>
          </div>
        </div>
      </section>

      {/* [11] IS FOR / NOT FOR */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Khóa 1 dành cho ai?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-[#2D7A4F] text-sm flex items-center gap-2">
                <Check size={15} /> DÀNH CHO:
              </p>
              <div className="space-y-2">
                {[
                  'Solopreneur, chủ shop, coach, freelancer muốn tự làm marketing bằng AI',
                  'Người đang làm 1 mình nhưng muốn kết quả như có cả team',
                  'Đã có ChatGPT nhưng chưa áp dụng được vào business thực tế',
                  'Sẵn sàng bỏ 30-60 phút mỗi skill để có công cụ dùng mãi',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={13} className="text-[#2D7A4F] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700 leading-snug">{t}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3">
              <p className="font-bold text-gray-400 text-sm flex items-center gap-2">
                <X size={15} /> KHÔNG PHẢI CHO:
              </p>
              <div className="space-y-2">
                {[
                  'Người muốn AI làm 100% mà không cần học hay duyệt gì',
                  'Người cần ai kèm sát từng bước: đó là Khóa 2',
                  'Người không có sản phẩm hoặc dịch vụ thật để áp dụng',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <X size={13} className="text-gray-300 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-500 leading-snug">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 italic">
            Rủi ro lớn nhất không phải là thử và sai. Là không thử, và 6 tháng sau vẫn ở đúng chỗ này.
          </p>
        </div>
      </section>

      {/* [12] FAQ */}
      <section className="bg-white border-y border-[#DDD8CB]/80 px-4 py-20">
        <div className="max-w-2xl mx-auto space-y-6">
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

      {/* [13] TESTIMONIAL + FINAL CTA */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="inline-block text-xs font-bold text-[#3D6B4A] uppercase tracking-widest bg-[#3D6B4A]/5 border border-[#3D6B4A]/15 px-3 py-1 rounded-full">605+ người đã làm được</span>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Không phải nghe mình kể. Nghe từ họ.</h2>
          </div>

          <div className="space-y-3">
            <div className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-2">
              <p className="text-xs text-[#88860B] font-bold uppercase tracking-wider">Kết quả nhanh</p>
              <p className="text-sm text-gray-700 leading-relaxed italic">"Skill BRAND_DNA xong trong 1 buổi. Tuần sau mình giao AI viết content, đọc lại thấy đúng giọng mình hơn cả khi tự viết. Lần đầu tiên không sợ hết ý tưởng."</p>
              <p className="text-xs font-bold text-[#0D2B1A]">Chủ shop thời trang online · Skill #02 BRAND_DNA</p>
            </div>
            <div className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-2">
              <p className="text-xs text-[#3D6B4A] font-bold uppercase tracking-wider">Thay đổi hẳn cách làm</p>
              <p className="text-sm text-gray-700 leading-relaxed italic">"Trước đây trả lời inbox mất 3-4 tiếng mỗi ngày. Sau khi học skill chatbot và cài chatbot Zalo, 70% câu hỏi bot xử lý hết. Mình chỉ xử lý những case phức tạp, tiết kiệm được 2 tiếng rưỡi mỗi ngày."</p>
              <p className="text-xs font-bold text-[#0D2B1A]">Coach sức khỏe freelance · Skill #22 Chatbot</p>
            </div>
            <div className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-2">
              <p className="text-xs text-[#C0390E] font-bold uppercase tracking-wider">Vượt qua nghi ngờ ban đầu</p>
              <p className="text-sm text-gray-700 leading-relaxed italic">"Mình từng nghĩ AI viết content sẽ ra toàn mẫu chung chung, không ai đọc. Nhưng sau khi làm BRAND_DNA đúng cách, AI viết ra bài 400 chữ trong 5 phút. Mình đăng lên và học viên nhắn 'bài hôm nay hay quá, cảm giác như đang ngồi nghe bạn kể chuyện'."</p>
              <p className="text-xs font-bold text-[#0D2B1A]">Solopreneur bán khóa học kỹ năng mềm · Skill #18 Content</p>
            </div>
          </div>

          <div className="space-y-4 text-center pt-4">
            <h2 className="text-xl sm:text-2xl font-black text-[#0D2B1A] leading-tight">
              Người kinh doanh thông minh không đợi điều kiện hoàn hảo.<br/>
              <span className="text-[#C0390E]">Họ bắt đầu với thứ có trong tay hôm nay.</span>
            </h2>
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#A83208] active:scale-[0.98] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-xl shadow-[#C0390E]/25 flex items-center justify-center gap-2">
              Xây Đội AI Của Tôi Hôm Nay
              <ArrowRight size={19} />
            </button>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-400 font-semibold">
              <span className="flex items-center gap-1"><Check size={12} className="text-[#2D7A4F]" /> 24 AI agent thực chiến</span>
              <span className="flex items-center gap-1"><Check size={12} className="text-[#2D7A4F]" /> Hoàn tiền 14 ngày</span>
              <span className="flex items-center gap-1"><Check size={12} className="text-[#2D7A4F]" /> Nâng lên Khóa 2 bất kỳ lúc nào</span>
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
            <a href="https://t.me/KentHoang" className="underline hover:text-[#F6F0E4]/70">@KentHoang</a>
            {' '}· Zalo 0938725413
          </p>
          <div className="flex justify-center gap-4 text-xs text-[#F6F0E4]/30">
            <a href="/portal" className="hover:text-[#F6F0E4]/60">Khu học</a>
            <a href="/coaching" className="hover:text-[#F6F0E4]/60">Khóa 2</a>
            <a href="/tin-tuc" className="hover:text-[#F6F0E4]/60">Tin tức</a>
          </div>
        </div>
      </footer>

      {/* Sticky bottom bar */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D2B1A]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-slide-up">
          <div className="min-w-0">
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Khóa 1 Bản Tự Lập · 868.686đ</p>
            <p className="text-[#C8D5C9]/60 text-xs truncate">24 AI agent · Bảo hành 14 ngày</p>
          </div>
          <button onClick={open}
            className="flex-shrink-0 bg-[#C0390E] hover:bg-[#A83208] text-white font-bold px-5 h-11 rounded-xl text-sm transition-all">
            Giữ Suất →
          </button>
        </div>
      )}

      <CheckoutModal productId={product.id} open={showCheckout} onClose={() => setShowCheckout(false)} />
    </div>
  )
}
