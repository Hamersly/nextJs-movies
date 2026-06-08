import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from '@/components/Search/Search';

const { mockPush } = vi.hoisted(() => ({
  mockPush: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('Search', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders an input field', () => {
    render(<Search />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('updates value on typing', () => {
    render(<Search />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'batman' } });
    expect(input).toHaveValue('batman');
  });

  it('navigates to search on Enter', () => {
    render(<Search />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'batman' } });
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(mockPush).toHaveBeenCalledWith('/search/batman');
  });

  it('clears input after navigation', () => {
    render(<Search />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'batman' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input).toHaveValue('');
  });

  it('does not navigate on empty input', () => {
    render(<Search />);
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    expect(mockPush).not.toHaveBeenCalled();
  });
});
