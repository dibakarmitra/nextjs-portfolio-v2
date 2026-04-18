'use client';

import React, { useState } from 'react';
import { GraduationCap, ChevronDown } from 'lucide-react';
import Section from '../ui/Section';
import FadeIn from '../ui/FadeIn';
import { ResumeContent } from '@/types';
import { publicPortfolioData } from '@/config/data';

interface EducationProps {
    education?: ResumeContent[];
}

const Education: React.FC<EducationProps> = ({ education: dbEducation }) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // transform db education to component format or use static
    const educationList =
        dbEducation && dbEducation.length > 0
            ? dbEducation.map((edu) => ({
                  degree: edu.title,
                  school: edu.company || '',
                  year: new Date(edu.date).getFullYear().toString(),
              }))
            : publicPortfolioData.resume.education.map((edu) => ({
                  degree: edu.title,
                  school: edu.company || '',
                  year: new Date(edu.date).getFullYear().toString(),
              }));

    return (
        <Section id="education" title="Education">
            <div className="space-y-8 pl-2">
                {educationList.map((edu, idx) => {
                    const isOpen = expandedIndex === idx;
                    return (
                        <FadeIn key={idx} delay={idx * 100}>
                            <div className="relative border-l border-zinc-200 pb-2 pl-6 dark:border-zinc-800">
                                <div
                                    className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 transition-colors ${
                                        isOpen
                                            ? 'border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-950'
                                            : 'border-zinc-400 bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-800'
                                    }`}
                                ></div>

                                <div
                                    className="group flex cursor-pointer flex-col pr-2 sm:flex-row sm:items-start sm:justify-between"
                                    onClick={() => toggleItem(idx)}
                                >
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-zinc-800 transition-colors group-hover:text-blue-600 dark:text-zinc-200 dark:group-hover:text-blue-400">
                                            {edu.degree}
                                        </h3>
                                    </div>
                                    <div className="mt-1 flex items-center gap-4 sm:mt-0">
                                        <span className="font-mono text-xs text-zinc-500">
                                            {edu.year}
                                        </span>
                                        <div
                                            className={`text-zinc-400 transition-transform duration-300 group-hover:text-zinc-600 dark:text-zinc-600 dark:group-hover:text-zinc-300 ${isOpen ? '-rotate-180' : ''}`}
                                        >
                                            <ChevronDown size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                                        isOpen
                                            ? 'mt-2 grid-rows-[1fr] opacity-100'
                                            : 'mt-0 grid-rows-[0fr] opacity-0'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                                            {edu.school}
                                        </div>
                                        <p className="mt-2 font-mono text-xs text-zinc-500">
                                            Relevant Coursework: Data Structures, Algorithms, Web
                                            Development.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    );
                })}
            </div>
        </Section>
    );
};

export default Education;
