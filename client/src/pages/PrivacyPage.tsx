import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import { useAppSelector } from "@/store";

export function PrivacyPage() {
  const { t } = useTranslation();
  const currentLang = useAppSelector((state) => state.locale.currentLang);
  const canonicalUrl = `${window.location.origin}/privacy`;
  const siteImage = `${window.location.origin}/logo.png`;

  const privacyPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('privacy.title'),
    "description": t('privacy.description'),
    "url": canonicalUrl,
    "inLanguage": currentLang === 'vi' ? 'vi-VN' : 'en-US',
    "about": {
      "@type": "Thing",
      "name": "Privacy Policy"
    }
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen w-full text-white">
      <SEO
        title={t('privacy.title')}
        description={t('privacy.description')}
        image={siteImage}
        imageAlt={t('privacy.title')}
        url={canonicalUrl}
        structuredData={privacyPageSchema}
      />
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20 md:pb-24">
        <div className="mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-[#1a1a1a] to-[#1f1f1f] border border-[#262626] px-3 py-1.5 rounded-full mb-4 shadow-[0_6px_30px_rgba(0,0,0,0.25)]">
            <div className="size-1.5 bg-[#FFD11A] rounded-full" />
            <span className="text-[#98989a] text-xs tracking-[0.2em] uppercase">
              {t("privacy.badge")}
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-4"
            style={{ fontFamily: "Kumbh Sans, sans-serif" }}
          >
            {t("privacy.title")}
          </h1>
          <p className="text-[#b0b0b0] text-base sm:text-lg leading-relaxed max-w-3xl">
            {t("privacy.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-2 rounded-full bg-[#FFD11A]" />
                <h2 className="text-white font-semibold text-lg sm:text-xl">{t("privacy.sections.collection.title")}</h2>
              </div>
              <p className="text-[#9ea0a5] leading-relaxed">
                {t("privacy.sections.collection.body")}
              </p>
            </section>

            <section className="bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-2 rounded-full bg-[#FFD11A]" />
                <h2 className="text-white font-semibold text-lg sm:text-xl">{t("privacy.sections.cookies.title")}</h2>
              </div>
              <p className="text-[#9ea0a5] leading-relaxed">
                {t("privacy.sections.cookies.body")}
              </p>
            </section>

            <section className="bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-2 rounded-full bg-[#FFD11A]" />
                <h2 className="text-white font-semibold text-lg sm:text-xl">{t("privacy.sections.sharing.title")}</h2>
              </div>
              <p className="text-[#9ea0a5] leading-relaxed">
                {t("privacy.sections.sharing.body")}
              </p>
            </section>

            <section className="bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 mb-3">
                <span className="size-2 rounded-full bg-[#FFD11A]" />
                <h2 className="text-white font-semibold text-lg sm:text-xl">{t("privacy.sections.changes.title")}</h2>
              </div>
              <p className="text-[#9ea0a5] leading-relaxed">
                {t("privacy.sections.changes.body")}
              </p>
            </section>
          </div>

          <aside className="bg-linear-to-b from-[#161616] to-[#101010] border border-[#262626] rounded-2xl p-6 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.35)] space-y-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-white font-semibold">{t("privacy.aside.title")}</p>
                <p className="text-[#9ea0a5] text-sm leading-relaxed">
                  {t("privacy.aside.description")}
                </p>
              </div>
            </div>
            <div className="border-t border-[#262626] pt-4">
              <p className="text-[#9ea0a5] text-sm leading-relaxed">
                {t("privacy.aside.footnote")}
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

