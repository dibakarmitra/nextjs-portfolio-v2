'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Code, Folder, ArrowRight, ChevronDown } from 'lucide-react';
import Section from '../ui/Section';
import FadeIn from '../ui/FadeIn';
import { ResumeContent } from '@/types';
import { publicPortfolioData, publicProfile } from '@/config/data';

interface ProjectsProps {
    projects?: ResumeContent[];
}

const Projects: React.FC<ProjectsProps> = ({ projects: dbProjects }) => {

    // transform db projects to component format or use static
    const projects =
        dbProjects && dbProjects.length > 0
            ? dbProjects.map((p) => ({
                  title: p.title,
                  date: new Date(p.date).getFullYear().toString(),
                  description: p.excerpt || '',
                  tech: [] as string[],
                  points:
                      p.content
                          ?.split('\n')
                          .filter((line: string) => line.trim().startsWith('-'))
                          .map((line: string) => line.trim().substring(1).trim()) || [],
                  link: p.liveUrl,
                  repo: p.repoUrl,
                  isFeatured: p.category === 'featured',
              }))
            : publicPortfolioData.resume.projects.map((p) => ({
                  title: p.title,
                  date: new Date(p.date).getFullYear().toString(),
                  description: p.excerpt || '',
                  tech: p.tags?.map((tag) => tag.name) || [],
                  points:
                      p.content
                          ?.split('\n')
                          .filter((line: string) => line.trim().startsWith('-'))
                          .map((line: string) => line.trim().substring(1).trim()) || [],
                  link: p.liveUrl,
                  repo: p.repoUrl,
                  isFeatured: p.category === 'featured',
              }));

    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    const toggleItem = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const featuredProjects = projects.filter((p) => p.isFeatured);
    const otherProjects = projects.filter((p) => !p.isFeatured);

    return (
        <Section
            id="projects"
            title="Featured Projects"
            count={projects.length}
            rightElement={
                <Link
                    href="/projects"
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
                {featuredProjects.map((project, index) => {
                    const isOpen = expandedIndex === index;
                    return (
                        <FadeIn key={index} delay={index * 100}>
                            <div className="group overflow-hidden rounded-lg border border-zinc-200 bg-white transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-600">
                                <div
                                    onClick={() => toggleItem(index)}
                                    className="flex cursor-pointer items-center justify-between p-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                                            <Folder size={16} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                                                {project.title}
                                            </h3>
                                            <p className="font-mono text-xs text-zinc-500">
                                                {project.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {project.link && (
                                            <Link
                                                href={project.link}
                                                target="_blank"
                                                className="text-zinc-400 transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ArrowUpRight size={16} />
                                            </Link>
                                        )}
                                        {project.repo && (
                                            <Link
                                                href={project.repo}
                                                target="_blank"
                                                className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Code size={16} />
                                            </Link>
                                        )}
                                        <div
                                            className={`text-zinc-400 transition-transform duration-300 dark:text-zinc-500 ${isOpen ? '-rotate-180' : ''}`}
                                        >
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                                        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="space-y-4 px-4 pb-4">
                                            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                                {project.description}
                                            </p>

                                            {project.points && project.points.length > 0 && (
                                                <ul className="space-y-1">
                                                    {project.points.map(
                                                        (point: string, i: number) => (
                                                            <li
                                                                key={i}
                                                                className="flex items-start text-sm text-zinc-600 dark:text-zinc-400"
                                                            >
                                                                <span className="mr-2 mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600"></span>
                                                                {point}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}

                                            {project.tech && project.tech.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {project.tech.map((tech: string, i: number) => (
                                                        <span
                                                            key={i}
                                                            className="rounded border border-zinc-200 bg-zinc-100 px-2 py-0.5 font-mono text-[10px] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    );
                })}
            </div>

            {otherProjects.length > 0 && (
                <div className="mt-8">
                    <h3 className="mb-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Other Projects
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {otherProjects.map((project, index) => (
                            <FadeIn key={index} delay={index * 50}>
                                <div className="group rounded-lg border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-600">
                                    <div className="mb-2 flex items-start justify-between">
                                        <div className="flex h-6 w-6 items-center justify-center rounded bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
                                            <Folder size={14} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {project.link && (
                                                <Link
                                                    href={project.link}
                                                    target="_blank"
                                                    className="text-zinc-400 transition-colors hover:text-blue-600"
                                                >
                                                    <ArrowUpRight size={14} />
                                                </Link>
                                            )}
                                            {project.repo && (
                                                <Link
                                                    href={project.repo}
                                                    target="_blank"
                                                    className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-white"
                                                >
                                                    <Code size={14} />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="mb-1 text-sm font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
                                        {project.title}
                                    </h3>
                                    <p className="line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
                                        {project.description}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            )}

            <FadeIn delay={200}>
                <div className="mt-6 text-center">
                    {publicProfile.socials.github && (
                        <Link
                            href={publicProfile.socials.github}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                        >
                            View all projects on GitHub
                            <ArrowRight size={14} />
                        </Link>
                    )}
                </div>
            </FadeIn>
        </Section>
    );
};

export default Projects;
