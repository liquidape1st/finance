package com.example.finance.schemas.ghn.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProvinceDTO {
    private Integer provinceId;
    private String provinceName;
    private String Code;
}