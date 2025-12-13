package com.example.finance.exception;

import lombok.Getter;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

@Getter
public class EntityAlreadyExistsException extends RuntimeException {
    private final String entityName;
    private final String fieldName;
    private final Object fieldValue;
    private final String customMessage;

    public EntityAlreadyExistsException(String message) {
        super(message);
        this.entityName = null;
        this.fieldName = null;
        this.fieldValue = null;
        this.customMessage = message;
    }

    public EntityAlreadyExistsException(String entityName, String fieldName, Object fieldValue) {
        super(String.format("%s already exists with %s : '%s'", entityName, fieldName, fieldValue));
        this.entityName = entityName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
        this.customMessage = null;
    }

    public String getLocalizedMessage(MessageSource messageSource) {
        if (customMessage != null) {
            return customMessage;
        }
        if (entityName == null || fieldName == null || fieldValue == null) {
            return messageSource.getMessage("entity.already.exists", null, LocaleContextHolder.getLocale());
        }
        return messageSource.getMessage(
            "entity.already.exists.with.field",
            new Object[]{entityName, fieldName, fieldValue},
            LocaleContextHolder.getLocale()
        );
    }
} 