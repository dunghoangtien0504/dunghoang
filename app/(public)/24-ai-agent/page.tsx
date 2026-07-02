'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS } from '@/lib/products'
import { KHOA1_SKILLS, SKILL_GROUPS } from '@/lib/skills'
import { ClipboardList, Clock, Bot, Repeat2, Home, Users, FlaskConical, RefreshCw, Shield } from 'lucide-react'

const product = PRODUCTS['khoa-1']

// ── FAQ — A.R.E.B framework, 7 objection ────────────────────────────────────
const FAQS = [
  {
    q: 'Tôi không phải dân công nghệ, học được không?',
    a: 'Mình hiểu lo lắng đó — vì bản thân mình cũng không phải dân tech. Và đây chính xác là người mình viết SOP này cho. Mỗi skill là quy trình từng bước cụ thể, bạn chỉ cần máy tính và ChatGPT miễn phí. 605 học viên, phần lớn chủ shop và coach không rành công nghệ, đã làm được. Bạn cũng sẽ làm được.',
  },
  {
    q: 'Tôi sợ mua rồi để đó, không làm được gì.',
    a: 'Đây là nỗi sợ mình gặp nhiều nhất — và hoàn toàn hợp lý sau khi đã từng mua khóa học bỏ xó. Chính vì vậy mình thiết kế mỗi skill thành SOP 30-60 phút, có output nhìn thấy ngay hôm đó. Không xem video lý thuyết rồi tự mày mò. Và nếu sau 14 ngày bạn không thấy gì hữu ích — mình hoàn 100% không hỏi lý do. Rủi ro về phía mình hoàn toàn.',
  },
  {
    q: 'Tôi có ChatGPT miễn phí rồi, sao phải mua khóa này?',
    a: 'Câu này mình được hỏi nhiều nhất, và nó rất hợp lý. ChatGPT là công cụ hỏi-đáp: bạn hỏi hay thì nó trả lời hay, nhưng bạn vẫn là người phải biết hỏi gì, theo thứ tự nào, xử lý kết quả ra sao — tức vẫn là "người làm". 24 AI agent ở đây là quy trình giao việc hoàn chỉnh: mỗi agent đã được đóng gói sẵn từ câu hỏi, thứ tự bước, đến khung output — bạn chỉ nạp thông tin business của mình vào là ra thành phẩm. Vẫn chạy trên chính ChatGPT bạn đang có, không tốn thêm phí công cụ nào.',
  },
  {
    q: 'Ngoài kia có nhiều khóa AI rẻ hơn, sao chọn cái này?',
    a: 'Hầu hết khóa AI dạy cách viết prompt hay thao tác với ChatGPT. Khóa 1 khác ở chỗ: 24 AI agent là 24 quy trình đang chạy thật trong business của mình — mỗi agent cho bạn output dùng được ngay (trang bán hàng, email, content 30 ngày...). Bạn không học lý thuyết — bạn copy quy trình đã được test 2 năm thực chiến.',
  },
  {
    q: 'Tôi đang rất bận, không có thời gian học.',
    a: 'Chính vì bận nên bạn mới cần hệ thống này hơn bao giờ hết. Mỗi agent 30-60 phút — học buổi tối 1 tiếng, cuối tuần 2 buổi là xong 4-5 agent. Không cần học hết 24 AI agent cùng lúc. Nhiều học viên nói agent đầu tiên đã tiết kiệm 1-2 tiếng ngay tuần đó. Sau đó thời gian tự mở ra.',
  },
  {
    q: 'Mỗi skill mất bao lâu?',
    a: 'Khoảng 30-60 phút nếu làm theo SOP. Cuối mỗi skill là output cụ thể bạn cầm được và dùng được ngay — không phải bài tập nộp, không phải quiz. Skill BRAND_DNA thường xong trong 45 phút và được dùng cho tất cả skill viết chữ về sau.',
  },
  {
    q: 'Thử Thách 7 Ngày có bắt buộc không? Lỡ dở giữa chừng thì sao?',
    a: 'Không bắt buộc — đó là lộ trình gợi ý để bạn có kết quả nhanh nhất trong tuần đầu. Bận thì làm 7 thành quả trong 2-3 tuần cũng được, khu học mở trọn đời không ai giục. Nhưng mình khuyên thật: cứ theo đúng 7 ngày một lần — cảm giác ngày 7 nhìn lại thấy trang bán, content, email của mình đã chạy thật, nó khác hẳn việc học rải rác.',
  },
  {
    q: 'Bảo hành thế nào?',
    a: '14 ngày hoàn 100%. Học thử ít nhất 3 skill đầu — nếu không thấy gì hữu ích, nhắn mình là hoàn trong 24 giờ. Mình không muốn giữ tiền của người không thấy giá trị.',
  },
  {
    q: 'Đã mua Mini hoặc muốn nâng lên Khóa 2 thì sao?',
    a: 'Đã mua Mini (368.686đ): số tiền đó trừ thẳng vào Khóa 1, chỉ cần thêm 500.000đ. Nhắn Telegram @KentHoang để mình áp dụng. Muốn lên Khóa 2: 868.686đ bạn trả hôm nay trừ vào Khóa 2 (3.868.686đ) — chỉ thêm 3.000.000đ là có thêm Tiểu Hà Mã kèm sát 24/7 và buổi Soi Hệ Thống 1-kèm-1.',
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

      {/* [0] ANNOUNCEMENT BAR — B.12 Scarcity thật */}
      <div className="bg-[#C0390E] text-white text-center py-2.5 px-4 text-xs sm:text-sm font-medium">
        Đợt đang học · Bonus file BRAND_DNA + Content 30 ngày kèm theo · 605+ học viên đã tiết kiệm 4-5h/ngày
      </div>

      {/* [1] HERO — B.1 SCPU + B.2 EAS + L1 CTA */}
      <section ref={heroRef} className="bg-[#0D2B1A] px-4 pt-12 pb-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-block bg-[#C0390E]/20 text-[#E87C5E] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Khóa 1 · Bản Tự Lập · 24 AI Agent for Business
          </div>

          {/* B.1 Headline: S(24 skill) C(đang dùng thật) P(tiết kiệm 4-5h) U(bắt đầu hôm nay) */}
          <h1 className="text-3xl sm:text-5xl font-black text-[#F6F0E4] leading-tight">
            24 AI Agent for Business<br/>
            <span className="text-[#C0390E]">Làm Việc Thay Bạn Mỗi Ngày</span><br/>
            <span className="text-xl sm:text-2xl font-bold text-[#F6F0E4]/60 block mt-2">Không phải lý thuyết. SOP đang chạy thật trong business mình.</span>
          </h1>

          {/* B.2 Sub: E(tiết kiệm 4-5h) A(605 người) S(chứng nhận học viên) */}
          <p className="text-[#F6F0E4]/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            605 solopreneur đã tiết kiệm 4-5 tiếng mỗi ngày bằng bộ SOP này.
            Bạn copy quy trình — AI làm phần nặng — bạn chỉ duyệt và đăng.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            {/* L1 CTA: tò mò, chưa tin */}
            <button onClick={open}
              className="h-14 px-8 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.02] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-lg shadow-red-900/30">
              Tôi Muốn Bắt Đầu Hôm Nay →
            </button>
            <a href="#24-skill"
              className="h-14 px-8 border border-[#F6F0E4]/20 text-[#F6F0E4]/70 hover:text-[#F6F0E4] text-sm font-medium rounded-2xl flex items-center justify-center transition-colors">
              Xem đủ 24 AI agent →
            </a>
          </div>
          <p className="text-[#F6F0E4]/40 text-xs">Bảo hành 14 ngày hoàn 100% · Khu học online 24/7</p>
        </div>
      </section>

      {/* [2] TRUST BAR — B.4 Authority sớm */}
      <section className="bg-white border-y border-[#DDD8CB] py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { n:'605+', label:'solopreneur đã học' },
              { n:'24',   label:'AI agent thực chiến' },
              { n:'4-5h', label:'tiết kiệm mỗi ngày' },
              { n:'14n',  label:'bảo hành hoàn 100%' },
            ].map(s => (
              <div key={s.n}>
                <p className="text-2xl sm:text-3xl font-black text-[#0D2B1A]">{s.n}</p>
                <p className="text-xs text-gray-400 mt-0.5 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [3] PAIN — B.3 Vấn đề 3 lớp: Symptom · Consequence · Identity */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#C0390E] uppercase tracking-widest">Bức tranh quen thuộc</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
              Bạn đang trả lương cho 1 người<br/>nhưng làm việc của 4-5 người.
            </h2>
          </div>

          {/* Lớp 1: Symptom — ngày làm việc cụ thể */}
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>7h sáng viết content. 9h check inbox trả lời. 11h gọi điện tư vấn khách. 2h chiều chỉnh ảnh. 5h gửi hàng. 8h tối soạn email. 10h chạy ads. 11h nghĩ ý tưởng cho ngày mai.</p>
            <p>Không phải vì bạn thích làm vậy. Mà vì không ai làm thay — và thuê người thêm tiền, thêm quản lý, thêm rủi ro.</p>
          </div>

          {/* Lớp 2: Consequence — hậu quả 6-12 tháng */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-3">
            <p className="font-bold text-[#0D2B1A] text-sm">Tiếp tục 6 tháng nữa như vầy:</p>
            {[
              'Bạn đốt cạn sức mà doanh số không scale được — vì bottleneck là chính bạn.',
              'Cơ hội bỏ lỡ không phải vì thiếu sản phẩm tốt — mà vì không có thời gian làm marketing đúng cách.',
              'Nhân viên AI của đối thủ đang làm việc 24/7 trong khi bạn vẫn tự gõ từng chữ.',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-orange-500 text-xs mt-1 flex-shrink-0">→</span>
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>

          {/* Lớp 3: Identity — mạnh nhất */}
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

          {/* L2 CTA: đang đồng cảm */}
          <button onClick={open}
            className="w-full h-14 bg-[#0D2B1A] hover:bg-[#153f27] active:scale-[0.97] hover:scale-[1.01] text-[#F6F0E4] font-bold rounded-2xl transition-all duration-200 shadow-md">
            Tôi Muốn Không Còn Làm Nhân Viên Cho Chính Mình →
          </button>
        </div>
      </section>

      {/* [4] BRIDGE/STORY — B.5 Before-After Story (7 thành phần A→G) */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-xs font-bold text-[#88860B] uppercase tracking-widest">Cách mình đến đây</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F6F0E4] leading-tight">
            Từ 2h sáng không ngủ được<br/>đến business chạy khi mình du lịch
          </h2>

          {/* A: Mong muốn ban đầu */}
          <p className="text-[#F6F0E4]/75 text-sm sm:text-base leading-relaxed">
            Mình muốn có business vừa sinh lợi vừa không ngốn cả cuộc sống. Không phải "bận kinh doanh" 14 tiếng mỗi ngày.
          </p>

          {/* B+C: Hiện tại thật + Đêm tối tâm hồn */}
          <div className="bg-[#0D2B1A]/50 border border-[#F6F0E4]/10 rounded-xl p-4 space-y-3">
            <p className="text-[#F6F0E4]/80 text-sm leading-relaxed">
              2h sáng. Mình vẫn đang ngồi viết bài content cho ngày mai. Homestay cần đăng, khóa học cần promote. Một mình xử hết.
            </p>
            <p className="text-[#F6F0E4]/80 text-sm leading-relaxed">
              Hôm đó mình nghĩ: nếu tiếp tục kiểu này, 5 năm nữa mình sẽ vẫn ngồi đây lúc 2h sáng, vẫn gõ từng chữ như vậy.
            </p>
          </div>

          {/* D: SP xuất hiện như bước ngoặt */}
          <p className="text-[#F6F0E4]/75 text-sm sm:text-base leading-relaxed">
            Mình bắt đầu thử xây từng AI agent cho từng việc cụ thể. Agent viết content theo đúng giọng mình. Agent nghiên cứu thị trường. Agent trả lời câu hỏi khách. Dùng các công cụ Vibe Coding để ráp chúng lại thành hệ thống. Lần đầu kết quả tệ. Mình không bỏ, mình chỉnh quy trình, thử lại. Chỉnh tiếp, làm lại.
          </p>

          {/* E+F: Hành động + Kết quả ≥3 số liệu */}
          <p className="text-[#F6F0E4] text-sm sm:text-base leading-relaxed font-medium">
            Sau 2 năm: tiết kiệm 4-5 tiếng mỗi ngày. 605 học viên đã áp dụng và làm được điều tương tự. Business chạy được cả khi mình đang trên máy bay đi Đà Lạt.
          </p>

          {/* G: Identity shift */}
          <p className="text-[#F6F0E4]/60 text-sm italic leading-relaxed">
            Mình không còn là nhân viên của chính mình nữa. 24 AI agent trong Khóa 1 là chính xác những gì mình đóng gói lại từ 2 năm đó.
          </p>

          {/* L3 CTA: đang tin tưởng */}
          <button onClick={open}
            className="w-full h-13 py-3.5 bg-[#C0390E] hover:bg-[#a02e0a] text-white font-black rounded-2xl transition-colors text-base">
            Giữ Suất Cho Tôi — 868.686đ →
          </button>
        </div>
      </section>

      {/* [5] HOW IT WORKS — B.8 Clarity 5 phần */}
      <section className="px-4 py-14 bg-[#FAF7F2] border-y border-[#DDD8CB]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Bộ 24 AI agent là gì</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">1 AI agent = 1 quy trình AI làm việc thay bạn</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: <ClipboardList className="w-4 h-4 text-[#3D6B4A]" />, title:'SOP từng bước', desc:'Mỗi skill là quy trình copy-paste, không cần đoán mò hay tự sáng tạo' },
              { icon: <Clock className="w-4 h-4 text-[#3D6B4A]" />, title:'30-60 phút/skill', desc:'Làm xong là có output dùng được ngay hôm đó, không phải học rồi về tự làm' },
              { icon: <Bot className="w-4 h-4 text-[#3D6B4A]" />, title:'AI làm phần nặng', desc:'Viết, lên ý tưởng, dựng khung — bạn chỉ đọc lại và chỉnh cho đúng business mình' },
              { icon: <Repeat2 className="w-4 h-4 text-[#3D6B4A]" />, title:'Dùng mãi không hết', desc:'Học 1 lần, dùng cho mọi sản phẩm, mọi chiến dịch — không lỗi mốt' },
            ].map(c => (
              <div key={c.title} className="bg-white border border-[#DDD8CB] rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#EAF5EF] flex items-center justify-center flex-shrink-0">{c.icon}</span>
                  <p className="font-bold text-[#0D2B1A] text-sm">{c.title}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#0D2B1A]/5 rounded-xl p-4 text-sm text-gray-600 leading-relaxed">
            <p><strong className="text-[#0D2B1A]">Mình nói thẳng:</strong> AI làm phần nặng (viết, lên ý tưởng, dựng khung). Bạn vẫn cần đọc lại và chỉnh cho đúng business mình — mất 5-15 phút. Cái khác biệt là: thay vì 2 tiếng tự viết, bạn mất 15 phút duyệt.</p>
          </div>
        </div>
      </section>

      {/* [6] 24 SKILLS — B.6 FAB + 4 lớp benefit */}
      <section id="24-skill" className="px-4 py-14 bg-white border-y border-[#DDD8CB]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">24 AI agent trong Khóa 1</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Mỗi skill cho bạn một thứ cầm được</h2>
            <p className="text-gray-500 text-sm">Mình ghi rõ skill làm được gì và bạn nhận lại gì — không nói chung chung</p>
          </div>

          <div className="space-y-4">
            {SKILL_GROUPS.map((group, gi) => {
              const items = KHOA1_SKILLS.filter(s => s.group === group)
              return (
                <div key={group} className="border border-[#DDD8CB] rounded-2xl overflow-hidden bg-white transition-all duration-200 hover:shadow-md hover:border-[#3D6B4A]/30">
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
            className="w-full h-14 bg-[#C0390E] hover:bg-[#a02e0a] text-white font-black rounded-2xl transition-colors shadow-lg shadow-red-900/20">
            Sở Hữu Bộ 24 AI Agent — 868.686đ →
          </button>
        </div>
      </section>

      {/* [6.5] THỬ THÁCH 7 NGÀY — lộ trình output thật, không chấm điểm */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#88860B] uppercase tracking-widest">Bắt đầu thế nào</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#F6F0E4] leading-tight">
              Thử Thách 7 Ngày — 7 Thành Quả
            </h2>
            <p className="text-[#F6F0E4]/60 text-sm max-w-md mx-auto leading-relaxed">
              Không bài kiểm tra, không điểm số. Mỗi ngày 45-60 phút, cuối ngày bạn cầm được một thứ thật.
              Hết ngày 7: hệ thống bán hàng của bạn đang chạy.
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              { day: 1, skill: '#01', name: 'Chân Dung Khách Hàng',
                old: 'Viết content xong không biết viết cho ai — đăng lên như nói vào khoảng không',
                output: 'Bản mô tả khách hàng chi tiết, mọi bài viết từ nay có người nhận cụ thể' },
              { day: 2, skill: '#02', name: 'Giọng Văn BRAND_DNA',
                old: 'Nhờ AI viết thì ra toàn văn mẫu chung chung, đọc phát biết ngay máy viết',
                output: 'File dạy AI viết đúng giọng bạn — dùng mãi cho mọi skill viết chữ về sau' },
              { day: 3, skill: '#07', name: 'Thiết Kế Offer',
                old: 'Sản phẩm tốt mà nói mãi khách vẫn không thấy khác gì chỗ bán rẻ hơn',
                output: 'Một offer hoàn chỉnh khách khó từ chối, sẵn để đưa lên trang bán' },
              { day: 4, skill: '#10', name: 'Dựng Landing Page + Thanh Toán Tự Động',
                old: 'Thuê ngoài 5-10 triệu chờ cả tuần; khách chuyển khoản phải ngồi check tay từng đơn',
                output: 'Trang bán hàng thật gắn QR Sepay — khách quét là tiền vào tài khoản, không cần check tay' },
              { day: 5, skill: '#18', name: 'Hệ Thống Content',
                old: 'Mỗi sáng ngồi cắn bút nghĩ "hôm nay đăng gì", cảm hứng lúc có lúc không',
                output: 'Lịch content + bài viết sẵn cho 2 tuần đầu, chỉ việc duyệt và đăng' },
              { day: 6, skill: '#15', name: 'Chuỗi Email Bán Hàng',
                old: 'Khách để lại email rồi... để đó, quên luôn — tiền rơi mà không ai nhặt',
                output: 'Bộ email tự động sẵn để dán vào công cụ gửi, khách được chăm không sót ai' },
              { day: 7, skill: '#13', name: 'Lên Sóng + Báo Đơn Telegram',
                old: 'Làm xong để trong máy, chần chừ mãi không dám đăng',
                output: 'Bài đầu tiên lên sóng — và từ nay mỗi đơn thành công, Telegram của bạn "ting" một tiếng' },
            ].map(d => (
              <div key={d.day} className="flex items-start gap-3 bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-xl px-4 py-3.5">
                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#C0390E] text-white font-black text-sm flex items-center justify-center">
                  N{d.day}
                </span>
                <div className="min-w-0 space-y-1">
                  <p className="text-[#F6F0E4] font-bold text-sm">
                    {d.name} <span className="text-[#88860B] text-xs font-mono ml-1">skill {d.skill}</span>
                  </p>
                  <p className="text-[#F6F0E4]/40 text-xs leading-relaxed">Cách cũ: {d.old}</p>
                  <p className="text-[#8BC34A] text-xs leading-relaxed font-medium">Cuối ngày {d.day}: {d.output}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#88860B]/15 border border-[#88860B]/30 rounded-xl p-4 space-y-1.5">
            <p className="text-[#F6F0E4] font-bold text-sm">Hoàn thành thử thách, bạn nhận thêm:</p>
            <p className="text-[#F6F0E4]/70 text-xs leading-relaxed">
              ✓ Thành quả được đưa lên Tường Thành Quả của khóa (nếu bạn đồng ý chia sẻ)<br/>
              ✓ Được mở tài khoản Cộng Tác Viên — giới thiệu khóa nhận hoa hồng 10-20%<br/>
              ✓ Còn 17 skill nữa để đào sâu theo nhu cầu riêng của bạn — không vội
            </p>
          </div>

          <button onClick={open}
            className="w-full h-14 bg-[#C0390E] hover:bg-[#a02e0a] text-white font-black rounded-2xl transition-colors text-base">
            Bắt Đầu Ngày 1 Của Tôi →
          </button>
        </div>
      </section>

      {/* [7] EMOTION — B.7 Future Pacing + Sensory + 4 hormone */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">6 tuần từ bây giờ — thứ Sáu chiều</h2>

          {/* Vivid imagery + Sensory detail */}
          <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-4 text-[#F6F0E4]/80 text-sm leading-relaxed">
            <p>3h chiều. Bạn đang uống cà phê. Không vội.</p>
            <p>Điện thoại rung — tiếng "ting" quen thuộc. Mở ra: 2 đơn về lúc bạn đang ngủ tối qua. Chatbot đã trả lời hết câu hỏi, khách tự chốt.</p>
            <p>Lịch content tháng sau đã có 30 bài AI làm sẵn — bạn chỉ cần approve 10 phút sáng nay.</p>
            <p className="text-[#F6F0E4]"><strong>Business vẫn đang chạy. Bạn không phải làm 1 mình nữa.</strong></p>
            <p className="text-[#88860B] text-xs">Không phải viễn tưởng — đây là lịch của mình và nhiều học viên đang sống.</p>
          </div>

          {/* Emotional contrast: Before vs After */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { before: '2h viết 1 bài content',    after: '15 phút approve bài AI viết' },
              { before: 'Trả lời inbox cả ngày',     after: 'Chatbot xử lý 70% tự động' },
              { before: 'Email soạn thủ công',        after: 'Chuỗi 5 email tự chạy theo lịch' },
              { before: 'Landing page: không có',     after: 'Trang bán hàng xong trong 1 buổi' },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#DDD8CB] p-3">
                <p className="text-xs text-red-400 line-through leading-snug">{r.before}</p>
                <p className="text-xs text-[#2D7A4F] font-semibold mt-1.5 leading-snug">✓ {r.after}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [8] AUTHORITY STACK — B.4 sâu, 7 nguồn + 5 dòng vàng */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-bold text-[#88860B] uppercase tracking-widest">Tại sao học từ mình</p>
            <h2 className="text-2xl font-black text-[#F6F0E4]">Không phải thầy giáo. Là người đang làm thật.</h2>
          </div>
          <div className="space-y-4">
            {[
              { icon: <Home className="w-4 h-4 text-[#88860B]" />, text:'Mình vận hành homestay + khoá học + tư vấn AI một mình — 24 AI agent này đang chạy thật trong business mình mỗi ngày' },
              { icon: <Users className="w-4 h-4 text-[#88860B]" />, text:'605 học viên từ chủ shop, coach, freelancer đến solopreneur nhiều ngành đã học và áp dụng được' },
              { icon: <FlaskConical className="w-4 h-4 text-[#88860B]" />, text:'SOP được test 2 năm thực chiến — không phải viết từ sách, không copy từ guru nước ngoài' },
              { icon: <RefreshCw className="w-4 h-4 text-[#88860B]" />, text:'Khóa 1 là nền tảng — mua xong muốn kèm sát, 868.686đ trừ vào Khóa 2 (3.868.686đ)' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#F6F0E4]/10 flex items-center justify-center flex-shrink-0 mt-0.5">{a.icon}</span>
                <p className="text-[#F6F0E4]/75 text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
          {/* 5 dòng vàng: kết nối uy tín với lợi ích */}
          <p className="text-[#F6F0E4]/50 text-sm italic leading-relaxed border-t border-[#F6F0E4]/10 pt-4">
            Mình không cần bạn tin mình ngay. Mình chỉ cần bạn thử 14 ngày — nếu không thấy gì có ích, hoàn 100%.
          </p>
        </div>
      </section>

      {/* [9] VALUE STACK + PRICING — B.9 + B.13 + L4 CTA */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Đầu tư</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">868.686đ — thay vì 25 triệu/tháng thuê người</h2>
          </div>

          {/* B.13 Value Stack */}
          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden">
            <div className="bg-[#0D2B1A] px-5 py-3">
              <p className="text-[#F6F0E4] font-bold text-sm">Toàn bộ bạn nhận được</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]">
              {[
                { item:'24 AI agent thực chiến (30-60 phút/agent)',     value:'12.000.000đ' },
                { item:'Skill Landing Page — Trang Bán Hàng AI',        value:'690.000đ' },
                { item:'Khu học online 24/7 — trọn đời',                value:'990.000đ' },
                { item:'Bộ prompt AI cho từng skill',                   value:'2.500.000đ' },
                { item:'🎁 File BRAND_DNA — dạy AI viết đúng giọng bạn', value:'199.000đ', bonus: true },
                { item:'🎁 Content 30 Ngày Không Cần Cảm Hứng (Notion)', value:'368.686đ', bonus: true },
              ].map((r, i) => (
                <div key={i} className={`px-5 py-3 flex justify-between items-center ${r.bonus ? 'bg-[#EAF5EF]' : ''}`}>
                  <p className={`text-sm ${r.bonus ? 'font-semibold text-[#2D7A4F]' : 'text-gray-700'}`}>{r.item}</p>
                  <p className={`text-sm font-bold flex-shrink-0 ml-4 ${r.bonus ? 'text-[#2D7A4F]' : 'text-gray-400'}`}>{r.value}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 bg-[#FAF7F2] flex justify-between items-center">
              <p className="font-bold text-[#0D2B1A]">Tổng giá trị</p>
              <p className="text-xl font-black text-gray-400 line-through">16.747.686đ</p>
            </div>
            <div className="px-5 py-4 bg-[#EAF5EF] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#0D2B1A]">Học phí</p>
                <p className="text-xs text-[#3D6B4A]">Đã mua Mini (368.686đ)? Chỉ thêm 500.000đ</p>
              </div>
              <p className="text-3xl font-black text-[#0D2B1A]">868.686đ</p>
            </div>
          </div>

          {/* B.9 ROI Math */}
          <div className="bg-[#0D2B1A]/5 rounded-xl p-4 text-sm text-gray-700 leading-relaxed space-y-2">
            <p><strong className="text-[#0D2B1A]">So sánh thực tế:</strong></p>
            <p>1 nhân viên content tối thiểu 8 triệu/tháng. 1 năm = 96 triệu. Nhân viên nghỉ, tiền mất.</p>
            <p>Khóa 1 = 868.686đ trả 1 lần — 24 AI agent dùng mãi, không bao giờ xin nghỉ.</p>
          </div>

          {/* L4 CTA: sẵn sàng */}
          <div className="space-y-3">
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-lg font-black rounded-2xl transition-colors shadow-xl shadow-red-900/25">
              Sở Hữu Ngay Hôm Nay — 868.686đ →
            </button>
            <p className="text-center text-xs text-gray-400">Chuyển khoản · Xác nhận trong 5-10 phút · Bảo hành 14 ngày hoàn 100%</p>
          </div>
        </div>
      </section>

      {/* [10] GUARANTEE — B.10 Risk Reversal L3 */}
      <section className="bg-[#EAF5EF] border-y border-[#2D7A4F]/20 px-4 py-12">
        <div className="max-w-2xl mx-auto flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#2D7A4F] flex items-center justify-center flex-shrink-0">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-[#0D2B1A]">Bảo Hành Kết Quả 14 Ngày</h3>
            <p className="text-[#3D6B4A] text-sm font-semibold">Không thấy gì hữu ích → nhắn mình → hoàn 100% trong 24h, không hỏi lý do</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              14 ngày đủ để thử ít nhất 5-7 skill đầu và thấy kết quả cụ thể. Nếu không — mình hoàn toàn bộ. Không điều kiện, không thủ tục rườm rà.
            </p>
          </div>
        </div>
      </section>

      {/* [11] IS FOR / NOT FOR — B.8 Clarity "not for whom" */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Khóa 1 dành cho ai?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-[#2D7A4F] text-sm">DÀNH CHO:</p>
              <div className="space-y-2">
                {[
                  'Solopreneur, chủ shop, coach, freelancer muốn tự làm marketing bằng AI',
                  'Người đang làm 1 mình nhưng muốn kết quả như có cả team',
                  'Đã có ChatGPT nhưng chưa áp dụng được vào business thực tế',
                  'Sẵn sàng bỏ 30-60 phút/skill để có công cụ dùng mãi',
                ].map((t, i) => <p key={i} className="text-sm text-gray-700 leading-snug flex gap-2"><span className="text-[#2D7A4F]">✓</span> {t}</p>)}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-gray-500 text-sm">KHÔNG PHẢI CHO:</p>
              <div className="space-y-2">
                {[
                  'Người muốn AI làm 100% mà không cần học hay review gì',
                  'Người cần ai kèm sát từng bước — đó là Khóa 2',
                  'Người không có sản phẩm hoặc dịch vụ thật để áp dụng',
                ].map((t, i) => <p key={i} className="text-sm text-gray-500 leading-snug flex gap-2"><span>✗</span> {t}</p>)}
              </div>
            </div>
          </div>
          {/* B.11 Reason Why + Identity Labeling */}
          <p className="text-center text-sm text-gray-500 italic">
            Người thông minh biết: rủi ro lớn nhất không phải là thử và fail — mà là không thử và 6 tháng sau vẫn ở đúng chỗ này.
          </p>
        </div>
      </section>

      {/* [12] FAQ — B.10 A.R.E.B, 7 objection */}
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

      {/* [13] TESTIMONIAL SÁT CTA — B.15 đặt đúng vị trí + B.16 L5 CTA */}
      <section className="px-4 py-14 bg-[#FAF7F2]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">605+ người đã làm được</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Không phải nghe mình kể — nghe từ họ</h2>
          </div>

          {/* B.15 Testimonials — 3 loại: kết quả nhanh, transformation, vượt nghi ngờ */}
          <div className="space-y-3">
            <div className="bg-white border border-[#DDD8CB] rounded-2xl p-4 space-y-2">
              <p className="text-xs text-[#88860B] font-bold">Kết quả nhanh</p>
              <p className="text-sm text-gray-700 leading-relaxed italic">"Skill BRAND_DNA xong trong 1 buổi. Tuần sau mình giao AI viết content, đọc lại thấy đúng giọng mình hơn cả khi tự viết. Lần đầu tiên không sợ hết ý tưởng."</p>
              <p className="text-xs font-bold text-[#0D2B1A]">Chủ shop thời trang online · Skill #02 BRAND_DNA</p>
            </div>
            <div className="bg-white border border-[#DDD8CB] rounded-2xl p-4 space-y-2">
              <p className="text-xs text-[#3D6B4A] font-bold">Thay đổi hẳn cách làm</p>
              <p className="text-sm text-gray-700 leading-relaxed italic">"Trước đây trả lời inbox mất 3-4 tiếng/ngày. Sau khi học skill chatbot và cài chatbot Zalo, 70% câu hỏi bot xử lý hết. Mình chỉ xử lý những case phức tạp — tiết kiệm được 2 tiếng rưỡi mỗi ngày."</p>
              <p className="text-xs font-bold text-[#0D2B1A]">Coach sức khỏe freelance · Skill #22 Chatbot</p>
            </div>
            <div className="bg-white border border-[#DDD8CB] rounded-2xl p-4 space-y-2">
              <p className="text-xs text-[#C0390E] font-bold">Vượt qua nghi ngờ ban đầu</p>
              <p className="text-sm text-gray-700 leading-relaxed italic">"Mình từng nghĩ AI viết content sẽ ra toàn mẫu chung chung, không ai đọc. Nhưng sau khi làm BRAND_DNA đúng cách, AI viết ra bài 400 chữ trong 5 phút — mình đăng lên và học viên nhắn 'bài hôm nay hay quá, cảm giác như đang ngồi nghe bạn kể chuyện'."</p>
              <p className="text-xs font-bold text-[#0D2B1A]">Solopreneur bán khóa học kỹ năng mềm · Skill #18 Content</p>
            </div>
          </div>

          {/* L5 CTA: final push — Identity Labeling + Presupposition */}
          <div className="space-y-4 text-center">
            <h2 className="text-xl sm:text-2xl font-black text-[#0D2B1A] leading-tight">
              Người kinh doanh thông minh không đợi điều kiện hoàn hảo.<br/>
              <span className="text-[#C0390E]">Họ bắt đầu với thứ có trong tay hôm nay.</span>
            </h2>
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.02] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-xl shadow-red-900/25">
              Quyết Định Hôm Nay — Xây Đội AI Của Tôi →
            </button>
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 flex-wrap">
              <span>✓ 24 AI agent thực chiến</span>
              <span>✓ Bảo hành 14 ngày hoàn 100%</span>
              <span>✓ Nâng lên Khóa 2 bất kỳ lúc nào</span>
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
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D2B1A]/95 backdrop-blur-md border-t border-[#F6F0E4]/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-slide-up">
          <div className="min-w-0">
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Khóa 1 Bản Tự Lập · 868.686đ</p>
            <p className="text-[#F6F0E4]/50 text-xs">24 AI agent · Bảo hành 14 ngày</p>
          </div>
          <button onClick={open}
            className="flex-shrink-0 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.02] text-white font-bold px-5 h-11 rounded-xl text-sm transition-all duration-200">
            Giữ Suất →
          </button>
        </div>
      )}

      {/* Float buttons */}
      <a href="https://t.me/KentHoang" target="_blank" rel="noopener noreferrer"
        className="fixed right-4 bottom-36 z-50 w-12 h-12 bg-[#229ED9] hover:bg-[#1a8fc0] rounded-full flex items-center justify-center shadow-lg transition-colors"
        title="Telegram @KentHoang">
        <span className="text-white font-bold text-xs">TG</span>
      </a>
      <a href="https://zalo.me/0938725413" target="_blank" rel="noopener noreferrer"
        className="fixed right-4 bottom-20 z-50 w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
        title="Chat Zalo">
        <span className="text-white font-bold text-xs">Zalo</span>
      </a>

      <CheckoutModal productId={product.id} open={showCheckout} onClose={() => setShowCheckout(false)} />
    </div>
  )
}
