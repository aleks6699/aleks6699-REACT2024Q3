import { Component, ReactNode, ErrorInfo } from 'react';
import './errorBoundary.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Why did you break everything?):', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <h1 className="error-message">Congratulations! Mission completed!</h1>
      );
    }

    return this.props.children;
  }
}
