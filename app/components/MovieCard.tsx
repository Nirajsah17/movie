import Link from "next/link";

export interface TMDBMovie {
  id: number;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?:string
  poster_path?: string | null;
  still_path?: string;
  overview?: string;
  vote_average?: number;
  media_type: string;
  type: 'tv' | 'movie';
  backdrop_path?: string
  trailer?:{key:string}
  src:string 
}

export default function MovieCard({ movie }: { movie: TMDBMovie }) {
  let releaseYear = movie.media_type === "tv" ? movie.first_air_date : movie.release_date;
  releaseYear = releaseYear
    ? releaseYear.split("-")[0]
    : "N/A";

  let poster = movie.poster_path ?`https://media.themoviedb.org/t/p/w300_and_h450_face${movie.poster_path}` : "https://placehold.co/300x450?text=No+Poster";
  const type = movie.media_type?.toLowerCase() === "tv" ? "TV" : "MOVIE";

  return (
    <Link
      href={`/movies/${movie.id}/${movie.media_type}`}
      className="group relative block aspect-[2/3] w-full overflow-hidden rounded-md bg-zinc-900 shadow-md sm:rounded-lg sm:shadow-lg"
    >
      <img
        src={poster}
        alt={`Official poster for ${type === "TV" ? movie.name : movie.title}`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute right-1.5 top-1.5 z-20 sm:right-3 sm:top-3">
        <span className="rounded bg-black/70 px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-white backdrop-blur-sm sm:rounded-md sm:px-2.5 sm:py-1 sm:text-[10px]">
          {type}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black via-black/80 to-transparent p-2 pt-10 sm:p-4 sm:pt-16">
        <h3
          className="line-clamp-2 text-xs font-bold leading-tight text-white sm:mb-2 sm:text-lg"
          title={type === "TV" ? movie.name : movie.title}
        >
          {type === "TV" ? movie.name : movie.title}
        </h3>

        <div className="mt-1 flex items-center gap-1.5 text-[9px] text-gray-300 sm:mb-2 sm:mt-0 sm:gap-3 sm:text-xs">
          <span>{releaseYear}</span>

          {movie.vote_average !== undefined &&
            movie.vote_average > 0 && (
              <span className="font-semibold text-yellow-400">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            )}
        </div>
      </div>

      <div className="absolute inset-0 z-[5] hidden bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block" />
    </Link>
  );
}