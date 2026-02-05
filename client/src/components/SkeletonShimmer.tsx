type SkeletonShimmerProps = {
    className?: string;
    variant?: "card" | "text" | "avatar" | "image";
    lines?: number;
};

export function SkeletonShimmer({
    className = "",
    variant = "text",
    lines = 1
}: SkeletonShimmerProps) {
    const baseClass = "relative overflow-hidden bg-[#1f1f1f] rounded";

    const shimmerOverlay = (
        <div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite]"
            aria-hidden="true"
        />
    );

    if (variant === "card") {
        return (
            <div className={`flex flex-col h-full ${className}`}>
                {/* Image skeleton */}
                <div className={`${baseClass} h-53.75 rounded-[10px] mb-4`}>
                    {shimmerOverlay}
                </div>
                {/* Content skeleton */}
                <div className="flex flex-col gap-3 flex-1">
                    <div className="space-y-2">
                        <div className={`${baseClass} h-5 w-4/5`}>{shimmerOverlay}</div>
                        <div className={`${baseClass} h-4 w-2/5`}>{shimmerOverlay}</div>
                    </div>
                    <div className={`${baseClass} h-3 w-full`}>{shimmerOverlay}</div>
                    <div className={`${baseClass} h-3 w-3/4`}>{shimmerOverlay}</div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className={`${baseClass} h-8 w-24 rounded-full`}>{shimmerOverlay}</div>
                        <div className={`${baseClass} h-8 w-16 rounded-full`}>{shimmerOverlay}</div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === "avatar") {
        return (
            <div className={`${baseClass} size-10 rounded-full ${className}`}>
                {shimmerOverlay}
            </div>
        );
    }

    if (variant === "image") {
        return (
            <div className={`${baseClass} w-full h-48 sm:h-64 md:h-80 rounded-xl ${className}`}>
                {shimmerOverlay}
            </div>
        );
    }

    // Text variant
    return (
        <div className={`space-y-2 ${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className={`${baseClass} h-4 ${i === lines - 1 ? "w-2/3" : "w-full"}`}
                >
                    {shimmerOverlay}
                </div>
            ))}
        </div>
    );
}

// Blog card skeleton with shimmer effect
export function BlogCardSkeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`flex flex-col h-full ${className}`} aria-hidden="true">
            {/* Image */}
            <div className="relative h-53.75 rounded-[10px] overflow-hidden mb-4 bg-[#1f1f1f]">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite]" />
            </div>
            {/* Content */}
            <div className="flex flex-col gap-3 flex-1">
                <div className="space-y-2">
                    <div className="relative overflow-hidden h-5 bg-[#262626] rounded w-4/5">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite]" />
                    </div>
                    <div className="relative overflow-hidden h-4 bg-[#1f1f1f] rounded w-2/5">
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] delay-75" />
                    </div>
                </div>
                <div className="flex items-center gap-12.5 mt-2">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-full">
                            <div className="relative overflow-hidden size-5 rounded-full bg-[#262626]">
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] delay-100" />
                            </div>
                            <div className="relative overflow-hidden h-3 w-10 bg-[#262626] rounded">
                                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] delay-150" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#141414] border border-[#262626] rounded-lg px-5 py-3.5 flex items-center justify-center gap-1">
                        <div className="relative overflow-hidden h-3 w-20 bg-[#1f1f1f] rounded">
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite] delay-200" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
