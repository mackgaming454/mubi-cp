import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query')
    const type = searchParams.get('type') || 'multi' // multi, movie, tv

    if (!query) {
        return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    try {
        let endpoint = ''
        
        if (type === 'movie') {
            endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
        } else if (type === 'tv') {
            endpoint = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
        } else {
            // multi search (movies and TV shows)
            endpoint = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
        }

        const res = await fetch(endpoint)

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to search" }, { status: 500 })
        }

        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error searching:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
