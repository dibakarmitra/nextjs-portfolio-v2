export enum ResumeContentType {
    EXPERIENCE = 'experience',
    PROJECT = 'project',
    EDUCATION = 'education',
    SKILL = 'skill',
    CERTIFICATION = 'certification',
    AWARD = 'award',
    TESTIMONIAL = 'testimonial',
    LANGUAGE = 'language',
    STRENGTH = 'strength',
}

export interface SEOConfig {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    description?: string;
    color?: string;
    usageCount: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ResumeContent {
    id: number;
    title: string;
    type: ResumeContentType;
    status: 'published' | 'draft' | 'archived';
    date: string;
    tags: Tag[];
    excerpt: string;
    content: string;
    views?: number;
    likes?: number;
    seo?: SEOConfig;
    slug: string;
    imageUrl?: string;
    repoUrl?: string;
    liveUrl?: string;
    company?: string;
    location?: string;
    endDate?: string;
    proficiency?: number;
    category?: string;
    issuer?: string;
    verificationId?: string;
    verificationUrl?: string;
    personName?: string;
    personPosition?: string;
    personAvatar?: string;
    proficiencyLevel?: 'native' | 'fluent' | 'intermediate' | 'basic';
}

export interface UserProfile {
    displayName: string;
    role: string;
    location: string;
    availability: string;
    avatarUrl: string;
    bio: string;
    email: string;
    phone: string;
    siteUrl: string;
    resumeUrl: string;
    socials: {
        github: string;
        linkedin: string;
        website: string;
        x: string;
    };
    seo: SEOConfig;
}

export interface Note {
    id: string;
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    description?: string;
    tags: string[];
    content: string;
    image?: string;
    link?: string;
}
