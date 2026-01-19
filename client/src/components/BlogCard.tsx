import { BlogTranslationClient } from "@/@types/blog.translation.client";
import appConfig from "@/configs/app.config";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type BlogCardProps = {
    blog: BlogTranslationClient;
    currentLang: string;
    prefix: string;
    showBadge?: boolean;
    showReadMore?: boolean;
    className?: string;
};

const getBlogImageUrl = (fileName: string, updatedAt: string) =>
    `${appConfig.apiPrefix}/s3/stream?fileName=${encodeURIComponent(fileName)}&v=${Date.parse(updatedAt) || 0}`;

const uiTypeStyles: Record<string, string> = {
    NEWS: 'bg-blue-500/15 text-blue-100 border border-blue-400/40 shadow-blue-500/20',
    BLOG: 'bg-emerald-500/15 text-emerald-100 border border-emerald-400/40 shadow-emerald-500/20',
    MARKET: 'bg-purple-500/15 text-purple-100 border border-purple-400/40 shadow-purple-500/20',
    DEFAULT: 'bg-gray-500/15 text-gray-100 border border-gray-400/40 shadow-gray-500/20'
};

export function BlogCard({
    blog,
    currentLang,
    prefix,
    showBadge = false,
    showReadMore = false,
    className = ""
}: BlogCardProps) {
    const { t } = useTranslation();

    return (
        <Link
            to={`/${prefix}/${currentLang}/${blog.slug}`}
            state={{ blog }}
            className={`group flex flex-col cursor-pointer ${className}`}
        >
            <article className="flex flex-row sm:flex-col h-full gap-4 sm:gap-0">
                {/* Image */}
                <div className="relative w-40 h-auto sm:w-full sm:h-53.75 rounded-[10px] overflow-hidden bg-[#1a1a1a] shrink-0 sm:mb-4">
                    <img
                        src={getBlogImageUrl(blog.image, blog.updatedAt)}
                        loading="lazy"
                        decoding="async"
                        alt={blog.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {showBadge && blog.uiType && (
                        <div
                            className={`absolute top-2 right-2 z-30 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-white shadow-xl shadow-black/50 backdrop-blur-sm border border-white/10 ${uiTypeStyles[blog.uiType] || uiTypeStyles.DEFAULT}`}
                        >
                            {blog.uiType}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2 sm:gap-2.5 flex-1 min-w-0">
                    {/* Title & Category */}
                    <div className="flex flex-col gap-1">
                        <h3
                            className="text-white text-[15px] sm:text-[16px] leading-normal tracking-[-0.48px] group-hover:text-[#FFD11A] transition-colors line-clamp-2"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                            {blog.title}
                        </h3>
                        <p
                            className="text-[#98989a] text-[13px] sm:text-[14px] tracking-[-0.42px]"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            {blog.category?.name}
                        </p>
                    </div>
                    <div className="id-excerpt text-gray-200 line-clamp-2">
                        {blog.excerpt}
                    </div>

                    {/* Stats & Button */}
                    <div className="md:flex items-center justify-between mt-auto hidden">
                        {/* Stats Pills */}
                        <div className="flex items-center gap-2">
                            {/* Views */}
                            <div className="bg-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-1 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full">
                                <Eye className="size-4 sm:size-5 text-[#666666]" strokeWidth={1.5} />
                                <span
                                    className="text-[#98989a] text-[12px] sm:text-[14px] tracking-[-0.42px]"
                                    style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
                                >
                                    {blog.view}
                                </span>
                            </div>
                        </div>

                        {showReadMore && (
                            <div className="bg-[#141414] border border-[#262626] rounded-lg px-3 py-2 sm:px-5 sm:py-3.5 flex items-center justify-center gap-1 hover:border-[#FFD11A]/40 hover:bg-[#1a1a1a] transition-all group/btn ml-auto">
                                <span
                                    className="hidden sm:inline text-[#98989a] text-[14px] tracking-[-0.42px] whitespace-nowrap"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                    {t('blogs.readNow', { defaultValue: 'Read Now' })}
                                </span>
                                <svg className="size-4 sm:size-5 shrink-0" fill="none" viewBox="0 0 20 20">
                                    <path clipRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L10.168 10.5 7.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 01-1.06-.02z" fill="#FFD11A" fillRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
}
