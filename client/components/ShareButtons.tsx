import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type ShareButtonsProps = {
    url?: string;
    title?: string;
    className?: string;
    variant?: "horizontal" | "vertical";
};

export function ShareButtons({
    url = typeof window !== "undefined" ? window.location.href : "",
    title = "",
    className = "",
    variant = "horizontal"
}: ShareButtonsProps) {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        {
            name: "Facebook",
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: "hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:border-[#1877F2]/40",
        },
        {
            name: "Twitter",
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            color: "hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/40",
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
            color: "hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:border-[#0A66C2]/40",
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const containerClass = variant === "vertical"
        ? "flex flex-col gap-2"
        : "flex items-center gap-2 flex-wrap";

    return (
        <div className={`${containerClass} ${className}`}>
            <span className="text-[#98989a] text-sm mr-2">
                {t("blog.share", { defaultValue: "Chia sẻ:" })}
            </span>

            {shareLinks.map((social) => (
                <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
            inline-flex items-center justify-center
            size-10 rounded-lg
            bg-[#1a1a1a] border border-[#262626]
            text-[#98989a]
            transition-all duration-300 ease-out
            hover:scale-110
            ${social.color}
          `}
                    aria-label={`Share on ${social.name}`}
                >
                    <social.icon className="size-4" />
                </a>
            ))}

            <button
                onClick={copyToClipboard}
                className={`
          inline-flex items-center justify-center
          size-10 rounded-lg
          bg-[#1a1a1a] border border-[#262626]
          text-[#98989a]
          transition-all duration-300 ease-out
          hover:scale-110
          ${copied
                        ? "bg-green-500/20 text-green-400 border-green-400/40"
                        : "hover:bg-[#FFD11A]/20 hover:text-[#FFD11A] hover:border-[#FFD11A]/40"
                    }
        `}
                aria-label="Copy link to clipboard"
            >
                {copied ? (
                    <Check className="size-4 animate-in zoom-in duration-200" />
                ) : (
                    <Link2 className="size-4" />
                )}
            </button>

            {copied && (
                <span className="text-green-400 text-xs animate-in fade-in slide-in-from-left-2 duration-200">
                    {t("blog.copied", { defaultValue: "Đã sao chép!" })}
                </span>
            )}
        </div>
    );
}
