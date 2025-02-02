package com.example.demo.dto.item;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ItemRequest(
        @Schema(description = "The name of the item")
        @NotBlank(message = "Name of the item is mandatory")
        @Size(min = 2, max = 100, message = "Item name should be between 2 and 100 characters")
        String itemName,

        @Schema(description = "The price per unit per item")
        @NotBlank(message = "Price per unit is mandatory")
        @Size(min = 1)
        float pricePerUnit,

        @Schema(description = "The number of units per item")
        @NotBlank(message = "Number of units is mandatory")
        @Size(min = 1)
        int units,

        @Schema(description = "The category of the item")
        @NotBlank(message = "Category is mandatory")
        Category category
) {
    public ItemRequest(String itemName, float pricePerUnit, int units, Category category){
        this.itemName = itemName;
        this.pricePerUnit = pricePerUnit;
        this.units = units;
        this.category = category;
    }
}
