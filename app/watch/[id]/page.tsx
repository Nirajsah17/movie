import PlayerMessageListener from "@/app/components/PlayerMesageListener";

interface WatchPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type: string, season: number, episode:number, poster_path:string, title:string, still_path:string }>;
}

export default async function WatchMovie({
  params,
  searchParams,
}: WatchPageProps) {

  const { id } = await params;
  const { type, season = 1, episode = 1, poster_path, still_path, title} = await searchParams;
  const mediaType = type?.toLowerCase() === "tv" ? "tv" : "movie";

  const url =
    mediaType === "tv"
      ? `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true`
      : `https://www.vidking.net/embed/movie/${id}?color=e50914&autoPlay=true`;

  return (
    <div className="min-h-screen w-full min-w-0 max-w-[100vw] overflow-x-hidden bg-black">
      <PlayerMessageListener
        posterPath={poster_path || still_path}
        seasonNumber={season}
        episodeNumber={episode}
        title={title}
      />

      <div className="w-full min-w-0 max-w-[100vw] overflow-hidden">
        <div className="relative w-full max-w-full aspect-video">
          <iframe
            src={url}
            title="Video player"
            allowFullScreen
            scrolling="no"
            className="absolute inset-0 block h-full w-full min-w-0 max-w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}