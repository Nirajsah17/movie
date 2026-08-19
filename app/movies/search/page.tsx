import { searchMovies } from "@/app/actions/movies";
import MovieCard, { TMDBMovie } from "@/app/components/MovieCard";
import SearchBar from "@/app/components/SearchBar";

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function SearchPage({
  searchParams,
}: PageProps) {
  const { query } = await searchParams;

  const searchQuery = query?.trim() || "";

  const searchedMovies = searchQuery && await searchMovies(searchQuery);

  const results: TMDBMovie[] = searchedMovies.results || [];

  return (
    <main className="mx-auto flex h-[calc(100vh-4rem)] w-full max-w-7xl flex-col p-4 sm:p-6">
      <div className="shrink-0">
        <div className="flex w-full items-center justify-center">
          <SearchBar />
        </div>

        {searchQuery && (
          <div className="mt-6 flex w-full justify-center">
            <h2 className="text-center text-sm text-zinc-400 sm:text-base">
              Results for your query:{" "}
              <span className="font-semibold text-white">
                {searchQuery}
              </span>
            </h2>
          </div>
        )}
      </div>

      <div
        className="
          mt-10
          min-h-0
          flex-1
          overflow-y-auto
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {results.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6 pb-6 sm:justify-start">
            {results.map((movie) => (
              <div
                key={movie.id}
                className="w-[calc(50%-12px)] sm:w-[180px]"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          searchQuery && (
            <p className="mt-12 text-center text-zinc-400">
              No cinematic matches found for "{searchQuery}"
            </p>
          )
        )}
      </div>
    </main>

  );
}