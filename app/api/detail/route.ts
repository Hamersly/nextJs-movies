import { NextResponse } from 'next/server';
import { validateFormat, tmdbFetch, cacheHeaders, errorResponse } from '@/helpers/tmdbFetch';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format');
    const id = searchParams.get('id');

    if (!format || !id) {
      return NextResponse.json({ error: 'Missing required params' }, { status: 400 });
    }
    if (!validateFormat(format)) {
      return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
    }

    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3';
    const url = `${BASE_URL}/${format}/${id}?api_key=${API_KEY}&language=ru-RU`;
    const detail = await tmdbFetch(url).then((res) => res.json());

    return NextResponse.json(detail, { headers: cacheHeaders() });
  } catch (e) {
    return errorResponse(e, 'detail');
  }
}
