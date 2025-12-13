package com.example.finance.mapper;

import com.example.finance.model.OrderHistory;
import com.example.finance.schemas.response.OrderHistoryResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderHistoryResponseMapper extends AMapperBasic<OrderHistory, OrderHistoryResponse> {
}
