import {NextResponse} from 'next/server';

export async function GET() {
  const API_KEY: string | undefined = process.env.REACT_APP_API_KEY;
  const BASE_URL: string = 'https://api.themoviedb.org/3';
  const url: string = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=ru-RU&sort_by=popularity.desc`;
  const topList = await fetch(url, {
    cache: 'no-cache',
    next: {
      revalidate: 60
    }
  }).then(res => res.json());
  return NextResponse.json(topList);
}