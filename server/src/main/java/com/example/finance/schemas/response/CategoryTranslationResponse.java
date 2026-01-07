package com.example.finance.schemas.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryTranslationResponse {
    private UUID id;
    private String langCode;
    private String slug;
    private String name;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

