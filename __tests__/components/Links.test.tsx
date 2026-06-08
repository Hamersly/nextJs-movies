import { render, screen } from '@testing-library/react';
import { Links } from '@/components/Links/Links';

describe('Links', () => {
  it('renders children inside an anchor', () => {
    render(<Links href="/test">Click me</Links>);
    const link = screen.getByRole('link', { name: /Click me/ });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('accepts an object href', () => {
    render(
      <Links href={{ pathname: '/movie/123', query: { format: 'movie', id: '123' } }}>
        Detail
      </Links>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/movie/123');
  });
});
