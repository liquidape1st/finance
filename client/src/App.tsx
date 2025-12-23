import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HomePage } from "./pages/HomePage";
import { BlogsPage } from "./pages/BlogsPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { ContactPage } from "./pages/ContactPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { useAppSelector } from "./store";
import { Helmet } from "react-helmet";


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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blog/:lang/:slug" element={<BlogDetailPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </>
  );
}