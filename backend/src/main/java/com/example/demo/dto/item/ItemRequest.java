package com.example.demo.dto.item;

import com.example.demo.model.enums.Category;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ItemRequest(
        @Schema(description = "The name of the item")
        @NotBlank(message = "Name of the item is mandatory")
        @Size(min = 2, max = 100, message = "Item name should be between 2 and 100 characters")
        String itemName,

        @Schema(description = "The price per unit per item")
        @NotBlank(message = "Price per unit is mandatory")
        @Min(value=1, message = "Price must be at least 1")
        float pricePerUnit,

        @Schema(description = "The number of units per item")
        @NotBlank(message = "Number of units is mandatory")
        @Min(value = 1, message = "Units must be at least 1")
        int units,

        @Schema(description = "The category of the item")
        @NotBlank(message = "Category is mandatory")
        Category category,

        @Schema(description = "The ID of the user who purchased the item")
        @NotNull(message = "User ID is mandatory")
        Long userId,

        @Schema(description = "The ID of the spending entry")
        @NotNull(message = "Spending ID is mandatory")
        Long spendingId
) {
    public ItemRequest(String itemName, float pricePerUnit, int units, Category category, Long userId, Long spendingId){
        this.itemName = itemName;
        this.pricePerUnit = pricePerUnit;
        this.units = units;
        this.category = category;
        this.userId = userId;
        this.spendingId = spendingId;
    }
}
