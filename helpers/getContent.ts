export async function getTopList() {
  const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;
  const BASE_URL: string = 'https://api.themoviedb.org/3';
  const url: string = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ru-RU&sort_by=popularity.desc`;
  const response = await fetch(url);
  return await response.json();
}

export const getDetail = async (format: string | null, id: string | null): Promise<object> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/detail?format=${format}&id=${id}`,{cache: 'no-cache', mode: 'no-cors',});
  if (!response.ok) throw new Error('Unable to fetch detail content.');
  return response.json();
};

export const getContentList = async (format: string, sort: string, listPage: number = 1): Promise<object> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/list?format=${format}&sort=${sort}&listPage=${listPage}`, {
    cache: 'no-cache',
    mode: 'no-cors',
  });
  if (!response.ok) throw new Error('Unable to fetch contentList.');
  return response.json();
};

export const getSearchResult = async (query: string | null, queryPage: number = 1): Promise<object> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/search?queryPage=${queryPage}&query=${query}`, {
    cache: 'no-cache',
    mode: 'no-cors',
  });
  if (!response.ok) throw new Error('Unable to fetch search result.');
  return response.json();
};

