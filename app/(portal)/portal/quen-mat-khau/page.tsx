'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function QuenMatKhauPage() {
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')

    const { error } = await supabase!.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/portal/dat-lai-mat-khau`,
    })

    if (error) setError('Có lỗi xảy ra. Kiểm tra lại email và thử lại.')
    else setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">

        <div className="text-center">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-2">DungHoang.com</p>
          <h1 className="text-2xl font-bold text-[#0d2b1a]">Quên mật khẩu</h1>
          <p className="text-gray-500 text-sm mt-2">Điền email để nhận link đặt lại mật khẩu</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-bold text-[#0d2b1a]">Kiểm tra email nhaaa</h2>
              <p className="text-gray-500 text-sm">
                Mình vừa gửi link đặt lại mật khẩu đến <strong>{email}</strong>.<br />
                Click vào link đó để chọn mật khẩu mới.
              </p>
              <p className="text-gray-400 text-xs">Không thấy? Kiểm tra thư mục Spam. Link có hiệu lực trong 1 giờ.</p>
              <button onClick={() => setSent(false)} className="text-sm text-[#1D9E75] hover:underline">
                Gửi lại
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email đã đăng ký</label>
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="ten@email.com" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/30"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={loading || !email}
                className="w-full bg-[#0d2b1a] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#1D9E75] transition-colors disabled:opacity-50">
                {loading ? 'Đang gửi...' : 'Gửi link đặt lại mật khẩu'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-500">
          Nhớ rồi?{' '}
          <Link href="/portal/login" className="text-[#1D9E75] hover:underline font-medium">Đăng nhập</Link>
        </p>
      </div>
    </div>
  )
}
