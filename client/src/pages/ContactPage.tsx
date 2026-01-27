import { FormEvent, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import { useAppSelector } from "@/store";

export function ContactPage() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const to = "contact@goinsight.org";
    const mailSubject = encodeURIComponent(subject || t("contact.mail.defaultSubject"));
    const bodyLines = [
      `${t("contact.mail.nameLabel")} ${name || t("contact.mail.missingValue")}`,
      `${t("contact.mail.emailLabel")} ${email || t("contact.mail.missingValue")}`,
      "",
      t("contact.mail.contentLabel"),
      message || t("contact.mail.missingValue")
    ];

    const mailBody = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${to}?subject=${mailSubject}&body=${mailBody}`;
  };

  const canonicalUrl = `${window.location.origin}/contact`;
  const siteImage = `${window.location.origin}/logo.png`;
  const currentLang = useAppSelector((state) => state.locale.currentLang);
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": t('contact.title'),
    "description": t('contact.description'),
    "url": canonicalUrl,
    "inLanguage": currentLang === 'vi' ? 'vi-VN' : 'en-US',
    "mainEntity": {
      "@type": "Organization",
      "name": "GOInsight",
      "email": "contact@goinsight.org",
      "url": window.location.origin,
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact@goinsight.org",
        "contactType": "customer service"
      }
    }
  };

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <SEO
        title={t('contact.title')}
        description={t('contact.description')}
        image={siteImage}
        imageAlt={t('contact.title')}
        url={canonicalUrl}
        structuredData={contactPageSchema}
      />
      <Navbar />

      <main className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start" aria-label="Contact information and form">
          <div>
            <div className="bg-[#333333] inline-block px-3 py-1 rounded mb-3 sm:mb-4">
              <span className="text-white text-xs sm:text-sm">{t("contact.badge")}</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-5 tracking-tight leading-tight"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              {t("contact.title")}
            </h1>
            <p className="text-[#98989a] text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-xl">
              {t("contact.description")}
            </p>

            <div className="space-y-3 text-sm sm:text-base">
              <p className="text-[#98989a]">
                {t("contact.supportEmail")}&nbsp;
                <a
                  href="mailto:contact@goinsight.org"
                  className="text-[#FFD11A] hover:underline"
                >
                  contact@goinsight.org
                </a>
              </p>
              <p className="text-[#666666] text-xs sm:text-sm leading-relaxed">
                {t("contact.note")}
              </p>
            </div>
          </div>

          <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-6 sm:p-8">
            <h2
              className="text-xl sm:text-2xl text-white mb-4 sm:mb-6"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              {t("contact.form.title")}
            </h2>

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="contact-name" className="block text-sm text-[#98989a] mb-1.5">
                  {t("contact.form.nameLabel")}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-required="false"
                  className="w-full bg-[#141414] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#FFD11A]/40 transition-colors"
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm text-[#98989a] mb-1.5">
                  {t("contact.form.emailLabel")}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-required="false"
                  className="w-full bg-[#141414] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#FFD11A]/40 transition-colors"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-sm text-[#98989a] mb-1.5">
                  {t("contact.form.subjectLabel")}
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  aria-required="false"
                  className="w-full bg-[#141414] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#FFD11A]/40 transition-colors"
                  placeholder={t("contact.form.subjectPlaceholder")}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm text-[#98989a] mb-1.5">
                  {t("contact.form.messageLabel")}
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  aria-required="false"
                  className="w-full bg-[#141414] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#FFD11A]/40 transition-colors resize-none"
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FFD11A] text-[#141414] rounded-lg py-2.5 sm:py-3 text-sm sm:text-base font-medium hover:bg-[#ffdb4d] transition-colors"
              >
                {t("contact.form.submit")}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

