package com.example.demo.dto.user;

import com.example.demo.dto.spendingLimit.SpendingLimitResponse;
import com.example.demo.dto.spendings.SpendingResponse;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public record UserResponse(

        @Schema(description = "The id of the user")
        Long id,

        @Schema(description = "The first name of the user")
        String firstName,

        @Schema(description = "The last name of the user")
        String lastName,

        @Schema(description = "The email of the user")
        String email,

        @Schema(description = "The list of spendings of the user")
        List<SpendingResponse> spendings,

        @Schema(description = "The list of spending limits of the user")
        List<SpendingLimitResponse> spendingLimits
) {
    public UserResponse(Long id, String firstName, String lastName, String email, List<SpendingResponse> spendings, List<SpendingLimitResponse> spendingLimits) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.spendings = spendings;
        this.spendingLimits = spendingLimits;

    }
}
