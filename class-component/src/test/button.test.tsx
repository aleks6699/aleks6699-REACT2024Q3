import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Button from '../components/header/button/button';
import { ThemeProvider } from '../context/context';

describe('Button', () => {
  it('renders button with correct text', () => {
    render(
      <ThemeProvider>
        {' '}
        {}
        <Button />
      </ThemeProvider>
    );
    const buttonElement = screen.getByRole('button', { name: /Search/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick function when button is clicked', () => {
    const handleClick = vi.fn();
    render(
      <ThemeProvider>
        {' '}
        {/* Оборачиваем в ThemeProvider */}
        <Button onClick={handleClick} />
      </ThemeProvider>
    );
    const buttonElement = screen.getByRole('button', { name: /Search/i });

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
