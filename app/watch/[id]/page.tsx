"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import PlayerMessageListener from "@/app/components/PlayerMesageListener";
import { useEffect, useState } from "react";

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

  const trailer = searchParams.get("key");

  const [isDualMode, setDualMode] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const url =
    mediaType === "tv"
      ? `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true`
      : `https://www.vidking.net/embed/movie/${id}?color=e50914&autoPlay=true`;

  const second_url =
    mediaType === "movie"
      ? `https://viduki.net/2/movie/${id}?color=e50914`
      : `https://viduki.net/2/tv/${id}/${season}/${episode}?color=e50914`;

  const handleBack = () => {
    router.back();
  };

  const onDualModeSwitch = (value: boolean) => {
    setDualMode(!value);
  };

  useEffect(() => {
    if (trailer) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showControls, trailer]);

  return (
    <div className="w-full min-w-0 overflow-x-hidden bg-black">
      {!trailer && (
        <PlayerMessageListener
          posterPath={posterPath || stillPath || undefined}
          seasonNumber={season}
          episodeNumber={episode}
          title={title}
        />
      )}

      {!trailer && (
        <div className="w-full min-w-0 overflow-hidden bg-black">
          <div className="group relative aspect-video w-full overflow-hidden bg-black">
            <iframe
              src={isDualMode ? second_url : url}
              title="Video player"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              scrolling="no"
              className="absolute inset-0 h-full w-full border-0"
            />

            <div
              className={`
                pointer-events-none absolute inset-x-0 top-0 z-20
                h-20 bg-gradient-to-b from-black/70 to-transparent
                transition-opacity duration-200
                md:opacity-0 md:group-hover:opacity-100
                ${showControls ? "opacity-100" : "opacity-0"}
              `}
            />

            <div
              className={`
                pointer-events-none absolute inset-x-0 bottom-0 z-20
                h-24 bg-gradient-to-t from-black/70 to-transparent
                transition-opacity duration-200
                md:opacity-0 md:group-hover:opacity-100
                ${showControls ? "opacity-100" : "opacity-0"}
              `}
            />

            <div
              className={`
                absolute inset-x-0 top-0 z-30
                flex items-center justify-between
                p-2 sm:p-3 md:p-4
                transition-opacity duration-200
                md:opacity-0 md:group-hover:opacity-100
                ${showControls ? "opacity-100" : "opacity-0"}
              `}
            >
              <button
                onClick={handleBack}
                aria-label="Go back"
                className="
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-full
                  bg-black/60
                  text-white
                  shadow-lg
                  backdrop-blur-md
                  transition-all
                  hover:bg-[#E50914]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#E50914]
                  active:scale-95
                  sm:h-11 sm:w-11
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5 sm:h-5 sm:w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() => onDualModeSwitch(isDualMode)}
                aria-label={
                  isDualMode
                    ? "Switch to original audio"
                    : "Switch to dual audio"
                }
                className="
                  inline-flex min-h-10
                  items-center justify-center
                  rounded-lg
                  bg-[#E50914]
                  px-3
                  text-xs font-semibold
                  text-white
                  shadow-lg
                  shadow-black/30
                  backdrop-blur-md
                  transition-all
                  hover:bg-[#B20710]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#E50914]
                  active:scale-95
                  sm:min-h-11
                  sm:px-4
                  sm:text-sm
                "
              >
                {isDualMode ? "Original" : "Dual Audio"}
              </button>
            </div>
          </div>
        </div>
      )}

      {trailer && (
        <div className="fixed inset-0 z-[9999] flex h-dvh w-screen items-center justify-center bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${trailer}?autoplay=1&rel=0`}
            title="Movie trailer"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />

          <button
            onClick={handleBack}
            aria-label="Go back"
            className="
              fixed left-2 top-2 z-[10000]
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-full
              bg-black/60
              text-white
              shadow-lg
              backdrop-blur-md
              transition-all
              hover:bg-[#E50914]
              focus:outline-none
              focus:ring-2
              focus:ring-[#E50914]
              active:scale-95
              sm:left-4
              sm:top-4
              sm:h-11
              sm:w-11
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}