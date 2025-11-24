'use client'

import { useState, useEffect } from 'react'
import { TopBar } from '@/components/TopBar'
import { TagRibbon } from '@/components/TagRibbon'
import { HeroBanner } from '@/components/HeroBanner'
import { SectionRow } from '@/components/SectionRow'
import { AnimeCard } from '@/components/AnimeCard'
import { NavBar } from '@/components/NavBar'
import { getAllSeries, getSeriesByCategory, getFeaturedSeries, getSeriesForHomeSections } from '@/data/animeData'
import { Series } from '@/data/types'

const categories = [
  { id: 'all', label: 'All' },
  { id: 'hindi-dub', label: 'Hindi Dub' },
  { id: 'english-dub', label: 'English Dub' },
  { id: 'hindi-sub', label: 'Hindi Sub' },
  { id: 'english-sub', label: 'English Sub' },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [bookmarkedSeries, setBookmarkedSeries] = useState<string[]>([])

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('freeanime-bookmarks')
    if (saved) {
      setBookmarkedSeries(JSON.parse(saved))
    }
  }, [])

  const handleBookmark = (seriesId: string) => {
    const updatedBookmarks = bookmarkedSeries.includes(seriesId)
      ? bookmarkedSeries.filter(id => id !== seriesId)
      : [...bookmarkedSeries, seriesId]

    setBookmarkedSeries(updatedBookmarks)
    localStorage.setItem('freeanime-bookmarks', JSON.stringify(updatedBookmarks))
  }

  const featuredSeries = getFeaturedSeries()
  const homeSections = getSeriesForHomeSections()

  return (
    <div className="min-h-screen bg-anime-bg">
      <TopBar />
      
      <main className="pb-20">
        {/* Tag Ribbon */}
        <div className="sticky top-16 z-40 bg-anime-bg/95 backdrop-blur">
          <TagRibbon
            tags={categories}
            activeTag={activeCategory}
            onTagChange={setActiveCategory}
          />
        </div>

        <div className="container px-4 space-y-8">
          {activeCategory === 'all' ? (
            <>
              {/* Featured Banner */}
              {featuredSeries && (
                <section className="animate-fade-in">
                  <HeroBanner
                    id={featuredSeries.id}
                    title={featuredSeries.title}
                    description={featuredSeries.description}
                    image={featuredSeries.videos[0]?.thumbnail || ''}
                    episodeCount={featuredSeries.episodeCount}
                  />
                </section>
              )}

              {/* Hindi Dub Section */}
              {homeSections.hindiDub.length > 0 && (
                <section className="animate-slide-in-left">
                  <SectionRow
                    title="Hindi Dub"
                    onSeeAll={() => setActiveCategory('hindi-dub')}
                  >
                    {homeSections.hindiDub.map((series) => (
                      <AnimeCard
                        key={series.id}
                        id={series.id}
                        title={series.title}
                        image={series.videos[0]?.thumbnail || ''}
                        episodeCount={series.episodeCount}
                        size="medium"
                      />
                    ))}
                  </SectionRow>
                </section>
              )}

              {/* English Dub Section */}
              {homeSections.englishDub.length > 0 && (
                <section className="animate-slide-in-right">
                  <SectionRow
                    title="English Dub"
                    onSeeAll={() => setActiveCategory('english-dub')}
                  >
                    {homeSections.englishDub.map((series) => (
                      <AnimeCard
                        key={series.id}
                        id={series.id}
                        title={series.title}
                        image={series.videos[0]?.thumbnail || ''}
                        episodeCount={series.episodeCount}
                        size="medium"
                      />
                    ))}
                  </SectionRow>
                </section>
              )}

              {/* Hindi Sub Section */}
              {homeSections.hindiSub.length > 0 && (
                <section className="animate-fade-in">
                  <SectionRow
                    title="Hindi Sub"
                    onSeeAll={() => setActiveCategory('hindi-sub')}
                  >
                    {homeSections.hindiSub.map((series) => (
                      <AnimeCard
                        key={series.id}
                        id={series.id}
                        title={series.title}
                        image={series.videos[0]?.thumbnail || ''}
                        episodeCount={series.episodeCount}
                        size="medium"
                      />
                    ))}
                  </SectionRow>
                </section>
              )}

              {/* English Sub Section */}
              {homeSections.englishSub.length > 0 && (
                <section className="animate-fade-in">
                  <SectionRow
                    title="English Sub"
                    onSeeAll={() => setActiveCategory('english-sub')}
                  >
                    {homeSections.englishSub.map((series) => (
                      <AnimeCard
                        key={series.id}
                        id={series.id}
                        title={series.title}
                        image={series.videos[0]?.thumbnail || ''}
                        episodeCount={series.episodeCount}
                        size="medium"
                      />
                    ))}
                  </SectionRow>
                </section>
              )}
            </>
          ) : (
            /* Category Specific View - Grid Layout */
            <section className="animate-fade-in">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-anime-text">
                  {categories.find(c => c.id === activeCategory)?.label} Series
                </h1>
                <p className="text-anime-text-secondary mt-2">
                  {getSeriesByCategory(activeCategory).length} series available
                </p>
              </div>

              <div className="grid youtube-grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                {getSeriesByCategory(activeCategory).map((series) => (
                  <div key={series.id} className="flex justify-center">
                    <AnimeCard
                      id={series.id}
                      title={series.title}
                      image={series.videos[0]?.thumbnail || ''}
                      episodeCount={series.episodeCount}
                      size="compact"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <NavBar />
    </div>
  )
}