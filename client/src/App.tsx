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

        <Route path="/news" element={<BlogsPage uiType="NEWS" preflix="news"/>} />
        <Route path="/news/:lang/:slug" element={<BlogDetailPage preflix="news" />} />

        <Route path="/learn" element={<BlogsPage uiType="LEARN" preflix="learn"/>} />
        <Route path="/learn/:lang/:slug" element={<BlogDetailPage preflix="learn" />} />

        <Route path="/guides" element={<BlogsPage uiType="GUIDE" preflix="guides"/>} />
        <Route path="/guides/:lang/:slug" element={<BlogDetailPage preflix="guides" />} />

        <Route path="/market" element={<BlogsPage uiType="MARKET" preflix="market"/>} />
        <Route path="/market/:lang/:slug" element={<BlogDetailPage preflix="market" />} />

        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </>
  );
}