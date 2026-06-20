'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { setCookie } from '@/lib/cookies'

function Tracker() {
  const params = useSearchParams()
  useEffect(() => {
    const ref = params.get('ref')
    if (ref) setCookie('dh_ref', ref.toUpperCase(), 30)
  }, [params])
  return null
}

export default function AffiliateTracker() {
  return (
    <Suspense>
      <Tracker />
    </Suspense>
  )
}
