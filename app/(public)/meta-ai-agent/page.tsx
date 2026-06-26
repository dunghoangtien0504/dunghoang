'use client'

import { useState, useEffect, useRef } from 'react'
import {
  CheckCircle2, XCircle, ChevronDown, MessageCircle,
  Shield, Clock, Zap, Users, ArrowRight, BookOpen, Star, AlertCircle, HelpCircle
} from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import CheckoutModal from '@/components/checkout/CheckoutModal'

const product = PRODUCTS['meta-ai-agent']

export default function MetaAIAgentPage() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [openFaq, setOpenFaq]           = useState<number | null>(null)
  const [visible, setVisible]           = useState<Record<string, boolean>>({})
  const obsRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    obsRef.current = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisible(p => ({ ...p, [e.target.id]: true }))
      }),
      { threshold: 0.05 }
    )
    document.querySelectorAll('[data-animate]').forEach(el => obsRef.current?.observe(el))
    return () => obsRef.current?.disconnect()
  }, [])

  const animClass = (id: string) =>
    `transition-all duration-1000 ease-out transform ${
      visible[id] ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'
    }`

  const buy = () => setShowCheckout(true)

  return (
    <div
      className="min-h-dvh bg-[#050D08] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#0A2616] via-[#050D08] to-[#020604] text-[#F6F0E4] overflow-hidden"
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      {/* Font imports */}
      <link
        href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,600&display=swap"
        rel="stylesheet"
      />

      {/* Background glow filters */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[1200px] right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[800px] left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* ── [0] Announcement Bar — B.12 Scarcity ── */}
      <div className="bg-[#1D9E75] text-[#050D08] text-center py-2.5 px-4 text-xs md:text-sm font-black tracking-wider uppercase shadow-md relative z-30">
        ⚡ Ưu Đãi Ra Mắt 199.000đ · Giá Gốc 399.000đ (Bảo hành 14 ngày hoàn tiền 100%)
      </div>

      {/* ── [1] Hero Section ── */}
      <section className="relative max-w-4xl mx-auto px-5 pt-20 pb-16 text-center z-10">
        <div className="inline-flex items-center gap-2 bg-[#1D9E75]/10 border border-[#1D9E75]/30
                        text-[#3EE2A9] text-xs font-bold px-4 py-1.5 rounded-full mb-8 uppercase tracking-widest animate-pulse">
          <Zap className="w-3.5 h-3.5 fill-current" />
          Meta AI Agent · Trực Page Thay Bạn 24/7
        </div>

        {/* B.1 Headline: Max 2 lines & Extremely Hooking */}
        <h1 className="text-3xl sm:text-5xl md:text-[3.25rem] font-black leading-[1.12] mb-6 tracking-tight text-[#F6F0E4]">
          Mỗi đêm Fanpage nhận tin nhắn...<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E05C5C] to-[#FFA2A2]">
            Sáng ra, khách đã chốt đơn bên khác!
          </span>
        </h1>

        {/* B.2 Sub-headline: Clarity & Trust */}
        <p className="text-base sm:text-lg md:text-xl text-[#F6F0E4]/70 mb-10 leading-relaxed max-w-2xl mx-auto">
          Hơn <strong className="text-[#3EE2A9]">600+ chủ shop</strong> đang dùng AI mặc định của Meta để tự tư vấn và chăm sóc khách hàng 24/7 — ngay cả khi đang ngủ. 
          <span className="block mt-2 font-medium text-white/90">Setup chỉ 30 phút. Không cần biết code. Không mất phí duy trì hàng tháng.</span>
        </p>

        {/* CTA L1 */}
        <div className="space-y-4">
          <button
            onClick={buy}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#1D9E75] to-[#15825F] hover:from-[#22B385] hover:to-[#1B9C73]
                       active:scale-[0.98] text-white font-extrabold py-4.5 px-10 rounded-2xl text-base md:text-lg
                       transition-all duration-300 shadow-xl shadow-emerald-950/50 cursor-pointer"
          >
            Tôi Muốn AI Trả Lời Thay Mình
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center justify-center gap-4 text-xs text-[#F6F0E4]/40">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-[#3EE2A9]" /> Nhận file ngay sau thanh toán</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-[#3EE2A9]" /> Bảo hành hoàn tiền 14 ngày</span>
          </div>
        </div>
      </section>

      {/* ── [2] Trust Bar / Quick Stats ── */}
      <section id="trust" data-animate className={`max-w-4xl mx-auto px-5 pb-20 ${animClass('trust')}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { Icon: Users,         num: '600+',    label: 'Chủ shop đang vận hành' },
            { Icon: Clock,         num: '30 phút', label: 'Thời gian tự setup xong' },
            { Icon: Zap,           num: '6 Ngành', label: 'Template viết sẵn ăn liền' },
            { Icon: Shield,        num: '14 Ngày', label: 'Thử thách hoàn tiền 100%' },
          ].map(({ Icon, num, label }) => (
            <div key={label}
              className="bg-white/[0.02] backdrop-blur-sm border border-emerald-500/10 hover:border-emerald-500/25 rounded-2xl px-4 py-6 text-center transition-all duration-300 hover:-translate-y-1">
              <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon className="w-4 h-4 text-[#3EE2A9]" />
              </div>
              <div className="text-2xl font-black text-[#F6F0E4] tracking-tight">{num}</div>
              <div className="text-xs text-[#F6F0E4]/50 mt-1 leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── [3] Pain Section (Vấn đề 3 lớp) ── */}
      <section id="pain" data-animate className={`max-w-4xl mx-auto px-5 py-20 border-t border-white/[0.03] ${animClass('pain')}`}>
        <p className="text-[#3EE2A9] text-xs font-bold uppercase tracking-widest text-center mb-3">
          VẤN ĐỀ TRỤC CHÍNH
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12 tracking-tight">
          Nỗi ám ảnh kinh hoàng mang tên: reply trễ!
        </h2>

        {/* Lớp 1: Symptoms - Bento Grid Asymmetric */}
        <div className="grid md:grid-cols-5 gap-5 mb-8">
          <div className="md:col-span-3 bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/15 rounded-3xl p-8 transition-all duration-300">
            <div className="w-12 h-12 bg-[#E05C5C]/10 rounded-2xl flex items-center justify-center mb-5">
              <MessageCircle className="w-6 h-6 text-[#E05C5C]" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-[#F6F0E4]">Inbox dồn dập lúc nửa đêm — Sáng dậy khách đã đi mất</h3>
            <p className="text-sm text-[#F6F0E4]/60 leading-relaxed">
              Khách hỏi mua lúc 11h, 12h đêm. Shop đi ngủ, không ai trả lời. Sáng ra bạn hí hửng vào reply thì nhận lại sự im lặng. Họ đã tìm thấy một shop khác phản hồi ngay lập tức để giải quyết nhu cầu tức thời.
            </p>
          </div>

          <div className="md:col-span-2 flex flex-col gap-5">
            <div className="bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/15 rounded-3xl p-6 transition-all duration-300 flex-1">
              <div className="w-9 h-9 bg-[#E05C5C]/10 rounded-xl flex items-center justify-center mb-4">
                <XCircle className="w-5 h-5 text-[#E05C5C]" />
              </div>
              <h4 className="font-bold text-sm mb-2 text-[#F6F0E4]">AI của Meta tự nói lung tung</h4>
              <p className="text-xs text-[#F6F0E4]/50 leading-relaxed">
                Tự bật AI Meta nhưng do không cung cấp tài liệu huấn luyện đúng, nó trả lời lung tung, sai giá, làm phiền khách.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/15 rounded-3xl p-6 transition-all duration-300 flex-1">
              <div className="w-9 h-9 bg-[#E05C5C]/10 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-[#E05C5C]" />
              </div>
              <h4 className="font-bold text-sm mb-2 text-[#F6F0E4]">Đốt 2-3 tiếng mỗi ngày trả lời tay</h4>
              <p className="text-xs text-[#F6F0E4]/50 leading-relaxed">
                Bị kẹt trong vòng lặp trả lời đi trả lời lại những câu hỏi trùng lặp: giá bao nhiêu, ship thế nào, còn size không.
              </p>
            </div>
          </div>
        </div>

        {/* Lớp 2: Consequences */}
        <div className="bg-gradient-to-r from-[#E05C5C]/10 to-transparent border border-[#E05C5C]/20 rounded-3xl p-8 mb-8">
          <p className="text-[#E05C5C] font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
            <AlertCircle size={14} /> Hậu quả thực tế — Những con số biết nói
          </p>
          <div className="space-y-4">
            {[
              'Rò rỉ doanh số âm thầm: Reply chậm quá 5 phút làm giảm 80% tỷ lệ chốt. Mỗi ngày rơi rớt 1-2 đơn = Mất đứt 15-20 triệu mỗi tháng.',
              'Mất chi phí quảng cáo (Ad Waste): Đốt tiền chạy ads kéo khách vào, nhưng lại để khách nguội lạnh vì không ai tư vấn.',
              'Tốn chi phí cơ hội: Thay vì dành thời gian tối ưu sản phẩm, tìm nguồn hàng hay làm chiến lược, bạn lại biến mình thành một tổng đài trực page thủ công.',
            ].map((text, i) => (
              <div key={i} className="flex gap-3 items-start">
                <ArrowRight className="w-4 h-4 text-[#E05C5C] shrink-0 mt-1" />
                <p className="text-sm text-[#F6F0E4]/70 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lớp 3: Identity & Emotion */}
        <div className="relative bg-white/[0.01] border-l-4 border-[#E05C5C] rounded-r-3xl p-6 md:p-8 overflow-hidden">
          <div className="absolute right-4 top-4 text-white/[0.02] text-8xl font-serif pointer-events-none">“</div>
          <p className="text-xs text-[#F6F0E4]/40 font-bold uppercase tracking-widest mb-3">Sự mệt mỏi từ sâu thẳm tâm lý</p>
          <p className="text-base md:text-lg text-[#F6F0E4]/80 leading-relaxed italic font-serif pl-1">
            "Nhiều lúc đang ăn cơm với gia đình hay đi ngủ mà điện thoại cứ rung bần bật. Không trả lời thì xót đơn, mà trả lời thì mất hết thời gian riêng tư. Cảm giác page của mình bỏ hoang và thiếu chuyên nghiệp trước mắt khách..."
          </p>
          <p className="text-xs text-[#F6F0E4]/40 mt-4">
            — Chia sẻ từ một chủ shop thời trang tại TP.HCM trước khi ứng dụng Meta AI Agent.
          </p>
        </div>

        {/* CTA L2 */}
        <div className="text-center mt-12">
          <button
            onClick={buy}
            className="inline-flex items-center gap-2.5 bg-white/5 hover:bg-emerald-500/10
                       border border-white/10 hover:border-emerald-500/35 text-[#3EE2A9] font-bold py-3.5 px-8
                       rounded-2xl text-sm transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
          >
            Giải Phóng Sức Lao Động Ngay Lập Tức
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── [4] Story / Solution Bridge ── */}
      <section id="story" data-animate className={`max-w-4xl mx-auto px-5 py-12 ${animClass('story')}`}>
        <div className="bg-gradient-to-br from-[#0B2114] to-[#040C07] border border-emerald-500/10 rounded-3xl p-8 md:p-12 relative">
          <div className="absolute top-0 right-12 w-24 h-24 bg-[#1D9E75]/10 rounded-full blur-2xl pointer-events-none" />
          
          <p className="text-[#3EE2A9] text-xs font-bold uppercase tracking-widest mb-6">
            CÂU CHUYỆN THỰC TẾ TỪ SHOP DŨNG HOÀNG
          </p>

          <h3 className="text-xl md:text-2xl font-black text-[#F6F0E4] mb-5 leading-snug">
            Hành trình tự động hóa quy trình trực page để rảnh tay làm việc lớn
          </h3>
          
          <div className="space-y-4 text-sm text-[#F6F0E4]/70 leading-relaxed">
            <p>
              Là một solopreneur, mình tự vận hành mọi thứ từ Homestay, sản xuất khoá học cho tới viết content đa kênh. Trước đây, mình bị kẹt cứng vào chiếc điện thoại. Khách nhắn hỏi lúc đêm muộn mà không trả lời là sáng hôm sau mất đơn.
            </p>
            <p>
              Mình đã thử dùng nhiều phần mềm chatbot kéo thả phức tạp, nhưng chi phí hàng tháng khá đắt đỏ mà khách thì ghét bấm nút rẽ nhánh kiểu robot vô hồn. Sau đó, mình phát hiện ra Meta có tích hợp sẵn AI tự nhiên miễn phí ngay trên Business Suite, nhưng ngặt nỗi, không có tài liệu dạy thì nó sẽ nói chuyện ngô nghê.
            </p>
            <p className="border-l-2 border-[#3EE2A9] pl-4 italic text-[#F6F0E4]/80">
              "Mình quyết định ngồi mổ xẻ: AI của Meta cần thông tin theo cấu trúc chuẩn nào để trả lời tự nhiên như người thật? Sau hơn 1 tháng liên tục test, viết đi viết lại Custom Instructions và Business Info trên 6 ngành hàng khác nhau, mình đã tìm ra bộ khung hoàn hảo."
            </p>
            <p>
              AI sau khi được nạp đúng tài liệu đã tự động chốt đơn, trả lời thông tin chi tiết và phản hồi siêu tốc 24/7. Mình đã đóng gói toàn bộ quy trình và các file template chuẩn hóa này lại để bạn chỉ cần điền thông tin và copy-paste vào Meta trong 30 phút là chạy được ngay.
            </p>
          </div>

          {/* Key Achievements */}
          <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-2xl p-6 mt-8">
            <p className="text-[#3EE2A9] font-black text-sm mb-4">Lợi ích thực tế sau khi setup bộ file của mình:</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Tự động hóa', val: '80%', desc: 'câu hỏi thường gặp' },
                { label: 'Phản hồi siêu tốc', val: '24/7', desc: 'tất cả các khung giờ' },
                { label: 'Thời gian tiết kiệm', val: '2 Giờ', desc: 'mỗi ngày trực page' },
              ].map(({ label, val, desc }) => (
                <div key={label} className="bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl text-center">
                  <span className="block text-2xl font-black text-[#3EE2A9] mb-1">{val}</span>
                  <span className="block text-xs font-bold text-[#F6F0E4]/80">{label}</span>
                  <span className="block text-[10px] text-[#F6F0E4]/40 mt-0.5">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── [5] How It Works ── */}
      <section id="how" data-animate className={`max-w-4xl mx-auto px-5 py-20 border-t border-white/[0.03] ${animClass('how')}`}>
        <h2 className="text-3xl font-black text-center mb-3 tracking-tight">3 bước đơn giản · 30 phút setup</h2>
        <p className="text-center text-[#F6F0E4]/50 mb-12 text-sm max-w-md mx-auto">
          Không cần biết lập trình. Không cài đặt phần mềm bên thứ ba. Hoàn toàn bảo mật ngay trên Meta Business Suite.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Cá nhân hóa tài liệu',
              desc: 'Bạn điền các thông tin cơ bản về shop (sản phẩm, giá, ship...) vào file mẫu mình chuẩn bị sẵn.',
            },
            {
              step: '02',
              title: 'Copy-Paste vào Meta',
              desc: 'Truy cập Meta Business Suite, copy toàn bộ nội dung trong file đã điền và dán vào đúng các ô AI quy định.',
            },
            {
              step: '03',
              title: 'Chạy thử nghiệm & Bật',
              desc: 'Thử nghiệm nhanh với bộ 20 câu test tự động để đảm bảo AI hoạt động chính xác trước khi mở chính thức cho khách.',
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="group relative bg-white/[0.02] border border-white/[0.06] hover:border-emerald-500/20 rounded-3xl p-6 transition-all duration-300">
              <span className="absolute top-6 right-6 font-mono text-5xl font-black text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors">
                {step}
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-[#3EE2A9] flex items-center justify-center font-bold text-sm mb-6">
                Step {step}
              </div>
              <h3 className="font-bold text-base mb-2 text-[#F6F0E4] leading-snug">{title}</h3>
              <p className="text-xs text-[#F6F0E4]/50 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── [6] Deliverables ( FAB Benefits) ── */}
      <section id="deliver" data-animate className={`max-w-4xl mx-auto px-5 py-20 border-t border-white/[0.03] ${animClass('deliver')}`}>
        <h2 className="text-3xl font-black text-center mb-3 tracking-tight">Chi tiết gói giải pháp bạn nhận được</h2>
        <p className="text-center text-[#F6F0E4]/50 mb-14 text-sm max-w-md mx-auto">
          Bộ 4 tài liệu chuyên sâu được tối ưu để huấn luyện trí tuệ nhân tạo của Meta hoạt động trơn tru.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {[
            {
              num: '01',
              name: 'Tài liệu Business Info',
              desc: 'Dạy cho AI thấu hiểu rõ về thương hiệu, danh mục sản phẩm, bảng giá và toàn bộ quy trình thanh toán/vận chuyển của shop.',
            },
            {
              num: '02',
              name: 'Tài liệu Custom Instructions',
              desc: 'Định hình giọng văn, thái độ phản hồi (thân thiện, chuyên nghiệp) để AI giao tiếp tự nhiên giống như một nhân viên sales thực thụ.',
            },
            {
              num: '03',
              name: 'Tài liệu Avoid Topics',
              desc: 'Danh sách các chủ đề nhạy cảm hoặc câu hỏi AI tuyệt đối không tự trả lời bừa (ví dụ: mặc cả giá, khiếu nại chất lượng) để chuyển cho bạn xử lý.',
            },
            {
              num: '04',
              name: 'Bộ 20+ Test Cases mẫu',
              desc: 'Bộ câu hỏi test nhanh giúp bạn kiểm tra và đo lường độ chính xác của AI trên nhiều tình huống trước khi chính thức bấm nút kích hoạt.',
            },
          ].map(({ num, name, desc }) => (
            <div key={num} className="bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/20 rounded-3xl p-6.5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-emerald-500/10 text-[#3EE2A9] rounded-xl flex items-center justify-center text-xs font-black">
                  {num}
                </div>
                <h3 className="font-extrabold text-sm text-[#F6F0E4]/90">{name}</h3>
              </div>
              <p className="text-xs text-[#F6F0E4]/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* 6 Pre-built templates */}
        <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-3xl p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-[#3EE2A9] mb-4 text-center sm:text-left">
            🎯 Đã thiết kế sẵn Template ăn liền cho 6 ngành lớn:
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
            {['Thời trang / Phụ kiện', 'Mỹ phẩm / Skincare', 'Mẹ và Bé', 'Ẩm thực / F&B', 'Nội thất / Decor', 'Spa / Thẩm mỹ viện'].map(c => (
              <span key={c}
                className="bg-emerald-500/10 text-[#3EE2A9] text-xs px-4 py-2 rounded-full font-medium border border-emerald-500/20 shadow-sm">
                {c}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-[#F6F0E4]/40 mt-4 leading-relaxed text-center sm:text-left">
            * Nếu shop của bạn thuộc ngành khác? Hãy nhắn tin cho mình trước để kiểm tra tính khả thi. Nếu AI không đáp ứng tốt, mình cam kết sẽ không nhận tiền.
          </p>
        </div>
      </section>

      {/* ── [7] Emotion Section (Future Pacing) ── */}
      <section id="emotion" data-animate className={`max-w-4xl mx-auto px-5 py-12 ${animClass('emotion')}`}>
        <div className="bg-gradient-to-br from-[#0B2114] via-[#040C07] to-[#010302] border border-emerald-500/15 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <p className="text-[#3EE2A9] text-xs font-bold uppercase tracking-widest mb-4">FUTURE PACING</p>
          <h2 className="text-2xl md:text-3xl font-black mb-10 tracking-tight">Kịch bản cuộc sống thay đổi từ ngày mai</h2>

          <div className="max-w-xl mx-auto space-y-6 text-left mb-10">
            {[
              {
                time: '6:00 sáng Thứ Hai ngủ dậy',
                text: 'Bạn mở điện thoại. Fanpage nhận 10 tin nhắn từ tối qua. AI đã thay bạn chốt giá, cung cấp số đo và ship. 3 khách đã chuyển khoản chốt đơn thành công.',
              },
              {
                time: '11h đêm khi đang du lịch',
                text: 'Khách nhắn hỏi "shop ơi mẫu này có sẵn size L không?". Bạn đang ăn tối cùng gia đình. AI trả lời trong 5 giây. Khách vui vẻ đặt hàng.',
              },
              {
                time: 'Bất kỳ ngày nào trong tuần',
                text: 'Bạn pha tách cà phê, mở dashboard. Không còn stress vì tin nhắn đỏ lòm chờ rep. Tập trung 100% thời gian tối ưu sản phẩm và vận hành.',
              },
            ].map(({ time, text }, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#3EE2A9] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <p className="font-bold text-sm text-[#3EE2A9] mb-1">{time}</p>
                  <p className="text-xs sm:text-sm text-[#F6F0E4]/65 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/[0.05]">
            <p className="text-xs sm:text-sm text-[#F6F0E4]/50 mb-6">
              Chỉ 30 phút setup hôm nay — Sở hữu trợ lý AI thông minh làm việc trọn đời.
            </p>
            <button
              onClick={buy}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#1D9E75] to-[#15825F] hover:from-[#22B385] hover:to-[#1B9C73]
                         active:scale-[0.98] text-white font-extrabold py-3.5 px-8 rounded-2xl text-sm
                         transition-all duration-300 shadow-xl shadow-emerald-950/40 cursor-pointer"
            >
              Tôi Muốn Setup Ngay
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* ── [9] Value Stack & Pricing ── */}
      <section id="price" data-animate className={`max-w-3xl mx-auto px-5 py-20 border-t border-white/[0.03] ${animClass('price')}`}>
        <p className="text-[#3EE2A9] text-xs font-bold uppercase tracking-widest text-center mb-3">
          SO SÁNH GIÁ TRỊ
        </p>
        <h2 className="text-3xl font-black text-center mb-12 tracking-tight">Quyết định thông minh cho shop của bạn</h2>

        {/* Side-by-side comparison */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-red-500/[0.02] border border-red-500/10 rounded-3xl p-6 md:p-8">
            <h3 className="text-red-400 font-extrabold text-base mb-5 flex items-center gap-2">
              <XCircle size={18} /> Nếu tự trả lời tay
            </h3>
            <ul className="space-y-3.5 text-xs text-[#F6F0E4]/65">
              <li className="flex gap-2.5 items-start">
                <span className="text-red-400 shrink-0 mt-0.5">•</span> Mất tối thiểu 2 tiếng trực page mệt mỏi mỗi ngày
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-red-400 shrink-0 mt-0.5">•</span> Mất đơn liên tục lúc đêm muộn hoặc lúc bận rộn
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-red-400 shrink-0 mt-0.5">•</span> Phí thuê nhân viên trực page tối thiểu 2-3 triệu/tháng
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-red-400 shrink-0 mt-0.5">•</span> Mất khách hàng tiềm năng vào tay đối thủ reply nhanh
              </li>
            </ul>
          </div>

          <div className="bg-emerald-500/[0.02] border border-emerald-500/15 rounded-3xl p-6 md:p-8">
            <h3 className="text-[#3EE2A9] font-extrabold text-base mb-5 flex items-center gap-2">
              <CheckCircle2 size={18} /> Có trợ lý AI Meta setup chuẩn
            </h3>
            <ul className="space-y-3.5 text-xs text-[#F6F0E4]/75">
              <li className="flex gap-2.5 items-start">
                <span className="text-[#3EE2A9] shrink-0 mt-0.5">•</span> AI tự động chăm sóc 24/7 không bỏ sót bất kỳ inbox nào
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-[#3EE2A9] shrink-0 mt-0.5">•</span> Giữ chân và chốt đơn ngay cả khi bạn đang say giấc
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-[#3EE2A9] shrink-0 mt-0.5">•</span> Chi phí duy trì bằng 0đ (Meta Business AI miễn phí 100%)
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-[#3EE2A9] shrink-0 mt-0.5">•</span> Setup 1 lần dùng mãi mãi, tự do mở rộng quy mô
              </li>
            </ul>
          </div>
        </div>

        {/* Value Stack Table */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl overflow-hidden mb-10">
          <div className="bg-white/[0.04] px-6 py-4 flex justify-between text-xs font-black text-[#F6F0E4]/60 uppercase tracking-wider">
            <span>Chi tiết gói giải pháp</span>
            <span>Giá trị thực tế</span>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {[
              ['Mẫu Business Info chuẩn hóa theo ngành', '200.000đ'],
              ['Mẫu Custom Instructions định hình phong cách sales', '300.000đ'],
              ['Mẫu Avoid Topics hạn chế AI lỗi thông tin', '150.000đ'],
              ['Bộ câu hỏi kiểm tra độ nhạy AI (20+ Test Cases)', '150.000đ'],
              ['Video & tài liệu hướng dẫn dán từng bước trực quan', '100.000đ'],
              ['Đặc quyền hỗ trợ 1-1 qua Telegram nếu kẹt', '200.000đ'],
            ].map(([title, val], idx) => (
              <div key={idx} className="px-6 py-4 flex justify-between text-xs sm:text-sm">
                <span className="text-[#F6F0E4]/80">{title}</span>
                <span className="text-[#F6F0E4]/40 line-through shrink-0 ml-4">{val}</span>
              </div>
            ))}
          </div>
          <div className="bg-emerald-500/[0.03] border-t border-emerald-500/20 px-6 py-5 flex justify-between items-center font-bold">
            <span className="text-sm text-[#F6F0E4]">Tổng giá trị gói giải pháp</span>
            <span className="text-[#F6F0E4]/40 line-through text-sm">1.100.000đ</span>
          </div>
        </div>

        {/* Price Card */}
        <div className="relative bg-white/[0.02] border-2 border-emerald-500 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <p className="text-xs uppercase tracking-widest text-[#3EE2A9] font-black mb-2">ƯU ĐÃI ĐĂNG KÝ HÔM NAY</p>
          <div className="text-5xl md:text-6xl font-black text-[#3EE2A9] tracking-tight mb-2">199.000đ</div>
          <p className="text-[#F6F0E4]/40 text-xs mb-8 max-w-sm mx-auto leading-relaxed">
            Bằng chi phí một cốc nước cho nhân viên thử việc. Nhưng AI của bạn sẽ miệt mài làm việc trọn đời không nghỉ phép.
          </p>

          {/* CTA L4 */}
          <button
            onClick={buy}
            className="w-full max-w-md bg-gradient-to-r from-[#1D9E75] to-[#15825F] hover:from-[#22B385] hover:to-[#1B9C73]
                       active:scale-[0.98] text-white font-black py-4.5 px-8 rounded-2xl text-lg
                       transition-all duration-300 shadow-2xl shadow-emerald-950/60 cursor-pointer"
          >
            Đăng Ký Setup AI Ngay — 199.000đ →
          </button>
          <p className="text-[11px] text-[#F6F0E4]/30 mt-4">
            * Bảo đảm hoàn tiền 100% trong 14 ngày · Thanh toán chuyển khoản QR tự động xác nhận sau 1 phút.
          </p>
        </div>
      </section>

      {/* ── [10] Guarantee (Risk Reversal) ── */}
      <section id="guarantee" data-animate className={`max-w-3xl mx-auto px-5 py-8 ${animClass('guarantee')}`}>
        <div className="flex gap-5 bg-emerald-500/[0.03] border border-emerald-500/20 rounded-3xl p-6 md:p-8 items-start">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-[#3EE2A9]" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#F6F0E4] mb-2">Cam kết bảo hành hoàn phí 14 ngày</h3>
            <p className="text-xs sm:text-sm text-[#F6F0E4]/65 leading-relaxed">
              Mình không muốn nhận tiền nếu giải pháp này không giúp ích được cho shop của bạn. Bạn mua về cứ cài thử theo hướng dẫn. Nếu trong 14 ngày bạn thấy AI không thông minh như quảng cáo hoặc khó sử dụng, nhắn tin vào group Telegram hỗ trợ, mình sẽ hoàn trả đầy đủ 199.000đ ngay lập tức mà không hỏi thêm câu nào.
            </p>
          </div>
        </div>
      </section>

      {/* ── [11] For / Not For ── */}
      <section id="forwhom" data-animate className={`max-w-4xl mx-auto px-5 py-20 border-t border-white/[0.03] ${animClass('forwhom')}`}>
        <h2 className="text-3xl font-black text-center mb-10 tracking-tight">Giải pháp này dành cho ai?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-emerald-500/[0.02] border border-emerald-500/15 rounded-3xl p-8">
            <h3 className="font-black text-[#3EE2A9] mb-6 flex items-center gap-2.5 text-base">
              <CheckCircle2 className="w-5 h-5" /> Cực kỳ phù hợp nếu
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm">
              {[
                'Đang bán hàng trực tiếp qua Facebook Page (Fanpage).',
                'Muốn tự động hóa khâu trả lời các câu hỏi lặp đi lặp lại.',
                'Cần AI trực thay ngoài giờ làm việc hoặc lúc đêm muộn.',
                'Không rành về lập trình nhưng muốn tự tay cấu hình được AI.',
                'Là solopreneur hoặc chủ doanh nghiệp nhỏ tối ưu nhân sự.',
              ].map((t, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <ArrowRight className="w-4 h-4 text-[#3EE2A9] shrink-0 mt-0.5" />
                  <span className="text-[#F6F0E4]/80">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-8">
            <h3 className="font-black text-[#F6F0E4]/40 mb-6 flex items-center gap-2.5 text-base">
              <XCircle className="w-5 h-5 text-white/30" /> Không nên mua nếu
            </h3>
            <ul className="space-y-4 text-xs sm:text-sm">
              {[
                'Bạn chỉ bán qua Facebook cá nhân (AI không hỗ trợ profile).',
                'Bạn muốn setup AI cho kênh Instagram hoặc WhatsApp (tính năng đang cập nhật).',
                'Bạn muốn xây dựng các kịch bản chatbot rẽ nhánh ManyChat phức tạp.',
                'Ngành của bạn quá đặc thù và không thể mô tả bằng văn bản.',
              ].map((t, idx) => (
                <li key={idx} className="flex gap-3 items-start">
                  <ArrowRight className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                  <span className="text-[#F6F0E4]/50">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── [12] FAQ Section ── */}
      <section id="faq" data-animate className={`max-w-3xl mx-auto px-5 py-20 border-t border-white/[0.03] ${animClass('faq')}`}>
        <h2 className="text-3xl font-black text-center mb-12 tracking-tight">Giải đáp thắc mắc thường gặp</h2>
        <div className="space-y-3">
          {[
            {
              q: 'Sau khi thanh toán xong thì bao lâu nhận được tài liệu?',
              a: 'Hệ thống quét mã QR tự động hoàn toàn. Sau khi bạn chuyển khoản khoản 1 phút, hệ thống sẽ tự gửi email chứa tài khoản và mật khẩu vào khu học viên trực tuyến cho bạn.',
            },
            {
              q: 'Không rành về máy tính hay công nghệ có làm được không?',
              a: 'Hoàn toàn được. Bộ tài liệu của mình viết theo kiểu "cầm tay chỉ việc", hướng dẫn cụ thể bằng tiếng Việt và hình ảnh thực tế. Bạn chỉ cần copy mẫu mình đã soạn và dán vào đúng các ô trên Meta là xong.',
            },
            {
              q: 'Meta AI Agent này có mất phí duy trì hàng tháng không?',
              a: 'Không. Tính năng Meta AI được tích hợp sẵn miễn phí 100% bên trong Meta Business Suite của Facebook. Bạn chỉ cần trả phí 199.000đ cho gói tài liệu huấn luyện này một lần duy nhất để dùng trọn đời.',
            },
            {
              q: 'Có setup được cho Instagram và WhatsApp Business không?',
              a: 'Hiện tại tài liệu này được tối ưu và thiết kế chuyên sâu nhất cho Messenger Fanpage. Gói hướng dẫn cho Instagram DM và WhatsApp sẽ được cập nhật miễn phí cho bạn ở các phiên bản sau.',
            },
            {
              q: 'Trường hợp làm theo tài liệu nhưng AI vẫn bị kẹt thì sao?',
              a: 'Bạn sẽ được tham gia vào Group Telegram hỗ trợ có Tiểu Hà Mã (AI bot thông minh) trực 24/7 cùng với mình và các cộng sự để giải quyết mọi sự cố cho đến khi AI của bạn chạy thành công.',
            },
            {
              q: 'Nó khác gì với các chatbot như ManyChat hay Chatfuel?',
              a: 'Chatbot thông thường yêu cầu bạn vẽ sơ đồ rẽ nhánh phức tạp và khách phải nhấn nút. Còn Meta AI là xử lý ngôn ngữ tự nhiên, khách hỏi tự do như nói chuyện với người thật, tự nhiên và thân thiện hơn rất nhiều.',
            },
          ].map(({ q, a }, i) => (
            <div key={i}
              className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden transition-all duration-300">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-5 flex justify-between items-center gap-4
                           text-left cursor-pointer hover:bg-white/[0.04] transition-colors"
                aria-expanded={openFaq === i}
              >
                <span className="font-bold text-sm text-[#F6F0E4]">{q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#3EE2A9] shrink-0 transition-transform duration-300
                              ${openFaq === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-[#F6F0E4]/65 leading-relaxed
                                border-t border-white/[0.05] pt-4 bg-white/[0.01]">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── [13] Testimonials + Final CTA ── */}
      <section id="final" data-animate className={`max-w-3xl mx-auto px-5 py-20 border-t border-white/[0.03] ${animClass('final')}`}>
        
        {/* Testimonials */}
        <div className="bg-emerald-500/[0.02] border border-emerald-500/15 rounded-3xl p-8 mb-12">
          <p className="text-center text-[#3EE2A9] text-xs font-black uppercase tracking-widest mb-8">
            PHẢN HỒI THỰC TẾ TỪ CÁC SHOP ĐÃ SETUP THÀNH CÔNG
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                quote: 'Không ngờ setup đơn giản thế, copy paste đúng 30 phút là AI tự động reply khách trơn tru. Đêm qua nó tự chốt được 2 đơn quần áo lúc 2h sáng!',
                name: 'Chị Mai Lan', role: 'Chủ shop thời trang · TP.HCM',
                initials: 'ML', bg: 'bg-emerald-500/20 text-[#3EE2A9]'
              },
              {
                quote: 'Trước đây khách hỏi dồn dập trả lời không kịp cứ bị than phiền. Từ lúc bật AI Meta này lên, khách khen shop phản hồi nhanh thế, tỷ lệ chốt tăng rõ rệt.',
                name: 'Anh Quốc Minh', role: 'Spa & Salon Tóc · Hà Nội',
                initials: 'QM', bg: 'bg-amber-500/20 text-[#D4A843]'
              },
            ].map(({ quote, name, role, initials, bg }) => (
              <div key={name} className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/10 transition-colors">
                <p className="text-xs sm:text-sm text-[#F6F0E4]/70 italic mb-5 leading-relaxed">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${bg}`}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#F6F0E4]">{name}</p>
                    <p className="text-[10px] text-[#F6F0E4]/40">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
            AI trực chiến trên page của bạn tối nay?
          </h2>
          <p className="text-[#F6F0E4]/50 mb-10 leading-relaxed text-sm">
            Chỉ với 30 phút thiết lập bằng tài liệu mẫu của mình, Fanpage của bạn sẽ tự động chăm sóc và chốt đơn 24/7. Bạn yên tâm đi ngủ — đơn hàng vẫn tự động về.
          </p>
          <button
            onClick={buy}
            className="w-full bg-gradient-to-r from-[#1D9E75] to-[#15825F] hover:from-[#22B385] hover:to-[#1B9C73]
                       active:scale-[0.98] text-white font-black py-5 px-8 rounded-2xl text-lg md:text-xl
                       transition-all duration-300 shadow-2xl shadow-emerald-950/60 cursor-pointer"
          >
            Bắt Đầu Setup AI Tối Nay →
          </button>
          <p className="text-[11px] text-[#F6F0E4]/30 mt-4 leading-relaxed">
            Nhận link truy cập ngay lập tức sau khi hoàn thành thanh toán. Hỗ trợ kỹ thuật 24/7 trực tiếp qua Group Telegram.
          </p>
        </div>
      </section>

      {/* ── [8] Authority Stack ── */}
      <section id="author" data-animate className={`max-w-4xl mx-auto px-5 py-12 ${animClass('author')}`}>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-[#1D9E75] to-[#3EE2A9] rounded-2xl flex items-center justify-center font-black text-2xl text-[#050D08] shrink-0 shadow-lg">
            DH
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-extrabold text-[#F6F0E4] text-base mb-1">Dũng Hoàng · Người đóng gói giải pháp</h4>
            <p className="text-xs text-[#3EE2A9] font-medium mb-4">Solopreneur & Trực Tiếp Vận Hành Homestay, Khóa Học Tự Động Hóa · Hơn 600+ Học Viên</p>
            <p className="text-xs sm:text-sm text-[#F6F0E4]/65 leading-relaxed">
              Mình không phải chuyên gia giảng dạy lý thuyết. Bản thân mình đang một mình vận hành toàn bộ hệ thống kinh doanh và mình triệt để ứng dụng AI giải phóng sức lao động tối đa. Bộ tài liệu setup AI này là công cụ mình đang sử dụng thực tế hàng ngày, được đóng gói chỉnh chu để bạn dùng được ngay mà không mất cả tháng trời mò mẫm thử sai.
            </p>
          </div>
        </div>
      </section>

      {/* ── [14] Footer ── */}
      <footer className="border-t border-white/[0.05] mt-16 py-12 px-5 text-center text-xs text-[#F6F0E4]/30 relative z-20">
        <p className="mb-3 font-semibold">DungHoang.com · Bản quyền thuộc Dũng Hoàng</p>
        <p className="flex items-center justify-center gap-3">
          <span>
            Zalo:{' '}
            <a href="https://zalo.me/0938725413" target="_blank" rel="noopener noreferrer" className="text-[#3EE2A9] hover:underline font-medium">
              0938725413
            </a>
          </span>
          <span className="text-white/10">|</span>
          <span>
            Hỗ trợ:{' '}
            <a href="https://web.telegram.org/a/#-5493805985" target="_blank" rel="noopener noreferrer" className="text-[#3EE2A9] hover:underline font-medium">
              Group Telegram 24/7
            </a>
          </span>
        </p>
      </footer>

      {/* ── Sticky CTA Bar (Mobile & Desktop) ── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#050D08]/90 backdrop-blur-lg border-t border-white/[0.05]">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4 px-5 py-3.5">
          <div className="min-w-0">
            <p className="font-extrabold text-xs sm:text-sm text-[#F6F0E4] truncate">Setup Meta Business AI Agent</p>
            <p className="text-[#3EE2A9] text-xs font-black">199.000đ · Bảo hành 14 ngày</p>
          </div>
          <button
            onClick={buy}
            className="bg-gradient-to-r from-[#1D9E75] to-[#15825F] hover:from-[#22B385] hover:to-[#1B9C73] active:scale-[0.97]
                       text-white font-black py-2.5 px-6 rounded-xl text-xs sm:text-sm
                       whitespace-nowrap transition-all duration-300 shrink-0 cursor-pointer shadow-md"
          >
            Setup ngay →
          </button>
        </div>
      </div>

      {/* ── Zalo Float Button ── */}
      <a
        href="https://zalo.me/0938725413"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo hỗ trợ"
        className="fixed bottom-24 right-5 z-50 bg-[#0068FF] hover:bg-[#0057D9] hover:scale-110 active:scale-95
                   text-white rounded-full w-12 h-12 flex items-center justify-center
                   shadow-2xl transition-all duration-300 cursor-pointer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
        </svg>
      </a>

      <CheckoutModal
        productId={product.id}
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
      />
    </div>
  )
}
