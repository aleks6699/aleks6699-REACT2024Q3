import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

describe('App Component', () => {
  it('renders App component', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    const headerElement = screen.getByText(/Search/i);
    expect(headerElement).toBeInTheDocument();

    const loadingElement = screen.getByAltText('loading');
    expect(loadingElement).toBeInTheDocument();
  });
});
