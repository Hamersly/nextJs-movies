import { render, screen } from '@testing-library/react';
import { BasePagination } from '@/components/BasePagination/BasePagination';

describe('BasePagination', () => {
  it('renders a paginator', () => {
    const mockHandle = vi.fn();
    render(<BasePagination page={1} total_pages={10} handleChange={mockHandle} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('caps total_pages at 100', () => {
    const mockHandle = vi.fn();
    render(<BasePagination page={1} total_pages={500} handleChange={mockHandle} />);
    expect(screen.getByLabelText('Go to page 100')).toBeInTheDocument();
    expect(screen.queryByLabelText('Go to page 101')).not.toBeInTheDocument();
  });
});
