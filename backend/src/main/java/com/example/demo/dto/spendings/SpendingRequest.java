package com.example.demo.dto.spendings;
import com.example.demo.model.Item;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;
import com.example.demo.dto.item.ItemRequest;
import org.springframework.web.multipart.MultipartFile;


public record SpendingRequest(
        @Schema(description = "The ID of the user")
        @NotNull(message = "User ID is mandatory")
        Long userId,

        @Schema(description = "The name of the company of the spending")
        @NotBlank(message = "Company name is mandatory")
        @Size(min = 2, max = 100, message = "Company name must be between 2 and 100 characters")
        String companyName,

        @Schema(description = "The total price of the spending")
        @NotNull(message = "Total price is mandatory")
        @Min(value = 1, message = "Price must be at least 1")
        Float totalPrice,

        @Schema(description = "The date and time when the spending was made")
        @NotNull(message = "Date and time is mandatory")
        LocalDateTime date,

        @Schema(description = "The list of products of the spending")
        @NotNull(message = "List of products is mandatory")
        @Size(min = 1, message = "List must contain at least one item")
        List<ItemRequest> products,

        @Schema(description = "Description of the spending")
        @Size(min = 2, max = 255, message = "Description must be between 2 and 255 characters")
        String description
) {
public SpendingRequest(Long userId, String companyName, Float totalPrice, LocalDateTime date, List<ItemRequest> products, String description) {
        this.userId=userId;
        this.companyName=companyName;
        this.totalPrice=totalPrice;
        this.date=date;
        this.products=products;
        this.description=description;
    }
}
