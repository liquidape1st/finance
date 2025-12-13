import { AlertTriangle } from "lucide-react";

interface RiskWarningDisclosureProps {
  variant?: 'full' | 'compact';
}

export function RiskWarningDisclosure({ variant = 'full' }: RiskWarningDisclosureProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
        <AlertTriangle className="size-4 sm:size-5 text-red-400 flex-shrink-0 mt-0.5" />
        <p className="text-red-300 text-xs sm:text-sm leading-relaxed">
          <strong>Cảnh báo rủi ro:</strong> Giao dịch tài chính có rủi ro cao. Bạn có thể mất toàn bộ số vốn đầu tư.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-6 sm:p-8">
      <div className="flex items-start gap-3 sm:gap-4 mb-5 sm:mb-6">
        <div className="bg-red-500 p-2 sm:p-3 rounded-lg">
          <AlertTriangle className="size-5 sm:size-6 text-white" />
        </div>
        <div>
          <h3 className="text-red-300 text-lg sm:text-xl mb-1 sm:mb-2" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
            Cảnh Báo Rủi Ro Quan Trọng
          </h3>
          <p className="text-red-200 text-xs sm:text-sm">
            Vui lòng đọc kỹ trước khi tham gia giao dịch
          </p>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4 text-red-200 text-xs sm:text-sm leading-relaxed">
        <p>
          <strong>Giao dịch các sản phẩm tài chính có đòn bẩy (Forex, CFD, Crypto) mang lại rủi ro cao.</strong> 
          Bạn có thể mất toàn bộ số vốn đầu tư ban đầu và thậm chí mất nhiều hơn số tiền bạn đã nạp vào tài khoản.
        </p>
        
        <p>
          Các sản phẩm này không phù hợp cho tất cả mọi người và bạn cần đảm bảo rằng bạn hiểu rõ các rủi ro liên quan. 
          Trước khi quyết định giao dịch, bạn nên cân nhắc kỹ lưỡng các mục tiêu đầu tư, mức độ kinh nghiệm và khả năng chấp nhận rủi ro của mình.
        </p>

        <p>
          <strong>Nội dung trên website này chỉ mang tính chất chia sẻ kiến thức và giáo dục.</strong> 
          Chúng tôi không cung cấp lời khuyên đầu tư cá nhân. Mọi quyết định giao dịch là trách nhiệm của riêng bạn.
        </p>

        <p>
          Hiệu suất trong quá khứ không đảm bảo cho kết quả trong tương lai. Các ví dụ và kết quả được trình bày 
          trên website chỉ mang tính minh họa và có thể không phản ánh chính xác kết quả thực tế.
        </p>

        <p className="pt-3 sm:pt-4 border-t border-red-800/50">
          <strong>Khuyến nghị:</strong> Chỉ giao dịch với số tiền mà bạn có thể chấp nhận mất. 
          Nên bắt đầu với tài khoản Demo để làm quen trước khi sử dụng tiền thật.
        </p>
      </div>
    </div>
  );
}