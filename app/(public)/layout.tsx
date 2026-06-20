import MetaPixel from '@/components/MetaPixel'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MetaPixel />
      {children}
    </>
  )
}
