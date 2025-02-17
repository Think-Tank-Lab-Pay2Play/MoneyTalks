package com.example.demo.dto.spendingLimit;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

public record SpendingLimitRequest(

        @Schema(description = "The limit for the user")
        @NotNull(message = "Limit is mandatory")
        float spendingLimit,

        @Schema(description = "When the spending limit starts")
        @NotNull(message = "Start date is mandatory")
        LocalDate startDate,

        @Schema(description = "When the spending limit ends")
        @NotNull(message = "End date is mandatory")
        LocalDate endDate,

        @Schema(description = "The user ID")
        @NotNull(message = "User ID is mandatory")
        Long userId
) {
    public SpendingLimitRequest(float spendingLimit, LocalDate startDate, LocalDate endDate, Long userId) {
        this.spendingLimit = spendingLimit;
        this.startDate = startDate;
        this.endDate = endDate;
        this.userId = userId;
    }
}
