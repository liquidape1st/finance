package com.example.finance.mapper;

import com.example.finance.model.BlogTranslation;
import com.example.finance.schemas.response.BlogTranslationClientResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BlogTranslationResponseMapper extends AMapperBasic<BlogTranslation, BlogTranslationClientResponse> {
    @Mapping(source = "blog.view", target = "view")
    @Mapping(source = "blog.image", target = "image")
    @Mapping(source = "blog.author", target = "author")
    @Mapping(source = "blog.featured", target = "featured")
    @Mapping(source = "blog.category", target = "category")
    @Mapping(source = "blog.estimatedReadTime", target = "estimatedReadTime")
    BlogTranslationClientResponse toDTO(BlogTranslation entity);
}

