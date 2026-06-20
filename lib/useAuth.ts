'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export function useAuth(redirectIfNoAuth = true) {
  const router = useRouter()
  const [user, setUser]       = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase!.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null
      setUser(u)
      if (!u && redirectIfNoAuth) router.replace('/hoc-vien/login')
      setLoading(false)
    })

    const { data: sub } = supabase!.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null
      setUser(u)
      if (!u && redirectIfNoAuth) router.replace('/hoc-vien/login')
    })
    return () => sub.subscription.unsubscribe()
  }, [router, redirectIfNoAuth])

  return { user, loading }
}
