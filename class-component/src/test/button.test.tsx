import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Button from '../components/header/button/button';

describe('Button', () => {
  it('renders button with correct text', () => {
    render(<Button />);
    const buttonElement = screen.getByRole('button', { name: /Search/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick function when button is clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} />);
    const buttonElement = screen.getByRole('button', { name: /Search/i });

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
