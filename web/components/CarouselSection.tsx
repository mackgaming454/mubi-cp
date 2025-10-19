import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { MovieCard } from "@/components/MovieCard"

export default async function CarouselSection({ title, movies }: { title: string; movies: Movie[] }) {
    return (
        <section className="w-full">
            <Carousel opts={{ align: "start", loop: true }}>
              <div className="flex items-center justify-between mb-4 px-2">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="flex space-x-3">
                  <CarouselPrevious className="!static !translate-y-0 !-left-0" />
                  <CarouselNext className="!static !translate-y-0 !-right-0" />
                </div>
              </div>
              <CarouselContent>
              {movies.map((movie: Movie) => (
                  <CarouselItem key={movie.id} className="basis-full xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7 select-none">
                    <MovieCard movie={movie} />
                  </CarouselItem>
              ))}
              </CarouselContent>
            </Carousel>
        </section>
    );
}
