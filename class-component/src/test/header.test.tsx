import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/header/header';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Header component', () => {
  it('renders Header component correctly', () => {
    const mockOnInput = vi.fn();
    const mockOnClick = vi.fn();
    const inputValue = 'test value';

    render(
      <Header
        inputValue={inputValue}
        onInput={mockOnInput}
        onClick={mockOnClick}
      />
    );

    const input = screen.getByDisplayValue(inputValue);
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('calls onInput function when input value changes', () => {
    const mockOnInput = vi.fn();
    const mockOnClick = vi.fn();
    const inputValue = '';

    render(
      <Header
        inputValue={inputValue}
        onInput={mockOnInput}
        onClick={mockOnClick}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.input(input, { target: { value: 'new value' } });

    expect(mockOnInput).toHaveBeenCalled();
  });

  it('calls onClick function when button is clicked', () => {
    const mockOnInput = vi.fn();
    const mockOnClick = vi.fn();
    const inputValue = '';

    render(
      <Header
        inputValue={inputValue}
        onInput={mockOnInput}
        onClick={mockOnClick}
      />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
