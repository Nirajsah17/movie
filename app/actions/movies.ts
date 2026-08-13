"use server";
const apiKey = process.env.TMDB_API_KEY;
export async function getMovieId(id: string) {

  if (!apiKey) {
    throw new Error("TMDB_API_KEY is not configured");
  }
  const url = `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${apiKey}`;
  const res = await fetch(url, {
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
  const res = await fetch(url, 
    { cache: "no-store" }
    );
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
  const res = await fetch(url, 
    { cache: "no-store" }
    );
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
  const url = _type === 'tv' ? `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en` : `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en`
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `TMDB request failed: ${res.status} ${res.statusText}`
    );
  }

  return res.json();
}


export async function fetchSeason(id:string, season:number) {
    if (!apiKey) {
      throw new Error("TMDB_API_KEY is not configured");
    }
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=8baba8ab6b8bbe247645bcae7df63d0d`
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `TMDB request failed: ${res.status} ${res.statusText}`
      );
    }

    return res.json();
}