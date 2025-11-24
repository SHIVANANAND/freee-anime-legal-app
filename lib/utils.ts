import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generatePlaceholderImage(width: number, height: number, text: string) {
  return `https://placehold.co/${width}x${height}/32ff84/0b0f0c?text=${encodeURIComponent(text)}`
}

export function generateAnimeImage(width: number, height: number, animeTitle: string) {
  return `https://placehold.co/${width}x${height}/32ff84/0b0f0c?text=${encodeURIComponent(animeTitle)}`
}

export function generateAnimeLandscapeImage(width: number, height: number, animeTitle: string) {
  // Generate landscape image with anime-style formatting
  const text = encodeURIComponent(animeTitle.replace(/\s+/g, '\n'))
  return `https://placehold.co/${width}x${height}/32ff84/0b0f0c?text=${text}&font=roboto`
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours > 0) {
    return `${hours}h ${mins}m`
  }
  return `${mins}m`
}

export function formatViews(views: number): string {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`
  }
  return views.toString()
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}