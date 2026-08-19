import { notFound } from "next/navigation";
import { movieDetaiById } from "@/app/actions/movies";
import MovieBanner from "@/app/components/MovieWatchCard";
import SeasonEpisodes from "@/app/components/SeasonEpisodes";
import { recomendedMoviesTv, TredingWeek } from "@/app/actions/movies";
import MovieCard, { TMDBMovie } from "@/app/components/MovieCard";


export const dynamicParams = true;
export const revalidate = 3600;

interface DetailPageProps {
  params: Promise<{ id: string, type:string }>;
}

export default async function MovieDetailPage({
  params
}: DetailPageProps) {
  const { id, type } = await params;

  let movie = {};
  
  const mediaType = type === "tv" ? "tv" : "movie";

  const [data, recommendedData] = await Promise.all([
    movieDetaiById(id, mediaType),
    recomendedMoviesTv(id, mediaType),
  ]);

  const recommendedMovies: TMDBMovie[] = (recommendedData?.results ?? []).map((item: any) => ({
      ...item,
      title: item.title || item.name,
      poster_path: item.poster_path
        ? `https://media.themoviedb.org/t/p/w300_and_h450_face${item.poster_path}`
        : null,
      release_date: item.release_date || item.first_air_date,
    }));
  
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

  const downloadLink = mediaType === "tv" ? `https://vidvault.ru/${mediaType}/${data.imdb_id}/1/1` : `https://vidvault.ru/${mediaType}/${data.imdb_id}`

  return (
    <div className="min-h-screen bg-black px-4">
        <MovieBanner
          id={data.id}
          src={""} {...movie}
          heightClassName="h-[500px] md:h-[700px] lg:h-[800px]" />        

      <div className="flex w-full items-center justify-end py-2 sm:py-2.5">
        {data.imdb_id && (
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
      {mediaType === "tv" && (
        <div className="mx-auto px-4 pb-16">
          <SeasonEpisodes
            tvId={id}
            title={data.name}
            seasons={data.seasons ?? []}
          />
        </div>
      )}
      <>
        <h1 className="text-xl font-bold text-white px-8 py-6">Recomended</h1>
        <div className="flex flex-wrap gap-6 px-8">
          {recommendedMovies.length && recommendedMovies.map((movie:TMDBMovie) => (
            <div key={movie.id} className="w-[calc(50%-12px)] sm:w-[180px]">
              <MovieCard movie={movie} key={movie.id}/>
            </div>
          ))}
        </div>
      </>

    </div>
  );
}

export async function generateStaticParams() {
  const trending = await TredingWeek();

  return trending.results
    .filter(
      (item: any) =>
        item.media_type === "movie" ||
        item.media_type === "tv"
    )
    .slice(0, 5)
    .map((item: any) => ({
      id: String(item.id),
      type: item.media_type,
    }));
}
