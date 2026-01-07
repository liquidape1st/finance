package com.example.finance.schemas.response;

import com.example.finance.model.Blog;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogTranslationClientResponse {
    private UUID id;
    private String langCode;
    private String slug;
    private String title;
    private String content;
    private String excerpt;
    private UUID blogId;

    private Blog.UiType uiType;
    private Blog.ContentType contentType;

    private Integer view;
    private String image;
    private String author;
    private Boolean featured;
    private Integer estimatedReadTime;
    private CategoryTranslationClientResponse category;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

