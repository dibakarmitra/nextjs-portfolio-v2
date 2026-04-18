'use client';

import React from 'react';
import { publicSiteData } from '@/config/data';

const Footer: React.FC = () => {
    return (
        <footer className="mx-auto mt-20 max-w-3xl px-6 pb-8 text-center font-mono text-xs text-zinc-500 dark:text-zinc-400 print:hidden">
            <p>Crafted with Next.js, TypeScript & Tailwind CSS</p>
            <p className="mt-4">
                Built by{' '}
                <a
                    href={publicSiteData.websiteUrl}
                    className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                    {publicSiteData.author}
                </a>
                . The source code is available on{' '}
                <a
                    href={publicSiteData.sourceCodeUrl}
                    className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
                .
            </p>
            <div className="mt-2 flex justify-center gap-4">
                <a
                    href="/feed/rss.xml"
                    className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    RSS
                </a>
                <span>•</span>
                <a
                    href="/feed/atom.xml"
                    className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Atom
                </a>
                <span>•</span>
                <a
                    href="/feed/feed.json"
                    className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    JSON
                </a>
            </div>
        </footer>
    );
};

export default Footer;
