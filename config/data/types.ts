import type { ResumeContent, UserProfile } from '@/types';

export interface PublicPortfolioData {
    profile: UserProfile;
    settings: Record<string, string | number | boolean | string[]>;
    resume: {
        experience: ResumeContent[];
        projects: ResumeContent[];
        education: ResumeContent[];
        skills: ResumeContent[];
        certifications: ResumeContent[];
        awards: ResumeContent[];
        testimonials: ResumeContent[];
        languages: ResumeContent[];
        strengths: ResumeContent[];
    };
    seo: {
        title: string;
        description: string;
        keywords: string;
        ogImage: string;
        siteName: string;
        baseUrl: string;
        author: string;
        twitterHandle: string;
    };
    hobbies: string[];
}

export interface PublicSiteData {
    name: string;
    title: string;
    description: string;
    baseUrl: string;
    author: string;
    email: string;
    keywords: string;
    ogImage: string;
    twitterHandle: string;
    githubUrl: string;
    linkedinUrl: string;
    websiteUrl: string;
    sourceCodeUrl: string;
    settings: Record<string, string | number | boolean | string[]>;
}
