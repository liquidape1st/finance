package com.example.finance.mapper;


import com.example.finance.model.OrderItem;
import com.example.finance.schemas.response.OrderItemResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ProductResponseMapper.class})
public interface OrderItemResponseMapper extends AMapperBasic<OrderItem, OrderItemResponse> {
}
