import { useMemo } from "react";

const AFFILIATE_CAMPAIGNS = [
  {
    image: "/banner/bingx/poster.png",
    link: "https://bingxzone.com/partner/goincome/"
  },
  {
    image: "/banner/binance/poster.png",
    link: "https://accounts.binance.com/register?ref=GOINCOME"
  }
];

export function RandomAffiliateBanner() {
  const campaign = useMemo(
    () => AFFILIATE_CAMPAIGNS[Math.floor(Math.random() * AFFILIATE_CAMPAIGNS.length)],
    []
  );

  return (
    <a href={campaign.link} target="_blank">
      <img
        className="rounded-md"
        src={campaign.image}
      />
    </a>
  );
}

