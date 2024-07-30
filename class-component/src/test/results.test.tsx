import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Main } from '../components/main/result';
import { Provider } from 'react-redux';
import { store } from '../store/store'; // Убедитесь, что путь верен
import { ThemeProvider } from '../context/context';
import { ResponseList, People } from '../pages'; // Убедитесь, что путь верен

// Моки
const mockResults: ResponseList = {
  count: 2,
  next: null,
  previous: null,
  results: [
    {
      name: 'Luke Skywalker',
      url: 'https://swapi.dev/api/people/1/',
      height: '172',
      mass: '77',
      hair_color: 'blonde',
      skin_color: 'fair',
      eye_color: 'blue',
      gender: 'male',
    },
    {
      name: 'Leia Organa',
      url: 'https://swapi.dev/api/people/2/',
      height: '150',
      mass: '49',
      hair_color: 'brown',
      skin_color: 'light',
      eye_color: 'brown',
      gender: 'female',
    },
  ],
};

const mockPersonDetails: People = {
  name: 'Luke Skywalker',
  url: 'https://swapi.dev/api/people/1/',
  height: '172',
  mass: '77',
  hair_color: 'blonde',
  skin_color: 'fair',
  eye_color: 'blue',
  gender: 'male',
};

// Мок функции
const mockClickPagination = vi.fn();

// Мок useRouter
vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {
      search: '',
      page: '1',
    },
  }),
}));

describe('Main Component', () => {
  it('renders the Main component and displays items', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Main
            results={mockResults}
            clickPagination={mockClickPagination}
            activePage="1"
            personDetails={mockPersonDetails}
          />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });
});
