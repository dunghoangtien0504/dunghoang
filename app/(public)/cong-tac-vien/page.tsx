'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CongTacVienPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/portal/cong-tac-vien')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F6F0E4]">
      <div className="w-6 h-6 border-2 border-[#1D9E75] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

