import { MetadataRoute } from 'next';
import { getNotes } from '@/lib/webNotes';
import { publicSiteData } from '@/config/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = publicSiteData.baseUrl;
    const notes = await getNotes();

    const noteUrls = notes.map((note) => ({
        url: `${baseUrl}/notes/${note.slug}`,
        lastModified: new Date(note.date),
    }));

    return [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/notes`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/resume`,
            lastModified: new Date(),
        },
        ...noteUrls,
    ];
}
