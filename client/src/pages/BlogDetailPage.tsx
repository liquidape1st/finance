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
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4" />
                  {blog.createdAt}
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
          {/* Element ADS */}
          <div className="col-span-1">
            <div className="flex flex-col gap-6 sticky top-0">
              <div>
                <RandomAffiliateBanner />
              </div>
              <div className="grid grid-cols-1 gap-4">
                {blog_translation.slice(0, 5).map((blog) => (
                  <Link
                    to={`/blogs/${currentLang}/${blog.slug}`}
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}