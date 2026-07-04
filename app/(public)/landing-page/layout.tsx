import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Landing Page Siêu Chuyển Đổi — DungHoang.com',
  description: 'Tự dựng landing page thật không cần biết code. Vibe Coding + 8 skill files sẵn có. 10 buổi thực hành, kết khóa có trang bán hàng chạy thật. 686.868đ.',
  openGraph: {
    title: 'Landing Page Siêu Chuyển Đổi — DungHoang.com',
    description: 'Tự dựng landing page thật không cần biết code. Vibe Coding + 8 skill files. 686.868đ.',
    url: 'https://www.dunghoang.com/landing-page',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
