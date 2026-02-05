import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

type BackToTopProps = {
    threshold?: number;
    className?: string;
};

export function BackToTop({ threshold = 400, className = "" }: BackToTopProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [threshold]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
        fixed bottom-6 right-6 z-50
        size-12 rounded-full
        bg-[#FFD11A] hover:bg-[#ffdb4d]
        shadow-lg shadow-[#FFD11A]/30
        flex items-center justify-center
        transition-all duration-300 ease-out
        ${isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-90 pointer-events-none"
                }
        ${isHovered ? "shadow-xl shadow-[#FFD11A]/40 scale-110" : ""}
        ${className}
      `}
            aria-label="Scroll to top"
        >
            <ArrowUp
                className={`size-5 text-[#141414] transition-transform duration-300 ${isHovered ? "-translate-y-0.5" : ""}`}
                strokeWidth={2.5}
            />

            {/* Pulse ring animation */}
            <span
                className={`
          absolute inset-0 rounded-full bg-[#FFD11A]
          transition-all duration-500
          ${isHovered ? "animate-ping opacity-30" : "opacity-0"}
        `}
            />
        </button>
    );
}
