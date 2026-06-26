import type { Metadata } from 'next'
import { ToastProvider } from '@/components/ui/Toast'
import CookieConsent from '@/components/ui/CookieConsent'
import PageViewTracker from '@/components/PageViewTracker'
import './globals.css'

export const metadata: Metadata = {
  title: 'DungHoang.com - Nền Tảng All-In-One',
  description: 'Bộ 24 AI agent giúp solopreneur tự vận hành hệ thống bán hàng mà không cần thuê đội ngũ.',
  metadataBase: new URL('https://www.dunghoang.com'),
  openGraph: {
    title: '24 AI Agent for Business — DungHoang.com',
    description: 'Mỗi skill thay 1 nhân sự. Cả bộ thay cả đội. 24 AI agent giúp solopreneur tự vận hành hệ thống bán hàng.',
    url: 'https://www.dunghoang.com',
    siteName: 'DungHoang.com',
    locale: 'vi_VN',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-background text-text-primary antialiased">
        <ToastProvider>
          {children}
          <CookieConsent />
          <PageViewTracker />
        </ToastProvider>
      </body>
    </html>
  )
}
