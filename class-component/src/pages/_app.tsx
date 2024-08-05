import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import '../styles/switchTheme.css';
import { ThemeProvider } from '../context/context';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Head>
          <title>Star Wars</title>
          <meta name="description" content="This is my app" />
          <meta property="og:title" content="Star Wars" />
          <meta
            property="og:description"
            content="This is my app description"
          />
          <link rel="icon" href="/icon.png" />
        </Head>
        <div>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </Provider>
  );
}
