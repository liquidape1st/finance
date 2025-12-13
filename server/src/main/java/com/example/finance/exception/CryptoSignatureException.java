package com.example.finance.exception;

public class CryptoSignatureException extends RuntimeException {
    public CryptoSignatureException(String message) {
        super(message);
    }

    public CryptoSignatureException(String message, Throwable cause) {
        super(message, cause);
    }
} 