import React from 'react';

interface SectionProps {
    id: string;
    className?: string;
    children: React.ReactNode;
    title?: string;
    count?: number;
    rightElement?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
    id,
    className = '',
    children,
    title,
    count,
    rightElement,
}) => {
    return (
        <section id={id} className={`scroll-mt-24 py-10 ${className}`}>
            {(title || rightElement) && (
                <div className="mb-6 flex items-baseline justify-between">
                    {title && (
                        <h2 className="flex items-baseline text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                            {title}
                            {count !== undefined && (
                                <span className="ml-2 text-sm font-normal text-zinc-500 dark:text-zinc-400">
                                    ({count})
                                </span>
                            )}
                        </h2>
                    )}
                    {rightElement}
                </div>
            )}
            {children}
        </section>
    );
};

export default Section;
