import { render, screen } from '@testing-library/react';
import App from './App';

test('renders github repositories heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Github Repositories Page/i);
  expect(headingElement).toBeInTheDocument();
});
