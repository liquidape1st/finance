# SEO Optimization Checklist - GOInsight

## ✅ Đã triển khai (Completed)

### Technical SEO
- [x] **Title Format**: Đổi từ `"Brand - Title"` sang `"Title | Brand"` để keyword chính xuất hiện trước
- [x] **Meta Tags**: Component SEO centralized với đầy đủ OG, Twitter Cards, hreflang
- [x] **Canonical URLs**: Tự động generate canonical cho mỗi trang
- [x] **Keywords Meta**: Thêm keywords meta tag trong index.html
- [x] **Robots.txt**: Cải thiện với block API endpoints, crawl-delay, user-agent specific rules
- [x] **Sitemap.xml**: Thêm lastmod, hreflang cho đa ngôn ngữ, priority phù hợp

### On-page SEO
- [x] **Breadcrumb Component**: Với microdata schema.org tích hợp
- [x] **Reading Time**: Hiển thị thời gian đọc ước tính
- [x] **Table of Contents**: Tự động generate từ headings

### Structured Data
- [x] **Organization Schema**: HomePage
- [x] **WebSite Schema**: Với SearchAction
- [x] **BlogPosting Schema**: Cho blog articles
- [x] **BreadcrumbList Schema**: Navigation context
- [x] **ItemList Schema**: Blog listing pages
- [x] **CollectionPage Schema**: For category pages

### i18n/l10n
- [x] **Hreflang Tags**: Cho Vietnamese và English
- [x] **Dynamic Lang Attribute**: HTML lang update theo ngôn ngữ
- [x] **Translations**: Thêm cho TOC, Reading Time components

---

## 🔧 Cách sử dụng các components mới

### 1. Breadcrumb
```tsx
import { Breadcrumb } from "../components/Breadcrumb";

<Breadcrumb
  items={[
    { name: "Trang chủ", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Bài viết hiện tại", url: "/blog/current-post" }
  ]}
/>
```

### 2. Reading Time
```tsx
import { ReadingTime } from "../components/ReadingTime";

<ReadingTime 
  content={htmlContent} 
  showWordCount={true}
/>
```

### 3. Table of Contents
```tsx
import { TableOfContents } from "../components/TableOfContents";

<TableOfContents 
  content={htmlContent} 
  maxLevel={3} // h2, h3, h4
/>
```

---

## 📝 Scripts mới

```bash
# Generate sitemap động từ API
npm run generate:sitemap

# Build với sitemap mới
npm run build:seo
```

---

## 🎯 TODO - Cần triển khai tiếp

### Short-term (Tuần này)
- [ ] Thêm pre-rendering với vite-plugin-prerender
- [ ] Kiểm tra Core Web Vitals với Lighthouse
- [ ] Submit sitemap mới lên Google Search Console

### Mid-term (Tháng này)
- [ ] Tạo Author pages với bio chi tiết
- [ ] Implement FAQ schema cho các trang có FAQ
- [ ] Tối ưu images với WebP format
- [ ] Thêm lazy loading cho images

### Long-term (3-6 tháng)
- [ ] Xem xét chuyển sang Next.js cho SSR/ISR
- [ ] Xây dựng Topic Authority với pillar content
- [ ] A/B test titles và descriptions

---

## 📊 Monitoring

### Tools cần setup
1. **Google Search Console**: Submit sitemap, monitor indexing
2. **Google Analytics 4**: Đã có (G-5KQQDCE10C)
3. **Ahrefs**: Đã có analytics script
4. **PageSpeed Insights**: Kiểm tra Core Web Vitals định kỳ

### KPIs
| Metric | Hiện tại | Target 3 tháng | Target 6 tháng |
|--------|----------|----------------|----------------|
| Indexed Pages | - | 90%+ | 95%+ |
| Avg Position | - | Top 30 | Top 15 |
| CTR | - | 3% | 5% |
| Organic Traffic | - | +100% | +200% |

---

## 📁 Files đã thay đổi/tạo mới

### Modified
- `src/components/SEO.tsx` - Title format fix
- `src/pages/BlogDetailPage.tsx` - Tích hợp Breadcrumb, ReadingTime, TOC
- `src/locales/lang/vi.json` - Thêm translations
- `src/locales/lang/en.json` - Thêm translations
- `index.html` - Title format, keywords meta
- `public/robots.txt` - Improved directives
- `public/sitemap.xml` - lastmod, hreflang
- `package.json` - Thêm scripts

### Created
- `src/components/Breadcrumb.tsx` - Breadcrumb với microdata
- `src/components/ReadingTime.tsx` - Reading time display
- `src/components/TableOfContents.tsx` - Auto-generated TOC
- `src/utils/contentProcessor.ts` - Content utility func helpers (heading IDs, slugify)
- `scripts/generate-sitemap.js` - Dynamic sitemap generator
- `SEO_CHECKLIST.md` - This file
