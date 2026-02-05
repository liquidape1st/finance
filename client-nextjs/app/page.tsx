"use client";

import imgImage from "@/assets/6fbe74e4c1500ee56eb703cd4ca7bed8f5ab1e79.png";
import imgImage1 from "@/assets/92ed7407e1ea241277ee1cb9c161bc12787080a5.png";
import { getHomePageFeaturedBlogTranslationList, useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { AffiliateBanner } from "@/components/AffiliateBanner";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { RiskWarningDisclosure } from "@/components/RiskWarningDisclosure";
import svgPaths from "@/imports/svg-f8f5ykhcvu";
import SEO from "@/components/SEO";
import { BackToTop } from "@/components/BackToTop";

export default function HomePage() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation();
  const { home_page_featured_blog_list } = useAppSelector((state) => state.finance)
  const currentLang = useAppSelector((state) => state.locale.currentLang)

  useEffect(() => {
    dispatch(getHomePageFeaturedBlogTranslationList({
      langCode: currentLang,
    }))
  }, [dispatch, currentLang])


  const stats = [
    { value: "300+", label: t('home.stats.resources') },
    { value: "12k+", label: t('home.stats.downloads') },
    { value: "10k+", label: t('home.stats.users') },
    { value: "100+", label: t('home.stats.countries') },
  ];

  const ebooks = [
    {
      id: 1,
      title: t('home.whitepapers.crypto.title'),
      description: t('home.whitepapers.crypto.description'),
      image: imgImage,
      publicationDate: "Tháng 12, 2024",
      category: t('home.whitepapers.crypto.category'),
      format: "PDF",
      pdfPath: '/pdf/Ebook - Cryptocurrency for beginners.pdf',
      shortDesc: t('home.whitepapers.crypto.shortDesc')
    },
    {
      id: 2,
      title: t('home.whitepapers.forex.title'),
      description: t('home.whitepapers.forex.description'),
      image: imgImage1,
      publicationDate: "Tháng 12, 2024",
      category: t('home.whitepapers.forex.category'),
      format: "PDF",
      pdfPath: '/pdf/Ebook - Forex for beginners.pdf',
      shortDesc: t('home.whitepapers.forex.shortDesc')
    },
  ];



  const canonicalUrl = typeof window !== 'undefined' ? `${window.location.origin}/` : '';
  const siteImage = typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GOInsight",
    "url": canonicalUrl,
    "description": t('home.description'),
    "inLanguage": currentLang === 'vi' ? 'vi-VN' : 'en-US',
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${canonicalUrl}blog?query={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GOInsight",
      "logo": {
        "@type": "ImageObject",
        "url": siteImage,
        "width": 512,
        "height": 512
      },
      "url": canonicalUrl,
      "sameAs": []
    }
  };

  const getPrefixBlog = (uiType: string) => {
    switch (uiType) {
      case 'NEWS':
        return 'news';
      case 'LEARN':
        return 'learn';
      case 'GUIDE':
        return 'guides';
      case 'MARKET':
        return 'market';
      default:
        return '';
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GOInsight",
    "url": canonicalUrl,
    "logo": siteImage,
    "sameAs": []
  };

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <SEO
        title={t('home.title')}
        description={t('home.description')}
        image={siteImage}
        imageAlt={t('home.title')}
        url={canonicalUrl}
        structuredData={[organizationSchema, structuredData]}
      />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12" aria-label="Hero section">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] text-white mb-4 sm:mb-5 tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {t('home.title')}
          </h1>

          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-16 mb-6 sm:mb-8">
            {/* Large Logo Icon */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-30 lg:h-30 relative shrink-0">
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
                <span className="text-white text-sm sm:text-base">{t('nav.find_out_about_personal_finance')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-white mb-3 sm:mb-4 md:mb-5 leading-tight tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                {t('home.subtitle')}
              </h2>
              <p className="text-[#7e7e81] text-sm sm:text-base leading-relaxed">
                {t('home.description')}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 lg:gap-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] text-white tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t('home.daily')}
            </h2>
            <p className="flex-1 text-[#98989a] text-sm sm:text-base leading-relaxed" role="text">
              {t('home.dailyDescription')}
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 border-t border-neutral-800" aria-label="Statistics">
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

        {/* Top Featured Blogs */}
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800" aria-label="Featured blog posts">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {home_page_featured_blog_list.slice(0, 3).map((blog, index) => (
              <div key={`${currentLang}-${blog.id}`} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <BlogCard
                  blog={blog}
                  currentLang={currentLang || 'vi'}
                  prefix={getPrefixBlog(blog.uiType)}
                  showBadge={false}
                  showReadMore={true}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Features Cards */}
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800" aria-label="Features">
          <div className="bg-[#141414] border border-neutral-800 rounded-xl p-2 sm:p-2.5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-2.5">
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-base sm:text-lg">{t('home.features.basic.title')}</h3>
                  <div className="bg-[#ffd11a] p-2.5 sm:p-3 rounded-full">
                    <Link href="/learn">
                      <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                        <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#141414" fillRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <p className="text-[#98989a] text-sm sm:text-base">
                  {t('home.features.basic.description')}
                </p>
              </div>

              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-base sm:text-lg">{t('home.features.market.title')}</h3>
                  <div className="bg-[#ffd11a] p-2.5 sm:p-3 rounded-full">
                    <Link href="/news">
                      <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                        <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#141414" fillRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <p className="text-[#98989a] text-sm sm:text-base">
                  {t('home.features.market.description')}
                </p>
              </div>

              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-base sm:text-lg">{t('home.features.rebate.title')}</h3>
                  <div className="bg-[#ffd11a] p-2.5 sm:p-3 rounded-full">
                    <Link href="/contact">
                      <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                        <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#141414" fillRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <p className="text-[#98989a] text-sm sm:text-base">
                  {t('home.features.rebate.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ebooks Section */}
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800" aria-label="Free ebooks and educational materials">
          <div className="bg-[#1a1a1a] rounded-xl p-6 sm:p-8 md:p-12 border border-neutral-800">
            <div className="mb-8 sm:mb-10 md:mb-12">
              <header className="mb-6 sm:mb-8">
                <div className="bg-[#333333] inline-block px-2 py-1 rounded mb-2.5">
                  <span className="text-white text-sm sm:text-base">{t('home.articles.title')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-white leading-tight tracking-tight mb-3 sm:mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  {t('home.articles.heading')}
                </h2>
                <p className="text-[#7e7e81] text-sm sm:text-base leading-relaxed max-w-3xl">
                  {t('home.articles.description')}
                </p>
              </header>
            </div>

            {/* Ebooks List */}
            {ebooks.map((ebook, index) => (
              <div key={ebook.id} className={`flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-start ${index > 0 ? 'border-t border-neutral-800 pt-8 sm:pt-12 md:pt-16 mt-8 sm:mt-12 md:mt-16' : ''}`}>
                {/* Left Side - Icon & Description */}
                <div className="w-full lg:w-103 lg:shrink-0">
                  <div className="size-12 sm:size-14 md:size-15 mb-6 sm:mb-8 md:mb-10 relative">
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
                  <h3 className="text-xl sm:text-2xl md:text-[30px] text-white mb-3 sm:mb-4 md:mb-5 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    {ebook.title}
                  </h3>
                  <p className="text-[#98989a] text-sm sm:text-base leading-relaxed">
                    {ebook.shortDesc}
                  </p>
                </div>

                {/* Right Side - Image & Details */}
                <div className="flex-1 w-full lg:border-l border-neutral-800 lg:pl-12 xl:pl-16">
                  <div className="mb-8 sm:mb-10">
                    <img
                      src={typeof ebook.image === 'string' ? ebook.image : (ebook.image as any).src}
                      alt={ebook.title}
                      className="w-full h-48 sm:h-64 md:h-75.75 object-cover rounded-xl mb-4 sm:mb-5 md:mb-6"
                    />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                      <div className="flex-1">
                        <h4 className="text-white text-lg sm:text-xl mb-2 sm:mb-2.5">{ebook.title}</h4>
                        <p className="text-[#98989a] text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">{ebook.description}</p>
                      </div>
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = ebook.pdfPath;
                          link.download = ebook.pdfPath.split('/').pop() || 'ebook.pdf';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="bg-[#FFD11A] text-[#141414] px-5 sm:px-6 py-2.5 sm:py-3.5 rounded-lg hover:bg-[#ffdb4d] transition-colors flex items-center gap-2 text-xs sm:text-sm font-medium whitespace-nowrap self-start sm:self-auto shadow-lg shadow-[#FFD11A]/20"
                      >
                        {t('home.articles.downloadPdf')}
                        <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                          <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#141414" fillRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-6">
                      <p className="text-[#98989a] text-sm sm:text-base mb-0.5">{t('home.articles.publicationDate')}</p>
                      <p className="text-white text-sm sm:text-base">{ebook.publicationDate}</p>
                    </div>
                    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-6">
                      <p className="text-[#98989a] text-sm sm:text-base mb-0.5">{t('home.articles.category')}</p>
                      <p className="text-white text-sm sm:text-base">{ebook.category}</p>
                    </div>
                    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-6">
                      <p className="text-[#98989a] text-sm sm:text-base mb-0.5">{t('home.articles.format')}</p>
                      <p className="text-white text-sm sm:text-base">{ebook.format}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Educational Note */}
            <div className="mt-8 sm:mt-10 md:mt-12 pt-8 sm:pt-10 border-t border-neutral-800">
              <p className="text-[#7e7e81] text-xs sm:text-sm leading-relaxed">
                {t('home.articles.note')}
              </p>
            </div>
          </div>

          {/* Risk Warning at Bottom */}
          <div className="mt-12 sm:mt-16">
            <RiskWarningDisclosure variant="compact" />
          </div>
        </section>

        {/* All Featured Blogs */}
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800" aria-label="Featured blog posts">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {home_page_featured_blog_list.map((blog, index) => (
              <div key={`${currentLang}-${blog.id}`} className="animate-fade-in" style={{ animationDelay: `${index * 75}ms` }}>
                <BlogCard
                  blog={blog}
                  currentLang={currentLang || 'vi'}
                  prefix={getPrefixBlog(blog.uiType)}
                  showBadge={false}
                  showReadMore={true}
                />
              </div>
            ))}
          </div>

          {/* Affiliate Banner After Ebooks */}
          <div className="mt-12 sm:mt-16">
            <AffiliateBanner
              title={t('home.affiliate.title')}
              description={t('home.affiliate.description')}
              ctaText={t('home.affiliate.cta')}
              ctaLink="/contact"
              variant="dark"
            />
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
