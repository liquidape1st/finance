import { Gift, Clock, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface AffiliateBannerProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bonusAmount?: string;
  hasCountdown?: boolean;
  variant?: 'gradient' | 'dark';
  className?: string;
  compact?: boolean;
  hideBackgroundPattern?: boolean;
}

export function AffiliateBanner({
  title,
  description,
  ctaText,
  ctaLink,
  bonusAmount,
  hasCountdown = false,
  variant = 'gradient',
  className = '',
  compact = false,
  hideBackgroundPattern = false,
}: AffiliateBannerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 45
  });

  useEffect(() => {
    if (!hasCountdown) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasCountdown]);

  const gradientClass = variant === 'gradient'
    ? 'bg-gradient-to-br from-[#FFD11A] to-[#FFA500]'
    : 'bg-[#1a1a1a] border border-neutral-800';

  const textColor = variant === 'gradient' ? 'text-[#141414]' : 'text-white';
  const subTextColor = variant === 'gradient' ? 'text-[#141414]/80' : 'text-[#98989a]';
  const buttonClass = variant === 'gradient'
    ? 'bg-[#141414] text-white hover:bg-[#262626]'
    : 'bg-[#FFD11A] text-[#141414] hover:bg-[#ffdb4d]';

  const paddingClass = compact ? 'p-4 sm:p-5' : 'p-6 sm:p-8';
  const titleClass = compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl';
  const descClass = compact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base';
  const buttonPadding = compact ? 'px-5 sm:px-6 py-2.5 sm:py-3' : 'px-6 sm:px-8 py-3 sm:py-3.5';

  return (
    <div className={`${gradientClass} rounded-xl ${paddingClass} relative overflow-hidden ${className}`}>
      {!hideBackgroundPattern && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
      )}

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6 sm:gap-8">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              {bonusAmount && (
                <div className={`${variant === 'gradient' ? 'bg-[#141414]' : 'bg-[#FFD11A]'} ${variant === 'gradient' ? 'text-[#FFD11A]' : 'text-[#141414]'} px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-2`}>
                  <Gift className="size-4 sm:size-5" />
                  <span className="text-xs sm:text-sm">{bonusAmount}</span>
                </div>
              )}
              {hasCountdown && (
                <div className={`${variant === 'gradient' ? 'bg-[#141414]/20' : 'bg-[#262626]'} px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center gap-2`}>
                  <Clock className={`size-4 ${variant === 'gradient' ? 'text-[#141414]' : 'text-[#FFD11A]'}`} />
                  <span className={`${variant === 'gradient' ? 'text-[#141414]' : 'text-[#FFD11A]'} text-xs sm:text-sm`}>
                    {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>

            <h3 className={`${titleClass} ${textColor} mb-2 sm:mb-3`} style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {title}
            </h3>
            <p className={`${subTextColor} ${descClass} leading-relaxed max-w-2xl`}>
              {description}
            </p>
          </div>

          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonClass} ${buttonPadding} rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 text-sm self-start lg:self-auto`}
          >
            {ctaText}
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}