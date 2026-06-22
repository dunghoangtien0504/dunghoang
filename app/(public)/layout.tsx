import MetaPixel from '@/components/MetaPixel'
import AffiliateTracker from '@/components/AffiliateTracker'
import SiteNav from '@/components/SiteNav'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MetaPixel />
      <AffiliateTracker />
      <SiteNav />
      {children}
    </>
  )
}
