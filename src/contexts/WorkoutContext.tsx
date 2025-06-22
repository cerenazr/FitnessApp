import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Playlist {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  url: string;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

interface WorkoutContextType {
  playlists: Playlist[];
  loading: boolean;
  error: string | null;
  fetchPlaylists: () => Promise<void>;
  getVideos: (playlistId: string) => Promise<Video[]>;
  completed: Record<string, boolean>;
  toggleCompleted: (videoId: string) => void;
  favorites: Playlist[];
  addFavorite: (playlist: Playlist) => void;
  removeFavorite: (playlistId: string) => void;
  isFavorite: (playlistId: string) => boolean;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const useWorkoutContext = () => {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error("useWorkoutContext must be used within WorkoutProvider");
  return ctx;
};

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<Playlist[]>([]);

  // Load completed videos from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("completedVideos");
    if (stored) setCompleted(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("completedVideos", JSON.stringify(completed));
  }, [completed]);

  // Load favorite playlists from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favoritePlaylists");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritePlaylists", JSON.stringify(favorites));
  }, [favorites]);

  const fetchPlaylists = async () => {
    setLoading(true);
    setError(null);
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    const CHANNEL_ID = 'UCTt6bppWLHd-VikoyPp_whg';
    if (!API_KEY) {
      setError("API key bulunamadı!");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=25&key=${API_KEY}`
      );
      if (!res.ok) throw new Error('YouTube API isteği başarısız');
      const data = await res.json();
      setPlaylists(
        data.items.map((item: { id: string; snippet: { title: string; description: string; thumbnails: { medium: { url: string } } } }) => ({
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium.url,
          url: `https://www.youtube.com/playlist?list=${item.id}`
        }))
      );
    } catch{
      setError("Playlistler yüklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  // YouTube API playlistItems response tipini tanımla
  interface YouTubePlaylistItem {
    snippet: {
      resourceId: { videoId: string };
      title: string;
    };
  }

  // Playlist'ten videoları çek
  const getVideos = async (playlistId: string): Promise<Video[]> => {
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!API_KEY) return [];
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${API_KEY}`
      );
      if (!res.ok) throw new Error('YouTube API isteği başarısız');
      const data = await res.json();
      return data.items.map((item: YouTubePlaylistItem) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
      }));
    } catch {
      return [];
    }
  };
  const toggleCompleted = (videoId: string) => {
    setCompleted((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const addFavorite = (playlist: Playlist) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === playlist.id) ? prev : [...prev, playlist]
    );
  };

  const removeFavorite = (playlistId: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== playlistId));
  };

  const isFavorite = (playlistId: string) => {
    return favorites.some((p) => p.id === playlistId);
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        playlists,
        loading,
        error,
        fetchPlaylists,
        getVideos,
        completed,
        toggleCompleted,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};