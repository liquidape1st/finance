package com.example.finance.controller;

import com.example.finance.mapper.CategoryResponseMapper;
import com.example.finance.mapper.CategoryTranslationResponseMapper;
import com.example.finance.pageable.CustomPage;
import com.example.finance.pageable.PageableObject;
import com.example.finance.schemas.request.BlogPostCategoryRequest;
import com.example.finance.schemas.response.CategoryResponse;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.CategoryService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/blog-categories")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController extends BaseController implements AController<BlogPostCategoryRequest, UUID, PageableObject> {
    CategoryService categoryService;
    CategoryResponseMapper mapper;
    CategoryTranslationResponseMapper translationMapper;

    public CategoryController(MessageSource messageSource, CategoryService categoryService, CategoryResponseMapper mapper, CategoryTranslationResponseMapper translationMapper) {
        super(messageSource);
        this.categoryService = categoryService;
        this.mapper = mapper;
        this.translationMapper = translationMapper;
    }

    @Override
    @PostMapping(value = "/search")
    @PreAuthorize("hasAuthority('CATEGORY:READ')")
    public ResponseEntity<ResponsePayload> search(PageableObject pageableObject) {
        CustomPage<CategoryResponse> result = new CustomPage<>(categoryService.searchEntities(pageableObject).map(mapper::toDTO));
        return createResponse(
                result,
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/search")
    @PreAuthorize("hasAuthority('CATEGORY:READ')")
    public ResponseEntity<ResponsePayload> search() {
        return createResponse(
                categoryService.findAllEntities().stream().map(mapper::toDTO),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PostMapping(value = "/create")
    @PreAuthorize("hasAuthority('CATEGORY:CREATE')")
    public ResponseEntity<ResponsePayload> create(BlogPostCategoryRequest request) {
        return createResponse(
                mapper.toDTO(categoryService.createEntity(request)),
                "category.create.success.title",
                "category.create.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PutMapping(value = "/update/{uuid}")
    @PreAuthorize("hasAuthority('CATEGORY:UPDATE')")
    public ResponseEntity<ResponsePayload> update(@PathVariable UUID uuid, BlogPostCategoryRequest request) {
        return createResponse(
                mapper.toDTO(categoryService.updateEntityById(uuid, request)),
                "category.update.success.title",
                "category.update.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/detail/{uuid}")
    @PreAuthorize("hasAuthority('CATEGORY:READ')")
    public ResponseEntity<ResponsePayload> detail(@PathVariable UUID uuid) {
        return createResponse(
                mapper.toDTO(categoryService.findEntityById(uuid)),
                "category.get.success.title",
                "category.get.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @DeleteMapping(value = "/delete/{uuid}")
    @PreAuthorize("hasAuthority('CATEGORY:DELETE')")
    public ResponseEntity<ResponsePayload> delete(@PathVariable UUID uuid) {
        categoryService.removeEntityById(uuid);
        return createResponse(
                null,
                "category.delete.success.title",
                "category.delete.success.detail",
                HttpStatus.OK
        );
    }

    // Additional endpoints for multi-language support
    @GetMapping(value = "/{uuid}/translations")
    @PreAuthorize("hasAuthority('CATEGORY-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> getTranslationsByCategoryId(@PathVariable UUID uuid) {
        return createResponse(
                categoryService.findTranslationsByCategoryId(uuid).stream().map(translationMapper::toDTO).toList(),
                "category.translation.get.success.title",
                "category.translation.get.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/{uuid}/lang/{langCode}")
    @PreAuthorize("hasAuthority('CATEGORY:READ')")
    public ResponseEntity<ResponsePayload> getCategoryByLangCode(
            @PathVariable UUID uuid,
            @PathVariable String langCode) {
        // Get the category and return it (translations will be included in the response)
        return createResponse(
                mapper.toDTO(categoryService.findEntityById(uuid)),
                "category.get.success.title",
                "category.get.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/lang/{langCode}")
    @PreAuthorize("hasAuthority('CATEGORY:READ')")
    public ResponseEntity<ResponsePayload> getCategoriesByLangCode(@PathVariable String langCode) {
        return createResponse(
                categoryService.findByLangCode(langCode).stream().map(mapper::toDTO).toList(),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }
}
