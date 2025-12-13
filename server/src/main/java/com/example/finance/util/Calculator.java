package com.example.finance.util;

import com.example.finance.constant.Constant;
import com.example.finance.exception.BusinessException;
import com.example.finance.model.Product;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class Calculator {

    private final ObjectMapper objectMapper;

    @Data
    @AllArgsConstructor
    public static class CalculatorItemInput {
        private Product product;
        private Integer quantity;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CalculatorInput {
        private List<CalculatorItemInput> items;
        private String toDistrictId;
        private String toWardCode;
    }

    @Data
    public static class FeeItem {
        private String name;
        private Integer quantity;
        private Integer length;
        private Integer width;
        private Integer height;
        private Integer weight;
    }

    @Data
    public static class FeeRequest {
        private Integer service_type_id;
        private Integer from_district_id;
        private String from_ward_code;
        private Integer to_district_id;
        private String to_ward_code;
        private Integer weight;
        private Integer insurance_value;
        private String coupon;
        private List<FeeItem> items;
    }

    RestTemplate restTemplate = new RestTemplate();

    public long calculatorFee(CalculatorInput inputData) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("token", Constant.GHN.TOKEN);
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Build request theo đúng JSON bạn đưa
            FeeRequest request = new FeeRequest();
            request.setService_type_id(2);
            request.setFrom_district_id(Integer.valueOf("1680"));
            request.setFrom_ward_code("220108");
            request.setTo_district_id(Integer.valueOf(inputData.getToDistrictId()));
            request.setTo_ward_code(inputData.getToWardCode());

            // tổng weight = tổng của tất cả item.weight * quantity
            int totalWeight = inputData.getItems().stream()
                    .mapToInt(i -> i.getProduct().getWeight() * i.getQuantity())
                    .sum();
            request.setWeight(totalWeight);

            request.setInsurance_value(0);
            request.setCoupon(null);

            // convert CalculatorItemInput → FeeItem
            List<FeeItem> feeItems = inputData.getItems().stream().map(i -> {
                FeeItem fi = new FeeItem();
                fi.setName(i.getProduct().getName());
                fi.setQuantity(i.getQuantity());
                fi.setLength(i.getProduct().getLength());
                fi.setWidth(i.getProduct().getWidth());
                fi.setHeight(i.getProduct().getHeight());
                fi.setWeight(i.getProduct().getWeight());
                return fi;
            }).toList();

            request.setItems(feeItems);

            HttpEntity<FeeRequest> entity = new HttpEntity<>(request, headers);

            ResponseEntity<String> response = restTemplate.exchange(
                    "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            System.out.println(response.getBody());

            JsonNode root = objectMapper.readTree(response.getBody());
            long total = root.path("data").path("total").asLong();  // nếu muốn int thì asInt()

            System.out.println("Total: " + total);
            return total;
        } catch (JsonProcessingException e) {
            log.error("Lỗi parse JSON khi tính phí vận chuyển", e);
            throw new BusinessException("Tính toán phí vận chuyển thất bại");
        } catch (Exception e){
            log.error("Lỗi khi tính toán phí vận chuyển", e);
            throw new BusinessException("Tính toán phí vận chuyển thất bại");
        }
    }
}
