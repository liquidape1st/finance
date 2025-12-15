import appConfig from "@/configs/app.config";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ApiResponse } from "@/@types/common";
import { BlogTranslationClient } from "@/@types/blog.translation.client";
import { apiGetSystem } from "@/services/SystemService";
import { ArrowLeft, Clock, Eye, Tag } from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

              <article className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-6 sm:p-8 text-[#d1d1d1] leading-7 space-y-4">
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content || blog.excerpt || "" }}
                />
              </article>
            </div>
            <div className="col-span-1">
                
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

