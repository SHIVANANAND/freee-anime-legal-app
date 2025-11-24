'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Tag {
  id: string
  label: string
}

interface TagRibbonProps {
  tags: Tag[]
  activeTag: string
  onTagChange: (tagId: string) => void
  className?: string
}

export function TagRibbon({ tags, activeTag, onTagChange, className }: TagRibbonProps) {
  return (
    <div className={cn("py-4", className)}>
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {tags.map((tag, index) => {
          const isActive = activeTag === tag.id
          
          return (
            <motion.button
              key={tag.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onTagChange(tag.id)}
              className={cn(
                "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 snap-start",
                isActive 
                  ? "tag-active" 
                  : "tag-inactive"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag.label}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}