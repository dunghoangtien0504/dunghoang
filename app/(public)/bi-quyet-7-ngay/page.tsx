'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS } from '@/lib/products'

const product = PRODUCTS.challenge_368

const DAYS = [
  { n:1, skill:'BRAND DNA',      title:'Nạp giọng văn — Dạy AI viết đúng giọng bạn',          result:'AI viết 1 bài Facebook nghe như chính bạn' },
  { n:2, skill:'Social Content', title:'AI viết caption — Đăng 1 cái thật trong ngày',          result:'3 caption sẵn trong 10 phút, đăng 1 cái ngay' },
  { n:3, skill:'Sales Message',  title:'AI viết email chào hàng — Gửi 5 người thật',            result:'Template chào hàng tự nhiên, không cứng nhắc' },
  { n:4, skill:'Video Script',   title:'AI viết kịch bản video 60 giây',                         result:'Kịch bản sẵn, quay 1 video đăng lên ngay' },
  { n:5, skill:'Headline',       title:'AI tạo 10 tiêu đề thu hút — Đăng bài với cái hay nhất', result:'Bài có tiêu đề tốt hơn 90% content thường' },
  { n:6, skill:'Sales Close',    title:'AI soạn tin chốt đơn — Gửi 10 khách thật',              result:'Template chốt tự nhiên, không cảm giác bị bán' },
  { n:7, skill:'Content System', title:'30 bài content 1 tháng trong 1 giờ',                    result:'Lịch content 30 ngày sẵn sàng trong hộp tay' },
]

const FAQS = [
  {
    q: 'Bắt đầu từ ngày nào?',
    a: 'Ngay sau khi thanh toán xong. Ngày 1 sẽ mở lúc 7h sáng đầu tiên sau khi bạn đăng ký. Nếu đăng ký trước 7h — mở luôn trong ngày. Nếu đăng ký sau 7h — mở 7h sáng hôm sau.',
  },
  {
    q: 'Bằng chứng nộp như thế nào?',
    a: 'Nộp qua form trong khu học. Có thể dán link bài đăng, screenshot, hoặc mô tả text những gì bạn đã làm. Không cần hoàn hảo — cần có thật. Mình xét thực chất, không xét đẹp xấu.',
  },
  {
    q: 'Nếu bỏ lỡ 1 ngày thì sao?',
    a: 'Ngày đó bị đánh dấu "trễ hạn". Bạn vẫn xem được bài học ngày hôm sau nhưng không đủ điều kiện hoàn cọc. 368k chuyển thành Mini Course "Trang Bán Hàng AI" (cùng giá) — bạn vẫn có gì đó thực tế, không mất trắng.',
  },
  {
    q: 'Chưa có kinh nghiệm AI được không?',
    a: 'Được — đây là đối tượng chính mình viết SOP cho. Mỗi ngày có hướng dẫn từng bước cụ thể, dùng ChatGPT hoặc Claude đều được. Chỉ cần có điện thoại và tài khoản AI miễn phí là đủ.',
  },
  {
    q: 'Mỗi ngày mất bao lâu?',
    a: 'Khoảng 30-60 phút nếu làm theo SOP. Không cần học lý thuyết — đọc SOP, mở AI, làm theo từng bước, chụp bằng chứng, nộp. Xong.',
  },
  {
    q: 'Hoàn tiền khi nào và như thế nào?',
    a: 'Sau khi bạn nộp bài ngày 7 và mình xác nhận đủ 7 ngày đúng hạn, mình hoàn 368k về tài khoản bạn đã dùng để chuyển khoản — trong vòng 48h. Không rắc rối, không hỏi lý do.',
  },
  {
    q: 'Có cần nộp bài đúng 7h sáng không?',
    a: 'Không — bài mở lúc 7h sáng và bạn có 24h để hoàn thành. Tức là deadline là 7h sáng hôm sau. Làm buổi tối cũng được, miễn nộp trước 7h sáng ngày hôm sau.',
  },
]

