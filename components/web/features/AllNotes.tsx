'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { DebounceInput } from '../ui/DebounceInput';
import { Note } from '@/types';

interface AllNotesProps {
    notes: Note[];
}

const PAGE_SIZE = 5;

const AllNotes: React.FC<AllNotesProps> = ({ notes }) => {
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState('');

    const filteredNotes = React.useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        return notes.filter((note) => {
            const matchesSearch = searchValue
                ? [note.title, note.excerpt, note.content, ...(note.tags || [])]
                      .join(' ')
                      .toLowerCase()
                      .includes(searchValue)
                : true;

            return matchesSearch;
        });
    }, [notes, search]);

    const totalPages = Math.max(1, Math.ceil(filteredNotes.length / PAGE_SIZE));
    const currentNotes = React.useMemo(
        () => filteredNotes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [filteredNotes, page]
    );

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    React.useEffect(() => {
        setPage(1);
    }, [search]);

    return (
        <div className="min-h-screen pb-12 pt-12">
            <div className="mx-auto max-w-3xl px-6">
                <div className="mb-12">
                    <Link
                        href="/"
                        className="mb-6 inline-flex items-center text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Notes</h1>
                    <p className="mb-8 mt-2 text-zinc-600 dark:text-zinc-400">
                        Thoughts, tutorials, and insights on software development and technology.
                    </p>

                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                            size={18}
                        />
                        <DebounceInput
                            value={search}
                            onChange={setSearch}
                            placeholder="Search notes..."
                            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-4 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-900"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {currentNotes.length > 0 ? (
                        currentNotes.map((note, index) => (
                            <FadeIn key={note.id || index} delay={index * 50}>
                                <Link
                                    href={`/notes/${note.slug}`}
                                    className="group block rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
                                >
                                    <div className="mb-3 flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="mb-1 text-lg font-bold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                                                {note.title}
                                            </h3>
                                            <span className="font-mono text-xs text-zinc-500">
                                                {note.date
                                                    ? new Date(note.date).toLocaleDateString(
                                                          'en-GB',
                                                          {
                                                              day: '2-digit',
                                                              month: '2-digit',
                                                              year: 'numeric',
                                                          }
                                                      )
                                                    : ''}
                                            </span>
                                        </div>
                                        <ArrowRight
                                            size={18}
                                            className="shrink-0 -rotate-45 text-zinc-400 transition-colors group-hover:rotate-0 group-hover:text-zinc-900 dark:text-zinc-600 dark:group-hover:text-white"
                                        />
                                    </div>

                                    <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        {note.excerpt}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {note.tags?.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded border border-zinc-100 bg-zinc-50 px-2 py-1 font-mono text-[10px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            </FadeIn>
                        ))
                    ) : (
                        <div className="rounded-xl border border-dashed border-zinc-200 p-10 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                            No notes matched your current filters.
                        </div>
                    )}
                </div>

                <div className="mt-12 flex items-center justify-between border-t border-zinc-100 pt-8 dark:border-zinc-800">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            page === 1
                                ? 'cursor-not-allowed text-zinc-300 dark:text-zinc-700'
                                : 'cursor-pointer text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                        }`}
                    >
                        <ArrowLeft size={16} className="mr-2" /> Previous
                    </button>

                    <span className="font-mono text-sm text-zinc-500">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={page >= totalPages}
                        className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                            page >= totalPages
                                ? 'cursor-not-allowed text-zinc-300 dark:text-zinc-700'
                                : 'cursor-pointer text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                        }`}
                    >
                        Next <ArrowRight size={16} className="ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllNotes;
