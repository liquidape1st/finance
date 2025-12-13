package com.example.finance.controller;

import com.example.finance.schemas.response.ResponsePayload;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@RequiredArgsConstructor
public abstract class BaseController {
    private final MessageSource messageSource;
    private static final String BASE_ERROR_TYPE = "https://api.ph4ntoms.com/errors/";

    protected ResponseEntity<ResponsePayload> createResponse(Object data, String titleCode, String detailCode, HttpStatus status, Object... args) {
        String title = getMessage(titleCode, args);
        String detail = getMessage(detailCode, args);
        String traceId = UUID.randomUUID().toString();

        // Format instance as "uri=/api/v1/rbac/..."
        String instance = "uri=" + ServletUriComponentsBuilder.fromCurrentRequest().build().getPath();

        // Format type as "https://api.ph4ntoms.com/errors/{status}"
        URI type = URI.create(BASE_ERROR_TYPE + status.value());

        ResponsePayload response = ResponsePayload.builder()
                .data(data)
                .title(title)
                .detail(detail)
                .status(status.value())
                .type(type)
                .instance(URI.create(instance))
                .traceId(traceId)
                .build();

        return new ResponseEntity<>(response, status);
    }

    protected String getMessage(String code, Object... args) {
        try {
            return messageSource.getMessage(code, args, code, LocaleContextHolder.getLocale());
        } catch (Exception e) {
            return code;
        }
    }
}