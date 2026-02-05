import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type PageTransitionProps = {
    children: ReactNode;
    className?: string;
};

export function PageTransition({ children, className = "" }: PageTransitionProps) {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);

    useEffect(() => {
        // Start with invisible state
        setIsVisible(false);

        // Small delay to trigger animation
        const timer = setTimeout(() => {
            setDisplayChildren(children);
            setIsVisible(true);
        }, 50);

        return () => clearTimeout(timer);
    }, [location.pathname, children]);

    return (
        <div
            className={`
        transition-all duration-300 ease-out
        ${isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }
        ${className}
      `}
        >
            {displayChildren}
        </div>
    );
}

// Fade in animation wrapper
export function FadeIn({
    children,
    delay = 0,
    duration = 300,
    className = ""
}: {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div
            className={`
        transition-all ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        ${className}
      `}
            style={{ transitionDuration: `${duration}ms` }}
        >
            {children}
        </div>
    );
}

// Stagger children animation
export function StaggerChildren({
    children,
    staggerDelay = 100,
    className = ""
}: {
    children: ReactNode[];
    staggerDelay?: number;
    className?: string;
}) {
    return (
        <div className={className}>
            {children.map((child, index) => (
                <FadeIn key={index} delay={index * staggerDelay}>
                    {child}
                </FadeIn>
            ))}
        </div>
    );
}
