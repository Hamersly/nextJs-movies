import { getTopList, getDetail, getContentList, getSearchResult } from '@/helpers/getContent';

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('getTopList', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [{ id: 1, title: 'Test' }], page: 1, total_pages: 1 }),
    });
  });

  it('fetches from TMDB discover endpoint', async () => {
    await getTopList();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('api.themoviedb.org/3/discover/movie'),
      {},
    );
  });

  it('returns parsed JSON', async () => {
    const result = await getTopList();
    expect(result).toEqual({ results: [{ id: 1, title: 'Test' }], page: 1, total_pages: 1 });
  });

  it('includes API key in URL', async () => {
    await getTopList();
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('api_key=');
  });
});

describe('getDetail', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ title: 'Test Movie', overview: 'Test' }),
    });
  });

  it('fetches from local API detail route', async () => {
    await getDetail('movie', '123');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/detail?format=movie&id=123'),
      { signal: undefined },
    );
  });

  it('makes request with given format and id', async () => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ title: 'Test' }),
    });
    await getDetail('tv', '456');
    const url = mockFetch.mock.calls[0][0] as string;
    expect(url).toContain('format=tv');
    expect(url).toContain('id=456');
  });
});

describe('getContentList', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [], page: 1, total_pages: 1 }),
    });
  });

  it('fetches with correct params', async () => {
    await getContentList('tv', 'popularity', 2);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/list?format=tv&sort=popularity&listPage=2'),
      { signal: undefined },
    );
  });
});

describe('getSearchResult', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [], page: 1, total_pages: 0 }),
    });
  });

  it('fetches with query param', async () => {
    await getSearchResult('batman', 1);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('query=batman'), {
      signal: undefined,
    });
  });
});
