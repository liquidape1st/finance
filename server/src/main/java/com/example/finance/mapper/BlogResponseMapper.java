package com.example.finance.mapper;


import com.example.finance.model.Blog;
import com.example.finance.schemas.response.BlogResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses =  {CategoryResponseMapper.class, BlogTranslationResponseMapper.class})
public interface BlogResponseMapper extends AMapperBasic<Blog, BlogResponse>{
}
