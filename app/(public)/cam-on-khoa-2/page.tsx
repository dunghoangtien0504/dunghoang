'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckCircle, MessageCircle, Calendar, ShieldCheck } from 'lucide-react'

export default function CamOnKhoa2Page() {
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
              Chào mừng vào Khóa 2.
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
                icon: <MessageCircle className="w-5 h-5 text-[#2D7A4F]" />,
                step: '1',
                title: 'Vào nhóm Telegram ngay',
                desc: 'Nhắn "@dunghoangcom đã đăng ký Khóa 2" vào nhóm. Tiểu Hà Mã sẽ chào bạn và bắt đầu quy trình kèm.',
                cta: { label: 'Vào nhóm Telegram', href: 'https://t.me/kenthoang' },
              },
              {
                icon: <Calendar className="w-5 h-5 text-[#2D7A4F]" />,
                step: '2',
                title: 'Đặt lịch buổi kick-off 1-1',
                desc: 'Sau khi vào nhóm, Tiểu Hà Mã sẽ gửi link đặt lịch buổi đầu tiên — mình xem hệ thống bạn đang có và lên kế hoạch 30 ngày.',
                cta: null,
              },
              {
                icon: <CheckCircle className="w-5 h-5 text-[#2D7A4F]" />,
                step: '3',
                title: 'Bắt đầu skill đầu tiên',
                desc: 'Trong khi chờ buổi kick-off, bạn có thể vào khu học và bắt đầu từ Skill 1 — nạp giọng bạn vào AI. Làm trước 15 phút, buổi kick-off sẽ đi nhanh hơn nhiều.',
                cta: { label: 'Vào khu học', href: '/portal' },
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
            30 ngày kèm sát để dựng xong hệ thống tự chạy. Nếu đến ngày 30 mà chưa xong,
            mình tiếp tục kèm đến khi xong, không tính thêm tiền.
          </p>
          <p className="text-[#C8D5C9] text-sm leading-relaxed">
            Và nếu 14 ngày đầu bạn thấy không phù hợp — reply email lại là mình hoàn tiền.
            Không hỏi lý do.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2 pb-6">
          <p className="text-sm text-[#7A8C7E]">
            Câu hỏi gì?{' '}
            <a href="https://t.me/kenthoang" target="_blank" rel="noopener noreferrer"
               className="text-[#3D6B4A] underline font-medium">
              Nhắn @kenthoang trên Telegram
            </a>
          </p>
          <p className="text-xs text-[#7A8C7E]">
            <Link href="/" className="hover:text-[#3D6B4A] transition-colors">DungHoang.com</Link>
            {' '}·{' '}
            <Link href="/khoa-2-ban-co-doi-truong" className="hover:text-[#3D6B4A] transition-colors">
              Xem lại Khóa 2
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
