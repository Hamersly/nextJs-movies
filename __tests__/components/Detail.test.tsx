import { render, screen } from '@testing-library/react';
import { Detail } from '@/components/Detail/Detail';

const { mockGetDetail } = vi.hoisted(() => {
  const data = {
    title: 'Inception',
    original_title: 'Inception',
    name: '',
    original_name: '',
    backdrop_path: '/backdrop.jpg',
    overview: 'A mind-bending thriller',
    genres: [
      { id: 1, name: 'Sci-Fi' },
      { id: 2, name: 'Thriller' },
    ],
  };
  return {
    mockGetDetail: vi.fn().mockResolvedValue(data),
  };
});

vi.mock('next/navigation', () => {
  return {
    useSearchParams: () => ({ get: () => null }),
    useParams: () => ({ slug: 'movie', id: '123' }),
  };
});

vi.mock('@/helpers/getContent', () => ({
  getDetail: mockGetDetail,
}));

describe('Detail', () => {
  beforeEach(() => {
    mockGetDetail.mockClear();
  });

  it('shows Loader on mount', () => {
    render(<Detail />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders movie title after data loads', async () => {
    render(<Detail />);
    const headings = await screen.findAllByRole('heading');
    expect(headings[0]).toHaveTextContent('Inception');
  });

  it('renders overview', async () => {
    render(<Detail />);
    expect(await screen.findByText('A mind-bending thriller')).toBeInTheDocument();
  });

  it('renders genre chips', async () => {
    render(<Detail />);
    expect(await screen.findByText('Sci-Fi')).toBeInTheDocument();
    expect(await screen.findByText('Thriller')).toBeInTheDocument();
  });

  it('calls getDetail with correct params', async () => {
    render(<Detail />);
    await screen.findAllByRole('heading');
    expect(mockGetDetail).toHaveBeenCalledWith('movie', '123', expect.any(AbortSignal));
  });
});
