import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer/Footer';

describe('Footer', () => {
  it('renders credit text', () => {
    render(<Footer />);
    expect(screen.getByText(/Created by Hamersly/)).toBeInTheDocument();
  });

  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/Все права защищены/)).toBeInTheDocument();
  });

  it('renders an avatar image', () => {
    render(<Footer />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/avatarka_Indian_chief.png');
  });
});
