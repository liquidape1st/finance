package com.example.finance.mapper;

import com.example.finance.model.BlogTranslation;
import com.example.finance.schemas.response.BlogTranslationResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BlogTranslationResponseMapper extends AMapperBasic<BlogTranslation, BlogTranslationResponse> {

}

