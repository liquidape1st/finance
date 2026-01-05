package com.example.finance.mapper;

import com.example.finance.model.CategoryTranslation;
import com.example.finance.schemas.response.CategoryTranslationResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryTranslationResponseMapper extends AMapperBasic<CategoryTranslation, CategoryTranslationResponse> {
}

