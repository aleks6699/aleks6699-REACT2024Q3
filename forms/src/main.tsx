import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormUncontrolled from './view/formUncontrolled.tsx';
import FormControlled from './view/formControlled.tsx';
import Main from './view/content.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'forms-uncontrolled',
        element: <FormUncontrolled />,
      },
      {
        path: 'forms-controlled',
        element: <FormControlled />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
