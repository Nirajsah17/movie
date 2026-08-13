// import SeasonEpisodes from "./SeasonEpisodes";

// interface DetailPageProps {
//   params: Promise<{
//     id: string;
//   }>;
//   searchParams: Promise<{
//     type?: string;
//   }>;
// }

// export default async function DetailPage({
//   params,
//   searchParams,
// }: DetailPageProps) {
//   const { id } = await params;
//   const { type } = await searchParams;

//   const mediaType = type?.toLowerCase() === "tv" ? "tv" : "movie";

//   // Your TMDB API call should go here.
//   // Example result structure:
//   const seasons = [
//     {
//       season_number: 1,
//       name: "Season 1",
//       episode_count: 3,
//       episodes: [
//         {
//           id: 101,
//           episode_number: 1,
//           name: "Episode One",
//           runtime: 48,
//           overview: "The story begins...",
//           still_path: null,
//         },
//         {
//           id: 102,
//           episode_number: 2,
//           name: "Episode Two",
//           runtime: 51,
//           overview: "The story continues...",
//           still_path: null,
//         },
//         {
//           id: 103,
//           episode_number: 3,
//           name: "Episode Three",
//           runtime: 47,
//           overview: "Everything changes...",
//           still_path: null,
//         },
//       ],
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-black text-white">
//       <div className="mx-auto max-w-6xl px-4 py-8">
//         {/* Your movie/TV information */}

//         {mediaType === "tv" && (
//           <SeasonEpisodes
//             tvId={id}
//             seasons={seasons}
//           />
//         )}
//       </div>
//     </main>
//   );
// }