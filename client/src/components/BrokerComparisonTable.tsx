import { Star, CheckCircle2, ExternalLink } from "lucide-react";

interface Broker {
  name: string;
  logo: string;
  rating: number;
  license: string;
  minDeposit: string;
  spread: string;
  platform: string;
  bonus: string;
  affiliateLink: string;
  featured?: boolean;
}

export function BrokerComparisonTable() {
  const brokers: Broker[] = [
    {
      name: "ExampleBroker Pro",
      logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&h=100&fit=crop",
      rating: 4.8,
      license: "FCA, ASIC",
      minDeposit: "$100",
      spread: "0.1 pips",
      platform: "MT4, MT5, WebTrader",
      bonus: "Tặng $30 Bonus",
      affiliateLink: "#",
      featured: true
    },
    {
      name: "TradeMaster",
      logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop",
      rating: 4.5,
      license: "CySEC",
      minDeposit: "$200",
      spread: "0.2 pips",
      platform: "MT4, MT5",
      bonus: "Miễn phí khóa học",
      affiliateLink: "#"
    },
    {
      name: "GlobalFX",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
      rating: 4.3,
      license: "IFSC",
      minDeposit: "$50",
      spread: "0.3 pips",
      platform: "MT4, WebTrader",
      bonus: "Hoàn phí 20%",
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
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="text-left px-8 py-4 text-[#98989a] text-sm">Sàn Giao Dịch</th>
              <th className="text-left px-4 py-4 text-[#98989a] text-sm">Đánh Giá</th>
              <th className="text-left px-4 py-4 text-[#98989a] text-sm">Giấy Phép</th>
              <th className="text-left px-4 py-4 text-[#98989a] text-sm">Nạp Tối Thiểu</th>
              <th className="text-left px-4 py-4 text-[#98989a] text-sm">Spread</th>
              <th className="text-left px-4 py-4 text-[#98989a] text-sm">Nền Tảng</th>
              <th className="text-left px-4 py-4 text-[#98989a] text-sm">Ưu Đãi</th>
              <th className="text-center px-8 py-4 text-[#98989a] text-sm">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((broker, index) => (
              <tr 
                key={index}
                className={`border-b border-neutral-800 hover:bg-[#141414] transition-colors ${
                  broker.featured ? 'bg-[#1a1a1a]' : ''
                }`}
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={broker.logo} 
                      alt={broker.name}
                      className="size-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white">{broker.name}</span>
                        {broker.featured && (
                          <span className="bg-[#FFD11A] text-[#141414] px-2 py-0.5 rounded text-xs">
                            Đề Xuất
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-6">
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-[#FFD11A] text-[#FFD11A]" />
                    <span className="text-white">{broker.rating}</span>
                  </div>
                </td>
                <td className="px-4 py-6">
                  <div className="flex items-center gap-1.5 text-[#98989a] text-sm">
                    <CheckCircle2 className="size-4 text-green-500" />
                    {broker.license}
                  </div>
                </td>
                <td className="px-4 py-6 text-white text-sm">{broker.minDeposit}</td>
                <td className="px-4 py-6 text-white text-sm">{broker.spread}</td>
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
                    Mở Tài Khoản
                    <ExternalLink className="size-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
