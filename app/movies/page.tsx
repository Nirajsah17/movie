import MovieCard, { TMDBMovie } from "../components/MovieCard";
import Carousel from "../components/Carousel";
import { searchMovies, TredingWeek, homePageMovies } from "../actions/movies";
import MovieRow from "../components/MovieRow";
import WatchHistory from "../components/WatchHistory";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function MoviesPage({ searchParams }: PageProps) {
  const { query } = await searchParams;
  const session = await getServerSession(authOptions);
  const searchQuery = query?.trim() || "";
  let _movies: TMDBMovie[] = [];
  let trendingMoviesWeek = [];

  const {movie, tv} = await homePageMovies();
  const [dayTrendingMovie, weekTrendingMovie] = movie;
  const [dayTrendingTv, weekTrendingTv] = tv;
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
    };
  });

  if(searchQuery){
    const searchedmovies = await searchMovies(searchQuery);
    _movies = searchedmovies.results || [];
  }else{
    _movies = tredingWeek.results || [];
  }

  return (
    <main className="mx-auto p-6">
      {searchQuery && <h2>Results for your query : '{<span className="font-semibold">{searchQuery}</span>}'</h2>}
      {!searchQuery && trendingMoviesWeek.length && <Carousel items={trendingMoviesWeek} autoPlay interval={5000} heightClassName="h-[500px] md:h-[700px] lg:h-[800px]"/>}

      {session && <WatchHistory />}
      
      {dayTrendingMovie && dayTrendingMovie.results.length && (
      <div>
        <h1 className="mb-4 text-xl font-bold text-white px-4 py-6">Movie Trending Today</h1>
        <MovieRow movies={dayTrendingMovie.results}/>
      </div>    
      )}

      {weekTrendingMovie && weekTrendingMovie.results.length && (
      <div>
        <h1 className="mb-4 text-xl font-bold text-white px-4 py-6">Movie Trending Week</h1>
        <MovieRow movies={weekTrendingMovie.results}/>
      </div>    
      )}

      {dayTrendingTv && dayTrendingTv.results.length && (
      <div>
        <h1 className="mb-4 text-xl font-bold text-white px-4 py-6">TV Shows Trending Today</h1>
        <MovieRow movies={dayTrendingTv.results}/>
      </div>    
      )}

      {weekTrendingTv && weekTrendingTv.results.length && (
      <div>
        <h1 className="mb-4 text-xl font-bold text-white px-4 py-6">TV Shows Trending Week</h1>
        <MovieRow movies={weekTrendingTv.results}/>
      </div>    
      )}

      <h1 className="mb-4 text-xl font-bold text-white px-4 py-6">All Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 mt-10">
        {_movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id}/>
        ))}
      </div>
      {searchQuery && _movies.length === 0 && (
        <p className="text-center text-body mt-12">
          No cinematic matches found for "<span className="font-semibold">{searchQuery}</span>"
        </p>
      )}
    </main>
  );
}
