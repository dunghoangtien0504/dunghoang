import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coaching — Cầm Tay Chỉ Việc — DungHoang.com',
  description: '24 AI agent + Dũng kèm sát 1-1 trong 30 ngày + Tiểu Hà Mã cài riêng cho business bạn. 3.868.686đ, cam kết kết quả.',
  openGraph: {
    title: 'Coaching Cầm Tay Chỉ Việc — DungHoang.com',
    description: 'Dũng ngồi cùng bạn 30 ngày, chỉ đúng chỗ cần fix. 3.868.686đ.',
    url: 'https://www.dunghoang.com/coaching',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
