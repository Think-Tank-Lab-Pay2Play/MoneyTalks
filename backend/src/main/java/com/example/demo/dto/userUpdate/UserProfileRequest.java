package com.example.demo.dto.userUpdate;

public record UserProfileRequest(

        String firstName,
        String lastName,
        String email
) {
    public UserProfileRequest(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
