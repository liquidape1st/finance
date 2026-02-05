import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { List } from "lucide-react";
import { extractHeadings } from "../utils/contentProcessor";

interface TableOfContentsProps {
    content: string;
    maxLevel?: number;
    className?: string;
}

/**
 * Table of Contents Component
 * Automatically generates TOC from HTML content headings
 * Improves UX and can increase time-on-page (SEO benefit)
 */
export function TableOfContents({ content, maxLevel = 3, className = "" }: TableOfContentsProps) {
    const { t } = useTranslation();
    const [activeId, setActiveId] = useState<string>("");

    const tocItems = useMemo(() => {
        return extractHeadings(content, maxLevel);
    }, [content, maxLevel]);

    useEffect(() => {
        if (tocItems.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "0px 0px -80% 0px", // Trigger when element is near top
                threshold: 0.1,
            }
        );

        tocItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [tocItems]);

    if (tocItems.length < 2) return null;

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100; // Offset for fixed header
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset; // Calculate absolute position
            window.scrollTo({ top: y, behavior: "smooth" });
            setActiveId(id); // Set active immediately on click
        }
    };

    return (
        <nav
            className={`bg-[#1a1a1a] border border-[#262626] rounded-xl p-5 ${className}`}
            aria-label="Table of contents"
        >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#262626]">
                <List className="size-5 text-[#FFD11A]" aria-hidden="true" />
                <h2 className="text-white font-medium text-base h-full">
                    {t("blog.toc.title", { defaultValue: "Mục lục" })}
                </h2>
            </div>

            <div className="relative">
                {/* Timeline vertical line */}
                <div className="absolute top-2 bottom-2 left-[7px] w-[1px] bg-[#262626]" />

                <ul className="space-y-4" role="list">
                    {tocItems.map((item, index) => {
                        const isActive = activeId === item.id;
                        // Calculate padding based on level (keeping it subtle)
                        // level 2 (h2) -> 0px, level 3 (h3) -> 16px
                        const paddingLeft = item.level > 2 ? 'ml-4' : '';

                        return (
                            <li
                                key={`toc-${item.id}-${index}`}
                                className={`relative pl-6 ${paddingLeft}`}
                            >
                                {/* Timeline Dot */}
                                <div
                                    className={`absolute left-[3px] top-[9px] size-2 rounded-full border transition-all duration-300 z-10 
                                    ${isActive
                                            ? "bg-[#FFD11A] border-[#FFD11A] shadow-[0_0_8px_rgba(255,209,26,0.6)] scale-125"
                                            : "bg-[#141414] border-[#666666] group-hover:border-[#98989a]"}`}
                                />

                                <button
                                    onClick={() => handleClick(item.id)}
                                    className={`text-left text-sm transition-all duration-300 w-full group
                                        ${isActive
                                            ? "text-[#FFD11A] font-medium translate-x-1"
                                            : "text-[#98989a] hover:text-white"}`}
                                >
                                    <span className="line-clamp-2 block leading-relaxed">
                                        {item.text}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}

export default TableOfContents;
