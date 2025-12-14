package com.example.finance.schemas.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostRequest {
    @NotBlank(message = "Language code is required")
    private String langCode; // vi, en, ja, fr...

    @NotBlank(message = "Slug is required")
    private String slug;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Content is required")
    private String content;

    @NotNull(message = "Blog category ID is required")
    private UUID blogCategoryId;

    private String excerpt;

    private Integer estimatedReadTime;

    private String image;

    private String author;
}

