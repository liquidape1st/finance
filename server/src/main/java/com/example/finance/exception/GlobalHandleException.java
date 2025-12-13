package com.example.finance.exception;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.sql.SQLIntegrityConstraintViolationException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@ControllerAdvice
@RequiredArgsConstructor
public class GlobalHandleException {
    private final MessageSource messageSource;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ErrorResponse {
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

        @JsonProperty("timestamp")
        private Instant timestamp = Instant.now();

        @JsonProperty("traceId")
        private String traceId;

        @JsonProperty("errors")
        private Map<String, Object> errors;
    }

    private String getMessage(String code, Object[] args) {
        Locale locale = LocaleContextHolder.getLocale();
        return messageSource.getMessage(code, args, code, locale);
    }

    private ErrorResponse createErrorResponse(
            HttpStatus status,
            String title,
            String detail,
            String path,
            Map<String, Object> errors
    ) {
        ErrorResponse response = new ErrorResponse();
        response.setType(URI.create("https://api.ph4ntoms.com/errors/" + status.value()));
        response.setTitle(title);
        response.setStatus(status.value());
        response.setDetail(detail);
        response.setInstance(URI.create(path));
        response.setTraceId(java.util.UUID.randomUUID().toString());
        response.setErrors(errors);
        return response;
    }

    private ResponseEntity<ErrorResponse> handleException(
            Exception ex,
            WebRequest request,
            HttpStatus status,
            String title,
            String messageCode,
            Object[] messageArgs,
            Map<String, Object> errors
    ) {
        String detail = messageCode != null ? getMessage(messageCode, messageArgs) : ex.getMessage();
        ErrorResponse response = createErrorResponse(status, title, detail, request.getDescription(false), errors);

        if (status.is5xxServerError()) {
            log.error("{}: {}", ex.getClass().getSimpleName(), ex.getMessage(), ex);
        } else {
            log.warn("{}: {}", ex.getClass().getSimpleName(), ex.getMessage());
        }

        return ResponseEntity.status(status).body(response);
    }

    private String getValidationMessage(String code, String field, Object[] args) {
        String messageCode;
        Object[] messageArgs;

        switch (code) {
            case "typeMismatch" -> {
                messageCode = "validation.typeMismatch";
                messageArgs = new Object[]{field};
            }
            case "NotNull" -> {
                messageCode = "validation.notNull";
                messageArgs = new Object[]{field};
            }
            case "NotEmpty" -> {
                messageCode = "validation.notEmpty";
                messageArgs = new Object[]{field};
            }
            case "NotBlank" -> {
                messageCode = "validation.notBlank";
                messageArgs = new Object[]{field};
            }
            case "Size" -> {
                if (args != null && args.length >= 2) {
                    messageCode = "validation.size";
                    messageArgs = new Object[]{field, args[1], args[2]};
                } else {
                    messageCode = "validation.size";
                    messageArgs = new Object[]{field};
                }
            }
            case "Email" -> {
                messageCode = "validation.email";
                messageArgs = new Object[]{field};
            }
            case "Pattern" -> {
                messageCode = "validation.pattern";
                messageArgs = new Object[]{field};
            }
            default -> {
                String defaultMessage = args != null && args.length > 0 ? args[0].toString() : code;
                if (defaultMessage.startsWith("{")) {
                    messageCode = defaultMessage.substring(1, defaultMessage.length() - 1);
                    messageArgs = new Object[]{field};
                } else {
                    messageCode = "validation.default";
                    messageArgs = new Object[]{field, defaultMessage};
                }
            }
        }

        return getMessage(messageCode, messageArgs);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex, WebRequest request
    ) {
        Map<String, Object> errors = new HashMap<>();
        ex.getFieldErrors().forEach(error -> {
            String field = error.getField();
            String code = error.getCode() != null ? error.getCode() : "";
            String message = getValidationMessage(code, field, error.getArguments());
            errors.put(field, message);
        });

        return handleException(
                ex,
                request,
                HttpStatus.BAD_REQUEST,
                getMessage("validation.title", null),
                "validation.failed",
                null,
                errors
        );
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolationException(
            ConstraintViolationException ex, WebRequest request
    ) {
        Map<String, Object> errors = ex.getConstraintViolations().stream()
                .collect(Collectors.toMap(
                        v -> v.getPropertyPath().toString(),
                        ConstraintViolation::getMessage
                ));

        return handleException(
                ex,
                request,
                HttpStatus.BAD_REQUEST,
                getMessage("validation.title", null),
                "validation.failed",
                null,
                errors
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(
            DataIntegrityViolationException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.CONFLICT,
                "Data Integrity Violation",
                "error.database.constraint",
                null,
                null
        );
    }

    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity<ErrorResponse> handleEmptyResultDataAccessException(
            EmptyResultDataAccessException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.NOT_FOUND,
                "Resource Not Found",
                "error.not.found",
                null,
                null
        );
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatchException(
            MethodArgumentTypeMismatchException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.BAD_REQUEST,
                "Type Mismatch",
                "validation.typeMismatch",
                new Object[]{ex.getName()},
                null
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(
            HttpMessageNotReadableException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.BAD_REQUEST,
                "Invalid Request Body",
                "error.bad.request",
                null,
                null
        );
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.METHOD_NOT_ALLOWED,
                "Method Not Allowed",
                "error.method.not.allowed",
                null,
                null
        );
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> handleMaxUploadSizeExceededException(
            MaxUploadSizeExceededException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.PAYLOAD_TOO_LARGE,
                "File Too Large",
                "file.too.large",
                null,
                null
        );
    }

    @ExceptionHandler(MissingServletRequestPartException.class)
    public ResponseEntity<ErrorResponse> handleMissingServletRequestPartException(
            MissingServletRequestPartException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.BAD_REQUEST,
                "Missing Request Part",
                "error.bad.request",
                null,
                null
        );
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorResponse> handleResponseStatusException(
            ResponseStatusException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.valueOf(ex.getStatusCode().value()),
                ex.getReason(),
                null,
                null,
                null
        );
    }

