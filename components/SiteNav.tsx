import Link from 'next/link'

export default function SiteNav() {
  return (
    <header className="border-b border-[#DDD8CB] bg-[#F6F0E4]/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#0D2B1A] flex items-center justify-center">
            <span className="text-[#F6F0E4] font-bold text-sm font-mono">DH</span>
          </div>
          <span className="font-bold text-[#0D2B1A] text-sm">DungHoang.com</span>
        </Link>

        {/* Nav links — hidden on small screens */}
        <nav className="hidden sm:flex items-center gap-1">
          <Link href="/khoa-1-ban-tu-lap"
            className="text-sm text-[#3D6B4A] font-medium px-3 py-1.5 rounded-lg hover:bg-[#EAF5EF] hover:text-[#0D2B1A] transition-colors">
            Khóa học
          </Link>
          <Link href="/bi-quyet-7-ngay"
            className="text-sm text-[#3D6B4A] font-medium px-3 py-1.5 rounded-lg hover:bg-[#EAF5EF] hover:text-[#0D2B1A] transition-colors">
            Thử thách
          </Link>
          <Link href="/tin-tuc"
            className="text-sm text-[#3D6B4A] font-medium px-3 py-1.5 rounded-lg hover:bg-[#EAF5EF] hover:text-[#0D2B1A] transition-colors">
            Tin tức
          </Link>
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2">
          <Link href="/thu-thach-7-ngay"
            className="hidden sm:inline-flex text-sm font-semibold text-white bg-[#C0390E] hover:bg-[#A0300B] px-3 py-1.5 rounded-lg transition-colors">
            Thử miễn phí
          </Link>
          <Link href="/portal"
            className="text-sm text-[#7A8C7E] hover:text-[#3D6B4A] transition-colors px-2 py-1.5">
            Đăng nhập
          </Link>
        </div>

      </div>
    </header>
  )
}
