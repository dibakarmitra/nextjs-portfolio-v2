import {
    ResumeContentType,
    type ResumeContent,
    type Tag,
    type UserProfile,
} from '@/types';

import type { PublicPortfolioData } from './types';
import { publicSiteData, publicSiteSettings } from './site';

const createdAt = '2026-01-01T00:00:00.000Z';

const slugify = (value: string): string =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

const createTag = (id: number, name: string): Tag => ({
    id,
    name,
    slug: slugify(name),
    description: `${name} related content`,
    color: undefined,
    usageCount: 1,
    isActive: true,
    createdAt,
    updatedAt: createdAt,
});

export const publicProfile: UserProfile = {
    displayName: publicSiteData.name,
    role: publicSiteData.title.replace(`${publicSiteData.name} - `, ''),
    location: 'City, Country',
    availability: 'Open to Opportunities',
    avatarUrl: publicSiteData.ogImage,
    bio: publicSiteData.description,
    email: publicSiteData.email,
    phone: '+1234567890',
    siteUrl: publicSiteData.websiteUrl,
    resumeUrl: `${publicSiteData.baseUrl}/resume`,
    socials: {
        github: publicSiteData.githubUrl,
        linkedin: publicSiteData.linkedinUrl,
        website: publicSiteData.websiteUrl,
        x: publicSiteData.twitterHandle.replace(/^@/, ''),
    },
    seo: {
        title: publicSiteData.title,
        description: publicSiteData.description,
        keywords: publicSiteData.keywords,
        ogImage: publicSiteData.ogImage,
    },
};

const experience: ResumeContent[] = [
    {
        id: 1,
        title: 'Senior Developer',
        type: ResumeContentType.EXPERIENCE,
        status: 'published',
        date: '2022-01-01T00:00:00.000Z',
        tags: [createTag(1, 'Node.js'), createTag(2, 'System Design')],
        excerpt: 'Leading cloud-native product work and mentoring delivery teams.',
        content:
            '- Led development of cloud-native applications.\n- Mentored junior developers and improved code quality.\n- Architected scalable backend systems using Node.js.',
        slug: 'senior-developer',
        company: 'Tech Solutions Inc.',
        location: 'Remote',
        category: 'Full-Time',
    },
    {
        id: 2,
        title: 'Full Stack Developer',
        type: ResumeContentType.EXPERIENCE,
        status: 'published',
        date: '2019-01-01T00:00:00.000Z',
        endDate: '2021-12-31T00:00:00.000Z',
        tags: [createTag(3, 'React'), createTag(4, 'Express')],
        excerpt: 'Built responsive web apps and partner-facing integrations.',
        content:
            '- Developed responsive web applications using React.\n- Implemented RESTful APIs and integrated with third-party services.\n- Collaborated closely with product and design to ship iterative improvements.',
        slug: 'full-stack-developer',
        company: 'Web Innovation Co.',
        location: 'Hybrid',
        category: 'Full-Time',
    },
];

const projects: ResumeContent[] = [
    {
        id: 11,
        title: 'Project Alpha',
        type: ResumeContentType.PROJECT,
        status: 'published',
        date: '2023-01-01T00:00:00.000Z',
        tags: [
            createTag(11, 'React'),
            createTag(12, 'Next.js'),
            createTag(13, 'PostgreSQL'),
        ],
        excerpt:
            'A comprehensive management system for small businesses to track inventory and sales.',
        content:
            '- Real-time inventory tracking.\n- Sales reporting and analytics.\n- Multi-user support with role-based access.',
        slug: 'project-alpha',
        liveUrl: 'https://example.com/project-alpha',
        repoUrl: 'https://github.com/johndoe/project-alpha',
        category: 'featured',
    },
    {
        id: 12,
        title: 'Beta App',
        type: ResumeContentType.PROJECT,
        status: 'published',
        date: '2022-06-01T00:00:00.000Z',
        tags: [createTag(14, 'React Native'), createTag(15, 'Firebase')],
        excerpt: 'A mobile-first social platform for connecting local enthusiasts.',
        content:
            '- Location-based matching.\n- Instant messaging.\n- Lightweight moderation and community tooling.',
        slug: 'beta-app',
        liveUrl: 'https://example.com/beta-app',
        repoUrl: 'https://github.com/johndoe/beta-app',
        category: 'featured',
    },
    {
        id: 13,
        title: 'Ops Dashboard',
        type: ResumeContentType.PROJECT,
        status: 'published',
        date: '2021-09-01T00:00:00.000Z',
        tags: [createTag(16, 'TypeScript'), createTag(17, 'Charts')],
        excerpt: 'An internal dashboard for monitoring deployments, incidents, and uptime trends.',
        content:
            '- Deployment visibility for multiple services.\n- Incident summaries and weekly reporting.\n- Shared operational checklist for faster handoffs.',
        slug: 'ops-dashboard',
        liveUrl: 'https://example.com/ops-dashboard',
        repoUrl: 'https://github.com/johndoe/ops-dashboard',
        category: 'internal',
    },
];

