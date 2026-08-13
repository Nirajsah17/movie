import { notFound } from "next/navigation";
import { movieDetaiById } from "@/app/actions/movies";
import MovieBanner from "@/app/components/MovieWatchCard";
import SeasonEpisodes from "@/app/components/SeasonEpisodes";

interface DetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string }>;
}

export default async function MovieDetailPage({
  params,
  searchParams,
}: DetailPageProps) {
  const { id } = await params;
  const { type } = await searchParams;

  const mediaType = type === "tv" ? "tv" : "movie";

  const data = await movieDetaiById(id, mediaType);

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
    buttonHref: `/watch/${id}?type=${mediaType}&poster_path=${data.backdrop_path}&title=${data.title || data.original_title}`,
  };

  return (
    <div className="min-h-screen bg-black">
      <MovieBanner
        {...movie}
        heightClassName="h-[500px] md:h-[700px] lg:h-[800px]"
      />

      {mediaType === "tv" && (
        <div className="mx-auto px-4 pb-16">
          <SeasonEpisodes
            tvId={id}
            seasons={data.seasons ?? []}
          />
        </div>
      )}
    </div>
  );
}