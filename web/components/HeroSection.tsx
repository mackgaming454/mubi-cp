'use client'
import { getImage } from "@/lib/tmdb";

export default function HeroSection({ movie }: { movie?: Movie }) {
  const bgImage = movie
    ? getImage('original', movie.backdrop_path || movie.poster_path)
    : '/movie_artwork.webp';
  return (
      <section className="relative h-screen w-full flex flex-col items-center justify-end" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="relative z-10 text-left px-8 md:px-16 pb-16 max-w-4xl w-full">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {movie?.title || 'Welcome to Mubi'}
              </h1>
              <p className="text-base md:text-lg text-gray-300 mb-6 line-clamp-3">
                {movie?.overview || 'Discover and explore popular movies and TV shows'}
              </p>
              <a className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition">Watch</a>
          </div>
      </section>
  );
}
