'use client'

import { useState, useEffect } from 'react'
import { Bookmark, Trash2 } from 'lucide-react'
import { TopBar } from '@/components/TopBar'
import { AnimeCard } from '@/components/AnimeCard'
import { NavBar } from '@/components/NavBar'
import { getAllSeries } from '@/data/animeData'
import { Series } from '@/data/types'

export default function BookmarksPage() {
  const [bookmarkedSeries, setBookmarkedSeries] = useState<string[]>([])
  const [bookmarkedSeriesList, setBookmarkedSeriesList] = useState<Series[]>([])

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('freeanime-bookmarks')
    if (saved) {
      const savedBookmarks = JSON.parse(saved)
      setBookmarkedSeries(savedBookmarks)

      // Get the full series objects for the bookmarked IDs
      const seriesObjects = getAllSeries().filter(series => savedBookmarks.includes(series.id))
      setBookmarkedSeriesList(seriesObjects)
    }
  }, [])

  const handleBookmark = (seriesId: string) => {
    const updatedBookmarks = bookmarkedSeries.filter(id => id !== seriesId)

    setBookmarkedSeries(updatedBookmarks)
    setBookmarkedSeriesList(getAllSeries().filter(series => updatedBookmarks.includes(series.id)))
    localStorage.setItem('freeanime-bookmarks', JSON.stringify(updatedBookmarks))
  }

  const clearAllBookmarks = () => {
    setBookmarkedSeries([])
    setBookmarkedSeriesList([])
    localStorage.removeItem('freeanime-bookmarks')
  }

  return (
    <div className="min-h-screen bg-anime-bg">
      <TopBar />
      
      <main className="pb-20">
        <div className="container px-4 space-y-6">
          {/* Header */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Bookmark className="w-6 h-6 text-anime-primary" />
                <h1 className="text-2xl font-bold text-anime-text">Bookmarks</h1>
              </div>
              
              {bookmarkedSeries.length > 0 && (
                <button
                  onClick={clearAllBookmarks}
                  className="flex items-center space-x-2 px-3 py-2 bg-anime-card hover:bg-red-500/20 text-anime-text-secondary hover:text-red-400 rounded-lg transition-colors duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm">Clear All</span>
                </button>
              )}
            </div>

            <p className="text-anime-text-secondary">
              {bookmarkedSeries.length > 0
                ? `${bookmarkedSeries.length} series in your bookmarks`
                : 'No bookmarks yet'
              }
            </p>
          </div>

          {/* Bookmarks Content */}
          {bookmarkedSeriesList.length > 0 ? (
            <div className="animate-fade-in">
              <div className="grid youtube-grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {bookmarkedSeriesList.map((series) => (
                  <div key={series.id} className="flex justify-center">
                    <AnimeCard
                      id={series.id}
                      title={series.title}
                      image={series.videos[0]?.thumbnail || ''}
                      episodeCount={series.episodeCount}
                      size="medium"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-32 h-32 bg-anime-card rounded-full flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-16 h-16 text-anime-text-secondary" />
              </div>
              
              <h3 className="text-xl font-semibold text-anime-text mb-3">
                No bookmarks yet
              </h3>
              
              <p className="text-anime-text-secondary mb-6 max-w-sm mx-auto">
                Start bookmarking anime you want to watch later. Click the bookmark icon on any anime card.
              </p>
              
              <button
                onClick={() => window.location.href = '/home'}
                className="button-primary inline-flex items-center space-x-2"
              >
                <Bookmark className="w-5 h-5" />
                <span>Browse Anime</span>
              </button>
            </div>
          )}

          {/* Recently Added (Suggested) */}
          {bookmarkedSeriesList.length > 0 && (
            <div className="animate-fade-in">
              <h2 className="section-title mb-4">You might also like</h2>
              <div className="grid youtube-grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {getAllSeries()
                  .filter(series => !bookmarkedSeries.includes(series.id))
                  .slice(0, 5)
                  .map((series) => (
                    <div key={series.id} className="flex justify-center">
                      <AnimeCard
                        id={series.id}
                        title={series.title}
                        image={series.videos[0]?.thumbnail || ''}
                        episodeCount={series.episodeCount}
                        size="small"
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <NavBar />
    </div>
  )
}