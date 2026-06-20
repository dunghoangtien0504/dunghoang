'use client'

import { useState } from 'react'
import CheckoutModal from '@/components/checkout/CheckoutModal'
import { PRODUCTS } from '@/lib/products'

const product = PRODUCTS.challenge_368

const DAYS = [
  { skill: 'BRAND DNA', title: 'Nạp giọng văn — Dạy AI viết đúng giọng bạn' },
  { skill: 'Social Content', title: 'AI viết caption — Đăng 1 cái thật' },
  { skill: 'Sales Message', title: 'AI viết email/tin nhắn chào hàng' },
  { skill: 'Video Script', title: 'AI viết kịch bản video 60 giây' },
  { skill: 'Headline', title: 'AI tạo 10 tiêu đề — Đăng bài với tiêu đề hay nhất' },
  { skill: 'Sales Close', title: 'AI soạn tin chốt đơn — Gửi 10 khách thật' },
  { skill: 'Content System', title: '30 bài content 1 tháng trong 1 giờ' },
]

export default function BiQuyet7NgayPage() {
  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <div className="min-h-screen bg-[#F6F0E4]">

      {/* Nav */}
      <nav className="bg-[#0D2B1A] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-[#F6F0E4] font-black font-mono text-sm">DungHoang.com</span>
          <a href="/portal" className="text-xs text-[#F6F0E4]/60 hover:text-[#F6F0E4]">Khu học →</a>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">

        {/* Hero */}
        <div className="text-center space-y-4">
          <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
            Challenge có cọc
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0D2B1A] leading-tight">
            Bí Quyết 7 Ngày<br/>
            <span className="text-[#C0390E]">Đưa AI Vào Business</span>
          </h1>
          <p className="text-[#3D6B4A] text-lg leading-relaxed max-w-xl mx-auto">
            Đóng cọc 368k. Làm thật 7 ngày. Hoàn thành đúng hạn mình hoàn lại đủ.
          </p>
        </div>

        {/* Cơ chế */}
        <div className="bg-[#0D2B1A] rounded-2xl p-6 sm:p-8 space-y-4">
          <p className="text-[#F6F0E4] font-bold text-lg">Cơ chế thế này</p>
          <div className="space-y-3">
            {[
              { n: '1', text: 'Bạn đóng 368k tiền cọc để đăng ký' },
              { n: '2', text: 'Mỗi ngày 7h sáng mình mở 1 buổi học mới — hướng dẫn SOP từng bước' },
              { n: '3', text: 'Bạn có 24h để làm bài và nộp bằng chứng (screenshot, link, text...)' },
              { n: '4', text: 'Hoàn thành đúng hạn cả 7 ngày → mình hoàn đủ 368k trong 48h sau' },
              { n: '5', text: 'Nộp trễ hoặc bỏ ngày → ngày đó không được tính → không đủ điều kiện hoàn cọc' },
            ].map(s => (
              <div key={s.n} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#F6F0E4]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#F6F0E4] text-xs font-bold">{s.n}</span>
                </div>
                <p className="text-[#F6F0E4]/80 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 border-t border-[#F6F0E4]/10 pt-4">
            <p className="text-[#88860B] text-xs">
              Không hoàn thành? 368k đó mình tính thẳng vào học phí Mini Course —
              tức là bạn tự động có Mini Course "Trang Bán Hàng AI" luôn, không mất trắng.
            </p>
          </div>
        </div>

        {/* 7 days */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#0D2B1A]">7 skill thực chiến</h2>
          <p className="text-[#3D6B4A] text-sm">Mỗi ngày 1 skill — làm thật — đăng thật. Không lý thuyết.</p>
          <div className="space-y-2">
            {DAYS.map((d, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-[#0D2B1A] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0D2B1A] leading-snug">{d.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{d.skill}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tại sao cọc */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-3">
          <h2 className="font-bold text-[#0D2B1A]">Tại sao lại có tiền cọc?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Mình từng làm thử thách 7 ngày miễn phí. Khoảng 40% người đăng ký không làm ngày nào.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Không phải họ lười — mà vì miễn phí thì não không coi trọng.
            368k không lớn nhưng đủ để bạn "phải làm" thay vì "để đó tính sau".
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Và nếu bạn làm đủ 7 ngày — bạn lấy lại đủ 368k đó.
            Tức là bạn học 7 skill AI, làm thật 7 ngày, và về tay 0 đồng.
          </p>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <button
            onClick={() => setShowCheckout(true)}
            className="w-full h-16 bg-[#C0390E] hover:bg-[#a02e0a] text-white text-lg font-black rounded-2xl transition-colors shadow-lg shadow-red-900/20">
            Đăng ký — Đóng cọc 368,000đ
          </button>
          <p className="text-center text-xs text-gray-400">
            Thanh toán qua chuyển khoản · Xác nhận trong 5-10 phút · Hoàn toàn an toàn
          </p>
          <div className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-xl p-3">
            <span className="text-green-600 text-sm">✓</span>
            <p className="text-xs text-green-700">
              <strong>Cam kết:</strong> Hoàn thành 7 ngày đúng hạn → hoàn đủ 368k.
              Không hoàn thành → 368k chuyển thành học phí Mini Course (trị giá 368k).
              Không ai mất trắng.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-3">
          <h2 className="font-bold text-[#0D2B1A]">Câu hỏi hay gặp</h2>
          {[
            { q: 'Bắt đầu từ ngày nào?', a: 'Ngay sau khi thanh toán xong. Ngày 1 mở lúc 7h sáng đầu tiên sau khi bạn đăng ký.' },
            { q: 'Bằng chứng nộp như thế nào?', a: 'Screenshot, link bài đăng, copy text... nộp vào form trong khu học. Không cần hoàn hảo — cần có thật.' },
            { q: 'Nếu bỏ 1 ngày thì sao?', a: 'Ngày đó bị đánh dấu "trễ hạn". Bạn vẫn học được ngày tiếp theo nhưng không đủ điều kiện hoàn cọc. 368k chuyển thành Mini Course.' },
            { q: 'Không có kinh nghiệm AI được không?', a: 'Được. SOP viết cho người mới. Mỗi ngày chỉ cần 30-60 phút.' },
          ].map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 space-y-1">
              <p className="font-medium text-sm text-[#0D2B1A]">{faq.q}</p>
              <p className="text-sm text-gray-500">{faq.a}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 pb-4">
          Câu hỏi khác? Nhắn Telegram <a href="https://t.me/kenthoang" className="underline">@kenthoang</a>
        </p>
      </div>

      <CheckoutModal
        productId={product.id}
        open={showCheckout}
        onClose={() => setShowCheckout(false)}
      />
    </div>
  )
}
