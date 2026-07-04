import Link from 'next/link'

export default function FloatingButtons() {
  return (
    <>
      <Link
        href="https://t.me/KentHoang"
        target="_blank"
        rel="noopener noreferrer"
        title="Nhắn Telegram @KentHoang"
        className="fixed right-4 bottom-36 z-50 w-12 h-12 bg-[#229ED9] hover:bg-[#1a8fc0] rounded-full flex items-center justify-center shadow-lg transition-colors"
      >
        <span className="text-white font-bold text-xs">TG</span>
      </Link>
      <Link
        href="https://zalo.me/0938725413"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat Zalo 0938725413"
        className="fixed right-4 bottom-20 z-50 w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
      >
        <span className="text-white font-bold text-xs">Zalo</span>
      </Link>
    </>
  )
}
