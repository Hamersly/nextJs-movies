export interface IContent {
  poster_path: string;
  id: number;
  title: string;
  name: string;
  original_title: string;
  original_name: string;
  release_date: string;
  first_air_date: string
  popularity: number;
}

export interface IListResponse {
  page: number;
  results: [];
  total_pages: number;
}

export interface IDetailResponse {
  title?: string;
  original_title?: string;
  name?: string;
  original_name?: string;
  backdrop_path?: string;
  overview?: string;
  genres?: [{id: number, name: string}]
}

export interface IContentList {
  format: string;
  content: IListResponse;
}

export interface ISearchResponse extends IListResponse {
}

export interface IHandleChangeFunc {
  (event: object, value: number): void
}
