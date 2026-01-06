package com.example.finance.mapper;

import com.example.finance.model.Tag;
import com.example.finance.schemas.response.TagResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TagResponseMapper extends AMapperBasic<Tag, TagResponse> {
}
