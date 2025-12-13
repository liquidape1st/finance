package com.example.finance.schemas.request;

import com.example.finance.model.PaymentMethod;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    @NotEmpty(message = "Order items are required")
    @Valid
    private List<OrderItemRequest> items;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Customer phone is required")
    private String customerPhone;

    @NotBlank(message = "Customer province is required")
    private String customerProvinceId;

    @NotBlank(message = "Customer district is required")
    private String customerDistrictId;

    @NotBlank(message = "Customer ward is required")
    private String customerWardCode;

    @NotBlank(message = "Customer address is required")
    private String customerAddress;

    private String customerNote;

    private String moderatorNote;

    private String customerEmail;

    private PaymentMethod paymentMethod;
}

