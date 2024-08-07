import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from '../app/root';
import { ThemeProvider } from '../context/context';

vi.mock('@remix-run/react', () => ({
  Meta: () => <div>Meta</div>,
  Links: () => <div>Links</div>,
  Outlet: () => <div>Outlet</div>,
  ScrollRestoration: () => <div>ScrollRestoration</div>,
  Scripts: () => <div>Scripts</div>,
}));

describe('App Component', () => {
  it('renders the App component correctly with ThemeProvider and Redux Provider', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Meta')).toBeInTheDocument();
    expect(screen.getByText('Links')).toBeInTheDocument();
    expect(screen.getByText('Outlet')).toBeInTheDocument();
    expect(screen.getByText('ScrollRestoration')).toBeInTheDocument();
    expect(screen.getByText('Scripts')).toBeInTheDocument();
  });

  it('correctly integrates Redux store', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    );

    // Assuming your store has an initial state you can check
    const state = store.getState();
    expect(state.people.people.results).toHaveLength(0);
  });
});
