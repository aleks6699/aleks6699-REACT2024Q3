import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../components/header/button/button';

import { vi, test, expect } from 'vitest';

describe('Button component', () => {
  test('renders button with text "Search"', () => {
    const { getByText } = render(<Button />);
    const buttonElement = getByText(/search/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick} />);
    const buttonElement = getByText(/search/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
