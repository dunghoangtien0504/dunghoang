import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Setup Meta AI Agent — DungHoang.com',
  description: 'Cài AI trả lời tự động cho Messenger Fanpage. Không cần code. Setup 30 phút, AI chạy 24/7. Chỉ 99.000đ.',
  openGraph: {
    title: 'Setup Meta AI Agent — DungHoang.com',
    description: 'AI trả lời tự động Messenger 24/7. Setup 30 phút, không cần code. 99.000đ.',
    url: 'https://www.dunghoang.com/meta-ai-agent',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
