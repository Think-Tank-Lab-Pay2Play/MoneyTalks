package com.example.demo.controller;

import com.example.demo.dto.image.ImageUrlRequest;
import com.example.demo.service.MistralApiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import netscape.javascript.JSObject;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MistralApiController {

    private final MistralApiService mistralApiService;

    @PostMapping("/extract-products/url/{userId}")
    public ResponseEntity<?> extractProductsFromImageUrl(@PathVariable Long userId,
            @RequestBody @Valid ImageUrlRequest imageUrlRequest){
        try{
        JSONObject response = mistralApiService.extractProductsFromImageUrl(imageUrlRequest.url(), userId);
            return ResponseEntity.ok(response.toString());
        } catch (IOException e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process image: " + e.getMessage());
        }
    }
}
