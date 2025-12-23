import appConfig from "@/configs/app.config";
import { getDetailClientBlogTranslation, useAppDispatch, useAppSelector } from "@/store";
import { ArrowLeft, Clock, Eye, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RandomAffiliateBanner } from "../components/RandomAffiliateBanner";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useEffect } from "react";
import { getClientBlogTranslationPage } from "@/store/slices/finance/financeSlice";
import { Helmet } from "react-helmet";

const getBlogImageUrl = (fileName: string, updatedAt: string) =>
  `${appConfig.apiPrefix}/s3/stream?fileName=${encodeURIComponent(fileName)}&v=${Date.parse(updatedAt) || 0}`;

export function BlogDetailPage() {
  const { lang, slug } = useParams()
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const currentLang = useAppSelector((state) => state.locale.currentLang)
  const blog_translation = useAppSelector((state) => state.finance.blog_translation)
  const blog = useAppSelector((state) => state.finance.selected_blog_translation)
  const { tableData } = useAppSelector((state) => state.finance)

  useEffect(() => {
    dispatch(getClientBlogTranslationPage(tableData))
  }, [])

  useEffect(() => {
    if (!lang || !slug) {
      return
    }
    dispatch(getDetailClientBlogTranslation({
      langCode: lang,
      slug: slug
    }))
  }, [lang, slug])

  const blogImageUrl = blog.image ? getBlogImageUrl(blog.image, blog.updatedAt) : '';
  const canonicalUrl = `${window.location.origin}/blog/${lang}/${slug}`;
  const blogListUrl = `${window.location.origin}/blog`;
  const alternateLang = lang === 'vi' ? 'en' : 'vi';
  const alternateUrl = `${window.location.origin}/blog/${alternateLang}/${slug}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blogImageUrl ? [{
      "@type": "ImageObject",
      "url": blogImageUrl,
      "width": 1200,
      "height": 630
    }] : [],
    "datePublished": blog.createdAt,
    "dateModified": blog.updatedAt,
    "url": canonicalUrl,
    "inLanguage": lang === 'vi' ? 'vi-VN' : 'en-US',
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "author": {
      "@type": "Organization",
      "name": "GOIncome",
      "url": window.location.origin
    },
    "publisher": {
      "@type": "Organization",
      "name": "GOIncome",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/logo.png`,
        "width": 512,
        "height": 512
      }
    },
    "articleSection": blog.category?.name || "Blog",
    "keywords": blog.category?.name || "",
    "wordCount": blog.content ? blog.content.replace(/<[^>]*>/g, '').split(/\s+/).length : 0
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": window.location.origin
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": blogListUrl
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{`GOIncome - ${blog.title}`}</title>
        <meta name="description" content={blog.excerpt} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`GOIncome - ${blog.title}`} />
        <meta property="og:description" content={blog.excerpt} />
        {blogImageUrl && <meta property="og:image" content={blogImageUrl} />}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="GOIncome" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`GOIncome - ${blog.title}`} />
        <meta name="twitter:description" content={blog.excerpt} />
        {blogImageUrl && <meta name="twitter:image" content={blogImageUrl} />}
        
        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang={lang === 'vi' ? 'vi-VN' : 'en-US'} href={canonicalUrl} />
        <link rel="alternate" hrefLang={alternateLang === 'vi' ? 'vi-VN' : 'en-US'} href={alternateUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        
        {/* Article Meta Tags */}
        <meta name="article:published_time" content={blog.createdAt} />
        <meta name="article:modified_time" content={blog.updatedAt} />
        <meta name="article:author" content="GOIncome" />
        <meta name="article:section" content={blog.category?.name || "Blog"} />
        {blog.category?.name && <meta name="article:tag" content={blog.category.name} />}
        
        {/* Additional SEO */}
        <meta name="theme-color" content="#141414" />
        <meta name="language" content={lang === 'vi' ? 'Vietnamese' : 'English'} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbData)}
        </script>
      </Helmet>
      <div className="bg-[#141414] min-h-screen w-full">
        <Navbar />

        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[#98989a] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            <span>{t("blogs.back", { defaultValue: "Back to blogs" })}</span>
          </button>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-3 py-1.5 rounded-full">
                  <Tag className="size-4 text-[#FFD11A]" />
                  <span className="text-[#98989a] text-xs uppercase tracking-wide">
                    {blog.category?.name ?? t("blogs.category", { defaultValue: "Blog" })}
                  </span>
                </div>
              </div>

              <h1 className="text-white text-3xl sm:text-4xl md:text-[42px] leading-tight tracking-tight mb-4" style={{ fontFamily: "Kumbh Sans, sans-serif" }}>
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-[#98989a] text-sm mb-8">
                {blog.createdAt && (
                  <time className="inline-flex items-center gap-2" dateTime={blog.createdAt} itemProp="datePublished">
                    <Clock className="size-4" />
                    {blog.createdAt}
                  </time>
                )}
                <span className="inline-flex items-center gap-2" aria-label={`${blog.view} views`}>
                  <Eye className="size-4" aria-hidden="true" />
                  {blog.view}
                </span>
              </div>

              <figure className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden mb-10 bg-[#1a1a1a]">
                <img
                  src={getBlogImageUrl(blog.image, blog.updatedAt)}
                  alt={blog.title}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={630}
                  className="absolute inset-0 w-full h-full object-cover"
                  itemProp="image"
                />
              </figure>

              <article className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-6 sm:p-8 text-white leading-7 space-y-4" itemScope itemType="https://schema.org/BlogPosting">
                <meta itemProp="headline" content={blog.title} />
                <meta itemProp="description" content={blog.excerpt} />
                {blogImageUrl && <meta itemProp="image" content={blogImageUrl} />}
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt || "" }}
                  itemProp="articleBody"
                />
              </article>
            </div>
            {/* Sidebar */}
            <aside className="col-span-1" aria-label="Related articles">
              <div className="flex flex-col gap-6 sticky top-0">
                <div>
                  <RandomAffiliateBanner />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {blog_translation.slice(0, 5).map((blog) => (
                    <Link
                      to={`/blog/${currentLang}/${blog.slug}`}
                      state={{ blog }}
                      key={`${currentLang}-${blog.id}`}
                      className="group flex flex-col cursor-pointer"
                    >
                      <article className="flex flex-col h-full">
                        <div className="relative h-[215px] rounded-[10px] overflow-hidden mb-4">
                          <img
                            src={getBlogImageUrl(blog.image, blog.updatedAt)}
                            loading="lazy"
                            decoding="async"
                            alt={blog.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex flex-col gap-2.5 flex-1">
                          <div className="flex flex-col gap-1">
                            <h3 className="text-white text-[16px] leading-normal tracking-[-0.48px] group-hover:text-[#FFD11A] transition-colors line-clamp-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                              {blog.title}
                            </h3>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[#98989a] text-[14px] tracking-[-0.42px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {blog?.category?.name}
                                </p>
                              </div>
                              <div className="flex items-center gap-[50px]">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-full">
                                    <Eye className="size-5 text-[#666666]" strokeWidth={1.5} />
                                    <span className="text-[#98989a] text-[14px] tracking-[-0.42px]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                                      {blog.view}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                <div>
                  <RandomAffiliateBanner />
                </div>
              </div>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}