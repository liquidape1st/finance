package com.example.finance.controller;

import com.example.finance.group.CreateMethod;
import com.example.finance.group.UpdateMethod;
import com.example.finance.mapper.ProductResponseMapper;
import com.example.finance.pageable.CustomPage;
import com.example.finance.pageable.ProductPageableObjectSearch;
import com.example.finance.schemas.request.ProductRequest;
import com.example.finance.schemas.response.ProductResponse;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.ProductService;
import jakarta.validation.Valid;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductController extends BaseController implements AController<ProductRequest, String, ProductPageableObjectSearch> {

    ProductService productService;
    ProductResponseMapper mapper;

    public ProductController(MessageSource messageSource, ProductService productService, ProductResponseMapper mapper) {
        super(messageSource);
        this.productService = productService;
        this.mapper = mapper;
    }

    @Override
    @PostMapping(value = "/search")
    public ResponseEntity<ResponsePayload> search(@Valid @RequestBody ProductPageableObjectSearch pageableObject) {
        CustomPage<ProductResponse> result = new CustomPage<>(productService.searchEntities(pageableObject, pageableObject.getCategory()).map(mapper::toDTO));
        return createResponse(
                result,
                "product.search.success.title",
                "product.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/search")
    public ResponseEntity<ResponsePayload> search() {
        return createResponse(
                productService.findAllEntities().stream().map(mapper::toDTO),
                "product.search.success.title",
                "product.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PostMapping(value = "/create")
    public ResponseEntity<ResponsePayload> create(@Validated(CreateMethod.class) @RequestBody ProductRequest request) {
        return createResponse(
                mapper.toDTO(productService.createEntity(request)),
                "product.create.success.title",
                "product.create.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PutMapping(value = "/update/{code}")
    public ResponseEntity<ResponsePayload> update(@PathVariable String code, @Validated(UpdateMethod.class) @RequestBody ProductRequest request) {
        return createResponse(
                mapper.toDTO(productService.updateEntityById(code, request)),
                "product.update.success.title",
                "product.update.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/detail/{code}")
    public ResponseEntity<ResponsePayload> detail(@PathVariable String code) {
        return createResponse(
                mapper.toDTO(productService.findEntityById(code)),
                "product.get.success.title",
                "product.get.success.detail",
                HttpStatus.OK
        );
    }

    @GetMapping(value = "/detail/slug/{slug}")
    public ResponseEntity<ResponsePayload> detailBySlug(@PathVariable String slug) {
        return createResponse(
                mapper.toDTO(productService.findEntityBySlug(slug)),
                "category.get.success.title",
                "category.get.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @DeleteMapping(value = "/delete/{code}")
    public ResponseEntity<ResponsePayload> delete(@PathVariable String code) {
        productService.removeEntityById(code);
        return createResponse(
                null,
                "product.delete.success.title",
                "product.delete.success.detail",
                HttpStatus.NO_CONTENT
        );
    }
}

