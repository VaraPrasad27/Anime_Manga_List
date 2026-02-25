//base for api res

type MainPicture = {
  medium: string;
  large: string;
};

type node = {
  id: number;
  title: string;
  main_picture: MainPicture;
};

type Ranking = {
  rank: number;
};

type Data = {
  node: node;
  ranking: Ranking;
};

type Genre = {
  id: number;
  name: string;
};

type Recommendations = {
  node: node;
  num_recommendations: number;
};

type APIResponse = {
  data: Data[];
};

//anime

type AnimeDetails = {
  id: number;
  title: string;
  main_picture: MainPicture;
  alternative_titles: AniAltTitle;
  start_date: string;
  end_date: string;
  synopsis: string;
  mean: number;
  rank: number;
  popularity: number;
  num_list_users: number;
  num_scoring_users: number;
  nsfw: string;
  created_at: string;
  updated_at: string;
  media_type: string;
  status: string;
  genres: Genre[];
  num_episodes: number;
  source: string;
  average_episode_duration: number;
  rating: string;
  related_anime: RelatedAnime[];
  recommendations: Recommendations[];
  studios: Studios[];
};

type Studios = {
  id: number;
  name: string;
};

type AniAltTitle = {
  synonyms: string[];
  en: string;
  ja: string;
};

type RelatedAnime = {
  node: node;
  relation_type: string;
  relation_type_formatted: string;
};

//manga

type MangaDetails = {
  id: number;
  title: string;
  main_picture: MainPicture;
  alternative_titles: MangaAltTitle;
  start_date: string;
  synopsis: string;
  mean: number;
  rank: number;
  popularity: number;
  num_list_users: number;
  num_scoring_users: number;
  nsfw: string;
  created_at: string;
  updated_at: string;
  media_type: string;
  status: string;
  genres: Genre[];
  num_volumes: number;
  num_chapters: number;
  authors: Authors[];
  related_manga: RelatedManga[];
  recommendations: Recommendations[];
  serialization: Serialization[];
};

type MangaAltTitle = {};

type Authornode = {
  id: number;
  first_name: string;
  last_name: string;
};
type Authors = {
  node: Authornode;
  role: string;
};

type RelatedManga = {
  node: node;
  relation_type: string;
  relation_type_formatted: string;
};

type Serialization = {
  node: Serializationnode;
};
type Serializationnode = {
  id: number;
  name: string;
};
