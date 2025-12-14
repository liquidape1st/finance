package com.example.finance.controller;

import com.example.finance.mapper.BlogPostCategoryResponseMapper;
import com.example.finance.pageable.CustomPage;
import com.example.finance.pageable.PageableObject;
import com.example.finance.schemas.request.BlogPostCategoryRequest;
import com.example.finance.schemas.response.BlogPostCategoryResponse;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.CategoryService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/blog-categories")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogPostCategoryController extends BaseController implements AController<BlogPostCategoryRequest, UUID, PageableObject> {
    CategoryService categoryService;
    BlogPostCategoryResponseMapper mapper;

    public BlogPostCategoryController(MessageSource messageSource, CategoryService categoryService, BlogPostCategoryResponseMapper mapper) {
        super(messageSource);
        this.categoryService = categoryService;
        this.mapper = mapper;
    }

    @Override
    @PostMapping(value = "/search")
    public ResponseEntity<ResponsePayload> search(PageableObject pageableObject) {
        CustomPage<BlogPostCategoryResponse> result = new CustomPage<>(categoryService.searchEntities(pageableObject).map(mapper::toDTO));
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
                categoryService.findAllEntities().stream().map(mapper::toDTO),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PostMapping(value = "/create")
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
    public ResponseEntity<ResponsePayload> delete(@PathVariable UUID uuid) {
        categoryService.removeEntityById(uuid);
        return createResponse(
                null,
                "category.delete.success.title",
                "category.delete.success.detail",
                HttpStatus.OK
        );
    }
}
