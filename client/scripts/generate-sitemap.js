/**
 * Dynamic Sitemap Generator Script
 * Run this script during build or as a scheduled task to keep sitemap updated
 * 
 * Usage: node scripts/generate-sitemap.js
 * 
 * Requirements:
 * - Set API_URL environment variable or update the apiUrl constant
 * - Make sure the API endpoint returns blog data in expected format
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    baseUrl: 'https://goincome.net',
    apiUrl: process.env.API_URL || 'https://api.goincome.net/api',
    outputPath: path.resolve(__dirname, '../public/sitemap.xml'),
    sections: ['learn', 'news', 'guides', 'market'],
    languages: ['vi', 'en'],
    staticPages: [
        { url: '/', changefreq: 'daily', priority: '1.0' },
        { url: '/learn', changefreq: 'daily', priority: '0.9' },
        { url: '/news', changefreq: 'daily', priority: '0.9' },
        { url: '/guides', changefreq: 'weekly', priority: '0.8' },
        { url: '/market', changefreq: 'daily', priority: '0.9' },
        { url: '/resources', changefreq: 'weekly', priority: '0.8' },
        { url: '/contact', changefreq: 'monthly', priority: '0.6' },
        { url: '/privacy', changefreq: 'yearly', priority: '0.3' },
        { url: '/terms', changefreq: 'yearly', priority: '0.3' },
    ]
};

/**
 * Fetch all blog posts from API
 */
async function fetchBlogs(section) {
    try {
        const response = await fetch(`${config.apiUrl}/client/blog-translations?uiType=${section.toUpperCase()}&pageSize=1000`);
        if (!response.ok) {
            console.warn(`Warning: Could not fetch blogs for section ${section}`);
            return [];
        }
        const data = await response.json();
        return data.data || data.content || data || [];
    } catch (error) {
        console.warn(`Warning: Error fetching blogs for ${section}:`, error.message);
        return [];
    }
}

/**
 * Generate XML for a single URL entry
 */
function generateUrlEntry(url, lastmod, changefreq, priority, alternates = []) {
    let entry = `
  <url>
    <loc>${config.baseUrl}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

    alternates.forEach(alt => {
        entry += `
    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${config.baseUrl}${alt.url}"/>`;
    });

    entry += `
  </url>`;

    return entry;
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDate(dateString) {
    if (!dateString) return new Date().toISOString().split('T')[0];
    try {
        return new Date(dateString).toISOString().split('T')[0];
    } catch {
        return new Date().toISOString().split('T')[0];
    }
}

/**
 * Main function to generate sitemap
 */
async function generateSitemap() {
    console.log('🚀 Starting sitemap generation...');
    const today = new Date().toISOString().split('T')[0];

    let urlEntries = [];

    // Add static pages
    console.log('📄 Adding static pages...');
    for (const page of config.staticPages) {
        const alternates = config.languages.map(lang => ({
            lang: lang === 'vi' ? 'vi-VN' : 'en-US',
            url: `${page.url}${page.url.includes('?') ? '&' : '?'}lang=${lang}`
        }));
        alternates.push({ lang: 'x-default', url: page.url });

        urlEntries.push(generateUrlEntry(
            page.url,
            today,
            page.changefreq,
            page.priority,
            page.url !== '/privacy' && page.url !== '/terms' ? alternates : []
        ));
    }

    // Add dynamic blog pages
    console.log('📝 Fetching blog posts...');
    for (const section of config.sections) {
        const blogs = await fetchBlogs(section);
        console.log(`   Found ${blogs.length} posts in ${section}`);

        for (const blog of blogs) {
            if (!blog.slug || !blog.langCode) continue;

            const blogUrl = `/${section}/${blog.langCode}/${blog.slug}`;
            const lastmod = formatDate(blog.updatedAt || blog.createdAt);

            // Generate alternate language URLs if available
            const alternates = [];
            if (blog.slugs && Array.isArray(blog.slugs)) {
                blog.slugs.forEach(s => {
                    alternates.push({
                        lang: s.langCode === 'vi' ? 'vi-VN' : 'en-US',
                        url: `/${section}/${s.langCode}/${s.slug}`
                    });
                });
            } else {
                alternates.push({
                    lang: blog.langCode === 'vi' ? 'vi-VN' : 'en-US',
                    url: blogUrl
                });
            }

            urlEntries.push(generateUrlEntry(blogUrl, lastmod, 'weekly', '0.7', alternates));
        }
    }

    // Build final sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries.join('')}
</urlset>`;

    // Write to file
    fs.writeFileSync(config.outputPath, sitemap, 'utf8');
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`   Total URLs: ${urlEntries.length}`);
    console.log(`   Output: ${config.outputPath}`);
}

// Run the generator
generateSitemap().catch(error => {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
});
