package com.example.finance.service;

import com.example.finance.repository.CategoryTranslationRepository;
import com.example.finance.schemas.response.CategoryTranslationClientResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryTranslationService {
    CategoryTranslationRepository categoryTranslationRepository;

    public List<CategoryTranslationClientResponse> findAllCategoryTranslationByLanguageCode(String languageCode) {
        return categoryTranslationRepository.findAllCategoryTranslationByLanguageCode(languageCode);
    }
}
