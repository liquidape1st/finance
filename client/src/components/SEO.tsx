import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  structuredData?: object;
}

const defaultTitle = 'GOIncome - Blog Tài Chính Cá Nhân, Hướng Dẫn Affiliate Forex & Hoàn Phí Sàn Giao Dịch';
const defaultDescription = 'GOIncome cung cấp kiến thức tài chính cá nhân, hướng dẫn affiliate forex, hoàn phí sàn giao dịch và so sánh các sàn giao dịch uy tín. Tài nguyên chuyên nghiệp cho nhà đầu tư.';
const defaultImage = 'https://goincome.net/logo.png';
const siteUrl = 'https://goincome.net';

export function SEO({
  title,
  description = defaultDescription,
  keywords,
  image = defaultImage,
  type = 'website',
  noindex = false,
  structuredData,
}: SEOProps) {
  const location = useLocation();
  const fullTitle = title ? `${title} | GOIncome` : defaultTitle;
  const canonicalUrl = `${siteUrl}${location.pathname}`;
  const ogImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="GOIncome" />
      <meta property="og:locale" content="vi_VN" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

