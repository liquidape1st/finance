import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useState } from "react";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { RiskWarningDisclosure } from "../components/RiskWarningDisclosure";
import { BrokerComparisonTable } from "../components/BrokerComparisonTable";
import { GlossaryList } from "../components/KeyTermsGlossary";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { useAppSelector } from "@/store";

export function ResourcesPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"broker" | "glossary">("broker");

  const canonicalUrl = `${window.location.origin}/resources`;
  const siteImage = `${window.location.origin}/logo.png`;
  const currentLang = useAppSelector((state) => state.locale.currentLang);
  const alternateLang = currentLang === 'vi' ? 'en' : 'vi';

  const resourcesPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('resources.title'),
    "description": t('resources.description'),
    "url": canonicalUrl,
    "inLanguage": currentLang === 'vi' ? 'vi-VN' : 'en-US',
    "mainEntity": {
      "@type": "ItemList",
      "name": t('resources.schema.mainEntityName'),
      "description": t('resources.schema.mainEntityDescription'),
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": t('resources.schema.brokerComparison.name'),
          "description": t('resources.schema.brokerComparison.description')
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": t('resources.schema.tradingGlossary.name'),
          "description": t('resources.schema.tradingGlossary.description')
        }
      ]
    }
  };

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <Helmet>
        <title>{`GOIncome - ${t('resources.title')}`}</title>
        <meta name="description" content={t('resources.description')} />
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`GOIncome - ${t('resources.title')}`} />
        <meta property="og:description" content={t('resources.description')} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GOIncome" />
        <meta property="og:locale" content={currentLang === 'vi' ? 'vi_VN' : 'en_US'} />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`GOIncome - ${t('resources.title')}`} />
        <meta name="twitter:description" content={t('resources.description')} />
        <meta name="twitter:image" content={siteImage} />
        <meta name="twitter:site" content="@goincome" />
        
        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang={currentLang === 'vi' ? 'vi-VN' : 'en-US'} href={canonicalUrl} />
        <link rel="alternate" hrefLang={alternateLang === 'vi' ? 'vi-VN' : 'en-US'} href={`${canonicalUrl}?lang=${alternateLang}`} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        
        {/* Additional SEO */}
        <meta name="theme-color" content="#141414" />
        <meta name="language" content={currentLang === 'vi' ? 'Vietnamese' : 'English'} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(resourcesPageSchema)}
        </script>
      </Helmet>
      <Navbar />

      <main>
      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12" aria-label="Resources hero section">
        <div className="bg-[#333333] inline-block px-3 py-1 rounded mb-3 sm:mb-4">
          <span className="text-white text-xs sm:text-sm">{t('resources.badge')}</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] text-white mb-4 sm:mb-5 tracking-tight leading-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
          {t('resources.heroTitle')}
        </h1>
        <p className="text-[#98989a] text-sm sm:text-base leading-relaxed max-w-3xl mb-8 sm:mb-10 md:mb-12">
          {t('resources.heroDescription')}
        </p>

        {/* Affiliate Banner */}
        <AffiliateBanner
          title={t('resources.affiliate.title')}
          description={t('resources.affiliate.description')}
          ctaText={t('resources.affiliate.ctaText')}
          ctaLink="https://accounts.binance.com/register?ref=GOINCOME"
          bonusAmount={t('resources.affiliate.bonusAmount')}
          hasCountdown={true}
          variant="dark"
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
            {t('resources.tabs.broker')}
          </button>
          <button 
            onClick={() => setActiveTab('glossary')}
            className={`px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 rounded-lg text-xs sm:text-sm transition-colors flex-1 sm:flex-none ${
              activeTab === 'glossary' 
                ? 'bg-[#FFD11A] text-[#141414]' 
                : 'text-[#98989a] hover:bg-[#262626]'
            }`}
          >
            {t('resources.tabs.glossary')}
          </button>
        </div>

        {/* Broker Comparison Tab */}
        {activeTab === 'broker' && (
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] text-white tracking-tight mb-2 sm:mb-3" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                {t('resources.brokerTab.title')}
              </h2>
              <p className="text-[#98989a] text-sm sm:text-base mb-6 sm:mb-8">
                {t('resources.brokerTab.description')}
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
                {t('resources.glossaryTab.title')}
              </h2>
              <p className="text-[#98989a] text-sm sm:text-base mb-6 sm:mb-8">
                {t('resources.glossaryTab.description')}
              </p>
            </div>
            
            <GlossaryList />
          </div>
        )}

        {/* Guides Tab (đã loại bỏ để trang chỉ còn 2 phần: So sánh sàn & Từ điển) */}
      </section>
      </main>

      <Footer />
    </div>
  );
}