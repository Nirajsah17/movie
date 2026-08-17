import { notFound } from "next/navigation";
import { movieDetaiById, searchMovies } from "@/app/actions/movies";
import MovieBanner from "@/app/components/MovieWatchCard";
import SeasonEpisodes from "@/app/components/SeasonEpisodes";
import { recomendedMoviesTv } from "@/app/actions/movies";
import MovieCard, { TMDBMovie } from "@/app/components/MovieCard";

interface DetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string, query?:string }>;
}

let recommededMovies: TMDBMovie[] = [];

export default async function MovieDetailPage({
  params,
  searchParams,
}: DetailPageProps) {
  const { id } = await params;
  const { type, query } = await searchParams;
  const searchQuery = query?.trim() || "";

  let searchResults: TMDBMovie[] = [];
  let movie = {};
  let data:any = {};

  const mediaType = type === "tv" ? "tv" : "movie";

  if(searchQuery){
    const searchedmovies = await searchMovies(searchQuery);
    searchResults = searchedmovies.results || [];
  }else{
    data = await movieDetaiById(id, mediaType);
    let _recommededMovies = await recomendedMoviesTv(id, mediaType);
    recommededMovies = _recommededMovies.results.map((item:any)=> ({...item, title: item.title || item.name, poster_path: `https://media.themoviedb.org/t/p/w300_and_h450_face${item.poster_path}`, release_date: item.release_date || item.first_air_date})) || [];
  
    if (!data) {
      notFound();
    }
    movie = {
      id: data.id,
      src: data.backdrop_path
        ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
        : "https://placehold.co/1920x1080?text=No+Backdrop",
  
      alt: data.title || data.name || data.original_title || "",
      title:
        mediaType === "movie"
          ? data.title || data.original_title
          : data.name || data.original_name,
      description: data.overview,
      buttonText: "Play",
      media_type: mediaType,
      buttonHref: `/watch/${id}?type=${mediaType}&poster_path=${data.backdrop_path || data.poster_path || `https://placehold.co/1920x1080?text=No+Backdrop`}&title=${data.title || data.name}`,
      trailer: data?.trailer?.key || '',
      external_id: data.imdb_id
    };
  }

  const downloadLink = mediaType === "tv" ? `https://vidvault.ru/${mediaType}/${data.imdb_id}/1/1` : `https://vidvault.ru/${mediaType}/${data.imdb_id}`

  return (
    <div className="min-h-screen bg-black px-4">
      {!searchQuery && (
        <MovieBanner
          id={data.id}
          src={""} {...movie}
          heightClassName="h-[500px] md:h-[700px] lg:h-[800px]" />
        )
      }

      <div className="flex w-full items-center justify-end py-2 sm:py-2.5">
        {!searchQuery && data.imdb_id && (
          <a
            href={downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center justify-center rounded-md bg-[#E50914] px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-black/20 transition-colors hover:bg-[#B20710] focus:outline-none focus:ring-4 focus:ring-[#E50914]/40 sm:min-h-10 sm:rounded-lg sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Download
          </a>
        )}
      </div>
      {!searchQuery && mediaType === "tv" && (
        <div className="mx-auto px-4 pb-16">
          <SeasonEpisodes
            tvId={id}
            title={data.name}
            seasons={data.seasons ?? []}
          />
        </div>
      )}

      {!searchQuery && (
        <>
          <h1 className="text-xl font-bold text-white px-8 py-6">Recomended</h1>
          <div className="flex flex-wrap gap-6 px-8">
            {recommededMovies.length && recommededMovies.map((movie:TMDBMovie) => (
              <div key={movie.id} className="w-[calc(50%-12px)] sm:w-[180px]">
                <MovieCard movie={movie} key={movie.id}/>
              </div>
            ))}
          </div>
        </>
      )}

      {searchQuery && <h2>Results for your query : '{<span className="font-semibold">{searchQuery}</span>}'</h2>}
      {searchQuery && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {searchResults.map((movie:TMDBMovie) => (
              <div key={movie.id} className="w-[calc(50%-12px)] sm:w-[180px]">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

        </>
      )}

      {searchQuery && searchResults.length === 0 && (
        <p className="text-center text-body mt-12">
          No cinematic matches found for "<span className="font-semibold">{searchQuery}</span>"
        </p>
      )}

    </div>
  );
}