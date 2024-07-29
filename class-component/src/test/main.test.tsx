import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../context/context';
import { App } from '../view/pages';
import NotFound from '../components/not-found/not-found';
import DetailsPerson from '../components/details-person/details-person';

describe('Main Application', () => {
  const setup = (initialEntries = ['/']) => {
    const routes = [
      {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
          {
            path: '/',
            element: <DetailsPerson />,
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
    ];

    const router = createMemoryRouter(routes, { initialEntries });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    );
  };

  it('renders without crashing and contains main elements', () => {
    setup();

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('renders NotFound component on invalid route', () => {
    const routes = [
      {
        path: '*',
        element: <NotFound />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/invalid-route'],
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('handles search button click', () => {
    setup();

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
  });
});
