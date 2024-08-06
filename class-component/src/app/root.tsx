import {
  Meta,
  Links,
  ScrollRestoration,
  Outlet,
  Scripts,
} from '@remix-run/react';
import type { MetaFunction, LinksFunction } from '@remix-run/node';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import { ThemeProvider } from '../context/context';
export const links: LinksFunction = () => {
  return [
    {
      rel: 'icon',
      href: '/icon.png',
      type: 'image/svg+xml',
    },
  ];
};

export const meta: MetaFunction = () => {
  return [
    { title: 'Star Wars' },
    { name: 'Star Wars', content: 'Welcome to Remix!' },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <Provider store={store}>
        <ThemeProvider>
          <body>
            <div id="root">
              <Outlet />
            </div>
            <ScrollRestoration />
            <Scripts />
          </body>
        </ThemeProvider>
      </Provider>
    </html>
  );
}
