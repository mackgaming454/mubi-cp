import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const tmdbId = searchParams.get('tmdb')

    if (!tmdbId) {
        return NextResponse.json({ error: "TMDB ID is required" }, { status: 400 })
    }

    const embedUrl = `https://vidsrc-embed.ru/embed/movie?tmdb=${tmdbId}`

    return NextResponse.json({ embedUrl })
}