const education: ResumeContent[] = [
    {
        id: 21,
        title: 'Master of Science in Computer Science',
        type: ResumeContentType.EDUCATION,
        status: 'published',
        date: '2020-01-01T00:00:00.000Z',
        tags: [],
        excerpt: 'Focused on software engineering and distributed systems.',
        content: 'Coursework in distributed systems, algorithms, and web development.',
        slug: 'master-of-science-in-computer-science',
        company: 'University of Tech',
    },
    {
        id: 22,
        title: 'Bachelor of Science in Information Technology',
        type: ResumeContentType.EDUCATION,
        status: 'published',
        date: '2018-01-01T00:00:00.000Z',
        tags: [],
        excerpt: 'Built a foundation in programming, systems, and networking.',
        content: 'Coursework in programming, systems analysis, and networking.',
        slug: 'bachelor-of-science-in-information-technology',
        company: 'State University',
    },
];

const skills: ResumeContent[] = [
    ['JavaScript', 'Tech Stack'],
    ['TypeScript', 'Tech Stack'],
    ['React', 'Tech Stack'],
    ['Next.js', 'Tech Stack'],
    ['Node.js', 'Tech Stack'],
    ['PostgreSQL', 'Tech Stack'],
    ['Tailwind CSS', 'Tech Stack'],
    ['Git', 'Tools'],
    ['Docker', 'Tools'],
    ['VS Code', 'Tools'],
    ['Postman', 'Tools'],
].map(([title, category], index) => ({
    id: 100 + index,
    title,
    type: ResumeContentType.SKILL,
    status: 'published',
    date: '2024-01-01T00:00:00.000Z',
    tags: [],
    excerpt: `${title} experience`,
    content: `${title} is part of the day-to-day toolkit.`,
    slug: slugify(title),
    category,
    proficiency: 85,
}));

const strengths: ResumeContent[] = [
    'Problem Solving',
    'Architecture Design',
    'Team Leadership',
    'Communication',
].map((title, index) => ({
    id: 200 + index,
    title,
    type: ResumeContentType.STRENGTH,
    status: 'published',
    date: '2024-01-01T00:00:00.000Z',
    tags: [],
    excerpt: title,
    content: title,
    slug: slugify(title),
}));

const languages: ResumeContent[] = (
    [
        ['English', 'fluent'],
        ['Spanish', 'basic'],
    ] as [string, ResumeContent['proficiencyLevel']][]
).map(([title, proficiencyLevel], index) => ({
    id: 300 + index,
    title,
    type: ResumeContentType.LANGUAGE,
    status: 'published',
    date: '2024-01-01T00:00:00.000Z',
    tags: [],
    excerpt: `${title} proficiency`,
    content: title,
    slug: slugify(title),
    proficiencyLevel,
}));

export const publicPortfolioData: PublicPortfolioData = {
    profile: publicProfile,
    settings: publicSiteSettings,
    resume: {
        experience,
        projects,
        education,
        skills,
        certifications: [],
        awards: [],
        testimonials: [],
        languages,
        strengths,
    },
    seo: {
        title: publicSiteData.title,
        description: publicSiteData.description,
        keywords: publicSiteData.keywords,
        ogImage: publicSiteData.ogImage,
        siteName: publicSiteData.name,
        baseUrl: publicSiteData.baseUrl,
        author: publicSiteData.author,
        twitterHandle: publicSiteData.twitterHandle,
    },
    hobbies: ['Coding', 'Reading', 'Hiking'],
};

export function getPublicPortfolioData(): PublicPortfolioData {
    return publicPortfolioData;
}

export function getPublicProjects(): ResumeContent[] {
    return projects;
}
