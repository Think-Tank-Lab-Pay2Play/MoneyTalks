package com.example.demo.dto.spendings;

import com.example.demo.dto.item.ItemResponse;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.List;

public record SpendingResponse(
        @Schema(description = "The ID of the spending")
        Long spendingId,

        @Schema(description = "The ID of the user")
        Long userId,

        @Schema(description = "The name of the company of the spending")
        String companyName,

        @Schema(description = "The total price of the spending")
        Float totalPrice,

        @Schema(description = "The date and time of the spending")
        LocalDateTime date,

        @Schema(description = "The list of products of the spending")
        List<ItemResponse> products,

        @Schema(description = "The name of the stored receipt image file")
        String imageName,

        @Schema(description = "Base64 encoded image data")
        String imageBase64,

        @Schema(description = "Description of the spending")
        String description
) {
   public SpendingResponse(Long spendingId, Long userId, String companyName, Float totalPrice, LocalDateTime date, List<ItemResponse> products, String imageName, String imageBase64, String description) {
        this.spendingId=spendingId;
        this.userId=userId;
        this.companyName=companyName;
        this.totalPrice=totalPrice;
        this.date=date;
        this.products=products;
        this.imageName=imageName;
        this.imageBase64=imageBase64;
        this.description=description;
    }
}