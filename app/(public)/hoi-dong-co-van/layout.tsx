import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hội Đồng Cố Vấn AI — DungHoang.com',
  description: '5 giám đốc AI (CEO/CFO/CMO/CCO/CHRO) + 24 nhân viên AI + quy trình vận hành tuần. Quyết định đúng hơn, một mình vận hành cả công ty. 2.868.686đ trả 1 lần.',
  openGraph: {
    title: 'Hội Đồng Cố Vấn AI — DungHoang.com',
    description: '5 giám đốc AI + 24 nhân viên AI. Không quyết định một mình nữa. 2.868.686đ trả 1 lần.',
    url: 'https://www.dunghoang.com/hoi-dong-co-van',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
