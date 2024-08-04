import { render, screen, fireEvent } from '@testing-library/react';
import MagicCheckbox from '../components/checkedCards/checkedCards';
import { vi } from 'vitest';

describe('MagicCheckbox', () => {
  it('renders the checkbox with correct label', () => {
    render(<MagicCheckbox onCange={vi.fn()} checked={false} />);
    expect(screen.getByLabelText(/Selected card/i)).toBeInTheDocument();
  });

  it('calls onCange when the checkbox is clicked', () => {
    const handleChange = vi.fn();
    render(<MagicCheckbox onCange={handleChange} checked={false} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders the checkbox with correct checked state', () => {
    render(<MagicCheckbox onCange={vi.fn()} checked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
