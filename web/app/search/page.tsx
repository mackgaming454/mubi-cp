'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getImage } from '@/lib/tmdb'

interface SearchResult {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  release_date?: string
  first_air_date?: string
  media_type: string
}

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('multi')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!query.trim()) return

    setLoading(true)
    setSearched(true)

    try {
      const res = await fetch(
        `/api/search?query=${encodeURIComponent(query)}&type=${type}`
      )
      const data = await res.json()
      
      // Filter out people from multi search results
      const filteredResults = data.results?.filter(
        (item: SearchResult) => item.media_type !== 'person'
      ) || []
      
      setResults(filteredResults)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const getTitle = (item: SearchResult) => item.title || item.name || 'Untitled'
  const getYear = (item: SearchResult) => {
    const date = item.release_date || item.first_air_date
    return date ? new Date(date).getFullYear() : 'N/A'
  }
  const getMediaType = (item: SearchResult) => {
    if (type !== 'multi') return type === 'movie' ? 'movie' : 'series'
    return item.media_type === 'movie' ? 'movie' : 'series'
  }
  const getLink = (item: SearchResult) => {
    //const mediaType = getMediaType(item)
    //return mediaType === 'movie' ? `/movies/${item.id}` : `/series/${item.id}`
    return `/movies/${item.id}`
  }

  return (
    <main className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Search Movies & Series</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-12">
          <Input
            type="text"
            placeholder="Search for movies or series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg h-12"
          />
          
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full md:w-[180px] h-12">
              <SelectValue placeholder="Search type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multi">All</SelectItem>
              <SelectItem value="movie">Movies</SelectItem>
              <SelectItem value="tv">Series</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" size="lg" className="h-12 px-8" disabled={loading}>
            {loading ? '🔍 Searching...' : '🔍 Search'}
          </Button>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Searching...</p>
          </div>
        )}

        {/* No Results */}
        {!loading && searched && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No results found for "{query}"
            </p>
            <p className="text-muted-foreground mt-2">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <div>
            <p className="text-muted-foreground mb-6">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {results.map((item) => (
                <Link key={`${item.id}-${item.media_type}`} href={getLink(item)}>
                  <Card className="overflow-hidden hover:ring-2 hover:ring-primary transition-all cursor-pointer h-full">
                    <div className="relative aspect-[2/3] w-full">
                      {item.poster_path ? (
                        <Image
                          src={getImage('w500', item.poster_path)}
                          alt={getTitle(item)}
                          fill
                          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 30vw, 23vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <span className="text-4xl">
                            {getMediaType(item) === 'movie' ? '🎬' : '📺'}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-yellow-500 text-black rounded-lg px-2 py-1 text-xs font-bold">
                        ⭐ {item.vote_average.toFixed(1)}
                      </div>
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground rounded-lg px-2 py-1 text-xs font-bold uppercase">
                        {getMediaType(item)}
                      </div>
                    </div>
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm line-clamp-2">{getTitle(item)}</CardTitle>
                      <CardDescription className="text-xs">
                        {getYear(item)}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Initial State */}
        {!searched && !loading && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              Enter a search query to find movies and series
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
