'use client';

import React from 'react';
import Link from 'next/link';
import {
    Mail,
    MapPin,
    Briefcase,
    Code,
    Printer,
    ArrowLeft,
    ExternalLink,
    Globe,
    Phone,
} from 'lucide-react';
import { publicPortfolioData, publicProfile } from '@/config/data';
import type { PublicPortfolioData } from '@/config/data';

interface ResumeProps {
    data?: PublicPortfolioData;
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
    // use data from props or fallback to static constants
    const profile = data?.profile
        ? {
              name: data.profile.displayName,
              role: data.profile.role,
              location: data.profile.location,
              phone: data.profile.phone,
              email: data.profile.email,
              bio: data.profile.bio,
              socials: Object.entries(data.profile.socials || {}).map(([platform, url]) => ({
                  platform: platform.charAt(0).toUpperCase() + platform.slice(1),
                  url: url.startsWith('http') ? url : `https://${url}`,
                  icon: platform.toLowerCase(),
              })),
          }
        : {
              name: publicProfile.displayName,
              role: publicProfile.role,
              location: publicProfile.location,
              phone: publicProfile.phone,
              email: publicProfile.email,
              bio: publicProfile.bio,
              socials: Object.entries(publicProfile.socials || {}).map(([platform, url]) => ({
                  platform: platform.charAt(0).toUpperCase() + platform.slice(1),
                  url: url.startsWith('http') ? url : `https://${url}`,
                  icon: platform.toLowerCase(),
              })),
          };

    const experience = data?.resume?.experience?.length
        ? data.resume.experience.map((exp) => ({
              role: exp.title,
              company: exp.company || '',
              period: exp.endDate
                  ? `${new Date(exp.date).getFullYear()} - ${new Date(exp.endDate).getFullYear()}`
                  : 'Present',
              current: !exp.endDate,
              description: exp.content
                  .split('\n')
                  .filter((line) => line.trim().startsWith('-'))
                  .map((line) => line.trim().substring(1).trim()),
          }))
        : publicPortfolioData.resume.experience.map((exp) => ({
              role: exp.title,
              company: exp.company || '',
              period: exp.endDate
                  ? `${new Date(exp.date).getFullYear()} - ${new Date(exp.endDate).getFullYear()}`
                  : 'Present',
              current: !exp.endDate,
              description: exp.content
                  .split('\n')
                  .filter((line) => line.trim().startsWith('-'))
                  .map((line) => line.trim().substring(1).trim()),
          }));

    const education = data?.resume?.education?.length
        ? data.resume.education.map((edu) => ({
              degree: edu.title,
              school: edu.company || '',
              year: new Date(edu.date).getFullYear().toString(),
          }))
        : publicPortfolioData.resume.education.map((edu) => ({
              degree: edu.title,
              school: edu.company || '',
              year: new Date(edu.date).getFullYear().toString(),
          }));

    const skills = data?.resume?.skills?.length
        ? (() => {
              const grouped: Record<string, string[]> = {};
              data.resume.skills.forEach((s) => {
                  const cat = s.category || 'Other';
                  if (!grouped[cat]) grouped[cat] = [];
                  grouped[cat].push(s.title);
              });
              return Object.entries(grouped).map(([category, items]) => ({ category, items }));
          })()
        : (() => {
              const grouped: Record<string, string[]> = {};
              publicPortfolioData.resume.skills.forEach((skill) => {
                  const category = skill.category || 'Other';
                  if (!grouped[category]) grouped[category] = [];
                  grouped[category].push(skill.title);
              });
              return Object.entries(grouped).map(([category, items]) => ({ category, items }));
          })();

    const projects = data?.resume?.projects?.length
        ? data.resume.projects.map((p) => ({
              title: p.title,
              description: p.excerpt,
              tech: p.tags?.map((t) => t.name) || [],
              link: p.liveUrl,
              isFeatured: p.category === 'featured',
          }))
        : publicPortfolioData.resume.projects.map((project) => ({
              title: project.title,
              description: project.excerpt,
              tech: project.tags?.map((tag) => tag.name) || [],
              link: project.liveUrl,
              isFeatured: project.category === 'featured',
          }));

    const strengths = data?.resume?.strengths?.length
        ? data.resume.strengths.map((s) => s.title)
        : publicPortfolioData.resume.strengths.map((strength) => strength.title);

