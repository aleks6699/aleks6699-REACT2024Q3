import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Main } from '../components/main/result';
import { store } from '../store/store';
import { vi } from 'vitest';
import { useGetPersonByIdQuery } from '../services/dataPersons';

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useOutletContext: vi.fn(),
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
  };
});

vi.mock('../hooks/useTheme', () => ({
  default: () => ({ theme: 'light' }),
}));

vi.mock(
  '../services/dataPersons',
  async (
    importOriginal: () => Promise<typeof import('../services/dataPersons')>
  ) => {
    const actual = await importOriginal();
    return {
      ...actual,
      useGetPersonByIdQuery: vi.fn(),
    };
  }
);

describe('Main component', () => {
  const mockResults = {
    count: 2,
    next: 'https://swapi.dev/api/people/?page=2',
    previous: null,
    results: [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        gender: 'male',
        url: 'https://swapi.dev/api/people/1/',
      },
      {
        name: 'Darth Vader',
        height: '202',
        mass: '136',
        hair_color: 'none',
        skin_color: 'white',
        gender: 'male',
        url: 'https://swapi.dev/api/people/4/',
      },
    ],
  };

  beforeEach(() => {
    (useGetPersonByIdQuery as unknown as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
    });
  });

  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Main results={mockResults} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });
});
