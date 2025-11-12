// src/components/ErrorBoundary.tsx
import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error | null; info?: string | null };

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, error: null, info: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error, info: null };
  }

  componentDidCatch(error: Error, info: any) {
    // optional: send to logging service
    console.error("ErrorBoundary caught", error, info);
    this.setState({ error, info: info?.componentStack?.toString?.() ?? String(info) });
  }

  handleRetry = () => this.setState({ hasError: false, error: null, info: null });

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 rounded-lg bg-red-50 border border-red-200 text-sm">
          <h3 className="font-semibold text-red-700">Something went wrong loading this section</h3>
          <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap">{String(this.state.error?.message ?? "Unknown error")}</pre>
          <div className="mt-4 flex gap-2">
            <button onClick={this.handleRetry} className="px-3 py-1 rounded bg-black text-white">Retry</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
