import {NextResponse} from 'next/server';

export async function GET(req: Request) {
  const {searchParams} = new URL(req.url);
  const format = searchParams.get('format');
  const sort = searchParams.get('sort');
  const listPage = searchParams.get('listPage');
  const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;
  const BASE_URL: string = 'https://api.themoviedb.org/3/discover';
  const url: string = `${BASE_URL}/${format}?api_key=${API_KEY}&language=ru-RU&sort_by=${sort}.desc&page=${listPage}`;
  const list = await fetch(url, {
    next: {
      revalidate: 60
    }
  }).then(res => res.json());
  return NextResponse.json(list);
}