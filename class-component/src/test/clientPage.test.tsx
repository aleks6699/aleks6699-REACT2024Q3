import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ClientProvider from '../components/ClientProvider';

const TestComponent = () => {
  return <div>Test Component</div>;
};

describe('ClientProvider', () => {
  it('should render children within the provider', () => {
    render(
      <ClientProvider>
        <TestComponent />
      </ClientProvider>
    );

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
