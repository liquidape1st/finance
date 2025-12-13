package com.example.finance.schemas.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class BlogPostResponse {
    private UUID id;
    private String title;
    private String slug;
    private String content;
    private String excerpt;
    private String image;
    private String author;
    private Integer estimatedReadTime;
    private BlogPostCategoryResponse blogCategory;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

