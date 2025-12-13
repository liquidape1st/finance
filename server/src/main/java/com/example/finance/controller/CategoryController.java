package com.example.finance.controller;

import com.example.finance.group.CreateMethod;
import com.example.finance.group.UpdateMethod;
import com.example.finance.pageable.PageableObject;
import com.example.finance.schemas.request.CategoryRequest;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.CategoryService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CategoryController extends BaseController implements AController<CategoryRequest, UUID, PageableObject> {

    CategoryService categoryService;

    public CategoryController(MessageSource messageSource, CategoryService categoryService) {
        super(messageSource);
        this.categoryService = categoryService;
    }

    @Override
    @PostMapping(value = "/search")
    public ResponseEntity<ResponsePayload> search(@Valid @RequestBody PageableObject pageableObject) {
        return createResponse(
                categoryService.searchEntities(pageableObject),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/search")
    public ResponseEntity<ResponsePayload> search() {
        return createResponse(
                categoryService.findAllEntities(),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PostMapping(value = "/create")
    public ResponseEntity<ResponsePayload> create(@Validated(CreateMethod.class) @RequestBody CategoryRequest request) {
        return createResponse(
                categoryService.createEntity(request),
                "category.create.success.title",
                "category.create.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PutMapping(value = "/update/{uuid}")
    public ResponseEntity<ResponsePayload> update(@PathVariable UUID uuid, @Validated(UpdateMethod.class) @RequestBody CategoryRequest request) {
        return createResponse(
                categoryService.updateEntityById(uuid, request),
                "category.update.success.title",
                "category.update.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/detail/{uuid}")
    public ResponseEntity<ResponsePayload> detail(@PathVariable UUID uuid) {
        return createResponse(
                categoryService.findEntityById(uuid),
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
