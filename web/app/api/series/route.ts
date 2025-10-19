import { NextResponse } from "next/server"

export async function GET() {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    )

    if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch series" }, { status: 500 })
    }

    const data = await res.json()
    return NextResponse.json(data)
}
