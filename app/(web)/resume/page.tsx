import type { Metadata } from 'next';
import { Resume, SplashCursor } from '@/components/web';
import { getPublicPortfolioData } from '@/config/data';

export const metadata: Metadata = {
    title: 'Resume',
    description: `Professional resume and portfolio of a Senior PHP Developer specializing in Laravel, Django, and backend development.`,
    alternates: {
        canonical: '/resume',
    },
};

export default function ResumePage() {
    const portfolioData = getPublicPortfolioData();

    return (
        <>
            <SplashCursor />
            <Resume data={portfolioData} />
        </>
    );
}
