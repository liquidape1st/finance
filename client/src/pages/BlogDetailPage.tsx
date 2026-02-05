import appConfig from "@/configs/app.config";
import { getDetailClientBlogTranslation, useAppDispatch, useAppSelector } from "@/store";
import { getRelatedClientBlogTranslationList } from "@/store/slices/finance/financeSlice";
import { Calendar, Eye, Tag } from "lucide-react";
import { useEffect, useMemo } from "react";
import SEO, { generateArticleSchema, generateBreadcrumbSchema } from "../components/SEO";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { RandomAffiliateBanner } from "../components/RandomAffiliateBanner";
import { Breadcrumb } from "../components/Breadcrumb";
import { ReadingTime } from "../components/ReadingTime";
import { TableOfContents } from "../components/TableOfContents";
import { addHeadingIds } from "../utils/contentProcessor";
import { ReadingProgressBar } from "../components/ReadingProgressBar";
import { ShareButtons } from "../components/ShareButtons";
import { BackToTop } from "../components/BackToTop";
import { BlogCardSkeleton } from "../components/SkeletonShimmer";

const getBlogImageUrl = (fileName: string, updatedAt: string) =>
  `${appConfig.apiPrefix}/s3/stream?fileName=${encodeURIComponent(fileName)}&v=${Date.parse(updatedAt) || 0}`;

type DetailBlogPageProps = {
  prefix: string
}


