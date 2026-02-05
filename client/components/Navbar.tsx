"use client";

import { usePathname } from 'next/navigation';
import { useState } from "react";
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import i18n from "../locales/locales";
import svgPaths from "../imports/svg-f8f5ykhcvu";
import { setLang, useAppDispatch, useAppSelector } from "@/store";

import logoImage from "@/assets/logo/logo.png";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = usePathname();
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const currentLang = useAppSelector((state) => state.locale.currentLang)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    dispatch(setLang(lng))
    window.location.reload()
  };

  const getCurrentPage = (): 'home' | 'news' | 'learn' | 'guides' | 'market' | 'resources' | 'contact' => {
    const pathname = location || '/';
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/news')) return 'news';
    if (pathname.startsWith('/learn')) return 'learn';
    if (pathname.startsWith('/guides')) return 'guides';
    if (pathname.startsWith('/market')) return 'market';
    if (pathname.startsWith('/resources')) return 'resources';
    if (pathname.startsWith('/contact')) return 'contact';
    return 'home';
  };

  const currentPage = getCurrentPage();

  return (
    <>
      {/* Top Banner */}
      <div className="bg-[#141414] border-b border-neutral-800 w-full">
        <div className="flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3">
          <p className="text-[#98989a] text-xs sm:text-sm tracking-tight text-center">
            {t('nav.newsletter')}
          </p>
          <svg className="ml-2 size-4 sm:size-5 shrink-0" fill="none" viewBox="0 0 20 20">
            <path clipRule="evenodd" d={svgPaths.p19aaf200} fill="#FFD11A" fillRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-[#1a1a1a]/95 backdrop-blur-md border-b border-neutral-800 w-full sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-5 flex items-center justify-between">
          {/* Finance Blog Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="relative size-10 sm:size-12 bg-linear-to-br from-[#FFD11A] to-[#FFA500] rounded-lg p-1.5 sm:p-2 shadow-lg shadow-[#FFD11A]/20 shrink-0">
              <img src={typeof logoImage === 'string' ? logoImage : (logoImage as { src: string }).src} alt="GO Insight" className="scale-[280%]" />
            </div>
            <div>
              <div className="flex items-baseline">
                <h1 className="text-white text-lg sm:text-xl md:text-2xl tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                  GO
                </h1>
                <span className="text-[#FFD11A] text-lg sm:text-xl md:text-2xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Insight</span>
              </div>
              <p className="text-[#666666] text-xs tracking-wide hidden sm:block">{t('nav.platform')}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm transition-colors ${currentPage === 'home'
                ? 'text-white'
                : 'text-[#7e7e81] hover:text-white'
                }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/news"
              className={`text-sm transition-colors ${currentPage === 'news'
                ? 'text-white'
                : 'text-[#7e7e81] hover:text-white'
                }`}
            >
              {t('nav.news')}
            </Link>
            <Link
              href="/learn"
              className={`text-sm transition-colors ${currentPage === 'learn'
                ? 'text-white'
                : 'text-[#7e7e81] hover:text-white'
                }`}
            >
              {t('nav.learn')}
            </Link>
            <Link
              href="/guides"
              className={`text-sm transition-colors ${currentPage === 'guides'
                ? 'text-white'
                : 'text-[#7e7e81] hover:text-white'
                }`}
            >
              {t('nav.guides')}
            </Link>
            <Link
              href="/market"
              className={`text-sm transition-colors ${currentPage === 'market'
                ? 'text-white'
                : 'text-[#7e7e81] hover:text-white'
                }`}
            >
              {t('nav.markets')}
            </Link>
            {/* <Link
              href="/resources"
              className={`px-4.5 py-2.5 rounded-md text-sm transition-colors ${
                currentPage === 'resources'
                  ? 'bg-[#262626] border border-[#333333] text-white'
                  : 'bg-[#141414] border border-[#333333] text-white hover:bg-[#1a1a1a]'
              }`}
            >
              {t('nav.resources')}
            </Link> */}
          </div>

          {/* Language Switcher & CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#141414] border border-[#333333] rounded-md overflow-hidden">
              <button
                onClick={() => changeLanguage('vi')}
                className={`px-3.5 py-2.5 text-sm transition-colors ${currentLang === 'vi'
                  ? 'bg-[#ffd11a] text-[#141414]'
                  : 'text-[#98989a] hover:text-white'
                  }`}
              >
                VI
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3.5 py-2.5 text-sm transition-colors ${currentLang === 'en'
                  ? 'bg-[#ffd11a] text-[#141414]'
                  : 'text-[#98989a] hover:text-white'
                  }`}
              >
                EN
              </button>
            </div>
            <Link
              href="/contact"
              className={`px-3.5 py-2.5 rounded-md text-sm transition-colors ${currentPage === 'contact'
                ? 'bg-[#ffd11a] text-[#141414]'
                : 'bg-[#141414] text-white hover:bg-[#ffd11a] hover:text-[#141414]'
                }`}
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-[#262626] rounded-lg transition-colors focus-ring"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative size-6">
              <span className={`absolute left-0 top-1 w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`absolute left-0 top-3 w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 translate-x-2' : ''}`} />
              <span className={`absolute left-0 top-5 w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden border-t border-neutral-800 bg-[#1a1a1a]/98 backdrop-blur-md
            overflow-hidden transition-all duration-300 ease-out
            ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="px-4 py-4 flex flex-col gap-3">
            <Link
              href="/"
              className={`text-sm transition-all py-2.5 px-3 rounded-lg ${currentPage === 'home' ? 'text-white bg-[#262626]' : 'text-[#7e7e81] hover:text-white hover:bg-[#1f1f1f]'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              href="/news"
              className={`text-sm transition-all py-2.5 px-3 rounded-lg ${currentPage === 'news' ? 'text-white bg-[#262626]' : 'text-[#7e7e81] hover:text-white hover:bg-[#1f1f1f]'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.news')}
            </Link>
            <Link
              href="/learn"
              className={`text-sm transition-all py-2.5 px-3 rounded-lg ${currentPage === 'learn' ? 'text-white bg-[#262626]' : 'text-[#7e7e81] hover:text-white hover:bg-[#1f1f1f]'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.learn')}
            </Link>
            <Link
              href="/guides"
              className={`text-sm transition-all py-2.5 px-3 rounded-lg ${currentPage === 'guides' ? 'text-white bg-[#262626]' : 'text-[#7e7e81] hover:text-white hover:bg-[#1f1f1f]'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.guides')}
            </Link>
            <Link
              href="/market"
              className={`text-sm transition-all py-2.5 px-3 rounded-lg ${currentPage === 'market' ? 'text-white bg-[#262626]' : 'text-[#7e7e81] hover:text-white hover:bg-[#1f1f1f]'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.markets')}
            </Link>
            <div className="flex items-center gap-2 bg-[#141414] border border-[#333333] rounded-lg overflow-hidden mt-2">
              <button
                onClick={() => changeLanguage('vi')}
                className={`flex-1 px-3 py-2.5 text-xs transition-all ${i18n.language === 'vi'
                  ? 'bg-[#ffd11a] text-[#141414] font-medium'
                  : 'text-[#98989a] hover:text-white hover:bg-[#1f1f1f]'
                  }`}
              >
                VN
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`flex-1 px-3 py-2.5 text-xs transition-all ${i18n.language === 'en'
                  ? 'bg-[#ffd11a] text-[#141414] font-medium'
                  : 'text-[#98989a] hover:text-white hover:bg-[#1f1f1f]'
                  }`}
              >
                EN
              </button>
            </div>
            <Link
              href="/contact"
              className="bg-[#ffd11a] px-4 py-3 rounded-lg text-[#141414] text-sm font-medium w-full text-center hover:bg-[#ffdb4d] transition-colors shadow-lg shadow-[#FFD11A]/20 mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}