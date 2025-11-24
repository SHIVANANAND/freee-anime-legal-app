'use client'

import { User } from 'lucide-react'
import { cn } from '@/lib/utils'
import logo from '@/app/splash/freeAnimeLogo.png'

interface TopBarProps {
  className?: string
}

export function TopBar({ className }: TopBarProps) {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full bg-anime-bg/95 backdrop-blur supports-[backdrop-filter]:bg-anime-bg/75 border-b border-anime-border safe-top",
      className
    )}>
      <div className="container flex h-16 items-center justify-between px-4 safe-left safe-right">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center overflow-hidden">
            <img
              src={logo.src}
              alt="FreeAnime Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-xl font-bold gradient-text">
            FreeAnime
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button className="w-8 h-8 rounded-full bg-anime-card hover:bg-anime-primary/20 transition-colors duration-300 flex items-center justify-center group">
            <User className="w-4 h-4 text-anime-text-secondary group-hover:text-anime-primary transition-colors" />
          </button>
        </div>
      </div>
    </header>
  )
}