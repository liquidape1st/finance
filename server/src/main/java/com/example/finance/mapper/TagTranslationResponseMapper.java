package com.example.finance.mapper;

import com.example.finance.model.Tag;
import com.example.finance.model.TagTranslation;
import com.example.finance.schemas.response.TagTranslationResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TagTranslationResponseMapper extends AMapperBasic<TagTranslation, TagTranslationResponse> {
}

