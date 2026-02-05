import { useEffect, useState } from "react";

type ReadingProgressBarProps = {
    className?: string;
};

export function ReadingProgressBar({ className = "" }: ReadingProgressBarProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(Math.min(100, Math.max(0, scrollProgress)));
        };

        window.addEventListener("scroll", updateProgress, { passive: true });
        updateProgress(); // Initial calculation

        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 right-0 h-1 bg-[#1a1a1a] z-[100] ${className}`}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
        >
            <div
                className="h-full bg-gradient-to-r from-[#FFD11A] via-[#ffdb4d] to-[#FFD11A] transition-all duration-150 ease-out"
                style={{
                    width: `${progress}%`,
                    boxShadow: progress > 0 ? "0 0 10px rgba(255, 209, 26, 0.5)" : "none"
                }}
            />
        </div>
    );
}
