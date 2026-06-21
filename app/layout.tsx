import type { Metadata } from 'next'
import { ToastProvider } from '@/components/ui/Toast'
import CookieConsent from '@/components/ui/CookieConsent'
import './globals.css'

export const metadata: Metadata = {
  title: 'DungHoang.com - Nền Tảng All-In-One',
  description: 'Nền tảng bán khóa học, quản lý học viên, email marketing và CRM tất cả trong một.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="bg-background text-text-primary antialiased">
        <ToastProvider>
          {children}
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  )
}
