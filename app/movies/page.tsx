import MovieCard, { TMDBMovie } from "../components/MovieCard";
import Carousel from "../components/Carousel";
import { searchMovies, TredingWeek, homePageMovies } from "../actions/movies";
import MovieRow from "../components/MovieRow";

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function MoviesPage({ searchParams }: PageProps) {
  const { query } = await searchParams;
  const searchQuery = query?.trim() || "";
  let _movies: TMDBMovie[] = [];
  let trendingMoviesWeek = [];

  const {movie, tv} = await homePageMovies();
  const [dayTrendingMovie, weekTrendingMovie] = movie;
  const [dayTrendingTv, weekTrendingTv] = tv;
  const tredingWeek = await TredingWeek();
  trendingMoviesWeek = tredingWeek.results.map((item: any) => ({
    id: item.id,
    src: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
    alt: item.title,
    title: item.title || item.name,
    description: item.overview,
    buttonText: "Play",
    buttonHref: `/watch/${item.id}`,
    media_type: item.type
  }));

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

      {dayTrendingMovie && dayTrendingMovie.results.length && (
      <div>
        <h1>Movie Trending Today</h1>
        <MovieRow movies={dayTrendingMovie.results}/>
      </div>    
      )}

      {weekTrendingMovie && weekTrendingMovie.results.length && (
      <div>
        <h1>Movie Trending Week</h1>
        <MovieRow movies={weekTrendingMovie.results}/>
      </div>    
      )}

      {dayTrendingTv && dayTrendingTv.results.length && (
      <div>
        <h1>TV Shows Trending Today</h1>
        <MovieRow movies={dayTrendingTv.results}/>
      </div>    
      )}

      {weekTrendingTv && weekTrendingTv.results.length && (
      <div>
        <h1>TV Shows Trending Week</h1>
        <MovieRow movies={weekTrendingTv.results}/>
      </div>    
      )}

      <h1>All Movies</h1>
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
