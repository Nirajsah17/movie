import { notFound } from "next/navigation";
import { movieDetaiById } from "@/app/actions/movies";
import MovieBanner from "@/app/components/MovieWatchCard";
import SeasonEpisodes from "@/app/components/SeasonEpisodes";
import { recomendedMoviesTv } from "@/app/actions/movies";
import MovieCard, { TMDBMovie } from "@/app/components/MovieCard";

interface DetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}

let recommededMovies: TMDBMovie[] = [];

export default async function MovieDetailPage({
  params,
  searchParams,
}: DetailPageProps) {
  const { id } = await params;
  const { type } = await searchParams;

  const mediaType = type === "tv" ? "tv" : "movie";

  const data = await movieDetaiById(id, mediaType);
  let _recommededMovies = await recomendedMoviesTv(id, mediaType);
  recommededMovies = _recommededMovies.results.map((item:any)=> ({...item, title: item.title || item.name, poster_path: `https://media.themoviedb.org/t/p/w300_and_h450_face${item.poster_path}`, release_date: item.release_date || item.first_air_date})) || [];

  if (!data) {
    notFound();
  }

  const movie = {
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
  };

  return (
    <div className="min-h-screen bg-black px-4">
      <MovieBanner
        {...movie}
        heightClassName="h-[500px] md:h-[700px] lg:h-[800px]"
      />

      {mediaType === "tv" && (
        <div className="mx-auto px-4 pb-16">
          <SeasonEpisodes
            tvId={id}
            title={data.name}
            seasons={data.seasons ?? []}
          />
        </div>
      )}
      <div className="py-2 mb-2 text-xl font-bold md:text-2xl">
        <h1>Recomendedations</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 mt-10">
          {recommededMovies.length && recommededMovies.map((movie:TMDBMovie) => (
            <MovieCard movie={movie} key={movie.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}