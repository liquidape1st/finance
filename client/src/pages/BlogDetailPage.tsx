import { BlogTranslationClient } from "@/@types/blog.translation.client";
import { ApiResponse, Paginated, TableQueries } from "@/@types/common";
import appConfig from "@/configs/app.config";
import { apiGetSystem, apiPostSystem } from "@/services/SystemService";
import { useAppSelector } from "@/store";
import { ArrowLeft, Clock, Eye, Tag } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { AffiliateBanner } from "../components/AffiliateBanner";

type LocationState = {
  blog?: BlogTranslationClient;
};

const getBlogImageUrl = (fileName: string, updatedAt: string) =>
  `${appConfig.apiPrefix}/s3/stream?fileName=${encodeURIComponent(fileName)}&v=${Date.parse(updatedAt) || 0}`;

export function BlogDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const currentLang = useAppSelector((state) => state.locale.currentLang)
  const [relatedBlogs, setRelatedBlogs] = useState<BlogTranslationClient[]>([]);
  const [relatedPage, setRelatedPage] = useState(1);
  const [relatedHasMore, setRelatedHasMore] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const relatedObserverRef = useRef<HTMLDivElement | null>(null);
  const affiliateBannerRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const relatedRef = useRef<HTMLDivElement | null>(null);

  const initialBlog = (location.state as LocationState | null)?.blog;
  const [blog, setBlog] = useState<BlogTranslationClient | null>(initialBlog ?? null);
  const [loading, setLoading] = useState(!initialBlog);
  const [error, setError] = useState<string | null>(null);

  const fetchBlog = useCallback(async () => {
    if (!slug) {
      setError("Missing article identifier.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await apiGetSystem<ApiResponse<BlogTranslationClient>>(`/blog-translations/${slug}`);
      setBlog(response.data.data);
    } catch (err) {
      setError("Unable to load the article. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (!initialBlog) {
      fetchBlog();
    }
  }, [fetchBlog, initialBlog]);

  const fetchRelatedBlogs = useCallback(
    async (page: number) => {
      if (relatedLoading || !relatedHasMore) return;

      setRelatedLoading(true);
      try {
        const query: TableQueries = {
          pageIndex: page,
          pageSize: 30,
          query: "",
          sort: {
            key: "",
            order: "asc",
          },
          category: "",
        };

        const response = await apiPostSystem<ApiResponse<Paginated<BlogTranslationClient>>, TableQueries>(
          "/blog-translations/search",
          query
        );

        const pageData = response.data.data;

        if (!pageData.content || pageData.content.length === 0) {
          setRelatedHasMore(false);
          return;
        }

        setRelatedBlogs((prev) => {
          const existingIds = new Set(prev.map((b) => b.id));
          const merged = [...prev];
          pageData.content.forEach((item) => {
            if (!existingIds.has(item.id)) {
              merged.push(item);
            }
          });
          return merged;
        });

        const pageNumber = pageData.pageable?.pageNumber ?? 0;
        const pageSize = pageData.pageable?.pageSize ?? query.pageSize;
        const totalElements = pageData.totalElements;
        if (typeof totalElements === "number" && typeof pageSize === "number") {
          const loaded = (pageNumber + 1) * pageSize;
          if (loaded >= totalElements) {
            setRelatedHasMore(false);
          }
        }
      } catch {
      } finally {
        setRelatedLoading(false);
      }
    },
    [relatedHasMore, relatedLoading]
  );

  useEffect(() => {
    setRelatedBlogs([]);
    setRelatedPage(1);
    setRelatedHasMore(true);
  }, [currentLang]);

  useEffect(() => {
    if (relatedBlogs.length === 0 && relatedHasMore && !relatedLoading) {
      fetchRelatedBlogs(1);
    }
  }, [fetchRelatedBlogs, relatedBlogs.length, relatedHasMore, relatedLoading]);

  // Stop loading more if related column exceeds detail column height
  useEffect(() => {
    if (!detailRef.current || !relatedRef.current || !affiliateBannerRef.current) return;
    const detailH = detailRef.current.getBoundingClientRect().height;
    const relatedH = relatedRef.current.getBoundingClientRect().height;
    const affiliateH = affiliateBannerRef.current.getBoundingClientRect().height;
    
    console.log('detailH: ', detailH);
    console.log('relatedH + affiliateH: ', relatedH + affiliateH);

    if (detailH && relatedH && affiliateH && (relatedH + affiliateH + 285) >= detailH) {

      console.log('relatedH >= detailH');
      setRelatedHasMore(false);
    }
  }, [relatedBlogs]);

  useEffect(() => {
    if (!relatedObserverRef.current || !relatedHasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !relatedLoading && relatedHasMore) {
          const nextPage = relatedPage + 1;
          setRelatedPage(nextPage);
          fetchRelatedBlogs(nextPage);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    observer.observe(relatedObserverRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchRelatedBlogs, relatedHasMore, relatedLoading, relatedPage]);

  const formattedDate = useMemo(() => {
    if (!blog?.updatedAt && !blog?.createdAt) return "";
    const dateString = blog.updatedAt || blog.createdAt;
    return new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  }, [blog]);

  return (
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

        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-36 bg-[#1f1f1f] rounded" />
            <div className="h-10 w-3/4 bg-[#1f1f1f] rounded" />
            <div className="h-6 w-1/2 bg-[#1f1f1f] rounded" />
            <div className="h-[360px] bg-[#1f1f1f] rounded-xl" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-[#1f1f1f] rounded" />
              <div className="h-4 w-[90%] bg-[#1f1f1f] rounded" />
              <div className="h-4 w-[80%] bg-[#1f1f1f] rounded" />
            </div>
          </div>
        ) : error ? (
          <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-6 text-[#d1d1d1]">
            {error}
          </div>
        ) : !blog ? (
          <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl p-6 text-[#d1d1d1]">
            {t("blogs.notFound", { defaultValue: "Article not found." })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2" id="blog-detail" ref={detailRef}>
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
                {formattedDate && (
                  <span className="inline-flex items-center gap-2">
                    <Clock className="size-4" />
                    {formattedDate}
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <Eye className="size-4" />
                  {blog.view}
                </span>
              </div>

              <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden mb-10 bg-[#1a1a1a]">
                <img
                  src={getBlogImageUrl(blog.image, blog.updatedAt)}
                  alt={blog.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <article className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-6 sm:p-8 text-white leading-7 space-y-4">
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt || "" }}
                />
              </article>
            </div>
            <div className="col-span-1 space-y-6">
              <div id="affiliateBannerRef" ref={affiliateBannerRef}>
                <AffiliateBanner
                  title="Nhận hoàn phí giao dịch lên đến 30%"
                  description="Đăng ký tài khoản qua link đối tác để nhận hoàn phí giao dịch và nhiều ưu đãi độc quyền khác."
                  ctaText="Mở tài khoản ngay"
                  ctaLink="https://your-affiliate-link.example.com"
                  bonusAmount="Ưu đãi cho người mới"
                  hasCountdown
                  variant="dark"
                  compact
                  hideBackgroundPattern
                />
              </div>
              <div className="grid grid-cols-1 gap-4" id="blog-related" ref={relatedRef}>
                {relatedBlogs.map((blog) => (
                  <Link
                    to={`/blogs/${blog.slug}`}
                    state={{ blog }}
                    key={`${currentLang}-${blog.id}`}
                    className="group flex flex-col cursor-pointer"
                  >
                    <article className="flex flex-col h-full">
                      <div className="relative h-[185px] rounded-[10px] overflow-hidden mb-4">
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
                          <h3 className="text-white text-[16px] leading-[1.5] tracking-[-0.48px] group-hover:text-[#FFD11A] transition-colors line-clamp-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>
                            {blog.title}
                          </h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-[#98989a] text-[14px] tracking-[-0.42px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {blog.category.name}
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

                <div ref={relatedObserverRef} className="h-6 w-full">
                  {relatedLoading && (
                    <span className="text-[#666666] text-xs">
                      {t("blogs.loadingMore", { defaultValue: "Loading more..." })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