function CountdownBar() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    function tick() {
      const now = new Date()
      const end = new Date()
      end.setDate(end.getDate() + ((7 - now.getDay() + 0) % 7 || 7))
      end.setHours(23, 59, 0, 0)
      const diff = end.getTime() - now.getTime()
      if (diff <= 0) { setTime(''); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTime(`${d}n ${h}h ${m}m ${s}s`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (time === null) return null // not yet mounted
  if (time) return (
    <div className="bg-[#C0390E] text-white text-center py-2 px-4 text-xs sm:text-sm font-medium">
      🔥 Đợt này kết thúc sau <strong className="font-mono">{time}</strong> · Làm đủ 7 ngày → hoàn 100% · Không mất trắng.
    </div>
  )
  // fallback when countdown ends
  return (
    <div className="bg-[#88860B] text-white text-center py-2 px-4 text-xs sm:text-sm font-medium">
      605+ người đã thử · Làm đủ 7 ngày → hoàn 100% tiền cọc · Bắt đầu bất kỳ ngày nào
    </div>
  )
}

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-[#DDD8CB] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
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

export default function BiQuyet7NgayPage() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSticky,   setShowSticky]   = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { threshold: 0 })
    if (heroRef.current) obs.observe(heroRef.current)
    return () => obs.disconnect()
  }, [])

  const openCheckout = () => setShowCheckout(true)

  return (
    <div className="min-h-screen bg-[#F6F0E4] font-sans">

      {/* [0] ANNOUNCEMENT BAR */}
      <CountdownBar />

      {/* Nav */}
      <nav className="bg-[#0D2B1A] px-4 py-3 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-[#F6F0E4] font-black font-mono text-sm tracking-wide">DungHoang.com</span>
          <button
            onClick={openCheckout}
            className="bg-[#C0390E] hover:bg-[#a02e0a] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
            Đăng ký 368k →
          </button>
        </div>
      </nav>

      {/* [1] HERO — B.1 Headline + B.2 Sub + CTA L1 */}
      <section ref={heroRef} className="bg-[#0D2B1A] px-4 pt-14 pb-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-block bg-[#C0390E]/20 text-[#E87C5E] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Challenge có cọc · AI thật · Làm thật · Đăng thật
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F6F0E4] leading-tight">
            7 Ngày Biến AI<br/>
            <span className="text-[#C0390E]">Thành Nhân Viên Thật</span><br/>
            <span className="text-2xl sm:text-3xl font-bold text-[#F6F0E4]/70">— Hoặc Lấy Lại Đủ 368k</span>
          </h1>
          <p className="text-[#F6F0E4]/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Mỗi ngày 1 skill. 30-60 phút. Làm thật, đăng thật lên mạng xã hội ngay hôm đó.
            Hoàn thành đủ 7 ngày — mình hoàn lại đủ 368k. Rủi ro của bạn: bằng không.
          </p>
          {/* CTA L1 — cho nhóm D (quyết đoán) */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={openCheckout}
              className="h-14 px-8 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-base font-black rounded-2xl transition-colors shadow-lg shadow-red-900/30">
              Đăng Ký — Đóng Cọc 368.000đ →
            </button>
            <a href="#co-che"
              className="h-14 px-8 border border-[#F6F0E4]/20 text-[#F6F0E4]/70 hover:text-[#F6F0E4] hover:border-[#F6F0E4]/40 text-sm font-medium rounded-2xl flex items-center justify-center transition-colors">
              Xem cơ chế trước →
            </a>
          </div>
          <p className="text-[#F6F0E4]/40 text-xs">Thanh toán qua chuyển khoản · Xác nhận trong 5-10 phút</p>
        </div>
      </section>

      {/* [2] TRUST BAR — B.4 Authority đặt sớm */}
      <section className="bg-white border-y border-[#DDD8CB] py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { n: '605+', label: 'học viên đã học' },
              { n: '7',    label: 'skill thực chiến' },
              { n: '0đ',   label: 'rủi ro nếu làm đủ' },
            ].map(s => (
              <div key={s.n}>
                <p className="text-2xl sm:text-3xl font-black text-[#0D2B1A]">{s.n}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [3] PAIN — B.3 Pain 3 lớp */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-bold text-[#C0390E] uppercase tracking-widest">Mình nói thẳng</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
              ChatGPT bạn có rồi.<br/>3 tháng qua dùng được gì?
            </h2>
          </div>

          {/* Lớp 1 — Symptom */}
          <div className="space-y-3">
            <p className="text-gray-700 leading-relaxed">
              Bạn đã tải ChatGPT. Có thể có Claude, Gemini luôn. Mấy tháng trước còn hào hứng thử mấy prompt chia sẻ trên mạng.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nhưng sáng nào bật lên cũng không biết bắt đầu từ đâu. Hỏi nó vài cái, nó trả lời chung chung.
              Copy về, chỉnh tay, mất nhiều thời gian hơn tự viết.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Rồi thôi. Đóng lại. Làm thủ công như trước.
            </p>
          </div>

          {/* Lớp 2 — Consequence */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-3">
            <p className="font-bold text-[#0D2B1A] text-sm">6 tháng nữa trông như thế này:</p>
            <div className="space-y-2">
              {[
                'Đối thủ cùng ngành bắt đầu đăng content đều đặn — AI viết cho họ',
                'Khách hàng tiềm năng thấy họ nhiều hơn thấy bạn',
                'Bạn vẫn đang gõ từng tin nhắn chào hàng thủ công',
                'Vẫn chi tiền ads nhưng không có content để nuôi warm audience',
              ].map((p, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-orange-500 text-xs mt-1 flex-shrink-0">→</span>
                  <p className="text-sm text-gray-700">{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lớp 3 — Identity */}
          <div className="border-l-4 border-[#C0390E] pl-4">
            <p className="text-gray-700 leading-relaxed italic">
              "Không phải bạn lười. Không phải AI khó. Bạn chỉ chưa có người chỉ cho bạn <strong className="not-italic text-[#0D2B1A]">đúng 1 việc cụ thể để làm mỗi ngày</strong>
              — và ai đó bắt bạn thực sự làm nó."
            </p>
          </div>

          {/* CTA L2 */}
          <button onClick={openCheckout}
            className="w-full h-14 bg-[#0D2B1A] hover:bg-[#1a4a2e] text-[#F6F0E4] font-bold rounded-2xl transition-colors">
            Tôi Muốn Thay Đổi — Bắt Đầu Ngay →
          </button>
        </div>
      </section>

      {/* [4] BRIDGE — B.5 Story A→G */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-xs font-bold text-[#88860B] uppercase tracking-widest">Câu chuyện của mình</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F6F0E4] leading-tight">
            Mình cũng từng như bạn.<br/>Rồi mình tự xây đội AI.
          </h2>

          <div className="space-y-4 text-[#F6F0E4]/75 text-sm sm:text-base leading-relaxed">
            {/* A — Mong muốn */}
            <p>Mình muốn vận hành business một mình mà không phải làm việc 12 tiếng mỗi ngày.</p>
            {/* B — Hiện tại */}
            <p>2 năm trước: dậy 6h, 11h đêm vẫn đang trả lời tin nhắn khách. Homestay đang chạy, khoá học đang dạy, mọi thứ mình làm tay hết.</p>
            {/* C — Khó khăn */}
            <p>Mình cũng mua combo AI. Cũng thử prompt lan truyền trên mạng. Cũng hào hứng 2 tuần rồi thôi vì không biết áp dụng vào business của mình ở chỗ nào.</p>
            {/* D — Mentor */}
            <p className="text-[#F6F0E4]"><strong>Rồi mình quyết định thử theo cách khác:</strong> thay vì học AI theory, mình chọn <strong>1 việc cụ thể trong business</strong>, rồi bắt AI học cách mình làm việc đó.</p>
            {/* E — Hành động */}
            <p>Skill đầu tiên: viết caption Facebook. Mình dạy AI giọng mình viết. Fail lần đầu. Chỉnh lại. Fail lần hai. Chỉnh tiếp. Đến lần 4 — AI viết ra cái mình đọc mà không nhận ra đó không phải mình viết.</p>
            {/* F — Kết quả ≥3 số */}
            <p className="text-[#F6F0E4]">
              Hôm đó mình lập tức làm tiếp 24 skill còn lại.
              Bây giờ: <strong>25 AI agent đang chạy trong business mình hàng ngày</strong> —
              email, caption, tin chốt đơn, kịch bản video, lịch content 30 ngày.
              Tiết kiệm được khoảng <strong>4-5 tiếng mỗi ngày</strong>.
              Còn <strong>605 người học</strong> đã tự làm được điều tương tự.
            </p>
            {/* G — Identity shift */}
            <p className="text-[#F6F0E4]/60 italic">
              "Từ một người không biết AI dùng để làm gì thực tế — đến chủ DN 1 người có đội AI 24/7 không bao giờ xin nghỉ."
            </p>
          </div>
        </div>
      </section>

      {/* [5] HOW IT WORKS — B.8 Clarity */}
      <section id="co-che" className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Cơ chế</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A]">Hoạt động như thế này</h2>
          </div>

          <div className="space-y-3">
            {[
              { n:'1', head:'Đóng 368k cọc để đăng ký', body:'Chuyển khoản, hệ thống xác nhận trong 5-10 phút, bạn nhận email với link khu học.' },
              { n:'2', head:'7h sáng mỗi ngày — 1 bài học mở khóa', body:'Mỗi ngày một skill mới. Bài học theo dạng SOP từng bước — không cần kinh nghiệm trước.' },
              { n:'3', head:'Làm theo SOP, nộp bằng chứng trong 24h', body:'Làm bài tập thực tế (đăng bài thật, gửi tin nhắn thật...), chụp screenshot hoặc dán link vào form.' },
              { n:'4', head:'Hoàn thành đủ 7 ngày đúng hạn → hoàn 368k', body:'Mình xét toàn bộ 7 bài nộp. Đủ, đúng hạn → hoàn 368k về tài khoản bạn trong 48h.' },
              { n:'5', head:'Không đủ điều kiện → nhận Mini Course (cùng giá)', body:'368k chuyển thành học phí Mini Course "Trang Bán Hàng AI". Không ai mất trắng.' },
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

      {/* [6] FEATURES — B.6 FAB + 4 lớp benefit */}
      <section className="bg-white border-y border-[#DDD8CB] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">7 skill thực chiến</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A]">Mỗi ngày 1 skill — làm thật — đăng thật</h2>
            <p className="text-gray-500 text-sm">Không lý thuyết. Làm xong ngay trong ngày đó.</p>
          </div>

          <div className="space-y-3">
            {DAYS.map(d => (
              <div key={d.n} className="border border-[#DDD8CB] rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#0D2B1A] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#F6F0E4] font-black text-sm">{d.n}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-bold text-[#3D6B4A] bg-[#EAF5EF] px-2 py-0.5 rounded-full">{d.skill}</span>
                  </div>
                  <p className="font-semibold text-[#0D2B1A] text-sm leading-snug">{d.title}</p>
                  <p className="text-xs text-gray-400 mt-1">✓ {d.result}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA L3 */}
          <button onClick={openCheckout}
            className="w-full h-14 bg-[#C0390E] hover:bg-[#a02e0a] text-white font-black rounded-2xl transition-colors text-base shadow-lg shadow-red-900/20">
            Giữ Chỗ Cho Tôi →
          </button>
        </div>
      </section>

      {/* [7] EMOTION — B.7 Future Pacing */}
      <section className="px-4 py-14 bg-[#F6F0E4]">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest text-center">Hình dung ngay đi</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] text-center leading-tight">
            7h sáng thứ Hai tuần sau —<br/>sau khi làm xong challenge
          </h2>

          <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-4 text-[#F6F0E4]/80 text-sm leading-relaxed">
            <p>Bạn mở điện thoại. Bài đăng tối qua — cái caption AI viết theo giọng bạn — có 43 like và 7 bình luận.</p>
            <p>Một người hỏi giá sản phẩm. Bạn copy template tin chốt đơn vào, chỉnh tên, gửi đi — 20 giây.</p>
            <p className="text-[#F6F0E4]"><strong>Uống cà phê. Không vội.</strong></p>
            <p>Không phải vì công việc ít hơn. Mà vì AI đang xử lý phần mất nhiều thời gian nhất — bạn chỉ cần ký duyệt.</p>
            <p className="text-[#88860B]">Đó là 7 ngày làm đủ sẽ cho bạn thứ gì.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { before: 'Viết caption: 30 phút', after: 'Viết caption: 5 phút' },
              { before: 'Lịch content: không có', after: 'Lịch 30 ngày: 1 giờ' },
              { before: 'Tin chào hàng: ngại gửi', after: 'Template sẵn: copy-paste' },
              { before: 'Kịch bản video: không dám', after: 'Kịch bản: AI viết hộ' },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#DDD8CB] p-3">
                <p className="text-xs text-red-400 line-through">{r.before}</p>
                <p className="text-xs text-[#2D7A4F] font-semibold mt-1">✓ {r.after}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [8] AUTHORITY — B.4 Authority sâu */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-xs font-bold text-[#88860B] uppercase tracking-widest">Tại sao tin mình?</p>
          <h2 className="text-2xl font-black text-[#F6F0E4] leading-tight">
            Mình không dạy lý thuyết AI.<br/>Mình đang <span className="text-[#C0390E]">dùng nó thật</span> mỗi ngày.
          </h2>

          <div className="space-y-3">
            {[
              { icon:'🏡', text:'Đang vận hành homestay + khoá học + tư vấn AI — 1 mình, 25 AI agent hỗ trợ' },
              { icon:'👥', text:'605+ học viên đã học và tự làm được — từ solopreneur đến chủ shop, coach, freelancer' },
              { icon:'🤖', text:'Tiểu Hà Mã (GoClaw) — AI agent thật đang chạy trong business mình, không phải demo' },
              { icon:'📅', text:'SOP này được test qua hơn 2 năm dùng thực tế, không phải được viết từ sách hay khoá học người khác' },
            ].map(a => (
              <div key={a.icon} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">{a.icon}</span>
                <p className="text-[#F6F0E4]/75 text-sm leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>

          {/* Dòng 5 — Why matters */}
          <div className="border-t border-[#F6F0E4]/10 pt-4">
            <p className="text-[#88860B] text-sm italic">
              "Đó là lý do SOP trong 7 ngày này không phải lý thuyết —
              đây là chính xác những gì mình đã làm để đưa AI vào business thật của mình."
            </p>
          </div>
        </div>
      </section>

      {/* [9] VALUE STACK + PRICING — B.9 + B.13 + CTA L4 */}
      <section id="dang-ky" className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Đầu tư</p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A]">Bạn nhận được gì với 368k</h2>
          </div>

          {/* Value Stack */}
          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden">
            <div className="bg-[#0D2B1A] px-5 py-3">
              <p className="text-[#F6F0E4] font-bold text-sm">Tổng giá trị bạn nhận</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]">
              {[
                { item:'7 SOP thực chiến (25-30 phút/SOP)',      value:'1.400.000đ' },
                { item:'7 ngày khu học trên website',             value:'Miễn phí' },
                { item:'Quyền nộp bài và nhận phản hồi',         value:'350.000đ' },
                { item:'Email nhắc nhở + hỗ trợ mỗi ngày',       value:'Miễn phí' },
                { item:'BONUS: Vault 30 Prompt AI dùng ngay',     value:'299.000đ', bonus:true },
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
              <p className="text-xl font-black text-gray-400 line-through">2.049.000đ</p>
            </div>
            <div className="px-5 py-4 bg-[#EAF5EF] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#0D2B1A]">Cọc challenge</p>
                <p className="text-xs text-[#3D6B4A]">Hoàn đủ nếu làm xong 7 ngày đúng hạn</p>
              </div>
              <p className="text-3xl font-black text-[#0D2B1A]">368.000đ</p>
            </div>
          </div>

          {/* ROI Math */}
          <div className="bg-[#0D2B1A]/5 rounded-xl p-4 text-sm text-gray-600 space-y-1">
            <p><strong className="text-[#0D2B1A]">Tính nhanh:</strong> Làm đủ 7 ngày → hoàn 368k → bạn có 7 skill AI, không tốn đồng nào.</p>
            <p>Không làm đủ → 368k thành Mini Course "Trang Bán Hàng AI" (trị giá 368k).</p>
            <p className="font-semibold text-[#0D2B1A]">Rủi ro tệ nhất: bạn nhận được một khoá học 368k.</p>
          </div>

          {/* CTA L4 */}
          <div className="space-y-3">
            <button onClick={openCheckout}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-lg font-black rounded-2xl transition-colors shadow-xl shadow-red-900/25">
              Đăng Ký Ngay — Đóng Cọc 368.000đ →
            </button>
            <p className="text-center text-xs text-gray-400">
              Chuyển khoản · MB Bank · Xác nhận trong 5-10 phút
            </p>
          </div>
        </div>
      </section>

      {/* [10] GUARANTEE — B.10 Risk Reversal */}
      <section className="bg-[#EAF5EF] border-y border-[#2D7A4F]/20 px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#2D7A4F] flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🛡️</span>
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0D2B1A]">Cam Kết Hoàn Tiền 100%</h3>
              <p className="text-[#3D6B4A] text-sm mt-1 font-medium">Làm đúng → lấy lại đủ — Không hỏi, không rắc rối</p>
            </div>
          </div>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>Điều kiện đơn giản: nộp bài đầy đủ 7 ngày, đúng hạn (trong 24h sau khi bài mở), bằng chứng thực tế.</p>
            <p>Mình kiểm tra xong trong 24h sau ngày 7. Đủ điều kiện → chuyển khoản hoàn về tài khoản bạn trong 48h tiếp theo.</p>
            <p className="font-semibold text-[#0D2B1A]">Không đủ điều kiện? 368k tự động thành học phí Mini Course — không mất một xu nào.</p>
          </div>
        </div>
      </section>

      {/* [11] IS FOR / NOT FOR — B.8 Clarity */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Challenge này dành cho ai?</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-[#2D7A4F] text-sm">✓ DÀNH CHO BẠN NẾU:</p>
              <div className="space-y-2">
                {[
                  'Kinh doanh một mình hoặc nhóm nhỏ',
                  'Đã có ChatGPT/Claude nhưng chưa áp dụng vào business được',
                  'Muốn tự làm content thay vì thuê người',
                  'Sẵn sàng cam kết 30-60 phút/ngày trong 7 ngày',
                  'Muốn thử trước khi đầu tư khóa học lớn hơn',
                ].map((t, i) => <p key={i} className="text-sm text-gray-700 leading-snug">• {t}</p>)}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-gray-500 text-sm">✗ KHÔNG DÀNH CHO:</p>
              <div className="space-y-2">
                {[
                  'Người muốn học lý thuyết mà không làm thực tế',
                  'Người không có thời gian 30-60 phút/ngày trong 7 ngày',
                  'Người tìm giải pháp tự động 100% mà không cần làm gì',
                  'Người kỳ vọng AI thay thế hoàn toàn con người',
                ].map((t, i) => <p key={i} className="text-sm text-gray-500 leading-snug">• {t}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [12] FAQ — B.10 A.R.E.B */}
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

      {/* [13] TESTIMONIAL + CTA L5 — B.15 + B.16 */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Người đã làm nói gì</h2>

          {/* Testimonials — placeholder với format chuẩn */}
          <div className="space-y-4">
            {[
              {
                stars: 5,
                quote: 'Ngày 1 mình còn nghi ngờ. Ngày 3 thì mình đã thấy kết quả rõ rồi — AI viết caption đúng giọng mình đến mức bạn bè tưởng mình tự viết.',
                name:  'Thanh Hà',
                role:  'Chủ shop thời trang online',
                result:'Tiết kiệm 2h/ngày viết content',
              },
              {
                stars: 5,
                quote: 'Mình đã học mấy khóa AI trước đó mà không áp dụng được. Cái này khác — có người bắt mình làm thật mỗi ngày, không làm không được.',
                name:  'Minh Khoa',
                role:  'Freelance designer',
                result:'Đã hoàn cọc 368k đủ sau 7 ngày',
              },
              {
                stars: 5,
                quote: 'Sợ nhất là mất 368k. Nhưng ngay từ ngày 1 thấy bài học quá thực tế, mình biết mình sẽ làm được đủ 7 ngày.',
                name:  'Lan Anh',
                role:  'Coach sức khoẻ',
                result:'Hoàn cọc + có hệ thống content mới',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3">
                <div className="flex gap-0.5">
                  {Array(t.stars).fill(0).map((_, j) => <span key={j} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed">"{t.quote}"</p>
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

          {/* CTA L5 — final push */}
          <div className="space-y-4 pt-2">
            <div className="text-center space-y-1">
              <p className="text-sm text-gray-500">Đọc đến đây là bạn đã biết mình cần thay đổi gì rồi.</p>
              <p className="font-bold text-[#0D2B1A]">Người làm thật không cần thêm lý do. Người cần thêm lý do sẽ chờ đến tháng sau, rồi tháng sau nữa.</p>
            </div>
            <button onClick={openCheckout}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-base font-black rounded-2xl transition-colors shadow-xl shadow-red-900/25">
              Tôi Chọn Làm Thật — Đăng Ký Ngay →
            </button>
            <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
              <span>✓ Xác nhận trong 5-10 phút</span>
              <span>✓ Hoàn 100% nếu làm đủ</span>
              <span>✓ Không mất trắng</span>
            </div>
          </div>
        </div>
      </section>

      {/* [14] FOOTER */}
      <footer className="bg-[#0D2B1A] px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-[#F6F0E4] font-black font-mono">DungHoang.com</p>
          <p className="text-[#F6F0E4]/40 text-xs">
            © 2026 Dũng Hoàng · Mọi câu hỏi: Telegram{' '}
            <a href="https://t.me/KentHoang" className="underline">@KentHoang</a>
          </p>
          <div className="flex justify-center gap-4 text-xs text-[#F6F0E4]/30">
            <a href="/portal" className="hover:text-[#F6F0E4]/60">Khu học</a>
            <a href="/portal/login" className="hover:text-[#F6F0E4]/60">Đăng nhập</a>
          </div>
        </div>
      </footer>

      {/* STICKY CTA BAR */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D2B1A] border-t border-[#F6F0E4]/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
          <div className="min-w-0">
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Challenge 7 Ngày — 368k cọc</p>
            <p className="text-[#F6F0E4]/50 text-xs">Làm đủ → hoàn tiền 100%</p>
          </div>
          <button onClick={openCheckout}
            className="flex-shrink-0 bg-[#C0390E] hover:bg-[#a02e0a] text-white font-bold px-5 h-11 rounded-xl text-sm transition-colors">
            Đăng ký →
          </button>
        </div>
      )}

      {/* ZALO FLOAT */}
      <a href="https://zalo.me/0938725413"
        target="_blank" rel="noopener noreferrer"
        className="fixed right-4 bottom-20 z-50 w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
        title="Chat Zalo">
        <span className="text-white font-bold text-xs">Zalo</span>
      </a>

      <CheckoutModal
        productId={product.id}
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
      />
    </div>
  )
}
