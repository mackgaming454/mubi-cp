import { NextResponse } from "next/server"

// the base route gets the now playing movies
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const time_window = searchParams.get('time') || 'day'
    const lang = searchParams.get('lang') || 'en-US'
    try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/all/${time_window}?api_key=${process.env.TMDB_API_KEY}&language=${lang}`)

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 })
        }

        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching now playing movies:', error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}