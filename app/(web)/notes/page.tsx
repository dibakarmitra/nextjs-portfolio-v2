import type { Metadata } from 'next';
import { AllNotes } from '@/components/web';
import { getNotes } from '@/lib/webNotes';

export const metadata: Metadata = {
    title: 'Notes',
    description: `Browse technical notes and blog posts on various topics including Laravel, Django, React, and more.`,
    alternates: {
        canonical: '/notes',
    },
};

export default async function NotesPage() {
    return <AllNotes notes={await getNotes()} />;
}