    const languages = data?.resume?.languages?.length
        ? data.resume.languages.map(
              (l) =>
                  `${l.title} (${l.proficiencyLevel ? l.proficiencyLevel.charAt(0).toUpperCase() + l.proficiencyLevel.slice(1) : 'Fluent'})`
          )
        : publicPortfolioData.resume.languages.map(
              (language) =>
                  `${language.title} (${language.proficiencyLevel ? language.proficiencyLevel.charAt(0).toUpperCase() + language.proficiencyLevel.slice(1) : 'Fluent'})`
          );

    const getSocial = (platform: string) =>
        profile.socials.find(
            (s: any) => s.platform === platform || s.icon === platform.toLowerCase()
        );
    const github = getSocial('GitHub') || getSocial('github');
    const linkedin = getSocial('LinkedIn') || getSocial('linkedin');
    const website = profile.socials.find(
        (s: any) =>
            s.platform === 'Website' ||
            s.platform === 'Home Page' ||
            s.icon === 'layout' ||
            s.icon === 'website'
    );

    return (
        <div className="min-h-screen bg-zinc-50 px-4 py-8 font-sans text-zinc-900 md:px-8 print:bg-white print:p-0">
            <style>
                {`
                @media print {
                    @page {
                        margin: 15mm;
                        size: auto;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .print-reset-width {
                        max-width: none !important;
                        width: 100% !important;
                        margin: 0 !important;
                    }
                    h3, h4 {
                        break-after: avoid;
                    }
                    section {
                        break-inside: auto;
                    }
                    li {
                        break-inside: avoid;
                    }
                }
            `}
            </style>
            <div className="print-reset-width mx-auto max-w-[210mm]">
                {/* Toolbar */}
                <div className="mb-8 flex items-center justify-between print:hidden">
                    <Link
                        href="/"
                        className="flex items-center font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                    >
                        <ArrowLeft size={18} className="mr-2" /> Back to Portfolio
                    </Link>
                    <button
                        onClick={() => window.print()}
                        className="flex cursor-pointer items-center rounded-lg bg-zinc-900 px-5 py-2 text-white shadow-sm transition-colors hover:bg-zinc-700"
                    >
                        <Printer size={18} className="mr-2" /> Print / Save PDF
                    </button>
                </div>

                <div className="rounded-lg bg-white p-8 shadow-2xl md:p-12 print:p-0 print:shadow-none">
                    {/* Header */}
                    <header className="mb-8 flex flex-col items-start justify-between gap-6 border-b-2 border-zinc-900 pb-6 md:flex-row print:flex-row">
                        <div className="flex flex-col gap-4">
                            <div>
                                <h1 className="mb-2 text-4xl font-extrabold uppercase leading-none tracking-tighter text-zinc-900 md:text-5xl">
                                    {profile.name}
                                </h1>
                                <p className="text-xl font-semibold tracking-wide text-blue-700">
                                    {profile.role}
                                </p>
                            </div>

                            <div className="flex flex-col gap-1.5 text-sm text-zinc-600">
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-zinc-400" />
                                    <span>{profile.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-zinc-400" />
                                    <span>{profile.phone}</span>
                                </div>
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="flex items-center gap-2 transition-colors hover:text-blue-600"
                                >
                                    <Mail size={14} className="text-zinc-400" />
                                    <span>{profile.email}</span>
                                </a>
                            </div>
                        </div>

                        <div className="mt-2 flex items-center gap-4 md:mt-0 print:mt-0">
                            {linkedin && (
                                <a
                                    href={linkedin.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-zinc-400 transition-colors hover:text-blue-700"
                                    aria-label="LinkedIn"
                                >
                                    <Briefcase size={22} />
                                </a>
                            )}
                            {github && (
                                <a
                                    href={github.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-zinc-400 transition-colors hover:text-zinc-900"
                                    aria-label="GitHub"
                                >
                                    <Code size={22} />
                                </a>
                            )}
                            {website && (
                                <a
                                    href={website.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-zinc-400 transition-colors hover:text-blue-600"
                                    aria-label="Portfolio"
                                >
                                    <Globe size={22} />
                                </a>
                            )}
                        </div>
                    </header>

                    {/* Profile Section */}
                    <section className="mb-8">
                        <h3 className="mb-3 border-b border-zinc-200 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                            Profile
                        </h3>
                        <p className="text-justify text-sm leading-relaxed text-zinc-700">
                            {profile.bio}
                        </p>
                    </section>

                    {/* Resume Body */}
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] print:grid-cols-[1fr_2fr] print:gap-6">
                        {/* Left Column */}
                        <div className="space-y-8 print:space-y-6">
                            <section>
                                <h3 className="mb-3 border-b border-zinc-200 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    Skills
                                </h3>
                                <div className="space-y-4">
                                    {skills.map((grp, i) => (
                                        <div key={i} className="break-inside-avoid">
                                            <h4 className="mb-2 text-xs font-bold text-zinc-900">
                                                {grp.category}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {grp.items.map((skill, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-700 print:border print:border-zinc-200 print:bg-transparent"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="mb-3 border-b border-zinc-200 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    Strengths
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {strengths.map((strength, idx) => (
                                        <span
                                            key={idx}
                                            className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-700 print:border print:border-zinc-200 print:bg-transparent"
                                        >
                                            {strength}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="mb-3 border-b border-zinc-200 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    Languages
                                </h3>
                                <div className="space-y-1">
                                    {languages.map((lang, idx) => (
                                        <div key={idx} className="text-sm text-zinc-700">
                                            {lang}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="mb-3 border-b border-zinc-200 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    Hobbies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {publicPortfolioData.hobbies.map((hobby, idx) => (
                                        <span
                                            key={idx}
                                            className="rounded bg-zinc-100 px-2 py-1 text-xs text-zinc-700 print:border print:border-zinc-200 print:bg-transparent"
                                        >
                                            {hobby}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8 print:space-y-6">
                            <section>
                                <h3 className="mb-4 border-b border-zinc-200 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    Work Experience
                                </h3>
                                <div className="space-y-6 print:space-y-5">
                                    {experience.map((exp, i) => (
                                        <div
                                            key={i}
                                            className="relative break-inside-avoid border-l-2 border-zinc-100 pl-4 print:border-zinc-200"
                                        >
                                            <div
                                                className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white ${exp.current ? 'bg-blue-600' : 'bg-zinc-300'}`}
                                            ></div>
                                            <div className="mb-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                                                <h4 className="text-base font-bold text-zinc-900">
                                                    {exp.role}
                                                </h4>
                                                <span className="rounded bg-zinc-50 px-2 py-0.5 font-mono text-xs font-medium text-zinc-500 print:bg-transparent print:p-0">
                                                    {exp.period}
                                                </span>
                                            </div>
                                            <div className="mb-2 text-sm font-medium text-blue-700">
                                                {exp.company}
                                            </div>
                                            <ul className="ml-4 list-outside list-disc space-y-1 text-sm leading-relaxed text-zinc-700 marker:text-zinc-400">
                                                {exp.description.map((point, idx) => (
                                                    <li key={idx} className="pl-1">
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="mb-4 border-b border-zinc-200 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    Education
                                </h3>
                                <div className="space-y-4">
                                    {education.map((edu, i) => (
                                        <div key={i} className="break-inside-avoid">
                                            <div className="mb-1 flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                                                <div className="text-sm font-bold text-zinc-900">
                                                    {edu.degree}
                                                </div>
                                                <div className="font-mono text-xs text-zinc-400">
                                                    {edu.year}
                                                </div>
                                            </div>
                                            <div className="text-xs text-zinc-600">
                                                {edu.school}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="mb-4 border-b border-zinc-200 pb-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    Featured Projects
                                </h3>
                                <div className="space-y-5">
                                    {projects
                                        .filter((p) => p.isFeatured)
                                        .slice(0, 4)
                                        .map((proj, i) => (
                                            <div key={i} className="break-inside-avoid">
                                                <div className="mb-1 flex items-center justify-between">
                                                    <h4 className="text-sm font-bold text-zinc-900">
                                                        {proj.title}
                                                    </h4>
                                                    {proj.link && (
                                                        <a
                                                            href={proj.link}
                                                            target="_blank"
                                                            className="text-blue-600 print:hidden"
                                                        >
                                                            <ExternalLink size={12} />
                                                        </a>
                                                    )}
                                                </div>
                                                <p className="mb-2 text-sm leading-relaxed text-zinc-700">
                                                    {proj.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {proj.tech.map((t, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="rounded border border-zinc-200 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 flex items-center justify-between border-t border-zinc-100 pt-6 text-xs text-zinc-400 print:hidden">
                        <span>
                            &copy; {new Date().getFullYear()} {profile.name}
                        </span>
                        <span>Generated via Portfolio App</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;
