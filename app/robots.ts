import { MetadataRoute } from 'next';
import { publicSiteData } from '@/config/data';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: [
            `${publicSiteData.baseUrl}/sitemap.xml`,
            `${publicSiteData.baseUrl}/feed/rss.xml`,
            `${publicSiteData.baseUrl}/feed/atom.xml`,
        ],
    };
}
