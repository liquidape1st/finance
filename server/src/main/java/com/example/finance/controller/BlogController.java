package com.example.finance.controller;

import com.example.finance.mapper.BlogResponseMapper;
import com.example.finance.pageable.CustomPage;
import com.example.finance.pageable.PageableObject;
import com.example.finance.schemas.request.BlogPostRequest;
import com.example.finance.schemas.response.BlogPostResponse;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.BlogPostService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogController extends BaseController implements AController<BlogPostRequest, UUID, PageableObject> {

    BlogPostService blogPostService;
    BlogResponseMapper mapper;

    public BlogController(MessageSource messageSource, BlogPostService blogPostService, BlogResponseMapper mapper) {
        super(messageSource);
        this.blogPostService = blogPostService;
        this.mapper = mapper;
    }

    @Override
    @PostMapping(value = "/search")
    public ResponseEntity<ResponsePayload> search(@Valid @RequestBody PageableObject pageableObject) {
        CustomPage<BlogPostResponse> result = new CustomPage<>(blogPostService.searchEntities(pageableObject).map(mapper::toDTO));
        return createResponse(
                result,
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/search")
    public ResponseEntity<ResponsePayload> search() {
        return createResponse(
                blogPostService.findAllEntities().stream().map(mapper::toDTO),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PostMapping(value = "/create")
    public ResponseEntity<ResponsePayload> create(@Valid @RequestBody BlogPostRequest request) {
        return createResponse(
                mapper.toDTO(blogPostService.createEntity(request)),
                "category.create.success.title",
                "category.create.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PutMapping(value = "/update/{uuid}")
    public ResponseEntity<ResponsePayload> update(@PathVariable UUID uuid, @Valid @RequestBody BlogPostRequest request) {
        return createResponse(
                mapper.toDTO(blogPostService.updateEntityById(uuid, request)),
                "category.update.success.title",
                "category.update.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/detail/{uuid}")
    public ResponseEntity<ResponsePayload> detail(@PathVariable UUID uuid) {
        return createResponse(
                mapper.toDTO(blogPostService.findEntityById(uuid)),
                "category.get.success.title",
                "category.get.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/detail/slug/{slug}")
    public ResponseEntity<ResponsePayload> detailBySlug(@PathVariable String slug) {
        return createResponse(
                mapper.toDTO(blogPostService.findEntityBySlug(slug)),
                "category.get.success.title",
                "category.get.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @DeleteMapping(value = "/delete/{uuid}")
    public ResponseEntity<ResponsePayload> delete(@PathVariable UUID uuid) {
        blogPostService.removeEntityById(uuid);
        return createResponse(
                null,
                "category.delete.success.title",
                "category.delete.success.detail",
                HttpStatus.OK
        );
    }
}

