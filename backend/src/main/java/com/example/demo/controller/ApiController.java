package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.image.ImageUrlRequest;
import com.example.demo.dto.report.CustomReportRequest;
import com.example.demo.service.ApiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiController {

    private final ApiService apiService;

    @Operation(summary = "Extract products from an image URL")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Products extracted successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid file",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "Spending not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping("/extract-products/url/{userId}")
    public ResponseEntity<?> extractProductsFromImageUrl(@PathVariable Long userId,
            @RequestBody @Valid ImageUrlRequest imageUrlRequest){
        try{
        JSONObject response = apiService.extractProductsFromImageUrl(imageUrlRequest.url(), userId);
            return ResponseEntity.ok(response.toString());
        } catch (IOException e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to process image: " + e.getMessage());
        }
    }


    @Operation(summary = "Generate a report")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Report generated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid file",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "Spending not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping("/report/{type}/{userId}")
    public ResponseEntity<String> report(@PathVariable String type,@PathVariable Long userId){
        try{
            JSONObject response = apiService.report(type,userId);
            return ResponseEntity.ok(response.toString());
        } catch (IOException e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to load the prompt message: " + e.getMessage());
        }
    }

    @Operation(summary = "Generate a custom report")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Custom report generated successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "Invalid file",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "Spending not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping("/report/custom/{userId}")
    public ResponseEntity<String> report(@RequestBody @Valid CustomReportRequest customReportRequest,
                                         @PathVariable Long userId){
        try{
            JSONObject response = apiService.reportCustom(customReportRequest,userId);
            return ResponseEntity.ok(response.toString());
        } catch (IOException e){
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to load the prompt message: " + e.getMessage());
        }
    }


}
