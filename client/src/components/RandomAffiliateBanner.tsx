import { useMemo } from "react";
import { AffiliateBanner } from "./AffiliateBanner";

const AFFILIATE_CAMPAIGNS = [
  {
    title: "Binance: Giảm phí giao dịch đến 20% + hoàn rebate",
    description:
      "Mở tài khoản Binance qua link đối tác để được giảm phí maker/taker và tham gia hoàn tiền hàng tuần.",
    ctaText: "Mở tài khoản Binance",
    ctaLink: "https://accounts.binance.com/register?ref=YOUR_CODE",
    bonusAmount: "Rebate phí & voucher spot/futures",
    hasCountdown: true,
    variant: "dark" as const,
    compact: true,
    hideBackgroundPattern: true,
  },
  {
    title: "OKX: Hoàn phí 25% + thưởng nạp đầu",
    description:
      "Đăng ký OKX để nhận giảm phí giao dịch, ưu đãi nạp đầu và quyền truy cập tính năng copy trading.",
    ctaText: "Nhận ưu đãi OKX",
    ctaLink: "https://www.okx.com/join/YOUR_CODE",
    bonusAmount: "Giảm phí 25% + bonus nạp",
    hasCountdown: true,
    variant: "dark" as const,
    compact: true,
    hideBackgroundPattern: true,
  },
  {
    title: "BingX: Giảm 40% phí + ưu đãi copy trade",
    description:
      "Mở tài khoản BingX qua link đối tác để nhận giảm phí giao dịch và ưu đãi cho giao dịch copy trade.",
    ctaText: "Đăng ký BingX",
    ctaLink: "https://bingx.com/vi-vi/partner/YOUR_CODE",
    bonusAmount: "Voucher giao dịch & hoàn phí",
    hasCountdown: false,
    variant: "dark" as const,
    compact: true,
    hideBackgroundPattern: true,
  },
];

interface RandomAffiliateBannerProps {
  className?: string;
}

export function RandomAffiliateBanner({ className }: RandomAffiliateBannerProps) {
  const campaign = useMemo(
    () => AFFILIATE_CAMPAIGNS[Math.floor(Math.random() * AFFILIATE_CAMPAIGNS.length)],
    []
  );

  return (
    <AffiliateBanner
      title={campaign.title}
      description={campaign.description}
      ctaText={campaign.ctaText}
      ctaLink={campaign.ctaLink}
      bonusAmount={campaign.bonusAmount}
      hasCountdown={campaign.hasCountdown}
      variant={campaign.variant}
      compact={campaign.compact}
      hideBackgroundPattern={campaign.hideBackgroundPattern}
      className={className}
    />
  );
}

