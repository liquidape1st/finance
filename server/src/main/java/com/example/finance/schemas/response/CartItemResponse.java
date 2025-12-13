package com.example.finance.schemas.response;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartItemResponse {
    private String productCode;
    private String productName;
    private String productImage;
    private String category;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal subtotal;
}

