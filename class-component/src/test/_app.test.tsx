/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../pages/_app'; // Убедитесь, что путь верен
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../context/context'; // Убедитесь, что путь верен
import { NextComponentType, NextPageContext } from 'next';

const MockComponent = () => <div>Test Component</div>;

interface CustomAppProps {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: any;
}

const MockApp = ({ Component, pageProps }: CustomAppProps) => (
  <Provider store={store}>
    <ThemeProvider>
      <App
        Component={Component}
        pageProps={pageProps}
        router={pageProps.router}
      />
    </ThemeProvider>
  </Provider>
);

describe('App Component', () => {
  it('renders the App component correctly', () => {
    render(<MockApp Component={MockComponent} pageProps={{}} />);

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
