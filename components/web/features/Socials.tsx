'use client';

import React from 'react';
import { Briefcase, MessageSquare, ExternalLink, Code, Book, Layout } from 'lucide-react';
import { publicProfile } from '@/config/data';

interface SocialsProps {
    socials?: Record<string, string>;
}

const Socials: React.FC<SocialsProps> = ({ socials: dbSocials }) => {
    // transform db socials to the format needed, or use static
    const socials =
        dbSocials && Object.keys(dbSocials).length > 0
            ? Object.entries(dbSocials)
                  .filter(([_, url]) => url)
                  .map(([platform, url]) => ({
                      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
                      url: url.startsWith('http') ? url : `https://${url}`,
                      icon: platform.toLowerCase(),
                      username:
                          url
                              .replace(/^https?:\/\//, '')
                              .split('/')
                              .pop() || url,
                  }))
            : Object.entries(publicProfile.socials)
                  .filter(([_, url]) => url)
                  .map(([platform, url]) => ({
                      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
                      url: url.startsWith('http') ? url : `https://${url}`,
                      icon: platform === 'x' ? 'twitter' : platform.toLowerCase(),
                      username:
                          url
                              .replace(/^https?:\/\//, '')
                              .split('/')
                              .pop() || url,
                  }));

    const getIcon = (icon: string) => {
        switch (icon) {
            case 'github':
                return <Code size={20} />;
            case 'linkedin':
                return <Briefcase size={20} />;
            case 'twitter':
                return <MessageSquare size={20} />;
            case 'code':
                return <Code size={20} />;
            case 'book':
                return <Book size={20} />;
            case 'layout':
            case 'website':
                return <Layout size={20} />;
            default:
                return <ExternalLink size={20} />;
        }
    };

    return (
        <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {socials.map((social, idx) => (
                <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${social.platform} profile`}
                    className="group flex items-center rounded-lg border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
                >
                    <div className="rounded-md bg-zinc-100 p-2 text-zinc-500 transition-colors group-hover:text-zinc-900 dark:bg-zinc-950 dark:text-zinc-400 dark:group-hover:text-white">
                        {getIcon(social.icon)}
                    </div>
                    <div className="ml-4 flex-grow">
                        <div className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                            {social.platform}
                        </div>
                        <p className="text-xs text-zinc-500">{social.username}</p>
                    </div>
                    <ExternalLink
                        size={16}
                        className="text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-600 dark:group-hover:text-zinc-400"
                    />
                </a>
            ))}
        </div>
    );
};

export default Socials;
