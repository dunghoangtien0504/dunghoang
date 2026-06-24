'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

type Tab = 'magic' | 'password'

export default function LoginPage() {
  const router = useRouter()
  const [tab,     setTab]     = useState<Tab>('magic')
  const [email,   setEmail]   = useState('')
  const [password,setPassword]= useState('')
  const [loading, setLoading] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase!.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/portal` },
    })
    if (error) setError('Có lỗi xảy ra. Thử lại sau.')
    else setSent(true)
    setLoading(false)
  }

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase!.auth.signInWithPassword({ email, password })
    if (error) {
      if (error.message.includes('Invalid login credentials')) setError('Email hoặc mật khẩu không đúng.')
      else setError('Có lỗi xảy ra. Thử lại sau.')
    } else {
      router.push('/portal')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">

        <div className="text-center">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-2">DungHoang.com</p>
          <h1 className="text-2xl font-bold text-[#0d2b1a]">Khu học viên</h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {([['magic', 'Link qua email'], ['password', 'Mật khẩu']] as [Tab, string][]).map(([t, label]) => (
              <button key={t} onClick={() => { setTab(t); setError('') }}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  tab === t ? 'text-[#0d2b1a] border-b-2 border-[#0d2b1a]' : 'text-gray-400 hover:text-gray-600'
                }`}>
                {label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Magic link tab */}
            {tab === 'magic' && (
              sent ? (
                <div className="text-center space-y-4">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="font-bold text-[#0d2b1a]">Kiểm tra email nhaaa</h2>
                  <p className="text-gray-500 text-sm">Mình vừa gửi link đăng nhập đến <strong>{email}</strong>. Click vào link đó là vào học được liền.</p>
                  <p className="text-gray-400 text-xs">Không thấy? Kiểm tra thư mục Spam.</p>
                  <button onClick={() => setSent(false)} className="text-sm text-[#1D9E75] hover:underline">Gửi lại</button>
                </div>
              ) : (
                <form onSubmit={handleMagicLink} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email của bạn</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="ten@email.com" required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/30" />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button type="submit" disabled={loading || !email}
                    className="w-full bg-[#0d2b1a] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#1D9E75] transition-colors disabled:opacity-50">
                    {loading ? 'Đang gửi...' : 'Gửi link đăng nhập'}
                  </button>
                  <p className="text-center text-xs text-gray-400">Không cần nhớ mật khẩu — mỗi lần nhận 1 link qua email.</p>
                </form>
              )
            )}

            {/* Password tab */}
            {tab === 'password' && (
              <form onSubmit={handlePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="ten@email.com" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/30" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
                    <Link href="/portal/quen-mat-khau" className="text-xs text-[#1D9E75] hover:underline">Quên mật khẩu?</Link>
                  </div>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••" required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/30" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" disabled={loading || !email || !password}
                  className="w-full bg-[#0d2b1a] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#1D9E75] transition-colors disabled:opacity-50">
                  {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400">
          Chưa có khóa học?{' '}
          <Link href="/24-ai-agent" className="text-[#1D9E75] hover:underline">Xem Khóa 1</Link>
        </p>
      </div>
    </div>
  )
}
