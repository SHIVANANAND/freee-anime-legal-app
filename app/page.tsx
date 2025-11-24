'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to splash screen
    const timer = setTimeout(() => {
      router.push('/splash')
    }, 100)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-anime-bg flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-32 h-32 bg-anime-primary/20 rounded-full animate-glow"></div>
      </div>
    </div>
  )
}