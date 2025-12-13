package com.example.finance.schemas.ghn.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class WardDTO {
    private String wardCode;
    private String districtID;
    private String wardName;
}