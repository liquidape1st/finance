package com.example.finance.schemas.response;

import com.example.finance.model.Blog;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class BlogResponse {
    private UUID id;
    private String image;
    private String author;
    private Boolean enabled;
    private Boolean featured;
    private Integer estimatedReadTime;
    private MinCategoryResponse category;
    private List<TagResponse> tags;
    private Blog.UiType uiType;
    private List<BlogTranslationClientResponse> translations;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

