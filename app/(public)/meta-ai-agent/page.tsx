'use client'

import { useState, useEffect, useRef } from 'react'
import { PRODUCTS } from '@/lib/products'
import CheckoutModal from '@/components/checkout/CheckoutModal'

const product = PRODUCTS['meta-ai-agent']

export default function MetaAIAgentPage() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  const fadeUp = (id: string) =>
    `transition-all duration-700 ${isVisible[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`

  return (
    <div className="min-h-screen bg-[#0D2B1A] text-[#F6F0E4] font-sans" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Announcement bar */}
      <div className="bg-[#1D9E75] text-[#0D2B1A] text-center py-2 px-4 text-sm font-semibold">
        Chỉ còn <strong>47 slot</strong> với giá 199.000đ — tăng lên 2199.000đ sau khi hết đợt này
      </div>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-4 pt-12 pb-8 text-center">
        <div className="inline-block bg-[#1D9E75]/20 border border-[#1D9E75]/40 text-[#1D9E75] text-xs font-semibold px-3 py-1 rounded-full mb-5 uppercase tracking-wider">
          Setup Meta Business AI
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
          Khách nhắn lúc 11 giờ đêm.<br />
          <span className="text-[#1D9E75]">AI của bạn trả lời ngay.</span><br />
          Còn bạn thì đang ngủ.
        </h1>

        <p className="text-lg text-[#F6F0E4]/80 mb-8 leading-relaxed">
          Mình sẽ setup sẵn toàn bộ câu trả lời thông minh cho AI Meta Business Suite của bạn.
          Đúng giọng thương hiệu. Đúng ngành. Trả lời đúng câu khách hay hỏi nhất.
          <br />
          <span className="font-semibold text-[#F6F0E4]">Bạn không cần biết code. Không cần AI phức tạp.</span>
        </p>

        <button
          onClick={() => setShowCheckout(true)}
          className="bg-[#1D9E75] hover:bg-[#178a65] text-white font-bold py-4 px-10 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Tôi muốn setup ngay — 199.000đ →
        </button>

        <p className="text-sm text-[#F6F0E4]/50 mt-3">Nhận file ngay sau khi thanh toán. Bảo đảm hoàn tiền 7 ngày.</p>
      </section>

      {/* Trust bar */}
      <section
        id="trust"
        data-animate
        className={`max-w-3xl mx-auto px-4 py-6 ${fadeUp('trust')}`}
      >
        <div className="flex flex-wrap justify-center gap-6 text-center">
          {[
            { num: '600+', label: 'học viên đã dùng skill này' },
            { num: '6', label: 'ngành hàng hỗ trợ sẵn' },
            { num: '4', label: 'tài liệu đầy đủ, copy-paste ngay' },
            { num: '199k', label: 'giá chỉ bằng 1 buổi cà phê' },
          ].map((item) => (
            <div key={item.label} className="bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-xl px-6 py-4 min-w-[140px]">
              <div className="text-2xl font-extrabold text-[#1D9E75]">{item.num}</div>
              <div className="text-xs text-[#F6F0E4]/60 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pain section */}
      <section
        id="pain"
        data-animate
        className={`max-w-3xl mx-auto px-4 py-12 ${fadeUp('pain')}`}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          Bạn có tính năng AI trong Meta rồi.<br />
          <span className="text-[#E74C3C]">Nhưng nó đang nói linh tinh.</span>
        </h2>
        <p className="text-center text-[#F6F0E4]/60 mb-8">Không phải lỗi của bạn. Là vì chưa ai dạy nó cách nói chuyện đúng.</p>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: '😤',
              title: 'AI trả lời sai hoặc không liên quan',
              desc: 'Khách hỏi về sản phẩm thì AI nói chuyện lung tung. Hoặc tệ hơn, nó im lặng hoặc báo lỗi.',
            },
            {
              icon: '😶',
              title: 'Không biết điền gì vào ô "Hướng dẫn" của Meta',
              desc: 'Mở Meta Business Suite ra, thấy ô trống hoàng, không biết viết gì để AI hiểu mình bán gì.',
            },
            {
              icon: '😓',
              title: 'Khách nhắn giờ bạn không online',
              desc: 'Tối khách hỏi, sáng mai bạn mới trả lời. Lúc đó họ đã mua chỗ khác rồi.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-2xl p-6">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold mb-2 text-base">{item.title}</h3>
              <p className="text-sm text-[#F6F0E4]/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solution bridge */}
      <section
        id="solution"
        data-animate
        className={`max-w-3xl mx-auto px-4 py-12 ${fadeUp('solution')}`}
      >
        <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/30 rounded-2xl p-8">
          <p className="text-[#F6F0E4]/70 mb-4 text-sm">Câu chuyện từ mình...</p>
          <p className="text-lg leading-relaxed mb-4">
            Khoảng 6 tháng trước mình mở tính năng AI của Meta ra thử. Điền vài dòng
            linh tinh vào ô hướng dẫn. AI nó trả lời kiểu... robot. Khách hỏi giá thì
            nó nói "tôi không có thông tin đó". Mình tắt đi dùng lại tay.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            Sau đó mình ngồi nghiên cứu xem Meta cần gì để AI nói chuyện được tử tế.
            Mình viết thử, test đi test lại với từng ngành hàng. Mất cả tháng mới ra được
            công thức chuẩn.
          </p>
          <p className="text-lg leading-relaxed font-semibold text-[#1D9E75]">
            Bây giờ mình đóng gói lại thành file, bạn chỉ cần điền thông tin shop của mình
            vào là xong. Không cần hiểu kỹ thuật. Không cần thử sai.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section
        id="howitworks"
        data-animate
        className={`max-w-3xl mx-auto px-4 py-12 ${fadeUp('howitworks')}`}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Cách dùng — 3 bước, 30 phút</h2>
        <p className="text-center text-[#F6F0E4]/60 mb-8">Không cần biết code. Không cần học thêm gì.</p>

        <div className="space-y-4">
          {[
            {
              step: '01',
              title: 'Điền thông tin shop của bạn vào form',
              desc: 'Tên shop, ngành hàng, sản phẩm chính, các câu hỏi khách hay hỏi. Mình có form hướng dẫn sẵn.',
            },
            {
              step: '02',
              title: 'Copy nội dung đã được tạo sẵn',
              desc: 'File bạn nhận được đã có 4 phần: Business Info, Custom Instructions, Avoid Topics, Test Cases — phù hợp đúng ngành của bạn.',
            },
            {
              step: '03',
              title: 'Dán vào Meta Business Suite và bật AI lên',
              desc: 'Mở Meta Business Suite, paste vào đúng ô, lưu lại. AI của bạn bắt đầu nói chuyện đúng giọng từ đây.',
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-5 bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-2xl p-6">
              <div className="text-3xl font-extrabold text-[#1D9E75]/40 shrink-0 w-12">{item.step}</div>
              <div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-[#F6F0E4]/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables */}
      <section
        id="deliverables"
        data-animate
        className={`max-w-3xl mx-auto px-4 py-12 ${fadeUp('deliverables')}`}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Bạn nhận được 4 tài liệu</h2>
        <p className="text-center text-[#F6F0E4]/60 mb-8">Mỗi tài liệu giải quyết một vấn đề cụ thể của AI Meta</p>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              icon: '📋',
              title: 'Business Info',
              desc: 'Giới thiệu đúng và đủ về shop của bạn để AI hiểu bạn bán gì, phục vụ ai, cam kết gì.',
            },
            {
              icon: '🧠',
              title: 'Custom Instructions',
              desc: 'Câu lệnh chi tiết để AI trả lời đúng phong cách, đúng ngành, đúng giọng thương hiệu của bạn.',
            },
            {
              icon: '🚫',
              title: 'Avoid Certain Topics',
              desc: 'Danh sách các chủ đề AI không nên đề cập. Tránh để AI tự trả lời những câu nhạy cảm hoặc sai lệch.',
            },
            {
              icon: '✅',
              title: 'Test Cases',
              desc: '20+ câu hỏi mẫu để bạn test AI trước khi bật lên. Chắc chắn AI hoạt động đúng rồi mới cho khách dùng.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-[#F6F0E4]/5 border border-[#1D9E75]/30 rounded-2xl p-6">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-bold mb-2 text-[#1D9E75]">{item.title}</h3>
              <p className="text-sm text-[#F6F0E4]/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-2xl p-5">
          <p className="text-sm text-[#F6F0E4]/70 mb-2 font-semibold">Hỗ trợ 6 ngành hàng phổ biến:</p>
          <div className="flex flex-wrap gap-2">
            {['Thời trang', 'Skincare / Mỹ phẩm', 'Mẹ và Bé', 'Thực phẩm & Đồ uống', 'Nội thất', 'Spa / Làm đẹp'].map((cat) => (
              <span key={cat} className="bg-[#1D9E75]/20 text-[#1D9E75] text-xs px-3 py-1 rounded-full font-medium">{cat}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Value stack + pricing */}
      <section
        id="pricing"
        data-animate
        className={`max-w-2xl mx-auto px-4 py-12 ${fadeUp('pricing')}`}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Giá trị bạn nhận được</h2>

        <div className="bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-2xl overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F6F0E4]/10">
                <th className="text-left py-3 px-5 font-semibold">Bạn nhận được</th>
                <th className="text-right py-3 px-5 font-semibold text-[#F6F0E4]/50 line-through">Trị giá thật</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Business Info đúng ngành của bạn', '200.000đ'],
                ['Custom Instructions chi tiết', '300.000đ'],
                ['Avoid Topics chuyên biệt', '150.000đ'],
                ['Test Cases 20+ câu hỏi mẫu', '150.000đ'],
                ['Hướng dẫn paste vào Meta từng bước', '100.000đ'],
                ['Hỗ trợ qua Telegram nếu kẹt', '200.000đ'],
              ].map(([label, value]) => (
                <tr key={label} className="border-t border-[#F6F0E4]/10">
                  <td className="py-3 px-5">{label}</td>
                  <td className="py-3 px-5 text-right text-[#F6F0E4]/40">{value}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-[#1D9E75]/40 bg-[#1D9E75]/5">
                <td className="py-4 px-5 font-bold text-base">Tổng giá trị</td>
                <td className="py-4 px-5 text-right font-bold text-[#F6F0E4]/50 line-through">1.100.000đ</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-[#1D9E75]/10 border-2 border-[#1D9E75] rounded-2xl p-8 text-center">
          <p className="text-[#F6F0E4]/60 mb-1 text-sm">Giá hôm nay</p>
          <div className="text-5xl font-extrabold text-[#1D9E75] mb-2">199.000đ</div>
          <p className="text-[#F6F0E4]/60 text-sm mb-6">Nhận file ngay sau khi thanh toán. QR auto xác nhận.</p>
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full bg-[#1D9E75] hover:bg-[#178a65] text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Tôi muốn setup AI cho shop ngay →
          </button>
          <p className="text-xs text-[#F6F0E4]/40 mt-3">Bảo đảm hoàn tiền 7 ngày nếu file không dùng được</p>
        </div>
      </section>

      {/* Guarantee */}
      <section
        id="guarantee"
        data-animate
        className={`max-w-2xl mx-auto px-4 py-8 ${fadeUp('guarantee')}`}
      >
        <div className="flex gap-5 bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-2xl p-6 items-start">
          <div className="text-4xl shrink-0">🛡️</div>
          <div>
            <h3 className="font-bold text-lg mb-2">Bảo đảm 7 ngày, không hỏi lý do</h3>
            <p className="text-sm text-[#F6F0E4]/70 leading-relaxed">
              Bạn mua về, làm theo hướng dẫn. Nếu AI vẫn không nói chuyện được đúng
              như mình hứa, bạn nhắn Telegram mình trong vòng 7 ngày, mình hoàn lại
              toàn bộ 199.000đ. Không cần giải thích.
            </p>
          </div>
        </div>
      </section>

      {/* For / Not For */}
      <section
        id="forwhom"
        data-animate
        className={`max-w-3xl mx-auto px-4 py-12 ${fadeUp('forwhom')}`}
      >
        <h2 className="text-2xl font-bold text-center mb-8">Phù hợp với bạn không?</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/30 rounded-2xl p-6">
            <h3 className="font-bold text-[#1D9E75] mb-4 flex items-center gap-2">
              <span>✅</span> Dành cho bạn nếu
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                'Đang dùng Facebook Page / Instagram hoặc WhatsApp Business để bán hàng',
                'Muốn AI tự trả lời khách khi bạn không online',
                'Đã bật tính năng AI của Meta nhưng nó nói linh tinh hoặc không nói gì',
                'Không biết kỹ thuật nhưng muốn AI hoạt động đúng',
                'Chủ shop nhỏ hoặc solopreneur tự quản lý page',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#1D9E75] shrink-0 mt-0.5">→</span>
                  <span className="text-[#F6F0E4]/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-2xl p-6">
            <h3 className="font-bold text-[#F6F0E4]/50 mb-4 flex items-center gap-2">
              <span>❌</span> Không dành cho bạn nếu
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                'Bạn không dùng Facebook Page hoặc Instagram để bán hàng',
                'Bạn muốn làm chatbot phức tạp có flow nhiều bước (cần công cụ khác)',
                'Ngành của bạn không nằm trong 6 ngành hỗ trợ (mình sẽ hoàn tiền)',
                'Bạn muốn thuê người setup tay, không tự làm',
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-[#F6F0E4]/30 shrink-0 mt-0.5">→</span>
                  <span className="text-[#F6F0E4]/50">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        data-animate
        className={`max-w-2xl mx-auto px-4 py-12 ${fadeUp('faq')}`}
      >
        <h2 className="text-2xl font-bold text-center mb-8">Câu hỏi hay gặp</h2>
        <div className="space-y-4">
          {[
            {
              q: 'Sau khi mua, mình nhận file như thế nào?',
              a: 'Hệ thống tự động gửi email hướng dẫn vào địa chỉ bạn điền khi thanh toán. Thường trong vòng 5 phút sau khi QR xác nhận thành công.',
            },
            {
              q: 'Mình không rành kỹ thuật, có làm được không?',
              a: 'Được. Bạn chỉ cần biết copy và paste. File hướng dẫn mình viết rất rõ từng bước, kèm ảnh chụp màn hình. Nếu kẹt bước nào cứ nhắn mình qua Telegram.',
            },
            {
              q: 'Ngành của mình không có trong danh sách 6 ngành thì sao?',
              a: 'Nhắn mình trước khi mua để mình kiểm tra. Nếu không hỗ trợ được thì mình không nhận thanh toán chứ không để bạn mua xong mới biết.',
            },
            {
              q: 'AI Meta này khác chatbot Zalo, ManyChat hay Kommo không?',
              a: 'Khác. AI Meta là tính năng có sẵn miễn phí của Facebook và Instagram, bạn không cần thêm phần mềm. Skill này chỉ giúp bạn cấu hình đúng để nó nói chuyện tử tế, không phải thay thế chatbot phức tạp.',
            },
            {
              q: 'Mua rồi dùng mãi được không hay cần mua lại?',
              a: 'Dùng mãi. File bạn nhận là tài liệu tĩnh, bạn giữ và dùng lâu dài. Khi Meta cập nhật tính năng mới, mình sẽ gửi file cập nhật miễn phí qua email.',
            },
          ].map((item) => (
            <details key={item.q} className="bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-2xl overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-sm list-none flex justify-between items-center">
                {item.q}
                <span className="text-[#1D9E75] text-xl group-open:rotate-45 transition-transform duration-200">+</span>
              </summary>
              <div className="px-6 pb-5 text-sm text-[#F6F0E4]/70 leading-relaxed border-t border-[#F6F0E4]/10 pt-4">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="finalcta"
        data-animate
        className={`max-w-2xl mx-auto px-4 py-12 text-center ${fadeUp('finalcta')}`}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          AI Meta của bạn đang trả lời sai.<br />
          <span className="text-[#1D9E75]">Sửa lại hôm nay chỉ mất 199.000đ.</span>
        </h2>
        <p className="text-[#F6F0E4]/60 mb-8 leading-relaxed">
          Đừng để khách nhắn mà không có ai trả lời. Đừng để AI nói linh tinh làm xấu hình ảnh shop.
          30 phút setup hôm nay, AI làm việc cho bạn mãi về sau.
        </p>
        <button
          onClick={() => setShowCheckout(true)}
          className="bg-[#1D9E75] hover:bg-[#178a65] text-white font-bold py-4 px-12 rounded-xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          Tôi muốn setup AI ngay — 199.000đ →
        </button>
        <p className="text-xs text-[#F6F0E4]/40 mt-4">Bảo đảm hoàn tiền 7 ngày · Nhận file ngay sau thanh toán</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#F6F0E4]/10 mt-8 py-8 px-4 text-center text-xs text-[#F6F0E4]/30">
        <p className="mb-2">DungHoang.com · Dũng Hoàng · MST cá nhân kinh doanh</p>
        <p>Zalo: 0938725413 · Telegram: @KentHoang</p>
      </footer>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0D2B1A]/95 border-t border-[#F6F0E4]/10 backdrop-blur-sm px-4 py-3 z-40 flex items-center justify-between max-w-2xl mx-auto gap-4 md:rounded-t-2xl md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:shadow-2xl">
        <div>
          <div className="font-bold text-sm">Setup Meta Business AI</div>
          <div className="text-[#1D9E75] text-xs">chỉ 199.000đ · bảo đảm 7 ngày</div>
        </div>
        <button
          onClick={() => setShowCheckout(true)}
          className="bg-[#1D9E75] hover:bg-[#178a65] text-white font-bold py-2.5 px-6 rounded-xl text-sm whitespace-nowrap transition-all duration-200 shrink-0"
        >
          Setup ngay →
        </button>
      </div>

      {/* Zalo float */}
      <a
        href="https://zalo.me/0938725413"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 right-4 z-50 bg-[#0068FF] hover:bg-[#0052cc] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Chat Zalo"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
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
