import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockData = { results: [{ id: 1, title: 'Movie' }], page: 1, total_pages: 5 };
const mockJson = vi.fn().mockResolvedValue(mockData);
const mockFetch = vi.fn(() => Promise.resolve({ ok: true, json: mockJson }));
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => {
  vi.clearAllMocks();
  process.env.REACT_APP_API_KEY = 'test_key';
});

async function GET(req: Request) {
  const { validateFormat, tmdbFetch, cacheHeaders, errorResponse } =
    await import('@/helpers/tmdbFetch');
  const { searchParams } = new URL(req.url);
  const format = searchParams.get('format');
  const sort = searchParams.get('sort');
  const listPage = searchParams.get('listPage');

  if (!format || !sort || !listPage) {
    return new Response(JSON.stringify({ error: 'Missing required params' }), { status: 400 });
  }
  if (!validateFormat(format)) {
    return new Response(JSON.stringify({ error: 'Invalid format' }), { status: 400 });
  }

  try {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/${format}?api_key=${API_KEY}&language=ru-RU&sort_by=${sort}.desc&page=${listPage}`;
    const list = await tmdbFetch(url).then((res) => res.json());
    return new Response(JSON.stringify(list), { headers: cacheHeaders() });
  } catch (e) {
    return errorResponse(e, 'list');
  }
}

describe('GET /api/list', () => {
  it('returns 400 if params missing', async () => {
    const req = new Request('http://localhost:3000/api/list');
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it('returns 400 if format is invalid', async () => {
    const req = new Request(
      'http://localhost:3000/api/list?format=invalid&sort=popularity&listPage=1',
    );
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it('fetches list successfully', async () => {
    const req = new Request(
      'http://localhost:3000/api/list?format=movie&sort=popularity&listPage=1',
    );
    const res = await GET(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.results).toHaveLength(1);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/discover/movie?api_key=test_key&language=ru-RU&sort_by=popularity.desc&page=1',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('returns 502 on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Timeout'));
    const req = new Request(
      'http://localhost:3000/api/list?format=movie&sort=popularity&listPage=1',
    );
    const res = await GET(req);
    expect(res.status).toBe(502);
  });
});
