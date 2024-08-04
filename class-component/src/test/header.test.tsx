import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/header/header';
import { vi } from 'vitest';

vi.mock('../hooks/useTheme', () => ({
  __esModule: true,
  default: () => ({ theme: true, toggleTheme: vi.fn() }),
}));

describe('Header Component', () => {
  const mockOnInput = vi.fn();
  const mockOnClick = vi.fn();
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    mockOnInput.mockClear();
    mockOnClick.mockClear();
    mockToggleTheme.mockClear();
  });

  test('renders InputSearch and Button components', () => {
    render(
      <Header inputValue="test" onInput={mockOnInput} onClick={mockOnClick} />
    );

    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button', { name: /search/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('handles button click', () => {
    render(
      <Header inputValue="test" onInput={mockOnInput} onClick={mockOnClick} />
    );

    const buttonElement = screen.getByRole('button', { name: /search/i });
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalled();
  });
});
