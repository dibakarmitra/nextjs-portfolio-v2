'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorFallbackProps {
    error?: Error;
    reset?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, reset }) => {
    return (
        <div className="flex min-h-screen items-center justify-center px-6">
            <div className="max-w-md text-center">
                <div className="mb-4 inline-block rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                    <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>

                <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Oops! Something went wrong
                </h1>

                <p className="mb-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
                    We encountered an unexpected error. Please try again or contact support if the
                    problem persists.
                </p>

                {error && process.env.NODE_ENV === 'development' && (
                    <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-left dark:border-red-800 dark:bg-red-900/10">
                        <p className="break-all font-mono text-xs text-red-800 dark:text-red-200">
                            {error.message}
                        </p>
                    </div>
                )}

                <div className="flex gap-3">
                    {reset && (
                        <button
                            onClick={reset}
                            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                        >
                            Try Again
                        </button>
                    )}

                    <a
                        href="/"
                        className="flex-1 rounded-lg bg-zinc-200 px-4 py-2 font-medium text-zinc-900 transition-colors hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                    >
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ErrorFallback;
