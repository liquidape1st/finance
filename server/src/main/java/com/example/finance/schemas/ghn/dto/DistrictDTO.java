package com.example.finance.schemas.ghn.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DistrictDTO {
    private Integer districtId;
    private String provinceId;
    private String districtName;
    private String code;
}