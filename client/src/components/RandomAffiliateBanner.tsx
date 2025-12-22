import { useMemo } from "react";

const AFFILIATE_CAMPAIGNS = [
  {
    image: "/banner/bingx/poster.png",
    link: "https://bingxzone.com/partner/goincome/"
  },
  {
    image: "/banner/binance/poster.png",
    link: "https://accounts.binance.com/register?ref=GOINCOME"
  },
  {
    image: "/banner/bybit/poster.png",
    link: "https://www.bybitglobal.com/invite?ref=M3EKRL8"
  },
  {
    image: "/banner/okx/poster.png",
    link: "https://okx.com/join/93232594"
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

