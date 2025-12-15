package com.example.finance.controller;

import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.CategoryTranslationService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/category-translations")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryTranslationController extends BaseController {
    CategoryTranslationService categoryTranslationService;

    public CategoryTranslationController(MessageSource messageSource, CategoryTranslationService categoryTranslationService) {
        super(messageSource);
        this.categoryTranslationService = categoryTranslationService;
    }

    @GetMapping(value = "search")
    public ResponseEntity<ResponsePayload> search(
            @RequestHeader(value = "x-app-language", defaultValue = "en") String language
    ) {
        return createResponse(
                categoryTranslationService.findAllCategoryTranslationByLanguageCode(language),
                "blog.translation.search.success.title",
                "blog.translation.search.success.detail",
                HttpStatus.OK
        );
    }
}
