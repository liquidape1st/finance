/**
 * Utility functions for processing blog content
 * Adds IDs to headings for Table of Contents navigation
 */

/**
 * Generates a URL-friendly slug from text
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
        .substring(0, 60); // Limit length
}

/**
 * Adds unique IDs to all headings (h2-h6) in HTML content
 * This enables Table of Contents navigation and improves SEO
 * 
 * @param htmlContent - The raw HTML content string
 * @returns HTML content with IDs added to headings
 */
export function addHeadingIds(htmlContent: string): string {
    if (!htmlContent) return '';

    const usedIds = new Set<string>();
    let headingIndex = 0;

    return htmlContent.replace(
        /<h([2-6])([^>]*)>([\s\S]*?)<\/h[2-6]>/gi,
        (match, level, attrs, content) => {
            // Check if heading already has an id
            if (/id\s*=\s*["'][^"']+["']/i.test(attrs)) {
                return match;
            }

            // Extract text content (remove HTML tags)
            const textContent = content.replace(/<[^>]*>/g, '').trim();

            // Generate base slug from text or use index
            let baseSlug = slugify(textContent) || `heading-${headingIndex}`;
            let slug = baseSlug;
            let counter = 1;

            // Ensure uniqueness
            while (usedIds.has(slug)) {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }
            usedIds.add(slug);
            headingIndex++;

            // Add id attribute
            const newAttrs = attrs ? `${attrs} id="${slug}"` : ` id="${slug}"`;
            return `<h${level}${newAttrs}>${content}</h${level}>`;
        }
    );
}

/**
 * Extracts headings from HTML content for TOC generation
 * Returns headings with their IDs and text content
 */
export interface HeadingInfo {
    id: string;
    text: string;
    level: number;
}

export function extractHeadings(htmlContent: string, maxLevel: number = 3): HeadingInfo[] {
    if (!htmlContent) return [];

    const headings: HeadingInfo[] = [];
    // Match opening tag with capturing group for level and attributes, then content, then closing tag
    // Note: This regex assumes well-formed HTML from processed content
    const regex = /<h([2-6])([^>]*)>([\s\S]*?)<\/h\1>/gi;
    let match;

    while ((match = regex.exec(htmlContent)) !== null) {
        const level = parseInt(match[1], 10);
        if (level > maxLevel + 1) continue;

        const attrs = match[2];
        const content = match[3];
        const text = content.replace(/<[^>]*>/g, '').trim();

        // Robust ID extraction from attributes
        // Matches id="value" or id='value'
        const idMatch = attrs.match(/id=["']([^"']*)["']/i);

        // Fallback to slugify if ID is missing (should match how addHeadingIds generates it elsewhere if used)
        const id = idMatch ? idMatch[1] : (slugify(text) || `heading-${headings.length}`);

        headings.push({
            id,
            text,
            level: level - 2 // Normalize (h2 = 0, h3 = 1, etc.)
        });
    }

    return headings;
}
