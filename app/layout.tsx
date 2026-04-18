import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/web';
import { publicSiteData } from '@/config/data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    metadataBase: new URL(publicSiteData.baseUrl),
    title: {
        default: publicSiteData.title,
        template: `%s | ${publicSiteData.name}`,
    },
    description: publicSiteData.description,
    keywords: publicSiteData.keywords,
    openGraph: {
        title: publicSiteData.title,
        description: publicSiteData.description,
        url: publicSiteData.baseUrl,
        siteName: publicSiteData.name,
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: publicSiteData.ogImage,
                width: 1200,
                height: 630,
                alt: publicSiteData.title,
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        title: publicSiteData.title,
        description: publicSiteData.description,
        card: 'summary_large_image',
        site: publicSiteData.twitterHandle,
        creator: publicSiteData.twitterHandle,
    },
    icons: {
        icon: '/favicon.ico',
    },
};

const cx = (...classes: string[]): string => classes.filter(Boolean).join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className={cx(inter.className)}
            suppressHydrationWarning
            data-scroll-behavior="smooth"
        >
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    href="/feed/rss.xml"
                    title="RSS Feed"
                />
                <link
                    rel="alternate"
                    type="application/atom+xml"
                    href="/feed/atom.xml"
                    title="Atom Feed"
                />
                <link
                    rel="alternate"
                    type="application/feed+json"
                    href="/feed/feed.json"
                    title="JSON Feed"
                />
            </head>
            <body className="antialiased min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
