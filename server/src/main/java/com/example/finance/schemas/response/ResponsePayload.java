package com.example.finance.schemas.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.net.URI;
import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ResponsePayload {
    @JsonProperty("type")
    private URI type;

    @JsonProperty("title")
    private String title;

    @JsonProperty("status")
    private int status;

    @JsonProperty("detail")
    private String detail;

    @JsonProperty("instance")
    private URI instance;

    @Builder.Default
    @JsonProperty("timestamp")
    private Instant timestamp = Instant.now();

    @JsonProperty("traceId")
    private String traceId;

    @JsonProperty("data")
    private Object data;
}