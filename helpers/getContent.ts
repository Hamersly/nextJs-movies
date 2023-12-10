export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || process.env.NEXT_PUBLIC_URL;

export const getTopList = async (): Promise<object> => {
  const response = await fetch(`${NEXT_URL}/api/top`);
  if (!response.ok) throw new Error('Unable to fetch topList.');
  return response.json();
};

export const getContentList = async (format: string, sort: string, listPage: number = 1): Promise<object> => {
  const response = await fetch(`${NEXT_URL}/api/list?format=${format}&sort=${sort}&listPage=${listPage}`);
  if (!response.ok) throw new Error('Unable to fetch topList.');
  return response.json();
};

export const getDetail = async (format: string | null, id: string | null): Promise<object> => {
  const response = await fetch(`${NEXT_URL}/api/detail?format=${format}&id=${id}`);
  if (!response.ok) throw new Error('Unable to fetch detail content.');
  return response.json();
};

export const getSearchResult = async (query: string | null, queryPage: number = 1): Promise<object> => {
  const response = await fetch(`${NEXT_URL}/api/search?queryPage=${queryPage}&query=${query}`);
  if (!response.ok) throw new Error('Unable to fetch detail content.');
  return response.json();
};

