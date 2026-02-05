import appConfig from "@/configs/app.config";
import { getClientBlogTranslationPage, getListClientCategoryTranslation, useAppDispatch, useAppSelector } from "@/store";
import { setTableData } from "@/store/slices/finance/financeSlice";
import debounce from "lodash/debounce";
import { ArrowRight, Search, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SEO from "../components/SEO";
import { useTranslation } from "react-i18next";
import { BlogCard } from "../components/BlogCard";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { BackToTop } from "../components/BackToTop";
import { BlogCardSkeleton } from "../components/SkeletonShimmer";

type BlogsPageProps = {
  uiType: 'NEWS' | 'GUIDE' | 'MARKET' | 'LEARN',
  prefix: string
}

export function BlogsPage({ uiType, prefix }: BlogsPageProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const { blog_translation, category_translation, tableData, isLoadingBlogPostList } = useAppSelector((state) => state.finance)
  const currentLang = useAppSelector((state) => state.locale.currentLang)
  const [search, setSearch] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // Stable URL that stays cacheable but changes when the image is updated
  const getBlogImageUrl = (fileName: string, updatedAt: string) =>
    `${appConfig.apiPrefix}/s3/stream?fileName=${encodeURIComponent(fileName)}&v=${Date.parse(updatedAt) || 0}`

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string, currentTableData: any) => {
        dispatch(setTableData({ ...currentTableData, query: value, pageIndex: 1 }))
        setIsSearching(false)
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

  const canonicalUrl = `${window.location.origin}/${prefix}`;
  const siteImage = `${window.location.origin}/logo.png`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t(`blogs.${uiType.toLowerCase()}.title`),
    "description": t(`blogs.${uiType.toLowerCase()}.description`),
    "url": canonicalUrl,
    "inLanguage": currentLang === 'vi' ? 'vi-VN' : 'en-US',
    "publisher": {
      "@type": "Organization",
      "name": "GOInsight",
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
        "url": `${window.location.origin}/${prefix}/${currentLang}/${blog.slug}`,
        "image": getBlogImageUrl(blog.image, blog.updatedAt)
      }
    }))
  };



  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <SEO
        title={t(`blogs.${uiType.toLowerCase()}.title`)}
        description={t(`blogs.${uiType.toLowerCase()}.description`)}
        image={siteImage}
        imageAlt={t(`blogs.${uiType.toLowerCase()}.title`)}
        url={canonicalUrl}
        structuredData={[structuredData, itemListData]}
      />
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16" aria-label="Blog listing">
          <div className="mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-3 py-1.5 rounded-full mb-4">
              <div className="size-1.5 bg-[#FFD11A] rounded-full"></div>
              <span className="text-[#98989a] text-xs tracking-wider uppercase">{t('blogs.badge')}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t(`blogs.${uiType.toLowerCase()}.title`)}
            </h1>
            <p className="text-[#7e7e81] text-base sm:text-lg leading-relaxed max-w-2xl">
              {t(`blogs.${uiType.toLowerCase()}.description`)}
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8 group">
            <label htmlFor="blog-search" className="sr-only">
              {t('blogs.searchPlaceholder')}
            </label>
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              {isSearching ? (
                <Loader2 className="size-5 text-[#FFD11A] animate-spin" aria-label="Searching..." />
              ) : (
                <Search className="size-5 text-[#666666] group-focus-within:text-[#FFD11A] transition-colors" aria-hidden="true" />
              )}
            </div>
            <input
              id="blog-search"
              type="search"
              value={search}
              onChange={e => {
                setSearch(e.target.value)
                setIsSearching(true)
                debouncedSearch(e.target.value, tableData)
              }}
              placeholder={t('blogs.searchPlaceholder')}
              aria-label={t('blogs.searchPlaceholder')}
              className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg pl-12 pr-4 py-3.5 text-white placeholder:text-[#666666] focus:border-[#FFD11A]/40 focus:outline-none focus:ring-2 focus:ring-[#FFD11A]/20 transition-all"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" key={prefix}>
            {isLoadingBlogPostList && blog_translation.length === 0
              ? Array.from({ length: 6 }).map((_, index) => (
                <BlogCardSkeleton key={`skeleton-${index}`} className={`animate-fade-in delay-${index * 75}`} />
              ))
              : blog_translation.map((blog, index) => (
                <div key={`${currentLang}-${blog.id}-${blog.updatedAt}-${prefix}`} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <BlogCard
                    blog={blog}
                    currentLang={currentLang || 'vi'}
                    prefix={prefix}
                    showBadge={true}
                    showReadMore={true}
                  />
                </div>
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
      <BackToTop />
    </div>
  );
}