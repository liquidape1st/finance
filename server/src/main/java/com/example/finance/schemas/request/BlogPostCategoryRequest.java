package com.example.finance.schemas.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BlogPostCategoryRequest {
    @NotBlank(message = "Language code is required")
    private String langCode; // vi, en, ja, fr...

    @NotBlank(message = "Name is required")
    private String name;
}
