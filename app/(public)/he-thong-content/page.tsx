'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS } from '@/lib/products'

const product = PRODUCTS.content_368

const WHAT_INSIDE = [
  {
    icon: '🧬',
    title: 'Brand DNA + Story Bank',
    desc: 'Điền 1 lần. AI đọc từ đây trước khi viết bất kỳ bài nào. Không còn cảnh AI viết đúng nội dung nhưng nghe như robot.',
  },
  {
    icon: '📥',
    title: 'The Dream — Kho Chất Liệu',
    desc: 'Thấy bài hay trên mạng? Paste vào đây. AI tự phân tích, rút công thức hook, đề xuất ý tưởng bài phù hợp giọng bạn.',
  },
  {
    icon: '🪝',
    title: 'Hook Library + 600+ Mẫu Tiêu Đề',
    desc: 'Kho hook được rút từ những bài viral thật. Thêm vào tự động mỗi lần phân tích bài có điểm ≥ 8.5/10.',
  },
  {
    icon: '📅',
    title: 'Content Calendar + Analytics',
    desc: 'Lịch content, trạng thái từng bài, theo dõi hiệu suất. Gõ "báo cáo tuần" là AI tổng hợp số liệu và đề xuất hướng tuần tới.',
  },
  {
    icon: '⚡',
    title: 'AI Commands — Gõ 1 Chữ Ra Bài',
    desc: '"viết bài" → AI hỏi 3 câu ngắn → viết xong theo đúng giọng bạn → bạn duyệt và đăng. Tổng thời gian: 15-20 phút/bài.',
  },
  {
    icon: '📸',
    title: 'Visual Brief 7 Mục Cho Designer',
    desc: 'Mỗi bài có sẵn brief cho designer: loại ảnh, nhân vật, nền, ánh sáng, trang phục, bố cục, cơ chế dừng tay lướt. Không giải thích lại từ đầu.',
  },
  {
    icon: '🔄',
    title: 'Quy Trình Nhân Bản — 1 Bài Thành 7+ Biến Thể',
    desc: 'Gõ "nhân bản". AI tạo 7-10 phiên bản khác nhau từ 1 bài gốc: kể chuyện, phản biện, số liệu, danh sách, carousel...',
  },
  {
    icon: '📊',
    title: 'Ma Trận Content + Phễu 5 Cấp Độ',
    desc: 'Tỷ lệ vàng: 40% viral · 30% chuyên môn · 20% truyền cảm hứng · 10% bán hàng. Không lệch phễu, không đốt tệp.',
  },
]

const WORKFLOW = [
  { n: '1', head: 'Thu thập — 2 phút', body: 'Thấy bài hay → paste link + ảnh vào The Dream. AI tự phân tích theo lô.' },
  { n: '2', head: 'Phân tích — gõ "phân tích"', body: 'AI đọc bài, rút công thức hook, đánh điểm Viral Score, đề xuất ý tưởng bài mới phù hợp Brand DNA của bạn.' },
  { n: '3', head: 'Sản xuất — gõ "viết bài"', body: 'AI hỏi 3 câu: loại bài, chủ đề, CTA. Sau đó viết xong nguyên bài theo đúng giọng bạn. Bạn đọc lại và duyệt.' },
  { n: '4', head: 'Phân phối — gõ "đẩy vào calendar"', body: 'AI tạo mục trong Calendar, tạo trang bài viết kèm Visual Brief 7 mục, ghi bản ghi Analytics. Giao designer làm visual và đăng.' },
]

