'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface AnimeCardProps {
  id: string
  title: string
  image: string
  episodeCount?: number
  className?: string
  size?: 'small' | 'medium' | 'large' | 'compact'
}

export function AnimeCard({
  id,
  title,
  image,
  episodeCount,
  className,
  size = 'medium'
}: AnimeCardProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleCardClick = () => {
    router.push(`/anime/${id}`)
  }

  const sizeClasses = {
    small: 'w-full max-w-40 h-24 sm:max-w-48 sm:h-28 md:max-w-56 md:h-32',
    medium: 'w-full max-w-48 h-28 sm:max-w-56 sm:h-32 md:max-w-64 md:h-36',
    large: 'w-full max-w-56 h-32 sm:max-w-64 sm:h-36 md:max-w-72 md:h-40',
    compact: 'w-full max-w-36 h-20 sm:max-w-40 sm:h-24 md:max-w-44 md:h-26'
  }

  return (
    <motion.div
      className={cn(
        "relative group cursor-pointer anime-card-mobile",
        sizeClasses[size],
        size === 'small' && "anime-card-small-mobile",
        size === 'compact' && "compact-card",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-anime-card card-hover landscape-card">
        {/* Image */}
        <div className="relative w-full h-full landscape-card">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-anime-card animate-pulse" />
          )}
          <img
            src={image}
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Overlay - Strong gradient for text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Play Button */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 bg-anime-primary/90 rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-anime-bg ml-0.5" />
            </div>
          </motion.div>

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
            <h3 className="text-white font-semibold text-xs sm:text-sm line-clamp-2 mb-1">
              {title}
            </h3>
            
            {episodeCount && (
              <div className="text-xs text-gray-300">
                {episodeCount} episodes
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}