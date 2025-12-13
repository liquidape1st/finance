package com.example.finance.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ObjectUtils {
    ObjectMapper objectMapper;
    public <T> T deepClone(T source, Class<T> clazz) throws JsonProcessingException {
        return objectMapper.readValue(
                objectMapper.writeValueAsString(source),
                clazz
        );
    }
}
