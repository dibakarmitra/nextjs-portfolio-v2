'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FadeIn } from '@/components/web';

export default function NotFound() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center px-6">
            <FadeIn>
                <div className="mx-auto max-w-md text-center">
                    <div className="relative mb-6 inline-block">
                        <h1 className="select-none text-9xl font-extrabold text-zinc-100 dark:text-zinc-900">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-bold text-zinc-300 dark:text-zinc-700">
                                ¯\_(ツ)_/¯
                            </span>
                        </div>
                    </div>

                    <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                        Page not found
                    </h2>

                    <p className="mb-8 leading-relaxed text-zinc-600 dark:text-zinc-400">
                        The page you are looking for does not exist or has been moved.
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Back to Home
                    </Link>
                </div>
            </FadeIn>
        </div>
    );
}
