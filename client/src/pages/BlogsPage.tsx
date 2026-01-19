import appConfig from "@/configs/app.config";
import { getClientBlogTranslationPage, getListClientCategoryTranslation, useAppDispatch, useAppSelector } from "@/store";
import { setTableData } from "@/store/slices/finance/financeSlice";
import { debounce } from "lodash";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { BlogCard } from "../components/BlogCard";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

type BlogsPageProps = {
  uiType: 'NEWS' | 'GUIDE' | 'MARKET' | 'LEARN',
  preflix: string
}

export function BlogsPage({ uiType, preflix }: BlogsPageProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const { blog_translation, category_translation, tableData, isLoadingBlogPostList } = useAppSelector((state) => state.finance)
  const currentLang = useAppSelector((state) => state.locale.currentLang)
  const [search, setSearch] = useState('')

  // Stable URL that stays cacheable but changes when the image is updated
  const getBlogImageUrl = (fileName: string, updatedAt: string) =>
    `${appConfig.apiPrefix}/s3/stream?fileName=${encodeURIComponent(fileName)}&v=${Date.parse(updatedAt) || 0}`

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        dispatch(setTableData({ ...tableData, query: value }))
      }, 500),
    [dispatch]
  )

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  useEffect(() => {
    if (uiType) {
      dispatch(setTableData({ ...tableData, uiType: uiType }))
      dispatch(getListClientCategoryTranslation(uiType))
    }
  }, [uiType])

  // useEffect(() => {
  //   console.log('currentLang: ', currentLang)
  //   dispatch(getClientBlogTranslationPage(tableData))
  // }, [dispatch, currentLang])

  useEffect(() => {
    if (tableData.uiType) {
      dispatch(getClientBlogTranslationPage(tableData))
    }
  }, [tableData.category, tableData.pageIndex, tableData.query, tableData.uiType, currentLang])

  const canonicalUrl = `${window.location.origin}/${preflix}`;
  const siteImage = `${window.location.origin}/logo.png`;
  const alternateLang = currentLang === 'vi' ? 'en' : 'vi';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t(`blogs.${uiType.toLowerCase()}.title`),
    "description": t(`blogs.${uiType.toLowerCase()}.description`),
    "url": canonicalUrl,
    "inLanguage": currentLang === 'vi' ? 'vi-VN' : 'en-US',
    "publisher": {
      "@type": "Organization",
      "name": "GOIncome",
      "logo": {
        "@type": "ImageObject",
        "url": siteImage,
        "width": 512,
        "height": 512
      }
    }
  };

  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t(`blogs.${uiType.toLowerCase()}.title`),
    "description": t(`blogs.${uiType.toLowerCase()}.description`),
    "numberOfItems": blog_translation.length,
    "itemListElement": blog_translation.slice(0, 10).map((blog, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.excerpt,
        "url": `${window.location.origin}/${preflix}/${currentLang}/${blog.slug}`,
        "image": getBlogImageUrl(blog.image, blog.updatedAt)
      }
    }))
  };



  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <Helmet>
        <title>{`GOIncome - ${t(`blogs.${uiType.toLowerCase()}.title`)}`}</title>
        <meta name="description" content={t(`blogs.${uiType.toLowerCase()}.description`)} />
        <meta name="robots" content="index,follow" />

        {/* Open Graph */}
        <meta property="og:title" content={`GOIncome - ${t(`blogs.${uiType.toLowerCase()}.title`)}`} />
        <meta property="og:description" content={t(`blogs.${uiType.toLowerCase()}.description`)} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GOIncome" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`GOIncome - ${t(`blogs.${uiType.toLowerCase()}.title`)}`} />
        <meta name="twitter:description" content={t(`blogs.${uiType.toLowerCase()}.description`)} />
        <meta name="twitter:image" content={siteImage} />

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang={currentLang === 'vi' ? 'vi-VN' : 'en-US'} href={canonicalUrl} />
        <link rel="alternate" hrefLang={alternateLang === 'vi' ? 'vi-VN' : 'en-US'} href={`${canonicalUrl}?lang=${alternateLang}`} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

        {/* Additional SEO */}
        <meta name="theme-color" content="#141414" />
        <meta name="language" content={currentLang === 'vi' ? 'Vietnamese' : 'English'} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        {/* ItemList Schema */}
        <script type="application/ld+json">
          {JSON.stringify(itemListData)}
        </script>
      </Helmet>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16" aria-label="Blog listing">
          <div className="mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-3 py-1.5 rounded-full mb-4">
              <div className="size-1.5 bg-[#FFD11A] rounded-full"></div>
              <span className="text-[#98989a] text-xs tracking-wider uppercase">{t('blogs.badge')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-3" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
              {t(`blogs.${uiType.toLowerCase()}.title`)}
            </h1>
            <p className="text-[#7e7e81] text-base sm:text-lg leading-relaxed max-w-2xl">
              {t(`blogs.${uiType.toLowerCase()}.description`)}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <label htmlFor="blog-search" className="sr-only">
              {t('blogs.searchPlaceholder')}
            </label>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#666666]" aria-hidden="true" />
            <input
              id="blog-search"
              type="search"
              value={search}
              onChange={e => {
                setSearch(e.target.value)
                debouncedSearch(e.target.value)
              }}
              placeholder={t('blogs.searchPlaceholder')}
              aria-label={t('blogs.searchPlaceholder')}
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg pl-12 pr-4 py-3.5 text-white placeholder:text-[#666666] focus:border-[#FFD11A]/40 focus:outline-none transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${tableData.category === ""
                ? 'bg-[#FFD11A] text-[#141414]'
                : 'bg-[#1a1a1a] border border-[#262626] text-[#98989a] hover:border-[#FFD11A]/40 hover:text-white'
                }`}
              onClick={() => dispatch(setTableData({ ...tableData, category: "" }))}
            >
              {t('blogs.categories.all')}
            </button>
            {category_translation.map((category) => (
              <button
                key={`${currentLang}-${category.id}`}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${tableData.category === category.categoryId
                  ? 'bg-[#FFD11A] text-[#141414]'
                  : 'bg-[#1a1a1a] border border-[#262626] text-[#98989a] hover:border-[#FFD11A]/40 hover:text-white'
                  }`}
                onClick={() => dispatch(setTableData({ ...tableData, category: category.categoryId }))}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* Blog Grid - Figma Style Cards */}
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pb-20 sm:pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" key={preflix}>
            {isLoadingBlogPostList && blog_translation.length === 0
              ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="flex flex-col h-full animate-pulse"
                  aria-hidden="true"
                >
                  <div className="relative h-53.75 rounded-[10px] overflow-hidden mb-4 bg-[#1f1f1f]">
                    <div className="absolute inset-0 bg-linear-to-r from-[#1f1f1f] via-[#262626] to-[#1f1f1f]" />
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="space-y-2">
                      <div className="h-4 bg-[#262626] rounded w-4/5" />
                      <div className="h-3 bg-[#1f1f1f] rounded w-2/5" />
                    </div>
                    <div className="flex items-center gap-12.5 mt-2">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-full">
                          <div className="size-5 rounded-full bg-[#262626]" />
                          <div className="h-3 w-10 bg-[#262626] rounded" />
                        </div>
                      </div>
                      <div className="flex-1 bg-[#141414] border border-[#262626] rounded-lg px-5 py-3.5 flex items-center justify-center gap-1">
                        <div className="h-3 w-20 bg-[#1f1f1f] rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
              : blog_translation.map((blog) => (
                <BlogCard
                  key={`${currentLang}-${blog.id}-${blog.updatedAt}-${preflix}`}
                  blog={blog}
                  currentLang={currentLang || 'vi'}
                  prefix={preflix}
                  showBadge={true}
                  showReadMore={true}
                />
              ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-8 py-4 rounded-lg text-white hover:border-[#FFD11A]/40 hover:bg-[#1f1f1f] transition-all group">
              <span>{t('blogs.loadMore')}</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
        {/* Newsletter CTA */}
      </main>

      <Footer />
    </div>
  );
}