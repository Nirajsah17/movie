import Link from "next/link";

export interface TMDBMovie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string | null;
  overview?: string;
  vote_average?: number;
  media_type: string;
}

export default function MovieCard({ movie }: { movie: TMDBMovie }) {
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  const poster =
    movie.poster_path ||
    "https://placehold.co/300x450?text=No+Poster";

  const type = movie.media_type?.toLowerCase() === "tv" ? "TV" : "MOVIE";

  return (
    <Link href={`/movies/${movie.id}?type=${movie.media_type}`} className="group relative block aspect-[2/3] w-full overflow-hidden rounded-lg bg-zinc-900 shadow-lg">
      <img src={poster} alt={`Official poster for ${movie.title}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
      <div className="absolute right-3 top-3 z-20">
        <span className="rounded-md bg-black/70 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
          {type}
        </span>
      </div>
      <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/85 to-black/20 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white" title={movie.title}>
          {movie.title}
        </h3>
        <div className="mb-2 flex items-center gap-3 text-xs text-gray-300">
          <span>{releaseYear}</span>
          {movie.vote_average !== undefined &&
            movie.vote_average > 0 && (
              <span className="font-semibold text-yellow-400">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            )}
        </div>
        <p className="line-clamp-3 text-xs leading-relaxed text-gray-300">
          {movie.overview || "No plot summary available."}
        </p>
      </div>
    </Link>
  );
}