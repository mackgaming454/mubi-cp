interface Movie {
    id: number
    title: string
    overview: string
    poster_path: string
    backdrop_path: string
    vote_average: number
    release_date: string
    // App specific fields
    categories?: string[]
}

interface MovieDetails {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  release_date: string
  runtime: number
  genres: { id: number; name: string }[]
  tagline: string
  budget: number
  revenue: number
  status: string
  original_language: string
  production_companies: { id: number; name: string; logo_path: string }[]
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string }[]
    crew: { id: number; name: string; job: string; profile_path: string }[]
  }
  similar: {
    id: number
    title: string
    poster_path: string
    vote_average: number
  }[]
  videos: {
    id: string
    key: string
    name: string
    site: string
    type: string
  }[]
}