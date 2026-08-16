import MovieCard, { TMDBMovie } from "../components/MovieCard";
import Carousel from "../components/Carousel";
import { searchMovies, TredingWeek, homePageMovies } from "../actions/movies";
import MovieRow from "../components/MovieRow";
import WatchHistory from "../components/WatchHistory";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import HorizontalLoader from "../components/Loader";

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function MoviesPage({ searchParams }: PageProps) {
  const { query } = await searchParams;
  const session = await getServerSession(authOptions);
  const searchQuery = query?.trim() || "";
  let _movies: TMDBMovie[] = [];
  let trendingMoviesWeek = [];
  let searchResults:TMDBMovie[] = [];
  let dayTrendingMovie, weekTrendingMovie, dayTrendingTv, weekTrendingTv

  if(searchQuery){
    const searchedmovies = await searchMovies(searchQuery);
    searchResults = searchedmovies.results || [];
  }else{
    const tredingWeek = await TredingWeek();
    trendingMoviesWeek = tredingWeek.results.map((item: TMDBMovie) => {
      const isTV = item.media_type === "tv";
      const title = isTV ? item.name : item.title;
      const buttonHref = `/watch/${item.id}?type=${item.media_type}&poster_path=${item.poster_path}&still_path=${item.still_path}&title=${encodeURIComponent(title ?? "")}`;

      return {
        id: item.id,
        src: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
        alt: title,
        title: title,
        description: item.overview,
        buttonText: "Play",
        buttonHref,
        media_type: item.media_type,
        poster_path: item.poster_path,
        overview: item.overview,
        backdrop_path: item.backdrop_path,
        first_air_date: item.first_air_date,
        release_date: item.release_date,
        vote_average: item.vote_average
      };
    });
    _movies = trendingMoviesWeek || [];
    const {movie, tv} = await homePageMovies();
    const [_dayTrendingMovie, _weekTrendingMovie] = movie;
    const [_dayTrendingTv, _weekTrendingTv] = tv;
    dayTrendingMovie = _dayTrendingMovie;
    weekTrendingMovie = _weekTrendingMovie;
    dayTrendingTv = _dayTrendingTv;
    weekTrendingTv = _weekTrendingTv;
  }
  {
    dayTrendingMovie
    weekTrendingMovie
    dayTrendingTv
    weekTrendingTv
  }

  return (
    <main className="mx-auto p-6">
      {searchQuery && <h2>Results for your query : '{<span className="font-semibold">{searchQuery}</span>}'</h2>}
      {!searchQuery && trendingMoviesWeek.length && !searchQuery && <Carousel items={trendingMoviesWeek} autoPlay interval={5000} heightClassName="h-[500px] md:h-[700px] lg:h-[800px]"/>}

      {session && !searchQuery && <WatchHistory isHome={true}/>}
      
      {dayTrendingMovie && dayTrendingMovie.results.length && !searchQuery && (
      <div>
        <h1 className="mb-4 text-xl font-bold text-white px-4 py-6">Movie Trending Today</h1>
        <MovieRow movies={dayTrendingMovie.results}/>
      </div>    
      )}

      {weekTrendingMovie && weekTrendingMovie.results.length && !searchQuery && (
      <div>
        <h1 className="mb-4 text-xl font-bold text-white px-4 py-6">Movie Trending Week</h1>
        <MovieRow movies={weekTrendingMovie.results}/>
      </div>    
      )}

      {dayTrendingTv && dayTrendingTv.results.length && !searchQuery &&(
      <div>
        <h1 className="mb-4 text-xl font-bold text-white px-4 py-6">TV Shows Trending Today</h1>
        <MovieRow movies={dayTrendingTv.results}/>
      </div>    
      )}

      {weekTrendingTv && weekTrendingTv.results.length && !searchQuery &&(
      <div>
        <h1 className="mb-4 text-xl font-bold text-white px-4 py-6">TV Shows Trending Week</h1>
        <MovieRow movies={weekTrendingTv.results}/>
      </div>    
      )}

      {!searchQuery && _movies.length && (
        <>
          <h1 className="mb-4 text-xl font-bold text-white px-4 py-6">Movies / TV Shows</h1>
          <div className="mt-10 flex flex-wrap gap-6">
            {_movies.map((movie) => (
              
              <div key={movie.id} className="w-[calc(50%-12px)] sm:w-[180px]">
                <pre>
                  {/* {JSON.stringify(movie.)} */}
                </pre>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </>
      )}

      {searchQuery && (
        <>
          <div className="mt-10 flex flex-wrap gap-6">
            {searchResults.map((movie:TMDBMovie) => (
              <div key={movie.id} className="w-[calc(50%-12px)] sm:w-[180px]">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

        </>
      )}

      {/* <div className="mt-10 flex flex-wrap justify-center gap-6">
        {_movies.map((movie) => (
          <div key={movie.id} className="w-[180px] shrink-0">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div> */}
      {/* <div className="mt-10 grid grid-cols-[repeat(auto-fill,180px)] justify-between gap-6">
        {_movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div> */}
      {searchQuery && searchResults.length === 0 && (
        <p className="text-center text-body mt-12">
          No cinematic matches found for "<span className="font-semibold">{searchQuery}</span>"
        </p>
      )}
    </main>
  );
}
