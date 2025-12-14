package com.example.finance.controller;

import com.example.finance.mapper.BlogTranslationResponseMapper;
import com.example.finance.pageable.CustomPage;
import com.example.finance.pageable.PageableObject;
import com.example.finance.schemas.request.BlogTranslationRequest;
import com.example.finance.schemas.response.BlogTranslationResponse;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.BlogTranslationService;
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
@RequestMapping("/api/blog-translations")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogTranslationController extends BaseController implements AController<BlogTranslationRequest, UUID, PageableObject> {

    BlogTranslationService blogTranslationService;
    BlogTranslationResponseMapper mapper;

    public BlogTranslationController(MessageSource messageSource, BlogTranslationService blogTranslationService, BlogTranslationResponseMapper mapper) {
        super(messageSource);
        this.blogTranslationService = blogTranslationService;
        this.mapper = mapper;
    }

    @Override
    @PostMapping(value = "/search")
    @PreAuthorize("hasAuthority('BLOG-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> search(@Valid @RequestBody PageableObject pageableObject) {
        CustomPage<BlogTranslationResponse> result = new CustomPage<>(
                blogTranslationService.searchEntities(pageableObject).map(mapper::toDTO)
        );
        return createResponse(
                result,
                "blog.translation.search.success.title",
                "blog.translation.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/search")
    @PreAuthorize("hasAuthority('BLOG-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> search() {
        return createResponse(
                blogTranslationService.findAllEntities().stream().map(mapper::toDTO).collect(Collectors.toList()),
                "blog.translation.search.success.title",
                "blog.translation.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PostMapping(value = "/create")
    @PreAuthorize("hasAuthority('BLOG-TRANSLATION:CREATE')")
    public ResponseEntity<ResponsePayload> create(@Valid @RequestBody BlogTranslationRequest request) {
        return createResponse(
                mapper.toDTO(blogTranslationService.createEntity(request)),
                "blog.translation.create.success.title",
                "blog.translation.create.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PutMapping(value = "/update/{uuid}")
    @PreAuthorize("hasAuthority('BLOG-TRANSLATION:UPDATE')")
    public ResponseEntity<ResponsePayload> update(@PathVariable UUID uuid, @Valid @RequestBody BlogTranslationRequest request) {
        return createResponse(
                mapper.toDTO(blogTranslationService.updateEntityById(uuid, request)),
                "blog.translation.update.success.title",
                "blog.translation.update.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/detail/{uuid}")
    @PreAuthorize("hasAuthority('BLOG-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> detail(@PathVariable UUID uuid) {
        return createResponse(
                mapper.toDTO(blogTranslationService.findEntityById(uuid)),
                "blog.translation.get.success.title",
                "blog.translation.get.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @DeleteMapping(value = "/delete/{uuid}")
    @PreAuthorize("hasAuthority('BLOG-TRANSLATION:DELETE')")
    public ResponseEntity<ResponsePayload> delete(@PathVariable UUID uuid) {
        blogTranslationService.removeEntityById(uuid);
        return createResponse(
                null,
                "blog.translation.delete.success.title",
                "blog.translation.delete.success.detail",
                HttpStatus.OK
        );
    }

    // Additional endpoints for multi-language support
    @GetMapping(value = "/post/{postId}")
    @PreAuthorize("hasAuthority('BLOG-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> getTranslationsByPostId(@PathVariable UUID postId) {
        List<BlogTranslationResponse> translations = blogTranslationService.findByPostId(postId)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
        return createResponse(
                translations,
                "blog.translation.get.success.title",
                "blog.translation.get.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/post/{postId}/lang/{langCode}")
    @PreAuthorize("hasAuthority('BLOG-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> getTranslationByPostIdAndLangCode(
            @PathVariable UUID postId,
            @PathVariable String langCode) {
        return createResponse(
                mapper.toDTO(blogTranslationService.findByPostIdAndLangCode(postId, langCode)),
                "blog.translation.get.success.title",
                "blog.translation.get.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/lang/{langCode}/slug/{slug}")
    @PreAuthorize("hasAuthority('BLOG-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> getTranslationByLangCodeAndSlug(
            @PathVariable String langCode,
            @PathVariable String slug) {
        return createResponse(
                mapper.toDTO(blogTranslationService.findByLangCodeAndSlug(langCode, slug)),
                "blog.translation.get.success.title",
                "blog.translation.get.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/lang/{langCode}")
    @PreAuthorize("hasAuthority('BLOG-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> getTranslationsByLangCode(@PathVariable String langCode) {
        List<BlogTranslationResponse> translations = blogTranslationService.findByLangCode(langCode)
                .stream()
                .map(mapper::toDTO)
                .collect(Collectors.toList());
        return createResponse(
                translations,
                "blog.translation.search.success.title",
                "blog.translation.search.success.detail",
                HttpStatus.OK
        );
    }

    @PostMapping(value = "/post/{postId}/create")
    @PreAuthorize("hasAuthority('BLOG-TRANSLATION:CREATE')")
    public ResponseEntity<ResponsePayload> createTranslationForPost(
            @PathVariable UUID postId,
            @Valid @RequestBody BlogTranslationRequest request) {
        return createResponse(
                mapper.toDTO(blogTranslationService.createTranslationForPost(postId, request)),
                "blog.translation.create.success.title",
                "blog.translation.create.success.detail",
                HttpStatus.OK
        );
    }
}

