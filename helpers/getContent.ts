
export const getTopList = async (): Promise<object> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/top`,
    {
      cache: 'no-cache',
      // mode: 'no-cors',
      // headers: {
      //   // 'Content-Type': 'application/json',
      //   'Access-Control-Allow-Credentials': 'true',
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
      //   'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
      // }
    });
  if (!response.ok) throw new Error('Unable to fetch topList.');
  return response.json();
};

export const getContentList = async (format: string, sort: string, listPage: number = 1): Promise<object> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/list?format=${format}&sort=${sort}&listPage=${listPage}`, {cache: 'no-cache', mode: 'no-cors',});
  if (!response.ok) throw new Error('Unable to fetch contentList.');
  return response.json();
};

export const getDetail = async (format: string | null, id: string | null): Promise<object> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/detail?format=${format}&id=${id}`,{cache: 'no-cache', mode: 'no-cors',});
  if (!response.ok) throw new Error('Unable to fetch detail content.');
  return response.json();
};

export const getSearchResult = async (query: string | null, queryPage: number = 1): Promise<object> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/search?queryPage=${queryPage}&query=${query}`,{cache: 'no-cache', mode: 'no-cors',});
  if (!response.ok) throw new Error('Unable to fetch search result.');
  return response.json();
};

