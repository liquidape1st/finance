package com.example.finance.service;

import com.example.finance.repository.BlogTranslationRepository;
import com.example.finance.schemas.response.BlogTranslationClientResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogTranslationService {
    BlogTranslationRepository blogTranslationRepository;

    public Page<BlogTranslationClientResponse> findPageBlogTranslation(String query, String langCode, UUID category, Pageable pageable) {
        return blogTranslationRepository.findPageBlogTranslation(query, langCode, category, pageable);
    }

    public BlogTranslationClientResponse findBlogTranslationByLangCodeAndSlug(String slug, String langCode) {
        return blogTranslationRepository.findBlogTranslationByLangCodeAndSlug(slug, langCode);
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

}
