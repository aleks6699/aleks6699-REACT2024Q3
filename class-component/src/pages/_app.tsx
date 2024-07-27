import { Inter } from 'next/font/google';
import type { AppProps } from 'next/app';
import '../styles/global.css';
import '../styles/switchTheme.css';
import { Metadata } from 'next';
import { ThemeProvider } from '../context/context';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export const metadata: Metadata = {
  title: 'StarWars',
  description: 'StarWars App',
  icons: {
    icon: '../public/icon.png',
  },
};

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </Provider>
  );
}
