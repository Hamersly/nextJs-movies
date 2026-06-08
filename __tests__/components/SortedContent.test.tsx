import { render, screen, fireEvent } from '@testing-library/react';
import { SortedContent } from '@/components/SortedContent/SortedContent';

describe('SortedContent', () => {
  it('renders a select', () => {
    const mockSort = vi.fn();
    render(<SortedContent sort={mockSort} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('calls sort callback on selection', async () => {
    const mockSort = vi.fn();
    render(<SortedContent sort={mockSort} />);
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);
    const option = screen.getByText(/По дате/);
    fireEvent.click(option);
    expect(mockSort).toHaveBeenCalledWith('release_date');
  });
});
