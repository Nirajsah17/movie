"use client";
import { getMovieId } from "../actions/movies";

interface DownloadProps {
  id: string;
}

export default function DownloadLink({ id }: DownloadProps) {
  const handleClick = async () => {
    const newTab = window.open("", "_blank");

    try {
      const res = await getMovieId(id);
      const imdbId = res.imdb_id;

      if (!imdbId) {
        throw new Error("IMDb ID not found");
      }

      if (newTab) {
        newTab.location.href = `https://vidvault.ru/movie/${imdbId}`;
      }
    } catch (err) {
      newTab?.close();
    }
  };

  return (
    <button onClick={handleClick} className="inline-flex flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black transition-colors hover:bg-gray-200 cursor-pointer">
      Download
    </button>
  );
}