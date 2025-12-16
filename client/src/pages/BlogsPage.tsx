import appConfig from "@/configs/app.config";
import { getClientBlogTranslationPage, getListClientCategoryTranslation, useAppDispatch, useAppSelector } from "@/store";
import { ArrowRight, Eye, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { setTableData } from "@/store/slices/finance/financeSlice";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

export function BlogsPage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const { blog_translation, category_translation, tableData } = useAppSelector((state) => state.finance)
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
    console.log('currentLang: ', currentLang)
    dispatch(getListClientCategoryTranslation())
    dispatch(getClientBlogTranslationPage(tableData))
  }, [dispatch, currentLang])


  useEffect(() => {
    dispatch(getClientBlogTranslationPage(tableData))
  }, [tableData.category, tableData.pageIndex, tableData.query])

  return (
    <div className="bg-[#141414] min-h-screen w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16">
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-3 py-1.5 rounded-full mb-4">
            <div className="size-1.5 bg-[#FFD11A] rounded-full"></div>
            <span className="text-[#98989a] text-xs tracking-wider uppercase">{t('blogs.badge')}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-3" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
            {t('blogs.title')}
          </h1>
          <p className="text-[#7e7e81] text-base sm:text-lg leading-relaxed max-w-2xl">
            {t('blogs.description')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#666666]" />
          <input
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              debouncedSearch(e.target.value)
            }}
            placeholder={t('blogs.searchPlaceholder')}
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
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pb-20 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blog_translation.map((blog) => (
            <Link
              to={`/blogs/${currentLang}/${blog.slug}`}
              state={{ blog }}
              key={`${currentLang}-${blog.id}`}
              className="group flex flex-col cursor-pointer"
            >
              <article className="flex flex-col h-full">
                {/* Image */}
                <div className="relative h-[185px] rounded-[10px] overflow-hidden mb-4">
                  <img
                    src={getBlogImageUrl(blog.image, blog.updatedAt)}
                    loading="lazy"
                    decoding="async"
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2.5 flex-1">
                  {/* Title & Category */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-white text-[16px] leading-[1.5] tracking-[-0.48px] group-hover:text-[#FFD11A] transition-colors line-clamp-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                      {blog.title}
                    </h3>
                    <p className="text-[#98989a] text-[14px] tracking-[-0.42px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {blog.category.name}
                    </p>
                  </div>

                  {/* Stats & Button */}
                  <div className="flex items-center gap-[50px]">
                    {/* Stats Pills */}
                    <div className="flex items-center gap-2">
                      {/* Views */}
                      <div className="bg-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-full">
                        <Eye className="size-5 text-[#666666]" strokeWidth={1.5} />
                        <span className="text-[#98989a] text-[14px] tracking-[-0.42px]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                          {blog.view}
                        </span>
                      </div>

                      {/* Comments
                      <div className="bg-[#1a1a1a] border border-[#262626] flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-full">
                        <MessageCircle className="size-5 text-[#666666]" strokeWidth={1.5} />
                        <span className="text-[#98989a] text-[14px] tracking-[-0.42px]" style={{ fontFamily: 'Kumbh Sans, sans-serif' }}>
                          {blog.comments}
                        </span>
                      </div> */}
                    </div>

                    {/* Read More Button */}
                    <div className="flex-1 bg-[#141414] border border-[#262626] rounded-lg px-5 py-3.5 flex items-center justify-center gap-1 hover:border-[#FFD11A]/40 hover:bg-[#1a1a1a] transition-all group/btn">
                      <span className="text-[#98989a] text-[14px] tracking-[-0.42px] whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {t('blogs.readMore')}
                      </span>
                      <svg className="size-5 shrink-0" fill="none" viewBox="0 0 20 20">
                        <path clipRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L10.168 10.5 7.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 01-1.06-.02z" fill="#FFD11A" fillRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
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
    

      <Footer />
    </div>
  );
}