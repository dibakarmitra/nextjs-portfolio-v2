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
        <div className="pt-12 pb-12 min-h-screen">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-6"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Notes</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-2 mb-8">
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
                            className="w-full pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    {currentNotes.length > 0 ? (
                        currentNotes.map((note, index) => (
                            <FadeIn key={note.id || index} delay={index * 50}>
                                <Link
                                    href={`/notes/${note.slug}`}
                                    className="block p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
                                >
                                    <div className="flex justify-between items-start gap-4 mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                                                {note.title}
                                            </h3>
                                            <span className="text-xs text-zinc-500 font-mono">
                                                {note.date
                                                    ? new Date(note.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                                    : ''}
                                            </span>
                                        </div>
                                        <ArrowRight
                                            size={18}
                                            className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors shrink-0 -rotate-45 group-hover:rotate-0"
                                        />
                                    </div>

                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                                        {note.excerpt}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {note.tags?.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded text-[10px] text-zinc-600 dark:text-zinc-300 font-mono"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            </FadeIn>
                        ))
                    ) : (
                        <div className="rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 p-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
                            No notes matched your current filters.
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className={`flex items-center text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                            page === 1
                                ? 'text-zinc-300 dark:text-zinc-700 cursor-not-allowed'
                                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer'
                        }`}
                    >
                        <ArrowLeft size={16} className="mr-2" /> Previous
                    </button>

                    <span className="text-sm text-zinc-500 font-mono">
                        Page {page} of {totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={page >= totalPages}
                        className={`flex items-center text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                            page >= totalPages
                                ? 'text-zinc-300 dark:text-zinc-700 cursor-not-allowed'
                                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer'
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
