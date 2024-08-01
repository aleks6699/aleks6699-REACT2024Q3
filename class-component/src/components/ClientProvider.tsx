'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import ThemeProvider from '../context/context';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
