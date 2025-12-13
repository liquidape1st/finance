package com.example.finance.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Cart {
    private String fullName = "";
    private String phone = "";
    private String email = "";

    private String toProvinceId = "";
    private String toDistrictId = "";
    private String toWardCode = "";
    private String address = "";

    private PaymentMethod paymentMethod = PaymentMethod.CASH;
    private BigDecimal feeShip = BigDecimal.ZERO;

    private String customerNote = "";

    private List<CartItem> items;
}
