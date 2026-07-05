'use client'

import { useState, useEffect, useRef } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS } from '@/lib/products'
import {
  Bot, Wrench, Search, BookOpen, Home, Star, Rocket, Handshake,
  ShieldCheck, Check, X, ArrowRight, Gift, Zap, Users
} from 'lucide-react'

const product = PRODUCTS.khoa2_2768

const FAQS = [
  { q:'AI Agent riêng của mình là cái gì? Giống Tiểu Hà Mã như thế nào?',
    a:'Tiểu Hà Mã là AI agent mình đang dùng thật cho business của mình trên Telegram. Trong Khóa 2, mình setup cho bạn 1 agent tương tự, nhưng được train theo SOP và sản phẩm của riêng bạn. Không phải chatbot trả lời chung chung. Nó biết business của bạn cụ thể.' },
  { q:'Mình setup agent cho bạn theo kiểu nào?',
    a:'Bạn sẽ điền vào bộ câu hỏi về business: sản phẩm gì, khách như thế nào, câu hỏi thường gặp là gì, giọng trả lời muốn ra sao. Mình dựa vào đó để cấu hình agent. Bạn test thử, góp ý, mình chỉnh lại cho đến khi ưng. Sau khi xong, agent chạy trên Telegram của bạn.' },
  { q:'Rollover từ Khóa 1 thế nào?',
    a:'Nếu đã mua Khóa 1 (868.686đ), số tiền đó được trừ vào Khóa 2. Bạn chỉ cần thêm 3.000.000đ để có toàn bộ Khóa 2 kèm AI Agent riêng. Liên hệ mình qua Telegram để áp dụng.' },
  { q:'Chỉ 20 suất mỗi đợt là thật không?',
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
      'Skill 01 · Chân Dung Khách Hàng: biết đúng khách, mọi thứ sau mới chuẩn',
      'Skill 02 · BRAND_DNA: dạy AI viết đúng giọng bạn, dùng cho toàn hệ thống',
      'Skill 03 · Tư Duy Offer Kiểu Hormozi: đóng gói offer giá trị cao hơn giá tiền',
      'Skill 04 · Tư Duy Vận Hành Một Mình: lên kế hoạch, ưu tiên việc, review tuần',
      'Setup Tiểu Hà Mã riêng cho business của bạn trên Telegram',
    ],
  },
  {
    w: 'Tuần 2', head: 'Xây hệ thống bán hàng (Skill 05-12)',
    items: [
      'Skill 05 · Cơ Chế Khác Biệt: đặt tên cách bạn làm, khách khó so giá với ai khác',
      'Skill 06 · Mô Hình Doanh Thu: bậc thang sản phẩm từ rẻ tới đắt để khách mua nhiều lần',
      'Skill 07 · Thiết Kế Offer: lời đề nghị khó từ chối + bảo hành + đảo ngược rủi ro',
      'Skill 08 · Mồi Miễn Phí: quà tặng kéo khách lạ để lại liên hệ',
      'Skill 09 · Vẽ Phễu Bán Hàng: sơ đồ từng bước từ khách lạ tới khách mua',
      'Skill 10 · Dựng Landing Page: trang bán hàng chạy được ngay, không cần code',
      'Skill 11 · Làm Đẹp Giao Diện: chỉnh trang đẹp, chuẩn điện thoại, nhìn chuyên nghiệp',
      'Skill 12 · Viết Bài SEO: bài chuẩn Google để khách tự tìm tới không tốn tiền ads',
    ],
  },
  {
    w: 'Tuần 3', head: 'Kéo traffic & chốt đơn (Skill 13-17)',
    items: [
      'Skill 13 · Quảng Cáo Facebook/TikTok: viết nhiều góc độ để test, giữ mẫu nào ra đơn rẻ',
      'Skill 14 · Kịch Bản Video Bán Hàng: từ hook đầu tới lời kêu gọi cuối, sẵn để quay',
      'Skill 15 · Chuỗi Email Bán Hàng: email nuôi dưỡng và chốt sau khi khách để lại email',
      'Skill 16 · Vớt Khách Nguội: nhắn lại người từng quan tâm nhưng chưa mua',
      'Skill 17 · Kịch Bản Gọi Chốt Đơn: script tư vấn qua điện thoại + xử lý từ chối',
    ],
  },
  {
    w: 'Tuần 4', head: 'Tự động hóa vận hành (Skill 18-24)',
    items: [
      'Skill 18 · Hệ Thống Content Đa Kênh: 1 nội dung nhân ra nhiều dạng FB/TikTok/YouTube',
      'Skill 19 · Marketing Việt Nam: framework điền vào là có nội dung đúng nền tảng VN',
      'Skill 20 · Carousel Instagram: nhiều slide dạy hoặc kể chuyện, caption + hashtag sẵn',
      'Skill 21 · Tiêu Đề Thu Hút: 10 tiêu đề mỗi lần, nhiều kiểu để chọn cái hiệu quả nhất',
      'Skill 22 · AI Agent Chat Messenger: trợ lý trả lời khách tự động trên Page của bạn',
      'Skill 23 · Nghiên Cứu Tài Liệu Bằng AI: tóm tắt, hỏi đáp, tạo quiz từ tài liệu thật',
      'Skill 24 · Tiểu Hà Mã (GoClaw): tối ưu AI đội trưởng theo đúng SOP business bạn đã xây',
    ],
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

export default function Khoa2Page() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [showSticky,   setShowSticky]   = useState(false)
  const [slots]                          = useState(20)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setShowSticky(!e.isIntersecting), { threshold: 0 })
    if (heroRef.current) obs.observe(heroRef.current)
    return () => obs.disconnect()
  }, [])

  const open = () => setShowCheckout(true)

  return (
    <div className="min-h-dvh bg-[#FAF7F0] font-sans text-[#0D2B1A]">

      {/* SCARCITY BAR */}
      <div className="bg-[#0D2B1A] text-[#F6F0E4] text-center py-2.5 px-4 text-xs sm:text-sm font-semibold tracking-wide relative z-20">
        <Zap size={14} className="inline -mt-0.5 mr-1.5 text-[#8BC34A]" />
        Đợt này chỉ còn <strong className="font-mono">{slots} suất</strong> · AI Agent cần setup riêng từng người, không thể nhận thêm
      </div>

      {/* [1] HERO — light, 2 cột trên desktop */}
      <section ref={heroRef} className="relative bg-[#FAF7F0] px-4 pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-[#DDD8CB] overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#3D6B4A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center">

          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-[#DDD8CB] text-[#3D6B4A] text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C0390E] animate-pulse" />
              Khóa 2 · Bản Có Đội Trưởng · 20 suất mỗi đợt
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0D2B1A] leading-[1.1] tracking-tight">
              24 AI agent
              <br />
              <span className="text-[#C0390E]">+ AI đội trưởng của riêng bạn</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#3D6B4A] font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Phiên bản đầy đủ nhất. Học đủ 24 AI agent như Khóa 1, cộng thêm mình setup riêng
              1 AI Agent trên Telegram cho business của bạn.
            </p>

            <p className="text-sm text-gray-500 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Agent biết sản phẩm bạn, biết khách bạn, <strong className="text-[#0D2B1A]">hoạt động thật trên Telegram</strong>.
              Kèm 1 buổi soi hệ thống 1 kèm 1 với Dũng.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <button onClick={open}
                className="h-14 px-8 bg-[#C0390E] hover:bg-[#A83208] active:scale-[0.98] text-white text-base font-bold rounded-2xl transition-all duration-200 shadow-lg shadow-[#C0390E]/20 flex items-center justify-center gap-2 group">
                Giữ Suất Cho Tôi · 3.868.686đ
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#ke-hoach"
                className="h-14 px-6 bg-white border border-[#DDD8CB] hover:border-[#3D6B4A]/40 text-[#0D2B1A] text-sm font-semibold rounded-2xl flex items-center justify-center transition-all duration-200">
                Xem Khóa 2 gồm gì
              </a>
            </div>

            <p className="text-xs text-gray-500 font-medium">
              Đã mua Khóa 1 (868.686đ)? Chỉ cần thêm 3.000.000đ · Bảo hành 14 ngày hoàn 100%
            </p>
          </div>

          {/* Thẻ tóm tắt offer */}
          <div className="hidden lg:block">
            <div className="bg-white border border-[#DDD8CB] rounded-3xl shadow-xl shadow-[#0D2B1A]/5 overflow-hidden">
              <div className="bg-[#0D2B1A] px-6 py-4 flex items-center justify-between">
                <p className="text-[#F6F0E4] font-bold text-sm">Khóa 2 · Coaching</p>
                <span className="text-[10px] font-bold text-[#8BC34A] bg-[#8BC34A]/10 border border-[#8BC34A]/25 px-2 py-0.5 rounded-full">{slots} SUẤT/ĐỢT</span>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { icon: BookOpen, text: 'Đủ 24 AI agent + Hội Đồng Cố Vấn 5 giám đốc' },
                  { icon: Bot,      text: 'Dũng setup tay 1 AI Agent Telegram riêng cho bạn' },
                  { icon: Search,   text: '1 buổi soi hệ thống 1 kèm 1 qua video call' },
                  { icon: Gift,     text: '5 quà tặng: tiêu đề, BRAND_DNA mẫu, ma trận content...' },
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
                    <p className="text-xs text-gray-400 line-through">Giá trị 98.965.518đ</p>
                    <p className="text-3xl font-black text-[#0D2B1A]">3.868.686đ</p>
                  </div>
                  <button onClick={open}
                    className="h-11 px-5 bg-[#C0390E] hover:bg-[#A83208] text-white text-sm font-bold rounded-xl transition-colors">
                    Giữ suất
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
            { icon: BookOpen,    n:'24',      label:'AI agent học được' },
            { icon: Bot,         n:'1',       label:'AI Agent cài riêng cho bạn' },
            { icon: Users,       n:'20',      label:'suất mỗi đợt tối đa' },
            { icon: ShieldCheck, n:'14 ngày', label:'bảo hành hoàn 100%' },
          ].map(s => {
            const Icon = s.icon
            return (
              <div key={s.label} className="space-y-1">
                <Icon size={18} className="mx-auto text-[#3D6B4A]" />
                <p className="text-xl sm:text-2xl font-extrabold text-[#0D2B1A] tracking-tight">{s.n}</p>
                <p className="text-xs text-gray-500 font-medium leading-tight">{s.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* [3] PAIN — 3 lớp */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-3 text-center">
            <span className="inline-block text-xs font-bold text-[#C0390E] uppercase tracking-widest bg-[#C0390E]/5 border border-[#C0390E]/15 px-3 py-1 rounded-full">Thực trạng</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
              Biết cách dùng AI là một chuyện.<br/>Có AI thật đang chạy thay bạn là chuyện khác.
            </h2>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div className="space-y-2 border-l-2 border-[#C0390E]/30 pl-4">
              <p className="font-bold text-sm uppercase tracking-wide text-[#C0390E]">Lớp 1: Triệu chứng hàng ngày</p>
              <p className="text-sm">Bạn đã học xong Khóa 1 (hoặc các lớp AI khác) nhưng bận rộn ngập đầu, không có thời gian tự cấu hình. Bạn sở hữu tài khoản ChatGPT, Claude nhưng loay hoay mãi vẫn chưa đưa được nó vào quy trình thực tế của business.</p>
            </div>

            <div className="space-y-2 border-l-2 border-[#C0390E]/60 pl-4">
              <p className="font-bold text-sm uppercase tracking-wide text-[#C0390E]">Lớp 2: Hậu quả 6-12 tháng tới</p>
              <p className="text-sm">Mỗi ngày trôi qua, bạn vẫn phải tự tay viết từng dòng content, trực inbox đến tối muộn, tự làm landing page đến kiệt sức. Công việc lặp đi lặp lại ngốn 4-5 tiếng mỗi ngày. Trong khi đó, đối thủ đã tối ưu chi phí bằng AI để đi nhanh hơn, còn bạn vẫn dậm chân tại chỗ.</p>
            </div>

            <div className="space-y-2 border-l-2 border-[#C0390E] pl-4">
              <p className="font-bold text-sm uppercase tracking-wide text-[#C0390E]">Lớp 3: Bản sắc danh tính</p>
              <p className="text-sm">Thay vì làm một chủ business có đòn bẩy tự động, bạn vô tình trở thành "khổ chủ" ôm đồm tất cả một mình. Bạn không có thời gian để tập trung vào sản phẩm, chiến lược hay dành cho gia đình vì cứ rời máy tính ra là hệ thống dừng hoạt động.</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { icon: BookOpen, head: 'Khóa 1: Bạn học cách tự dùng 24 AI Agent', body: 'Phù hợp nếu bạn muốn tự mày mò, tự áp dụng bằng SOP và prompt có sẵn theo nhịp của mình.' },
              { icon: Wrench,   head: 'Khóa 2: Mình trực tiếp cài AI Agent riêng cho bạn', body: 'Mình setup 1 trợ lý AI Telegram biết đúng sản phẩm, đúng khách hàng của bạn. Bạn test thử, mình tinh chỉnh đến khi chạy mượt.' },
              { icon: Search,   head: 'Thêm: 1 buổi soi hệ thống 1 kèm 1 trực tiếp', body: 'Nhìn vào business của bạn cùng nhau, xem đang dùng AI đúng chỗ chưa, lấp lỗ hổng vận hành và chỉ ra bước đi tiếp theo.' },
            ].map((p, i) => {
              const Icon = p.icon
              return (
                <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 flex items-start gap-3 transition-all duration-200 hover:border-[#3D6B4A]/30">
                  <span className="w-9 h-9 rounded-xl bg-[#EAF5EF] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#2D7A4F]" />
                  </span>
                  <div>
                    <p className="font-bold text-[#0D2B1A] text-sm">{p.head}</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{p.body}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <a href="#dang-ky-coaching"
            className="block text-center w-full py-4 bg-[#0D2B1A] hover:bg-[#153f27] active:scale-[0.98] text-[#F6F0E4] font-bold rounded-2xl transition-all duration-200 shadow-md">
            Tôi Muốn Có AI Agent Riêng Ngay →
          </a>
        </div>
      </section>

      {/* [4] BRIDGE — Story A-G */}
      <section className="bg-white border-y border-[#DDD8CB]/80 px-4 py-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-3 text-center">
            <span className="inline-block text-xs font-bold text-[#88860B] uppercase tracking-widest bg-[#88860B]/10 border border-[#88860B]/25 px-3 py-1 rounded-full">Câu chuyện của mình</span>
            <h2 className="text-2xl sm:text-3xl font-black leading-tight text-[#0D2B1A]">
              Từ kiệt sức làm một mình đến hệ thống tự chạy.<br/>Mình đi trước, giờ mình dẫn bạn đi.
            </h2>
          </div>

          <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            <p><strong className="text-[#0D2B1A]">Giấc mơ:</strong> Mình luôn ước mơ xây dựng những business một mình tinh gọn, có đòn bẩy tự động để rảnh tay làm việc lớn và dành thời gian cho gia đình.</p>
            <p><strong className="text-[#0D2B1A]">Hiện tại cũ:</strong> Thực tế trước đây mình ngày làm 12-14 tiếng. Quay cuồng với đủ thứ việc từ thiết kế landing page, viết bài Facebook, setup chatbot, trực inbox đến tối muộn. Đầu óc lúc nào cũng căng thẳng.</p>
            <p><strong className="text-[#0D2B1A]">Khó khăn:</strong> Mình mua đủ thứ khóa học AI, tải hàng tá tool chatbot về nhưng cài xong bot chỉ trả lời chung chung nghe rất máy móc, khách đọc xong là đi luôn. Tự cài thì tốn quá nhiều thời gian.</p>
            <p><strong className="text-[#0D2B1A]">Bước ngoặt:</strong> Mình quyết định dừng lại, tự viết ra quy trình (SOP) chạy thật của chính mình rồi tối ưu để cài đặt một AI Agent mang tên <strong className="text-[#0D2B1A]">Tiểu Hà Mã</strong> hoạt động ngay trên Telegram.</p>
            <p><strong className="text-[#0D2B1A]">Áp dụng:</strong> Mình nạp BRAND_DNA cho agent biết đúng giọng mình, nạp thông tin sản phẩm và quy trình chốt đơn. Chỗ nào chưa giống người thật, mình tối ưu lại prompt tiếp.</p>
            <p><strong className="text-[#0D2B1A]">Kết quả thật:</strong> Hiện tại, hệ thống này đang giúp mình vận hành trơn tru Ta Thong Dong homestay (doanh thu 100-120 triệu mỗi tháng ổn định), Airbnb Top 1% Superhost nhiều lần và tự động hóa toàn bộ phễu cho DungHoang.com.</p>
            <p><strong className="text-[#0D2B1A]">Vươn cao hơn:</strong> Mình thoát khỏi cảnh ôm đồm làm một mình để trở thành một Solopreneur thực thụ có "biệt đội" AI làm việc thay cả khi đang ngủ.</p>

            <div className="border-t border-[#DDD8CB] pt-4 mt-6">
              <p className="text-[#0D2B1A] font-bold">Trong Khóa 2, mình sẽ cài đặt một trợ lý AI (Telegram) hoạt động thật y như vậy cho riêng business của bạn. Điền vào bộ câu hỏi, mình setup, bạn dùng thử và mình chỉnh đến khi ưng ý.</p>
            </div>
          </div>
        </div>
      </section>

      {/* [5] KE HOACH */}
      <section id="ke-hoach" className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-block text-xs font-bold text-[#3D6B4A] uppercase tracking-widest bg-[#3D6B4A]/5 border border-[#3D6B4A]/15 px-3 py-1 rounded-full">Khóa 2 gồm gì</span>
            <h2 className="text-2xl font-black text-[#0D2B1A]">24 AI Agent + AI đội trưởng của bạn</h2>
            <p className="text-sm text-gray-500">4 tuần học đủ 24 skill. Song song mình setup AI Agent riêng cho bạn.</p>
          </div>
          <div className="space-y-3">
            {WEEK_PLAN.map(w => (
              <div key={w.w} className="bg-white border border-[#DDD8CB] rounded-2xl overflow-hidden transition-all duration-200 hover:border-[#3D6B4A]/30">
                <div className="bg-[#0D2B1A] px-5 py-3 flex items-center gap-3">
                  <span className="text-[#8BC34A] font-black text-xs font-mono">{w.w}</span>
                  <span className="text-[#F6F0E4] font-bold text-sm">{w.head}</span>
                </div>
                <div className="px-5 py-3 space-y-1.5">
                  {w.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check size={13} className="text-[#2D7A4F] mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={open}
            className="w-full h-14 bg-[#C0390E] hover:bg-[#A83208] text-white font-black rounded-2xl transition-colors shadow-lg shadow-[#C0390E]/15 flex items-center justify-center gap-2">
            Giữ Suất Cho Tôi · 3.868.686đ
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* [6] FEATURES / INSIDE */}
      <section className="bg-white px-4 py-20 border-y border-[#DDD8CB]/80">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-block text-xs font-bold text-[#3D6B4A] uppercase tracking-widest bg-[#3D6B4A]/5 border border-[#3D6B4A]/15 px-3 py-1 rounded-full">Chi tiết chương trình</span>
            <h2 className="text-2xl font-black text-[#0D2B1A]">3 cấu phần lớn trong Coaching Setup</h2>
            <p className="text-sm text-gray-500">Mỗi cấu phần giải quyết triệt để một rào cản của solopreneur.</p>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: BookOpen, iconBg: 'bg-[#EAF5EF]', iconColor: 'text-[#2D7A4F]',
                title: 'Cấu phần 1: 24 Bài Học Thực Chiến & SOP Mẫu',
                sub: 'Tự do học và áp dụng theo nhịp của bạn', subColor: 'text-gray-400',
                rows: [
                  ['Tính năng', 'Video hướng dẫn chi tiết từng nút bấm + file SOP mẫu Notion + prompt chuẩn chỉnh cho 24 skill AI Agent từ content, ads, chatbot, đến sales call.'],
                  ['Ưu điểm', 'Bạn không học lý thuyết chung chung. Mở SOP ra là có quy trình làm việc chuẩn mực của một doanh nghiệp lớn, chỉ việc điền thông tin và copy dán.'],
                  ['Lợi ích', 'Giải phóng bạn khỏi 4-5 tiếng làm việc lặt vặt. Bạn có bộ khung vận hành chuyên nghiệp để bắt đầu mở rộng quy mô mà không cần thuê thêm người.'],
                ],
              },
              {
                icon: Bot, iconBg: 'bg-[#88860B]/10', iconColor: 'text-[#88860B]',
                title: 'Cấu phần 2: Cài Đặt Riêng 1 AI Agent Trên Telegram',
                sub: 'Dũng trực tiếp setup tay cho bạn', subColor: 'text-[#88860B] font-semibold',
                rows: [
                  ['Tính năng', 'Trợ lý AI Telegram kết nối trực tiếp với database của bạn. Được huấn luyện chuyên sâu bằng BRAND_DNA (giọng văn của bạn) và thông tin sản phẩm.'],
                  ['Ưu điểm', 'Bạn hoàn toàn không cần động tay vào kỹ thuật, API hay code. Mình trực tiếp làm hết phần cấu hình thô, bạn chỉ cần test và phản hồi để mình tối ưu.'],
                  ['Lợi ích', 'Khách hàng được tư vấn 24/7 tức thì đúng giọng điệu thương hiệu. Bạn có đơn hàng tự động ngay cả khi đang ngủ, giải phóng hoàn toàn khỏi màn hình điện thoại.'],
                ],
              },
              {
                icon: Search, iconBg: 'bg-blue-50', iconColor: 'text-blue-500',
                title: 'Cấu phần 3: 1 Buổi "Soi Hệ Thống" 1 Kèm 1',
                sub: 'Tối ưu trực tiếp cùng Dũng qua video call', subColor: 'text-blue-500 font-semibold',
                rows: [
                  ['Tính năng', 'Buổi làm việc online trực tiếp dài 60-90 phút. Rà soát lại toàn bộ quy trình AI, các phễu bán hàng và kịch bản trợ lý.'],
                  ['Ưu điểm', 'Được nhìn nhận thực tế dưới góc nhìn của người đã chạy thật nhiều hệ thống tự động. Chỉ ra chính xác chỗ nào đang lãng phí, chỗ nào có lỗ hổng rò rỉ khách.'],
                  ['Lợi ích', 'Sự an tâm rằng hệ thống của bạn đã được thiết lập chuẩn xác. Bạn có một bản đồ chiến lược rõ ràng cho 6 tháng tiếp theo để bứt phá doanh số.'],
                ],
              },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <div key={i} className="border border-[#DDD8CB] rounded-2xl p-6 space-y-4 bg-[#FAF7F0]">
                  <div className="flex items-center gap-3">
                    <span className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center`}>
                      <Icon size={18} className={c.iconColor} />
                    </span>
                    <div>
                      <h3 className="font-bold text-[#0D2B1A]">{c.title}</h3>
                      <p className={`text-xs ${c.subColor}`}>{c.sub}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
                    {c.rows.map(([label, text], j) => (
                      <p key={j}><strong className="text-[#0D2B1A]">{label}:</strong> {text}</p>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* [7] EMOTION */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Sau Khóa 2: bạn có gì trong tay</h2>
          <div className="bg-white border border-[#DDD8CB] rounded-2xl p-6 space-y-4 text-gray-600 text-sm leading-relaxed">
            <p>Bạn biết cách dùng 24 AI Agent vào đúng việc trong business của mình.</p>
            <p>Và bạn có 1 AI Agent đang chạy thật trên Telegram: biết sản phẩm bạn, trả lời theo cách bạn muốn.</p>
            <p className="text-[#0D2B1A]"><strong>Không phải học xong để đó. Là học xong có cái chạy được ngay.</strong></p>
            <p>Mình đang dùng y vậy cho business của mình. Nên mình biết nó làm được gì và cài cho bạn như thế nào.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { before:'Học skill rồi để đó',        after:'24 skill + AI Agent chạy thật' },
              { before:'Tự mày mò cài agent',         after:'Mình cài tay, bạn dùng luôn' },
              { before:'Prompt chung chung',          after:'Agent biết đúng business bạn' },
              { before:'Hỏi không ai trả lời',       after:'1 buổi soi hệ thống 1 kèm 1' },
            ].map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#DDD8CB] p-4">
                <p className="text-xs text-gray-400 line-through">{r.before}</p>
                <p className="text-xs text-[#2D7A4F] font-semibold mt-1.5 flex items-start gap-1">
                  <Check size={12} className="mt-0.5 flex-shrink-0" /> {r.after}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* [8] AUTHORITY */}
      <section className="bg-white border-y border-[#DDD8CB]/80 px-4 py-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-block text-xs font-bold text-[#88860B] uppercase tracking-widest bg-[#88860B]/10 border border-[#88860B]/25 px-3 py-1 rounded-full">Tại sao bạn có thể tin mình</span>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Mình chia sẻ từ hệ thống đang chạy thật, không nói lý thuyết</h2>
          </div>

          <div className="space-y-3">
            {[
              { icon: Home,      head: 'Vận hành Ta Thong Dong Homestay', body: 'Doanh thu 100-120 triệu mỗi tháng ổn định, tự động hóa 80% khâu phản hồi khách hàng và xử lý thông tin đặt phòng bằng AI Agent.' },
              { icon: Star,      head: 'Airbnb Top 1% Superhost', body: 'Được vinh danh Superhost nhiều đợt liên tục nhờ tỷ lệ phản hồi nhanh 100% dưới 5 phút, hoàn toàn do trợ lý AI đảm nhiệm khâu trả lời ban đêm.' },
              { icon: Rocket,    head: 'Hệ thống tự động của chính DungHoang.com', body: 'Chính website này, phễu đăng ký và con bot bạn đang tương tác đều được thiết kế và vận hành bằng đúng bộ 24 skill AI trong khóa học.' },
              { icon: Handshake, head: 'Cam kết đi cùng đến khi chạy được', body: 'Mình từng làm chủ một mình tới kiệt sức nên hiểu rõ khó khăn của bạn. Mình không bán khóa học rồi bỏ đó, mình đồng hành và setup cùng bạn.' }
            ].map((a, i) => {
              const Icon = a.icon
              return (
                <div key={i} className="flex items-start gap-4 bg-[#FAF7F0] border border-[#DDD8CB] rounded-2xl p-5 transition-all duration-200 hover:border-[#3D6B4A]/30">
                  <span className="w-9 h-9 rounded-xl bg-[#EAF5EF] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#2D7A4F]" />
                  </span>
                  <div>
                    <p className="font-bold text-[#0D2B1A] text-sm">{a.head}</p>
                    <p className="text-gray-500 text-sm mt-1 leading-relaxed">{a.body}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-center text-xs text-gray-400 italic">Đó là lý do mình tự tin cam kết kép hỗ trợ bạn dựng thành công trợ lý AI đầu tiên trong 14 ngày.</p>
        </div>
      </section>

      {/* [9] PRICING */}
      <section className="px-4 py-20 bg-[#FAF7F0]" id="dang-ky-coaching">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-block text-xs font-bold text-[#3D6B4A] uppercase tracking-widest bg-[#3D6B4A]/5 border border-[#3D6B4A]/15 px-3 py-1 rounded-full">Đầu tư</span>
            <h2 className="text-2xl font-black text-[#0D2B1A]">So sánh các phương án thực tế tại Việt Nam</h2>
            <p className="text-sm text-gray-500">Trước khi quyết định, hãy nhìn vào con số thực tế trên thị trường tuyển dụng và dịch vụ hiện nay.</p>
          </div>

          <div className="space-y-6">
            {/* Phương án A */}
            <div className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-[#DDD8CB] pb-2 gap-2">
                <p className="font-bold text-[#C0390E] text-sm uppercase tracking-wider">Phương án A: Thuê nhân sự in-house</p>
                <span className="text-xs font-black text-[#C0390E] bg-[#C0390E]/10 px-2.5 py-1 rounded-full whitespace-nowrap">30-50 tr/tháng</span>
              </div>
              <div className="space-y-2.5">
                <p className="text-xs text-gray-500">Mức lương tối thiểu của thị trường lao động Việt Nam cho một team vận hành:</p>
                <div className="divide-y divide-[#DDD8CB]/60 text-xs sm:text-sm">
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Thiết kế Landing Page & Web cơ bản</span><span className="font-semibold text-gray-800 text-right">8-12 triệu/tháng</span></div>
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Content Writer (Social, TikTok, YouTube)</span><span className="font-semibold text-gray-800 text-right">7-10 triệu/tháng</span></div>
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Copywriter chạy quảng cáo</span><span className="font-semibold text-gray-800 text-right">9-15 triệu/tháng</span></div>
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Nhân viên trực page / CSKH / Chatbot</span><span className="font-semibold text-gray-800 text-right">6-8 triệu/tháng</span></div>
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Nhân sự Email Marketing & Phễu</span><span className="font-semibold text-gray-800 text-right">9-14 triệu/tháng</span></div>
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Nhân sự SEO Website in-house</span><span className="font-semibold text-gray-800 text-right">8-12 triệu/tháng</span></div>
                </div>
                <p className="text-xs text-[#C0390E]/80 italic pt-2">Chi phí nuôi team in-house tối thiểu khoảng 360-600 triệu mỗi năm. Chưa tính bảo hiểm, thưởng lễ tết, thiết bị, quản lý nhân sự và rủi ro nghỉ việc.</p>
              </div>
            </div>

            {/* Phương án B */}
            <div className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-[#DDD8CB] pb-2 gap-2">
                <p className="font-bold text-[#88860B] text-sm uppercase tracking-wider">Phương án B: Thuê agency ngoài</p>
                <span className="text-xs font-black text-[#88860B] bg-[#88860B]/10 px-2.5 py-1 rounded-full whitespace-nowrap">20-35 tr/tháng</span>
              </div>
              <div className="space-y-2.5">
                <p className="text-xs text-gray-500">Chi phí dịch vụ trung bình của các agency marketing tại Việt Nam:</p>
                <div className="divide-y divide-[#DDD8CB]/60 text-xs sm:text-sm">
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Thiết kế 1 landing page chuyên nghiệp</span><span className="font-semibold text-gray-800 text-right">5-15 triệu/trang</span></div>
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Gói quản trị Content & SEO (15-20 bài)</span><span className="font-semibold text-gray-800 text-right">8-15 triệu/tháng</span></div>
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Setup kịch bản chatbot & phễu tự động</span><span className="font-semibold text-gray-800 text-right">4-10 triệu/hệ thống</span></div>
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Phí quản lý ads tối thiểu</span><span className="font-semibold text-gray-800 text-right">5-8 triệu/tháng</span></div>
                </div>
                <p className="text-xs text-[#88860B]/90 italic pt-2">Chi phí outsourcing tốn khoảng 250-400 triệu mỗi năm cộng tiền setup ban đầu. Bạn vẫn phải dành thời gian duyệt nội dung và phối hợp liên tục.</p>
              </div>
            </div>

            {/* Phương án C */}
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/25 rounded-2xl p-5 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#2D7A4F] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">Giải pháp tối ưu</div>
              <div className="flex justify-between items-center border-b border-[#2D7A4F]/20 pb-2 gap-2">
                <p className="font-bold text-[#2D7A4F] text-sm uppercase tracking-wider pr-20">Phương án C: Sở hữu Khóa 2 & trợ lý riêng</p>
              </div>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <p className="text-xs text-gray-500">Trọn gói bộ kỹ năng và trợ lý hoạt động thật cho business của bạn:</p>
                <div className="divide-y divide-[#2D7A4F]/10">
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Đầy đủ 24 AI Agent (SOP + video + prompt)</span><span className="font-semibold text-gray-800 text-right">Thay 5-6 vị trí nhân sự</span></div>
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Thiết kế phễu và landing page tự động</span><span className="font-semibold text-gray-800 text-right">Tự làm trong vài giờ</span></div>
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">Trợ lý riêng trên Telegram (Dũng setup)</span><span className="font-semibold text-gray-800 text-right">Trực inbox 24/7 đúng BRAND_DNA</span></div>
                  <div className="py-1.5 flex justify-between gap-2"><span className="text-gray-600">1 buổi soi hệ thống 1 kèm 1</span><span className="font-semibold text-[#2D7A4F] text-right">Tặng kèm (trị giá 1.000.000đ)</span></div>
                </div>
                <p className="text-xs text-[#2D7A4F] font-bold italic pt-2">Đầu tư một lần chưa tới 4 triệu đồng, sở hữu trọn đời, tự động hóa toàn bộ vận hành và bán hàng 24/7.</p>
              </div>
            </div>
          </div>

          {/* Value Stack Box */}
          <div className="bg-white border-2 border-[#0D2B1A] rounded-3xl overflow-hidden shadow-xl mt-8">
            <div className="bg-[#0D2B1A] px-5 py-3.5">
              <p className="text-[#F6F0E4] font-bold text-sm">Toàn bộ giá trị bạn nhận được</p>
            </div>
            <div className="divide-y divide-[#DDD8CB]/80">
              {[
                { item: 'Gói 24 AI Agent for Business (đầy đủ Khóa 1)', value: '16.484.832đ' },
                { item: 'Hội Đồng Cố Vấn AI: 5 skill giám đốc CEO/CFO/CMO/CCO/CHRO', value: '2.868.686đ' },
                { item: 'Setup AI Agent riêng của bạn giống Tiểu Hà Mã (thị trường $3.000)', value: '75.000.000đ' },
                { item: 'Buổi Soi Hệ Thống 1 kèm 1 (video call trực tiếp)', value: '1.000.000đ', bonus: true },
                { item: 'Quà tặng 1: 489 Tiêu Đề Thu Hút Khách Hàng (Notion)', value: '686.000đ', bonus: true },
                { item: 'Quà tặng 2: File Nạp Giọng BRAND_DNA mẫu của Dũng', value: '686.000đ', bonus: true },
                { item: 'Quà tặng 3: 27 Yếu Tố Triệu View (viral content)', value: '686.000đ', bonus: true },
                { item: 'Quà tặng 4: Ma Trận Nội Dung (bản đồ content ngày)', value: '868.000đ', bonus: true },
                { item: 'Quà tặng 5: Buổi soi hệ thống cùng nhóm hàng tháng', value: '686.000đ', bonus: true },
              ].map((r, i) => (
                <div key={i} className={`px-5 py-3 flex justify-between items-center ${r.bonus ? 'bg-[#EAF5EF]/70' : ''}`}>
                  <p className={`text-xs sm:text-sm flex items-start gap-2 ${r.bonus ? 'font-semibold text-[#2D7A4F]' : 'text-gray-700'}`}>
                    {r.bonus && <Gift size={13} className="mt-0.5 flex-shrink-0" />}
                    {r.item}
                  </p>
                  <p className={`text-xs sm:text-sm font-bold flex-shrink-0 ml-4 ${r.bonus ? 'text-[#2D7A4F]' : 'text-gray-400'}`}>{r.value}</p>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 bg-[#FAF7F2] flex justify-between items-center text-sm border-t border-[#DDD8CB]">
              <p className="font-bold text-[#0D2B1A]">Tổng giá trị gói & quà tặng</p>
              <p className="text-lg font-black text-gray-400 line-through">98.965.518đ</p>
            </div>
            <div className="px-5 py-5 bg-[#EAF5EF] flex justify-between items-center border-t-2 border-[#0D2B1A]">
              <div>
                <p className="font-black text-[#0D2B1A] text-sm">Đầu tư một lần, sở hữu mãi mãi</p>
                <p className="text-xs text-[#3D6B4A]">Đã học Khóa 1? Chỉ thêm 3.000.000đ · Đã có Hội Đồng Cố Vấn? Chỉ thêm 1.000.000đ</p>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#0D2B1A] flex-shrink-0 ml-3">3.868.686đ</p>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={open}
              className="w-full h-16 bg-[#C0390E] hover:bg-[#A83208] text-white text-lg font-black rounded-2xl transition-colors shadow-xl shadow-[#C0390E]/20 flex items-center justify-center gap-2">
              Giữ Suất Cho Tôi · 3.868.686đ
              <ArrowRight size={20} />
            </button>
            <p className="text-center text-xs text-gray-400">Chuyển khoản QR · Xác nhận tự động 5-10 phút · Bảo hành 14 ngày hoàn 100%</p>
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
            <h3 className="text-xl font-black text-[#0D2B1A]">Cam kết kép</h3>
            <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
              <p><strong className="text-[#0D2B1A]">1. Bảo hành 14 ngày hoàn 100%:</strong> không phù hợp trong 14 ngày đầu, nhắn mình, hoàn trong 24h không hỏi lý do.</p>
              <p><strong className="text-[#0D2B1A]">2. Setup agent đến khi ưng:</strong> mình chỉnh agent theo phản hồi của bạn cho đến khi nó hoạt động đúng cách bạn muốn. Không setup xong rồi bỏ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* [11] IS FOR / NOT FOR */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-black text-[#0D2B1A] text-center">Khóa 2 dành cho ai?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#EAF5EF] border border-[#2D7A4F]/20 rounded-2xl p-5 space-y-3">
              <p className="font-bold text-[#2D7A4F] text-sm flex items-center gap-2">
                <Check size={15} /> DÀNH CHO:
              </p>
              <div className="space-y-2">
                {[
                  'Đã học Khóa 1 (hoặc mua luôn Khóa 2) và muốn có AI Agent hoạt động thật, không chỉ học lý thuyết',
                  'Có business đang chạy, muốn AI Agent biết đúng sản phẩm và khách hàng của mình',
                  'Muốn tiết kiệm thời gian mày mò tự cài, nhờ mình setup tay cho',
                  'Muốn có 1 buổi ngồi nhìn vào business để biết đang dùng AI đúng hướng chưa',
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
                  'Chưa có sản phẩm hoặc dịch vụ thật: agent cần biết bạn bán gì mới cài được',
                  'Muốn AI Agent tự kiếm tiền mà không cần làm gì từ phía bạn',
                  'Chưa chắc AI có phù hợp không: thử Khóa 1 trước rồi nâng cấp sau',
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <X size={13} className="text-gray-300 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-500 leading-snug">{t}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

      {/* [12B] SOCIAL PROOF */}
      <section className="px-4 py-20 bg-[#FAF7F0]">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <span className="inline-block text-xs font-bold text-[#3D6B4A] uppercase tracking-widest bg-[#3D6B4A]/5 border border-[#3D6B4A]/15 px-3 py-1 rounded-full">Học viên Khóa 2</span>
            <h2 className="text-2xl font-black text-[#0D2B1A]">Học xong + có AI Agent đang chạy thật</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name:'Chủ homestay 3 phòng', result:'Sau khi mình setup AI Agent, inbox câu hỏi thường gặp tự được trả lời. Mình chỉ cần xác nhận đặt phòng. Tiết kiệm mấy tiếng mỗi ngày không cần reply thủ công nữa', outcome:'AI Agent trả lời khách 24/7 đúng thông tin phòng' },
              { name:'Coach kinh doanh',       result:'Agent biết đúng các gói dịch vụ và câu mình hay dùng để tư vấn. Khách hỏi bất cứ lúc nào đều có câu trả lời. Buổi soi hệ thống xong mình biết bước tiếp nên làm gì rồi', outcome:'Agent tư vấn đúng gói, đúng giọng' },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-[#DDD8CB] rounded-2xl p-5 space-y-3 transition-all duration-200 hover:border-[#3D6B4A]/30">
                <p className="text-sm text-gray-700 leading-relaxed italic">"{t.result}"</p>
                <div className="border-t border-[#EFE9DC] pt-3">
                  <p className="text-xs font-bold text-[#0D2B1A]">{t.name}</p>
                  <p className="text-xs text-[#2D7A4F] font-medium mt-0.5 flex items-start gap-1">
                    <Check size={11} className="mt-0.5 flex-shrink-0" /> {t.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400">Kết quả thay đổi tùy business và mức độ thực hiện theo SOP. Đây là ví dụ từ học viên thật.</p>

          {/* [13] FINAL CTA */}
          <div className="space-y-6 pt-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B1A] leading-tight">
                Còn {slots} suất đợt này.<br/>Khi hết, đóng đăng ký.
              </h2>
              <p className="text-gray-500 text-sm">Setup AI Agent riêng cần làm tay từng người. Mình không thể nhận thêm.</p>
            </div>

            <div className="bg-white border border-[#DDD8CB] rounded-2xl p-6 space-y-3">
              <p className="text-[#0D2B1A] font-bold text-sm">Bạn đang cân nhắc giữa:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#C0390E] text-white font-black text-sm flex items-center justify-center flex-shrink-0">A</span>
                  <p className="text-gray-600 text-sm">Đăng ký hôm nay: học đủ 24 skill + có AI Agent của riêng mình</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-gray-200 text-gray-500 font-black text-sm flex items-center justify-center flex-shrink-0">B</span>
                  <p className="text-gray-600 text-sm">Chờ thêm, và tiếp tục mày mò tự cài trong lúc đó</p>
                </div>
              </div>
              <p className="text-[#88860B] text-sm italic">Cả hai đều hợp lệ. Nhưng nếu bạn muốn có agent thật đang chạy, đợt này còn {slots} suất.</p>
            </div>

            <div className="space-y-3">
              <button onClick={open}
                className="w-full h-16 bg-[#C0390E] hover:bg-[#A83208] active:scale-[0.98] text-white text-base font-black rounded-2xl transition-all duration-200 shadow-xl shadow-[#C0390E]/25 flex items-center justify-center gap-2">
                Giữ Suất Cho Tôi · 3.868.686đ
                <ArrowRight size={19} />
              </button>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-400 font-semibold">
                <span className="flex items-center gap-1"><Check size={12} className="text-[#2D7A4F]" /> 24 AI Agent for Business</span>
                <span className="flex items-center gap-1"><Check size={12} className="text-[#2D7A4F]" /> AI Agent cài riêng cho bạn</span>
                <span className="flex items-center gap-1"><Check size={12} className="text-[#2D7A4F]" /> Bảo hành 14 ngày</span>
              </div>
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
            {' '}· Zalo 0938725413
          </p>
          <div className="flex justify-center gap-4 text-xs text-[#F6F0E4]/30">
            <a href="/portal" className="hover:text-[#F6F0E4]/60">Khu học</a>
            <a href="/24-ai-agent" className="hover:text-[#F6F0E4]/60">Khóa 1</a>
            <a href="/hoi-dong-co-van" className="hover:text-[#F6F0E4]/60">Hội Đồng Cố Vấn</a>
          </div>
        </div>
      </footer>

      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0D2B1A]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl animate-slide-up">
          <div className="min-w-0">
            <p className="text-[#F6F0E4] font-bold text-sm truncate">Khóa 2 · Có Đội Trưởng · {slots} suất</p>
            <p className="text-[#C8D5C9]/60 text-xs truncate">3.868.686đ · 24 skill + AI Agent riêng · Bảo hành 14 ngày</p>
          </div>
          <button onClick={open}
            className="flex-shrink-0 bg-[#C0390E] hover:bg-[#A83208] text-white font-bold px-4 h-11 rounded-xl text-sm transition-all whitespace-nowrap">
            Giữ suất →
          </button>
        </div>
      )}

      <CheckoutModal productId={product.id} open={showCheckout} onClose={() => setShowCheckout(false)} />
    </div>
  )
}
