import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";
import { useState } from "react";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { RiskWarningDisclosure } from "../components/RiskWarningDisclosure";
import { BrokerComparisonTable } from "../components/BrokerComparisonTable";
import { GlossaryList } from "../components/KeyTermsGlossary";

export function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<"broker" | "glossary">("broker");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Tài Nguyên Giao Dịch Chuyên Nghiệp",
    "description": "Truy cập nhanh bảng so sánh sàn giao dịch uy tín và từ điển thuật ngữ giao dịch chi tiết. Hai tài nguyên cốt lõi giúp bạn hiểu thị trường và chọn sàn phù hợp.",
    "url": "https://goincome.net/resources"
  };

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <SEO
        title="Tài Nguyên Giao Dịch"
        description="So sánh sàn giao dịch uy tín và từ điển thuật ngữ giao dịch chi tiết. Tài nguyên chuyên nghiệp giúp bạn hiểu thị trường và chọn sàn phù hợp."
        keywords="so sánh sàn giao dịch, từ điển thuật ngữ, sàn forex uy tín, broker comparison, thuật ngữ giao dịch"
        structuredData={structuredData}
      />
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
          Truy cập nhanh bảng so sánh sàn giao dịch uy tín và từ điển thuật ngữ giao dịch chi tiết. 
          Hai tài nguyên cốt lõi giúp bạn hiểu thị trường và chọn sàn phù hợp.
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
            onClick={() => setActiveTab('glossary')}
            className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-lg text-xs sm:text-sm transition-colors flex-1 sm:flex-none ${
              activeTab === 'glossary' 
                ? 'bg-[#FFD11A] text-[#141414]' 
                : 'text-[#98989a] hover:bg-[#262626]'
            }`}
          >
            Từ Điển Thuật Ngữ
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

        {/* Guides Tab (đã loại bỏ để trang chỉ còn 2 phần: So sánh sàn & Từ điển) */}
      </section>

      <Footer />
    </div>
  );
}