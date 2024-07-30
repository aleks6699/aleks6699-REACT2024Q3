import type { AppProps } from 'next/app';
import '../styles/global.css';
import '../styles/switchTheme.css';
import { ThemeProvider } from '../context/context';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <div>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </Provider>
  );
}
