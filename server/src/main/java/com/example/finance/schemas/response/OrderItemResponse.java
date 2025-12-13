package com.example.finance.schemas.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemResponse {
    private UUID id;
    private ProductResponse product;
    private Integer quantity;
    private BigDecimal price;
}

