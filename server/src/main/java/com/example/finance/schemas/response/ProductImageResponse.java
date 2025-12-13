package com.example.finance.schemas.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductImageResponse {
    private UUID id;
    private String filename;
    private Integer displayOrder;
    private Boolean isPrimary;
}
