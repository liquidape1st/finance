package com.example.finance.controller;

import com.example.finance.pageable.BlogPageableObject;
import com.example.finance.pageable.CustomPage;
import com.example.finance.schemas.api.FeaturedClientBlogTranslation;
import com.example.finance.schemas.response.BlogTranslationClientResponse;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.BlogTranslationService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blog-translations")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogTranslationController extends BaseController {
    BlogTranslationService blogTranslationService;

    public BlogTranslationController(MessageSource messageSource, BlogTranslationService blogTranslationService) {
        super(messageSource);
        this.blogTranslationService = blogTranslationService;
    }

    @PostMapping(value = "/search")
    public ResponseEntity<ResponsePayload> search(
            @Valid @RequestBody BlogPageableObject pageableObject,
            @RequestHeader(value = "x-app-language", defaultValue = "en") String language
    ) {
        CustomPage<BlogTranslationClientResponse> result = new CustomPage<>(blogTranslationService.findPageBlogTranslation(
                pageableObject.getQuery(),
                language,
                pageableObject.getCategory(),
                pageableObject.toPageRequest(),
                pageableObject.getUiType()
        ));
        return createResponse(
                result,
                "blog.translation.search.success.title",
                "blog.translation.search.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "detail/{langCode}/{slug}")
    public ResponseEntity<ResponsePayload> detailClientBlogTranslation(
            @PathVariable String langCode,
            @PathVariable String slug
    ) {
        return createResponse(
                blogTranslationService.findBlogTranslationByLangCodeAndSlug(slug, langCode),
                "blog.translation.search.success.title",
                "blog.translation.search.success.detail",
                HttpStatus.OK
        );
    }

    @PostMapping(value = "featured")
    public ResponseEntity<ResponsePayload> findFeaturedBlogList(
            @Valid @RequestBody FeaturedClientBlogTranslation featuredClientBlogTranslation,
            @RequestHeader(value = "x-app-language", defaultValue = "en") String language
    ) {
        return createResponse(
                blogTranslationService.findFeaturedBlogList(language, featuredClientBlogTranslation.getCategory(), featuredClientBlogTranslation.getSeed()),
                "blog.translation.search.success.title",
                "blog.translation.search.success.detail",
                HttpStatus.OK
        );
    }
}

