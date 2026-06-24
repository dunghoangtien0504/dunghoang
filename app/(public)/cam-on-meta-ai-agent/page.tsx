'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function CamOnMetaBusinessAIPage() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="min-h-screen bg-[#0D2B1A] text-[#F6F0E4] flex flex-col items-center justify-center px-4 py-16"
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div
        className={`max-w-xl w-full text-center transition-all duration-700 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Icon */}
        <div className="w-20 h-20 bg-[#1D9E75]/20 border-2 border-[#1D9E75] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          ✅
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Thanh toán thành công!
        </h1>

        <p className="text-[#F6F0E4]/70 text-lg mb-8 leading-relaxed">
          Mình đã nhận được thanh toán của bạn.
          File <strong className="text-[#F6F0E4]">Setup Meta Business AI</strong> và
          hướng dẫn chi tiết đang được gửi vào email của bạn.
          Thường mất khoảng 2-5 phút.
        </p>

        {/* What's next */}
        <div className="bg-[#F6F0E4]/5 border border-[#F6F0E4]/10 rounded-2xl p-6 text-left mb-8">
          <h2 className="font-bold text-lg mb-4 text-center">Bước tiếp theo của bạn</h2>
          <div className="space-y-4">
            {[
              {
                num: '1',
                title: 'Kiểm tra email',
                desc: 'Mình gửi file + hướng dẫn vào email bạn đăng ký. Nếu không thấy, kiểm tra thư mục spam nhé.',
              },
              {
                num: '2',
                title: 'Điền thông tin shop vào form trong file',
                desc: 'File có form hỏi các thông tin cơ bản về shop. Điền vào là AI sẽ biết nói chuyện đúng giọng của bạn.',
              },
              {
                num: '3',
                title: 'Copy và paste vào Meta Business Suite',
                desc: 'Làm theo hướng dẫn từng bước trong file. Kẹt bước nào thì nhắn mình qua Telegram.',
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-[#1D9E75] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {item.num}
                </div>
                <div>
                  <div className="font-semibold text-sm mb-0.5">{item.title}</div>
                  <div className="text-xs text-[#F6F0E4]/60 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support */}
        <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/30 rounded-2xl p-5 mb-8">
          <p className="text-sm text-[#F6F0E4]/80 leading-relaxed">
            Kẹt bước nào trong quá trình setup?
            Nhắn mình qua{' '}
            <a
              href="https://t.me/KentHoang"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1D9E75] font-semibold hover:underline"
            >
              Telegram @KentHoang
            </a>{' '}
            hoặc{' '}
            <a
              href="https://zalo.me/0938725413"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1D9E75] font-semibold hover:underline"
            >
              Zalo 0938725413
            </a>
            . Mình hỗ trợ trong ngày.
          </p>
        </div>

        {/* Back to home */}
        <Link
          href="/"
          className="text-sm text-[#F6F0E4]/40 hover:text-[#F6F0E4]/70 transition-colors underline"
        >
          Quay về trang chủ
        </Link>
      </div>
    </div>
  )
}
