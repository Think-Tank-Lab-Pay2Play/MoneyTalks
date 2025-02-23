package com.example.demo.dto.image;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.URL;

public record ImageUrlRequest(

        @NotNull(message = "URL is required")
        @URL(message = "Invalid URL")
        String url
) {
    public ImageUrlRequest(String url){
        this.url = url;
    }
}
