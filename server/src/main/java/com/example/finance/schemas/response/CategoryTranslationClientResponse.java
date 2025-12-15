package com.example.finance.schemas.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryTranslationClientResponse {
    private UUID id;
    private String langCode;
    private String name;
    private UUID categoryId;
}

