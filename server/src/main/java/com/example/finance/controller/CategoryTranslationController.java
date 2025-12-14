package com.example.finance.controller;

import com.example.finance.mapper.CategoryTranslationResponseMapper;
import com.example.finance.pageable.CustomPage;
import com.example.finance.pageable.PageableObject;
import com.example.finance.schemas.request.CategoryTranslationRequest;
import com.example.finance.schemas.response.CategoryTranslationResponse;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.CategoryTranslationService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/category-translations")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryTranslationController extends BaseController implements AController<CategoryTranslationRequest, UUID, PageableObject> {

    CategoryTranslationService categoryTranslationService;
    CategoryTranslationResponseMapper mapper;

    public CategoryTranslationController(MessageSource messageSource, CategoryTranslationService categoryTranslationService, CategoryTranslationResponseMapper mapper) {
        super(messageSource);
        this.categoryTranslationService = categoryTranslationService;
        this.mapper = mapper;
    }

    @Override
    @PostMapping(value = "/search")
    @PreAuthorize("hasAuthority('CATEGORY-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> search(@Valid @RequestBody PageableObject pageableObject) {
        CustomPage<CategoryTranslationResponse> result = new CustomPage<>(
                categoryTranslationService.searchEntities(pageableObject).map(mapper::toDTO)
        );
        return createResponse(
                result,
                "category.translation.search.success.title",
                "category.translation.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/search")
    @PreAuthorize("hasAuthority('CATEGORY-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> search() {
        return createResponse(
                categoryTranslationService.findAllEntities().stream().map(mapper::toDTO).collect(Collectors.toList()),
                "category.translation.search.success.title",
                "category.translation.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PostMapping(value = "/create")
    @PreAuthorize("hasAuthority('CATEGORY-TRANSLATION:CREATE')")
    public ResponseEntity<ResponsePayload> create(@Valid @RequestBody CategoryTranslationRequest request) {
        return createResponse(
                mapper.toDTO(categoryTranslationService.createEntity(request)),
                "category.translation.create.success.title",
                "category.translation.create.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PutMapping(value = "/update/{uuid}")
    @PreAuthorize("hasAuthority('CATEGORY-TRANSLATION:UPDATE')")
    public ResponseEntity<ResponsePayload> update(@PathVariable UUID uuid, @Valid @RequestBody CategoryTranslationRequest request) {
        return createResponse(
                mapper.toDTO(categoryTranslationService.updateEntityById(uuid, request)),
                "category.translation.update.success.title",
                "category.translation.update.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/detail/{uuid}")
    @PreAuthorize("hasAuthority('CATEGORY-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> detail(@PathVariable UUID uuid) {
        return createResponse(
                mapper.toDTO(categoryTranslationService.findEntityById(uuid)),
                "category.translation.get.success.title",
                "category.translation.get.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @DeleteMapping(value = "/delete/{uuid}")
    @PreAuthorize("hasAuthority('CATEGORY-TRANSLATION:DELETE')")
    public ResponseEntity<ResponsePayload> delete(@PathVariable UUID uuid) {
        categoryTranslationService.removeEntityById(uuid);
        return createResponse(
                null,
                "category.translation.delete.success.title",
                "category.translation.delete.success.detail",
                HttpStatus.OK
        );
    }

    // Additional endpoints for multi-language support
    @GetMapping(value = "/category/{categoryId}")
    @PreAuthorize("hasAuthority('CATEGORY-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> getTranslationsByCategoryId(@PathVariable UUID categoryId) {
        List<CategoryTranslationResponse> translations = categoryTranslationService.findByCategoryId(categoryId)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
        return createResponse(
                translations,
                "category.translation.get.success.title",
                "category.translation.get.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/category/{categoryId}/lang/{langCode}")
    @PreAuthorize("hasAuthority('CATEGORY-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> getTranslationByCategoryIdAndLangCode(
            @PathVariable UUID categoryId,
            @PathVariable String langCode) {
        return createResponse(
                mapper.toDTO(categoryTranslationService.findByCategoryIdAndLangCode(categoryId, langCode)),
                "category.translation.get.success.title",
                "category.translation.get.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/lang/{langCode}/name/{name}")
    @PreAuthorize("hasAuthority('CATEGORY-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> getTranslationByLangCodeAndName(
            @PathVariable String langCode,
            @PathVariable String name) {
        return createResponse(
                mapper.toDTO(categoryTranslationService.findByLangCodeAndName(langCode, name)),
                "category.translation.get.success.title",
                "category.translation.get.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/lang/{langCode}")
    @PreAuthorize("hasAuthority('CATEGORY-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> getTranslationsByLangCode(@PathVariable String langCode) {
        List<CategoryTranslationResponse> translations = categoryTranslationService.findByLangCode(langCode)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
        return createResponse(
                translations,
                "category.translation.search.success.title",
                "category.translation.search.success.detail",
                HttpStatus.OK
        );
    }

    @PostMapping(value = "/category/{categoryId}/create")
    @PreAuthorize("hasAuthority('CATEGORY-TRANSLATION:CREATE')")
    public ResponseEntity<ResponsePayload> createTranslationForCategory(
            @PathVariable UUID categoryId,
            @Valid @RequestBody CategoryTranslationRequest request) {
        return createResponse(
                mapper.toDTO(categoryTranslationService.createTranslationForCategory(categoryId, request)),
                "category.translation.create.success.title",
                "category.translation.create.success.detail",
                HttpStatus.OK
        );
    }
}

