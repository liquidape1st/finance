package com.example.finance.service;

import com.example.finance.exception.BusinessException;
import com.example.finance.exception.EntityNotFoundException;
import com.example.finance.model.Cart;
import com.example.finance.model.CartItem;
import com.example.finance.model.PaymentMethod;
import com.example.finance.model.Product;
import com.example.finance.repository.ProductRepository;
import com.example.finance.schemas.request.*;
import com.example.finance.schemas.response.CartItemResponse;
import com.example.finance.schemas.response.OrderResponse;
import com.example.finance.util.Calculator;
import com.example.finance.util.CartItemMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartService {

    private static final String CART_KEY_PREFIX = "cart:";

    private final ProductRepository productRepository;
    private final CartItemMapper cartItemMapper;
    private final StringRedisTemplate stringRedisTemplate;
    private final ObjectMapper objectMapper;
    private final Calculator calculator;
    private final OrderService orderService;

    public Cart getCart(String sessionId) throws JsonProcessingException {
        final String cartKey = buildCartKey(sessionId);
        final String json = stringRedisTemplate.opsForValue().get(cartKey);

        Cart cart;
        if (json == null) {
            cart = new Cart();
        } else {
            cart = objectMapper.readValue(json, Cart.class);
        }

        if (cart.getItems() == null) {
            cart.setItems(new ArrayList<>());
        }
        return cart;
    }

    public CartItemResponse addToCart(String sessionId, CartItemRequest request) throws JsonProcessingException {
        Product product = findProduct(request.getProductCode());

        final String cartKey = buildCartKey(sessionId);
        Cart cart = getCart(sessionId);

        // tìm item theo productCode
        List<CartItem> items = cart.getItems();
        CartItem existingItem = items.stream()
                .filter(i -> Objects.equals(i.getProduct().getCode(), request.getProductCode()))
                .findFirst()
                .orElse(null);

        int newQuantity;
        if (existingItem != null) {
            newQuantity = existingItem.getQuantity() + request.getQuantity();
            existingItem.setQuantity(newQuantity);
        } else {
            newQuantity = request.getQuantity();
            CartItem newItem = new CartItem(product, newQuantity);
            items.add(newItem);
        }

        // lưu lại cart dưới dạng JSON
        stringRedisTemplate.opsForValue().set(cartKey, objectMapper.writeValueAsString(cart));

        return cartItemMapper.toCartItemResponse(product, newQuantity);
    }

    public CartItemResponse updateCartItem(String sessionId, CartItemRequest request) throws JsonProcessingException {
        List<CartItem> cartItems = getCartItemsOrThrow(sessionId);
        CartItem item = validateCartItemExists(cartItems, request.getProductCode());

        final String cartKey = buildCartKey(sessionId);

        if (request.getQuantity() <= 0) {
            cartItems.remove(item);
            Cart cart = getCart(sessionId);
            cart.setItems(cartItems);
            stringRedisTemplate.opsForValue().set(cartKey, objectMapper.writeValueAsString(cart));
            return null;
        }

        item.setQuantity(request.getQuantity());
        Cart cart = getCart(sessionId);
        cart.setItems(cartItems);
        stringRedisTemplate.opsForValue().set(cartKey, objectMapper.writeValueAsString(cart));

        return cartItemMapper.toCartItemResponse(item.getProduct(), item.getQuantity());
    }

    public void removeFromCart(String sessionId, String productId) {
        final String cartKey = buildCartKey(sessionId);
        try {
            Cart cart = getCart(sessionId);
            List<CartItem> items = cart.getItems();
            if (items == null || items.isEmpty()) {
                return;
            }

            boolean changed = items.removeIf(i ->
                    i.getProduct() != null &&
                            Objects.equals(i.getProduct().getCode(), productId)
            );

            if (changed) {
                cart.setItems(items);
                stringRedisTemplate.opsForValue().set(cartKey, objectMapper.writeValueAsString(cart));
            }
        } catch (JsonProcessingException e) {
            throw new BusinessException("Cart not found for session: " + sessionId);
        }
    }

    public void clearCart(String sessionId) {
        final String cartKey = buildCartKey(sessionId);
        stringRedisTemplate.delete(cartKey);
    }

    private List<CartItem> getCartItems(String sessionId) throws JsonProcessingException {
        Cart cart = getCart(sessionId);
        return cart.getItems();
    }

    private List<CartItem> getCartItemsOrThrow(String sessionId) throws JsonProcessingException {
        List<CartItem> cartItems = getCartItems(sessionId);
        if (cartItems == null || cartItems.isEmpty()) {
            throw new BusinessException("Cart not found for session: " + sessionId);
        }
        return cartItems;
    }

    public Cart updateRecipientInfo(String sessionId, UpdateRecipientInfoRequest request) {
        final String cartKey = buildCartKey(sessionId);
        try {
            Cart cart = getCart(sessionId);
            cart.setFullName(request.getFullName());
            cart.setPhone(request.getPhone());
            cart.setEmail(request.getEmail());
            cart.setCustomerNote(request.getCustomerNote());
            cart.setAddress(request.getAddress());
            cart.setPaymentMethod(PaymentMethod.CASH);
            stringRedisTemplate.opsForValue().set(cartKey, objectMapper.writeValueAsString(cart));
            return cart;
        } catch (JsonProcessingException e) {
            throw new BusinessException("Cart not found for session: " + sessionId);
        }
    }

    public Cart updateShippingAddress(String sessionId, UpdateCartShippingAddressRequest request) {
        final String cartKey = buildCartKey(sessionId);
        try {
            Cart cart = getCart(sessionId);
            cart.setAddress(request.getAddress().isEmpty() ? cart.getAddress() : request.getAddress());
            if (!request.getToProvinceId().isEmpty()) {
                cart.setToProvinceId(request.getToProvinceId());
                cart.setToDistrictId("");
                cart.setToWardCode("");
            }
            if (!request.getToDistrictId().isEmpty()) {
                cart.setToDistrictId(request.getToDistrictId());
                cart.setToWardCode("");
            }
            if (!request.getToWardCode().isEmpty()) {
                cart.setToWardCode(request.getToWardCode());
            }
            if (!cart.getToProvinceId().isEmpty() && !cart.getToDistrictId().isEmpty() && !cart.getToWardCode().isEmpty()) {
                long fee = calculatorFee(cart);
                cart.setFeeShip(BigDecimal.valueOf(fee));
            } else {
                cart.setFeeShip(BigDecimal.ZERO);
            }
            stringRedisTemplate.opsForValue().set(cartKey, objectMapper.writeValueAsString(cart));
            return cart;
        } catch (JsonProcessingException e) {
            throw new BusinessException("Cart not found for session: " + sessionId);
        }
    }

    private CartItem validateCartItemExists(List<CartItem> cartItems, String productId) {
        return cartItems.stream()
                .filter(i -> i.getProduct() != null && Objects.equals(i.getProduct().getCode(), productId))
                .findFirst()
                .orElseThrow(() -> new BusinessException("Cart item not found"));
    }

    private Product findProduct(String productCode) {
        return productRepository
                .findByCode(productCode)
                .orElseThrow(() -> new EntityNotFoundException("Product", productCode));
    }

    private String buildCartKey(String sessionId) {
        return CART_KEY_PREFIX + sessionId;
    }

    private long calculatorFee(Cart cart) {
        List<Calculator.CalculatorItemInput> items = cart.getItems().stream().map((s) -> new Calculator.CalculatorItemInput(s.getProduct(), s.getQuantity())).toList();
        Calculator.CalculatorInput calculatorInput = Calculator.CalculatorInput
                .builder()
                .items(items)
                .toDistrictId(cart.getToDistrictId())
                .toWardCode(cart.getToWardCode())
                .build();
        return calculator.calculatorFee(calculatorInput);
    }

    public OrderRequest convertCartToOrderRequest(String sessionId) {
        try {
            Cart cart = getCart(sessionId);

            // Validate cart có items
            if (cart.getItems() == null || cart.getItems().isEmpty()) {
                throw new BusinessException("Cart is empty");
            }

            // Validate thông tin người nhận
            if (cart.getFullName() == null || cart.getFullName().isEmpty()) {
                throw new BusinessException("Customer name is required");
            }
            if (cart.getPhone() == null || cart.getPhone().isEmpty()) {
                throw new BusinessException("Customer phone is required");
            }
            if (cart.getAddress() == null || cart.getAddress().isEmpty()) {
                throw new BusinessException("Customer address is required");
            }

            // Convert CartItem → OrderItemRequest
            List<OrderItemRequest> orderItems = cart.getItems().stream()
                    .map(item -> {
                        OrderItemRequest orderItem = new OrderItemRequest();
                        orderItem.setProductCode(item.getProduct().getCode());
                        orderItem.setQuantity(item.getQuantity());
                        return orderItem;
                    })
                    .collect(Collectors.toList());
            // Build OrderRequest
            return OrderRequest.builder()
                    // Ste items
                    .items(orderItems)
                    // Set Thông tin cơ bản
                    .customerName(cart.getFullName())
                    .customerPhone(cart.getPhone())
                    .customerEmail(cart.getEmail())
                    // Set địa chỉ nhận hàng
                    .customerProvinceId(cart.getToProvinceId())
                    .customerDistrictId(cart.getToDistrictId())
                    .customerWardCode(cart.getToWardCode())
                    .customerAddress(cart.getAddress())
                    // Set phương thức thanh toán
                    .paymentMethod(cart.getPaymentMethod())
                    // Set note của khách hàng
                    .customerNote(cart.getCustomerNote())
                    .build();
        } catch (JsonProcessingException e) {
            throw new BusinessException("Cart not found for session: " + sessionId);
        }
    }

    @Transactional
    public OrderResponse checkout(String sessionId) {
        OrderRequest orderRequest = convertCartToOrderRequest(sessionId);
        orderService.createEntity(orderRequest);
        clearCart(sessionId);
        return null;
    }
}
