package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.spendings.SpendingRequest;
import com.example.demo.dto.spendings.SpendingResponse;
import com.example.demo.exceptions.AuthException;
import com.example.demo.model.Spending;
import com.example.demo.service.FileStorageService;
import com.example.demo.service.SpendingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/spending")
public class SpendingController {
    private final SpendingService spendingService;
    private final FileStorageService fileStorageService;

    public SpendingController(SpendingService spendingService, FileStorageService fileStorageService) {
        this.spendingService = spendingService;
        this.fileStorageService = fileStorageService;
    }

    @Operation(summary = "Create a new spending entry")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Spending entry created successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SpendingResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping
    public ResponseEntity<SpendingResponse> createSpending(@Valid @RequestBody SpendingRequest spendingRequest) {
        SpendingResponse createdSpending = spendingService.save(spendingRequest);
        return ResponseEntity.ok(createdSpending);
    }

    @Operation(summary = "Upload receipt image for a spending")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Image uploaded successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SpendingResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid file",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "Spending not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class)))
    })
    @PostMapping(value = "/{id}/receipt", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<SpendingResponse> uploadReceipt(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(spendingService.addReceiptImage(id, file));
    }

    @Operation(summary = "Delete receipt image")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Image deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Spending not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class)))
    })
    @DeleteMapping("/{id}/receipt")
    public ResponseEntity<Void> deleteReceipt(@PathVariable Long id) {
        spendingService.deleteReceiptImage(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Delete a spending entry")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Spending entry deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Spending entry not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class)))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpending(@PathVariable Long id) {
        spendingService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Get spending entry by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Spending entry found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SpendingResponse.class))),
            @ApiResponse(responseCode = "404", description = "Spending entry not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class)))
    })
    @GetMapping("/{id}")
    public ResponseEntity<SpendingResponse> getSpendingById(@PathVariable Long id) {
        return ResponseEntity.ok(spendingService.findResponseById(id));
    }

    @Operation(summary = "Get all spending entries")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of all spending entries",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = SpendingResponse.class))))
    })
    @GetMapping
    public ResponseEntity<List<SpendingResponse>> getAllSpendings() {
        return ResponseEntity.ok(spendingService.getAllSpendingResponses());
    }

    @Operation(summary = "Get spending entries by user ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "List of spending entries for the user",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = SpendingResponse.class)))),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class)))
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SpendingResponse>> getSpendingsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(spendingService.findResponsesByUserId(userId));
    }

    @Operation(summary = "Get receipt image for a spending")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Image retrieved successfully",
                    content = @Content(mediaType = "image/*")),
            @ApiResponse(responseCode = "404", description = "Image not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ResponseDto.class)))
    })
    @GetMapping("/{id}/receipt")
    public ResponseEntity<?> getReceiptImage(@PathVariable Long id) {
        Spending spending = spendingService.findById(id);
        if (spending.getImageName() == null) {
            throw new AuthException.NotFoundException("Receipt image not found for spending: " + id);
        }

        byte[] imageBytes = fileStorageService.loadFile(spending.getImageName());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(imageBytes);
    }
}