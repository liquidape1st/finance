package com.example.finance.schemas.request;

import com.example.finance.group.CreateMethod;
import com.example.finance.group.UpdateMethod;
import com.example.finance.model.Blog;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogRequest {
    @Data
    public static class BlogCategoryRequest {
        @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
        private UUID id;
    }

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private Boolean featured = false;

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private String image;

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private Blog.UiType uiType;

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private Blog.ContentType contentType;

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private Integer estimatedReadTime;

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private BlogCategoryRequest category;

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private List<BlogTranslationRequest> translations;

    @NotNull(groups = {CreateMethod.class, UpdateMethod.class})
    private List<UUID> tags;
}