import { Feed } from 'feed';
import { publicSiteData } from '@/config/data';
import { getNotes } from '@/lib/webNotes';
import { NextResponse } from 'next/server';
import { remark } from 'remark';
import html from 'remark-html';

async function markdownToHtml(markdown: string): Promise<string> {
    const result = await remark().use(html).process(markdown);
    return result.toString();
}

export async function GET(_: Request, props: { params: Promise<{ format: string }> }) {
    const params = await props.params;
    const { format } = params;
    const validFormats = ['rss.xml', 'atom.xml', 'feed.json'];

    if (!validFormats.includes(format)) {
        return NextResponse.json({ error: 'Unsupported feed format' }, { status: 404 });
    }

    const BaseUrl = publicSiteData.baseUrl.endsWith('/')
        ? publicSiteData.baseUrl
        : `${publicSiteData.baseUrl}/`;

    const feed = new Feed({
        title: publicSiteData.title,
        description: publicSiteData.description,
        id: BaseUrl,
        link: BaseUrl,
        copyright: `All rights reserved ${new Date().getFullYear()}, ${publicSiteData.name}`,
        generator: 'Feed for Node.js',
        feedLinks: {
            json: `${BaseUrl}feed/feed.json`,
            atom: `${BaseUrl}feed/atom.xml`,
            rss: `${BaseUrl}feed/rss.xml`,
        },
    });

    const allNotes = await getNotes();

    for (const note of allNotes) {
        const noteUrl = `${BaseUrl}notes/${note.slug}`;
        const categories = Array.isArray(note.tags) ? note.tags.map((tag) => tag.trim()) : [];
        const noteDate = new Date(note.date);
        const isValidDate = !isNaN(noteDate.getTime());
        const htmlContent = await markdownToHtml(note.content);

        feed.addItem({
            title: note.title,
            id: noteUrl,
            link: noteUrl,
            description: note.excerpt,
            content: htmlContent,
            author: [
                {
                    name: publicSiteData.author,
                    email: publicSiteData.email,
                    link: publicSiteData.baseUrl,
                },
            ],
            contributor: [],
            category: categories.map((tag) => ({
                name: tag,
                term: tag,
            })),
            date: isValidDate ? noteDate : new Date(),
        });
    }

    const responseMap: Record<string, { content: string; contentType: string }> = {
        'rss.xml': { content: feed.rss2(), contentType: 'application/xml' },
        'atom.xml': { content: feed.atom1(), contentType: 'application/xml' },
        'feed.json': { content: feed.json1(), contentType: 'application/json' },
    };

    const response = responseMap[format];

    return new NextResponse(response.content, {
        headers: {
            'Content-Type': response.contentType,
        },
    });
}
