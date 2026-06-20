'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail]     = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase!.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/portal` }
    })

    if (error) {
      setError('Có lỗi xảy ra. Thử lại sau.')
    } else {
      setSent(true)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-2">DungHoang.com</p>
          <h1 className="text-2xl font-bold text-[#0d2b1a]">Khu học viên</h1>
          <p className="text-gray-500 text-sm mt-2">Điền email để nhận link đăng nhập</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-bold text-[#0d2b1a] text-lg mb-2">Kiểm tra email nhaaa</h2>
              <p className="text-gray-500 text-sm">
                Mình vừa gửi link đăng nhập đến <strong>{email}</strong>.<br />
                Click vào link đó là vào học được liền.
              </p>
              <p className="text-gray-400 text-xs mt-4">Không thấy? Kiểm tra thư mục Spam.</p>
              <button
                onClick={() => setSent(false)}
                className="mt-6 text-sm text-[#1D9E75] hover:underline"
              >
                Gửi lại email khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email của bạn</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ten@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/30 focus:border-[#1D9E75]"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-[#0d2b1a] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#1D9E75] transition-colors disabled:opacity-50"
              >
                {loading ? 'Đang gửi...' : 'Gửi link đăng nhập'}
              </button>

              <p className="text-center text-xs text-gray-400">
                Không cần nhớ mật khẩu — mỗi lần đăng nhập nhận 1 link qua email.
              </p>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Chưa có khóa học? <a href="/khoa-1" className="text-[#1D9E75] hover:underline">Xem Khóa 1</a>
        </p>
      </div>
    </div>
  )
}
