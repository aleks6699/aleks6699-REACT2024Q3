import { render, screen, fireEvent } from '@testing-library/react';
import InputSearch from '../components/header/input/input-search';
import { vi } from 'vitest';

describe('InputSearch Component', () => {
  test('calls onInput handler when input changes', () => {
    const mockOnInput = vi.fn();
    render(<InputSearch value="test" onInput={mockOnInput} />);

    fireEvent.input(screen.getByPlaceholderText('Search'), {
      target: { value: 'New Input' },
    });

    expect(mockOnInput).toHaveBeenCalled();
  });
});
