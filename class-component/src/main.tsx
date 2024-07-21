import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NotFound from './components/not-found/not-found';
import DetailsPerson from './components/details-person/details-person';
import { ThemeProvider } from './context/context';
import { Provider } from 'react-redux';
import { store } from './store/store';

// Определите маршруты
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/', // Обновите путь по необходимости
        element: <DetailsPerson />,
      },
      {
        path: '*',
        element: <NotFound />, // Используйте NotFound для не определенных маршрутов
      },
    ],
  },
]);

// Рендеринг приложения
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
