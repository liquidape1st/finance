package com.example.finance.schemas.response;

import com.example.finance.model.Order;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderHistoryResponse {
    private String id;
    private Order.OrderStatus oldStatus;
    private Order.OrderStatus newStatus;

    private Order.PaymentStatus oldPaymentStatus;
    private Order.PaymentStatus newPaymentStatus;

    @Column(name = "action_by")
    private String actionBy;
    // Ghi chú
    @Column(columnDefinition = "TEXT")
    private String reason;
}
