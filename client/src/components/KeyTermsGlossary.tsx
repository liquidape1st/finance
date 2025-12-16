import { HelpCircle } from "lucide-react";
import { useState } from "react";

interface KeyTermsGlossaryProps {
  term: string;
  children: React.ReactNode;
}

const glossary: Record<string, string> = {
  "Leverage": "Đòn bẩy - Khả năng giao dịch với số tiền lớn hơn vốn thực tế. VD: Đòn bẩy 1:100 nghĩa là với $100 bạn có thể giao dịch $10,000.",
  "Margin": "Ký quỹ - Số tiền cần thiết để mở và duy trì một vị thế giao dịch.",
  "Stop Loss": "Cắt lỗ - Lệnh tự động đóng vị thế khi giá đạt mức thua lỗ đã định trước để bảo vệ vốn.",
  "Take Profit": "Chốt lời - Lệnh tự động đóng vị thế khi giá đạt mức lợi nhuận mong muốn.",
  "PIP": "Đơn vị nhỏ nhất để đo lường biến động giá trong giao dịch Forex. VD: EUR/USD từ 1.2000 lên 1.2001 = tăng 1 pip.",
  "Lot": "Đơn vị khối lượng giao dịch. 1 Lot chuẩn = 100,000 đơn vị tiền tệ.",
  "Spread": "Chênh lệch giữa giá mua và giá bán. Đây là chi phí giao dịch bạn phải trả cho sàn.",
  "Volatility": "Độ biến động - Mức độ thay đổi giá trong một khoảng thời gian. Biến động cao = rủi ro và cơ hội lớn.",
  "Liquidity": "Tính thanh khoản - Khả năng mua/bán tài sản nhanh chóng mà không ảnh hưởng đến giá.",
  "CFD": "Contract For Difference - Hợp đồng chênh lệch. Bạn giao dịch chênh lệch giá, không sở hữu tài sản thực.",
  "Bullish": "Xu hướng tăng - Kỳ vọng giá sẽ tăng.",
  "Bearish": "Xu hướng giảm - Kỳ vọng giá sẽ giảm.",
  "Support": "Hỗ trợ - Mức giá mà tại đó áp lực mua thường mạnh hơn, ngăn giá giảm thêm.",
  "Resistance": "Kháng cự - Mức giá mà tại đó áp lực bán thường mạnh hơn, ngăn giá tăng thêm.",
  "NFP": "Non-Farm Payrolls - Báo cáo việc làm phi nông nghiệp của Mỹ, có ảnh hưởng lớn đến thị trường.",
  "CPI": "Consumer Price Index - Chỉ số giá tiêu dùng, đo lường lạm phát.",
};

export function KeyTermsGlossary({ term, children }: KeyTermsGlossaryProps) {
  const [isHovered, setIsHovered] = useState(false);
  const definition = glossary[term];

  if (!definition) {
    return <>{children}</>;
  }

  return (
    <span className="relative inline-block">
      <span
        className="border-b border-dashed border-[#FFD11A] cursor-help text-[#FFD11A]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </span>
      
      {isHovered && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 z-50 block animate-in fade-in slide-in-from-bottom-1 duration-200">
          <span className="bg-[#141414] border border-[#FFD11A]/30 rounded-lg p-4 shadow-xl block">
            <span className="flex items-start gap-2 mb-2">
              <HelpCircle className="size-4 text-[#FFD11A] shrink-0 mt-0.5" />
              <span className="text-[#FFD11A] text-sm block" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                {term}
              </span>
            </span>
            <span className="text-[#98989a] text-sm leading-relaxed block">
              {definition}
            </span>
            {/* Arrow */}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#141414] border-r border-b border-[#FFD11A]/30 rotate-45 block"></span>
          </span>
        </span>
      )}
    </span>
  );
}

// Standalone Glossary Component for dedicated page
export function GlossaryList() {

  const categories = {
    "Cơ Bản": ["PIP", "Lot", "Spread", "Leverage", "Margin"],
    "Quản Lý Rủi Ro": ["Stop Loss", "Take Profit", "Volatility"],
    "Phân Tích Thị Trường": ["Support", "Resistance", "Bullish", "Bearish"],
    "Chỉ Báo Kinh Tế": ["NFP", "CPI"],
    "Loại Giao Dịch": ["CFD", "Liquidity"]
  };

  return (
    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-8">
      <h2 className="text-white text-2xl mb-6" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
        Từ Điển Thuật Ngữ Giao Dịch
      </h2>

      {Object.entries(categories).map(([category, termsList]) => (
        <div key={category} className="mb-8 last:mb-0">
          <h3 className="text-[#FFD11A] text-lg mb-4" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
            {category}
          </h3>
          <div className="space-y-4">
            {termsList.map(term => (
              <div 
                key={term}
                className="bg-[#141414] border border-neutral-800 rounded-lg p-5 hover:border-[#FFD11A]/30 transition-colors"
              >
                <h4 className="text-white text-base mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                  {term}
                </h4>
                <p className="text-[#98989a] text-sm leading-relaxed">
                  {glossary[term]}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}