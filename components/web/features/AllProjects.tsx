'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, ArrowUpRight, Folder } from 'lucide-react';
import FadeIn from '../ui/FadeIn';
import { ResumeContent } from '@/types';

interface AllProjectsProps {
    projects: ResumeContent[];
}

const PAGE_SIZE = 10;

const AllProjects: React.FC<AllProjectsProps> = ({ projects }) => {
    const [page, setPage] = React.useState(1);

    const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE));
    const currentProjects = React.useMemo(
        () => projects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        [page, projects]
    );

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

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
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                        All Projects
                    </h1>
                    <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                        A collection of projects I've worked on, from side hustles to experiments.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {currentProjects.map((project, index) => (
                        <FadeIn key={project.id || index} delay={index * 50}>
                            <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="rounded-lg border border-zinc-200 bg-zinc-100 p-2 dark:border-zinc-800 dark:bg-zinc-950">
                                        <Folder
                                            size={18}
                                            className="text-zinc-700 dark:text-zinc-100"
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        {project.repoUrl && (
                                            <a
                                                href={project.repoUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={`View ${project.title} code`}
                                                className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white"
                                            >
                                                <Code size={18} />
                                            </a>
                                        )}
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={`View ${project.title} live`}
                                                className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white"
                                            >
                                                <ArrowUpRight size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <h3 className="mb-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">
                                    {project.title}
                                </h3>
                                <p className="mb-3 font-mono text-xs text-zinc-500">
                                    {project.date
                                        ? new Date(project.date).toLocaleDateString('en-GB', {
                                              day: '2-digit',
                                              month: '2-digit',
                                              year: 'numeric',
                                          })
                                        : ''}
                                </p>

                                <p className="mb-4 flex-grow text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                    {project.excerpt || project.content}
                                </p>

                                <div className="mt-auto flex flex-wrap gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800/50">
                                    {project.tags?.map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="rounded border border-zinc-200 bg-zinc-50 px-1.5 py-0.5 font-mono text-[10px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
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
                        Next <ArrowUpRight size={16} className="ml-2 rotate-45" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllProjects;
