package com.example.finance.service;

import com.example.finance.repository.BlogTranslationRepository;
import com.example.finance.schemas.response.BlogTranslationClientResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogTranslationService {
    BlogTranslationRepository blogTranslationRepository;

    public Page<BlogTranslationClientResponse> findPageBlogTranslation(String query, String langCode, UUID category, Pageable pageable){
        return blogTranslationRepository.findPageBlogTranslation(query, langCode, category, pageable);
    }
}
