package com.example.demo.dto.spendingLimit;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

public record SpendingLimitResponse (

        @Schema(description = "The limit for the user")
        float spendingLimit,

        @Schema(description = "When the spending limit starts")
        LocalDate startDate,

        @Schema(description = "When the spending limit ends")
        LocalDate endDate
){
    public SpendingLimitResponse(float spendingLimit, LocalDate startDate, LocalDate endDate) {
        this.spendingLimit = spendingLimit;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
