import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useAppSelector } from "@/store";

export function TermsPage() {
  const { t } = useTranslation();
  const currentLang = useAppSelector((state) => state.locale.currentLang);
  const alternateLang = currentLang === 'vi' ? 'en' : 'vi';

  const canonicalUrl = `${window.location.origin}/terms`;
  const siteImage = `${window.location.origin}/logo.png`;

  const termsPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('terms.title'),
    "description": t('terms.description'),
    "url": canonicalUrl,
    "inLanguage": currentLang === 'vi' ? 'vi-VN' : 'en-US',
    "about": {
      "@type": "Thing",
      "name": "Terms and Conditions"
    }
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen w-full text-white">
      <Helmet>
        <title>{`GOIncome - ${t('terms.title')}`}</title>
        <meta name="description" content={t('terms.description')} />
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />

        {/* Open Graph */}
        <meta property="og:title" content={`GOIncome - ${t('terms.title')}`} />
        <meta property="og:description" content={t('terms.description')} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GOIncome" />
        <meta property="og:locale" content={currentLang === 'vi' ? 'vi_VN' : 'en_US'} />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`GOIncome - ${t('terms.title')}`} />
        <meta name="twitter:description" content={t('terms.description')} />
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
        <meta name="robots" content="index, follow" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(termsPageSchema)}
        </script>
      </Helmet>
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24">
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-[#1a1a1a] to-[#1f1f1f] border border-[#262626] px-3 py-1.5 rounded-full mb-4 shadow-[0_6px_30px_rgba(0,0,0,0.25)]">
            <div className="size-1.5 bg-[#FFD11A] rounded-full" />
            <span className="text-[#98989a] text-xs tracking-[0.2em] uppercase">
              {t("terms.badge")}
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-4"
            style={{ fontFamily: "Kumbh Sans, sans-serif" }}
          >
            {t("terms.title")}
          </h1>
          <p className="text-[#b0b0b0] text-base sm:text-lg leading-relaxed max-w-3xl">
            {t("terms.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-2 rounded-full bg-[#FFD11A]" />
                <h2 className="text-white font-semibold text-lg sm:text-xl">{t("terms.sections.purpose.title")}</h2>
              </div>
              <p className="text-[#9ea0a5] leading-relaxed">
                {t("terms.sections.purpose.body")}
              </p>
            </section>

            <section className="bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-2 rounded-full bg-[#FFD11A]" />
                <h2 className="text-white font-semibold text-lg sm:text-xl">{t("terms.sections.responsibility.title")}</h2>
              </div>
              <p className="text-[#9ea0a5] leading-relaxed">
                {t("terms.sections.responsibility.body")}
              </p>
            </section>

            <section className="bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-2 rounded-full bg-[#FFD11A]" />
                <h2 className="text-white font-semibold text-lg sm:text-xl">{t("terms.sections.liability.title")}</h2>
              </div>
              <p className="text-[#9ea0a5] leading-relaxed">
                {t("terms.sections.liability.body")}
              </p>
            </section>

            <section className="bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-2 rounded-full bg-[#FFD11A]" />
                <h2 className="text-white font-semibold text-lg sm:text-xl">{t("terms.sections.changes.title")}</h2>
              </div>
              <p className="text-[#9ea0a5] leading-relaxed">
                {t("terms.sections.changes.body")}
              </p>
            </section>
          </div>

          <aside className="bg-linear-to-b from-[#161616] to-[#101010] border border-[#262626] rounded-2xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.35)] space-y-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-white font-semibold">{t("terms.aside.title")}</p>
                <p className="text-[#9ea0a5] text-sm leading-relaxed">
                  {t("terms.aside.description")}
                </p>
              </div>
            </div>
            <div className="border-t border-[#262626] pt-4">
              <p className="text-[#9ea0a5] text-sm leading-relaxed">
                {t("terms.aside.footnote")}
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

