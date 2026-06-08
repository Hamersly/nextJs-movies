import { render, screen } from '@testing-library/react';
import { PageBox } from '@/components/PageBox/PageBox';

describe('PageBox', () => {
  it('renders children', () => {
    render(<PageBox>Hello World</PageBox>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
