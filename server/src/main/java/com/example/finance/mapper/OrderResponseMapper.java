package com.example.finance.mapper;


import com.example.finance.model.Order;
import com.example.finance.schemas.response.OrderResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {OrderItemResponseMapper.class, OrderHistoryResponseMapper.class})
public interface OrderResponseMapper extends AMapperBasic<Order, OrderResponse> {
}
