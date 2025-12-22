package com.example.finance.schemas.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FeaturedClientBlogTranslation {
    @NotBlank
    private String langCode;
    private UUID category;
    @NotNull
    private Long seed;
}
