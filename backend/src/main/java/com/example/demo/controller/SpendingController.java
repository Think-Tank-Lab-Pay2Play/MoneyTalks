package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.spendings.SpendingRequest;
import com.example.demo.dto.spendings.SpendingResponse;
import com.example.demo.service.SpendingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@Validated
@RequestMapping("/spending")
public class SpendingController {
    private final SpendingService spendingService;

    @Autowired
    public SpendingController(SpendingService spendingService) {
        this.spendingService = spendingService;
    }

    @Operation(summary = "Create a new spending entry", description = "This endpoint is used to create a new spending entry. " +
            "The details of the spending are passed in the request body. " +
            "The response body contains the details of the created spending.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Spending entry created successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = SpendingResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PostMapping
    public ResponseEntity<SpendingResponse> createSpending(@Valid @RequestBody SpendingRequest spendingRequest) {
        SpendingResponse createdSpending = spendingService.save(spendingRequest);
        return ResponseEntity.ok(createdSpending);
    }

    @Operation(summary = "Delete a spending entry", description = "This endpoint is used to delete an existing spending entry.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Spending entry deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "The spending entry with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @DeleteMapping("/{spendingId}")
    public ResponseEntity<?> deleteSpending(@PathVariable("spendingId") Long spendingId) {
        spendingService.delete(spendingId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get spending entry by ID", description = "This endpoint is used to retrieve a spending entry by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Spending entry found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = SpendingResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/byId/{spendingId}")
    public ResponseEntity<SpendingResponse> getSpendingById(@PathVariable("spendingId") Long spendingId) {
        SpendingResponse spending = spendingService.findResponseById(spendingId);
        return ResponseEntity.ok(spending);
    }

    @Operation(summary = "Get all spending entries", description = "This endpoint retrieves all spending entries.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Spendings found successfully",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = SpendingResponse.class)))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping
    public ResponseEntity<List<SpendingResponse>> getAllSpendings() {
        List<SpendingResponse> spendings = spendingService.getAllSpendingResponses();
        return ResponseEntity.ok(spendings);
    }

    @Operation(summary = "Get spending entries for a specific user", description = "This endpoint retrieves all spending entries " +
            "associated with a specific user ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Spendings found successfully",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = SpendingResponse.class)))}),
            @ApiResponse(responseCode = "404", description = "User with the given ID does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SpendingResponse>> getSpendingsByUserId(@PathVariable("userId") Long userId) {
        List<SpendingResponse> spendings = spendingService.getSpendingsByUserId(userId);
        return ResponseEntity.ok(spendings);
    }
}
