package com.example.finance.schemas.request;

import com.example.finance.model.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateRecipientInfoRequest {
    private String fullName;
    private String email;
    private String phone;

    private String address;


    private PaymentMethod paymentMethod;
    private String customerNote;
}
