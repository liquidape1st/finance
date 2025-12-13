package com.example.finance.exception;

public class AuthenticateException extends RuntimeException{
    public AuthenticateException(String message) {
        super(message);
    }
}
