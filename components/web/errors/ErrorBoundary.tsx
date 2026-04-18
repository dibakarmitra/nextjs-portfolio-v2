'use client';

import React, { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="px-6 py-12 text-center">
                        <h2 className="mb-2 text-xl font-bold text-red-600">
                            Something went wrong
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Please try refreshing the page
                        </p>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}
