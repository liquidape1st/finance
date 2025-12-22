import { CheckCircle2, ExternalLink } from "lucide-react";

interface Broker {
  name: string;
  logo: string;
  license: string;
  platform: string;
  bonus: string;
  affiliateLink: string;
}

export function BrokerComparisonTable() {
  const brokers: Broker[] = [
    {
      name: "Exness",
      logo: "https://cdn.brandfetch.io/id1_ft3Zgz/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1714117376751",
      license: "FCA 730729, CySEC 178/12",
      platform: "MT4, MT5, WebTerminal, Mobile",
      bonus: "Phí thấp, rút nhanh",
      affiliateLink: "https://one.exnessonelink.com/a/48gns7fdsp"
    },
    {
      name: "XM",
      logo: "https://th.bing.com/th/id/OIP.0fgRF8nl-eaB6wgDnxLQpgHaHa?w=162&h=180&c=7&r=0&o=7&cb=ucfimg2&pid=1.7&rm=3&ucfimg=1",
      license: "CySEC 120/10, ASIC 443670, IFSC 000261/106",
      platform: "MT4, MT5, XM WebTrader, Mobile",
      bonus: "Bonus/khuyến mãi định kỳ",
      affiliateLink: "https://www.xmvnmarket.com/referral?token=dDx2S-IS37EF11VidOXGzQ"
    },
  ];

  const cryptoBrokers: Broker[] = [
    {
      name: "Binance",
      logo: "https://images.seeklogo.com/logo-png/44/2/binance-smart-chain-bsc-logo-png_seeklogo-446621.png",
      license: "Nhiều giấy phép khu vực (châu Âu, APAC...)",
      platform: "Web, iOS, Android, API",
      bonus: "Giảm phí khi dùng BNB",
      affiliateLink: "https://accounts.binance.com/register?ref=GOINCOME"
    },
    {
      name: "Bybit",
      logo: "https://images.seeklogo.com/logo-png/49/1/bybit-logo-png_seeklogo-490318.png",
      license: "Đăng ký tại BVI, hoạt động đa khu vực",
      platform: "Web, iOS, Android, API",
      bonus: "Bonus nạp & hoàn phí theo volume",
      affiliateLink: "https://www.bybitglobal.com/invite?ref=M3EKRL8"
    },
    {
      name: "OKX",
      logo: "https://images.seeklogo.com/logo-png/45/1/okx-logo-png_seeklogo-459094.png",
      license: "Đăng ký tại Seychelles, chi nhánh toàn cầu",
      platform: "Web, iOS, Android, API",
      bonus: "Giảm phí cho holder OKB",
      affiliateLink: "https://okx.com/join/93232594"
    },
    {
      name: "BingX",
      logo: "https://images.seeklogo.com/logo-png/51/1/bingx-logo-png_seeklogo-513450.png",
      license: "Đăng ký tại Lithuania & Canada (MSB)",
      platform: "Web, iOS, Android",
      bonus: "Hoàn phí cho trader copy & VIP",
      affiliateLink: "https://bingxzone.com/partner/goincome/"
    },
    {
      name: "ONUS",
      logo: "https://cdn.brandfetch.io/idIo7ZtNyM/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1762459907240",
      license: "Nền tảng đầu tư tài sản số (VN), vận hành theo mô hình doanh nghiệp fintech",
      platform: "iOS, Android, Web",
      bonus: "Staking & điểm thưởng ONUS",
      affiliateLink: "https://goonus.io/signup/6277729719995316126?utm_campaign=invite"
    }
  ];

  return (
    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
      {/* Desktop / Tablet tables */}
      <div className="hidden sm:block">
        <div className="bg-[#141414] border-b border-neutral-800 px-8 py-6">
          <h3 className="text-white text-2xl mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
            So Sánh Sàn Giao Dịch Uy Tín
          </h3>
          <p className="text-[#98989a] text-sm">
            Các sàn được đánh giá dựa trên giấy phép, phí giao dịch và trải nghiệm người dùng
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="w-1/5 text-left px-8 py-4 text-[#98989a] text-sm">Sàn Giao Dịch</th>
                <th className="w-1/5 text-left px-4 py-4 text-[#98989a] text-sm">Giấy Phép</th>
                <th className="w-1/5 text-left px-4 py-4 text-[#98989a] text-sm">Nền Tảng</th>
                <th className="w-1/5 text-left px-4 py-4 text-[#98989a] text-sm">Ưu Đãi</th>
                <th className="w-1/5 text-center px-8 py-4 text-[#98989a] text-sm">Hành Động</th>
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
                  <td className="px-4 py-6">
                    <div className="flex items-center gap-1.5 text-[#98989a] text-sm">
                      <CheckCircle2 className="size-4 text-green-500 min-w-[20px]" />
                      {broker.license}
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
                      Đăng Ký Ngay
                      <ExternalLink className="size-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Crypto Brokers Table */}
        <div className="border-t border-neutral-800">
          <div className="bg-[#141414] border-b border-neutral-800 px-8 py-6">
            <h3 className="text-white text-2xl mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              So Sánh Sàn Crypto
            </h3>
            <p className="text-[#98989a] text-sm">
              Các sàn giao dịch crypto phổ biến, so sánh theo phí, giấy phép và nền tảng hỗ trợ
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="w-1/5 text-left px-8 py-4 text-[#98989a] text-sm">Sàn Crypto</th>
                  <th className="w-1/5 text-left px-4 py-4 text-[#98989a] text-sm">Giấy Phép / Khu Vực</th>
                  <th className="w-1/5 text-left px-4 py-4 text-[#98989a] text-sm">Nền Tảng</th>
                  <th className="w-1/5 text-left px-4 py-4 text-[#98989a] text-sm">Ưu Đãi</th>
                  <th className="w-1/5 text-center px-8 py-4 text-[#98989a] text-sm">Hành Động</th>
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
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-1.5 text-[#98989a] text-sm">
                        <CheckCircle2 className="size-4 text-green-500 min-w-[20px]" />
                        {broker.license}
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
                        Đăng Ký Ngay
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
      <div className="block sm:hidden">
        <div className="bg-[#141414] border-b border-neutral-800 px-5 py-5">
          <h3 className="text-white text-xl mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
            So Sánh Sàn Giao Dịch Uy Tín
          </h3>
          <p className="text-[#98989a] text-xs">
            Các sàn được đánh giá dựa trên giấy phép, phí giao dịch và trải nghiệm người dùng
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
                  <span className="text-[#98989a] text-xs flex items-center gap-1">
                    <CheckCircle2 className="size-4 text-green-500" />
                    {broker.license}
                  </span>
                </div>
              </div>
              <div className="text-[#98989a] text-sm">
                <div className="mb-1"><strong className="text-white">Nền tảng:</strong> {broker.platform}</div>
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

        <div className="bg-[#141414] border-y border-neutral-800 px-5 py-5">
          <h3 className="text-white text-xl mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
            So Sánh Sàn Crypto
          </h3>
          <p className="text-[#98989a] text-xs">
            Các sàn giao dịch crypto phổ biến, so sánh theo phí, giấy phép và nền tảng hỗ trợ
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
                  <span className="text-[#98989a] text-xs flex items-center gap-1">
                    <CheckCircle2 className="size-4 text-green-500" />
                    {broker.license}
                  </span>
                </div>
              </div>
              <div className="text-[#98989a] text-sm">
                <div className="mb-1"><strong className="text-white">Nền tảng:</strong> {broker.platform}</div>
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

      <div className="bg-[#141414] border-t border-neutral-800 px-8 py-4">
        <p className="text-[#666666] text-xs leading-relaxed">
          <strong className="text-[#98989a]">Lưu ý:</strong> Giao dịch tài chính có rủi ro cao. Bạn có thể mất toàn bộ số tiền đầu tư. 
          Các thông tin trên chỉ mang tính tham khảo, không phải lời khuyên đầu tư.
        </p>
      </div>
    </div>
  );
}
