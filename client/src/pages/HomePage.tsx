import imgImage from "@/assets/6fbe74e4c1500ee56eb703cd4ca7bed8f5ab1e79.png";
import imgImage1 from "@/assets/92ed7407e1ea241277ee1cb9c161bc12787080a5.png";
import appConfig from "@/configs/app.config";
import { getClientBlogTranslationPage, getHomePageFeaturedBlogTranslationList, useAppDispatch, useAppSelector } from "@/store";
import { Eye } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { RiskWarningDisclosure } from "../components/RiskWarningDisclosure";
import svgPaths from "../imports/svg-f8f5ykhcvu";
import { Helmet } from "react-helmet";

export function HomePage() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation();
  const { tableData, home_page_featured_blog_list } = useAppSelector((state) => state.finance)
  const currentLang = useAppSelector((state) => state.locale.currentLang)

  const getBlogImageUrl = (fileName: string, updatedAt: string) =>
    `${appConfig.apiPrefix}/s3/stream?fileName=${encodeURIComponent(fileName)}&v=${Date.parse(updatedAt) || 0}`


  useEffect(() => {
    dispatch(getClientBlogTranslationPage(tableData))
    dispatch(getHomePageFeaturedBlogTranslationList({
      langCode: currentLang,
    }))
  }, [dispatch])


  const stats = [
    { value: "300+", label: t('home.stats.resources') },
    { value: "12k+", label: t('home.stats.downloads') },
    { value: "10k+", label: t('home.stats.users') },
    { value: "100+", label: t('home.stats.countries') },
  ];

  const whitepapers = [
    {
      id: 1,
      title: t('home.whitepapers.crypto.title'),
      description: t('home.whitepapers.crypto.description'),
      image: imgImage,
      publicationDate: "Tháng 12, 2024",
      category: t('home.whitepapers.crypto.category'),
      author: "Sarah Chen",
      shortDesc: t('home.whitepapers.crypto.shortDesc')
    },
    {
      id: 2,
      title: t('home.whitepapers.forex.title'),
      description: t('home.whitepapers.forex.description'),
      image: imgImage1,
      publicationDate: "Tháng 12, 2024",
      category: t('home.whitepapers.forex.category'),
      author: "Michael Rodriguez",
      shortDesc: t('home.whitepapers.forex.shortDesc')
    },
  ];



  const canonicalUrl = `${window.location.origin}/`;
  const siteImage = `${window.location.origin}/logo.png`;
  const alternateLang = currentLang === 'vi' ? 'en' : 'vi';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GOIncome",
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
      "name": "GOIncome",
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

  const getPreflixBlog = (uiType: string) => {
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

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <Helmet>
        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "GOIncome",
            "url": canonicalUrl,
            "logo": siteImage,
            "sameAs": []
          })}
        </script>
        <title>{`GOIncome - ${t('home.title')}`}</title>
        <meta name="description" content={t('home.description')} />
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />

        {/* Open Graph */}
        <meta property="og:title" content={`GOIncome - ${t('home.title')}`} />
        <meta property="og:description" content={t('home.description')} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GOIncome" />
        <meta property="og:locale" content={currentLang === 'vi' ? 'vi_VN' : 'en_US'} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`GOIncome - ${t('home.title')}`} />
        <meta name="twitter:description" content={t('home.description')} />
        <meta name="twitter:image" content={siteImage} />
        <meta name="twitter:site" content="@goincome" />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang={currentLang === 'vi' ? 'vi-VN' : 'en-US'} href={canonicalUrl} />
        <link rel="alternate" hrefLang={alternateLang === 'vi' ? 'vi-VN' : 'en-US'} href={`${canonicalUrl}?lang=${alternateLang}`} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#141414" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="VN" />
        <meta name="language" content={currentLang === 'vi' ? 'Vietnamese' : 'English'} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12" aria-label="Hero section">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] text-white mb-4 sm:mb-5 tracking-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-white mb-3 sm:mb-4 md:mb-5 leading-tight tracking-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                {t('home.subtitle')}
              </h2>
              <p className="text-[#7e7e81] text-sm sm:text-base leading-relaxed">
                {t('home.description')}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 lg:gap-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] text-white tracking-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
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

        {/* Features Cards */}
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800" aria-label="Features">
          <div className="bg-[#141414] border border-neutral-800 rounded-xl p-2 sm:p-2.5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-2.5">
              <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white text-base sm:text-lg">{t('home.features.basic.title')}</h3>
                  <div className="bg-[#ffd11a] p-2.5 sm:p-3 rounded-full">
                    <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#141414" fillRule="evenodd" />
                    </svg>
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
                    <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#141414" fillRule="evenodd" />
                    </svg>
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
                    <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                      <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#141414" fillRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="text-[#98989a] text-sm sm:text-base">
                  {t('home.features.rebate.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs & Content Section */}
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800" aria-label="Articles and whitepapers">
          <div className="bg-[#1a1a1a] rounded-xl p-6 sm:p-8 md:p-12 border border-neutral-800">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-6">
              <header className="flex-1">
                <div className="bg-[#333333] inline-block px-2 py-1 rounded mb-2.5">
                  <span className="text-white text-sm sm:text-base">{t('home.articles.title')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-white leading-tight tracking-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                  {t('home.articles.heading')}
                </h2>
              </header>

              <div className="bg-[#141414] border border-neutral-800 rounded-xl p-2 sm:p-2.5 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
                <button className="bg-neutral-800 border border-neutral-800 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg text-white text-xs sm:text-sm w-full sm:w-auto">
                  {t('home.articles.tabs.whitepapers')}
                </button>
                <button className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg text-[#98989a] text-xs sm:text-sm hover:bg-[#1a1a1a] transition-colors w-full sm:w-auto">
                  {t('home.articles.tabs.learning')}
                </button>
                <button className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-lg text-[#98989a] text-xs sm:text-sm hover:bg-[#1a1a1a] transition-colors w-full sm:w-auto">
                  {t('home.articles.tabs.guides')}
                </button>
              </div>
            </div>

            {/* Whitepapers List */}
            {whitepapers.map((paper, index) => (
              <div key={paper.id} className={`flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-start ${index > 0 ? 'border-t border-neutral-800 pt-8 sm:pt-12 md:pt-16 mt-8 sm:mt-12 md:mt-16' : ''}`}>
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
                      className="w-full h-48 sm:h-64 md:h-75.75 object-cover rounded-xl mb-4 sm:mb-5 md:mb-6"
                    />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                      <div className="flex-1">
                        <h4 className="text-white text-lg sm:text-xl mb-2 sm:mb-2.5">{paper.title}</h4>
                        <p className="text-[#98989a] text-sm sm:text-base leading-relaxed">{paper.description}</p>
                      </div>
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = '/pdf/Ebook - Cryptocurrency for beginners.pdf';
                          link.download = 'Ebook - Cryptocurrency for beginners.pdf';
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="bg-[#1a1a1a] border border-neutral-800 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-lg text-[#98989a] text-xs sm:text-sm hover:bg-[#262626] transition-colors flex items-center gap-1 whitespace-nowrap self-start sm:self-auto"
                      >
                        {t('home.articles.downloadPdf')}
                        <svg className="size-4 sm:size-5" fill="none" viewBox="0 0 20 20">
                          <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#FFD11A" fillRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-6">
                      <p className="text-[#98989a] text-sm sm:text-base mb-0.5">{t('home.articles.publicationDate')}</p>
                      <p className="text-white text-sm sm:text-base">{paper.publicationDate}</p>
                    </div>
                    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-6">
                      <p className="text-[#98989a] text-sm sm:text-base mb-0.5">{t('home.articles.category')}</p>
                      <p className="text-white text-sm sm:text-base">{paper.category}</p>
                    </div>
                    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-6">
                      <p className="text-[#98989a] text-sm sm:text-base mb-0.5">{t('home.articles.author')}</p>
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
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800" aria-label="Featured blog posts">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {home_page_featured_blog_list.map((blog) => (
              <Link
                to={`/${getPreflixBlog(blog.uiType)}/${currentLang}/${blog.slug}`}
                state={{ blog }}
                key={`${currentLang}-${blog.id}`}
                className="group flex flex-col cursor-pointer"
              >
                <article className="flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-53.75 rounded-[10px] overflow-hidden mb-4">
                    <img
                      src={getBlogImageUrl(blog.image, blog.updatedAt)}
                      loading="lazy"
                      decoding="async"
                      alt={blog.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2.5 flex-1">
                    {/* Title & Category */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-white text-[16px] leading-normal tracking-[-0.48px] group-hover:text-[#FFD11A] transition-colors line-clamp-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                        {blog.title}
                      </h3>
                      <p className="text-[#98989a] text-[14px] tracking-[-0.42px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {blog.category.name}
                      </p>
                    </div>

                    {/* Stats & Button */}
                    <div className="flex items-center gap-12.5">
                      {/* Stats Pills */}
                      <div className="flex items-center gap-2">
                        {/* Views */}
                        <div className="bg-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-full">
                          <Eye className="size-5 text-[#666666]" strokeWidth={1.5} />
                          <span className="text-[#98989a] text-[14px] tracking-[-0.42px]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                            {blog.view}
                          </span>
                        </div>

                        {/* Comments
                   <div className="bg-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-full">
                     <MessageCircle className="size-5 text-[#666666]" strokeWidth={1.5} />
                     <span className="text-[#98989a] text-[14px] tracking-[-0.42px]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                       {blog.comments}
                     </span>
                   </div> */}
                      </div>

                      {/* Read More Button */}
                      <div className="flex-1 bg-[#141414] border border-[#262626] rounded-lg px-5 py-3.5 flex items-center justify-center gap-1 hover:border-[#FFD11A]/40 hover:bg-[#1a1a1a] transition-all group/btn">
                        <span className="text-[#98989a] text-[14px] tracking-[-0.42px] whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {t('blogs.readNow')}
                        </span>
                        <svg className="size-5 shrink-0" fill="none" viewBox="0 0 20 20">
                          <path clipRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L10.168 10.5 7.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 01-1.06-.02z" fill="#FFD11A" fillRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Affiliate Banner After Ebooks */}
          <div className="mt-12 sm:mt-16">
            <AffiliateBanner
              title={t('home.affiliate.title')}
              description={t('home.affiliate.description')}
              ctaText={t('home.affiliate.cta')}
              ctaLink="/resources"
              variant="dark"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

