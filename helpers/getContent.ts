import { IDetailResponse, IListResponse } from '@/types/types';

const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;

async function fetchJSON<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return response.json();
}

export async function getTopList(): Promise<IListResponse> {
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ru-RU&sort_by=popularity.desc&page=1`;
    return await fetchJSON<IListResponse>(url);
  } catch (e) {
    console.error('getTopList failed:', e);
    return { results: [], page: 1, total_pages: 1 };
  }
}

export const getDetail = async (
  format: string | null,
  id: string | null,
  signal?: AbortSignal,
): Promise<IDetailResponse> => {
  return fetchJSON<IDetailResponse>(`/api/detail?format=${format}&id=${id}`, signal);
};

export const getContentList = async (
  format: string,
  sort: string,
  listPage: number = 1,
  signal?: AbortSignal,
): Promise<IListResponse> => {
  return fetchJSON<IListResponse>(
    `/api/list?format=${format}&sort=${sort}&listPage=${listPage}`,
    signal,
  );
};

export const getSearchResult = async (
  query: string | null,
  queryPage: number = 1,
  signal?: AbortSignal,
): Promise<IListResponse> => {
  return fetchJSON<IListResponse>(`/api/search?queryPage=${queryPage}&query=${query}`, signal);
};
