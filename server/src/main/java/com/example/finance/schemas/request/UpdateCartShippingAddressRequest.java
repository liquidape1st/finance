package com.example.finance.schemas.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateCartShippingAddressRequest {
    private String toProvinceId = "";
    private String toDistrictId = "";
    private String toWardCode = "";
    private String address = "";
}
