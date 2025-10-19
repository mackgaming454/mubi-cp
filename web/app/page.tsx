import CarouselSection from "@/components/CarouselSection"
import HeroSection from "@/components/HeroSection"
import Config from "@/lib/config"

const movieCategories = [
  { key: "nowPlaying", title: "Now Playing", endpoint: "/api/movies" },
  { key: "upcoming", title: "Upcoming", endpoint: "/api/movies/upcoming" },
  { key: "trending", title: "Trending", endpoint: "/api/movies/trending" },
  { key: "topMovies", title: "TOP 20", endpoint: "/api/movies/popular" },
  { key: "topRated", title: "Top Rated", endpoint: "/api/movies/top_rated" },
]

async function fetchMovies(endpoint: string) {
  try {
    const res = await fetch(`${Config.baseUrl}${endpoint}`, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error("Failed to fetch")
    const data = await res.json()
    return data.results || []
  } catch (e) {
    console.error(e)
    return []
  }
}

export default async function Home() {
  const results = await Promise.all(
    movieCategories.map(cat => fetchMovies(cat.endpoint))
  )

  const moviesByCategory: Record<string, Movie[]> = {}
  movieCategories.forEach((cat, idx) => {
    moviesByCategory[cat.key] = results[idx]
  })
  
  const movieOTW: Movie | undefined = moviesByCategory.nowPlaying[0]
  
  return (
    <main className="absolute top-0 left-0 w-full min-h-screen">
      <HeroSection movie={movieOTW} />
      <div className="container mx-auto px-4 md:px-0 py-8 flex flex-col space-y-12">
        {movieCategories.map((cat) => (
          <CarouselSection
            key={cat.key}
            title={cat.title}
            movies={moviesByCategory[cat.key]}
          />
        ))}
      </div>
    </main>
  );
}
