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
      name: "ExampleBroker Pro",
      logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&h=100&fit=crop",
      license: "FCA, ASIC",
      platform: "MT4, MT5, WebTrader",
      bonus: "Tặng $30 Bonus",
      affiliateLink: "#"
    },
    {
      name: "TradeMaster",
      logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop",
      license: "CySEC",
      platform: "MT4, MT5",
      bonus: "Miễn phí khóa học",
      affiliateLink: "#"
    },
    {
      name: "GlobalFX",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
      license: "IFSC",
      platform: "MT4, WebTrader",
      bonus: "Hoàn phí 20%",
      affiliateLink: "#"
    }
  ];

  const cryptoBrokers: Broker[] = [
    {
      name: "Binance",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg",
      license: "Nhiều giấy phép khu vực (châu Âu, APAC...)",
      platform: "Web, iOS, Android, API",
      bonus: "Giảm phí khi dùng BNB",
      affiliateLink: "#"
    },
    {
      name: "Bybit",
      logo: "https://assets.bybit.com/bybit-logo.svg",
      license: "Đăng ký tại BVI, hoạt động đa khu vực",
      platform: "Web, iOS, Android, API",
      bonus: "Bonus nạp & hoàn phí theo volume",
      affiliateLink: "#"
    },
    {
      name: "OKX",
      logo: "https://static.okx.com/cdn/assets/imgs/221/ED5A5F5C2B4A3E3D.png",
      license: "Đăng ký tại Seychelles, chi nhánh toàn cầu",
      platform: "Web, iOS, Android, API",
      bonus: "Giảm phí cho holder OKB",
      affiliateLink: "#"
    },
    {
      name: "BingX",
      logo: "https://static.bingx.com/logo/bingx-logo.svg",
      license: "Đăng ký tại Lithuania & Canada (MSB)",
      platform: "Web, iOS, Android",
      bonus: "Hoàn phí cho trader copy & VIP",
      affiliateLink: "#"
    },
    {
      name: "ONUS",
      logo: "https://onus.vn/wp-content/uploads/2021/11/Logo-Onus.png",
      license: "Nền tảng đầu tư tài sản số (VN), vận hành theo mô hình doanh nghiệp fintech",
      platform: "iOS, Android, Web",
      bonus: "Staking & điểm thưởng ONUS",
      affiliateLink: "#"
    }
  ];

  return (
    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
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
                    <CheckCircle2 className="size-4 text-green-500" />
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
                      <CheckCircle2 className="size-4 text-green-500" />
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

      <div className="bg-[#141414] border-t border-neutral-800 px-8 py-4">
        <p className="text-[#666666] text-xs leading-relaxed">
          <strong className="text-[#98989a]">Lưu ý:</strong> Giao dịch tài chính có rủi ro cao. Bạn có thể mất toàn bộ số tiền đầu tư. 
          Các thông tin trên chỉ mang tính tham khảo, không phải lời khuyên đầu tư.
        </p>
      </div>
    </div>
  );
}
