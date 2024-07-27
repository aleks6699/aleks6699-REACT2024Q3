import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { MagicCheckbox } from '../components/checkedCards/checkedCards';

describe('MagicCheckbox Component', () => {
  test('renders MagicCheckbox and simulates user interaction', () => {
    const mockOnChange = vi.fn();

    render(<MagicCheckbox onCange={mockOnChange} checked={false} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalled();
  });
});
