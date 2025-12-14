package com.example.finance.controller;

import com.example.finance.mapper.BlogResponseMapper;
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
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/posts")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogController extends BaseController implements AController<BlogPostRequest, UUID, PageableObject> {

    BlogService blogService;
    BlogResponseMapper mapper;

    public BlogController(MessageSource messageSource, BlogService blogService, BlogResponseMapper mapper) {
        super(messageSource);
        this.blogService = blogService;
        this.mapper = mapper;
    }

    @Override
    @PostMapping(value = "/search")
    public ResponseEntity<ResponsePayload> search(@Valid @RequestBody PageableObject pageableObject) {
        CustomPage<BlogPostResponse> result = new CustomPage<>(blogService.searchEntities(pageableObject).map(mapper::toDTO));
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
                blogService.findAllEntities().stream().map(mapper::toDTO),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PostMapping(value = "/create")
    public ResponseEntity<ResponsePayload> create(@Valid @RequestBody BlogPostRequest request) {
        return createResponse(
                mapper.toDTO(blogService.createEntity(request)),
                "category.create.success.title",
                "category.create.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PutMapping(value = "/update/{uuid}")
    public ResponseEntity<ResponsePayload> update(@PathVariable UUID uuid, @Valid @RequestBody BlogPostRequest request) {
        return createResponse(
                mapper.toDTO(blogService.updateEntityById(uuid, request)),
                "category.update.success.title",
                "category.update.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/detail/{uuid}")
    public ResponseEntity<ResponsePayload> detail(@PathVariable UUID uuid) {
        return createResponse(
                mapper.toDTO(blogService.findEntityById(uuid)),
                "category.get.success.title",
                "category.get.success.detail",
                HttpStatus.OK
        );
    }


    @Override
    @DeleteMapping(value = "/delete/{uuid}")
    public ResponseEntity<ResponsePayload> delete(@PathVariable UUID uuid) {
        blogService.removeEntityById(uuid);
        return createResponse(
                null,
                "category.delete.success.title",
                "category.delete.success.detail",
                HttpStatus.OK
        );
    }
}

