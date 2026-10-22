import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import { Button } from '@/shared/components/ui/button'; // Will update path later if we move it

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Send to monitoring service (Sentry, etc.)
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8">
          <div className="text-6xl">💥</div>
          <h2 className="text-xl font-semibold text-gray-900">
            Something went wrong
          </h2>
          <p className="max-w-md text-center text-gray-500">
            We're sorry, but an unexpected error occurred. Our team has been notified.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre className="max-w-lg overflow-auto rounded-lg bg-gray-100 p-4 text-xs text-red-600">
              {this.state.error.stack}
            </pre>
          )}
          <Button onClick={this.handleReset} variant="default">
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
