'use client'

import { motion } from 'framer-motion'
import { Play, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroBannerProps {
  id: string
  title: string
  description: string
  image: string
  episodeCount?: number
  onWatchNow?: (id: string) => void
  onMoreInfo?: (id: string) => void
  className?: string
}

export function HeroBanner({
  id,
  title,
  description,
  image,
  episodeCount,
  onWatchNow,
  onMoreInfo,
  className
}: HeroBannerProps) {
  const router = useRouter()

  const handleWatchNow = () => {
    if (onWatchNow) {
      onWatchNow(id)
    } else {
      router.push(`/anime/${id}`)
    }
  }

  const handleMoreInfo = () => {
    if (onMoreInfo) {
      onMoreInfo(id)
    } else {
      router.push(`/anime/${id}`)
    }
  }

  return (
    <div className={cn("relative w-full h-80 md:h-96 rounded-xl overflow-hidden", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md"
        >
          {/* Badge */}
          {episodeCount && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-3"
            >
              <span className="px-2 py-1 bg-anime-card/80 text-anime-text text-xs font-medium rounded">
                {episodeCount} episodes
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-white mb-3 line-clamp-2"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300 text-sm md:text-base mb-6 line-clamp-3"
          >
            {description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center space-x-3"
          >
            <Button
              onClick={handleWatchNow}
              variant="anime"
              size="lg"
              className="flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Watch Now</span>
            </Button>

            {/* <Button
              onClick={handleMoreInfo}
              variant="outline"
              size="lg"
              className="flex items-center space-x-2 border-white/20 text-white hover:bg-white/10"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </Button> */}
          </motion.div>
        </motion.div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-anime-primary/10 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}