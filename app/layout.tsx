import type { Metadata } from 'next'
import Script from 'next/script'
import { ToastProvider } from '@/components/ui/Toast'
import CookieConsent from '@/components/ui/CookieConsent'
import PageViewTracker from '@/components/PageViewTracker'
import './globals.css'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

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
        {PIXEL_ID && (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">{`
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
              document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${PIXEL_ID}');
              fbq('track','PageView');
            `}</Script>
            <noscript>
              <img height="1" width="1" style={{display:'none'}}
                src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        )}
        <ToastProvider>
          {children}
          <CookieConsent />
          <PageViewTracker />
        </ToastProvider>
      </body>
    </html>
  )
}
