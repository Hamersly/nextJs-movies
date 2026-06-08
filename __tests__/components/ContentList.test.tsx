import { render, screen } from '@testing-library/react';
import { ContentList } from '@/components/ContentList/ContentList';

const mockResult = {
  poster_path: '/p1.jpg',
  id: 1,
  title: 'Movie 1',
  name: '',
  original_title: 'Movie 1',
  original_name: '',
  release_date: '2020-01-01',
  first_air_date: '',
  popularity: 90,
};

const { mockGetContentList, mockGetSearchResult } = vi.hoisted(() => ({
  mockGetContentList: vi.fn(),
  mockGetSearchResult: vi.fn(),
}));

vi.mock('@/helpers/getContent', () => ({
  getContentList: mockGetContentList,
  getSearchResult: mockGetSearchResult,
}));

describe('ContentList', () => {
  beforeEach(() => {
    sessionStorage.clear();
    mockGetContentList.mockReset();
    mockGetSearchResult.mockReset();
    mockGetContentList.mockResolvedValue({
      results: [mockResult],
      page: 1,
      total_pages: 5,
    });
    mockGetSearchResult.mockResolvedValue({
      results: [mockResult],
      page: 1,
      total_pages: 5,
    });
  });

  it('shows Loader on mount', () => {
    render(<ContentList format="movie" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders items after data loads', async () => {
    render(<ContentList format="movie" />);
    const heading = await screen.findByRole('heading', { name: /"Movie 1"/ });
    expect(heading).toBeInTheDocument();
  });

  it('shows empty message when no results', async () => {
    mockGetContentList.mockResolvedValueOnce({
      results: [],
      page: 1,
      total_pages: 0,
    });
    render(<ContentList format="movie" />);
    const msg = await screen.findByText('Ничего не найдено:(');
    expect(msg).toBeInTheDocument();
  });

  it('shows pagination when items exist', async () => {
    render(<ContentList format="movie" />);
    const navs = await screen.findAllByRole('navigation');
    expect(navs.length).toBeGreaterThanOrEqual(1);
  });

  it('calls getSearchResult in search mode', async () => {
    render(<ContentList search="batman" />);
    await screen.findByRole('heading', { name: /"Movie 1"/ });
    expect(mockGetSearchResult).toHaveBeenCalled();
  });

  it('does not show sort dropdown in search mode', async () => {
    render(<ContentList search="batman" />);
    await screen.findByRole('heading', { name: /"Movie 1"/ });
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });
});
