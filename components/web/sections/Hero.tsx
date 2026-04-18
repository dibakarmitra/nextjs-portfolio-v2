'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Mail,
    MapPin,
    Phone,
    Briefcase,
    Globe,
    CheckCircle2,
    FileText,
    BadgeCheck,
} from 'lucide-react';
import { UserProfile } from '@/types';
import { publicProfile } from '@/config/data';

interface HeroProps {
    profile?: UserProfile | null;
}

const Hero: React.FC<HeroProps> = ({ profile: dbProfile }) => {
    const profile = dbProfile
        ? {
              name: dbProfile.displayName,
              role: dbProfile.role,
              location: dbProfile.location,
              phone: dbProfile.phone,
              email: dbProfile.email,
              website: dbProfile.siteUrl?.replace('https://', '').replace('http://', ''),
              avatar: dbProfile.avatarUrl,
              resumeUrl: dbProfile.resumeUrl,
          }
        : {
              name: publicProfile.displayName,
              role: publicProfile.role,
              location: publicProfile.location,
              phone: publicProfile.phone,
              email: publicProfile.email,
              website: publicProfile.siteUrl,
              avatar: publicProfile.avatarUrl,
              resumeUrl: publicProfile.resumeUrl,
          };

    const websiteHref = profile.website.startsWith('http')
        ? profile.website
        : `https://${profile.website}`;
    const websiteLabel = profile.website.replace(/^https?:\/\//, '').replace(/\/$/, '');

    return (
        <div id="home" className="pb-10 pt-24">
            <div className="flex flex-col items-start gap-8 md:flex-row">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-zinc-100 shadow-xl dark:border-zinc-900 dark:bg-zinc-800 md:h-40 md:w-40">
                        <Image
                            src={profile.avatar}
                            alt={profile.name}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 128px, 160px"
                        />
                    </div>
                    <div className="absolute bottom-2 right-2 rounded-full bg-white p-1 shadow-sm dark:bg-zinc-900">
                        <CheckCircle2 className="h-6 w-6 fill-current text-blue-500" />
                    </div>
                </div>

                {/* Info */}
                <div className="flex-grow space-y-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 md:text-4xl">
                                {profile.name}
                            </h1>
                            <BadgeCheck className="h-6 w-6 text-blue-500" aria-label="Verified" />
                        </div>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-500">
                            Tech blogger sharing insights and tutorials regularly.
                        </p>
                    </div>

                    <div className="space-y-2 font-mono text-sm text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-3">
                            <Briefcase size={16} className="text-zinc-400 dark:text-zinc-500" />
                            <span>{profile.role}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <MapPin size={16} className="text-zinc-400 dark:text-zinc-500" />
                            <span>{profile.location}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone size={16} className="text-zinc-400 dark:text-zinc-500" />
                            <span>{profile.phone}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Mail size={16} className="text-zinc-400 dark:text-zinc-500" />
                            <a
                                href={`mailto:${profile.email}`}
                                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
                            >
                                {profile.email}
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            <Globe size={16} className="text-zinc-400 dark:text-zinc-500" />
                            <a
                                href={websiteHref}
                                target="_blank"
                                rel="noreferrer"
                                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-200"
                            >
                                {websiteLabel}
                            </a>
                        </div>

                        {profile.resumeUrl && (
                            <div className="flex items-center gap-3 pt-2">
                                <Link
                                    href="/resume"
                                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                                >
                                    <FileText size={14} /> View Resume
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