export function BlogDetailPage({ prefix }: DetailBlogPageProps) {
  const { lang, slug } = useParams()
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  // ... (I need to jump to the render part to fix the colon)
  // Wait, I can't replace the whole file or large chunk easily just to add import and fix below.
  // I will use multi_replace.


  const currentLang = useAppSelector((state) => state.locale.currentLang)
  const related_selected_blog_translation_list = useAppSelector((state) => state.finance.related_selected_blog_translation_list)
  const blog = useAppSelector((state) => state.finance.selected_blog_translation)
  const { isLoadingSelectedBlogPost, isLoadingRelatedBlogPosts } = useAppSelector((state) => state.finance)

  useEffect(() => {
    if (blog?.id) {
      dispatch(getRelatedClientBlogTranslationList({ uuid: blog.id }))
      if (currentLang !== lang) {
        let expectedSlug = blog.slugs?.filter(s => s.langCode === currentLang)[0]?.slug;
        if (expectedSlug && expectedSlug !== slug) {
          navigate(`/${prefix}/${currentLang}/${expectedSlug}`, { replace: true });
        }
      }
    }
  }, [currentLang, blog])

  useEffect(() => {
    if (!lang || !slug) {
      return
    }
    dispatch(getDetailClientBlogTranslation({
      langCode: lang,
      slug: slug
    }))
  }, [lang, slug])

  const blogImageUrl = blog?.image ? getBlogImageUrl(blog.image, blog.updatedAt) : '';
  const canonicalUrl = `${window.location.origin}${location.pathname}`;
  const blogListUrl = `${window.location.origin}/${location.pathname.split('/')[1] || 'blog'}`;
  const alternateLang = lang === 'vi' ? 'en' : 'vi';
  const alternateUrl = slug
    ? `${window.location.origin}/${location.pathname.split('/')[1] || 'blog'}/${alternateLang}/${slug}`
    : canonicalUrl;
  const blogTitle = blog?.title || t("blogs.detail.title", { defaultValue: "Bài viết" });
  const blogDescription = blog?.excerpt || t("blogs.detail.description", { defaultValue: "Chi tiết bài viết từ GOInsight." });
  const pageImage = blogImageUrl || `${window.location.origin}/logo.png`;

  // Process content to add IDs to headings for TOC navigation
  const processedContent = useMemo(() => {
    return addHeadingIds(blog?.content || blog?.excerpt || "");
  }, [blog?.content, blog?.excerpt]);

  const wordCount = processedContent ? processedContent.replace(/<[^>]*>/g, '').split(/\s+/).length : 0;
  const articleSchema = generateArticleSchema({
    title: blogTitle,
    description: blogDescription,
    imageUrl: blogImageUrl || undefined,
    publishedTime: blog.createdAt,
    modifiedTime: blog.updatedAt,
    url: canonicalUrl,
    wordCount: wordCount || undefined,
    section: blog.category?.name || "Blog",
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t("nav.home", { defaultValue: "Home" }), url: window.location.origin },
    { name: t("nav.blogs", { defaultValue: "Blog" }), url: blogListUrl },
    { name: blogTitle, url: canonicalUrl }
  ]);

  return (
    <>
      <SEO
        title={blogTitle}
        description={blogDescription}
        image={pageImage}
        imageAlt={blogTitle}
        url={canonicalUrl}
        alternateUrl={alternateUrl}
        type="article"
        publishedTime={blog.createdAt}
        modifiedTime={blog.updatedAt}
        author="GOInsight"
        section={blog.category?.name || "Blog"}
        tags={blog.category?.name ? [blog.category.name] : []}
        structuredData={[articleSchema, breadcrumbSchema]}
        currentLangOverride={lang === "vi" || lang === "en" ? lang : undefined}
      />
      <ReadingProgressBar />
      <div className="bg-[#141414] min-h-screen w-full">
        <Navbar />
        <main className="max-w-360 mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 animate-fade-in">
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { name: t("nav.home", { defaultValue: "Trang chủ" }), url: "/" },
              { name: t(`blogs.${prefix}.title`, { defaultValue: prefix }), url: `/${prefix}` },
              { name: blogTitle, url: location.pathname }
            ]}
            className="mb-6"
          />

          {/* <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[#98989a] hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="size-4" />
            <span>{t("blogs.back", { defaultValue: "Quay lại" })}</span>
          </button> */}
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-x-6 gap-y-6">
            <div className="col-span-2">
              {isLoadingSelectedBlogPost ? (
                <div className="animate-pulse">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-3 py-1.5 rounded-full">
                      <div className="size-4 rounded-full bg-[#262626]" />
                      <div className="h-3 w-24 bg-[#262626] rounded" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="h-8 bg-[#262626] rounded w-3/4" />
                    <div className="h-6 bg-[#1f1f1f] rounded w-1/2" />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm mb-8">
                    <div className="h-4 w-32 bg-[#1f1f1f] rounded" />
                    <div className="h-4 w-20 bg-[#1f1f1f] rounded" />
                  </div>

                  <div className="relative w-full h-80 sm:h-105 md:h-120 rounded-2xl overflow-hidden mb-10 bg-[#1a1a1a]">
                    <div className="absolute inset-0 bg-linear-to-r from-[#1a1a1a] via-[#1f1f1f] to-[#1a1a1a]" />
                  </div>

                  <div className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-3">
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <div
                        key={`paragraph-skeleton-${idx}`}
                        className="h-4 bg-[#1f1f1f] rounded w-full"
                      />
                    ))}
                    <div className="h-4 bg-[#1f1f1f] rounded w-2/3" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] px-3 py-1.5 rounded-full">
                      <Tag className="size-4 text-[#FFD11A]" />
                      <span className="text-[#98989a] text-xs uppercase tracking-wide">
                        {blog.category?.name ?? t("blogs.category", { defaultValue: "Blog" })}
                      </span>
                    </div>
                  </div>

                  <h1 className="text-white text-3xl sm:text-4xl md:text-[42px] leading-tight tracking-tight mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    {blog.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-[#98989a] text-sm mb-4">
                    {blog.createdAt && (
                      <time className="inline-flex items-center gap-2" dateTime={blog.createdAt} itemProp="datePublished">
                        <Calendar className="size-4" />
                        {new Date(blog.createdAt).toLocaleDateString(currentLang === 'vi' ? 'vi-VN' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                    )}
                    <span className="inline-flex items-center gap-2" aria-label={`${blog.view} views`}>
                      <Eye className="size-4" aria-hidden="true" />
                      {blog.view}
                    </span>
                  </div>

                  {/* Reading Time */}
                  <ReadingTime
                    content={blog.content || ""}
                    showWordCount={true}
                    className="mb-4"
                  />

                  {/* Share Buttons */}
                  <ShareButtons
                    url={canonicalUrl}
                    title={blog.title}
                    className="mb-8"
                  />

                  {/* <figure className="relative w-full h-80 sm:h-105 md:h-120 rounded-2xl overflow-hidden mb-10 bg-[#1a1a1a]">
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
                  </figure> */}

                  <article className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-6 sm:p-8 text-white leading-7 space-y-4" itemScope itemType="https://schema.org/BlogPosting">
                    <meta itemProp="headline" content={blog.title} />
                    <meta itemProp="description" content={blog.excerpt} />
                    {blogImageUrl && <meta itemProp="image" content={blogImageUrl} />}
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: processedContent }}
                      itemProp="articleBody"
                    />
                  </article>
                </>
              )}
            </div>
            {/* Sidebar */}
            <aside className="col-span-1" aria-label="Related articles">
              <div className="flex flex-col gap-6 sticky top-24">
                {/* Table of Contents */}
                {!isLoadingSelectedBlogPost && processedContent && (
                  <TableOfContents className="hidden md:block"
                    content={processedContent}
                    maxLevel={3}
                  />
                )}

                <div>
                  <RandomAffiliateBanner />
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {isLoadingRelatedBlogPosts && related_selected_blog_translation_list.length === 0
                    ? Array.from({ length: 1 }).map((_, index) => (
                      <div
                        key={`related-skeleton-${index}`}
                        className="flex flex-col h-full animate-pulse"
                        aria-hidden="true"
                      >
                        <div className="relative h-45 rounded-[10px] overflow-hidden mb-4 bg-[#1f1f1f]" />
                        <div className="flex flex-col gap-2.5 flex-1">
                          <div className="space-y-2">
                            <div className="h-4 bg-[#262626] rounded w-4/5" />
                            <div className="h-3 bg-[#1f1f1f] rounded w-2/5" />
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="h-3 bg-[#1f1f1f] rounded w-1/3" />
                            <div className="h-3 bg-[#1f1f1f] rounded w-10" />
                          </div>
                        </div>
                      </div>
                    ))
                    : related_selected_blog_translation_list.slice(0, wordCount < 1000 ? 2 : wordCount < 1500 ? 3 : 4).map((blog, index) => (
                      <div key={`${currentLang}-${blog.id}-detail`} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                        <BlogCard
                          blog={blog}
                          currentLang={currentLang || 'vi'}
                          prefix={prefix}
                        />
                      </div>
                    ))}
                </div>


              </div>
            </aside>
          </div>

          {/* Bottom Related Posts Section */}
          <section className="mt-16 sm:mt-24 border-t border-[#262626] pt-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t('blog.related', { defaultValue: 'Bài viết liên quan' })}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoadingRelatedBlogPosts && related_selected_blog_translation_list.length === 0
                ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`bottom-related-skeleton-${index}`}
                    className="flex flex-col h-full animate-pulse"
                  >
                    <div className="relative h-53.75 rounded-[10px] overflow-hidden mb-4 bg-[#1f1f1f]">
                      <div className="absolute inset-0 bg-linear-to-r from-[#1f1f1f] via-[#262626] to-[#1f1f1f]" />
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                      <div className="space-y-2">
                        <div className="h-4 bg-[#262626] rounded w-4/5" />
                        <div className="h-3 bg-[#1f1f1f] rounded w-2/5" />
                      </div>
                    </div>
                  </div>
                ))
                : related_selected_blog_translation_list.slice(0, 6).map((blog, index) => (
                  <div key={`${currentLang}-${blog.id}-bottom-related`} className="animate-fade-in" style={{ animationDelay: `${index * 75}ms` }}>
                    <BlogCard
                      blog={blog}
                      currentLang={currentLang || 'vi'}
                      prefix={prefix}
                      showBadge={true}
                    />
                  </div>
                ))}
            </div>
          </section>
        </main>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}