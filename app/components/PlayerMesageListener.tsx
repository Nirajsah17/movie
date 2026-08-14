"use client";

import { useEffect } from "react";
import { saveWatchProgress } from "@/app/lib/watchHistory";

interface Props {
  posterPath?: string | null;
  title: string | null;
  seasonNumber?: number;
  episodeNumber?: number;
}

export default function PlayerMessageListener({
  posterPath,
  seasonNumber,
  episodeNumber,
  title
}: Props) {
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (typeof event.data !== "string") {
        return;
      }

      try {
        const _data = JSON.parse(event.data);
        const data = _data.data;
        if (
          typeof data.currentTime !== "number" ||
          typeof data.duration !== "number"
        ) {
          return;
        }

        if(data.mediaType !== "movie"){
          await saveWatchProgress({
            mediaId: data.id,
            mediaType: data.mediaType,
            posterPath,
            currentTime: data.currentTime,
            title,
            seasonNumber,
            episodeNumber,

            progress: data.currentTime,
            duration: data.duration,
          });  
        }else{
          await saveWatchProgress({
            mediaId: data.id,
            mediaType: data.mediaType,
            currentTime: data.currentTime,
            title,
            posterPath,
            progress: data.currentTime,
            duration: data.duration,
          });
        }

      } catch {
        // Ignore messages that aren't JSON
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [
    posterPath,
    seasonNumber,
    episodeNumber
  ]);

  return null;
}