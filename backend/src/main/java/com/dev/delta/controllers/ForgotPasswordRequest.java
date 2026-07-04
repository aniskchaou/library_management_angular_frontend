package com.dev.delta.controllers;

public class ForgotPasswordRequest {
    public String token;
    public String newPassword;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
// Getters and Setters
}
