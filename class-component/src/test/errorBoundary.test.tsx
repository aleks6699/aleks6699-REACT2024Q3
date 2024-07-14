import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/errorBoundary/errorBoundary';
import { describe, it, expect, vi } from 'vitest';

describe('ErrorBoundary component', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders error message when an error occurs', () => {
    const originalConsoleError = console.error;
    console.error = vi.fn();

    interface TestComponentProps {
      shouldThrow: boolean;
    }

    class TestComponent extends React.Component<TestComponentProps> {
      render() {
        if (this.props.shouldThrow) {
          throw new Error('Test error');
        }
        return <div>Test Component</div>;
      }
    }

    const mockProps = {
      shouldThrow: true,
    };

    render(
      <ErrorBoundary>
        <TestComponent {...mockProps} />
      </ErrorBoundary>
    );

    expect(
      screen.getByText('Congratulations! Mission completed!')
    ).toBeInTheDocument();

    console.error = originalConsoleError;
  });
});
