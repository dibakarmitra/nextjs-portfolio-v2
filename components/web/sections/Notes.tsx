'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import Section from '../ui/Section';
import FadeIn from '../ui/FadeIn';
import { Note } from '@/types';
interface NotesProps {
    notes: Note[];
    notes_count: number;
}

const Notes: React.FC<NotesProps> = ({ notes, notes_count }) => {
    const recentNotes = notes.slice(0, 3);

    return (
        <Section
            id="notes"
            title="Notes"
            count={notes_count}
            rightElement={
                <Link
                    href="/notes"
                    className="group flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                    View All
                    <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                    />
                </Link>
            }
        >
            <div className="space-y-4">
                {recentNotes.map((note, index) => (
                    <FadeIn key={index} delay={index * 100}>
                        <Link
                            href={`/notes/${note.slug}`}
                            className="group -mx-4 block rounded-xl p-4 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900"
                        >
                            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                                <h3 className="text-base font-bold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                                    {note.title}
                                </h3>
                                <span className="shrink-0 font-mono text-xs text-zinc-500">
                                    {new Date(note.date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>

                            <p className="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {note.excerpt}
                            </p>

                            <div className="flex flex-wrap items-center gap-2">
                                <div className="text-zinc-400 transition-colors group-hover:text-zinc-600 dark:text-zinc-600 dark:group-hover:text-zinc-400">
                                    <BookOpen size={14} />
                                </div>
                                {note.tags?.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-xs font-medium text-zinc-500 dark:text-zinc-500"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    </FadeIn>
                ))}
            </div>
        </Section>
    );
};

export default Notes;
