import { render, screen } from '@testing-library/react';
import { ContentUnit } from '@/components/ContentUnit/ContentUnit';

const movieContent = {
  poster_path: '/poster.jpg',
  id: 123,
  title: 'Inception',
  name: '',
  original_title: 'Inception',
  original_name: '',
  release_date: '2010-07-16',
  first_air_date: '',
  popularity: 95.5,
};

const tvContent = {
  poster_path: '/tv-poster.jpg',
  id: 456,
  title: '',
  name: 'Breaking Bad',
  original_title: '',
  original_name: 'Breaking Bad',
  release_date: '',
  first_air_date: '2008-01-20',
  popularity: 88.3,
};

describe('ContentUnit', () => {
  it('renders movie title in heading', () => {
    render(<ContentUnit format="movie" content={movieContent} />);
    expect(screen.getByRole('heading', { name: /Inception/ })).toBeInTheDocument();
  });

  it('renders TV name in heading', () => {
    render(<ContentUnit format="tv" content={tvContent} />);
    expect(screen.getByRole('heading', { name: /Breaking Bad/ })).toBeInTheDocument();
  });

  it('renders release date for movie', () => {
    render(<ContentUnit format="movie" content={movieContent} />);
    expect(screen.getByText(/2010-07-16/)).toBeInTheDocument();
  });

  it('renders first air date for TV', () => {
    render(<ContentUnit format="tv" content={tvContent} />);
    expect(screen.getByText(/2008-01-20/)).toBeInTheDocument();
  });

  it('renders popularity rating', () => {
    render(<ContentUnit format="movie" content={movieContent} />);
    expect(screen.getByText(/95.5/)).toBeInTheDocument();
  });

  it('links to the correct movie detail page', () => {
    render(<ContentUnit format="movie" content={movieContent} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/movie/123');
  });
});
