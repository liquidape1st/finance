package com.example.finance.schemas.ghn.address;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ProvinceResponse {
    private int code;
    private String message;
    private List<ProvinceItem> data;

    @Data
    public static class ProvinceItem {
        @JsonProperty("ProvinceID")
        private int provinceId;

        @JsonProperty("ProvinceName")
        private String provinceName;

        @JsonProperty("Code")
        private String Code;
        // getters/setters
    }
}
