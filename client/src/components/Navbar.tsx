import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "../locales/locales";
import svgPaths from "../imports/svg-f8f5ykhcvu";
import { setLang, useAppDispatch, useAppSelector } from "@/store";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const currentLang = useAppSelector((state) => state.locale.currentLang)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    dispatch(setLang(lng))
    window.location.reload()
  };
  
  const getCurrentPage = (): 'home' | 'blogs' | 'resources' | 'contact' => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/blogs') return 'blogs';
    if (location.pathname === '/resources') return 'resources';
    if (location.pathname === '/contact') return 'contact';
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
      <nav className="bg-[#1a1a1a] border-b border-neutral-800 w-full sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-5 flex items-center justify-between">
          {/* Finance Blog Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="relative size-10 sm:size-12 bg-linear-to-br from-[#FFD11A] to-[#FFA500] rounded-lg p-1.5 sm:p-2 shadow-lg shadow-[#FFD11A]/20 shrink-0">
              <svg className="size-full" viewBox="0 0 32 32" fill="none">
                {/* Chart bars going up */}
                <rect x="4" y="20" width="4" height="8" fill="#141414" rx="1"/>
                <rect x="10" y="14" width="4" height="14" fill="#141414" rx="1"/>
                <rect x="16" y="10" width="4" height="18" fill="#141414" rx="1"/>
                <rect x="22" y="6" width="4" height="22" fill="#141414" rx="1"/>
                {/* Trending arrow */}
                <path d="M26 8L28 6L30 8M28 6V12" stroke="#141414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <h1 className="text-white text-lg sm:text-xl md:text-2xl tracking-tight" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                  GO
                </h1>
                <span className="text-[#FFD11A] text-lg sm:text-xl md:text-2xl" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>Income</span>
              </div>
              <p className="text-[#666666] text-xs tracking-wide hidden sm:block">{t('nav.platform')}</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`text-sm transition-colors ${currentPage === 'home' ? 'text-white' : 'text-[#7e7e81] hover:text-white'}`}>
              {t('nav.home')}
            </Link>
            <Link to="/blogs" className={`text-sm transition-colors ${currentPage === 'blogs' ? 'text-white' : 'text-[#7e7e81] hover:text-white'}`}>
              {t('nav.blog')}
            </Link>
            <Link 
              to="/resources" 
              className={`px-[18px] py-2.5 rounded-md text-sm transition-colors ${
                currentPage === 'resources' 
                  ? 'bg-[#262626] border border-[#333333] text-white' 
                  : 'bg-[#141414] border border-[#333333] text-white hover:bg-[#1a1a1a]'
              }`}
            >
              {t('nav.resources')}
            </Link>
          </div>

          {/* Language Switcher & CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-[#141414] border border-[#333333] rounded-md overflow-hidden">
              <button
                onClick={() => changeLanguage('vi')}
                className={`px-3.5 py-2.5 text-sm transition-colors ${
                  currentLang === 'vi' 
                    ? 'bg-[#ffd11a] text-[#141414]' 
                    : 'text-[#98989a] hover:text-white'
                }`}
              >
                VI
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className={`px-3.5 py-2.5 text-sm transition-colors ${
                  currentLang === 'en' 
                    ? 'bg-[#ffd11a] text-[#141414]' 
                    : 'text-[#98989a] hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
            <Link
              to="/contact"
              className={`px-3.5 py-2.5 rounded-md text-sm transition-colors ${
                currentPage === 'contact'
                  ? 'bg-[#ffd11a] text-[#141414]'
                  : 'bg-[#141414] text-white hover:bg-[#ffd11a] hover:text-[#141414]'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-800 bg-[#1a1a1a]">
            <div className="px-4 py-4 flex flex-col gap-4">
              <Link 
                to="/" 
                className={`text-sm transition-colors py-2 ${currentPage === 'home' ? 'text-white' : 'text-[#7e7e81]'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/blogs" 
                className={`text-sm transition-colors py-2 ${currentPage === 'blogs' ? 'text-white' : 'text-[#7e7e81]'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.blog')}
              </Link>
              <Link 
                to="/resources" 
                className={`px-4 py-2.5 rounded-md text-sm transition-colors text-center ${
                  currentPage === 'resources' 
                    ? 'bg-[#262626] border border-[#333333] text-white' 
                    : 'bg-[#141414] border border-[#333333] text-white'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.resources')}
              </Link>
              <div className="flex items-center gap-2 bg-[#141414] border border-[#333333] rounded-md overflow-hidden">
                <button
                  onClick={() => changeLanguage('vi')}
                  className={`flex-1 px-3 py-2 text-xs transition-colors ${
                    i18n.language === 'vi' 
                      ? 'bg-[#ffd11a] text-[#141414]' 
                      : 'text-[#98989a] hover:text-white'
                  }`}
                >
                  VN
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`flex-1 px-3 py-2 text-xs transition-colors ${
                    i18n.language === 'en' 
                      ? 'bg-[#ffd11a] text-[#141414]' 
                      : 'text-[#98989a] hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
              <Link
                to="/contact"
                className="bg-[#ffd11a] px-4 py-2.5 rounded-md text-[#141414] text-sm w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}