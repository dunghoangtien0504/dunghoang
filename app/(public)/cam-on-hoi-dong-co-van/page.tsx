'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, MessageCircle, CalendarClock, ShieldCheck } from 'lucide-react'

export default function CamOnHoiDongCoVanPage() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-dvh bg-[#F6F0E4] font-sans">

      {/* Header */}
      <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]/90 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
            <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
          </div>
          <span className="font-bold text-[#0D2B1A] text-sm">DungHoang.com</span>
        </div>
      </header>

      <div
        className={`max-w-2xl mx-auto px-4 py-12 space-y-6 transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >

        {/* Success header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-[#EAF5EF] rounded-3xl flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-[#2D7A4F]" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#0D2B1A]">
              Hội đồng của bạn đã được lập.
            </h1>
            <p className="text-[#3D6B4A] leading-relaxed">
              Mình nhận được rồi. Email kích hoạt + link khu học đang trên đường về hộp thư của bạn.
              Kiểm tra inbox và cả spam nhé.
            </p>
          </div>
        </div>

        {/* Bước tiếp theo */}
        <div className="bg-white border border-[#DDD8CB] rounded-3xl p-6 space-y-5">
          <h2 className="font-bold text-[#0D2B1A] text-lg">3 bước tiếp theo của bạn</h2>

          <div className="space-y-4">
            {[
              {
                icon: <CheckCircle className="w-5 h-5 text-[#2D7A4F]" />,
                step: '1',
                title: 'Vào khu học, tải 5 skill giám đốc',
                desc: 'CEO, CFO, CMO, CCO, CHRO đã chờ sẵn trong khu học, kèm hướng dẫn cài từng bước.',
                cta: { label: 'Vào khu học', href: '/portal' },
              },
              {
                icon: <CalendarClock className="w-5 h-5 text-[#2D7A4F]" />,
                step: '2',
                title: 'Đặt lịch buổi họp hội đồng đầu tiên',
                desc: 'Chọn 1 khung 30 phút cố định mỗi tuần — thứ Hai đầu tuần là đẹp nhất. Mang vấn đề nóng nhất tuần này ra hỏi đúng cố vấn phụ trách.',
                cta: null,
              },
              {
                icon: <MessageCircle className="w-5 h-5 text-[#2D7A4F]" />,
                step: '3',
                title: 'Kẹt gì nhắn mình',
                desc: 'Cài không chạy, không biết hỏi cố vấn nào trước — nhắn Telegram là mình chỉ ngay.',
                cta: { label: 'Nhắn @KentHoang', href: 'https://t.me/KentHoang' },
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#EAF5EF] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#2D7A4F] font-bold text-sm">{item.step}</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <p className="font-semibold text-[#0D2B1A] text-sm">{item.title}</p>
                  </div>
                  <p className="text-[#3D6B4A] text-sm leading-relaxed">{item.desc}</p>
                  {item.cta && (
                    <a
                      href={item.cta.href}
                      target={item.cta.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-[#C0390E] hover:text-[#A0300B] transition-colors"
                    >
                      {item.cta.label} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cam kết */}
        <div className="bg-[#0D2B1A] rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#88860B]" />
            <p className="font-bold text-[#F6F0E4] text-sm">Cam kết của mình với bạn</p>
          </div>
          <p className="text-[#C8D5C9] text-sm leading-relaxed">
            14 ngày đầu, họp thử ít nhất 2 buổi với 2 cố vấn. Nếu không thấy quyết định nào
            sáng ra — nhắn mình là hoàn 100% trong 24 giờ, không hỏi lý do.
          </p>
          <p className="text-[#C8D5C9] text-sm leading-relaxed">
            Muốn lên Khóa 2 Coaching bất kỳ lúc nào: 2.868.686đ bạn đã trả trừ thẳng vào,
            chỉ thêm 1.000.000đ.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2 pb-6">
          <p className="text-sm text-[#7A8C7E]">
            Câu hỏi gì?{' '}
            <a href="https://t.me/KentHoang" target="_blank" rel="noopener noreferrer"
               className="text-[#3D6B4A] underline font-medium">
              Nhắn @KentHoang trên Telegram
            </a>
          </p>
          <p className="text-xs text-[#7A8C7E]">
            <Link href="/" className="hover:text-[#3D6B4A] transition-colors">DungHoang.com</Link>
            {' '}·{' '}
            <Link href="/hoi-dong-co-van" className="hover:text-[#3D6B4A] transition-colors">
              Xem lại Hội Đồng Cố Vấn
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
