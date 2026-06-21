'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Zap } from 'lucide-react'

export default function CamOnContentPage() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">

      <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]/90 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
            <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
          </div>
          <span className="font-bold text-[#0D2B1A] text-sm">DungHoang.com</span>
        </div>
      </header>

      <div className={`max-w-2xl mx-auto px-4 py-12 space-y-8 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>

        {/* Xác nhận */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-[#EAF5EF] rounded-2xl flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-[#2D7A4F]" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#0D2B1A]">Nhận được rồi. Cảm ơn bạn nha.</h1>
            <p className="text-[#3D6B4A] leading-relaxed">
              Mình vừa gửi link Notion workspace về hộp thư của bạn.
              Kiểm tra inbox (và cả thư mục spam) nhé, đôi khi nó lạc vào đó.
            </p>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-white border border-[#DDD8CB] rounded-3xl p-6 space-y-4">
          <p className="font-bold text-[#0D2B1A]">3 bước đầu tiên sau khi nhận Notion:</p>
          <div className="space-y-3">
            {[
              { n:'1', head:'Duplicate workspace về tài khoản của bạn', body:'Mở link Notion → bấm "Duplicate" ở góc phải trên → chọn workspace của bạn. Miễn phí.' },
              { n:'2', head:'Điền Brand DNA', body:'Vào trang Brand DNA, điền giọng văn, câu chuyện, khách hàng của bạn. Đây là bước quan trọng nhất — AI sẽ đọc từ đây.' },
              { n:'3', head:'Gõ "viết bài" và thử ngay', body:'Mở AI (Claude hoặc ChatGPT), paste Brand DNA vào, gõ "viết bài". Xem kết quả ra nghe như bạn chưa.' },
            ].map(s => (
              <div key={s.n} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#0D2B1A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#F6F0E4] text-xs font-black">{s.n}</span>
                </div>
                <div>
                  <p className="font-semibold text-[#0D2B1A] text-sm">{s.head}</p>
                  <p className="text-sm text-[#7A8C7E] mt-0.5 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px bg-[#DDD8CB] flex-1" />
          <span className="text-sm text-[#7A8C7E]">Muốn đi xa hơn?</span>
          <div className="h-px bg-[#DDD8CB] flex-1" />
        </div>

        {/* Upsell → Trang Bán Hàng */}
        <div className="bg-white border border-[#DDD8CB] rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-[#0D2B1A] px-6 py-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#88860B]" />
            <span className="text-[#F6F0E4] text-sm font-semibold">Dành riêng cho bạn vừa mua Content System</span>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#0D2B1A]">Content hay rồi — giờ cần trang bán.</h2>
              <p className="text-[#3D6B4A] leading-relaxed">
                Content kéo người quan tâm. Trang bán hàng chốt đơn.
                Thiếu trang bán thì content giỏi cũng chỉ dừng ở "được like".
              </p>
              <p className="text-[#3D6B4A] leading-relaxed">
                Skill 10 dạy bạn dựng Landing Page chuyển đổi cao trong 1 buổi, không cần code.
                Và vì bạn đã mua Content System, <strong className="text-[#0D2B1A]">368.686đ trừ vào Trang Bán Hàng</strong>.
                Bạn chỉ cần thêm <strong className="text-[#0D2B1A]">318.182đ</strong>.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#DDD8CB] rounded-2xl p-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#7A8C7E]">Giá Trang Bán Hàng</span>
                <span className="line-through text-[#7A8C7E]">686.868đ</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#3D6B4A]">Bạn đã trả (Content System)</span>
                <span className="text-[#2D7A4F] font-semibold">-368.686đ</span>
              </div>
              <div className="h-px bg-[#DDD8CB]" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#0D2B1A]">Chỉ cần thêm</span>
                <span className="font-bold text-[#C0390E] text-xl">318.182đ</span>
              </div>
            </div>

            <div className="space-y-3">
              <Link href="/mini-trang-ban-hang"
                className="flex items-center justify-center gap-2 w-full h-14 bg-[#C0390E] hover:bg-[#A0300B] text-white font-bold text-base rounded-xl transition-all shadow-lg hover:shadow-xl">
                Xem Trang Bán Hàng
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-center text-xs text-[#7A8C7E]">Bảo hành 14 ngày hoàn 100%. Không hỏi lý do.</p>
            </div>

            <p className="text-center text-sm text-[#7A8C7E]">
              Chưa muốn xem ngay cũng không sao. Notion đang chờ bạn trong hộp thư rồi.
            </p>
          </div>
        </div>

        <div className="text-center space-y-2 pb-6">
          <p className="text-sm text-[#7A8C7E]">
            Cần hỗ trợ?{' '}
            <a href="https://t.me/KentHoang" target="_blank" rel="noopener noreferrer"
              className="text-[#3D6B4A] underline font-medium">
              Nhắn @KentHoang trên Telegram
            </a>
          </p>
          <p className="text-xs text-[#7A8C7E]">
            <Link href="/" className="hover:text-[#3D6B4A] transition-colors">DungHoang.com</Link>
          </p>
        </div>

      </div>
    </div>
  )
}
