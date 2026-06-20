'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function DatLaiMatKhauPage() {
  const router = useRouter()
  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [loading,   setLoading]   = useState(false)
  const [done,      setDone]      = useState(false)
  const [error,     setError]     = useState('')
  const [hasSession, setHasSession] = useState(false)

  // Supabase gửi token qua URL hash — cần exchange để có session
  useEffect(() => {
    supabase!.auth.getSession().then(({ data: { session } }) => {
      setHasSession(!!session)
    })

    // Lắng nghe event khi Supabase tự exchange token từ URL hash
    const { data: { subscription } } = supabase!.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setHasSession(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { setError('Mật khẩu cần ít nhất 8 ký tự.'); return }
    if (password !== confirm) { setError('Hai mật khẩu chưa khớp.'); return }
    setLoading(true); setError('')

    const { error } = await supabase!.auth.updateUser({ password })
    if (error) setError('Có lỗi xảy ra. Link có thể đã hết hạn, thử gửi lại.')
    else {
      setDone(true)
      setTimeout(() => router.push('/portal'), 2000)
    }
    setLoading(false)
  }

  if (!hasSession) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center space-y-4">
          <p className="text-gray-500 text-sm">Đang xác minh link...</p>
          <p className="text-gray-400 text-xs">
            Nếu trang không tải được,{' '}
            <Link href="/portal/quen-mat-khau" className="text-[#1D9E75] hover:underline">gửi lại link mới</Link>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">

        <div className="text-center">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-2">DungHoang.com</p>
          <h1 className="text-2xl font-bold text-[#0d2b1a]">Đặt mật khẩu mới</h1>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          {done ? (
            <div className="text-center space-y-3">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-bold text-[#0d2b1a]">Đổi mật khẩu thành công!</h2>
              <p className="text-gray-500 text-sm">Đang chuyển về khu học...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mật khẩu mới</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Ít nhất 8 ký tự" required minLength={8}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nhập lại mật khẩu</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                  placeholder="Nhập lại cho chắc" required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/30" />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" disabled={loading || !password || !confirm}
                className="w-full bg-[#0d2b1a] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#1D9E75] transition-colors disabled:opacity-50">
                {loading ? 'Đang lưu...' : 'Đặt mật khẩu mới'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
