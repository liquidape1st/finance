import { Link } from "react-router-dom";
import { Home, ArrowLeft, Newspaper, BookOpen, BarChart3 } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

export function NotFoundPage() {
  const { t } = useTranslation();
  const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
  const siteImage = `${window.location.origin}/logo.png`;

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <SEO
        title={t('notFound.title')}
        description={t('notFound.description')}
        image={siteImage}
        imageAlt={t('notFound.title')}
        url={canonicalUrl}
        noindex={true}
      />
      <Navbar />

      <main className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <section className="py-8 sm:py-12 md:py-16" aria-label="404 Not Found">
          {/* Header Section */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="bg-[#333333] inline-block px-2 py-1 rounded mb-3 sm:mb-4">
              <span className="text-white text-xs sm:text-sm">{t('notFound.title')}</span>
            </div>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#FFD11A] mb-4 sm:mb-5 tracking-tight"
              style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
            >
              404
            </h1>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4 tracking-tight leading-tight"
              style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
            >
              {t('notFound.heading')}
            </h2>
            <p className="text-[#98989a] text-sm sm:text-base leading-relaxed max-w-2xl">
              {t('notFound.description')}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16">
            <Link
              to="/"
              className="bg-[#FFD11A] text-[#141414] px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-[#ffdb4d] transition-colors inline-flex items-center gap-2 text-sm sm:text-base font-medium"
            >
              <Home className="size-4" />
              {t('notFound.backToHome')}
            </Link>
            <button
              onClick={() => window.history.back()}
              className="bg-[#1a1a1a] border border-neutral-800 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-[#262626] hover:border-[#FFD11A]/40 transition-colors inline-flex items-center gap-2 text-sm sm:text-base font-medium"
            >
              <ArrowLeft className="size-4" />
              {t('notFound.goBack')}
            </button>
          </div>

          {/* Quick Links */}
          <div className="border-t border-neutral-800 pt-8 sm:pt-10 md:pt-12">
            <h3
              className="text-lg sm:text-xl text-white mb-5 sm:mb-6 tracking-tight"
              style={{ fontFamily: 'Kumbh Sans, sans-serif' }}
            >
              {t('notFound.quickLinks')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <Link
                to="/"
                className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-5 hover:bg-[#262626] hover:border-[#FFD11A]/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <Home className="size-5 text-[#FFD11A]" />
                  <p className="text-white text-sm sm:text-base font-medium" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                    {t('nav.home')}
                  </p>
                </div>
                <p className="text-[#98989a] text-xs sm:text-sm leading-relaxed">
                  {t('notFound.quickLinksDesc.homeDesc')}
                </p>
              </Link>

              <Link
                to="/news"
                className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-5 hover:bg-[#262626] hover:border-[#FFD11A]/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <Newspaper className="size-5 text-[#FFD11A]" />
                  <p className="text-white text-sm sm:text-base font-medium" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                    {t('nav.news')}
                  </p>
                </div>
                <p className="text-[#98989a] text-xs sm:text-sm leading-relaxed">
                  {t('notFound.quickLinksDesc.newsDesc')}
                </p>
              </Link>

              <Link
                to="/learn"
                className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-5 hover:bg-[#262626] hover:border-[#FFD11A]/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <BookOpen className="size-5 text-[#FFD11A]" />
                  <p className="text-white text-sm sm:text-base font-medium" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                    {t('nav.learn')}
                  </p>
                </div>
                <p className="text-[#98989a] text-xs sm:text-sm leading-relaxed">
                  {t('notFound.quickLinksDesc.learnDesc')}
                </p>
              </Link>

              <Link
                to="/resources"
                className="bg-[#1a1a1a] border border-neutral-800 rounded-lg p-4 sm:p-5 hover:bg-[#262626] hover:border-[#FFD11A]/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <BarChart3 className="size-5 text-[#FFD11A]" />
                  <p className="text-white text-sm sm:text-base font-medium" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                    {t('nav.resources')}
                  </p>
                </div>
                <p className="text-[#98989a] text-xs sm:text-sm leading-relaxed">
                  {t('notFound.quickLinksDesc.resourcesDesc')}
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
