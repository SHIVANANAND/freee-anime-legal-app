import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FreeAnime - Watch Your Favorite Anime',
  description: 'Watch anime online for free with FreeAnime - the best anime streaming platform',
  keywords: ['anime', 'streaming', 'watch anime', 'free anime', 'anime online'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-anime-bg">
          {children}
        </div>
      </body>
    </html>
  )
}