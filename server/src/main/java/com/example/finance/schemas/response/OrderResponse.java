package com.example.finance.schemas.response;

import com.example.finance.converter.EpochToLocalDateTimeDeserializer;
import com.example.finance.converter.LocalDateTimeConverter;
import com.example.finance.converter.LocalDateTimeToEpochSerializer;
import com.example.finance.model.Order;
import com.example.finance.model.OrderHistory;
import com.example.finance.model.PaymentMethod;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.Convert;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {
    private String code;
    private BigDecimal subTotal;
    private BigDecimal feeShip;
    private BigDecimal total;
    private Order.OrderStatus status;
    private Order.PaymentStatus paymentStatus;
    private PaymentMethod paymentMethod;

    private String customerName;
    private String customerPhone;

    private String customerProvinceId;
    private String customerProvinceName;
    private String customerDistrictId;
    private String customerDistrictName;
    private String customerWardCode;
    private String customerWardName;
    private String customerAddress;
    private String customerEmail;

    private List<OrderItemResponse> items;
    private List<OrderHistory> histories;

    @Convert(converter = LocalDateTimeConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    @JsonSerialize(using = LocalDateTimeToEpochSerializer.class)
    @JsonDeserialize(using = EpochToLocalDateTimeDeserializer.class)
    private LocalDateTime createdAt;

    @Convert(converter = LocalDateTimeConverter.class)
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    @JsonSerialize(using = LocalDateTimeToEpochSerializer.class)
    @JsonDeserialize(using = EpochToLocalDateTimeDeserializer.class)
    private LocalDateTime updatedAt;


}

