"use client"
export function getImage(size: string, path: string | null) {
    if (!path) return ""
    return `https://image.tmdb.org/t/p/${size}/${path}`
}