'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Page() {
  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/signin')
      return
    }

    const redirectPath = auth.getRedirectPath()
    router.push(redirectPath)
  }, [router, auth])

  return (
    <div className='text-2xl font-bold text-center mt-10 dark:text-white'>
      Redirecting to your dashboard...
    </div>
  )
}
