package com.example.finance.mapper;

import com.example.finance.model.Category;
import com.example.finance.schemas.response.CategoryResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryResponseMapper extends AMapperBasic<Category, CategoryResponse> {
}
