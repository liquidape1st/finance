package com.example.finance.service;

import com.example.finance.exception.BusinessException;
import com.example.finance.model.Blog;
import com.example.finance.model.BlogTranslation;
import com.example.finance.repository.BlogRepository;
import com.example.finance.repository.BlogTranslationRepository;
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
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogTranslationService {
    BlogTranslationRepository blogTranslationRepository;
    BlogRepository blogRepository;

    public Page<BlogTranslationClientResponse> findPageBlogTranslation(String query, String langCode, UUID category, Pageable pageable, Blog.UiType uiType) {
        System.out.println("UI Type: " + uiType);
        System.out.println(uiType.getClass().getSimpleName());
        System.out.println("UI Type class: " + uiType.getClass());
        return blogTranslationRepository.findPageBlogTranslation(query, langCode, category, uiType, pageable);
    }

    @Transactional
    public BlogTranslationClientResponse findBlogTranslationByLangCodeAndSlug(String slug, String langCode) {
        BlogTranslationClientResponse blogTranslationClientResponse = blogTranslationRepository.findBlogTranslationByLangCodeAndSlug(slug, langCode);
        if (blogTranslationClientResponse != null) {
            UUID uid = blogTranslationClientResponse.getBlogId();
            blogRepository.findById(uid).ifPresent(blog -> {
                blog.setView(blog.getView() + 1);
                blogRepository.save(blog);

                List<BlogTranslation> childBlogTranslations = blogTranslationRepository.findAllByBlog_Id(blog.getId());
                for (BlogTranslation blogTranslation : childBlogTranslations) {
                    blogTranslationClientResponse.getSlugs().add(new BlogTranslationClientResponse.Slug(
                            blogTranslation.getSlug(),
                            blogTranslation.getLangCode()
                    ));
                }
            });
        }

        return blogTranslationClientResponse;
    }

    public List<BlogTranslationClientResponse> findFeaturedBlogList(String langCode, UUID category, Long seed) {
        int required = 6;
        List<BlogTranslationClientResponse> result = blogTranslationRepository.findFeaturedBlogList(langCode, category);
        if (result.size() >= required) {
            return result.subList(0, required);
        }

        Random random = new Random(seed);

        List<BlogTranslationClientResponse> sameCategory = blogTranslationRepository.findNonFeaturedSameCategory(langCode, category);
        Collections.shuffle(sameCategory, random);

        for (var blog : sameCategory) {
            if (result.size() >= required) break;
            result.add(blog);
        }

        if (result.size() < required) {
            List<BlogTranslationClientResponse> otherCategory = blogTranslationRepository.findNonFeaturedOtherCategory(langCode, category);
            Collections.shuffle(otherCategory, random);

            for (var blog : otherCategory) {
                if (result.size() >= required) break;
                result.add(blog);
            }
        }

        return result;
    }

    public List<BlogTranslationClientResponse> findRelatedForCurrentBlog(UUID uuid) {
        BlogTranslation currentBlogTranslation = blogTranslationRepository.findById(uuid).orElseThrow(() -> new BusinessException("Không xác định được bài viết"));
        Blog currentBlog = currentBlogTranslation.getBlog();
        List<BlogTranslationClientResponse> relatedBlogList = blogTranslationRepository.findListRelatedBlogTranslationByCategoryAndUiTypeAndContentTypeAndLangCode(
                currentBlogTranslation.getLangCode(),
                currentBlog.getCategory().getId(),
                currentBlog.getUiType()
        );
        List<BlogTranslationClientResponse> sameCategory = blogTranslationRepository.findNonFeaturedSameCategory(currentBlogTranslation.getLangCode(), currentBlog.getCategory().getId());

        return Stream.concat(relatedBlogList.stream(), sameCategory.stream())
                .collect(Collectors.toMap(
                        BlogTranslationClientResponse::getId,
                        item -> item,
                        (oldVal, newVal) -> oldVal   // nếu trùng, giữ cái cũ
                ))
                .values()
                .stream()
                .toList();
    }
}
