package com.example.demo.exceptions;

public class AuthException extends Exception {

    public AuthException(String message) {
        super(message);
    }

    public static class NotFoundException extends RuntimeException {
        public NotFoundException(String message) {
            super(message);
        }
    }
}