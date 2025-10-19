import { NextResponse } from "next/server"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    try {
        // Fetch series details
        const seriesRes = await fetch(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        )

        if (!seriesRes.ok) {
            return NextResponse.json({ error: "Failed to fetch series details" }, { status: 500 })
        }

        const seriesData = await seriesRes.json()

        // Fetch series credits (cast & crew)
        const creditsRes = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.TMDB_API_KEY}`
        )

        let credits = { cast: [], crew: [] }
        if (creditsRes.ok) {
            credits = await creditsRes.json()
        }

        // Fetch similar series
        const similarRes = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
        )

        let similar = { results: [] }
        if (similarRes.ok) {
            similar = await similarRes.json()
        }

        // Fetch videos (trailers, teasers, etc.)
        const videosRes = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        )

        let videos = { results: [] }
        if (videosRes.ok) {
            videos = await videosRes.json()
        }

        return NextResponse.json({
            ...seriesData,
            credits,
            similar: similar.results,
            videos: videos.results
        })
    } catch (error) {
        console.error('Error fetching series details:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
