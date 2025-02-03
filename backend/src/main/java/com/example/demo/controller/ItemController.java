package com.example.demo.controller;

import com.example.demo.dto.ResponseDto;
import com.example.demo.dto.item.ItemRequest;
import com.example.demo.dto.item.ItemResponse;
import com.example.demo.dto.spendings.SpendingResponse;
import com.example.demo.dto.user.UserResponse;
import com.example.demo.service.ItemService;
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

import java.util.List;

@RestController
@Validated
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @Operation(summary = "Create a new item", description = "This endpoint is used to create a new item. " +
            "The details of the item are passed in the request body. " +
            "The response body contains the details of the created item.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Item created successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ItemResponse.class))}),
            @ApiResponse(responseCode = "400", description = "Invalid request due to validation errors",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @PostMapping
    public ResponseEntity<ItemResponse> createItem(@Valid @RequestBody ItemRequest itemRequest) {
        ItemResponse createdItem = itemService.save(itemRequest);
        return ResponseEntity.ok(createdItem);
    }

    @Operation(summary = "Delete a item", description = "This endpoint is used to delete an existing item.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Item deleted successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "404", description = "The item with the given id does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable("itemId") Long itemId) {
        itemService.delete(itemId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get item with specified id", description = "This endpoint is used to retrieve an item with " +
            "specified id.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Item found successfully",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = UserResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/byId/{itemId}")
    public ResponseEntity<ItemResponse> getItemById(@PathVariable("itemId") Long itemId) {
        ItemResponse item = itemService.findResponseById(itemId);
        return ResponseEntity.ok(item);
    }

    @Operation(summary = "Get all items", description = "This endpoint is used to retrieve all items.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Items found successfully",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = UserResponse.class)))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping
    public ResponseEntity<List<ItemResponse>> getAllItems() {
        List<ItemResponse> items = itemService.getAllItemsResponse();
        return ResponseEntity.ok(items);
    }

    @Operation(summary = "Get items for a specific user", description = "This endpoint retrieves all items" +
            "associated with a specific user ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Items found successfully",
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
    public ResponseEntity<List<ItemResponse>> getItemsByUser(@PathVariable("userId") Long userId) {
        List<ItemResponse> items = itemService.getItemsByUserId(userId);
        return ResponseEntity.ok(items);
    }

    @Operation(summary = "Get items for a specific spending", description = "This endpoint retrieves all items" +
            "associated with a specific spending ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Items found successfully",
                    content = {@Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = SpendingResponse.class)))}),
            @ApiResponse(responseCode = "404", description = "Spending with the given ID does not exist",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = {@Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDto.class))})
    })
    @GetMapping("/sending/{spendingId}")
    public ResponseEntity<List<ItemResponse>> getItemsBySpending(@PathVariable("spendingId") Long spendingId) {
        List<ItemResponse> items = itemService.getItemsBySpendingId(spendingId);
        return ResponseEntity.ok(items);
    }


}
