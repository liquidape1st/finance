"use client";

import svgPaths from "../imports/svg-f8f5ykhcvu";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 border-t border-neutral-800">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 py-12 sm:py-14 md:py-16 border-b border-neutral-800">
        <div>
          <h4 className="text-white text-base sm:text-lg mb-5 sm:mb-7">{t('footer.home.title')}</h4>
          <ul className="space-y-2.5 sm:space-y-3 text-[#666666] text-sm">
            <li><a href="/" className="hover:text-white transition-colors">{t('footer.home.home')}</a></li>
            <li><a href="/blog" className="hover:text-white transition-colors">{t('footer.home.blog')}</a></li>
            <li className="flex items-center gap-2">
              <a href="/resources" className="hover:text-white transition-colors">{t('footer.home.resources')}</a>
              <span className="bg-[#1a1a1a] border border-neutral-800 px-2.5 py-0.5 rounded text-white text-xs">{t('footer.home.new')}</span>
            </li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.home.contact')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.home.newsletter')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base sm:text-lg mb-5 sm:mb-7">{t('footer.categories.title')}</h4>
          <ul className="space-y-2.5 sm:space-y-3 text-[#666666] text-sm">
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.categories.cryptocurrency')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.categories.stocks')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.categories.forex')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.categories.realEstate')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.categories.personalFinance')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base sm:text-lg mb-5 sm:mb-7">{t('footer.tools.title')}</h4>
          <ul className="space-y-2.5 sm:space-y-3 text-[#666666] text-sm">
            <li><a href="/resources" className="hover:text-white transition-colors">{t('footer.tools.calculator')}</a></li>
            <li><a href="/resources" className="hover:text-white transition-colors">{t('footer.tools.brokerComparison')}</a></li>
            <li className="flex items-center gap-2">
              <a href="/resources" className="hover:text-white transition-colors">{t('footer.tools.glossary')}</a>
              <span className="bg-[#1a1a1a] border border-neutral-800 px-2.5 py-0.5 rounded text-white text-xs">{t('footer.tools.new')}</span>
            </li>
            <li><a href="/resources" className="hover:text-white transition-colors">{t('footer.tools.basicGuides')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-base sm:text-lg mb-5 sm:mb-7">{t('footer.learning.title')}</h4>
          <ul className="space-y-2.5 sm:space-y-3 text-[#666666] text-sm">
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.learning.whatIsTrading')}</a></li>
            <li className="flex items-center gap-2 flex-wrap">
              <a href="#" className="hover:text-white transition-colors">{t('footer.learning.riskManagement')}</a>
              <span className="bg-[#1a1a1a] border border-neutral-800 px-2.5 py-0.5 rounded text-white text-xs">{t('footer.learning.important')}</span>
            </li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.learning.technicalAnalysis')}</a></li>
            <li><a href="#" className="hover:text-white transition-colors">{t('footer.learning.fundamentalAnalysis')}</a></li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <h4 className="text-white text-base sm:text-lg mb-5 sm:mb-7">{t('footer.resources.title')}</h4>
          <ul className="space-y-2.5 sm:space-y-3">
            <li>
              <button className="bg-[#141414] border border-neutral-800 w-full px-3.5 py-2 rounded-md text-[#98989a] text-sm hover:bg-[#1a1a1a] transition-colors flex items-center justify-between">
                {t('footer.resources.ebooks')}
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path clipRule="evenodd" d={svgPaths.p26466280} fill="#FFD11A" fillRule="evenodd" />
                </svg>
              </button>
            </li>
            <li>
              <button className="bg-[#141414] border border-neutral-800 w-full px-3.5 py-2 rounded-md text-[#98989a] text-sm hover:bg-[#1a1a1a] transition-colors flex items-center justify-between">
                {t('footer.resources.pdfGuides')}
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path clipRule="evenodd" d={svgPaths.p26466280} fill="#FFD11A" fillRule="evenodd" />
                </svg>
              </button>
            </li>
            <li>
              <button className="bg-[#141414] border border-neutral-800 w-full px-3.5 py-2 rounded-md text-[#98989a] text-sm hover:bg-[#1a1a1a] transition-colors flex items-center justify-between">
                {t('footer.resources.videoLearning')}
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path clipRule="evenodd" d={svgPaths.p26466280} fill="#FFD11A" fillRule="evenodd" />
                </svg>
              </button>
            </li>
            <li>
              <button className="bg-[#141414] border border-neutral-800 w-full px-3.5 py-2 rounded-md text-[#98989a] text-sm hover:bg-[#1a1a1a] transition-colors flex items-center justify-between">
                {t('footer.resources.checklist')}
                <svg className="size-[18px]" fill="none" viewBox="0 0 18 18">
                  <path clipRule="evenodd" d={svgPaths.p26466280} fill="#FFD11A" fillRule="evenodd" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-3 sm:gap-4 text-[#666666] text-xs sm:text-sm order-2 sm:order-1">
          <a href="/terms" className="hover:text-white transition-colors">{t('footer.legal.terms')}</a>
          <span className="text-[#262626]">|</span>
          <a href="/privacy" className="hover:text-white transition-colors">{t('footer.legal.privacy')}</a>
        </div>

        <p className="text-[#666666] text-xs sm:text-sm order-3 sm:order-2">{t('footer.legal.copyright')}</p>

        <div className="flex items-center gap-3 sm:gap-3.5 order-1 sm:order-3">
          <a href="#" className="text-white hover:text-[#ffd11a] transition-colors">
            <Twitter className="size-5" />
          </a>
          <a href="#" className="text-white hover:text-[#ffd11a] transition-colors">
            <Instagram className="size-5" />
          </a>
          <a href="#" className="text-white hover:text-[#ffd11a] transition-colors">
            <Linkedin className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}