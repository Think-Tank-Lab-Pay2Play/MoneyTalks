package com.example.demo.dto.spendings;

import com.example.demo.model.Item;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record SpendingRequest(

        @Schema(description = "The ID of the user")
        @NotBlank(message = "User ID is mandatory")
        @Size(min = 1)
        Long userId,

        @Schema(description = "The name of the company of the spending")
        @NotBlank(message = "Company name is mandatory")
        @Size(min = 2, max = 100, message = "Company name must be between 2 and 100 charaters")
        String companyName,

        @Schema(description = "The list of products of the spending")
        @NotBlank(message = "List of products is mandatory")
        @Size(min = 1, message = "List must contain at least an item")
        List<Item> products,

        @Schema(description = "The total price of the spending")
        @NotBlank(message = "Total price is mandatory")
        @Size(min = 1)
        float totalPrice,

        @Schema(description = "The path of the image of the spending") //nu stiu daca e ok aici asta
        @Size(min = 2, max = 255, message = "Image path must be between 2 and 255 charaters")
        String image,

        @Schema(description = "Description of the spending")
        @Size(min = 2, max = 100, message = "Description must be between 2 and 255 charaters")
        String description
) {
    public SpendingRequest(Long userId, String companyName, List<Item> products, float totalPrice, String image, String description) {
        this.userId = userId;
        this.companyName = companyName;
        this.products = products;
        this.totalPrice = totalPrice;
        this.image = image;
        this.description = description;
    }
}
