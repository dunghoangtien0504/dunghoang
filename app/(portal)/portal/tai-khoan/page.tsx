'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, Lock, Mail, Shield } from 'lucide-react'

export default function TaiKhoanPage() {
  const router = useRouter()
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [confirm,    setConfirm]    = useState('')
  const [loading,    setLoading]    = useState(false)
  const [success,    setSuccess]    = useState('')
  const [error,      setError]      = useState('')
  const [authLoading,setAuthLoading]= useState(true)

  useEffect(() => {
    supabase!.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/portal/login'); return }
      setEmail(user.email ?? '')
      setAuthLoading(false)
    })
  }, [router])

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { setError('Mật khẩu cần ít nhất 8 ký tự.'); return }
    if (password !== confirm) { setError('Hai mật khẩu chưa khớp.'); return }
    setLoading(true); setError(''); setSuccess('')

    const { error } = await supabase!.auth.updateUser({ password })
    if (error) setError('Không thể đổi mật khẩu. Thử lại sau.')
    else {
      setSuccess('Đổi mật khẩu thành công!')
      setPassword(''); setConfirm('')
    }
    setLoading(false)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/portal" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0d2b1a]">
            <ArrowLeft size={16} />
            Về khu học
          </Link>
          <span className="text-sm font-bold text-[#0d2b1a]">DungHoang.com</span>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0d2b1a]">Tài khoản</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý thông tin đăng nhập</p>
        </div>

        {/* Email info */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center">
              <Mail size={18} className="text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Email</p>
              <p className="text-sm font-medium text-[#0d2b1a]">{email}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400">Email không thể thay đổi. Đây là tài khoản của bạn trên DungHoang.com.</p>
        </div>

        {/* Change password */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-[#0d2b1a]/5 rounded-xl flex items-center justify-center">
              <Lock size={18} className="text-[#0d2b1a]" />
            </div>
            <div>
              <p className="font-semibold text-[#0d2b1a]">Đổi mật khẩu</p>
              <p className="text-xs text-gray-400">Mật khẩu mới sẽ có hiệu lực ngay lập tức</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mật khẩu mới</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Ít nhất 8 ký tự" required minLength={8}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nhập lại mật khẩu mới</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                placeholder="Nhập lại cho chắc" required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1D9E75]/30" />
            </div>

            {error   && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm font-medium">{success}</p>}

            <button type="submit" disabled={loading || !password || !confirm}
              className="w-full bg-[#0d2b1a] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#1D9E75] transition-colors disabled:opacity-50">
              {loading ? 'Đang lưu...' : 'Lưu mật khẩu mới'}
            </button>
          </form>
        </div>

        {/* Security tip */}
        <div className="flex items-start gap-3 px-1">
          <Shield size={15} className="text-gray-300 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-400 leading-relaxed">
            Bạn cũng có thể đăng nhập bằng magic link qua email bất kỳ lúc nào mà không cần nhớ mật khẩu.
          </p>
        </div>

        {/* Sign out */}
        <button
          onClick={() => supabase!.auth.signOut().then(() => router.push('/portal/login'))}
          className="w-full text-center text-sm text-gray-400 hover:text-red-500 transition-colors py-2"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  )
}
