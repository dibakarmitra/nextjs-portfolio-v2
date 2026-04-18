import { publicSiteData } from '@/config/data';

export default function Loading() {
    const initials = publicSiteData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-50 dark:bg-[#0a0a0a]">
            <div className="relative mb-4 flex items-center justify-center">
                <div className="absolute h-16 w-16 rounded-full border-4 border-zinc-200 dark:border-zinc-800"></div>

                <div className="absolute h-16 w-16 animate-spin rounded-full border-4 border-b-transparent border-l-transparent border-r-transparent border-t-blue-600 dark:border-t-blue-500"></div>

                <div className="animate-pulse font-mono text-xl font-bold tracking-widest text-zinc-900 dark:text-zinc-100">
                    {initials}
                </div>
            </div>

            <p className="animate-pulse font-mono text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-600">
                Loading
            </p>
        </div>
    );
}
