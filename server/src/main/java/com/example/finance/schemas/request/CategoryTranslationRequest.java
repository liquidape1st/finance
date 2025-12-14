package com.example.finance.schemas.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryTranslationRequest {
    @NotBlank(message = "Language code is required")
    private String langCode; // vi, en, ja, fr...

    @NotBlank(message = "Name is required")
    private String name;

    private UUID categoryId; // Optional, used when creating translation for existing category
}

