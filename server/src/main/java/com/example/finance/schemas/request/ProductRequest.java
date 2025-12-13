package com.example.finance.schemas.request;

import com.example.finance.group.CreateMethod;
import com.example.finance.group.UpdateMethod;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
public class ProductRequest {
    @NotBlank(groups = {CreateMethod.class})
    private String code;

    @NotBlank(groups = {CreateMethod.class, UpdateMethod.class})
    private String name;

    @NotNull(message = "Category ID is required", groups = {CreateMethod.class, UpdateMethod.class})
    private UUID categoryId;

    @NotNull(message = "Price is required", groups = {CreateMethod.class, UpdateMethod.class})
    @Positive(message = "Price must be positive", groups = {CreateMethod.class, UpdateMethod.class})
    private BigDecimal price;

    private List<ProductImageRequest> images;

    private String slug;

    private String excerpt;

    private String description;

    private Integer stock = 0;

    private Double rating = 0.0;
    
    @Data
    public static class ProductImageRequest {
        @NotBlank(message = "Image URL is required", groups = {CreateMethod.class, UpdateMethod.class})
        private String filename;
        
        private Integer displayOrder = 0;
        
        private Boolean isPrimary = false;
    }
}

