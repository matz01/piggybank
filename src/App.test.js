import { render, screen } from '@testing-library/react';
import App from './App';
import { calculateBar } from './calculateBar';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test('calculateBar 1', () => {
  const { widthAmount, widthMax } = calculateBar(100, 50)
  expect(widthAmount).toStrictEqual(50)
  expect(widthMax).toStrictEqual(100)
})




