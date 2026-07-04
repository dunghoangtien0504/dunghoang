import MetaPixel from '@/components/MetaPixel'
import AffiliateTracker from '@/components/AffiliateTracker'
import SiteNav from '@/components/SiteNav'
import FloatingButtons from '@/components/FloatingButtons'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MetaPixel />
      <AffiliateTracker />
      <SiteNav />
      {children}
      <FloatingButtons />
    </>
  )
}
