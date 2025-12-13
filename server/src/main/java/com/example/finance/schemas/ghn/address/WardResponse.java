package com.example.finance.schemas.ghn.address;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class WardResponse {
    private int code;
    private String message;
    private List<WardItem> data;

    @Data
    public static class WardItem {
        @JsonProperty("WardCode")
        private String wardCode;

        @JsonProperty("DistrictID")
        private String districtID;

        @JsonProperty("WardName")
        private String wardName;
    }
}
