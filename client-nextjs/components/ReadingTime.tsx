import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Clock, BookOpen } from "lucide-react";

interface ReadingTimeProps {
    content: string;
    wordsPerMinute?: number;
    showWordCount?: boolean;
    className?: string;
}

/**
 * Reading Time Component
 * Displays estimated reading time and optional word count
 * Improves UX and helps users decide if they have time to read
 */
export function ReadingTime({
    content,
    wordsPerMinute = 200,
    showWordCount = false,
    className = ""
}: ReadingTimeProps) {
    const { t } = useTranslation();

    const { wordCount, readingTime } = useMemo(() => {
        if (!content) return { wordCount: 0, readingTime: 0 };

        // Strip HTML tags and count words
        const text = content.replace(/<[^>]*>/g, "").trim();
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const count = words.length;

        // Calculate reading time in minutes, minimum 1 minute
        const time = Math.max(1, Math.ceil(count / wordsPerMinute));

        return { wordCount: count, readingTime: time };
    }, [content, wordsPerMinute]);

    if (wordCount === 0) return null;

    return (
        <div className={`flex items-center gap-4 text-[#98989a] text-sm ${className}`}>
            <span className="inline-flex items-center gap-1.5" aria-label={`${readingTime} ${t("blog.reading.minutes", { defaultValue: "phút đọc" })}`}>
                <Clock className="size-4" aria-hidden="true" />
                <span>
                    {readingTime} {t("blog.reading.minutes", { defaultValue: "phút đọc" })}
                </span>
            </span>

            {showWordCount && (
                <span className="inline-flex items-center gap-1.5" aria-label={`${wordCount.toLocaleString()} ${t("blog.reading.words", { defaultValue: "từ" })}`}>
                    <BookOpen className="size-4" aria-hidden="true" />
                    <span>
                        {wordCount.toLocaleString()} {t("blog.reading.words", { defaultValue: "từ" })}
                    </span>
                </span>
            )}
        </div>
    );
}

export default ReadingTime;
