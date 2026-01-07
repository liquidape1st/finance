package com.example.finance.schemas.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TagTranslationResponse {
    private UUID id;
    private String name;
    private String slug;
    private String langCode;
}

