// __tests__/RootLayout.test.tsx
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '../app/layout';
import React from 'react';

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('includes favicon link', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    const linkElement = container.querySelector("link[rel='icon']");
    expect(linkElement).toHaveAttribute('href', '/icon.png');
    expect(linkElement).toHaveAttribute('type', 'image/png');
  });

  it('sets the language attribute on the html element', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );
    expect(container.querySelector('html')).toHaveAttribute('lang', 'en');
  });
});