    @ExceptionHandler(AuthenticateException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticateException(
            AuthenticateException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.BAD_REQUEST,
                "Authentication Error",
                null,
                null,
                null
        );
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationException(
            AuthenticationException ex, WebRequest request
    ) {
        String messageCode = ex instanceof BadCredentialsException
                ? "auth.login.failed"
                : "auth.unauthorized";

        return handleException(
                ex,
                request,
                HttpStatus.UNAUTHORIZED,
                "Authentication Failed",
                messageCode,
                null,
                null
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(
            AccessDeniedException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.FORBIDDEN,
                "Access Denied",
                "auth.forbidden",
                null,
                null
        );
    }

    @ExceptionHandler(SQLIntegrityConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleSQLIntegrityConstraintViolationException(
            SQLIntegrityConstraintViolationException ex, WebRequest request
    ) {
        String value = ex.getMessage().split("'")[1];
        return handleException(
                ex,
                request,
                HttpStatus.BAD_REQUEST,
                "Database Constraint Violation",
                "error.database.constraint",
                new Object[]{value},
                null
        );
    }

    @ExceptionHandler(TransactionSystemException.class)
    public ResponseEntity<ErrorResponse> handleTransactionException(
            TransactionSystemException ex, WebRequest request
    ) {
        Throwable cause = ex.getRootCause();
        if (cause instanceof ConstraintViolationException consEx) {
            Map<String, Object> errors = consEx.getConstraintViolations().stream()
                    .collect(Collectors.toMap(
                            v -> v.getPropertyPath().toString(),
                            v -> getValidationMessage(
                                    v.getConstraintDescriptor().getAnnotation().annotationType().getSimpleName(),
                                    v.getPropertyPath().toString(),
                                    new Object[]{v.getMessage()}
                            )
                    ));

            return handleException(
                    ex,
                    request,
                    HttpStatus.BAD_REQUEST,
                    "Transaction Validation Failed",
                    "validation.failed",
                    null,
                    errors
            );
        }

        return handleException(
                ex,
                request,
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Transaction Error",
                "error.database.transaction",
                null,
                null
        );
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFoundException(
            EntityNotFoundException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.BAD_REQUEST,
                "Entity Not Found",
                null,
                null,
                null
        );
    }

    @ExceptionHandler(EntityAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleEntityAlreadyExistsException(
            EntityAlreadyExistsException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.CONFLICT,
                "Entity Already Exists",
                null,
                null,
                null
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
            IllegalArgumentException ex, WebRequest request
    ) {
        String messageCode;
        Object[] args = null;

        if (ex.getMessage() != null && ex.getMessage().contains("sort order")) {
            messageCode = "error.invalid.sort.order";
        } else {
            messageCode = "error.illegal.argument";
            args = new Object[]{ex.getMessage()};
        }

        return handleException(
                ex,
                request,
                HttpStatus.BAD_REQUEST,
                getMessage("error.bad.request", null),
                messageCode,
                args,
                null
        );
    }

    @ExceptionHandler(org.springframework.security.core.userdetails.UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUsernameNotFoundException(
            org.springframework.security.core.userdetails.UsernameNotFoundException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.NOT_FOUND,
                "User Not Found",
                "user.not.found",
                null,
                null
        );
    }

    @ExceptionHandler(org.springframework.security.authentication.LockedException.class)
    public ResponseEntity<ErrorResponse> handleLockedException(
            org.springframework.security.authentication.LockedException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.LOCKED,
                "Account Locked",
                "user.locked",
                null,
                null
        );
    }

    @ExceptionHandler(org.springframework.security.authentication.DisabledException.class)
    public ResponseEntity<ErrorResponse> handleDisabledException(
            org.springframework.security.authentication.DisabledException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.FORBIDDEN,
                "Account Disabled",
                "user.inactive",
                null,
                null
        );
    }

    @ExceptionHandler(org.springframework.web.multipart.MultipartException.class)
    public ResponseEntity<ErrorResponse> handleMultipartException(
            org.springframework.web.multipart.MultipartException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.BAD_REQUEST,
                "File Upload Error",
                "file.upload.failed",
                null,
                null
        );
    }

    @ExceptionHandler(org.springframework.web.HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleHttpMediaTypeNotSupportedException(
            org.springframework.web.HttpMediaTypeNotSupportedException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.UNSUPPORTED_MEDIA_TYPE,
                "Unsupported Media Type",
                "error.unsupported.media.type",
                null,
                null
        );
    }

    @ExceptionHandler(org.springframework.web.HttpMediaTypeNotAcceptableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMediaTypeNotAcceptableException(
            org.springframework.web.HttpMediaTypeNotAcceptableException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.NOT_ACCEPTABLE,
                "Not Acceptable",
                "error.unsupported.media.type",
                null,
                null
        );
    }

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessExceptionException(
            BusinessException ex, WebRequest request
    ) {
        return handleException(
                ex,
                request,
                HttpStatus.BAD_REQUEST,
                ex.getMessage(),
                "error.bad.request",
                null,
                null
        );
    }

}