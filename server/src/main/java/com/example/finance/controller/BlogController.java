package com.example.finance.controller;

import com.example.finance.mapper.BlogResponseMapper;
import com.example.finance.mapper.BlogTranslationResponseMapper;
import com.example.finance.pageable.CustomPage;
import com.example.finance.pageable.PageableObject;
import com.example.finance.schemas.request.BlogPostRequest;
import com.example.finance.schemas.response.BlogPostResponse;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.BlogService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogController extends BaseController implements AController<BlogPostRequest, UUID, PageableObject> {

    BlogService blogService;
    BlogResponseMapper mapper;
    BlogTranslationResponseMapper translationMapper;

    public BlogController(MessageSource messageSource, BlogService blogService, BlogResponseMapper mapper, BlogTranslationResponseMapper translationMapper) {
        super(messageSource);
        this.blogService = blogService;
        this.mapper = mapper;
        this.translationMapper = translationMapper;
    }

    @Override
    @PostMapping(value = "/search")
    @PreAuthorize("hasAuthority('BLOG:READ')")
    public ResponseEntity<ResponsePayload> search(@Valid @RequestBody PageableObject pageableObject) {
        CustomPage<BlogPostResponse> result = new CustomPage<>(blogService.searchEntities(pageableObject).map(mapper::toDTO));
        return createResponse(
                result,
                "blog.search.success.title",
                "blog.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/search")
    @PreAuthorize("hasAuthority('BLOG:READ')")
    public ResponseEntity<ResponsePayload> search() {
        return createResponse(
                blogService.findAllEntities().stream().map(mapper::toDTO),
                "blog.search.success.title",
                "blog.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PostMapping(value = "/create")
    @PreAuthorize("hasAuthority('BLOG:CREATE')")
    public ResponseEntity<ResponsePayload> create(@Valid @RequestBody BlogPostRequest request) {
        return createResponse(
                mapper.toDTO(blogService.createEntity(request)),
                "blog.create.success.title",
                "blog.create.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PutMapping(value = "/update/{uuid}")
    @PreAuthorize("hasAuthority('BLOG:UPDATE')")
    public ResponseEntity<ResponsePayload> update(@PathVariable UUID uuid, @Valid @RequestBody BlogPostRequest request) {
        return createResponse(
                mapper.toDTO(blogService.updateEntityById(uuid, request)),
                "blog.update.success.title",
                "blog.update.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/detail/{uuid}")
    @PreAuthorize("hasAuthority('BLOG:READ')")
    public ResponseEntity<ResponsePayload> detail(@PathVariable UUID uuid) {
        return createResponse(
                mapper.toDTO(blogService.findEntityById(uuid)),
                "blog.get.success.title",
                "blog.get.success.detail",
                HttpStatus.OK
        );
    }


    @Override
    @DeleteMapping(value = "/delete/{uuid}")
    @PreAuthorize("hasAuthority('BLOG:DELETE')")
    public ResponseEntity<ResponsePayload> delete(@PathVariable UUID uuid) {
        blogService.removeEntityById(uuid);
        return createResponse(
                null,
                "blog.delete.success.title",
                "blog.delete.success.detail",
                HttpStatus.OK
        );
    }

    // Additional endpoints for multi-language support
    @GetMapping(value = "/{uuid}/translations")
    @PreAuthorize("hasAuthority('BLOG-TRANSLATION:READ')")
    public ResponseEntity<ResponsePayload> getTranslationsByPostId(@PathVariable UUID uuid) {
        return createResponse(
                blogService.findTranslationsByPostId(uuid).stream().map(translationMapper::toDTO).toList(),
                "blog.translation.get.success.title",
                "blog.translation.get.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/{uuid}/lang/{langCode}")
    @PreAuthorize("hasAuthority('BLOG:READ')")
    public ResponseEntity<ResponsePayload> getPostByLangCode(
            @PathVariable UUID uuid,
            @PathVariable String langCode) {
        // Get the blog post and return it (translations will be included in the response)
        return createResponse(
                mapper.toDTO(blogService.findEntityById(uuid)),
                "blog.get.success.title",
                "blog.get.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/lang/{langCode}")
    @PreAuthorize("hasAuthority('BLOG:READ')")
    public ResponseEntity<ResponsePayload> getPostsByLangCode(@PathVariable String langCode) {
        return createResponse(
                blogService.findByLangCode(langCode).stream().map(mapper::toDTO).toList(),
                "blog.search.success.title",
                "blog.search.success.detail",
                HttpStatus.OK
        );
    }
}

