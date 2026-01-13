import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Broker {
  name: string;
  logo: string;
  license: string;
  platform: string;
  bonus: string;
  affiliateLink: string;
}

export function BrokerComparisonTable() {
  const { t } = useTranslation();
  
  const brokers: Broker[] = [
    {
      name: "Exness",
      logo: "https://cdn.brandfetch.io/id1_ft3Zgz/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1714117376751",
      license: "FCA 730729, CySEC 178/12",
      platform: t('resources.brokers.exness.platform'),
      bonus: t('resources.brokers.exness.bonus'),
      affiliateLink: "https://one.exnessonelink.com/a/48gns7fdsp"
    },
    {
      name: "XM",
      logo: "https://th.bing.com/th/id/OIP.0fgRF8nl-eaB6wgDnxLQpgHaHa?w=162&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1",
      license: "CySEC 120/10, ASIC 443670, IFSC 000261/106",
      platform: t('resources.brokers.xm.platform'),
      bonus: t('resources.brokers.xm.bonus'),
      affiliateLink: "https://www.xmvnmarket.com/referral?token=dDx2S-IS37EF11VidOXGzQ"
    },
  ];

  const cryptoBrokers: Broker[] = [
    {
      name: "Binance",
      logo: "https://images.seeklogo.com/logo-png/44/2/binance-smart-chain-bsc-logo-png_seeklogo-446621.png",
      license: "Nhiều giấy phép khu vực (châu Âu, APAC...)",
      platform: t('resources.brokers.binance.platform'),
      bonus: t('resources.brokers.binance.bonus'),
      affiliateLink: "https://accounts.binance.com/register?ref=GOINCOME"
    },
    {
      name: "Bybit",
      logo: "https://images.seeklogo.com/logo-png/49/1/bybit-logo-png_seeklogo-490318.png",
      license: "Đăng ký tại BVI, hoạt động đa khu vực",
      platform: t('resources.brokers.bybit.platform'),
      bonus: t('resources.brokers.bybit.bonus'),
      affiliateLink: "https://www.bybitglobal.com/invite?ref=M3EKRL8"
    },
    {
      name: "OKX",
      logo: "https://images.seeklogo.com/logo-png/45/1/okx-logo-png_seeklogo-459094.png",
      license: "Đăng ký tại Seychelles, chi nhánh toàn cầu",
      platform: t('resources.brokers.okx.platform'),
      bonus: t('resources.brokers.okx.bonus'),
      affiliateLink: "https://okx.com/join/93232594"
    },
    {
      name: "BingX",
      logo: "https://images.seeklogo.com/logo-png/51/1/bingx-logo-png_seeklogo-513450.png",
      license: "Đăng ký tại Lithuania & Canada (MSB)",
      platform: t('resources.brokers.bingx.platform'),
      bonus: t('resources.brokers.bingx.bonus'),
      affiliateLink: "https://bingxzone.com/partner/goincome/"
    },
    {
      name: "ONUS",
      logo: "https://cdn.brandfetch.io/idIo7ZtNyM/w/400/h/400/idHTT1eRxG.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
      license: "Nền tảng đầu tư tài sản số (VN), vận hành theo mô hình doanh nghiệp fintech",
      platform: t('resources.brokers.onus.platform'),
      bonus: t('resources.brokers.onus.bonus'),
      affiliateLink: "https://goonus.io/signup/6277729719995316126?utm_campaign=invite"
    },
    {
      name: "MEXC",
      logo: "https://cdn.brandfetch.io/idCHi7bZkV/w/200/h/200/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
      license: "Đăng ký tại Seychelles, hoạt động toàn cầu",
      platform: t('resources.brokers.mexc.platform'),
      bonus: t('resources.brokers.mexc.bonus'),
      affiliateLink: "https://www.mexc.com/vi-VN/acquisition/custom-sign-up?shareCode=mexc-GOINCOME"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Sàn Ngoại Hối & CFD Section */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
        {/* Desktop / Tablet tables */}
        <div className="hidden sm:block">
          <div className="bg-linear-to-r border-b px-8 py-6">
            <h3 className="text-white text-2xl mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              {t('resources.forexSection.title')}
            </h3>
            <p className="text-[#98989a] text-sm">
              {t('resources.forexSection.description')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="w-[17.5%] text-left px-8 py-4 text-[#98989a] text-sm">{t('resources.table.brokerName')}</th>
                  <th className="w-[27.5%] text-left px-4 py-4 text-[#98989a] text-sm">{t('resources.table.platform')}</th>
                  <th className="w-[37.5%] text-left px-4 py-4 text-[#98989a] text-sm">{t('resources.table.bonus')}</th>
                  <th className="w-[17.5%] text-center px-8 py-4 text-[#98989a] text-sm">{t('resources.table.action')}</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map((broker, index) => (
                  <tr
                    key={index}
                    className={`border-b border-neutral-800 hover:bg-[#141414] transition-colors`}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={broker.logo}
                          alt={broker.name}
                          className="size-12 rounded-lg object-cover"
                        />
                        <span className="text-white">{broker.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-6 text-[#98989a] text-sm">{broker.platform}</td>
                    <td className="px-4 py-6">
                      <span className="bg-[#262626] text-[#FFD11A] px-3 py-1 rounded text-xs">
                        {broker.bonus}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <a
                        href={broker.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#FFD11A] text-[#141414] px-6 py-2.5 rounded-lg hover:bg-[#ffdb4d] transition-colors inline-flex items-center gap-2 text-sm"
                      >
                        {t('resources.table.registerNow')}
                        <ExternalLink className="size-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sàn Crypto Section */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
        {/* Desktop / Tablet tables */}
        <div className="hidden sm:block">
          <div className="bg-linear-to-r border-b  px-8 py-6">
            <h3 className="text-white text-2xl mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              {t('resources.cryptoSection.title')}
            </h3>
            <p className="text-[#98989a] text-sm">
              {t('resources.cryptoSection.description')}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="w-[17.5%] text-left px-8 py-4 text-[#98989a] text-sm">{t('resources.table.brokerName')}</th>
                  <th className="w-[27.5%] text-left px-4 py-4 text-[#98989a] text-sm">{t('resources.table.platform')}</th>
                  <th className="w-[37.5%] text-left px-4 py-4 text-[#98989a] text-sm">{t('resources.table.bonus')}</th>
                  <th className="w-[17.5%] text-center px-8 py-4 text-[#98989a] text-sm">{t('resources.table.action')}</th>
                </tr>
              </thead>
              <tbody>
                {cryptoBrokers.map((broker, index) => (
                  <tr
                    key={index}
                    className={`border-b border-neutral-800 hover:bg-[#141414] transition-colors`}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={broker.logo}
                          alt={broker.name}
                          className="size-12 rounded-lg object-cover"
                        />
                        <span className="text-white">{broker.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-6 text-[#98989a] text-sm">{broker.platform}</td>
                    <td className="px-4 py-6">
                      <span className="bg-[#262626] text-[#FFD11A] px-3 py-1 rounded text-xs">
                        {broker.bonus}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <a
                        href={broker.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#FFD11A] text-[#141414] px-6 py-2.5 rounded-lg hover:bg-[#ffdb4d] transition-colors inline-flex items-center gap-2 text-sm"
                      >
                        {t('resources.table.registerNow')}
                        <ExternalLink className="size-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="block sm:hidden space-y-6">
        {/* Sàn Ngoại Hối & CFD Mobile */}
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
          <div className="bg-linear-to-r border-b border-blue-800/30 px-5 py-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-600 text-white px-2.5 py-1 rounded text-xs font-medium">
                {t('resources.forexSection.badge')}
              </span>
            </div>
            <h3 className="text-white text-xl mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              {t('resources.forexSection.title')}
            </h3>
            <p className="text-[#98989a] text-xs">
              {t('resources.forexSection.descriptionMobile')}
            </p>
          </div>

          <div className="space-y-4 px-4 py-5">
            {brokers.map((broker, index) => (
              <div key={index} className="bg-[#141414] border border-neutral-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={broker.logo}
                    alt={broker.name}
                    className="size-12 rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{broker.name}</span>
                  </div>
                </div>
                <div className="text-[#98989a] text-sm">
                  <div className="mb-1"><strong className="text-white">{t('resources.table.platformLabel')}</strong> {broker.platform}</div>
                  <div className="mb-2">
                    <span className="bg-[#262626] text-[#FFD11A] px-2.5 py-1 rounded text-xs">
                      {broker.bonus}
                    </span>
                  </div>
                </div>
                <a
                  href={broker.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-[#FFD11A] text-[#141414] px-4 py-2.5 rounded-lg hover:bg-[#ffdb4d] transition-colors inline-flex items-center justify-center gap-2 text-sm"
                >
                  Đăng Ký Ngay
                  <ExternalLink className="size-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Sàn Crypto Mobile */}
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
          <div className="bg-linear-to-r border-b border-purple-800/30 px-5 py-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-600 text-white px-2.5 py-1 rounded text-xs font-medium">
                {t('resources.cryptoSection.badge')}
              </span>
            </div>
            <h3 className="text-white text-xl mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              {t('resources.cryptoSection.title')}
            </h3>
            <p className="text-[#98989a] text-xs">
              {t('resources.cryptoSection.descriptionMobile')}
            </p>
          </div>

          <div className="space-y-4 px-4 py-5">
            {cryptoBrokers.map((broker, index) => (
              <div key={index} className="bg-[#141414] border border-neutral-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={broker.logo}
                    alt={broker.name}
                    className="size-12 rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{broker.name}</span>
                  </div>
                </div>
                <div className="text-[#98989a] text-sm">
                  <div className="mb-1"><strong className="text-white">{t('resources.table.platformLabel')}</strong> {broker.platform}</div>
                  <div className="mb-2">
                    <span className="bg-[#262626] text-[#FFD11A] px-2.5 py-1 rounded text-xs">
                      {broker.bonus}
                    </span>
                  </div>
                </div>
                <a
                  href={broker.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-[#FFD11A] text-[#141414] px-4 py-2.5 rounded-lg hover:bg-[#ffdb4d] transition-colors inline-flex items-center justify-center gap-2 text-sm"
                >
                  Đăng Ký Ngay
                  <ExternalLink className="size-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Warning */}
      <div className="bg-red-900/20 border border-neutral-800 rounded-xl px-6 sm:px-8 py-4">
        <p className="text-red-200 text-xs leading-relaxed">
          <strong className="text-red-200">{t('resources.riskWarning.label')}</strong> {t('resources.riskWarning.text')}
        </p>
      </div>
    </div>
  );
}
