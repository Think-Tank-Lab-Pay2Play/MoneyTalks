package com.example.demo.dto.userUpdate;

public record PasswordChangeRequest(

        String oldPassword,
        String newPassword
) {
    public PasswordChangeRequest(String oldPassword, String newPassword) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}
