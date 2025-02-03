package com.example.demo.dto.spendings;

import com.example.demo.model.Item;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public record SpendingRequest(

        @Schema(description = "The ID of the user")
        @NotNull(message = "User ID is mandatory")
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
        @Min(value = 1, message = "Price must be at least 1")
        float totalPrice,

        @Schema(description = "The date when the spending was made")
        @NotBlank(message = "Date is mandatory")
        @Size(min = 10, max = 10, message = "Date must be in YYYY-MM-DD format")
        LocalDate date,

        @Schema(description = "The path of the image of the spending") //nu stiu daca e ok aici asta
        @Size(min = 2, max = 255, message = "Image path must be between 2 and 255 charaters")
        String image,

        @Schema(description = "Description of the spending")
        @Size(min = 2, max = 100, message = "Description must be between 2 and 255 charaters")
        String description
) {
    public SpendingRequest(Long userId, String companyName, List<Item> products, float totalPrice, LocalDate date, String image, String description) {
        this.userId = userId;
        this.companyName = companyName;
        this.products = products;
        this.totalPrice = totalPrice;
        this.date = date;
        this.image = image;
        this.description = description;
    }
}
