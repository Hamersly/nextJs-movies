// Интерфейсы данных TMDB, используемые на клиенте и сервере.
// IContent — общий для фильмов и сериалов (поля дублируются API).
export interface IContent {
  poster_path: string;
  id: number;
  title: string;
  name: string;
  original_title: string;
  original_name: string;
  release_date: string;
  first_air_date: string;
  popularity: number;
}

export interface IListResponse {
  page: number;
  results: IContent[];
  total_pages: number;
}

export interface IDetailResponse {
  title?: string;
  original_title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  overview?: string;
  genres?: Array<{ id: number; name: string }>;
}

export interface IHandleChangeFunc {
  (event: React.ChangeEvent<unknown>, value: number): void;
}
