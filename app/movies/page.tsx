import MovieCard, { TMDBMovie } from "../components/MovieCard";
import Carousel from "../components/Carousel";
import { searchMovies, TredingWeek } from "../actions/movies";

interface PageProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function MoviesPage({ searchParams }: PageProps) {
  const { query } = await searchParams;
  const searchQuery = query?.trim() || "";
  let movies: TMDBMovie[] = [];
  let trendingMoviesWeek = [];

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
    movies = searchedmovies.results.map((item:any)=> ({...item, title: item.title || item.name, poster_path: `https://media.themoviedb.org/t/p/w300_and_h450_face${item.poster_path}`, release_date: item.release_date || item.first_air_date})) || [];
  }else{
    movies = tredingWeek.results.map((item:any)=> ({...item, title: item.title || item.name, poster_path: `https://media.themoviedb.org/t/p/w300_and_h450_face${item.poster_path}`, release_date: item.release_date || item.first_air_date})) || [];
  }

  return (
    <main className="mx-auto p-6">
      {searchQuery && <h2>Results for your query : '{<span className="font-semibold">{searchQuery}</span>}'</h2>}
      {!searchQuery && trendingMoviesWeek.length && <Carousel items={trendingMoviesWeek} autoPlay interval={5000} heightClassName="h-[500px] md:h-[700px] lg:h-[800px]"/>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 mt-10">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id}/>
        ))}
      </div>
      {searchQuery && movies.length === 0 && (
        <p className="text-center text-body mt-12">
          No cinematic matches found for "<span className="font-semibold">{searchQuery}</span>"
        </p>
      )}
    </main>
  );
}
