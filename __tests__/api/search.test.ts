import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockData = { results: [{ id: 1, title: 'Found Movie' }], page: 1, total_pages: 1 };
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
  const queryPage = searchParams.get('queryPage');
  const query = searchParams.get('query');
  const format = searchParams.get('format') || 'movie';

  if (!query || !queryPage) {
    return new Response(JSON.stringify({ error: 'Missing required params' }), { status: 400 });
  }
  if (!validateFormat(format)) {
    return new Response(JSON.stringify({ error: 'Invalid format' }), { status: 400 });
  }

  try {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const url = `https://api.themoviedb.org/3/search/${format}?api_key=${API_KEY}&language=ru-RU&query=${query}&page=${queryPage}`;
    const searchResult = await tmdbFetch(url).then((res) => res.json());
    return new Response(JSON.stringify(searchResult), { headers: cacheHeaders() });
  } catch (e) {
    return errorResponse(e, 'search');
  }
}

describe('GET /api/search', () => {
  it('returns 400 if params missing', async () => {
    const req = new Request('http://localhost:3000/api/search');
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it('returns 400 if format is invalid', async () => {
    const req = new Request(
      'http://localhost:3000/api/search?query=test&queryPage=1&format=invalid',
    );
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it('searches successfully with default format (movie)', async () => {
    const req = new Request('http://localhost:3000/api/search?query=batman&queryPage=1');
    const res = await GET(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.results).toHaveLength(1);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/search/movie?api_key=test_key&language=ru-RU&query=batman&page=1',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('searches with explicit format', async () => {
    const req = new Request(
      'http://localhost:3000/api/search?query=breaking&queryPage=1&format=tv',
    );
    const res = await GET(req);
    expect(res.status).toBe(200);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/search/tv?api_key=test_key&language=ru-RU&query=breaking&page=1',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('returns 502 on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    const req = new Request('http://localhost:3000/api/search?query=test&queryPage=1');
    const res = await GET(req);
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.error).toBe(true);
  });
});
