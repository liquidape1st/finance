package com.example.finance.schemas.response;

import com.example.finance.model.Blog;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
public class BlogTranslationClientResponse {
    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class Slug {
        private String slug;
        private String langCode;
    }
    private UUID id;
    private String langCode;
    private String slug;
    private String title;
    private String content;
    private String excerpt;
    private UUID blogId;

    private Blog.UiType uiType;

    private Integer view;
    private String image;
    private String author;
    private Boolean featured;
    private Integer estimatedReadTime;
    private CategoryTranslationClientResponse category;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<Slug> slugs;

    public BlogTranslationClientResponse(UUID id, String langCode, String slug, String title, String content, String excerpt, UUID blogId, Blog.UiType uiType, Integer view, String image, String author, Boolean featured, Integer estimatedReadTime, CategoryTranslationClientResponse category, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.langCode = langCode;
        this.slug = slug;
        this.title = title;
        this.content = content;
        this.excerpt = excerpt;
        this.blogId = blogId;
        this.uiType = uiType;
        this.view = view;
        this.image = image;
        this.author = author;
        this.featured = featured;
        this.estimatedReadTime = estimatedReadTime;
        this.category = category;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.slugs = new ArrayList<>();
    }
}

