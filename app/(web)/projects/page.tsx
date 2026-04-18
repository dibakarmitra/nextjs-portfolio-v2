import type { Metadata } from 'next';
import { AllProjects } from '@/components/web';
import { getPublicProjects } from '@/config/data';

export const metadata: Metadata = {
    title: 'Projects',
    description: `Browse all projects including web applications, APIs, and more.`,
    alternates: {
        canonical: '/projects',
    },
};

export default function ProjectsPage() {
    return <AllProjects projects={getPublicProjects()} />;
}
