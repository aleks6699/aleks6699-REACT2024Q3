import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import InputSearch from '../components/header/input/input-search';
import ThemeProvider from '../context/context';

describe('InputSearch Component', () => {
  test('calls onInput handler when input changes', () => {
    const mockOnInput = vi.fn();

    render(
      <ThemeProvider>
        {}
        <InputSearch value="test" onInput={mockOnInput} />
      </ThemeProvider>
    );

    fireEvent.input(screen.getByPlaceholderText('Search'), {
      target: { value: 'New Input' },
    });

    expect(mockOnInput).toHaveBeenCalled();
  });
});
