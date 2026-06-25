'use client'

import { useState, useEffect, useRef } from 'react'
import {
  CheckCircle2, XCircle, ChevronDown, MessageCircle,
  Shield, Clock, Zap, Users, ArrowRight,
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
      { threshold: 0.1 }
    )
    document.querySelectorAll('[data-animate]').forEach(el => obsRef.current?.observe(el))
    return () => obsRef.current?.disconnect()
  }, [])

  const f = (id: string) =>
    `transition-all duration-700 ease-out ${visible[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`

  const buy = () => setShowCheckout(true)

  return (
    <div
      className="min-h-dvh bg-[#0B1E12] text-[#F6F0E4]"
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* ── [0] Announcement — B.12 Scarcity (thật) ────────────────── */}
      <div className="bg-[#1D9E75] text-[#0B1E12] text-center py-2.5 px-4 text-sm font-bold">
        Giá ra mắt 199.000đ · Sau đợt này về 399.000đ
      </div>

      {/* ── [1] Hero — B.1 SCPU + B.2 EAS ──────────────────────────── */}
      <section className="max-w-2xl mx-auto px-5 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-[#1D9E75]/15 border border-[#1D9E75]/30
                        text-[#1D9E75] text-xs font-semibold px-4 py-1.5 rounded-full mb-7 uppercase tracking-widest">
          <Zap className="w-3 h-3" />
          Meta AI Agent cho Messenger Fanpage
        </div>

        {/* B.1: Specificity (đêm, mất đơn) + Curiosity + Promise */}
        <h1 className="text-[2rem] md:text-5xl font-black leading-[1.15] mb-5 tracking-tight">
          Mỗi đêm Fanpage của bạn nhận tin nhắn.<br />
          <span className="text-[#E05C5C]">Sáng ra, khách đã mua chỗ khác rồi.</span>
        </h1>

        {/* B.2: EAS — số 600+, thời gian 30 phút, social proof */}
        <p className="text-base md:text-lg text-[#F6F0E4]/65 mb-9 leading-relaxed max-w-xl mx-auto">
          600+ chủ shop đang dùng AI Meta để tự trả lời khách 24/7 — kể cả lúc đang ngủ.
          Setup 30 phút. Không cần code. Không cần thuê thêm người.
        </p>

        {/* CTA L1 — Tò mò */}
        <button
          onClick={buy}
          className="inline-flex items-center gap-2.5 bg-[#1D9E75] hover:bg-[#18896A]
                     active:scale-[0.97] text-white font-bold py-4 px-9 rounded-2xl text-base
                     transition-all duration-200 shadow-xl shadow-[#1D9E75]/20 cursor-pointer"
        >
          Tôi Muốn AI Trả Lời Thay Mình
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-xs text-[#F6F0E4]/35 mt-3">
          Nhận file ngay sau thanh toán · Bảo đảm hoàn tiền 14 ngày
        </p>
      </section>

      {/* ── [2] Trust Bar — B.4 Authority (đặt sớm) ────────────────── */}
      <section id="trust" data-animate className={`max-w-3xl mx-auto px-5 pb-14 ${f('trust')}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { Icon: Users,         num: '600+',    label: 'chủ shop đã dùng AI skill này' },
            { Icon: Clock,         num: '30 phút', label: 'setup xong, AI bật lên liền' },
            { Icon: Zap,           num: '6 ngành', label: 'template có sẵn theo ngành' },
            { Icon: Shield,        num: '14 ngày', label: 'bảo đảm hoàn tiền toàn phần' },
          ].map(({ Icon, num, label }) => (
            <div key={label}
              className="bg-[#1D9E75]/10 border border-[#1D9E75]/20 rounded-2xl px-4 py-5 text-center">
              <Icon className="w-4 h-4 text-[#1D9E75] mx-auto mb-2 opacity-80" />
              <div className="text-xl font-black text-[#1D9E75]">{num}</div>
              <div className="text-xs text-[#F6F0E4]/50 mt-1 leading-snug">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── [3] Pain 3 Lớp — B.3 ────────────────────────────────────── */}
      <section id="pain" data-animate className={`max-w-3xl mx-auto px-5 py-14 ${f('pain')}`}>

        {/* Lớp 1: Symptom — những gì đang xảy ra */}
        <p className="text-[#F6F0E4]/40 text-xs font-bold uppercase tracking-widest text-center mb-3">
          Triệu chứng — những gì bạn thấy hàng ngày
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-center mb-10">
          Bạn có quen với mấy cảnh này không?
        </h2>

        {/* Asymmetric bento — không dùng 3 cột bằng nhau */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="md:col-span-3 bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-2xl p-6">
            <div className="w-10 h-10 bg-[#E05C5C]/15 rounded-xl flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5 text-[#E05C5C]" />
            </div>
            <h3 className="font-bold mb-2 text-base">7 giờ sáng mở app — 6 tin nhắn từ tối qua chưa ai trả lời</h3>
            <p className="text-sm text-[#F6F0E4]/55 leading-relaxed">
              Khách hỏi giá, hỏi còn hàng không, hỏi ship bao lâu. Tất cả từ đêm qua.
              Bạn thức dậy, họ đã đi rồi.
            </p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-2xl p-5">
              <div className="w-8 h-8 bg-[#E05C5C]/15 rounded-lg flex items-center justify-center mb-3">
                <XCircle className="w-4 h-4 text-[#E05C5C]" />
              </div>
              <h3 className="font-bold text-sm mb-1.5">Bật AI Meta — nó trả lời lung tung</h3>
              <p className="text-xs text-[#F6F0E4]/50 leading-relaxed">
                Chưa ai dạy nó hiểu shop của bạn bán gì.
              </p>
            </div>
            <div className="bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-2xl p-5">
              <div className="w-8 h-8 bg-[#E05C5C]/15 rounded-lg flex items-center justify-center mb-3">
                <Clock className="w-4 h-4 text-[#E05C5C]" />
              </div>
              <h3 className="font-bold text-sm mb-1.5">Tự trả lời tay — mất 2 tiếng mỗi ngày</h3>
              <p className="text-xs text-[#F6F0E4]/50 leading-relaxed">
                Cùng những câu đó, ngày nào cũng vậy.
              </p>
            </div>
          </div>
        </div>

        {/* Lớp 2: Consequence */}
        <div className="bg-[#E05C5C]/8 border border-[#E05C5C]/25 rounded-2xl p-6 mb-5">
          <p className="text-[#E05C5C] font-bold text-xs uppercase tracking-widest mb-4">
            Hậu quả — nếu không giải quyết
          </p>
          <div className="space-y-3">
            {[
              '1 đơn mất = 300–500k. Mỗi tuần mất 5–10 đơn vì reply chậm = 1.5–5tr đang chảy qua tay.',
              'Khách hỏi không được trả lời → nhớ tên shop đối thủ, không nhớ bạn. Mất khách lần đầu = mất cả vòng đời khách hàng.',
              '6 tháng nữa: đối thủ AI hóa xong, bạn vẫn đang trả lời tay. Khoảng cách ngày càng lớn.',
            ].map((text, i) => (
              <div key={i} className="flex gap-3 items-start">
                <ArrowRight className="w-4 h-4 text-[#E05C5C] shrink-0 mt-0.5" />
                <p className="text-sm text-[#F6F0E4]/70 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lớp 3: Identity */}
        <div className="bg-[#F6F0E4]/5 border-l-4 border-[#E05C5C]/40 rounded-r-2xl pl-5 py-5 pr-5">
          <p className="text-[#F6F0E4]/35 text-xs font-bold uppercase tracking-widest mb-2">
            Điều nặng hơn, nằm sâu hơn
          </p>
          <p className="text-base text-[#F6F0E4]/75 leading-relaxed italic">
            "Shop mình nhìn không chuyên nghiệp bằng người ta. Khách nhắn mà không ai trả lời — họ nghĩ gì về mình?"
          </p>
          <p className="text-sm text-[#F6F0E4]/50 mt-3 leading-relaxed">
            Bạn đang bán hàng rất chăm chỉ. Nhưng khách nhìn vào Fanpage — thấy tin nhắn trả lời chậm — họ không biết điều đó. Họ chỉ thấy shop này không đáng tin.
          </p>
        </div>

        {/* CTA L2 — Đang đồng cảm */}
        <div className="text-center mt-10">
          <button
            onClick={buy}
            className="inline-flex items-center gap-2 bg-[#1D9E75]/15 hover:bg-[#1D9E75]/25
                       border border-[#1D9E75]/40 text-[#1D9E75] font-bold py-3.5 px-8
                       rounded-2xl text-sm transition-all duration-200 cursor-pointer"
          >
            Tôi Muốn Sửa Lại AI Của Mình Ngay
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── [4] Story — B.5 A→G ─────────────────────────────────────── */}
      <section id="story" data-animate className={`max-w-3xl mx-auto px-5 py-12 ${f('story')}`}>
        <div className="bg-gradient-to-br from-[#0F2A1A] to-[#162D1F] border border-[#1D9E75]/20 rounded-3xl p-8 md:p-10">
          <p className="text-[#1D9E75] text-xs font-bold uppercase tracking-widest mb-6">
            Câu chuyện từ mình · Dũng Hoàng
          </p>

          <p className="text-lg font-bold text-[#F6F0E4] mb-4 leading-snug">
            Mình muốn có một "nhân viên" trả lời Fanpage 24/7 mà không phải trả lương.
          </p>
          <p className="text-sm text-[#F6F0E4]/65 mb-4 leading-relaxed">
            Mình vận hành mọi thứ một mình — homestay, khoá học, nội dung. Không có người phụ trực page. Tối tắt máy thì Fanpage như bỏ hoang.
          </p>
          <p className="text-sm text-[#F6F0E4]/65 mb-5 leading-relaxed">
            Mình thử bật AI có sẵn của Meta. Điền vài dòng vào ô hướng dẫn. AI nó trả lời kiểu robot cổ điển: khách hỏi giá, nó nói "tôi không có thông tin đó". Mình tắt đi, quay lại trả lời tay.
          </p>
          <div className="border-l-2 border-[#1D9E75]/50 pl-5 mb-5">
            <p className="text-sm text-[#F6F0E4]/75 leading-relaxed">
              Mình ngồi mổ xẻ: Meta cần loại thông tin gì để AI nói chuyện tử tế? Không phải thêm app, không phải thêm phần mềm — chỉ là điền đúng thông tin vào đúng ô. Mình test với từng ngành, ghi lại cái gì hiệu quả.
            </p>
          </div>
          <p className="text-sm text-[#F6F0E4]/65 mb-6 leading-relaxed">
            Mất khoảng 1 tháng chỉnh sửa và test. Sau nhiều lần tinh chỉnh, mình ra được công thức — và AI bắt đầu nói chuyện tử tế.
          </p>

          {/* F: Kết quả — 3 số cụ thể */}
          <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/20 rounded-xl p-5 mb-5">
            <p className="text-[#1D9E75] font-bold text-sm mb-3">Kết quả sau khi setup đúng:</p>
            <div className="space-y-2">
              {[
                'AI trả lời được ~80% câu hỏi khách hay gặp nhất',
                'Page phản hồi 24/7 — kể cả lúc 2 giờ sáng',
                'Mình tiết kiệm được 1–2 tiếng mỗi ngày không phải trả lời tay',
              ].map((t, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 text-[#1D9E75] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#F6F0E4]/80">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-[#1D9E75] font-semibold leading-relaxed">
            Giờ mình đóng gói lại thành file. Bạn chỉ điền thông tin shop vào là xong.
            Không cần mò 1 tháng như mình. Không cần thử sai.
          </p>
        </div>
      </section>

      {/* ── [5] How It Works — B.8 Clarity ─────────────────────────── */}
      <section id="how" data-animate className={`max-w-3xl mx-auto px-5 py-12 ${f('how')}`}>
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">3 bước · 30 phút · AI bật lên</h2>
        <p className="text-center text-[#F6F0E4]/45 mb-10 text-sm">Không cần biết code. Không cần cài thêm phần mềm.</p>

        <div className="space-y-3">
          {[
            {
              n: '01', time: '~10 phút',
              title: 'Điền thông tin shop vào form có sẵn',
              desc: 'Tên shop, ngành hàng, sản phẩm chính, câu hỏi khách hay gặp. Mình có form hướng dẫn từng ô.',
            },
            {
              n: '02', time: '~5 phút',
              title: 'Nhận 4 file tài liệu đã tạo sẵn cho ngành của bạn',
              desc: 'Business Info · Custom Instructions · Avoid Topics · Test Cases — viết sẵn theo ngành, copy-paste là xong.',
            },
            {
              n: '03', time: '~15 phút',
              title: 'Paste vào Meta, chạy 20 câu test, bật AI lên',
              desc: 'Mở Meta Business Suite, dán vào đúng ô, bấm lưu. Chạy 20 câu test để chắc AI nói đúng. Sau đó bật cho khách.',
            },
          ].map(({ n, time, title, desc }) => (
            <div key={n} className="flex gap-4 bg-[#F6F0E4]/4 border border-[#F6F0E4]/8 rounded-2xl p-5 items-start">
              <div className="shrink-0 text-center">
                <div className="w-11 h-11 bg-[#1D9E75] rounded-xl flex items-center justify-center
                                text-white font-black text-base">{n}</div>
                <span className="text-[#1D9E75] text-[11px] font-medium mt-1 block whitespace-nowrap">{time}</span>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1.5 leading-snug">{title}</h3>
                <p className="text-xs text-[#F6F0E4]/55 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── [7] Emotion — B.7 Future Pacing + Sensory ───────────────── */}
      <section id="emotion" data-animate className={`max-w-3xl mx-auto px-5 py-12 ${f('emotion')}`}>
        <div className="bg-gradient-to-br from-[#0D2B1A] via-[#122A1C] to-[#0B1E12]
                        border border-[#1D9E75]/25 rounded-3xl p-8 md:p-10">
          <p className="text-[#1D9E75] text-xs font-bold uppercase tracking-widest mb-7">
            Tưởng tượng — sau khi setup xong hôm nay
          </p>

          <div className="space-y-6">
            {[
              {
                time: '6:30 sáng thứ Hai',
                text: 'Bạn mở điện thoại. Fanpage có 9 tin nhắn từ tối qua. AI đã trả lời hết — đúng sản phẩm, đúng giá, đúng giọng shop của bạn. 3 người đã để lại số để chốt đơn.',
              },
              {
                time: '11:30 đêm hôm sau',
                text: 'Khách nhắn "size M còn không?". Bạn đang ngủ. AI trả lời trong 30 giây. Khách cảm ơn và để lại thông tin đặt hàng.',
              },
              {
                time: 'Sáng nào cũng vậy',
                text: 'Bạn pha cà phê. Mở app. Không còn lo "ai trả lời đống tin nhắn tối qua". AI đã lo xong. Bạn chỉ xử lý khách đã sẵn sàng chốt đơn.',
              },
            ].map(({ time, text }) => (
              <div key={time} className="flex gap-4 items-start">
                <div className="w-2 h-2 bg-[#1D9E75] rounded-full shrink-0 mt-2" />
                <div>
                  <p className="font-bold text-sm text-[#1D9E75] mb-1">{time}</p>
                  <p className="text-sm text-[#F6F0E4]/65 leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-7 border-t border-[#1D9E75]/15 text-center">
            <p className="text-[#F6F0E4]/50 text-sm mb-5">
              30 phút setup hôm nay. AI làm việc cho bạn từ tối nay — mãi về sau.
            </p>
            {/* CTA L3 — Đang tin tưởng */}
            <button
              onClick={buy}
              className="inline-flex items-center gap-2 bg-[#1D9E75] hover:bg-[#18896A]
                         active:scale-[0.97] text-white font-bold py-3.5 px-8 rounded-2xl text-sm
                         transition-all duration-200 shadow-lg cursor-pointer"
            >
              Cho Tôi File Setup Ngay
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── [6] Deliverables — B.6 FAB ──────────────────────────────── */}
      <section id="deliver" data-animate className={`max-w-3xl mx-auto px-5 py-12 ${f('deliver')}`}>
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">Bạn nhận được gì</h2>
        <p className="text-center text-[#F6F0E4]/45 text-sm mb-10">
          4 tài liệu — mỗi cái giải quyết 1 vấn đề cụ thể của AI Meta
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-5">
          {[
            {
              n: '01', name: 'Business Info',
              what: 'Giới thiệu đầy đủ về shop của bạn',
              why:  'AI hiểu bạn bán gì, phục vụ ai, cam kết gì — trả lời đúng ngữ cảnh, không nói linh tinh nữa.',
            },
            {
              n: '02', name: 'Custom Instructions',
              what: 'Hướng dẫn chi tiết về cách AI giao tiếp',
              why:  'AI nói đúng giọng thương hiệu của bạn — thân thiện hay chuyên nghiệp, tùy bạn chọn.',
            },
            {
              n: '03', name: 'Avoid Topics',
              what: 'Danh sách chủ đề AI không nên đề cập',
              why:  'Tránh AI tự trả lời câu nhạy cảm (giảm giá, so sánh đối thủ) trước khi bạn duyệt.',
            },
            {
              n: '04', name: 'Test Cases · 20+ câu hỏi mẫu',
              what: 'Bộ câu hỏi kiểm tra AI trước khi bật lên',
              why:  'Chạy hết 20 câu này → yên tâm bật cho khách. Biết chắc AI nói đúng, không phải sau.',
            },
          ].map(({ n, name, what, why }) => (
            <div key={n} className="bg-[#F6F0E4]/4 border border-[#1D9E75]/20 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 bg-[#1D9E75]/20 text-[#1D9E75] rounded-lg
                                 flex items-center justify-center text-xs font-black">{n}</span>
                <h3 className="font-bold text-sm text-[#1D9E75]">{name}</h3>
              </div>
              <p className="text-xs text-[#F6F0E4]/45 mb-2">{what}</p>
              <p className="text-sm text-[#F6F0E4]/75 leading-relaxed">{why}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/20 rounded-2xl p-5">
          <p className="text-sm font-semibold text-[#F6F0E4]/75 mb-3">Template có sẵn cho 6 ngành:</p>
          <div className="flex flex-wrap gap-2">
            {['Thời trang', 'Skincare / Mỹ phẩm', 'Mẹ và Bé', 'Thực phẩm & Đồ uống', 'Nội thất', 'Spa / Làm đẹp'].map(c => (
              <span key={c}
                className="bg-[#1D9E75]/15 text-[#1D9E75] text-xs px-3 py-1.5 rounded-full font-medium border border-[#1D9E75]/20">
                {c}
              </span>
            ))}
          </div>
          <p className="text-xs text-[#F6F0E4]/35 mt-3">
            Ngành khác? Nhắn mình trước khi mua để kiểm tra. Không hỗ trợ được thì mình không nhận tiền.
          </p>
        </div>
      </section>

      {/* ── [9] Value Stack + Pricing — B.9 + B.13 ─────────────────── */}
      <section id="price" data-animate className={`max-w-2xl mx-auto px-5 py-14 ${f('price')}`}>
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">Giá trị bạn nhận được</h2>
        <p className="text-center text-[#F6F0E4]/45 text-sm mb-10">
          So sánh với chi phí bạn đang bỏ ra mỗi tháng
        </p>

        {/* Comparison table */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#E05C5C]/8 border border-[#E05C5C]/20 rounded-2xl p-5">
            <p className="text-[#E05C5C] font-bold text-sm mb-4">Không có AI setup đúng</p>
            <ul className="space-y-2.5">
              {[
                'Tự trả lời 2 tiếng mỗi ngày',
                'Mất 5–10 đơn mỗi tuần vì reply chậm',
                'Thuê nhân sự ~2.000.000đ/tháng',
                'Vẫn bỏ lỡ đơn ngoài giờ',
              ].map(t => (
                <li key={t} className="flex gap-2 items-start text-xs text-[#F6F0E4]/55">
                  <XCircle className="w-3.5 h-3.5 text-[#E05C5C] shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/25 rounded-2xl p-5">
            <p className="text-[#1D9E75] font-bold text-sm mb-4">Sau khi setup AI đúng</p>
            <ul className="space-y-2.5">
              {[
                'AI trả lời 24/7 kể cả khi ngủ',
                'Bắt được đơn lúc 11 giờ đêm',
                'Không cần thuê thêm người',
                'Một lần setup, dùng mãi mãi',
              ].map(t => (
                <li key={t} className="flex gap-2 items-start text-xs text-[#F6F0E4]/75">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1D9E75] shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Value Stack */}
        <div className="bg-[#F6F0E4]/4 border border-[#F6F0E4]/8 rounded-2xl overflow-hidden mb-6">
          <div className="bg-[#F6F0E4]/6 px-5 py-3 flex justify-between text-xs font-bold
                          text-[#F6F0E4]/45 uppercase tracking-wider">
            <span>Bạn nhận được</span><span>Trị giá</span>
          </div>
          {[
            ['Business Info theo ngành của bạn',          '200.000đ'],
            ['Custom Instructions chi tiết',               '300.000đ'],
            ['Avoid Topics chuyên biệt',                   '150.000đ'],
            ['Test Cases 20+ câu hỏi mẫu',                 '150.000đ'],
            ['Hướng dẫn paste từng bước (ảnh thực tế)',    '100.000đ'],
            ['Hỗ trợ qua Telegram nếu kẹt',               '200.000đ'],
          ].map(([label, val]) => (
            <div key={label}
              className="border-t border-[#F6F0E4]/6 px-5 py-3 flex justify-between text-sm">
              <span className="text-[#F6F0E4]/75">{label}</span>
              <span className="text-[#F6F0E4]/35 line-through shrink-0 ml-4">{val}</span>
            </div>
          ))}
          <div className="border-t-2 border-[#1D9E75]/30 bg-[#1D9E75]/5 px-5 py-4
                          flex justify-between font-bold">
            <span>Tổng giá trị</span>
            <span className="text-[#F6F0E4]/35 line-through">1.100.000đ</span>
          </div>
        </div>

        {/* Price card */}
        <div className="bg-[#1D9E75]/10 border-2 border-[#1D9E75] rounded-2xl p-8 text-center">
          <p className="text-[#F6F0E4]/45 text-sm mb-1">Bạn trả hôm nay</p>
          <div className="text-5xl font-black text-[#1D9E75] mb-1">199.000đ</div>
          <p className="text-[#F6F0E4]/35 text-xs mb-7">
            = 1 buổi cà phê với nhân viên. AI thì làm việc mãi mãi.
          </p>

          {/* CTA L4 — Sẵn sàng */}
          <button
            onClick={buy}
            className="w-full bg-[#1D9E75] hover:bg-[#18896A] active:scale-[0.98]
                       text-white font-black py-4 px-8 rounded-2xl text-lg
                       transition-all duration-200 shadow-2xl cursor-pointer"
          >
            Tôi Đăng Ký Setup AI — 199.000đ →
          </button>
          <p className="text-xs text-[#F6F0E4]/30 mt-3">
            Nhận file ngay sau thanh toán QR · Bảo đảm hoàn tiền 14 ngày
          </p>
        </div>
      </section>

      {/* ── [10] Guarantee — B.10 Risk Reversal ────────────────────── */}
      <section id="guarantee" data-animate className={`max-w-2xl mx-auto px-5 py-8 ${f('guarantee')}`}>
        <div className="flex gap-5 bg-[#1D9E75]/8 border border-[#1D9E75]/20 rounded-2xl p-6 items-start">
          <Shield className="w-10 h-10 text-[#1D9E75] shrink-0" />
          <div>
            <h3 className="font-bold text-base mb-2">Bảo đảm 14 ngày, không hỏi lý do</h3>
            <p className="text-sm text-[#F6F0E4]/65 leading-relaxed">
              Bạn mua về, làm theo hướng dẫn. Nếu AI vẫn không trả lời được đúng như mình hứa — hoặc bạn thấy không phù hợp vì bất kỳ lý do gì — nhắn mình qua Telegram trong vòng 14 ngày. Mình hoàn lại đủ 199.000đ. Không cần giải thích.
            </p>
          </div>
        </div>
      </section>

      {/* ── [11] For / Not For — B.8 Clarity ───────────────────────── */}
      <section id="forwhom" data-animate className={`max-w-3xl mx-auto px-5 py-12 ${f('forwhom')}`}>
        <h2 className="text-2xl font-black text-center mb-8">Phù hợp với bạn chưa?</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-[#1D9E75]/8 border border-[#1D9E75]/25 rounded-2xl p-6">
            <h3 className="font-bold text-[#1D9E75] mb-4 flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4" /> Đúng dành cho bạn nếu
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                'Đang bán hàng qua Facebook Page (Fanpage)',
                'Muốn AI tự trả lời khách khi bạn không online',
                'Đã bật AI Meta nhưng nó nói linh tinh hoặc không trả lời',
                'Không biết kỹ thuật nhưng muốn AI hoạt động đúng',
                'Chủ shop nhỏ hoặc solopreneur tự quản lý page',
              ].map(t => (
                <li key={t} className="flex gap-2.5 items-start">
                  <ArrowRight className="w-3.5 h-3.5 text-[#1D9E75] shrink-0 mt-0.5" />
                  <span className="text-[#F6F0E4]/75">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#F6F0E4]/4 border border-[#F6F0E4]/8 rounded-2xl p-6">
            <h3 className="font-bold text-[#F6F0E4]/40 mb-4 flex items-center gap-2 text-sm">
              <XCircle className="w-4 h-4" /> Chưa phù hợp nếu
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                'Bạn không có Facebook Fanpage (chỉ dùng profile cá nhân)',
                'Bạn muốn setup AI cho Instagram DM hoặc WhatsApp (tính năng chưa hỗ trợ)',
                'Bạn muốn chatbot phức tạp nhiều flow rẽ nhánh (cần ManyChat hoặc Kommo)',
                'Ngành của bạn không có trong 6 ngành — nhắn mình kiểm tra trước',
              ].map(t => (
                <li key={t} className="flex gap-2.5 items-start">
                  <ArrowRight className="w-3.5 h-3.5 text-[#F6F0E4]/25 shrink-0 mt-0.5" />
                  <span className="text-[#F6F0E4]/45">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── [12] FAQ — B.10 A.R.E.B ─────────────────────────────────── */}
      <section id="faq" data-animate className={`max-w-2xl mx-auto px-5 py-12 ${f('faq')}`}>
        <h2 className="text-2xl font-black text-center mb-8">Câu hỏi hay gặp</h2>
        <div className="space-y-2">
          {[
            {
              q: 'Sau khi mua, mình nhận file trong bao lâu?',
              a: 'Hệ thống gửi email tự động sau khi QR xác nhận — thường trong vòng 5 phút. Email có link vào khu học với hướng dẫn từng bước, ảnh chụp màn hình thực tế.',
            },
            {
              q: 'Mình không rành kỹ thuật, có làm được không?',
              a: 'Được. Bạn chỉ cần copy và paste. File hướng dẫn có ảnh thực tế từng bước. Kẹt bước nào thì nhắn Telegram mình — mình hỗ trợ trong ngày.',
            },
            {
              q: 'AI Meta này có tính phí hàng tháng không?',
              a: 'Không. Tính năng AI của Meta Business Suite miễn phí hoàn toàn. Bạn chỉ trả 199k cho file cấu hình này — một lần duy nhất, dùng mãi.',
            },
            {
              q: 'AI này có setup được cho Instagram DM hoặc WhatsApp không?',
              a: 'Hiện tại file này chỉ dành cho Messenger Fanpage. Instagram DM và WhatsApp Business cần cấu hình khác — mình chưa có file cho 2 kênh đó. Sẽ cập nhật trong đợt sau.',
            },
            {
              q: 'Ngành của mình không có trong 6 ngành thì sao?',
              a: 'Nhắn mình qua Telegram trước khi mua. Mình kiểm tra xem có hỗ trợ được không. Không hỗ trợ được thì mình không nhận tiền — đơn giản vậy thôi.',
            },
            {
              q: 'Mua rồi dùng mãi được không hay cần mua lại?',
              a: 'Dùng mãi. File là tài liệu tĩnh, bạn giữ và dùng lâu dài. Khi Meta cập nhật tính năng mới, mình gửi file cập nhật qua email — miễn phí cho người đã mua.',
            },
            {
              q: 'AI Meta khác chatbot ManyChat, Kommo như thế nào?',
              a: 'AI Meta là tính năng có sẵn của Facebook, không cần thêm phần mềm. Không có flow rẽ nhánh phức tạp — nhưng đủ để trả lời câu hỏi thông thường 24/7. Phù hợp cho shop nhỏ muốn AI nhanh, không muốn học chatbot phức tạp.',
            },
          ].map(({ q, a }, i) => (
            <div key={i}
              className="bg-[#F6F0E4]/4 border border-[#F6F0E4]/8 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-4 flex justify-between items-center gap-4
                           text-left cursor-pointer hover:bg-[#F6F0E4]/5 transition-colors"
                aria-expanded={openFaq === i}
              >
                <span className="font-semibold text-sm">{q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#1D9E75] shrink-0 transition-transform duration-200
                              ${openFaq === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-sm text-[#F6F0E4]/60 leading-relaxed
                                border-t border-[#F6F0E4]/8 pt-4">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── [13] Testimonial placeholder + Final CTA — B.15 + B.16 L5 */}
      <section id="final" data-animate className={`max-w-2xl mx-auto px-5 py-12 ${f('final')}`}>

        {/* B.15 Testimonial — SÁT CTA */}
        <div className="bg-[#1D9E75]/8 border border-[#1D9E75]/20 rounded-2xl p-6 mb-8">
          <p className="text-[#1D9E75] text-xs font-bold uppercase tracking-widest mb-5">
            Người đã dùng nói gì
          </p>
          <div className="space-y-4">
            {[
              {
                quote: 'Setup xong buổi sáng, chiều AI đã tự trả lời khách. Mình không tin là nhanh vậy.',
                name:  'Chị Lan', role: 'Shop thời trang · TP.HCM',
              },
              {
                quote: 'Trước mình mất 2 tiếng mỗi ngày trả lời tin nhắn. Giờ AI làm hết, mình chỉ chốt đơn.',
                name:  'Anh Minh', role: 'Spa làm đẹp · Hà Nội',
              },
            ].map(({ quote, name, role }) => (
              <div key={name} className="bg-[#F6F0E4]/5 rounded-xl p-5">
                <p className="text-sm text-[#F6F0E4]/75 italic mb-3 leading-relaxed">"{quote}"</p>
                <p className="text-xs font-semibold text-[#F6F0E4]/45">{name} · {role}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#F6F0E4]/25 text-center mt-4">
            [CẦN BỔ SUNG testimonial thật từ học viên]
          </p>
        </div>

        {/* B.16 CTA L5 — Last push */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            Fanpage của bạn có thể trả lời khách từ tối nay.
          </h2>
          <p className="text-[#F6F0E4]/50 mb-8 leading-relaxed text-sm max-w-md mx-auto">
            30 phút setup. AI làm việc 24/7 từ đó về sau.
            Bạn ngủ yên — khách vẫn được chăm sóc.
          </p>
          <button
            onClick={buy}
            className="w-full bg-[#1D9E75] hover:bg-[#18896A] active:scale-[0.98]
                       text-white font-black py-5 px-8 rounded-2xl text-xl
                       transition-all duration-200 shadow-2xl shadow-[#1D9E75]/20 cursor-pointer"
          >
            Setup Hôm Nay, AI Làm Việc Từ Tối Nay →
          </button>
          <p className="text-xs text-[#F6F0E4]/30 mt-4">
            Bảo đảm hoàn tiền 14 ngày · Nhận file ngay sau thanh toán · Hỗ trợ qua Telegram
          </p>
        </div>
      </section>

      {/* ── [8] Authority — B.4 ─────────────────────────────────────── */}
      <section id="author" data-animate className={`max-w-3xl mx-auto px-5 py-10 ${f('author')}`}>
        <div className="flex flex-col md:flex-row gap-5 items-start bg-[#F6F0E4]/4
                        border border-[#F6F0E4]/8 rounded-2xl p-6">
          <div className="w-14 h-14 bg-[#0D2B1A] border-2 border-[#1D9E75]/30 rounded-2xl
                          flex items-center justify-center font-black text-xl text-[#F6F0E4] shrink-0">DH</div>
          <div>
            <p className="font-bold text-[#F6F0E4] text-sm">Dũng Hoàng · người tạo ra file này</p>
            <p className="text-xs text-[#F6F0E4]/35 mb-3">Solopreneur · DungHoang.com · 600+ học viên AI</p>
            <p className="text-sm text-[#F6F0E4]/60 leading-relaxed">
              Mình không phải chuyên gia AI hay giảng viên. Mình đang vận hành homestay và DungHoang.com một mình — và đang dùng AI để làm phần lớn những việc mà trước đây cần cả đội. File này là thứ mình đang dùng thật, đóng gói lại để bạn không mất thời gian mò như mình.
            </p>
          </div>
        </div>
      </section>

      {/* ── [14] Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-[#F6F0E4]/8 mt-8 py-8 px-5 text-center text-xs text-[#F6F0E4]/25">
        <p className="mb-2">DungHoang.com · Dũng Hoàng</p>
        <p>
          Zalo:{' '}
          <a href="https://zalo.me/0938725413" className="hover:text-[#F6F0E4]/55 transition-colors">
            0938725413
          </a>
          {' · '}Telegram:{' '}
          <a href="https://t.me/KentHoang" className="hover:text-[#F6F0E4]/55 transition-colors">
            @KentHoang
          </a>
        </p>
      </footer>

      {/* ── Sticky CTA Bar ───────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B1E12]/96
                      backdrop-blur-md border-t border-[#F6F0E4]/8">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <p className="font-bold text-sm text-[#F6F0E4] truncate">Meta AI Agent · Messenger Fanpage</p>
            <p className="text-[#1D9E75] text-xs">199.000đ · bảo đảm 14 ngày</p>
          </div>
          <button
            onClick={buy}
            className="bg-[#1D9E75] hover:bg-[#18896A] active:scale-[0.97]
                       text-white font-bold py-2.5 px-6 rounded-xl text-sm
                       whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer"
          >
            Setup ngay →
          </button>
        </div>
      </div>

      {/* ── Zalo Float ───────────────────────────────────────────────── */}
      <a
        href="https://zalo.me/0938725413"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo hỗ trợ"
        className="fixed bottom-20 right-4 z-50 bg-[#0068FF] hover:bg-[#0057D9]
                   text-white rounded-full w-12 h-12 flex items-center justify-center
                   shadow-xl transition-all duration-200 hover:scale-110 cursor-pointer"
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
