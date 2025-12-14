package com.example.finance.schemas.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogTranslationRequest {
    @NotBlank(message = "Language code is required")
    private String langCode; // vi, en, ja, fr...

    @NotBlank(message = "Slug is required")
    private String slug;

    @NotBlank(message = "Title is required")
    private String title;

    private String content;

    private String excerpt;

    private UUID postId; // Optional, used when creating translation for existing post
}

