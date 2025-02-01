package com.example.demo.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserRequest(


        @Schema(description = "The first name of the user")
        @NotBlank(message = "First name is mandatory")
        @Size(min = 2, max = 32, message = "First name must be between 2 and 32 characters")
        String firstName,

        @Schema(description = "The last name of the user")
        @NotBlank(message = "Last name is mandatory")
        @Size(min = 2, max = 32, message = "Last name must be between 2 and 32 characters")
        String lastName,

        @Schema(description = "The email of the user")
        @NotBlank(message = "Email is mandatory")
        @Size(min = 6, max = 64, message = "Email must be between 6 and 64 characters")
        String email,

        @Schema(description = "The password of the user")
        @NotBlank(message = "Password is mandatory")
        @Size(min = 8, max = 64, message = "Password must be between 8 and 64 characters")
        String password

) {
    public UserRequest(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
