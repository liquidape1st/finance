import { useState } from "react";
import { BlogsPage } from "./pages/BlogsPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AffiliateBanner } from "./components/AffiliateBanner";
import { KeyTermsGlossary } from "./components/KeyTermsGlossary";
import { RiskWarningDisclosure } from "./components/RiskWarningDisclosure";
import svgPaths from "./imports/svg-f8f5ykhcvu";
import imgImage from "figma:asset/6fbe74e4c1500ee56eb703cd4ca7bed8f5ab1e79.png";
import imgImage1 from "figma:asset/92ed7407e1ea241277ee1cb9c161bc12787080a5.png";
import imgImage2 from "figma:asset/80fa1841d31e58a1221a9df85d34fcd265c74760.png";
import imgImage3 from "figma:asset/64fd296dc0cbbcfa14675f3011d4d1b7eab3ee5b.png";
import imgImage4 from "figma:asset/dad619fc22331a397a147e42615c283ec555017b.png";

function HomePage() {
  const stats = [
    { value: "300+", label: "Tài Nguyên Có Sẵn" },
    { value: "12k+", label: "Tổng Lượt Tải Xuống" },
    { value: "10k+", label: "Người Dùng Hoạt Động" },
    { value: "100+", label: "Quốc Gia Truy Cập" },
  ];

  const whitepapers = [
    {
      id: 1,
      title: "Tìm Hiểu Về Tiền Điện Tử",
      description: "Giới thiệu tổng quan về tiền điện tử, công nghệ blockchain và các khái niệm cơ bản bạn nên biết.",
      image: imgImage,
      publicationDate: "Tháng 12, 2024",
      category: "Tiền Điện Tử",
      author: "Sarah Chen",
      shortDesc: "Các khái niệm cơ bản về Bitcoin, Ethereum và cách thức hoạt động của tiền điện tử."
    },
    {
      id: 2,
      title: "Forex Cho Người Mới Bắt Đầu",
      description: "Hướng dẫn cơ bản về thị trường ngoại hối, cách giao dịch cặp tiền tệ và quản lý rủi ro khi tham gia Forex.",
      image: imgImage1,
      publicationDate: "Tháng 12, 2024",
      category: "Forex",
      author: "Michael Rodriguez",
      shortDesc: "Tìm hiểu về thị trường Forex, cặp tiền tệ, pip, spread và các khái niệm giao dịch ngoại hối."
    },
  ];

  const ebooks = [
    {
      id: 1,
      title: "Quản Lý Tài Chính Cá Nhân",
      description: "Các mẹo và kiến thức về lập ngân sách, theo dõi chi tiêu và tiết kiệm hiệu quả.",
      image: imgImage2,
    },
    {
      id: 2,
      title: "Hiểu Biết Về Bất Động Sản",
      description: "Giới thiệu cơ bản về thị trường bất động sản và những điều cần biết khi tìm hiểu lĩnh vực này.",
      image: imgImage3,
    },
    {
      id: 3,
      title: "Lập Kế Hoạch Dài Hạn",
      description: "Tìm hiểu về các phương pháp tiết kiệm và lập kế hoạch tài chính cho tương lai.",
      image: imgImage4,
    },
  ];

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <Navbar currentPage="home" />

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] text-white mb-4 sm:mb-5 tracking-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
          Kiến Thức Tài Chính
        </h1>
        
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-16 mb-6 sm:mb-8">
          {/* Large Logo Icon */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-[120px] lg:h-[120px] relative flex-shrink-0">
            <svg className="block size-full" fill="none" viewBox="0 0 120 120">
              <path d={svgPaths.p1471eac0} fill="#FFD11A" transform="scale(3)" />
              <path d={svgPaths.p1fd34e80} fill="#FFD11A" transform="scale(3)" />
              <path d={svgPaths.p28a948f0} fill="#FFD11A" transform="scale(3)" />
              <path d={svgPaths.p3a5c740} fill="#FFD11A" transform="scale(3)" />
              <path d={svgPaths.pc5370f2} fill="#FFD11A" transform="scale(3)" />
              <path d={svgPaths.p1408fe00} fill="#FFD11A" transform="scale(3)" />
              <path d={svgPaths.p1d63b200} fill="#FFD11A" transform="scale(3)" />
              <path d={svgPaths.p27682680} fill="#FFD11A" transform="scale(3)" />
            </svg>
          </div>

          <div className="flex-1">
            <div className="bg-[#333333] inline-block px-2 py-1 rounded mb-2.5">
              <span className="text-white text-sm sm:text-base">Tìm hiểu về tài chính cá nhân</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-white mb-3 sm:mb-4 md:mb-5 leading-tight tracking-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              Nơi Chia Sẻ và Học Hỏi
            </h2>
            <p className="text-[#7e7e81] text-sm sm:text-base leading-relaxed">
              Khám phá các bài viết và kiến thức về tài chính cá nhân, từ cách quản lý chi tiêu, tiết kiệm đến hiểu biết về các khái niệm đầu tư cơ bản. Nội dung chỉ mang tính chia sẻ kiến thức, không phải lời khuyên tài chính.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 lg:gap-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] text-white tracking-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
            Hàng Ngày
          </h2>
          <p className="flex-1 text-[#98989a] text-sm sm:text-base leading-relaxed">
            Cập nhật các bài viết về kiến thức tài chính, từ những khái niệm cơ bản về ngân sách, tiết kiệm, đến các thông tin tổng quan về thị trường. Mục đích là để bạn có thêm hiểu biết về tài chính, giúp đưa ra quyết định phù hợp với bản thân.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 border-t border-neutral-800">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-800">
          {stats.map((stat, index) => (
            <div key={index} className="py-8 sm:py-12 md:py-16 text-center">
              <p className="text-2xl sm:text-3xl md:text-[40px] text-white mb-1 sm:mb-1.5">
                {stat.value.replace('+', '')}<span className="text-[#ffd11a]">+</span>
              </p>
              <p className="text-[#98989a] text-xs sm:text-sm md:text-base px-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Cards */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800">
        <div className="bg-[#141414] border border-neutral-800 rounded-xl p-2 sm:p-2.5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-2.5">
            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-base sm:text-lg">Kiến Thức Cơ Bản</h3>
                <div className="bg-[#ffd11a] p-2.5 sm:p-3 rounded-full">
                  <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#141414" fillRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-[#98989a] text-sm sm:text-base">
                Các bài viết giới thiệu về cổ phiếu, trái phiếu, quỹ đầu tư và những khái niệm tài chính cơ bản như{" "}
                <KeyTermsGlossary term="Leverage">đòn bẩy</KeyTermsGlossary>, {" "}
                <KeyTermsGlossary term="Margin">ký quỹ</KeyTermsGlossary>.
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-base sm:text-lg">Tin Tức Thị Trường</h3>
                <div className="bg-[#ffd11a] p-2.5 sm:p-3 rounded-full">
                  <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#141414" fillRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-[#98989a] text-sm sm:text-base">
                Cập nhật thông tin và diễn biến thị trường, các chỉ số như{" "}
                <KeyTermsGlossary term="NFP">NFP</KeyTermsGlossary>,{" "}
                <KeyTermsGlossary term="CPI">CPI</KeyTermsGlossary>{" "}
                để bạn có cái nhìn tổng quan hơn về kinh tế.
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-base sm:text-lg">Hoàn Phí Giao Dịch</h3>
                <div className="bg-[#ffd11a] p-2.5 sm:p-3 rounded-full">
                  <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#141414" fillRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-[#98989a] text-sm sm:text-base">
                Nhận hoàn lại phí giao dịch ({" "}
                <KeyTermsGlossary term="Spread">spread</KeyTermsGlossary>,{" "}
                <KeyTermsGlossary term="CFD">commission</KeyTermsGlossary>{" "}
                ) khi đăng ký qua link giới thiệu. Tiết kiệm chi phí, tăng lợi nhuận.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs & Content Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800">
        <div className="bg-[#1a1a1a] rounded-xl p-6 sm:p-8 md:p-12 border border-neutral-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-6">
            <div className="flex-1">
              <div className="bg-[#333333] inline-block px-2 py-1 rounded mb-2.5">
                <span className="text-white text-sm sm:text-base">Tìm Hiểu Thêm</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-white leading-tight tracking-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                Bài Viết và Kiến Thức
              </h2>
            </div>
            
            <div className="bg-[#141414] border border-neutral-800 rounded-xl p-2 sm:p-2.5 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
              <button className="bg-neutral-800 border border-neutral-800 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg text-white text-xs sm:text-sm w-full sm:w-auto">
                Bài Viết Chuyên Sâu
              </button>
              <button className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg text-[#98989a] text-xs sm:text-sm hover:bg-[#1a1a1a] transition-colors w-full sm:w-auto">
                Tài Liệu Học
              </button>
              <button className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg text-[#98989a] text-xs sm:text-sm hover:bg-[#1a1a1a] transition-colors w-full sm:w-auto">
                Hướng Dẫn
              </button>
            </div>
          </div>

          {/* Whitepapers List */}
          {whitepapers.map((paper, index) => (
            <div key={paper.id} className={`flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-start ${index > 0 ? 'border-t border-neutral-800 pt-8 sm:pt-12 md:pt-16 mt-8 sm:mt-12 md:mt-16' : ''}`}>
              {/* Left Side - Icon & Description */}
              <div className="w-full lg:w-[412px] lg:flex-shrink-0">
                <div className="size-12 sm:size-14 md:size-[60px] mb-6 sm:mb-8 md:mb-10 relative">
                  <svg className="block size-full" fill="none" viewBox="0 0 60 60">
                    {index === 0 ? (
                      <>
                        <path d="M36 36H12V12L36 36Z" fill="#404040" transform="scale(1.25)" />
                        <path d={svgPaths.p4437d00} fill="#FFD11A" transform="scale(1.25)" />
                      </>
                    ) : (
                      <>
                        <path d={svgPaths.p2829c000} fill="#FFD11A" transform="scale(1.25)" />
                        <path d={svgPaths.p3f816d00} fill="#404040" transform="scale(1.25)" />
                        <path d={svgPaths.p2bc07b00} fill="#FFD11A" transform="scale(1.25)" />
                        <path d={svgPaths.p19108400} fill="#FFD11A" transform="scale(1.25)" />
                      </>
                    )}
                  </svg>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-[30px] text-white mb-3 sm:mb-4 md:mb-5 leading-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                  {paper.title}
                </h3>
                <p className="text-[#98989a] text-sm sm:text-base leading-relaxed">
                  {paper.shortDesc}
                </p>
              </div>

              {/* Right Side - Image & Details */}
              <div className="flex-1 w-full lg:border-l border-neutral-800 lg:pl-12 xl:pl-16">
                <div className="mb-8 sm:mb-10">
                  <img 
                    src={paper.image} 
                    alt={paper.title}
                    className="w-full h-48 sm:h-64 md:h-[303px] object-cover rounded-xl mb-4 sm:mb-5 md:mb-6"
                  />
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                    <div className="flex-1">
                      <h4 className="text-white text-lg sm:text-xl mb-2 sm:mb-2.5">{paper.title}</h4>
                      <p className="text-[#98989a] text-sm sm:text-base leading-relaxed">{paper.description}</p>
                    </div>
                    <button className="bg-[#1a1a1a] border border-neutral-800 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-lg text-[#98989a] text-xs sm:text-sm hover:bg-[#262626] transition-colors flex items-center gap-1 whitespace-nowrap self-start sm:self-auto">
                      Tải PDF Ngay
                      <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                        <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#FFD11A" fillRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-6">
                    <p className="text-[#98989a] text-sm sm:text-base mb-0.5">Ngày Xuất Bản</p>
                    <p className="text-white text-sm sm:text-base">{paper.publicationDate}</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-6">
                    <p className="text-[#98989a] text-sm sm:text-base mb-0.5">Danh Mục</p>
                    <p className="text-white text-sm sm:text-base">{paper.category}</p>
                  </div>
                  <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-6">
                    <p className="text-[#98989a] text-sm sm:text-base mb-0.5">Tác Giả</p>
                    <p className="text-white text-sm sm:text-base">{paper.author}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Risk Warning at Bottom */}
        <div className="mt-12 sm:mt-16">
          <RiskWarningDisclosure variant="compact" />
        </div>
      </section>

      {/* Ebooks Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ebooks.map((ebook) => (
            <div key={ebook.id} className="flex flex-col">
              <img 
                src={ebook.image} 
                alt={ebook.title}
                className="w-full h-56 sm:h-64 md:h-[290px] object-cover rounded-xl mb-4 sm:mb-5 md:mb-6"
              />
              <h3 className="text-white text-base sm:text-lg mb-2 sm:mb-2.5">{ebook.title}</h3>
              <p className="text-[#98989a] text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed flex-1">
                {ebook.description}
              </p>
              <div className="flex gap-2 sm:gap-2.5">
                <button className="flex-1 bg-[#141414] border border-neutral-800 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-lg text-[#98989a] text-xs sm:text-sm hover:bg-[#1a1a1a] transition-colors">
                  Xem Thêm
                </button>
                <button className="flex-1 bg-[#1a1a1a] border border-neutral-800 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-lg text-[#98989a] text-xs sm:text-sm hover:bg-[#262626] transition-colors">
                  Đọc Ngay
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Affiliate Banner After Ebooks */}
        <div className="mt-12 sm:mt-16">
          <AffiliateBanner
            title="🚀 Bắt Đầu Hành Trình Giao Dịch Của Bạn"
            description="Mở tài khoản demo miễn phí và thực hành giao dịch không rủi ro. Học cách sử dụng các công cụ phân tích và quản lý rủi ro trước khi giao dịch thật."
            ctaText="Mở Tài Khoản Demo"
            ctaLink="#"
            variant="dark"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'blogs' | 'resources'>('home');

  // Update navigation in Navbar component
  const handleNavigation = (page: 'home' | 'blogs' | 'resources') => {
    setCurrentPage(page);
  };

  // Create navigation wrapper
  const NavigationWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div onClick={(e) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        if (link && link.getAttribute('href')?.startsWith('/')) {
          e.preventDefault();
          const page = link.getAttribute('href')?.slice(1) as 'home' | 'blogs' | 'resources';
          setCurrentPage(page || 'home');
        }
      }}>
        {children}
      </div>
    );
  };

  return (
    <NavigationWrapper>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'blogs' && <BlogsPage />}
      {currentPage === 'resources' && <ResourcesPage />}
    </NavigationWrapper>
  );
}