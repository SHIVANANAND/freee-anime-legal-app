'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, Filter } from 'lucide-react'
import { TopBar } from '@/components/TopBar'
import { SectionRow } from '@/components/SectionRow'
import { AnimeCard } from '@/components/AnimeCard'
import { NavBar } from '@/components/NavBar'
import { getAllSeries } from '@/data/animeData'
import { Series } from '@/data/types'
import { debounce } from '@/lib/utils'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [bookmarkedAnime, setBookmarkedAnime] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('freeanime-bookmarks')
    if (saved) {
      setBookmarkedAnime(JSON.parse(saved))
    }
  }, [])

  // Debounced search function
  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      setIsSearching(false)
    }, 300),
    []
  )

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setIsSearching(true)
    debouncedSearch(query)
  }

  const filteredSeries = useMemo(() => {
    if (!searchQuery.trim()) return getAllSeries()

    const normalizeText = (text: string) => {
      return text
        .toLowerCase()
        .replace(/['']/g, '') // Remove apostrophes
        .replace(/[^\w\s]/g, ' ') // Replace special chars with spaces
        .replace(/\s+/g, ' ') // Normalize multiple spaces
        .trim()
    }

    const normalizedQuery = normalizeText(searchQuery)
    const queryWords = normalizedQuery.split(' ').filter(word => word.length > 0)

    return getAllSeries().filter(series => {
      const normalizedTitle = normalizeText(series.title)
      const normalizedDesc = normalizeText(series.description || '')

      // Check if all query words are present in title or description
      return queryWords.every(word =>
        normalizedTitle.includes(word) || normalizedDesc.includes(word)
      )
    })
  }, [searchQuery])

  const handleBookmark = (seriesId: string) => {
    const updatedBookmarks = bookmarkedAnime.includes(seriesId)
      ? bookmarkedAnime.filter(id => id !== seriesId)
      : [...bookmarkedAnime, seriesId]

    setBookmarkedAnime(updatedBookmarks)
    localStorage.setItem('freeanime-bookmarks', JSON.stringify(updatedBookmarks))
  }


  return (
    <div className="min-h-screen bg-anime-bg">
      <TopBar />
      
      <main className="pb-20">
        <div className="container px-4 space-y-6">
          {/* Search Header */}
          <div className="pt-4">
            <h1 className="text-2xl font-bold text-anime-text mb-4">Search</h1>
            
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-anime-text-secondary" />
              </div>
              <input
                type="text"
                placeholder="Search anime by title or description..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-anime-card border border-anime-border rounded-xl text-anime-text placeholder-anime-text-secondary focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-transparent transition-all duration-300"
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="w-5 h-5 border-2 border-anime-primary/30 border-t-anime-primary rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Search Results or Default Content */}
          {searchQuery.trim() ? (
            <div className="animate-fade-in">
              {filteredSeries.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="section-title">
                      Search Results ({filteredSeries.length})
                    </h2>
                    <button className="flex items-center space-x-2 text-anime-text-secondary hover:text-anime-primary transition-colors">
                      <Filter className="w-4 h-4" />
                      <span className="text-sm">Filters</span>
                    </button>
                  </div>

                  <div className="grid youtube-grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                    {filteredSeries.map((series) => (
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
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-anime-card rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-anime-text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-anime-text mb-2">
                    No results found
                  </h3>
                  <p className="text-anime-text-secondary">
                    Try searching for something else
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-anime-card rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-anime-text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-anime-text mb-2">
                Search for anime
              </h3>
              <p className="text-anime-text-secondary">
                Type in the search bar above to find your favorite anime series
              </p>
            </div>
          )}
        </div>
      </main>

      <NavBar />
    </div>
  )
}