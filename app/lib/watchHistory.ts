import { openDB, DBSchema, IDBPDatabase } from "idb";
export type MediaType = "movie" | "tv";
export interface WatchHistory {
  key: string;

  mediaId: number;
  mediaType: MediaType;
  posterPath?: string | null;

  seasonNumber?: number;
  episodeNumber?: number;

  progress: number; 
  duration: number;
  currentTime: number;

  watched: boolean;

  updatedAt: number;
  createdAt: number;
}

interface WatchHistoryDB extends DBSchema {
  history: {
    key: string;
    value: WatchHistory;
    indexes: {
      "by-updatedAt": number;
      "by-mediaId": number;
      "by-mediaType": MediaType;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<WatchHistoryDB>> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<WatchHistoryDB>("movie-app", 1, {
      upgrade(db) {
        const store = db.createObjectStore("history", {
          keyPath: "key",
        });
        store.createIndex("by-updatedAt", "updatedAt");
        store.createIndex("by-mediaId", "mediaId");
        store.createIndex("by-mediaType", "mediaType");
      },
    });
  }

  return dbPromise;
}

export async function saveWatchProgress(
  data: Omit<WatchHistory, "key" | "createdAt" | "updatedAt" | "watched">
) {
  const db = await getDB();
  const key = data.mediaType === "movie" ? `movie-${data.mediaId}` : `tv-${data.mediaId}-s${data.seasonNumber}-e${data.episodeNumber}`;
  const existing = await db.get("history", key);
  const item: WatchHistory = {
    ...data,
    key,
    watched: data.progress > 0 && data.duration > 0 && data.progress / data.duration >= 0.9,
    createdAt: existing?.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  };
  await db.put("history", item);
  return item;
}

export async function initWatchHistoryDB() {
  const db = await getDB();
  return db;
}

export async function getContinueWatching(){
  const db = await getDB();
  return await db.getAllFromIndex("history", "by-updatedAt")
}

export async function deleteWatchHistory(key:string){
  const db = await getDB();
  return await db.delete("history", key);
}