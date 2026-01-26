import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

/**
 * Breadcrumb Component
 * Provides navigation context and improves SEO with structured data support
 * Should be used with generateBreadcrumbSchema() for full SEO benefits
 */
export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
    if (!items || items.length === 0) return null;

    return (
        <nav
            className={`flex items-center flex-wrap gap-1.5 text-sm ${className}`}
            aria-label="Breadcrumb"
        >
            <ol
                className="flex items-center flex-wrap gap-1.5"
                itemScope
                itemType="https://schema.org/BreadcrumbList"
            >
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    const isFirst = index === 0;

                    return (
                        <li
                            key={`breadcrumb-${index}`}
                            className="flex items-center gap-1.5"
                            itemScope
                            itemProp="itemListElement"
                            itemType="https://schema.org/ListItem"
                        >
                            {index > 0 && (
                                <ChevronRight
                                    className="size-3.5 text-[#666666]"
                                    aria-hidden="true"
                                />
                            )}

                            {isLast ? (
                                <span
                                    className="text-[#FFD11A] font-medium truncate max-w-[200px]"
                                    itemProp="name"
                                    aria-current="page"
                                >
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    to={item.url}
                                    className="inline-flex items-center gap-1.5 text-[#98989a] hover:text-white transition-colors"
                                    itemProp="item"
                                >
                                    {isFirst && (
                                        <Home className="size-3.5" aria-hidden="true" />
                                    )}
                                    <span itemProp="name">{item.name}</span>
                                </Link>
                            )}

                            <meta itemProp="position" content={String(index + 1)} />
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

export default Breadcrumb;
