"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import PlayerMessageListener from "@/app/components/PlayerMesageListener";

export default function WatchMovie() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const season = Number(searchParams.get("season")) || 1;
  const episode = Number(searchParams.get("episode")) || 1;

  const posterPath = searchParams.get("poster_path");
  const stillPath = searchParams.get("still_path");
  const title = searchParams.get("title");

  const mediaType = type?.toLowerCase() === "tv" ? "tv" : "movie";

  const url =
    mediaType === "tv"
      ? `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true`
      : `https://www.vidking.net/embed/movie/${id}?color=e50914&autoPlay=true`;

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="w-full min-w-0 max-w-[100vw] overflow-x-hidden bg-black">
      <PlayerMessageListener
        posterPath={posterPath || stillPath || undefined}
        seasonNumber={season}
        episodeNumber={episode}
        title={title}
      />

      <div className="w-full min-w-0 max-w-[100vw] overflow-hidden">
        <div className="group relative aspect-video w-full max-w-full">
          <iframe
            src={url}
            title="Video player"
            allowFullScreen
            scrolling="no"
            className="absolute inset-0 block h-full w-full min-w-0 max-w-full border-0"
          />
          <button onClick={handleBack} aria-label="Go back" className="absolute left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}