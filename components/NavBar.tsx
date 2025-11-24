'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Bookmark, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  icon: React.ElementType
  label: string
  isCenter?: boolean
}

const navItems: NavItem[] = [
  {
    href: '/home',
    icon: Home,
    label: 'Home',
  },
  {
    href: '/bookmarks',
    icon: Bookmark,
    label: 'Bookmarks',
  },
  {
    href: '/search',
    icon: Search,
    label: 'Search',
    isCenter: true,
  },
]

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-anime-bg/95 backdrop-blur-lg border-t border-anime-border safe-bottom">
      <div className="flex items-center justify-around px-4 py-2 safe-left safe-right">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-300",
                item.isCenter ? "scale-110" : "",
                isActive 
                  ? "text-anime-primary" 
                  : "text-anime-text-secondary hover:text-anime-primary"
              )}
            >
              <motion.div
                className={cn(
                  "p-2 rounded-full transition-all duration-300",
                  isActive 
                    ? "bg-anime-primary/20" 
                    : "hover:bg-anime-card"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className={cn(
                  "w-6 h-6 transition-colors duration-300",
                  item.isCenter ? "w-7 h-7" : ""
                )} />
              </motion.div>
              
              <span className={cn(
                "text-xs font-medium transition-colors duration-300",
                item.isCenter ? "text-anime-primary font-semibold" : "",
                isActive ? "text-anime-primary" : ""
              )}>
                {item.label}
              </span>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute -bottom-2 w-1 h-1 bg-anime-primary rounded-full"
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}