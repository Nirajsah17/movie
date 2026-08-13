interface WatchPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string, season: string, episode:string }>;
}

export default async function WatchMovie({
  params,
  searchParams,
}: WatchPageProps) {

  const { id } = await params;
  const { type, season, episode} = await searchParams;

  const mediaType = type?.toLowerCase() === "tv" ? "tv" : "movie";

  const url =
    mediaType === "tv"
      ? `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true`
      : `https://www.vidking.net/embed/movie/${id}?color=e50914&autoPlay=true`;

  return (
    <iframe
      src={url}
      width="100%"
      height="900"
      frameBorder="0"
      allowFullScreen
      className="w-full border-0"
      title="Video player"
    />
  );
}