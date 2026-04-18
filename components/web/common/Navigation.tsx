'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon, Code, FileText } from 'lucide-react';
import { useTheme } from 'next-themes';
import { publicProfile, publicSiteData } from '@/config/data';

const Navigation: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Stack', href: '#tech-stack' },
        { name: 'Projects', href: '#projects' },
        { name: 'Notes', href: '#notes' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 z-50 w-full border-b border-transparent transition-all duration-300 ${scrolled ? 'border-zinc-200/50 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-950/80' : ''}`}
            >
                <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 md:px-6">
                    <Link
                        href="/"
                        className="text-sm font-bold text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                    >
                        {publicSiteData.name}
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden items-center gap-6 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Resume Link */}
                        <Link
                            href="/resume"
                            className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            title="Resume"
                        >
                            <FileText size={18} />
                        </Link>

                        {publicProfile.socials.github && (
                            <a
                                href={publicProfile.socials.github}
                                target="_blank"
                                rel="noreferrer"
                                className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                                aria-label="GitHub Profile"
                            >
                                <Code size={18} />
                            </a>
                        )}

                        <div className="hidden h-4 w-px bg-zinc-200 dark:bg-zinc-800 md:block"></div>

                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="group cursor-pointer rounded-full bg-zinc-100 p-2 text-zinc-500 transition-colors hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
                            aria-label="Toggle Theme"
                        >
                            {mounted ? (
                                theme === 'dark' ? (
                                    <Sun size={18} />
                                ) : (
                                    <Moon size={18} />
                                )
                            ) : (
                                <div className="h-[18px] w-[18px]" />
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="ml-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="absolute left-0 top-16 flex w-full flex-col gap-4 border-b border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block py-2 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navigation;
