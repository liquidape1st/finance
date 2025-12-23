import { FormEvent, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useTranslation } from "react-i18next";

export function ContactPage() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const to = "contact@goincome.vn";
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

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <div className="bg-[#333333] inline-block px-3 py-1 rounded mb-3 sm:mb-4">
              <span className="text-white text-xs sm:text-sm">{t("contact.badge")}</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-5 tracking-tight leading-tight"
              style={{ fontFamily: "Kumbh Sans, sans-serif" }}
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
                  href="mailto:contact@goincome.vn"
                  className="text-[#FFD11A] hover:underline"
                >
                  contact@goincome.vn
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
              style={{ fontFamily: "Kumbh Sans, sans-serif" }}
            >
              {t("contact.form.title")}
            </h2>

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-[#98989a] mb-1.5">
                  {t("contact.form.nameLabel")}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#141414] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#FFD11A]/40 transition-colors"
                  placeholder={t("contact.form.namePlaceholder")}
                />
              </div>

              <div>
                <label className="block text-sm text-[#98989a] mb-1.5">
                  {t("contact.form.emailLabel")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#141414] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#FFD11A]/40 transition-colors"
                  placeholder={t("contact.form.emailPlaceholder")}
                />
              </div>

              <div>
                <label className="block text-sm text-[#98989a] mb-1.5">
                  {t("contact.form.subjectLabel")}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#141414] border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-[#666666] focus:outline-none focus:border-[#FFD11A]/40 transition-colors"
                  placeholder={t("contact.form.subjectPlaceholder")}
                />
              </div>

              <div>
                <label className="block text-sm text-[#98989a] mb-1.5">
                  {t("contact.form.messageLabel")}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
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

