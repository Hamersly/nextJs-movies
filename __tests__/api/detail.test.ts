import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockJson = vi.fn();
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
  const id = searchParams.get('id');

  if (!format || !id) {
    return new Response(JSON.stringify({ error: 'Missing required params' }), { status: 400 });
  }
  if (!validateFormat(format)) {
    return new Response(JSON.stringify({ error: 'Invalid format' }), { status: 400 });
  }

  try {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const url = `https://api.themoviedb.org/3/${format}/${id}?api_key=${API_KEY}&language=ru-RU`;
    const detail = await tmdbFetch(url).then((res) => res.json());
    return new Response(JSON.stringify(detail), { headers: cacheHeaders() });
  } catch (e) {
    return errorResponse(e, 'detail');
  }
}

describe('GET /api/detail', () => {
  it('returns 400 if format or id missing', async () => {
    const req = new Request('http://localhost:3000/api/detail');
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('Missing required params');
  });

  it('returns 400 if format is invalid', async () => {
    const req = new Request('http://localhost:3000/api/detail?format=invalid&id=123');
    const res = await GET(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('Invalid format');
  });

  it('fetches detail successfully for movie format', async () => {
    const mockData = { title: 'Test Movie', overview: 'A test movie' };
    mockJson.mockResolvedValueOnce(mockData);
    mockFetch.mockResolvedValueOnce({ ok: true, json: mockJson });

    const req = new Request('http://localhost:3000/api/detail?format=movie&id=123');
    const res = await GET(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.title).toBe('Test Movie');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/123?api_key=test_key&language=ru-RU',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('fetches detail successfully for tv format', async () => {
    const mockData = { name: 'Test TV', overview: 'A test show' };
    mockJson.mockResolvedValueOnce(mockData);
    mockFetch.mockResolvedValueOnce({ ok: true, json: mockJson });

    const req = new Request('http://localhost:3000/api/detail?format=tv&id=456');
    const res = await GET(req);
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.name).toBe('Test TV');
  });

  it('returns 502 on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const req = new Request('http://localhost:3000/api/detail?format=movie&id=123');
    const res = await GET(req);
    expect(res.status).toBe(502);

    const body = await res.json();
    expect(body.error).toBe(true);
  });
});
