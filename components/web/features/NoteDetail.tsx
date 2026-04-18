import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Note } from '@/types';
import FadeIn from '../ui/FadeIn';

interface NoteDetailProps {
    note: Note;
}

const NoteDetail: React.FC<NoteDetailProps> = ({ note }) => {
    return (
        <div className="min-h-screen pb-12 pt-12">
            <article className="mx-auto max-w-3xl px-6">
                <FadeIn>
                    <Link
                        href="/notes"
                        className="mb-8 inline-flex items-center text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Back to Notes
                    </Link>

                    {note.image && (
                        <div className="relative mb-8 aspect-[2/1] w-full overflow-hidden rounded-2xl border border-zinc-200 shadow-lg dark:border-zinc-800">
                            <Image
                                src={note.image}
                                alt={note.title}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 768px"
                                priority
                            />
                        </div>
                    )}

                    <header className="mb-8 border-b border-zinc-200 pb-8 dark:border-zinc-800">
                        <div className="mb-4 flex flex-wrap gap-2">
                            {note.tags?.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="mb-4 text-3xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-4xl">
                            {note.title}
                        </h1>

                        <div className="flex items-center gap-4 font-mono text-sm text-zinc-500 dark:text-zinc-400">
                            <div className="flex items-center gap-1.5">
                                <Calendar size={14} />
                                <span>
                                    {note.date
                                        ? new Date(note.date).toLocaleDateString('en-GB', {
                                              day: '2-digit',
                                              month: '2-digit',
                                              year: 'numeric',
                                          })
                                        : ''}
                                </span>
                            </div>
                        </div>
                    </header>

                    <div className="prose prose-zinc max-w-none dark:prose-invert">
                        <p className="lead mb-6 text-lg font-medium italic text-zinc-600 dark:text-zinc-300">
                            {note.excerpt ||
                                (note as any).summary ||
                                (note as any).description ||
                                ''}
                        </p>

                        <div className="mb-8">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ node, ...props }) => (
                                        <h1
                                            className="mb-4 mt-8 text-2xl font-bold text-zinc-900 dark:text-zinc-100"
                                            {...props}
                                        />
                                    ),
                                    h2: ({ node, ...props }) => (
                                        <h2
                                            className="mb-4 mt-8 border-b border-zinc-200 pb-2 text-xl font-bold text-zinc-900 dark:border-zinc-800 dark:text-zinc-100"
                                            {...props}
                                        />
                                    ),
                                    h3: ({ node, ...props }) => (
                                        <h3
                                            className="mb-3 mt-6 text-lg font-bold text-zinc-900 dark:text-zinc-100"
                                            {...props}
                                        />
                                    ),
                                    p: ({ node, ...props }) => (
                                        <p
                                            className="mb-4 leading-relaxed text-zinc-800 dark:text-zinc-300"
                                            {...props}
                                        />
                                    ),
                                    a: ({ node, ...props }) => (
                                        <a
                                            className="font-medium text-zinc-900 underline decoration-zinc-400 underline-offset-4 transition-colors hover:decoration-zinc-900 dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-100"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            {...props}
                                        />
                                    ),
                                    ul: ({ node, ...props }) => (
                                        <ul
                                            className="my-4 list-inside list-disc space-y-1 pl-4 text-zinc-700 dark:text-zinc-300"
                                            {...props}
                                        />
                                    ),
                                    ol: ({ node, ...props }) => (
                                        <ol
                                            className="my-4 list-inside list-decimal space-y-1 pl-4 text-zinc-700 dark:text-zinc-300"
                                            {...props}
                                        />
                                    ),
                                    blockquote: ({ node, ...props }) => (
                                        <blockquote
                                            className="my-6 rounded-r border-l-4 border-zinc-300 bg-zinc-50 py-2 pl-4 pr-2 italic text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400"
                                            {...props}
                                        />
                                    ),
                                    code: ({ className, children, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const isInline = !match && !className;
                                        return !isInline ? (
                                            <pre className="my-6 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-950 p-4 font-mono text-sm text-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            </pre>
                                        ) : (
                                            <code
                                                className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-pink-600 dark:bg-zinc-800 dark:text-pink-400"
                                                {...props}
                                            >
                                                {children}
                                            </code>
                                        );
                                    },
                                    img: ({ node, ...props }) => (
                                        <img
                                            className="my-8 h-auto w-full rounded-lg border border-zinc-200 shadow-md dark:border-zinc-800"
                                            alt={props.alt || 'Note image'}
                                            loading="lazy"
                                            decoding="async"
                                            {...props}
                                        />
                                    ),
                                }}
                            >
                                {note.content}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {note.link && (
                        <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
                            <a
                                href={note.link}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                            >
                                Read on Original Platform <ExternalLink size={14} />
                            </a>
                        </div>
                    )}
                </FadeIn>
            </article>
        </div>
    );
};

export default NoteDetail;
