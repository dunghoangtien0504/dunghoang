'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CheckCircle2, MessageSquare, ArrowRight, Home, BookOpen } from 'lucide-react'

export default function CamOnMetaAIAgentPage() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="min-h-screen bg-[#F6F0E4] text-[#0D2B1A] flex flex-col items-center justify-center px-5 py-16 relative overflow-hidden"
      style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div
        className={`max-w-xl w-full text-center transition-all duration-700 relative z-10 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Success Icon */}
        <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#1D9E75]/10 rounded-full blur-xl animate-pulse" />
          <div className="relative w-20 h-20 bg-emerald-500/10 border-2 border-[#1D9E75] rounded-full flex items-center justify-center text-[#1D9E75] shadow-sm">
            <CheckCircle2 size={40} className="stroke-[2.5]" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight text-[#0D2B1A]">
          Thanh toán thành công!
        </h1>

        <p className="text-gray-650 text-base md:text-lg mb-8 leading-relaxed max-w-md mx-auto">
          Mình đã nhận được thanh toán của bạn. Hướng dẫn setup <strong className="text-[#1D9E75] font-bold">Meta AI Agent</strong> đã được mở trong khu học — và email xác nhận đang gửi về hộp thư của bạn.
        </p>

        {/* CTA vào portal */}
        <Link
          href="/portal/meta-ai-agent"
          className="group flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#1D9E75] to-[#15825F] hover:from-[#22B385] hover:to-[#1B9C73] text-white font-bold py-4 px-8 rounded-2xl text-lg text-center transition-all duration-300 shadow-md active:scale-[0.98] mb-6"
        >
          Vào Khu Học Ngay
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <p className="text-xs text-gray-500 mb-8">
          Đăng nhập bằng email vừa thanh toán. Nếu lần đầu vào, bấm &ldquo;Quên mật khẩu&rdquo; để tạo mật khẩu.
        </p>

        {/* What's next card - Clean white with warm gray borders */}
        <div className="bg-white border border-[#DDD8CB] rounded-3xl p-6 md:p-8 text-left mb-8 shadow-sm">
          <h2 className="font-bold text-lg mb-5 text-center text-[#0D2B1A] flex items-center justify-center gap-2">
            <BookOpen size={18} className="text-[#1D9E75]" />
            Lộ trình setup trong khu học
          </h2>
          <div className="space-y-5">
            {[
              {
                num: '1',
                title: 'Bài 1: Đọc tổng quan',
                desc: 'Hiểu toàn bộ quy trình trước — mất 5 phút. Bài này mở miễn phí không cần đăng nhập.',
              },
              {
                num: '2',
                title: 'Bài 2-4: Làm từng bước theo hướng dẫn',
                desc: 'Chuẩn bị thông tin → điền template → paste vào Meta Business Suite.',
              },
              {
                num: '3',
                title: 'Bài 5: Test AI trước khi bật cho khách',
                desc: '20+ câu hỏi mẫu để chắc chắn AI nói đúng trước khi mở cho khách thật.',
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-4 items-start group">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#1D9E75] flex items-center justify-center font-bold text-sm shrink-0 transition-colors group-hover:bg-emerald-500/20">
                  {item.num}
                </div>
                <div>
                  <div className="font-semibold text-sm mb-0.5 text-[#0D2B1A]">{item.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Box */}
        <div className="bg-emerald-500/[0.03] border border-emerald-500/20 rounded-2xl p-5 mb-8 text-left flex items-start gap-4">
          <MessageSquare size={20} className="text-[#1D9E75] shrink-0 mt-1" />
          <p className="text-sm text-gray-700 leading-relaxed">
            Kẹt bước nào trong quá trình setup? Hãy gửi vào{' '}
            <a
              href="https://web.telegram.org/a/#-5493805985"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1D9E75] font-bold hover:underline inline-flex items-center gap-0.5"
            >
              Group Telegram hỗ trợ 24/7 (Tiểu Hà Mã)
            </a>{' '}
            hoặc liên hệ Zalo{' '}
            <a
              href="https://zalo.me/0938725413"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1D9E75] font-bold hover:underline"
            >
              0938725413
            </a>
            . Mình và đội ngũ trợ lý sẽ phản hồi ngay lập tức để hỗ trợ bạn.
          </p>
        </div>

        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors underline"
        >
          <Home size={14} />
          Quay về trang chủ
        </Link>
      </div>
    </div>
  )
}
