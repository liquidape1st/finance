package com.example.finance.mapper;


import com.example.finance.schemas.response.BlogPostResponse;
import com.example.finance.model.BlogPost;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses =  {BlogPostCategoryResponseMapper.class})
public interface BlogResponseMapper extends AMapperBasic<BlogPost, BlogPostResponse>{
}
