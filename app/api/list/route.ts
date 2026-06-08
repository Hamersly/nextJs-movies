import { NextResponse } from 'next/server';
import { validateFormat, tmdbFetch, cacheHeaders, errorResponse } from '@/helpers/tmdbFetch';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format');
    const sort = searchParams.get('sort');
    const listPage = searchParams.get('listPage');

    if (!format || !sort || !listPage) {
      return NextResponse.json({ error: 'Missing required params' }, { status: 400 });
    }
    if (!validateFormat(format)) {
      return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
    }

    const API_KEY = process.env.REACT_APP_API_KEY;
    const BASE_URL = 'https://api.themoviedb.org/3/discover';
    const url = `${BASE_URL}/${format}?api_key=${API_KEY}&language=ru-RU&sort_by=${sort}.desc&page=${listPage}`;
    const list = await tmdbFetch(url).then((res) => res.json());

    return NextResponse.json(list, { headers: cacheHeaders() });
  } catch (e) {
    return errorResponse(e, 'list');
  }
}
