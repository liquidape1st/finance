"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/store";

export interface SEOProps {
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    url?: string;
    alternateUrl?: string;
    type?: "website" | "article" | "profile";
    noindex?: boolean;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
    structuredData?: object | object[];
    currentLangOverride?: "vi" | "en";
    siteName?: string;
    twitterHandle?: string;
}

/**
 * SEO Component - Centralized SEO meta tags management
 * Use this component in every page for consistent SEO implementation
 */
export function SEO({
    title,
    description,
    image,
    imageAlt,
    url,
    alternateUrl,
    type = "website",
    noindex = false,
    publishedTime,
    modifiedTime,
    author = "GOInsight",
    section,
    tags = [],
    structuredData,
    currentLangOverride,
    siteName = "GOInsight",
    twitterHandle = "@goinsight",
}: SEOProps) {
    const currentLang = useAppSelector((state) => state.locale.currentLang);

    const siteUrl = "https://goinsight.org";
    const resolvedLang = currentLangOverride || currentLang;
    const canonicalUrl = url || (typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}`
        : siteUrl);
    const siteImage = image || `${siteUrl}/logo.png`;
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
    const alternateLang = resolvedLang === "vi" ? "en" : "vi";
    const locale = resolvedLang === "vi" ? "vi_VN" : "en_US";
    const hreflangCurrent = resolvedLang === "vi" ? "vi-VN" : "en-US";
    const hreflangAlternate = alternateLang === "vi" ? "vi-VN" : "en-US";
    const computedAlternateUrl = alternateUrl
        || `${canonicalUrl}${canonicalUrl.includes("?") ? "&" : "?"}lang=${alternateLang}`;

    // Truncate description to 160 characters for SEO best practices
    const truncatedDescription = description.length > 160
        ? description.substring(0, 157) + "..."
        : description;

    // Build robots content
    const robotsContent = noindex
        ? "noindex, nofollow"
        : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

    useEffect(() => {
        if (typeof document === "undefined") {
            return;
        }

        const head = document.head;
        const managed = head.querySelectorAll('[data-goinsight-seo="true"]');
        managed.forEach((node) => node.remove());

        document.title = fullTitle;

        const addMeta = (attrs: Record<string, string>) => {
            const meta = document.createElement("meta");
            Object.entries(attrs).forEach(([key, value]) => {
                meta.setAttribute(key, value);
            });
            meta.setAttribute("data-goinsight-seo", "true");
            head.appendChild(meta);
        };

        const addLink = (attrs: Record<string, string>) => {
            const link = document.createElement("link");
            Object.entries(attrs).forEach(([key, value]) => {
                link.setAttribute(key, value);
            });
            link.setAttribute("data-goinsight-seo", "true");
            head.appendChild(link);
        };

        const addScript = (data: object) => {
            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.textContent = JSON.stringify(data);
            script.setAttribute("data-goinsight-seo", "true");
            head.appendChild(script);
        };

        const metaTags: Array<Record<string, string>> = [
            { name: "description", content: truncatedDescription },
            { name: "author", content: author },
            { name: "application-name", content: siteName },
            { name: "apple-mobile-web-app-title", content: siteName },
            { name: "apple-mobile-web-app-capable", content: "yes" },
            { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
            { name: "format-detection", content: "telephone=no" },
            { name: "robots", content: robotsContent },
            { name: "googlebot", content: robotsContent },
            { name: "theme-color", content: "#141414" },
            { property: "og:type", content: type },
            { property: "og:url", content: canonicalUrl },
            { property: "og:title", content: fullTitle },
            { property: "og:description", content: truncatedDescription },
            { property: "og:image", content: siteImage },
            { property: "og:image:secure_url", content: siteImage },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            { property: "og:site_name", content: siteName },
            { property: "og:locale", content: locale },
            { property: "og:locale:alternate", content: locale === "vi_VN" ? "en_US" : "vi_VN" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:url", content: canonicalUrl },
            { name: "twitter:title", content: fullTitle },
            { name: "twitter:description", content: truncatedDescription },
            { name: "twitter:image", content: siteImage },
            { name: "twitter:site", content: twitterHandle },
            { name: "twitter:creator", content: twitterHandle },
        ];

        if (imageAlt) {
            metaTags.push({ property: "og:image:alt", content: imageAlt });
            metaTags.push({ name: "twitter:image:alt", content: imageAlt });
        }

        if (type === "article") {
            if (publishedTime) {
                metaTags.push({ property: "article:published_time", content: publishedTime });
            }
            if (modifiedTime) {
                metaTags.push({ property: "article:modified_time", content: modifiedTime });
            }
            if (author) {
                metaTags.push({ property: "article:author", content: author });
            }
            if (section) {
                metaTags.push({ property: "article:section", content: section });
            }
            tags.forEach((tag) => {
                metaTags.push({ property: "article:tag", content: tag });
            });
        }

        metaTags.forEach((tag) => addMeta(tag));

        addLink({ rel: "canonical", href: canonicalUrl });
        addLink({ rel: "alternate", hrefLang: hreflangCurrent, href: canonicalUrl });
        addLink({ rel: "alternate", hrefLang: hreflangAlternate, href: computedAlternateUrl });
        addLink({ rel: "alternate", hrefLang: "x-default", href: canonicalUrl });

        if (structuredData) {
            if (Array.isArray(structuredData)) {
                structuredData.forEach((data) => addScript(data));
            } else {
                addScript(structuredData);
            }
        }
    }, [
        fullTitle,
        truncatedDescription,
        author,
        siteName,
        robotsContent,
        type,
        canonicalUrl,
        siteImage,
        imageAlt,
        locale,
        hreflangCurrent,
        hreflangAlternate,
        computedAlternateUrl,
        publishedTime,
        modifiedTime,
        section,
        tags,
        structuredData,
        twitterHandle,
    ]);

    return null;
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
}

/**
 * Generate Article/BlogPosting structured data
 */
export function generateArticleSchema({
    title,
    description,
    imageUrl,
    publishedTime,
    modifiedTime,
    authorName = "GOInsight",
    url,
    wordCount,
    section,
}: {
    title: string;
    description: string;
    imageUrl?: string;
    publishedTime?: string;
    modifiedTime?: string;
    authorName?: string;
    url: string;
    wordCount?: number;
    section?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "image": imageUrl ? [{
            "@type": "ImageObject",
            "url": imageUrl,
            "width": 1200,
            "height": 630
        }] : [],
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "url": url,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        },
        "author": {
            "@type": "Organization",
            "name": authorName,
            "url": "https://goinsight.org"
        },
        "publisher": {
            "@type": "Organization",
            "name": "GOInsight",
            "logo": {
                "@type": "ImageObject",
                "url": "https://goinsight.org/logo.png",
                "width": 512,
                "height": 512
            }
        },
        ...(section && { "articleSection": section }),
        ...(wordCount && { "wordCount": wordCount })
    };
}

/**
 * Generate FAQPage structured data
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

/**
 * Generate ItemList structured data for blog listing pages
 */
export function generateItemListSchema({
    name,
    description,
    items,
}: {
    name: string;
    description: string;
    items: { title: string; description: string; url: string; image?: string }[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": name,
        "description": description,
        "numberOfItems": items.length,
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "BlogPosting",
                "headline": item.title,
                "description": item.description,
                "url": item.url,
                ...(item.image && { "image": item.image })
            }
        }))
    };
}

export default SEO;
