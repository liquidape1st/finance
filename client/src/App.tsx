import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useAppSelector } from "./store";
import { Helmet } from "react-helmet-async";

// Lazy load pages for code splitting - reduces initial bundle by ~60%
const HomePage = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const BlogsPage = lazy(() => import("./pages/BlogsPage").then(m => ({ default: m.BlogsPage })));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage").then(m => ({ default: m.BlogDetailPage })));
// const ResourcesPage = lazy(() => import("./pages/ResourcesPage").then(m => ({ default: m.ResourcesPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })));
const TermsPage = lazy(() => import("./pages/TermsPage").then(m => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage").then(m => ({ default: m.PrivacyPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then(m => ({ default: m.NotFoundPage })));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#FFD11A] border-t-transparent rounded-full animate-spin" />
        <span className="text-[#98989a] text-sm">Đang tải...</span>
      </div>
    </div>
  );
}


export default function App() {
  const location = useLocation();
  const currentLang = useAppSelector((state) => state.locale.currentLang);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Update HTML lang attribute based on current language
  useEffect(() => {
    document.documentElement.lang = currentLang === 'vi' ? 'vi-VN' : 'en-US';
  }, [currentLang]);

  return (
    <>
      <Helmet>
        <html lang={currentLang === 'vi' ? 'vi-VN' : 'en-US'} />
      </Helmet>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/news" element={<BlogsPage uiType="NEWS" prefix="news" />} />
          <Route path="/news/:lang/:slug" element={<BlogDetailPage prefix="news" />} />

          <Route path="/learn" element={<BlogsPage uiType="LEARN" prefix="learn" />} />
          <Route path="/learn/:lang/:slug" element={<BlogDetailPage prefix="learn" />} />

          <Route path="/guides" element={<BlogsPage uiType="GUIDE" prefix="guides" />} />
          <Route path="/guides/:lang/:slug" element={<BlogDetailPage prefix="guides" />} />

          <Route path="/market" element={<BlogsPage uiType="MARKET" prefix="market" />} />
          <Route path="/market/:lang/:slug" element={<BlogDetailPage prefix="market" />} />

          {/* <Route path="/resources" element={<ResourcesPage />} /> */}
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />

          {/* 404 Not Found - Must be last */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}