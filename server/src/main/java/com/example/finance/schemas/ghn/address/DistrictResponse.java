package com.example.finance.schemas.ghn.address;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class DistrictResponse {
    private int code;
    private String message;
    private List<DistrictItem> data;

    @Data
    public static class DistrictItem {
        @JsonProperty("DistrictID")
        private Integer districtId;

        @JsonProperty("ProvinceID")
        private String provinceId;

        @JsonProperty("DistrictName")
        private String districtName;

        @JsonProperty("Code")
        private String code;
    }
}
