"use client";

import { fetchSeason } from "../actions/movies";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Season {
  season_number: number;
  name: string;
  episode_count: number;
  poster_path?: string | null;
}

interface Episode {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  runtime?: number | null;
  still_path?: string | null;
  season_number: number;
  vote_average?: number;
}

interface SeasonEpisodesProps {
  tvId: string;
  seasons: Season[];
  title:string
}

export default function SeasonEpisodes({
  tvId,
  seasons,
  title
}: SeasonEpisodesProps) {
  
  const availableSeasons = seasons.filter(
    (season) => season.season_number > 0
  );

  const [selectedSeason, setSelectedSeason] = useState(
    availableSeasons[0]?.season_number ?? 1
  );

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchSeason(tvId, selectedSeason);
        setEpisodes(data.episodes ?? []);
      } catch (error) {
        setEpisodes([]);
        setError("Unable to load episodes.");
      } finally {
        setLoading(false);
      }
    }

    fetchEpisodes();
  }, [tvId, selectedSeason]);

  const currentSeason = availableSeasons.find(
    (season) => season.season_number === selectedSeason
  );

  if (!availableSeasons.length) {
    return (
      <section className="py-10">
        <p className="text-gray-400">
          No seasons available.
        </p>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Episodes
          </h2>

          {currentSeason && (
            <p className="mt-1 text-sm text-gray-400">
              {currentSeason.episode_count} episodes
            </p>
          )}
        </div>
        <div className="relative w-full sm:w-56">
          <select
            value={selectedSeason}
            onChange={(event) =>
              setSelectedSeason(Number(event.target.value))
            }
            className="w-full appearance-none rounded-md border border-zinc-700 bg-zinc-900 px-4 py-3 pr-10 text-sm font-medium text-white outline-none transition hover:bg-zinc-800 focus:border-white">
            {availableSeasons.map((season) => (
              <option
                key={season.season_number}
                value={season.season_number}
              >
                {season.name}
              </option>
            ))}
          </select>

          <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7"/>
          </svg>
        </div>
      </div>

      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex gap-4 rounded-lg border border-zinc-800 bg-zinc-950 p-4 animate-pulse">
              <div className="h-20 w-36 rounded bg-zinc-800" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-1/3 rounded bg-zinc-800" />
                <div className="h-3 w-full rounded bg-zinc-800" />
                <div className="h-3 w-2/3 rounded bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && error && (
        <div className="rounded-lg border border-red-900 bg-red-950/30 p-5 text-sm text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
          {episodes.length === 0 ? (
            <div className="p-6 text-center text-sm text-gray-400">
              No episodes found.
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {episodes.map((episode) => (
                <EpisodeItem
                  key={episode.id}
                  tvId={tvId}
                  episode={episode}
                  title={title}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function EpisodeItem({
  tvId,
  episode,
  title
}: {
  tvId: string;
  episode: Episode;
  title:string
}) {
  const duration = episode.runtime
    ? `${episode.runtime}m`
    : "";

  return (
    <Link
      href={`/watch/${tvId}?type=tv&season=${episode.season_number}&episode=${episode.episode_number}&still_path=${episode.still_path}&title=${title}`}
      className="group flex h-[72px] min-w-0 items-center gap-2 overflow-hidden p-2 transition-colors hover:bg-zinc-900 sm:h-[80px] sm:gap-3 sm:p-3"
    >
      <div className="flex w-6 shrink-0 items-center justify-center">
        <span className="text-sm font-semibold text-gray-500 transition-colors group-hover:text-white">
          {episode.episode_number}
        </span>
      </div>

      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded bg-zinc-800 sm:h-16 sm:w-28">
        {episode.still_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
            alt={episode.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-gray-500">
            No Image
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs text-black">
            ▶
          </div>
        </div>
      </div>

      <div
        className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="flex min-w-max items-center gap-2">
          <div className="min-w-[220px]">
            <div className="mb-0.5 flex items-center gap-2">
              <h3 className="whitespace-nowrap font-semibold leading-tight text-white">
                {episode.name}
              </h3>

              {duration && (
                <span className="shrink-0 text-[10px] text-gray-500 sm:text-xs">
                  {duration}
                </span>
              )}
            </div>

            <p className="max-w-[500px] truncate text-xs leading-snug text-gray-400 sm:text-sm">
              {episode.overview ||
                "No episode description available."}
            </p>
          </div>

          <div className="flex shrink-0 items-center pr-2 text-gray-600 transition-colors group-hover:text-white">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m9 5 7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}