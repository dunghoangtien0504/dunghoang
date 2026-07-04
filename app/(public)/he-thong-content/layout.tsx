import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Không Cần Cảm Hứng — DungHoang.com',
  description: 'Workspace Notion + AI viết đúng giọng bạn. Gõ "viết bài" là có bài sẵn để đăng. 368.686đ, bảo hành 14 ngày.',
  openGraph: {
    title: 'Content Không Cần Cảm Hứng — DungHoang.com',
    description: 'Workspace Notion + AI viết đúng giọng bạn. Không bao giờ cạn ý tưởng. 368.686đ.',
    url: 'https://www.dunghoang.com/he-thong-content',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
