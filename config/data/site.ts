import { env } from '@/config/env';
import type { PublicSiteData } from './types';

const DEFAULT_AVATAR =
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Portfolio&backgroundColor=b6e3f4';

const baseUrl = env.APP_URL || 'http://localhost:3000';
const ownerName = 'John Doe';
const ownerRole = 'Senior Developer';
const ownerEmail = 'john@example.com';
const ownerWebsite = baseUrl;
const githubUrl = 'https://github.com/johndoe';
const linkedinUrl = 'https://linkedin.com/in/johndoe';
const twitterHandle = '@johndoe';

export const publicSiteSettings: PublicSiteData['settings'] = {
    'site.name': ownerName,
    'site.description': 'Professional portfolio website',
    'site.url': baseUrl,
    'site.adminEmail': ownerEmail,
    'site.language': 'en',
    'site.timezone': 'UTC',
    'theme.mode': 'system',
    'features.notifications': true,
    'features.analytics': false,
    'features.maintenanceMode': false,
    'upload.maxSize': 10,
    'upload.allowedTypes': ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
    'seo.title': `${ownerName} - ${ownerRole}`,
    'seo.description': 'Professional portfolio website for sharing work and writing.',
    'seo.keywords': 'portfolio, software engineer, next.js, typescript, web developer',
};

export const publicSiteData: PublicSiteData = {
    name: ownerName,
    title: `${ownerName} - ${ownerRole}`,
    description: 'Professional portfolio website for sharing work and writing.',
    baseUrl,
    author: ownerName,
    email: ownerEmail,
    keywords: String(publicSiteSettings['seo.keywords']),
    ogImage: DEFAULT_AVATAR,
    twitterHandle,
    githubUrl,
    linkedinUrl,
    websiteUrl: ownerWebsite,
    sourceCodeUrl: 'https://github.com/dibakarmitra/portfolio-nextjs-v2',
    settings: publicSiteSettings,
};
