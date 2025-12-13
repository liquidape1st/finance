package com.example.finance.util;

import com.example.finance.model.Product;
import com.example.finance.schemas.response.CartItemResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class CartItemMapper {
    
    private final ProductImageHelper imageHelper;
    
    public CartItemResponse toCartItemResponse(Product product, Integer quantity) {
        CartItemResponse response = new CartItemResponse();
        response.setProductCode(product.getCode());
        response.setProductName(product.getName());
        response.setProductImage(imageHelper.getPrimaryImageUrl(product));
        response.setCategory(product.getCategory() != null ? product.getCategory().getName() : null);
        response.setPrice(product.getPrice());
        response.setQuantity(quantity);
        response.setSubtotal(product.getPrice().multiply(BigDecimal.valueOf(quantity)));
        return response;
    }
}

