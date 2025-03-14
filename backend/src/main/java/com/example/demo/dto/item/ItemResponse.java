package com.example.demo.dto.item;


import com.example.demo.model.enums.Category;
import io.swagger.v3.oas.annotations.media.Schema;

public record ItemResponse(

        @Schema(description = "The Id of the item")
        long itemId,

        @Schema(description = "The name of the item")
        String itemName,

        @Schema(description = "The price per unit per item")
        float pricePerUnit,

        @Schema(description = "The number of units per item")
        int units,

        @Schema(description = "The total price of the item")
        float totalPrice,

        @Schema(description = "The category of the item")
        Category category,

        @Schema(description = "The ID of the spending entry")
        Long spendingId
) {
    public ItemResponse(long itemId, String itemName, float pricePerUnit, int units,float totalPrice, Category category, Long spendingId) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.pricePerUnit = pricePerUnit;
        this.units = units;
        this.totalPrice=totalPrice;
        this.category = category;
        this.spendingId = spendingId;
    }
}
