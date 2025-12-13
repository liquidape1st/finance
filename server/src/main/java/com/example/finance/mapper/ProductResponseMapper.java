package com.example.finance.mapper;


import com.example.finance.schemas.response.ProductResponse;
import com.example.finance.model.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductResponseMapper extends AMapperBasic<Product, ProductResponse> {
}
