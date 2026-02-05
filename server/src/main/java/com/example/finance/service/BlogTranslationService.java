package com.example.finance.service;

import com.example.finance.exception.BusinessException;
import com.example.finance.mapper.TagTranslationResponseMapper;
import com.example.finance.model.Blog;
import com.example.finance.model.BlogTranslation;
import com.example.finance.model.Tag;
import com.example.finance.model.TagTranslation;
import com.example.finance.repository.BlogRepository;
import com.example.finance.repository.BlogTranslationRepository;
import com.example.finance.repository.TagTranslationRepository;
import com.example.finance.schemas.response.BlogTranslationClientResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogTranslationService {
    TagTranslationResponseMapper tagTranslationResponseMapper;
    BlogTranslationRepository blogTranslationRepository;
    TagTranslationRepository tagTranslationRepository;
    BlogRepository blogRepository;

    @Transactional
    public Page<BlogTranslationClientResponse> findPageBlogTranslation(String query, String langCode, UUID category,
            Pageable pageable, Blog.UiType uiType) {
        System.out.println("UI Type: " + uiType);
        System.out.println(uiType.getClass().getSimpleName());
        System.out.println("UI Type class: " + uiType.getClass());
        return blogTranslationRepository.findPageBlogTranslation(query, langCode, category, uiType, pageable)
                .map(s -> assignTags(s, langCode));
    }

    @Transactional
    public BlogTranslationClientResponse findBlogTranslationByLangCodeAndSlug(String slug, String langCode) {
        BlogTranslationClientResponse blogTranslationClientResponse = blogTranslationRepository
                .findBlogTranslationByLangCodeAndSlug(slug, langCode);
        if (blogTranslationClientResponse != null) {
            UUID uid = blogTranslationClientResponse.getBlogId();
            blogRepository.findById(uid).ifPresent(blog -> {
                blog.setView(blog.getView() + 1);
                blogRepository.save(blog);

                List<BlogTranslation> childBlogTranslations = blogTranslationRepository.findAllByBlog_Id(blog.getId());
                for (BlogTranslation blogTranslation : childBlogTranslations) {
                    blogTranslationClientResponse.getSlugs().add(new BlogTranslationClientResponse.Slug(
                            blogTranslation.getSlug(),
                            blogTranslation.getLangCode()));
                    List<TagTranslation> tagTranslationList = tagTranslationRepository.findByBlogIdAndLangCode(
                            blog.getId(),
                            langCode);
                    blogTranslationClientResponse
                            .setTags(tagTranslationList.stream().map(tagTranslationResponseMapper::toDTO).toList());
                }
            });
        }

        return blogTranslationClientResponse;
    }

    @Transactional
    public List<BlogTranslationClientResponse> findFeaturedBlogList(String langCode, UUID category, Long seed) {
        int required = 6;
        List<BlogTranslationClientResponse> result = blogTranslationRepository.findFeaturedBlogList(langCode, category);
        if (result.size() >= required) {
            return result.subList(0, required);
        }

        Random random = new Random(seed);

        List<BlogTranslationClientResponse> sameCategory = blogTranslationRepository
                .findNonFeaturedSameCategory(langCode, category);
        Collections.shuffle(sameCategory, random);

        for (var blog : sameCategory) {
            if (result.size() >= required)
                break;
            result.add(blog);
        }

        if (result.size() < required) {
            List<BlogTranslationClientResponse> otherCategory = blogTranslationRepository
                    .findNonFeaturedOtherCategory(langCode, category);
            Collections.shuffle(otherCategory, random);

            for (var blog : otherCategory) {
                if (result.size() >= required)
                    break;
                result.add(blog);
            }
        }

        return result.stream().map(s -> assignTags(s, langCode)).toList();
    }

    /**
     * Tìm bài viết liên quan cho bài viết hiện tại
     * 
     * Logic ưu tiên:
     * 1. Bài viết có cùng tags (số tag giống càng nhiều càng ưu tiên)
     * 2. Bài viết cùng category
     * 3. Bài viết có nhiều lượt xem (view) cao
     * 4. Bài viết mới nhất
     * 
     * Các điều kiện:
     * - Loại trừ bài viết hiện tại
     * - Chỉ lấy bài đã enabled
     * - Giới hạn tối đa MAX_RELATED_BLOGS bài (random nếu có nhiều hơn)
     */
    @Transactional
    public List<BlogTranslationClientResponse> findRelatedForCurrentBlog(UUID uuid) {
        final int MAX_RELATED_BLOGS = 9;

        BlogTranslation currentBlogTranslation = blogTranslationRepository.findById(uuid)
                .orElseThrow(() -> new BusinessException("Không xác định được bài viết"));

        Blog currentBlog = currentBlogTranslation.getBlog();
        String langCode = currentBlogTranslation.getLangCode();
        UUID currentBlogId = currentBlog.getId();
        UUID categoryId = currentBlog.getCategory().getId();

        // Lấy danh sách tag IDs của bài viết hiện tại
        List<UUID> currentTagIds = currentBlog.getTags().stream()
                .map(Tag::getId)
                .toList();

        List<BlogTranslationClientResponse> relatedBlogs;

        if (currentTagIds.isEmpty()) {
            // Nếu bài viết không có tags, fallback tìm theo category + view + thời gian
            relatedBlogs = blogTranslationRepository.findRelatedBlogsWithoutTags(
                    langCode,
                    currentBlogId,
                    categoryId);
        } else {
            // Tìm bài liên quan theo tags và category
            relatedBlogs = blogTranslationRepository.findRelatedBlogs(
                    langCode,
                    currentBlogId,
                    categoryId,
                    currentTagIds);
        }

        // Nếu có nhiều hơn MAX_RELATED_BLOGS, random chọn đủ số lượng
        List<BlogTranslationClientResponse> selectedBlogs;
        if (relatedBlogs.size() > MAX_RELATED_BLOGS) {
            // Tạo bản copy để shuffle (vì list gốc có thể immutable)
            List<BlogTranslationClientResponse> shuffledList = new java.util.ArrayList<>(relatedBlogs);
            // Sử dụng Random với seed từ thời gian để có kết quả khác nhau mỗi lần
            Collections.shuffle(shuffledList, new Random());
            selectedBlogs = shuffledList.subList(0, MAX_RELATED_BLOGS);
        } else {
            selectedBlogs = relatedBlogs;
        }

        // Gán tags cho từng bài viết
        return selectedBlogs.stream()
                .map(blog -> assignTags(blog, langCode))
                .toList();
    }

    @Transactional
    public BlogTranslationClientResponse assignTags(BlogTranslationClientResponse blogTranslationClientResponse,
            String langCode) {
        List<TagTranslation> tagTranslationList = tagTranslationRepository.findByBlogIdAndLangCode(
                blogTranslationClientResponse.getBlogId(),
                langCode);
        blogTranslationClientResponse
                .setTags(tagTranslationList.stream().map(tagTranslationResponseMapper::toDTO).toList());
        return blogTranslationClientResponse;
    }
}
