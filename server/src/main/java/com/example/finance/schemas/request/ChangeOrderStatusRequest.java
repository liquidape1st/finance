package com.example.finance.schemas.request;

import com.example.finance.model.Order;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChangeOrderStatusRequest {
    @NotBlank
    private String code;
    @NotNull
    private Order.OrderStatus status;
    @NotBlank
    private String reason;
}
