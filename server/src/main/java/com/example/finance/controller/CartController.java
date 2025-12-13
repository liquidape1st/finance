package com.example.finance.controller;

import com.example.finance.schemas.request.CartItemRequest;
import com.example.finance.schemas.request.UpdateCartShippingAddressRequest;
import com.example.finance.schemas.request.UpdateRecipientInfoRequest;
import com.example.finance.schemas.response.CartItemResponse;
import com.example.finance.schemas.response.ResponsePayload;
import com.example.finance.service.CartService;
import com.example.finance.util.Calculator;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CartController extends BaseController {

    CartService cartService;
    Calculator calculator;

    public CartController(MessageSource messageSource, CartService cartService, Calculator calculator) {
        super(messageSource);
        this.cartService = cartService;
        this.calculator = calculator;
    }

    @GetMapping
    public ResponseEntity<ResponsePayload> getCart(@RequestHeader(value = "X-Session-Id", required = false, defaultValue = "default") String sessionId) throws JsonProcessingException {
        return createResponse(cartService.getCart(sessionId), "product.search.success.title", "product.search.success.detail", HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponsePayload> addToCart(@RequestHeader(value = "X-Session-Id", required = false, defaultValue = "default") String sessionId, @Valid @RequestBody CartItemRequest request) throws JsonProcessingException {
        return createResponse(cartService.addToCart(sessionId, request), "product.search.success.title", "product.search.success.detail", HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ResponsePayload> updateCartItem(@RequestHeader(value = "X-Session-Id", required = false, defaultValue = "default") String sessionId, @Valid @RequestBody CartItemRequest request) throws JsonProcessingException {
        CartItemResponse response = cartService.updateCartItem(sessionId, request);
        if (response == null) {
            return createResponse(null, "product.search.success.title", "product.search.success.detail", HttpStatus.OK);
        }
        return createResponse(response, "product.search.success.title", "product.search.success.detail", HttpStatus.OK);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ResponsePayload> removeFromCart(@RequestHeader(value = "X-Session-Id", required = false, defaultValue = "default") String sessionId, @PathVariable String productId) {
        cartService.removeFromCart(sessionId, productId);
        return createResponse(null, "product.search.success.title", "product.search.success.detail", HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<ResponsePayload> clearCart(@RequestHeader(value = "X-Session-Id", required = false, defaultValue = "default") String sessionId) {
        cartService.clearCart(sessionId);
        return createResponse(null, "product.search.success.title", "product.search.success.detail", HttpStatus.OK);
    }

    @GetMapping(value = "/fee")
    public ResponseEntity<?> getFee(@RequestHeader(value = "X-Session-Id", required = false, defaultValue = "default") String sessionId) {
        Calculator.CalculatorInput input = new Calculator.CalculatorInput();
        calculator.calculatorFee(input);
        return createResponse(
                null,
                "category.search.success.title",
                "category.search.success.detail",
                HttpStatus.OK
        );
    }

    @PutMapping(value = "/shipping-address")
    public ResponseEntity<ResponsePayload> updateCartInformation(@RequestHeader(value = "X-Session-Id", required = false, defaultValue = "default") String sessionId, @Valid @RequestBody UpdateCartShippingAddressRequest request) {
        return createResponse(cartService.updateShippingAddress(sessionId, request), "product.search.success.title", "product.search.success.detail", HttpStatus.OK);
    }

    @PutMapping("/recipient")
    public ResponseEntity<ResponsePayload> updateRecipientInfo(
            @RequestHeader(value = "X-Session-Id", required = false, defaultValue = "default") String sessionId,
            @Valid @RequestBody UpdateRecipientInfoRequest request
    ) {
        return createResponse(
                cartService.updateRecipientInfo(sessionId, request),
                "cart.update.recipient.title",
                "cart.update.recipient.detail",
                HttpStatus.OK
        );
    }

    @PostMapping("/checkout")
    public ResponseEntity<ResponsePayload> checkout(
            @RequestHeader(value = "X-Session-Id", required = false, defaultValue = "default") String sessionId
    ) {
        return createResponse(
                cartService.checkout(sessionId),
                "order.create.success.title",
                "order.create.success.detail",
                HttpStatus.CREATED
        );
    }
}

