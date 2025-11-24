'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface SectionRowProps {
  title: string
  children: React.ReactNode
  className?: string
  onSeeAll?: () => void
}

export function SectionRow({ title, children, className, onSeeAll }: SectionRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300
      const currentScroll = scrollRef.current.scrollLeft
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">{title}</h2>

        {/* Navigation buttons */}
        <div className="flex items-center space-x-2">
          {onSeeAll && (
            <button
              onClick={onSeeAll}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-anime-primary/10 hover:bg-anime-primary/20 text-anime-primary rounded-full transition-colors duration-300"
            >
              <span>See All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-anime-card hover:bg-anime-primary/20 transition-colors duration-300 group"
          >
            <ChevronLeft className="w-5 h-5 text-anime-text-secondary group-hover:text-anime-primary transition-colors" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-anime-card hover:bg-anime-primary/20 transition-colors duration-300 group"
          >
            <ChevronRight className="w-5 h-5 text-anime-text-secondary group-hover:text-anime-primary transition-colors" />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}