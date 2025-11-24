'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Play, BookmarkPlus, BookmarkCheck, Share2, ChevronDown, ChevronUp } from 'lucide-react'
import { TopBar } from '@/components/TopBar'
import { AnimeCard } from '@/components/AnimeCard'
import { NavBar } from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import { getSeriesById, getAllSeries } from '@/data/animeData'
import { Series, Episode } from '@/data/types'

export default function AnimeDetailClient() {
  const params = useParams()
  const router = useRouter()
  const [series, setSeries] = useState<Series | null>(null)
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id && typeof params.id === 'string') {
      const seriesData = getSeriesById(params.id)

      setSeries(seriesData || null)

      // Set first episode as current if available
      if (seriesData && seriesData.videos.length > 0) {
        setCurrentEpisode(seriesData.videos[0])
      }

      // Check if bookmarked
      const saved = localStorage.getItem('freeanime-bookmarks')
      if (saved) {
        const bookmarks = JSON.parse(saved)
        setIsBookmarked(bookmarks.includes(params.id))
      }

      setLoading(false)
    }
  }, [params.id])

  const handleBookmark = () => {
    if (!series) return

    const saved = localStorage.getItem('freeanime-bookmarks')
    let bookmarks: string[] = []

    if (saved) {
      bookmarks = JSON.parse(saved)
    }

    if (isBookmarked) {
      bookmarks = bookmarks.filter(id => id !== series.id)
    } else {
      bookmarks.push(series.id)
    }

    localStorage.setItem('freeanime-bookmarks', JSON.stringify(bookmarks))
    setIsBookmarked(!isBookmarked)
  }

  const handleEpisodeClick = (episode: Episode) => {
    setCurrentEpisode(episode)
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-anime-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-anime-primary/30 border-t-anime-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!series) {
    return (
      <div className="min-h-screen bg-anime-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-anime-text mb-4">Series not found</h2>
          <Button onClick={() => router.push('/home')} variant="anime">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-anime-bg">
      <TopBar />

      <main className="pb-20">
        {/* Video Player Section */}
        {currentEpisode && (
          <div className="relative bg-black">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${currentEpisode.link.split('v=')[1]}`}
                title={currentEpisode.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Series Info Header */}
        <div className="bg-anime-card p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-anime-text mb-2">{series.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-anime-text-secondary mb-4">
                <span>{series.episodeCount} episodes</span>
                <span className="capitalize">{series.language} {series.dubOrSub}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="p-2 bg-anime-bg hover:bg-anime-primary/20 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-anime-text-secondary hover:text-anime-primary" />
              </button>
              <button
                onClick={handleBookmark}
                className="p-2 bg-anime-bg hover:bg-anime-primary/20 rounded-full transition-colors"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-anime-primary" />
                ) : (
                  <BookmarkPlus className="w-5 h-5 text-anime-text-secondary hover:text-anime-primary" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="container px-4 space-y-8">
          {/* Series Info */}
          <div className="animate-fade-in">
            <div className="max-w-4xl">
              {/* Description */}
              {series.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-anime-text mb-3">Synopsis</h3>
                  <p className="text-anime-text-secondary leading-relaxed">
                    {series.description}
                  </p>
                </div>
              )}

              {/* Details */}
              <div className="bg-anime-card rounded-xl p-4">
                <h4 className="font-semibold text-anime-text mb-3">Details</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-anime-text-secondary block">Episodes</span>
                    <span className="text-anime-text font-medium">{series.episodeCount}</span>
                  </div>
                  <div>
                    <span className="text-anime-text-secondary block">Channel</span>
                    <span className="text-anime-text font-medium">{series.channel}</span>
                  </div>
                  <div>
                    <span className="text-anime-text-secondary block">Language</span>
                    <span className="text-anime-text font-medium capitalize">{series.language}</span>
                  </div>
                  <div>
                    <span className="text-anime-text-secondary block">Type</span>
                    <span className="text-anime-text font-medium capitalize">{series.dubOrSub}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Episodes */}
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-anime-text mb-4">Episodes</h2>

            {series.videos.length > 0 ? (
              <div className="bg-anime-card rounded-xl overflow-hidden">
                {series.videos.map((episode, index) => (
                  <div
                    key={index}
                    onClick={() => handleEpisodeClick(episode)}
                    className={`flex items-center p-4 hover:bg-anime-card-hover transition-colors cursor-pointer ${
                      currentEpisode?.link === episode.link ? 'bg-anime-primary/10 border-l-4 border-anime-primary' : ''
                    }`}
                  >
                    <div className="w-32 h-20 bg-anime-bg rounded-lg overflow-hidden mr-4 landscape-card">
                      <img
                        src={episode.thumbnail}
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-anime-text mb-1">
                        Episode {index + 1}: {episode.title}
                      </h4>
                    </div>
                    <button className="p-2 hover:bg-anime-primary/20 rounded-full transition-colors">
                      <Play className="w-5 h-5 text-anime-primary" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-anime-text-secondary">No episodes available</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <NavBar />
    </div>
  )
}