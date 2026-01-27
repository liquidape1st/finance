import { Helmet } from "react-helmet-async";
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

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={truncatedDescription} />
            <meta name="author" content={author} />
            <meta name="application-name" content={siteName} />
            <meta name="apple-mobile-web-app-title" content={siteName} />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="robots" content={robotsContent} />
            <meta name="googlebot" content={robotsContent} />

            {/* Theme */}
            <meta name="theme-color" content="#141414" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={truncatedDescription} />
            <meta property="og:image" content={siteImage} />
            <meta property="og:image:secure_url" content={siteImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content={locale} />
            <meta property="og:locale:alternate" content={locale === "vi_VN" ? "en_US" : "vi_VN"} />

            {/* Article specific Open Graph */}
            {type === "article" && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {type === "article" && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}
            {type === "article" && author && (
                <meta property="article:author" content={author} />
            )}
            {type === "article" && section && (
                <meta property="article:section" content={section} />
            )}
            {type === "article" && tags.map((tag, index) => (
                <meta key={`og-tag-${index}`} property="article:tag" content={tag} />
            ))}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={truncatedDescription} />
            <meta name="twitter:image" content={siteImage} />
            {imageAlt && <meta name="twitter:image:alt" content={imageAlt} />}
            <meta name="twitter:site" content={twitterHandle} />
            <meta name="twitter:creator" content={twitterHandle} />

            {/* Canonical & Hreflang */}
            <link rel="canonical" href={canonicalUrl} />
            <link rel="alternate" hrefLang={hreflangCurrent} href={canonicalUrl} />
            <link rel="alternate" hrefLang={hreflangAlternate} href={computedAlternateUrl} />
            <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

            {/* Structured Data */}
            {structuredData && (
                Array.isArray(structuredData)
                    ? structuredData.map((data, index) => (
                        <script key={`sd-${index}`} type="application/ld+json">
                            {JSON.stringify(data)}
                        </script>
                    ))
                    : (
                        <script type="application/ld+json">
                            {JSON.stringify(structuredData)}
                        </script>
                    )
            )}
        </Helmet>
    );
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
