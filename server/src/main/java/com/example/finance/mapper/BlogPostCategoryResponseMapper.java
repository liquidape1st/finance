package com.example.finance.mapper;

import com.example.finance.model.Category;
import com.example.finance.schemas.response.BlogPostCategoryResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BlogPostCategoryResponseMapper extends AMapperBasic<Category, BlogPostCategoryResponse> {
}
