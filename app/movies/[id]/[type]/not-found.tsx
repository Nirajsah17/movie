import Link from "next/link";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailNotFoundPage({ params }: DetailPageProps) {
  const movie = {
    posterUrl: '',
    backdropUrl: '',
    title: 'Not found',
    releaseYear: 'NA',
    runtime: 0,
    hour: 0,
    minutes:0,
    vote_average: 0,
    genres: ['NA'],
    overview: 'NA'
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans antialiased">
      <div className={`max-w-5xl mx-auto px-6 relative z-10 pb-16 ${movie.backdropUrl ? "-mt-32 md:-mt-44" : "pt-12"}`}>
        <Link href="/movies" className="inline-block text-sm text-slate-400 hover:text-white mb-6 transition-colors">
          ← Back to Search
        </Link>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="w-64 md:w-72 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl bg-slate-900 aspect-[2/3] relative border border-slate-800">
            {movie.posterUrl ? (
              <img src={movie.posterUrl} alt={`${movie.title} poster`}  className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500">No Poster Available</div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left pt-2">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
              {movie.title} <span className="text-slate-400 font-normal">({movie.releaseYear})</span>
            </h1>

            <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm text-slate-300 mb-6">
              {movie.runtime > 0 && (
                <span className="bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-full font-medium">
                  {movie.hour}h {movie.minutes}m
                </span>
              )}
              {movie.vote_average > 0 && (
                <div className="flex items-center gap-1 font-semibold text-yellow-400">
                  ⭐ {movie.vote_average.toFixed(1)}
                </div>
              )}
            </div>

            {movie.overview && (
              <div className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Overview</h2>
                <p className="text-slate-300 leading-relaxed max-w-3xl">{movie.overview}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
