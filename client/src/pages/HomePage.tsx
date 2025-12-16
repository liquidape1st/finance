import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { RiskWarningDisclosure } from "../components/RiskWarningDisclosure";
import svgPaths from "../imports/svg-f8f5ykhcvu";
import imgImage from "@/assets/6fbe74e4c1500ee56eb703cd4ca7bed8f5ab1e79.png";
import imgImage1 from "@/assets/92ed7407e1ea241277ee1cb9c161bc12787080a5.png";
import imgImage2 from "@/assets/80fa1841d31e58a1221a9df85d34fcd265c74760.png";
import imgImage3 from "@/assets/64fd296dc0cbbcfa14675f3011d4d1b7eab3ee5b.png";
import imgImage4 from "@/assets/dad619fc22331a397a147e42615c283ec555017b.png";
import { useTranslation } from "react-i18next";
import { getClientBlogTranslationPage, useAppDispatch, useAppSelector } from "@/store";
import { useEffect } from "react";

export function HomePage() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation();
  const { tableData } = useAppSelector((state) => state.finance)

  useEffect(() => {
    dispatch(getClientBlogTranslationPage(tableData))
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

  const ebooks = [
    {
      id: 1,
      title: t('home.ebooksList.personal.title'),
      description: t('home.ebooksList.personal.description'),
      image: imgImage2,
    },
    {
      id: 2,
      title: t('home.ebooksList.realEstate.title'),
      description: t('home.ebooksList.realEstate.description'),
      image: imgImage3,
    },
    {
      id: 3,
      title: t('home.ebooksList.planning.title'),
      description: t('home.ebooksList.planning.description'),
      image: imgImage4,
    },
  ];

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] text-white mb-4 sm:mb-5 tracking-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
          {t('home.title')}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 lg:gap-16 mb-6 sm:mb-8">
          {/* Large Logo Icon */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-[120px] lg:h-[120px] relative shrink-0">
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
          <p className="flex-1 text-[#98989a] text-sm sm:text-base leading-relaxed">
            {t('home.dailyDescription')}
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
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20 border-t border-neutral-800">
        <div className="bg-[#1a1a1a] rounded-xl p-6 sm:p-8 md:p-12 border border-neutral-800">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 sm:mb-10 md:mb-12 gap-6">
            <div className="flex-1">
              <div className="bg-[#333333] inline-block px-2 py-1 rounded mb-2.5">
                <span className="text-white text-sm sm:text-base">{t('home.articles.title')}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-white leading-tight tracking-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                {t('home.articles.heading')}
              </h2>
            </div>

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
                  {t('home.ebooks.viewMore')}
                </button>
                <button className="flex-1 bg-[#1a1a1a] border border-neutral-800 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-lg text-[#98989a] text-xs sm:text-sm hover:bg-[#262626] transition-colors">
                  {t('home.ebooks.readNow')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Affiliate Banner After Ebooks */}
        <div className="mt-12 sm:mt-16">
          <AffiliateBanner
            title={t('home.affiliate.title')}
            description={t('home.affiliate.description')}
            ctaText={t('home.affiliate.cta')}
            ctaLink="#"
            variant="dark"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

