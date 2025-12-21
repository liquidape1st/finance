package com.example.finance.controller;

import com.example.finance.mapper.CategoryResponseMapper;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.CategoryService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/categories")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController extends BaseController {
    CategoryService categoryService;
    CategoryResponseMapper mapper;

    public CategoryController(MessageSource messageSource, CategoryService categoryService, CategoryResponseMapper mapper) {
        super(messageSource);
        this.categoryService = categoryService;
        this.mapper = mapper;
    }

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
}
