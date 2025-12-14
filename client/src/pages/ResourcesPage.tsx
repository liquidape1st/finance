import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Download, FileText, BookOpen, BarChart3, ArrowRight } from "lucide-react";
import { useState } from "react";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { RiskWarningDisclosure } from "../components/RiskWarningDisclosure";
import { BrokerComparisonTable } from "../components/BrokerComparisonTable";
import { TradingCalculator } from "../components/TradingCalculator";
import { GlossaryList } from "../components/KeyTermsGlossary";

export function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<'broker' | 'tools' | 'glossary' | 'guides'>('broker');

  const whitepapers = [
    {
      id: 1,
      title: "The Complete Guide to Cryptocurrency Investment",
      description: "An in-depth analysis of cryptocurrency markets, blockchain technology, and investment strategies for digital assets.",
      category: "Cryptocurrency",
      pages: 45,
      downloads: "12.5k",
      date: "November 2024",
      image: "https://images.unsplash.com/photo-1649003515353-c58a239cf662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGNoYXJ0c3xlbnwxfHx8fDE3NjU1MzA3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "Portfolio Diversification Strategies for 2025",
      description: "Expert insights on building a resilient investment portfolio across multiple asset classes and geographical regions.",
      category: "Investment Strategy",
      pages: 38,
      downloads: "9.8k",
      date: "December 2024",
      image: "https://images.unsplash.com/photo-1709080381729-965c62ab0471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwcGxhbm5pbmd8ZW58MXx8fHwxNzY1NDQ4MzUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      title: "ESG Investing: Sustainable Finance Trends",
      description: "Comprehensive analysis of environmental, social, and governance factors in modern investment decisions.",
      category: "Sustainable Finance",
      pages: 52,
      downloads: "8.2k",
      date: "October 2024",
      image: "https://images.unsplash.com/photo-1764231467854-db276777da58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkb2N1bWVudHMlMjByZXBvcnR8ZW58MXx8fHwxNzY1NTMwNzg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const ebooks = [
    {
      id: 1,
      title: "Personal Finance Mastery",
      description: "A complete guide to managing your money, from budgeting basics to advanced wealth-building strategies.",
      category: "Personal Finance",
      pages: 180,
      downloads: "15.2k",
      date: "September 2024",
      image: "https://images.unsplash.com/photo-1574884280706-7342ca3d4231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwYmxvZyUyMHdyaXRpbmd8ZW58MXx8fHwxNzY1NTMwNzg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "Trading Psychology: Master Your Mind",
      description: "Learn how emotions and psychology affect trading decisions and develop mental strategies for success.",
      category: "Trading",
      pages: 210,
      downloads: "11.7k",
      date: "August 2024",
      image: "https://images.unsplash.com/photo-1723987251277-18fc0a1effd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGZpbmFuY2UlMjBhbmFseXNpc3xlbnwxfHx8fDE3NjU1MzA3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      title: "Real Estate Investment Fundamentals",
      description: "Everything you need to know about investing in residential and commercial real estate properties.",
      category: "Real Estate",
      pages: 165,
      downloads: "10.4k",
      date: "July 2024",
      image: "https://images.unsplash.com/photo-1738739905706-2cc26e57f67d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBuZXdzJTIwbWFya2V0fGVufDF8fHx8MTc2NTUzMDc4NXww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const reports = [
    {
      id: 1,
      title: "Q4 2024 Market Performance Report",
      description: "Quarterly analysis of global financial markets, sector performance, and economic indicators.",
      category: "Market Analysis",
      pages: 28,
      downloads: "7.5k",
      date: "December 2024",
      image: "https://images.unsplash.com/photo-1649003515353-c58a239cf662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGNoYXJ0c3xlbnwxfHx8fDE3NjU1MzA3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "Emerging Markets Investment Opportunities",
      description: "Detailed research on high-growth emerging markets and investment strategies for international exposure.",
      category: "Global Markets",
      pages: 35,
      downloads: "6.8k",
      date: "November 2024",
      image: "https://images.unsplash.com/photo-1764231467854-db276777da58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkb2N1bWVudHMlMjByZXBvcnR8ZW58MXx8fHwxNzY1NTMwNzg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      title: "Technology Sector Investment Trends",
      description: "In-depth analysis of technology stocks, AI companies, and semiconductor industry performance.",
      category: "Technology",
      pages: 42,
      downloads: "9.1k",
      date: "October 2024",
      image: "https://images.unsplash.com/photo-1709080381729-965c62ab0471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwcGxhbm5pbmd8ZW58MXx8fHwxNzY1NDQ4MzUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const getCurrentResources = () => {
    switch (activeTab) {
      case 'whitepapers':
        return whitepapers;
      case 'ebooks':
        return ebooks;
      case 'reports':
        return reports;
      default:
        return whitepapers;
    }
  };

  const getIcon = () => {
    switch (activeTab) {
      case 'whitepapers':
        return <FileText className="size-6 text-[#FFD11A]" />;
      case 'ebooks':
        return <BookOpen className="size-6 text-[#FFD11A]" />;
      case 'reports':
        return <BarChart3 className="size-6 text-[#FFD11A]" />;
    }
  };

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12">
        <div className="bg-[#333333] inline-block px-3 py-1 rounded mb-3 sm:mb-4">
          <span className="text-white text-xs sm:text-sm">Công Cụ & Tài Nguyên</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] text-white mb-4 sm:mb-5 tracking-tight leading-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
          Tài Nguyên Giao Dịch Chuyên Nghiệp
        </h1>
        <p className="text-[#98989a] text-sm sm:text-base leading-relaxed max-w-3xl mb-8 sm:mb-10 md:mb-12">
          Truy cập các công cụ tính toán, so sánh sàn giao dịch, từ điển thuật ngữ và hướng dẫn chuyên sâu. 
          Tất cả đều miễn phí để hỗ trợ hành trình học tập của bạn.
        </p>

        {/* Affiliate Banner */}
        <AffiliateBanner
          title="🎁 Ưu Đãi Đặc Biệt: Nhận $50 Bonus Khi Đăng Ký"
          description="Mở tài khoản giao dịch ngay hôm nay và nhận ngay $50 bonus vào tài khoản. Áp dụng cho người dùng mới, có giới hạn thời gian."
          ctaText="Nhận Ưu Đãi Ngay"
          ctaLink="#"
          bonusAmount="$50 Bonus"
          hasCountdown={true}
          variant="gradient"
        />
      </section>

      {/* Tabs & Resources */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800">
        {/* Tab Navigation */}
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-2 sm:p-2.5 flex flex-wrap gap-2 sm:gap-2.5 w-full sm:w-fit mb-8 sm:mb-10 md:mb-12">
          <button 
            onClick={() => setActiveTab('broker')}
            className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-lg text-xs sm:text-sm transition-colors flex-1 sm:flex-none ${
              activeTab === 'broker' 
                ? 'bg-[#FFD11A] text-[#141414]' 
                : 'text-[#98989a] hover:bg-[#262626]'
            }`}
          >
            So Sánh Sàn
          </button>
          <button 
            onClick={() => setActiveTab('tools')}
            className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-lg text-xs sm:text-sm transition-colors flex-1 sm:flex-none ${
              activeTab === 'tools' 
                ? 'bg-[#FFD11A] text-[#141414]' 
                : 'text-[#98989a] hover:bg-[#262626]'
            }`}
          >
            Công Cụ
          </button>
          <button 
            onClick={() => setActiveTab('glossary')}
            className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-lg text-xs sm:text-sm transition-colors flex-1 sm:flex-none ${
              activeTab === 'glossary' 
                ? 'bg-[#FFD11A] text-[#141414]' 
                : 'text-[#98989a] hover:bg-[#262626]'
            }`}
          >
            Từ Điển Thuật Ngữ
          </button>
          <button 
            onClick={() => setActiveTab('guides')}
            className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-lg text-xs sm:text-sm transition-colors flex-1 sm:flex-none ${
              activeTab === 'guides' 
                ? 'bg-[#FFD11A] text-[#141414]' 
                : 'text-[#98989a] hover:bg-[#262626]'
            }`}
          >
            Hướng Dẫn
          </button>
        </div>

        {/* Broker Comparison Tab */}
        {activeTab === 'broker' && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] text-white tracking-tight mb-2 sm:mb-3" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                So Sánh Sàn Giao Dịch Uy Tín
              </h2>
              <p className="text-[#98989a] text-sm sm:text-base mb-6 sm:mb-8">
                Tìm hiểu và so sánh các sàn giao dịch được quản lý bởi các cơ quan có uy tín trên thế giới.
              </p>
            </div>
            <BrokerComparisonTable />
            
            <div className="mt-10 sm:mt-12">
              <RiskWarningDisclosure variant="full" />
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] text-white tracking-tight mb-2 sm:mb-3" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                Công Cụ Tính Toán Giao Dịch
              </h2>
              <p className="text-[#98989a] text-sm sm:text-base mb-6 sm:mb-8">
                Sử dụng các công cụ miễn phí để tính toán rủi ro, kích thước lệnh và quản lý vốn hiệu quả.
              </p>
            </div>
            
            <TradingCalculator />

            <div className="mt-10 sm:mt-12">
              <AffiliateBanner
                title="Nâng Cấp Với TradingView Premium"
                description="Truy cập biểu đồ chuyên nghiệp, chỉ báo nâng cao và công cụ phân tích kỹ thuật mạnh mẽ nhất thị trường."
                ctaText="Dùng Thử Miễn Phí 30 Ngày"
                ctaLink="#"
                variant="dark"
              />
            </div>
          </div>
        )}

        {/* Glossary Tab */}
        {activeTab === 'glossary' && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] text-white tracking-tight mb-2 sm:mb-3" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                Từ Điển Thuật Ngữ Giao Dịch
              </h2>
              <p className="text-[#98989a] text-sm sm:text-base mb-6 sm:mb-8">
                Tìm hiểu các thuật ngữ quan trọng trong giao dịch tài chính, từ cơ bản đến nâng cao.
              </p>
            </div>
            
            <GlossaryList />
          </div>
        )}

        {/* Guides Tab */}
        {activeTab === 'guides' && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] text-white tracking-tight mb-2 sm:mb-3" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                Hướng Dẫn Từng Bước
              </h2>
              <p className="text-[#98989a] text-sm sm:text-base mb-6 sm:mb-8">
                Các hướng dẫn chi tiết giúp bạn bắt đầu hành trình giao dịch từ con số 0.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Guide 1 */}
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-6 sm:p-8 hover:border-[#FFD11A]/30 transition-colors">
                <div className="bg-[#FFD11A] text-[#141414] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-5 sm:mb-6 text-xl sm:text-2xl">
                  1
                </div>
                <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                  Giao Dịch Là Gì?
                </h3>
                <p className="text-[#98989a] text-sm leading-relaxed mb-5 sm:mb-6">
                  Hiểu rõ sự khác biệt giữa Giao dịch (Trading) và Đầu tư (Investing). Tìm hiểu các loại thị trường: Forex, Chứng khoán, Tiền điện tử, Hàng hóa.
                </p>
                <a href="#" className="text-[#FFD11A] text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Đọc Hướng Dẫn
                  <ArrowRight className="size-4" />
                </a>
              </div>

              {/* Guide 2 */}
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-6 sm:p-8 hover:border-[#FFD11A]/30 transition-colors">
                <div className="bg-[#FFD11A] text-[#141414] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-5 sm:mb-6 text-xl sm:text-2xl">
                  2
                </div>
                <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                  Quản Lý Rủi Ro
                </h3>
                <p className="text-[#98989a] text-sm leading-relaxed mb-5 sm:mb-6">
                  Học cách bảo vệ vốn với Position Sizing, Stop-loss và các nguyên tắc quản lý rủi ro quan trọng nhất trong giao dịch.
                </p>
                <a href="#" className="text-[#FFD11A] text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Đọc Hướng Dẫn
                  <ArrowRight className="size-4" />
                </a>
              </div>

              {/* Guide 3 */}
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-6 sm:p-8 hover:border-[#FFD11A]/30 transition-colors">
                <div className="bg-[#FFD11A] text-[#141414] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-5 sm:mb-6 text-xl sm:text-2xl">
                  3
                </div>
                <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                  Phân Tích Kỹ Thuật
                </h3>
                <p className="text-[#98989a] text-sm leading-relaxed mb-5 sm:mb-6">
                  Giới thiệu Nến Nhật, Kháng cự/Hỗ trợ, Xu hướng và các chỉ báo phổ biến như MA, RSI, MACD để đọc biểu đồ.
                </p>
                <a href="#" className="text-[#FFD11A] text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Đọc Hướng Dẫn
                  <ArrowRight className="size-4" />
                </a>
              </div>

              {/* Guide 4 */}
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-6 sm:p-8 hover:border-[#FFD11A]/30 transition-colors">
                <div className="bg-[#FFD11A] text-[#141414] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-5 sm:mb-6 text-xl sm:text-2xl">
                  4
                </div>
                <h3 className="text-white text-lg sm:text-xl mb-3 sm:mb-4" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                  Chọn Sàn Giao Dịch
                </h3>
                <p className="text-[#98989a] text-sm leading-relaxed mb-5 sm:mb-6">
                  Hướng dẫn cách đánh giá và lựa chọn sàn giao dịch uy tín dựa trên Giấy phép, Phí, Spread và Nền tảng giao dịch.
                </p>
                <a href="#" className="text-[#FFD11A] text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  Đọc Hướng Dẫn
                  <ArrowRight className="size-4" />
                </a>
              </div>
            </div>

            <div className="mt-10 sm:mt-12">
              <RiskWarningDisclosure variant="compact" />
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800">
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-6 sm:p-8 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] text-white mb-4 sm:mb-5 leading-tight tracking-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                Get Notified of New Resources
              </h2>
              <p className="text-[#98989a] text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                Be the first to access our latest whitepapers, ebooks, and market reports. Subscribe to receive notifications when new premium content is published.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-[#141414] border border-neutral-800 rounded-lg px-4 sm:px-5 py-3 sm:py-3.5 text-white placeholder:text-[#666666] focus:border-[#FFD11A]/30 focus:outline-none transition-colors text-sm sm:text-base"
                />
                <button className="bg-[#FFD11A] text-[#141414] px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg hover:bg-[#ffdb4d] transition-colors whitespace-nowrap text-sm sm:text-base">
                  Subscribe
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-[#141414] border border-neutral-800 rounded-lg p-4 sm:p-6">
                <p className="text-[#FFD11A] text-xs sm:text-sm mb-1 sm:mb-2">Weekly Updates</p>
                <p className="text-white text-lg sm:text-xl">Fresh Content</p>
              </div>
              <div className="bg-[#141414] border border-neutral-800 rounded-lg p-4 sm:p-6">
                <p className="text-[#FFD11A] text-xs sm:text-sm mb-1 sm:mb-2">Expert Authors</p>
                <p className="text-white text-lg sm:text-xl">Quality Insights</p>
              </div>
              <div className="bg-[#141414] border border-neutral-800 rounded-lg p-4 sm:p-6">
                <p className="text-[#FFD11A] text-xs sm:text-sm mb-1 sm:mb-2">Always Free</p>
                <p className="text-white text-lg sm:text-xl">No Paywall</p>
              </div>
              <div className="bg-[#141414] border border-neutral-800 rounded-lg p-4 sm:p-6">
                <p className="text-[#FFD11A] text-xs sm:text-sm mb-1 sm:mb-2">PDF Format</p>
                <p className="text-white text-lg sm:text-xl">Easy Access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}