package com.example.finance.controller;

import com.example.finance.mapper.OrderResponseMapper;
import com.example.finance.pageable.CustomPage;
import com.example.finance.pageable.OrderPageableObjectSearch;
import com.example.finance.schemas.request.ChangeOrderStatusRequest;
import com.example.finance.schemas.request.OrderRequest;
import com.example.finance.schemas.response.OrderResponse;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.OrderService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController extends BaseController implements AController<OrderRequest, String, OrderPageableObjectSearch> {

    OrderService orderService;
    OrderResponseMapper mapper;

    public OrderController(MessageSource messageSource, OrderService orderService, OrderResponseMapper mapper) {
        super(messageSource);
        this.orderService = orderService;
        this.mapper = mapper;
    }

    @Override
    @PostMapping(value = "/search")
    public ResponseEntity<ResponsePayload> search(@Valid @RequestBody OrderPageableObjectSearch pageableObject) {
        CustomPage<OrderResponse> result = new CustomPage<>(orderService.searchEntities(pageableObject).map(mapper::toDTO));
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
                orderService.findAllEntities().stream().map(mapper::toDTO),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PostMapping(value = "/create")
    public ResponseEntity<ResponsePayload> create(@Valid @RequestBody OrderRequest request) {
        return createResponse(
                mapper.toDTO(orderService.createEntity(request)),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @PutMapping(value = "/update/{code}")
    public ResponseEntity<ResponsePayload> update(@PathVariable String code, @Valid @RequestBody OrderRequest request) {
        return createResponse(
                mapper.toDTO(orderService.updateEntityById(code, request)),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @GetMapping(value = "/detail/{code}")
    public ResponseEntity<ResponsePayload> detail(@PathVariable String code) {
        return createResponse(
                mapper.toDTO(orderService.findEntityById(code)),
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @Override
    @DeleteMapping(value = "/delete/{code}")
    public ResponseEntity<ResponsePayload> delete(@PathVariable String code) {
        orderService.removeEntityById(code);
        return createResponse(
                null,
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @PostMapping(value = "/change-status")
    public ResponseEntity<ResponsePayload> changeStatus(@RequestBody ChangeOrderStatusRequest request) {
        orderService.changeStatusOrder(request);
        return createResponse(
                null,
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }
}

