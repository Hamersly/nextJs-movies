import { render, screen, fireEvent } from '@testing-library/react';
import { MenuEl } from '@/components/MenuEl/MenuEl';

describe('MenuEl', () => {
  it('renders a menu button', () => {
    render(<MenuEl />);
    expect(screen.getByLabelText('menu')).toBeInTheDocument();
  });

  it('opens menu on button click', () => {
    render(<MenuEl />);
    fireEvent.click(screen.getByLabelText('menu'));
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Фильмы')).toBeInTheDocument();
    expect(screen.getByText('Сериалы')).toBeInTheDocument();
  });

  it('contains links to main routes', () => {
    render(<MenuEl />);
    fireEvent.click(screen.getByLabelText('menu'));
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/movie');
    expect(links[2]).toHaveAttribute('href', '/tv');
  });
});
