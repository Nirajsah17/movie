"use server";

const CONSTANT = {
  movie: ["week"],
  tv:["week"],
  all: ["day", "week"],
}

const apiKey = process.env.TMDB_API_KEY;
import { fetchWithRetry } from "../lib/apiUtils";
export async function getMovieId(id: string) {

  if (!apiKey) {
    throw new Error("TMDB_API_KEY is not configured");
  }
  const url = `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${apiKey}`;
  const res = await fetchWithRetry(url, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error(
      `TMDB request failed: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

export async function searchMovies(searchQuery:string) {
  if (!apiKey) {
    throw new Error("TMDB_API_KEY is not configured");
  }
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en&query=${encodeURIComponent(searchQuery)}`
  const res = await fetchWithRetry(url);
  if (!res.ok) {
    throw new Error(
      `TMDB request failed: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

export async function TredingWeek() {

  if (!apiKey) {
    throw new Error("TMDB_API_KEY is not configured");
  }
  const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`;
  const res = await fetchWithRetry(url,{
    next: {revalidate: 3600}
  });
  if (!res.ok) {
    throw new Error(
      `TMDB request failed: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}

export async function movieDetaiById(id:string, type:string) {
  if (!apiKey) {
    throw new Error("TMDB_API_KEY is not configured");
  }
  const _type = type.toLowerCase();
  const url = _type === 'tv' ? `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en&append_to_response=videos,external_ids` : `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en&append_to_response=videos,external_ids`;
  const res = await fetchWithRetry(url);
  
  if (!res.ok) {
    throw new Error(
      `TMDB request failed: ${res.status} ${res.statusText}`
    );
  }
  
  const result:any = await res.json();
  const trailer = result.videos?.results?.find(
    (video: any) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official
  );
  result['imdb_id'] = result.external_ids.imdb_id;
  result['trailer'] = trailer;
  return result;
}


export async function fetchSeason(id:string, season:number) {
    if (!apiKey) {
      throw new Error("TMDB_API_KEY is not configured");
    }
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=8baba8ab6b8bbe247645bcae7df63d0d`
    const res = await fetchWithRetry(url);
    if (!res.ok) {
      throw new Error(
        `TMDB request failed: ${res.status} ${res.statusText}`
      );
    }

    return res.json();
}

export async function recomendedMoviesTv(id:string, type:string){
  
  if (!apiKey) {
    throw new Error("TMDB_API_KEY is not configured");
  }
    const url = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${apiKey}&language=en`
    const res = await fetchWithRetry(url);
    if (!res.ok) {
      throw new Error(
        `TMDB request failed: ${res.status} ${res.statusText}`
      );
    }

    return res.json();
}

export async function homePageMovies() {
  const moviePromises = CONSTANT.movie.map((time_window: string) =>
    fetchWithRetry(
      `https://api.themoviedb.org/3/trending/movie/${time_window}?api_key=${apiKey}&language=en-US`,
      {
        next: {
          revalidate: 3600,
        },
      }
    ).then((res) => {
      if (!res.ok) {
        throw new Error(`TMDB request failed: ${res.status}`);
      }

      return res.json();
    })
  );

  const tvPromises = CONSTANT.tv.map((time_window: string) =>
    fetchWithRetry(
      `https://api.themoviedb.org/3/trending/tv/${time_window}?api_key=${apiKey}&language=en-US`,
      {
        next: {
          revalidate: 3600,
        },
      }
    ).then((res) => {
      if (!res.ok) {
        throw new Error(`TMDB request failed: ${res.status}`);
      }

      return res.json();
    })
  );

  const [movieResults, tvResults] = await Promise.all([
    Promise.all(moviePromises),
    Promise.all(tvPromises),
  ]);

  return {
    movie: movieResults,
    tv: tvResults,
  };
}