const FAQS = [
  { q: 'Bàn giao kiểu gì? Có phải cài gì không?',
    a: 'Bàn giao qua Notion. Bạn nhận link, bấm Duplicate là có workspace riêng. Không cần cài thêm gì ngoài tài khoản Notion miễn phí.' },
  { q: 'Không biết Notion có dùng được không?',
    a: 'Được. Hệ thống được thiết kế để người mới bắt đầu trong 5 phút. Không cần đọc hết trước. Gõ "hướng dẫn" là AI giải thích phần bạn cần.' },
  { q: 'Có cần AI trả phí không?',
    a: 'Không bắt buộc. Hệ thống chạy được với Claude hoặc ChatGPT miễn phí. Nếu có bản trả phí thì nhanh hơn và chất lượng tốt hơn, nhưng không bắt buộc.' },
  { q: 'Khác gì so với mua template content bình thường?',
    a: 'Đây không phải template điền vào. Đây là hệ thống AI đọc giọng bạn rồi viết theo giọng đó. Bài ra nghe như bạn viết, không phải AI generic.' },
  { q: 'Bảo hành thế nào?',
    a: '14 ngày hoàn 100%. Nhận về dùng thử, không thấy giá trị thì nhắn mình, hoàn trong 24 giờ không hỏi lý do.' },
  { q: 'Nếu mua Trang Bán Hàng hoặc Khóa 1 thì có cần mua riêng không?',
    a: 'Không cần. Trang Bán Hàng (686.868đ) và Khóa 1 (868.686đ) đều tặng kèm Content System này luôn rồi.' },
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

export default function HeThongContentPage() {
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
      <div className="bg-[#C0390E] text-white text-center py-2 px-4 text-xs sm:text-sm font-medium">
        Tặng kèm miễn phí khi mua Trang Bán Hàng (686.868đ) hoặc Khóa 1 (868.686đ) · Bảo hành 14 ngày
      </div>


      {/* [1] HERO */}
      <section ref={heroRef} className="bg-[#0D2B1A] px-4 pt-14 pb-16">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-block bg-[#C0390E]/20 text-[#E87C5E] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Hệ Thống Content · Notion · AI Viết Đúng Giọng Bạn
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#F6F0E4] leading-tight">
            Content Không Cần<br/>
            <span className="text-[#C0390E]">Cảm Hứng</span>
          </h1>
          <p className="text-[#F6F0E4]/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Workspace Notion đang chạy thật, có Brand DNA + Story Bank + Hook Library + AI commands.
            Bạn duplicate về, điền giọng văn, gõ "viết bài" là có bài sẵn để duyệt và đăng.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button onClick={open}
              className="h-14 px-8 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.03] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40">
              Nhận Hệ Thống — 368.686đ →
            </button>
            <a href="#co-gi"
              className="h-14 px-8 border border-[#F6F0E4]/20 text-[#F6F0E4]/70 hover:text-[#F6F0E4] text-sm font-medium rounded-2xl flex items-center justify-center transition-colors">
              Xem bên trong có gì →
            </a>
          </div>
          <p className="text-[#F6F0E4]/40 text-xs">Tặng kèm miễn phí khi mua Trang Bán Hàng (686.868đ) hoặc Khóa 1 (868.686đ)</p>
        </div>
      </section>

      {/* [2] TRUST BAR */}
      <section className="bg-white border-y border-[#DDD8CB] py-5 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { n:'15 phút',   label:'từ lúc gõ đến có bài' },
              { n:'30 bài',    label:'mỗi tháng không mỏi đầu' },
              { n:'14 ngày',   label:'bảo hành hoàn tiền' },
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
              Không phải bạn lười.<br/>Bạn không có hệ thống.
            </h2>
          </div>
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>Mỗi sáng mở điện thoại, nhìn vào trang trắng rồi hỏi "hôm nay đăng gì". Nghĩ mãi không ra. Rồi không đăng gì cả.</p>
            <p>Hoặc đăng được vài tuần rồi tắt lịm. Cảm hứng lúc có lúc không. Business phụ thuộc vào cảm hứng là business không ổn định.</p>
          </div>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 space-y-3">
            <p className="font-bold text-[#0D2B1A] text-sm">Triệu chứng quen thuộc:</p>
            {[
              'Có đủ kiến thức và câu chuyện nhưng không biết biến thành bài như thế nào',
              'AI viết giúp nhưng bài ra nghe không giống mình chút nào',
              'Mỗi lần viết mất 1-2 tiếng mà kết quả bình thường',
              'Tháng nào cũng nói "tháng sau mình sẽ đăng đều hơn"',
            ].map((p, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-orange-500 text-xs mt-1 flex-shrink-0">→</span>
                <p className="text-sm text-gray-700">{p}</p>
              </div>
            ))}
          </div>
          <button onClick={open}
            className="w-full h-14 bg-[#0D2B1A] hover:bg-[#153f27] active:scale-[0.97] hover:scale-[1.01] text-[#F6F0E4] font-bold rounded-2xl transition-all duration-200 shadow-md">
            Tôi Muốn Content Đều Mà Không Phụ Thuộc Cảm Hứng →
          </button>
        </div>
      </section>

      {/* [4] BRIDGE */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <p className="text-xs font-bold text-[#88860B] uppercase tracking-widest">Sự thật</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F6F0E4] leading-tight">
            Content đều không cần cảm hứng.<br/>Cần hệ thống.
          </h2>
          <div className="space-y-4 text-[#F6F0E4]/75 text-sm sm:text-base leading-relaxed">
            <p>Hệ thống này mình dùng thật hằng ngày cho trang cá nhân + khóa học + homestay. Không phải viết ra để dạy, mà dùng rồi đóng gói lại để bàn giao.</p>
            <p className="text-[#F6F0E4]"><strong>AI trong hệ thống đọc Brand DNA của bạn trước khi viết.</strong> Không phải AI viết chung chung. Là AI biết bạn là ai, nói chuyện với ai, và viết theo đúng giọng bạn.</p>
            <p>Bài ra bạn chỉ cần đọc lại, chỉnh 1-2 chỗ là đăng. Không phải viết lại từ đầu.</p>
          </div>
        </div>
      </section>

      {/* [5] HOW IT WORKS */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Quy trình</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">4 bước. Mỗi tuần 2-3 giờ. Ra 5-7 bài.</h2>
          </div>
          <div className="space-y-3">
            {WORKFLOW.map(s => (
              <div key={s.n} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-brand-border/20 hover:translate-y-[-2px]">
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
          <div className="bg-[#0D2B1A]/5 rounded-xl p-4 text-sm text-gray-600">
            <p><strong className="text-[#0D2B1A]">Tổng thời gian:</strong> khoảng 2-3 giờ/tuần cho 5-7 bài đăng + visual brief + tracking. Phần còn lại AI làm.</p>
          </div>
        </div>
      </section>

      {/* [6] FEATURES */}
      <section id="co-gi" className="bg-white border-y border-[#DDD8CB] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-bold text-[#3D6B4A] uppercase tracking-widest">Bên trong hệ thống</p>
            <h2 className="text-2xl font-black text-[#0D2B1A]">8 thành phần, 1 workspace duy nhất</h2>
            <p className="text-gray-500 text-sm">Không phải 8 file rải rác. Tất cả nằm trong 1 trang Notion, liên kết với nhau.</p>
          </div>
          <div className="space-y-3">
            {WHAT_INSIDE.map((item, i) => (
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
            Nhận Hệ Thống Ngay — 368.686đ →
          </button>
        </div>
      </section>

      {/* [7] EMOTION */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Thứ Hai tuần sau trông như thế này</h2>
          <div className="bg-[#0D2B1A] rounded-2xl p-6 space-y-4 text-[#F6F0E4]/80 text-sm leading-relaxed">
            <p>Sáng thứ Hai. Gõ "viết bài". AI hỏi 3 câu. Bạn trả lời. 10 phút sau có bài sẵn.</p>
            <p>Bạn đọc lại, chỉnh 1 câu. Gõ "đẩy vào calendar". AI sắp lịch, tạo Visual Brief cho designer.</p>
            <p className="text-[#F6F0E4]"><strong>Chiều thứ Hai bạn đã có 3 bài trong tuần.</strong> Không cần ngồi nghĩ từ đầu. Không phụ thuộc cảm hứng.</p>
            <p className="text-[#88860B]">Chủ nhật gõ "báo cáo tuần". AI tổng hợp số liệu, chỉ bài nào tốt, đề xuất góc bài tuần tới.</p>
          </div>
        </div>
      </section>

      {/* [8] AUTHORITY */}
      <section className="bg-[#0D2B1A] px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#F6F0E4]">Tại sao tin hệ thống này?</h2>
          <div className="space-y-3">
            {[
              { icon:'✅', text:'Đây là workspace mình đang dùng thật hằng ngày — không phải làm ra để dạy' },
              { icon:'🧬', text:'Brand DNA đã được validate qua 605+ học viên. AI viết đúng giọng người thật, không phải giọng AI generic' },
              { icon:'📊', text:'Quy trình rút từ hàng trăm bài phân tích. Ma trận content, hook library, viral score đều dựa trên data thật' },
              { icon:'📦', text:'Bàn giao cả workspace đang chạy — bạn duplicate về và bắt đầu trong 5 phút, không cần setup từ đầu' },
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
            <h2 className="text-2xl font-black text-[#0D2B1A]">368.686đ — ít hơn 1 tuần lương người viết thuê</h2>
            <p className="text-sm text-gray-500">Thuê người viết content cho bạn: 3-5 triệu/tháng. Hệ thống này viết đúng giọng bạn mãi mãi chỉ với 368.686đ một lần.</p>
          </div>
          <div className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden">
            <div className="bg-[#0D2B1A] px-5 py-3">
              <p className="text-[#F6F0E4] font-bold text-sm">Bạn nhận được</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]">
              {[
                { item:'Workspace Notion 3.0 (đang chạy thật)',      value:'2.000.000đ' },
                { item:'Brand DNA + Story Bank đã cài sẵn',          value:'1.500.000đ' },
                { item:'Hook Library + 600+ mẫu tiêu đề',            value:'800.000đ' },
                { item:'Content Calendar + Analytics DB',             value:'600.000đ' },
                { item:'Quy trình nhân bản 1 bài thành 7+ biến thể', value:'1.000.000đ' },
                { item:'Visual Brief 7 mục cho mọi bài',             value:'500.000đ' },
                { item:'Ma trận content + Phễu 5 cấp độ',            value:'700.000đ' },
                { item:'Hướng dẫn chuyển giao cho nhân viên',        value:'400.000đ' },
              ].map((r, i) => (
                <div key={i} className="px-5 py-3 flex justify-between items-center">
                  <p className="text-sm text-gray-700">{r.item}</p>
                  <p className="text-sm font-bold text-gray-400 flex-shrink-0 ml-4 line-through">{r.value}</p>
                </div>
              ))}
              <div className="px-5 py-3 flex justify-between items-center bg-[#FAF7F0]">
                <p className="text-sm font-bold text-[#0D2B1A]">Tổng giá trị nếu tự thuê làm</p>
                <p className="text-sm font-black text-[#3D6B4A] flex-shrink-0 ml-4 line-through">7.500.000đ</p>
              </div>
            </div>
            <div className="px-5 py-4 bg-[#EAF5EF] flex justify-between items-center">
              <div>
                <p className="font-bold text-[#0D2B1A]">Đầu tư 1 lần</p>
                <p className="text-xs text-[#3D6B4A]">Tặng kèm miễn phí khi mua Trang Bán Hàng hoặc Khóa 1</p>
              </div>
              <p className="text-3xl font-black text-[#0D2B1A]">368.686đ</p>
            </div>
          </div>
          <div className="space-y-3">
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-lg font-black rounded-2xl transition-colors shadow-xl shadow-red-900/25">
              Nhận Hệ Thống Ngay — 368.686đ →
            </button>
            <p className="text-center text-xs text-gray-400">Chuyển khoản · Nhận link Notion trong 5-10 phút · Bảo hành 14 ngày</p>
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
            <p className="text-[#3D6B4A] text-sm mt-1 font-medium">Nhận về dùng thử. Không thấy giá trị → nhắn mình → hoàn 24h</p>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              14 ngày là đủ để bạn chạy qua 1 chu kỳ tuần: thu thập, phân tích, viết bài, đăng.
              Nếu hệ thống không giúp được gì thật sự — hoàn toàn bộ.
            </p>
          </div>
        </div>
      </section>

      {/* [11] IS FOR / NOT FOR */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Hệ thống này dành cho ai?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-[#2D7A4F] text-sm">✓ DÀNH CHO BẠN NẾU:</p>
              <div className="space-y-2">
                {[
                  'Đang đăng content lẻ tẻ, không có hệ thống, không đều',
                  'AI viết giúp nhưng bài ra không giống giọng mình',
                  'Muốn có 30 bài/tháng mà không mất cả ngày để nghĩ',
                  'Cần hệ thống có thể bàn giao cho nhân viên hoặc cộng tác viên',
                ].map((t, i) => <p key={i} className="text-sm text-gray-700 leading-snug">• {t}</p>)}
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-gray-500 text-sm">✗ KHÔNG PHÙ HỢP NẾU:</p>
              <div className="space-y-2">
                {[
                  'Chưa có Brand DNA và câu chuyện cá nhân để nạp vào (không có input thì AI không ra output tốt)',
                  'Muốn AI viết hoàn toàn không cần đọc lại gì',
                  'Đã mua Trang Bán Hàng hoặc Khóa 1 (đã được tặng kèm rồi)',
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
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Người đang dùng nói gì</h2>
          <div className="space-y-4">
            {[
              {
                stars: 5,
                quote: 'Mình từng thử mấy app lên lịch content rồi đều bỏ sau 2 tuần. Cái này khác — AI đọc giọng mình rồi đề xuất ý tưởng đúng thứ mình muốn nói. Không còn nhìn trang trắng hỏi "hôm nay đăng gì" nữa.',
                name:  'Lan Phương',
                role:  'Chủ shop thời trang 2 năm',
                result:'Đăng đều 5-6 bài/tuần trong 2 tháng',
              },
              {
                stars: 5,
                quote: 'Content System giúp mình tiết kiệm ít nhất 3 tiếng mỗi tuần. Cả tháng 30 bài làm trong 2-3 buổi. Phần còn lại mình dùng để gặp khách và phát triển sản phẩm.',
                name:  'Trung Kiên',
                role:  'Solopreneur bán khóa học',
                result:'30 bài/tháng, tiết kiệm 3h/tuần',
              },
              {
                stars: 5,
                quote: 'Mình đã có Khóa 1 nên nhận được cái này miễn phí. Nhưng thật ra đây là thứ mình dùng nhiều nhất trong cả bộ. Workspace Notion đang chạy thật, không phải template rỗng.',
                name:  'Bảo Châu',
                role:  'Coach kinh doanh',
                result:'Dùng hằng ngày sau khi nhận miễn phí từ Khóa 1',
              },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3 transition-all duration-200 hover:shadow-md hover:border-brand-border/20 hover:translate-y-[-2px]">
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
          <p className="text-center text-xs text-gray-400 italic">Kết quả thay đổi tùy người. Đây là ví dụ từ học viên thật — không phải cam kết.</p>
        </div>
      </section>

      {/* [13] CTA FINAL */}
      <section className="px-4 py-14">
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
            Tháng sau bạn vẫn sẽ hỏi<br/>&ldquo;hôm nay đăng gì&rdquo;<br/>
            <span className="text-[#C0390E]">hoặc không cần hỏi nữa.</span>
          </h2>
          <p className="text-gray-500 text-sm">Hệ thống đã có câu trả lời sẵn cho bạn.</p>
          <button onClick={open}
            className="w-full h-16 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.02] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-xl shadow-red-900/25 hover:shadow-2xl hover:shadow-red-900/40">
            Nhận Hệ Thống Ngay — 368.686đ →
          </button>
          <div className="flex items-center justify-center gap-6 text-xs text-gray-400">
            <span>✓ 368.686đ</span>
            <span>✓ Bảo hành 14 ngày</span>
            <span>✓ Nhận link Notion ngay</span>
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
            <a href="/mini-trang-ban-hang" className="hover:text-[#F6F0E4]/60">Trang Bán Hàng</a>
            <a href="/24-ai-agent" className="hover:text-[#F6F0E4]/60">Khóa 1</a>
            <a href="/portal" className="hover:text-[#F6F0E4]/60">Khu học</a>
          </div>
        </div>
      </footer>

      {/* STICKY */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D2B1A]/95 backdrop-blur-md border-t border-[#F6F0E4]/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-slide-up">
          <div className="min-w-0">
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Content Không Cần Cảm Hứng — 368.686đ</p>
            <p className="text-[#F6F0E4]/50 text-xs">Bảo hành 14 ngày · Nhận link Notion ngay</p>
          </div>
          <button onClick={open}
            className="flex-shrink-0 bg-[#C0390E] hover:bg-[#b0300a] active:scale-[0.97] hover:scale-[1.03] text-white font-bold px-5 h-11 rounded-xl text-sm transition-all duration-200">
            Nhận ngay →
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
