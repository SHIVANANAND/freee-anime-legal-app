export interface Episode {
  title: string
  link: string
  thumbnail: string
}

export interface Series {
  id: string
  channel: string
  title: string
  description: string
  link: string
  videos: Episode[]
  language: 'hindi' | 'english'
  dubOrSub: 'dub' | 'sub'
  episodeCount: number
}

export interface CategoryData {
  hindiDub: Series[]
  englishDub: Series[]
  hindiSub: Series[]
  englishSub: Series[]
}

export interface BookmarkItem {
  seriesId: string
  addedAt: string
}