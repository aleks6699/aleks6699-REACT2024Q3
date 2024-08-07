// src/test/main.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Main } from '../components/main/result';
import { ResponseList } from '../Home';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../context/context'; // Adjust import as needed

// Mocking Remix hooks
vi.mock('@remix-run/react', () => ({
  useLoaderData: () => ({
    personDetails: {
      name: 'Luke Skywalker',
      url: 'https://swapi.dev/api/people/1/',
    },
  }),
  useSearchParams: () => [new URLSearchParams(), () => {}],
}));

describe('Main Component', () => {
  it('renders without crashing', () => {
    const results: ResponseList = {
      count: 10,
      next: null,
      previous: null,
      results: [
        {
          name: 'Luke Skywalker',
          url: 'https://swapi.dev/api/people/1/',
          height: '',
          mass: '',
          hair_color: '',
          skin_color: '',
          gender: '',
        },
      ],
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Main results={results} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
