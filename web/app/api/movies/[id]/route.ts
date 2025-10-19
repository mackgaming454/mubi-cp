import { NextResponse } from "next/server"

export async function GET( _req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    try {
        // Fetch movie details
        const movieRes = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        )

        if (!movieRes.ok) {
            return NextResponse.json({ error: "Failed to fetch movie details" }, { status: 500 })
        }

        const movieData = await movieRes.json()

        // Fetch movie credits (cast & crew)
        const creditsRes = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`
        )

        let credits = { cast: [], crew: [] }
        if (creditsRes.ok) {
            credits = await creditsRes.json()
        }

        // Fetch similar movies
        const similarRes = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
        )

        let similar = { results: [] }
        if (similarRes.ok) {
            similar = await similarRes.json()
        }

        // Fetch videos (trailers, teasers, etc.)
        const videosRes = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        )

        let videos = { results: [] }
        if (videosRes.ok) {
            videos = await videosRes.json()
        }

        return NextResponse.json({
            ...movieData,
            credits,
            similar: similar.results,
            videos: videos.results
        })
    } catch (error) {
        console.error('Error fetching movie details:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
