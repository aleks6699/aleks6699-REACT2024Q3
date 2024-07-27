import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SwitchTheme from '../components/header/switchTheme/switchTheme';
import { vi } from 'vitest';

const toggleThemeMock = vi.fn();

vi.mock('../hooks/useTheme', () => ({
  __esModule: true,
  default: () => ({
    theme: true,
    toggleTheme: toggleThemeMock,
  }),
}));

describe('SwitchTheme Component', () => {
  test('renders SwitchTheme component and calls toggleTheme on click', () => {
    render(<SwitchTheme />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();

    const label = screen.getByLabelText('');
    expect(label).toBeInTheDocument();

    const thumb = screen.getByTestId('thumb');
    expect(thumb).toBeInTheDocument();

    fireEvent.click(checkbox);

    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
