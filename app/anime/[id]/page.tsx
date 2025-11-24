import { getSeriesById, getAllSeries } from '@/data/animeData'
import AnimeDetailClient from './client'

export async function generateStaticParams() {
  const series = getAllSeries()

  return series.map((series) => ({
    id: series.id,
  }))
}

export default function AnimeDetailPage() {
  return <AnimeDetailClient />
}