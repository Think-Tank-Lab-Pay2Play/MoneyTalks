package com.example.demo.exceptions;

public class DeletionException extends RuntimeException {
    public DeletionException(String message) {
        super(message);
    }
}