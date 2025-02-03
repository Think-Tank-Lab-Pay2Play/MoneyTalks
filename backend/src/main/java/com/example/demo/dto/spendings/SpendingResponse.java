package com.example.demo.dto.spendings;

import com.example.demo.dto.item.ItemResponse;
import com.example.demo.model.Item;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record SpendingResponse(

        @Schema(description = "The ID of the spending")
        Long spendingId,

        @Schema(description = "The ID of the user")
        Long userId,

        @Schema(description = "The name of the company of the spending")
        String companyName,

        @Schema(description = "The list of products of the spending")
        List<ItemResponse> products,

        @Schema(description = "The total price of the spending")
        float totalPrice,

        @Schema(description = "The date of the spending")
        LocalDate date,

        @Schema(description = "The path of the image of the spending") //nu stiu daca e ok aici asta
        String image,

        @Schema(description = "Description of the spending")
        String description
) {
    public SpendingResponse(Long spendingId, Long userId, String companyName, List<ItemResponse> products, float totalPrice, LocalDate date, String image, String description) {
        this.spendingId = spendingId;
        this.userId = userId;
        this.companyName = companyName;
        this.products = products;
        this.totalPrice = totalPrice;
        this.date = date;
        this.image = image;
        this.description = description;
    }
}

