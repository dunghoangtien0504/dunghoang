'use client'

import { useEffect } from 'react'
import { RefreshCw, Home, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // TODO: log to error tracking (Sentry, etc.)
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <div className="min-h-dvh bg-background flex items-center justify-center p-6">
      <div className="text-center max-w-md space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-danger-light border border-danger/20 flex items-center justify-center mx-auto">
          <AlertTriangle size={28} className="text-danger" strokeWidth={1.5} />
        </div>

        <div className="space-y-2">
          <h1 className="text-text-primary font-bold text-2xl">Co loi xay ra</h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            Mot loi khong mong doi da xay ra. Vui long thu lai hoac quay ve trang chu.
          </p>
          {error?.digest && (
            <p className="text-text-muted text-xs font-mono">Error ID: {error.digest}</p>
          )}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button onClick={reset} className="btn-primary text-sm py-2.5 px-5">
            <RefreshCw size={14} /> Thu lai
          </button>
          <Link href="/admin" className="btn-secondary text-sm py-2.5 px-5">
            <Home size={14} /> Ve Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
