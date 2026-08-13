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
  const { type, season, episode, poster_path, still_path} = await searchParams;

  const mediaType = type?.toLowerCase() === "tv" ? "tv" : "movie";

  const url =
    mediaType === "tv"
      ? `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true`
      : `https://www.vidking.net/embed/movie/${id}?color=e50914&autoPlay=true`;

  return (
    <div className="min-h-screen bg-black">
      <PlayerMessageListener posterPath={poster_path||still_path} seasonNumber={season} episodeNumber={episode} />
      <iframe src={url} width="100%" height="900" allowFullScreen className="w-full" title="Video player"/>
    </div>
  );
}