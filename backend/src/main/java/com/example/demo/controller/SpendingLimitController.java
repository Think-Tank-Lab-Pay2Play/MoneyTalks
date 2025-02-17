package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.spendingLimit.SpendingLimitRequest;
import com.example.demo.dto.spendingLimit.SpendingLimitResponse;
import com.example.demo.dto.user.UserRequest;
import com.example.demo.dto.user.UserResponse;
import com.example.demo.service.SpendingLimitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/spendingLimits")
@Validated
public class SpendingLimitController {

    private final SpendingLimitService spendingLimitService;

    public SpendingLimitController(SpendingLimitService spendingLimitService) {
        this.spendingLimitService = spendingLimitService;
    }

    @Operation(summary = "Create a new spending limit", description = "This endpoint is used to create a new spending limit." +
            "The details of the spending limit to be created are passed in the request body. " +
            "The response body contains the details of the created entity.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Limit created successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = SpendingLimitResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PostMapping
    public ResponseEntity<SpendingLimitResponse> createSpendingLimit(@Valid @RequestBody SpendingLimitRequest spendingLimitRequest) {
        SpendingLimitResponse createdSpendingLimit = spendingLimitService.save(spendingLimitRequest);
        return ResponseEntity.ok(createdSpendingLimit);
    }

    @Operation(summary = "Delete a limit", description = "This endpoint is used to delete an existing limit.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Limit deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "The limit with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @DeleteMapping("/{limitId}")
    public ResponseEntity<?> deleteSpendingLimit(@PathVariable("limitId") Long limitId) {
        spendingLimitService.delete(limitId);
        return ResponseEntity.ok().build();
    }
}
