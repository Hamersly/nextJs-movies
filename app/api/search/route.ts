import {NextResponse} from 'next/server';

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const queryPage = searchParams.get('queryPage');
  const query = searchParams.get('query');
  const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;
  const BASE_URL: string = 'https://api.themoviedb.org/3/';
  const url: string = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=ru-RU&query=${query}&page=${queryPage}`;

  const searchResult = await fetch(url, {
    cache: 'no-cache',
    next: {
      revalidate: 60
    }
  }).then(res => res.json());
  return NextResponse.json(searchResult);
}
