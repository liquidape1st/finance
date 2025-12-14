import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Eye, MessageCircle, ArrowRight, Search } from "lucide-react";

export function BlogsPage() {
  const blogs = [
    {
      id: 1,
      title: "Tương Lai Của Tài Chính Phi Tập Trung: Điều Bạn Cần Biết",
      category: "DeFi",
      views: "6.2k",
      comments: "92",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMHRlY2hub2xvZ3klMjBmdXR1cmlzdGljfGVufDB8fHx8MTczNDU2MjgwOHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      title: "Phân Tích Thị Trường: Các Ngành Đáng Chú Ý Năm 2025",
      category: "Market Analysis",
      views: "4.8k",
      comments: "67",
      image: "https://images.unsplash.com/photo-1649003515353-c58a239cf662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGNoYXJ0c3xlbnwxfHx8fDE3NjU1MzA3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      title: "Tài Chính Cá Nhân 101: Xây Dựng Quỹ Dự Phòng Khẩn Cấp",
      category: "Personal Finance",
      views: "5.1k",
      comments: "84",
      image: "https://images.unsplash.com/photo-1709080381729-965c62ab0471?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwcGxhbm5pbmd8ZW58MXx8fHwxNzY1NDQ4MzUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      title: "Hướng Dẫn Thuế Tiền Điện Tử: Điều Nhà Đầu Tư Phải Biết",
      category: "Cryptocurrency",
      views: "7.3k",
      comments: "103",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG8lMjBibG9ja2NoYWlufGVufDB8fHx8MTczNDU2MjgwOHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 5,
      title: "Quỹ Đầu Tư Bất Động Sản: Hướng Dẫn Người Mới Bắt Đầu",
      category: "Real Estate",
      views: "3.9k",
      comments: "56",
      image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwaW52ZXN0bWVudHxlbnwwfHx8fDE3MzQ1NjI4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 6,
      title: "Đầu Tư Bền Vững: Kết Hợp Lợi Nhuận Với Giá Trị",
      category: "ESG Investing",
      views: "4.2k",
      comments: "71",
      image: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGVuZXJneXxlbnwwfHx8fDE3MzQ1NjI4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 7,
      title: "Forex Trading: Chiến Lược Cho Người Mới Bắt Đầu",
      category: "Forex",
      views: "5.8k",
      comments: "89",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JleCUyMHRyYWRpbmd8ZW58MHx8fHwxNzM0NTYyODA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 8,
      title: "NFT và Digital Assets: Cơ Hội Đầu Tư Mới",
      category: "Digital Assets",
      views: "6.5k",
      comments: "95",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZnQlMjBkaWdpdGFsJTIwYXJ0fGVufDB8fHx8MTczNDU2MjgwOHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 9,
      title: "Phân Tích Kỹ Thuật: Đọc Biểu Đồ Như Chuyên Gia",
      category: "Technical Analysis",
      views: "8.1k",
      comments: "112",
      image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaW5nJTIwY2hhcnRzfGVufDB8fHx8MTczNDU2MjgwOHww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const categories = [
    "Tất Cả",
    "DeFi",
    "Cryptocurrency",
    "Forex",
    "Personal Finance",
    "Market Analysis",
    "Technical Analysis"
  ];

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-3 py-1.5 rounded-full mb-4">
            <div className="size-1.5 bg-[#FFD11A] rounded-full"></div>
            <span className="text-[#98989a] text-xs tracking-wider uppercase">Blog & Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-3" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
            Kiến Thức Tài Chính
          </h1>
          <p className="text-[#7e7e81] text-base sm:text-lg leading-relaxed max-w-2xl">
            Khám phá các bài viết chuyên sâu về crypto, forex và tài chính cá nhân
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#666666]" />
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg pl-12 pr-4 py-3.5 text-white placeholder:text-[#666666] focus:border-[#FFD11A]/40 focus:outline-none transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                index === 0
                  ? 'bg-[#FFD11A] text-[#141414]'
                  : 'bg-[#1a1a1a] border border-[#262626] text-[#98989a] hover:border-[#FFD11A]/40 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid - Figma Style Cards */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pb-20 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article 
              key={blog.id}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-[185px] rounded-[10px] overflow-hidden mb-4">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2.5">
                {/* Title & Category */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-white text-[16px] leading-[1.5] tracking-[-0.48px] group-hover:text-[#FFD11A] transition-colors line-clamp-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                    {blog.title}
                  </h3>
                  <p className="text-[#98989a] text-[14px] tracking-[-0.42px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {blog.category}
                  </p>
                </div>

                {/* Stats & Button */}
                <div className="flex items-center gap-[50px]">
                  {/* Stats Pills */}
                  <div className="flex items-center gap-2">
                    {/* Views */}
                    <div className="bg-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-full">
                      <Eye className="size-5 text-[#666666]" strokeWidth={1.5} />
                      <span className="text-[#98989a] text-[14px] tracking-[-0.42px]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                        {blog.views}
                      </span>
                    </div>

                    {/* Comments */}
                    <div className="bg-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-full">
                      <MessageCircle className="size-5 text-[#666666]" strokeWidth={1.5} />
                      <span className="text-[#98989a] text-[14px] tracking-[-0.42px]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                        {blog.comments}
                      </span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <button className="flex-1 bg-[#141414] border border-[#262626] rounded-lg px-5 py-3.5 flex items-center justify-center gap-1 hover:border-[#FFD11A]/40 hover:bg-[#1a1a1a] transition-all group/btn">
                    <span className="text-[#98989a] text-[14px] tracking-[-0.42px] whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Read More
                    </span>
                    <svg className="size-5 flex-shrink-0" fill="none" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L10.168 10.5 7.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 01-1.06-.02z" fill="#FFD11A" fillRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-8 py-4 rounded-lg text-white hover:border-[#FFD11A]/40 hover:bg-[#1f1f1f] transition-all group">
            <span>Xem Thêm Bài Viết</span>
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-20 sm:py-24 border-t border-[#262626]">
        <div className="relative overflow-hidden bg-gradient-to-br from-[#FFD11A] via-[#FFD11A] to-[#FFA500] rounded-2xl p-12 sm:p-16">
          <div className="absolute inset-0 opacity-[0.15]">
            {/* Premium Gradient Orbs */}
            <div className="absolute top-10 right-10 size-[500px] bg-gradient-to-br from-white via-white/80 to-transparent rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }}></div>
            <div className="absolute bottom-10 left-10 size-[450px] bg-gradient-to-tr from-black via-black/60 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
            
            {/* Accent Orbs */}
            <div className="absolute top-1/3 left-1/4 size-[300px] bg-gradient-to-r from-orange-500/40 to-yellow-400/40 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
            <div className="absolute bottom-1/3 right-1/4 size-[250px] bg-white/60 rounded-full blur-[90px]"></div>
            
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#141414] mb-4 tracking-tight leading-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              Đừng Bỏ Lỡ Bất Kỳ Kiến Thức Nào
            </h2>
            <p className="text-[#141414]/80 text-lg leading-relaxed mb-8">
              Nhận bản tin hàng tuần với phân tích thị trường, hướng dẫn trading và insights từ chuyên gia
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 bg-white/95 backdrop-blur-sm border-2 border-white/50 rounded-xl px-5 py-4 text-[#141414] placeholder:text-[#141414]/50 focus:outline-none focus:border-white focus:bg-white transition-all"
              />
              <button className="bg-[#141414] text-white px-8 py-4 rounded-xl hover:bg-[#262626] transition-all whitespace-nowrap inline-flex items-center gap-2 justify-center group">
                <span>Đăng Ký</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-[#141414]/60 text-xs mt-4">
              Miễn phí • Hủy bất cứ lúc nào • Chúng tôi tôn trọng quyền riêng tư của bạn
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}