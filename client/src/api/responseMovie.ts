interface MovieResults {
  title: string;
  name?: string;
  id: number;
  media_type?: string;
  backdrop_path: string;
  poster_path: string;
  adult: boolean;
  genre_ids: number[];
  genres: { id: number; name: string }[];
  video: boolean;
  videos?: {
    results: VideosData[];
  };
  runtime?: number;
  vote_average: number;
  vote_count: number;
  popularity: number;
  release_date: string;
  overview: string;
  original_title?: string;
  original_language?: string;
  first_air_date?: string;
  original_name?: string;
  key?: null;
}

interface VideosData {
  id: string;
  key: string;
  name: string;
  type: string;
  published_at?: string;
}

export type { MovieResults };
