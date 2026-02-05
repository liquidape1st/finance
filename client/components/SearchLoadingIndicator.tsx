import { Search, Loader2 } from "lucide-react";

type SearchLoadingIndicatorProps = {
    isLoading?: boolean;
    className?: string;
};

export function SearchLoadingIndicator({
    isLoading = false,
    className = ""
}: SearchLoadingIndicatorProps) {
    return (
        <div className={`relative ${className}`}>
            {isLoading ? (
                <Loader2
                    className="size-5 text-[#FFD11A] animate-spin"
                    aria-label="Searching..."
                />
            ) : (
                <Search
                    className="size-5 text-[#666666]"
                    aria-hidden="true"
                />
            )}
        </div>
    );
}
