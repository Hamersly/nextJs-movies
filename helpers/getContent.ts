export const getTopList = async (): Promise<object> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/top`,{cache: 'no-cache',});
  if (!response.ok) throw new Error('Unable to fetch topList.');
  return response.json();
};

export const getContentList = async (format: string, sort: string, listPage: number = 1): Promise<object> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/list?format=${format}&sort=${sort}&listPage=${listPage}`, {cache: 'no-cache',});
  if (!response.ok) throw new Error('Unable to fetch contentList.');
  return response.json();
};

export const getDetail = async (format: string | null, id: string | null): Promise<object> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/detail?format=${format}&id=${id}`,{cache: 'no-cache',});
  if (!response.ok) throw new Error('Unable to fetch detail content.');
  return response.json();
};

export const getSearchResult = async (query: string | null, queryPage: number = 1): Promise<object> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/search?queryPage=${queryPage}&query=${query}`,{cache: 'no-cache',});
  if (!response.ok) throw new Error('Unable to fetch search result.');
  return response.json();
};

