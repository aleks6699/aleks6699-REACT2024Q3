import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Flyout from '../components/flyout/flyout';
import { vi } from 'vitest';
import { RootState } from '../store/store';
import ThemeProvider from '../context/context';

interface FavoritesState {
  favoritesList: {
    favoritesList: { id: number; name: string }[];
  };
}

vi.mock('../utils/convertCsv', () => ({
  __esModule: true,
  default: vi.fn(() => 'data:text/csv;charset=utf-8,Example CSV data'),
}));

const mockState: FavoritesState = {
  favoritesList: {
    favoritesList: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ],
  },
};

vi.mock('react-redux', () => ({
  useDispatch: () => vi.fn(),
  useSelector: (selector: (state: RootState) => unknown) =>
    selector(mockState as RootState),
}));

describe('Flyout Component', () => {
  test('renders Flyout component and checks download link', () => {
    render(
      <ThemeProvider>
        {' '}
        {}
        <Flyout />
      </ThemeProvider>
    );

    const downloadLink = screen.getByText('Download');
    expect(downloadLink).toBeInTheDocument();
    expect(downloadLink).toHaveAttribute(
      'href',
      'data:text/csv;charset=utf-8,Example CSV data'
    );
    expect(downloadLink).toHaveAttribute('download', 'starwars_2.csv');
  });
});
