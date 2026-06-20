import MetaPixel from '@/components/MetaPixel'
import AffiliateTracker from '@/components/AffiliateTracker'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MetaPixel />
      <AffiliateTracker />
      {children}
    </>
  )
}
