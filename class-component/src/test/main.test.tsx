import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../context/context';
import { App } from '../App';
import NotFound from '../components/not-found/not-found';
import DetailsPerson from '../components/details-person/details-person';

const router = createBrowserRouter([
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
]);

describe('Main Application', () => {
  it('renders without crashing and contains main elements', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('renders NotFound component on invalid route', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider
            router={createBrowserRouter([
              {
                path: '*',
                element: <NotFound />,
              },
            ])}
          />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('handles search button click', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    );

    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
  });
});
