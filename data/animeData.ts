import { Series, CategoryData } from './types'
import hindiDubData from './hindiDub/hindiDub.json'
import englishDubData from './englishDub/englishDub.json'
import hindiSubData from './hindiSub/hindiSub.json'
import englishSubData from './englishSub/englishSub.json'

// Load data from JSON files
const loadCategoryData = (): CategoryData => {
  return {
    hindiDub: hindiDubData.hindiDub?.map((series: any, index: number) => ({
      ...series,
      id: `hindi-dub-${index}`,
      language: 'hindi' as const,
      dubOrSub: 'dub' as const,
      episodeCount: series.videos?.length || 0
    })) || [],
    englishDub: englishDubData.englishDub?.map((series: any, index: number) => ({
      ...series,
      id: `english-dub-${index}`,
      language: 'english' as const,
      dubOrSub: 'dub' as const,
      episodeCount: series.videos?.length || 0
    })) || [],
    hindiSub: hindiSubData.hindiSub?.map((series: any, index: number) => ({
      ...series,
      id: `hindi-sub-${index}`,
      language: 'hindi' as const,
      dubOrSub: 'sub' as const,
      episodeCount: series.videos?.length || 0
    })) || [],
    englishSub: englishSubData.englishSub?.map((series: any, index: number) => ({
      ...series,
      id: `english-sub-${index}`,
      language: 'english' as const,
      dubOrSub: 'sub' as const,
      episodeCount: series.videos?.length || 0
    })) || []
  }
}

const categoryData = loadCategoryData()

// Get all series
export const getAllSeries = (): Series[] => {
  return [
    ...categoryData.hindiDub,
    ...categoryData.englishDub,
    ...categoryData.hindiSub,
    ...categoryData.englishSub
  ]
}

// Get series by category
export const getSeriesByCategory = (category: string): Series[] => {
  switch (category) {
    case 'all':
      return getAllSeries()
    case 'hindi-dub':
      return categoryData.hindiDub
    case 'english-dub':
      return categoryData.englishDub
    case 'hindi-sub':
      return categoryData.hindiSub
    case 'english-sub':
      return categoryData.englishSub
    default:
      return []
  }
}

// Get series by ID
export const getSeriesById = (id: string): Series | undefined => {
  return getAllSeries().find(series => series.id === id)
}

// Get featured series (hindi-dub-14)
export const getFeaturedSeries = (): Series | undefined => {
  return getSeriesById('hindi-dub-14')
}

// Get first 6 series from each category for home page sections
export const getSeriesForHomeSections = () => {
  return {
    hindiDub: categoryData.hindiDub.slice(0, 6),
    englishDub: categoryData.englishDub.slice(0, 6),
    hindiSub: categoryData.hindiSub.slice(0, 6),
    englishSub: categoryData.englishSub.slice(0, 6)
  }
}