import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NoteDetail } from '@/components/web';
import { getNote, getNotes } from '@/lib/webNotes';
import { publicSiteData } from '@/config/data';
import { Note as WebNote } from '@/types/web';

interface Props {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    const notes = await getNotes();
    return notes.map((note) => ({
        slug: note.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {
        const { slug } = await params;
        const note = await getNote(slug);

        if (!note) {
            return {
                title: 'Note Not Found',
            };
        }

        return {
            title: note.title,
            description: note.excerpt || note.description || publicSiteData.description,
            openGraph: {
                title: note.title,
                description: note.excerpt || note.description || publicSiteData.description,
                type: 'article',
                publishedTime: note.date,
                url: `/notes/${slug}`,
                authors: [publicSiteData.author],
            },
            alternates: {
                canonical: `/notes/${slug}`,
            },
        };
    } catch (error) {
        console.error('Metadata generation error:', error);
        return { title: `Error | ${publicSiteData.name}` };
    }
}

export default async function NoteDetailPage({ params }: Props) {
    const { slug } = await params;
    const note = await getNote(slug);

    if (!note) {
        notFound();
    }

    const webNote: WebNote = {
        id: note.id,
        slug: note.slug,
        title: note.title,
        date: note.date,
        excerpt: note.excerpt,
        content: note.content,
        tags: note.tags,
        image: note.image,
        link: note.link,
    };

    return <NoteDetail note={webNote} />;
}
