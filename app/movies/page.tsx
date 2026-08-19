import Carousel from "../components/Carousel";
import MovieCard, { TMDBMovie } from "../components/MovieCard";
import MovieRow from "../components/MovieRow";
import { TredingWeek, homePageMovies } from "../actions/movies";

export const revalidate = 3600;

export default async function MoviesPage() {
  const tredingWeek = await TredingWeek();

  const trendingMoviesWeek: TMDBMovie[] = tredingWeek.results.map(
    (item: TMDBMovie) => {
      const isTV = item.media_type === "tv";
      const title = isTV ? item.name : item.title;

      const buttonHref =
        `/watch/${item.id}` +
        `?type=${item.media_type}` +
        `&poster_path=${item.poster_path}` +
        `&still_path=${item.still_path}` +
        `&title=${encodeURIComponent(title ?? "")}`;

      return {
        id: item.id,
        src: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
        alt: title,
        title,
        description: item.overview,
        buttonText: "Play",
        buttonHref,
        media_type: item.media_type,
        poster_path: item.poster_path,
        overview: item.overview,
        backdrop_path: item.backdrop_path,
        first_air_date: item.first_air_date,
        release_date: item.release_date,
        vote_average: item.vote_average,
        trailer: item.trailer?.key || "",
      };
    }
  );

  const { movie, tv } = await homePageMovies();

  const [weekTrendingMovie] = movie;
  const [weekTrendingTv] = tv;

  return (
    <main className="mx-auto p-6">
      {trendingMoviesWeek.length > 0 && (
        <Carousel
          items={trendingMoviesWeek}
          autoPlay
          interval={5000}
          heightClassName="h-[500px] md:h-[700px] lg:h-[800px]"
        />
      )}

      {weekTrendingMovie?.results?.length > 0 && (
        <div>
          <h1 className="mb-4 px-4 py-6 text-xl font-bold text-white">
            Movie Trending Week
          </h1>

          <MovieRow movies={weekTrendingMovie.results} />
        </div>
      )}

      {weekTrendingTv?.results?.length > 0 && (
        <div>
          <h1 className="mb-4 px-4 py-6 text-xl font-bold text-white">
            TV Shows Trending Week
          </h1>

          <MovieRow movies={weekTrendingTv.results} />
        </div>
      )}

      {trendingMoviesWeek.length > 0 && (
        <>
          <h1 className="mb-4 px-4 py-6 text-xl font-bold text-white">
            Movies / TV Shows
          </h1>

          <div className="mt-10 flex flex-wrap gap-6">
            {trendingMoviesWeek.map((movie) => (
              <div
                key={movie.id}
                className="w-[calc(50%-12px)] sm:w-[180px]"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}