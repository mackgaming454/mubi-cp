'use client'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getImage } from "@/lib/tmdb"

export function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div className="relative w-48 h-72 m-2 group">
            <Link href={`/movies/${movie.id}`} className="absolute inset-0 z-20 sm:hidden block" />
            <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-md">
                <Image
                    src={getImage('w342', movie.poster_path) || '/movie_artwork.webp'}
                    alt="Movie Poster"
                    fill
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 30vw, 23vw"
                    className="object-cover"
                    priority
                />
            </div>
            <div className="hover:opacity-100 opacity-0 transition-opacity duration-300 absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center p-4 z-10">
                <h2 className="mt-2 text-lg font-semibold">{movie.title || "Movie Title"}</h2>
                <p className="text-sm text-gray-500">{new Date(movie.release_date).getFullYear() || "2025"}</p>
                <Link href={`/movies/${movie.id}`}>
                    <Button className="mt-2 w-full">View Details</Button>
                </Link>
            </div>
        </div>
    );
}