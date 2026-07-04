import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '24 AI Agent for Business — DungHoang.com',
  description: '24 AI agent thực chiến thay 24 nhân sự. 605+ solopreneur đã tiết kiệm 4-5h/ngày. 868.686đ, bảo hành 14 ngày hoàn 100%.',
  openGraph: {
    title: '24 AI Agent for Business — DungHoang.com',
    description: '24 AI agent thực chiến thay 24 nhân sự. 605+ solopreneur đã tiết kiệm 4-5h/ngày.',
    url: 'https://www.dunghoang.com/24-ai-agent',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
